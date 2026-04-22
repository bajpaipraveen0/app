import React, { useState } from "react";
import axios from "axios";
import { personal } from "../mock";
import { Mail, Linkedin, Phone, Send, MapPin, Github } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please complete the form", description: "Name, email and message are required." });
      return;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(form.email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address." });
      return;
    }
    setSending(true);
    try {
      const { data } = await axios.post(`${API}/contact`, form, {
        headers: { "Content-Type": "application/json" },
        timeout: 20000,
      });
      setForm({ name: "", email: "", subject: "", message: "" });
      toast({
        title: data?.mailed ? "Message sent" : "Message received",
        description: data?.mailed
          ? "Thanks! Your message is on its way — I'll reply within 24 hours."
          : "Thanks! Saved your message. I'll reach out shortly.",
      });
    } catch (err) {
      const detail = err?.response?.data?.detail || err?.message || "Please try again.";
      toast({
        title: "Could not send",
        description: typeof detail === "string" ? detail : "Please try again in a moment.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="eyebrow reveal">06 / Contact</div>
            <h2 className="section-title mt-4 reveal text-4xl md:text-5xl text-white">
              Let’s build something that lasts.
            </h2>
            <p className="mt-5 reveal text-white/55 max-w-md">
              Have a senior Angular role, a performance rescue mission, or a greenfield enterprise app in mind? I’d love to hear the brief.
            </p>

            <div className="mt-10 space-y-4 reveal">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/25 hover:bg-white/[0.03] transition-all group"
              >
                <div className="w-11 h-11 rounded-lg border border-white/15 flex items-center justify-center">
                  <Mail size={17} />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Email</div>
                  <div className="text-white/55 text-sm">{personal.email}</div>
                </div>
              </a>
              <a
                href={`tel:${personal.phone}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/25 hover:bg-white/[0.03] transition-all"
              >
                <div className="w-11 h-11 rounded-lg border border-white/15 flex items-center justify-center">
                  <Phone size={17} />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Phone</div>
                  <div className="text-white/55 text-sm">{personal.phone}</div>
                </div>
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/25 hover:bg-white/[0.03] transition-all"
              >
                <div className="w-11 h-11 rounded-lg border border-white/15 flex items-center justify-center">
                  <Linkedin size={17} />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">LinkedIn</div>
                  <div className="text-white/55 text-sm">linkedin.com/in/bajpaipraveeno</div>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10">
                <div className="w-11 h-11 rounded-lg border border-white/15 flex items-center justify-center">
                  <MapPin size={17} />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Location</div>
                  <div className="text-white/55 text-sm">{personal.location}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 reveal">
            <form
              onSubmit={onSubmit}
              className="mono-card p-6 md:p-8 space-y-4"
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[11px] text-white/50 uppercase tracking-widest">
                    Name
                  </label>
                  <input
                    className="mono-input mt-2"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] text-white/50 uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    className="mono-input mt-2"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="name@company.com"
                  />
                </div>
              </div>
              <div>
                <label className="font-mono text-[11px] text-white/50 uppercase tracking-widest">
                  Subject
                </label>
                <input
                  className="mono-input mt-2"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  placeholder="What’s this about?"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] text-white/50 uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="mono-input mt-2 resize-none"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Tell me a bit about the project, the team, and the timeline."
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="text-xs text-white/40">
                  Avg. reply time — within 24 hours
                </div>
                <button type="submit" disabled={sending} className="btn btn-primary">
                  <Send size={15} />
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
