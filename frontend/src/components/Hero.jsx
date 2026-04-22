import React, { useEffect, useState } from "react";
import { personal } from "../mock";
import { ArrowUpRight, Download, MapPin, Sparkles, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = personal.titles[phraseIndex % personal.titles.length];
    const speed = deleting ? 35 : 70;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setPhraseIndex((i) => i + 1);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, phraseIndex]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-x">
        <div className="max-w-4xl">
          <div className="eyebrow reveal">
            <Sparkles size={13} className="text-white/60" />
            <span>Senior Frontend Engineer · 6+ Years</span>
          </div>

          <h1 className="section-title mt-6 reveal text-5xl md:text-7xl lg:text-[84px] text-white">
            Hi, I’m {personal.firstName}.
            <br />
            <span className="text-white/60">I build</span>{" "}
            <span className="whitespace-nowrap">
              <span className="text-white">{text}</span>
              <span className="caret" />
            </span>
          </h1>

          <p className="mt-7 reveal text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            {personal.tagline}
          </p>

          <div className="mt-10 reveal flex flex-wrap items-center gap-3">
            <button onClick={() => scrollTo("projects")} className="btn btn-primary">
              View Projects <ArrowUpRight size={16} />
            </button>
            <a
              href={personal.resumeUrl}
              onClick={(e) => {
                if (personal.resumeUrl === "#") {
                  e.preventDefault();
                  alert("Resume download coming soon.");
                }
              }}
              className="btn btn-ghost"
            >
              <Download size={16} />
              Download Resume
            </a>
            <button onClick={() => scrollTo("contact")} className="btn btn-ghost">
              <Mail size={16} /> Get in Touch
            </button>
          </div>

          {/* Meta row */}
          <div className="mt-14 reveal grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-white/10 pt-8">
            {[
              { k: personal.yearsExperience, l: "Years crafting UI" },
              { k: personal.projectsShipped, l: "Projects shipped" },
              { k: personal.domains, l: "Industry domains" },
              { k: "Angular", l: "v8 — v18 specialist" },
            ].map((s, i) => (
              <div key={i}>
                <div className="stat-num text-3xl md:text-4xl text-white">{s.k}</div>
                <div className="mt-1 text-sm text-white/50">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 reveal flex flex-wrap items-center gap-6 text-white/55 text-sm">
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} /> {personal.location}
            </span>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white transition-colors">
              <Linkedin size={14} /> LinkedIn
            </a>
            <a href={`mailto:${personal.email}`} className="inline-flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={14} /> {personal.email}
            </a>
            <a href={personal.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white transition-colors">
              <Github size={14} /> GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Decorative code snippet */}
      <div className="hidden lg:block absolute right-8 top-36 w-[360px] reveal">
        <div className="mono-card p-5 font-mono text-[12.5px] leading-6">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="ml-3 text-white/40 text-[11px]">praveen.ts</span>
          </div>
          <pre className="text-white/80 whitespace-pre-wrap">
<span className="text-white/40">const</span> engineer <span className="text-white/40">=</span> {"{"}
  <span className="text-white">name</span>: <span className="text-white/70">&apos;Praveen Bajpai&apos;</span>,
  <span className="text-white">stack</span>: [<span className="text-white/70">&apos;Angular&apos;</span>, <span className="text-white/70">&apos;RxJS&apos;</span>, <span className="text-white/70">&apos;NgRx&apos;</span>],
  <span className="text-white">focus</span>: <span className="text-white/70">&apos;scalable UI&apos;</span>,
  <span className="text-white">ships</span>: <span className="text-white/50">() =&gt;</span> <span className="text-white/70">&apos;production✨&apos;</span>,
{"}"};
          </pre>
        </div>
      </div>
    </section>
  );
}
