import React from "react";
import { about, personal, education, certifications } from "../mock";
import { Check, GraduationCap, Award } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-x">
        <div className="eyebrow reveal">01 / About</div>
        <h2 className="section-title mt-4 reveal text-4xl md:text-5xl text-white max-w-3xl">
          Engineering calm, scalable frontends for teams that can’t afford to slow down.
        </h2>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-5 reveal">
            {about.summary.map((p, i) => (
              <p key={i} className="text-white/65 text-[17px] leading-relaxed">
                {p}
              </p>
            ))}

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {about.strengths.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.02]"
                >
                  <Check size={16} className="text-white/80 mt-0.5 shrink-0" />
                  <span className="text-white/80 text-sm leading-relaxed">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="mono-card p-6 reveal">
              <div className="flex items-center gap-2 text-white/80">
                <GraduationCap size={18} />
                <span className="font-medium">Education</span>
              </div>
              <div className="mt-5 space-y-5">
                {education.map((e, i) => (
                  <div key={i} className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-white text-sm font-medium">{e.degree}</div>
                      <div className="text-white/50 text-sm">{e.school}</div>
                    </div>
                    <div className="font-mono text-[11px] text-white/50">{e.year}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mono-card p-6 reveal">
              <div className="flex items-center gap-2 text-white/80">
                <Award size={18} />
                <span className="font-medium">Certifications & Recognition</span>
              </div>
              <ul className="mt-5 space-y-3">
                {certifications.map((c, i) => (
                  <li key={i} className="text-white/65 text-sm flex gap-3">
                    <span className="mt-2 w-1 h-1 rounded-full bg-white/40 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mono-card p-6 reveal">
              <div className="text-white/60 text-xs font-mono tracking-widest uppercase">
                Currently
              </div>
              <div className="mt-2 text-white font-medium">
                Senior Frontend @ PureSoftware — Medicare Advantage
              </div>
              <div className="mt-1 text-white/50 text-sm">
                Based in {personal.location}. Open to senior Angular roles & high-impact product teams.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
