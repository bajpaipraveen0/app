from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import ssl
import smtplib
import logging
from pathlib import Path
from email.message import EmailMessage
from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# ---------- MongoDB ----------
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# ---------- App & Router ----------
app = FastAPI(title="Praveen Bajpai Portfolio API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactIn(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(default="", max_length=200)
    message: str = Field(..., min_length=1, max_length=4000)

    @field_validator("name", "message")
    @classmethod
    def strip_required(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Field cannot be empty")
        return v


class ContactOut(BaseModel):
    id: str
    name: str
    email: str
    subject: Optional[str] = ""
    message: str
    created_at: datetime
    mailed: bool


# ---------- Email helper ----------
logger = logging.getLogger("portfolio")


def _send_email(payload: ContactIn) -> bool:
    """Send a notification email via Gmail SMTP. Returns True on success."""
    gmail_user = os.environ.get("GMAIL_USER")
    gmail_pass = os.environ.get("GMAIL_APP_PASSWORD")
    recipient = os.environ.get("CONTACT_RECIPIENT", gmail_user)

    if not gmail_user or not gmail_pass:
        logger.warning("Gmail credentials not configured; skipping email send")
        return False

    subject_line = payload.subject.strip() if payload.subject else "New message"
    subject_full = f"[Portfolio] {subject_line} — from {payload.name}"

    text_body = (
        f"You have a new message from your portfolio contact form.\n\n"
        f"Name:    {payload.name}\n"
        f"Email:   {payload.email}\n"
        f"Subject: {subject_line}\n"
        f"-----------------------------------------\n\n"
        f"{payload.message}\n\n"
        f"-----------------------------------------\n"
        f"Reply directly to this email to respond to the sender."
    )

    html_body = f"""\
<!doctype html>
<html>
  <body style="font-family: Inter, Arial, sans-serif; background:#0a0a0b; padding:24px; color:#f5f5f7;">
    <div style="max-width:560px; margin:0 auto; background:#131316; border:1px solid #232327; border-radius:14px; padding:28px;">
      <div style="font-size:12px; letter-spacing:.18em; text-transform:uppercase; color:#a1a1aa;">Portfolio Contact</div>
      <h2 style="margin:10px 0 20px; font-weight:600; color:#ffffff;">New message from {payload.name}</h2>
      <table style="width:100%; font-size:14px; color:#d4d4d8;">
        <tr><td style="padding:6px 0; color:#a1a1aa; width:90px;">From</td><td>{payload.name}</td></tr>
        <tr><td style="padding:6px 0; color:#a1a1aa;">Email</td><td><a style="color:#ffffff;" href="mailto:{payload.email}">{payload.email}</a></td></tr>
        <tr><td style="padding:6px 0; color:#a1a1aa;">Subject</td><td>{subject_line}</td></tr>
      </table>
      <div style="margin-top:20px; padding-top:18px; border-top:1px solid #232327; white-space:pre-wrap; line-height:1.6; color:#e4e4e7;">{payload.message}</div>
      <div style="margin-top:24px; font-size:12px; color:#71717a;">Reply directly to this email to respond to {payload.name}.</div>
    </div>
  </body>
</html>
"""

    msg = EmailMessage()
    msg["Subject"] = subject_full
    msg["From"] = f"Portfolio Contact <{gmail_user}>"
    msg["To"] = recipient
    msg["Reply-To"] = payload.email
    msg.set_content(text_body)
    msg.add_alternative(html_body, subtype="html")

    try:
        context = ssl.create_default_context()
        with smtplib.SMTP("smtp.gmail.com", 587, timeout=20) as server:
            server.ehlo()
            server.starttls(context=context)
            server.login(gmail_user, gmail_pass)
            server.send_message(msg)
        logger.info("Contact email sent to %s", recipient)
        return True
    except Exception as exc:
        logger.exception("Failed to send contact email: %s", exc)
        return False


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Portfolio API up"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.dict())
    await db.status_checks.insert_one(status_obj.dict())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**s) for s in status_checks]


@api_router.post("/contact")
async def submit_contact(payload: ContactIn):
    doc_id = str(uuid.uuid4())
    doc = {
        "id": doc_id,
        "name": payload.name,
        "email": payload.email,
        "subject": payload.subject or "",
        "message": payload.message,
        "created_at": datetime.utcnow(),
        "mailed": False,
    }

    # 1) Persist first so we never lose a message even if SMTP fails
    try:
        await db.contact_messages.insert_one(doc)
    except Exception as exc:
        logger.exception("Failed to persist contact message: %s", exc)
        raise HTTPException(status_code=500, detail="Could not save message") from exc

    # 2) Send email (best-effort)
    mailed = _send_email(payload)
    if mailed:
        await db.contact_messages.update_one(
            {"id": doc_id}, {"$set": {"mailed": True}}
        )

    return {
        "success": True,
        "id": doc_id,
        "mailed": mailed,
        "message": "Message received",
    }


@api_router.get("/contact", response_model=List[ContactOut])
async def list_contact_messages():
    items = (
        await db.contact_messages.find().sort("created_at", -1).to_list(100)
    )
    out: List[ContactOut] = []
    for it in items:
        it.pop("_id", None)
        out.append(ContactOut(**it))
    return out


# ---------- App wiring ----------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
