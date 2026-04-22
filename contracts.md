# API Contracts — Praveen Bajpai Portfolio

## Overview
Frontend is a premium monochrome single-page portfolio (React). All static
content (personal info, skills, experience, projects, services, education,
certifications) lives in `/app/frontend/src/mock.js` and does **not** require
a backend. Only the **Contact form** needs backend integration for:

1. Persisting every submission in MongoDB (so nothing is ever lost)
2. Sending an email notification to Praveen's inbox via Gmail SMTP

---

## Contact form — `POST /api/contact`

### Request body (JSON)
```json
{
  "name": "Jane Doe",
  "email": "jane@acme.com",
  "subject": "Senior Angular Role at Acme",
  "message": "Hi Praveen, we'd love to chat about..."
}
```

### Validation
- `name`: required, 1 – 120 chars
- `email`: required, valid email (pydantic EmailStr)
- `subject`: optional, max 200 chars
- `message`: required, 1 – 4000 chars

### Response
```json
{
  "success": true,
  "id": "uuid-string",
  "mailed": true,
  "message": "Message received"
}
```
If SMTP fails we still persist to Mongo and return `mailed: false`.

### Backend flow
1. Validate payload
2. Insert document into `contact_messages` collection:
   `{ id, name, email, subject, message, created_at, mailed }`
3. Send email via Gmail SMTP (smtplib, TLS 587) from `GMAIL_USER` to
   `CONTACT_RECIPIENT` with reply-to set to the sender's email.
4. Return success JSON.

---

## Admin — `GET /api/contact`
Returns last 100 messages, newest first (for quick review; no auth needed for
MVP since this is a single-user portfolio).

---

## Environment variables (backend/.env)
- `GMAIL_USER` — sender Gmail address
- `GMAIL_APP_PASSWORD` — 16-char Google App Password (2FA required)
- `CONTACT_RECIPIENT` — where notifications land (usually same as GMAIL_USER)

---

## Frontend integration
Replace the `setTimeout`/`localStorage` mock in
`/app/frontend/src/components/Contact.jsx` with an axios POST to
`${REACT_APP_BACKEND_URL}/api/contact`. Keep the existing toast UX:
- show "Sending..." state
- on 2xx → success toast + clear form
- on error → error toast

---

## What stays mocked
- `mock.js` (projects / skills / experience / education / certifications) —
  intentionally static, no backend dependency.
- Resume download button — still points to `#` until a hosted PDF URL is
  supplied.
