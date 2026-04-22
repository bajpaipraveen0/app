import React from "react";
import { experiences } from "../mock";
import { Briefcase, MapPin, Calendar } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container-x">
        <div className="eyebrow reveal">03 / Experience</div>
        <h2 className="section-title mt-4 reveal text-4xl md:text-5xl text-white max-w-3xl">
          Six years. Healthcare, mobility, jobs, on-demand. One throughline: Angular at scale.
        </h2>

        <div className="mt-14 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-14">
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                className={`relative reveal grid grid-cols-1 md:grid-cols-2 gap-8 ${
                  i % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"
                }`}
              >
                <div
                  className={`hidden md:block ${
                    i % 2 === 0 ? "text-right pr-10" : "pl-10"
                  }`}
                >
                  <div className="inline-flex items-center gap-2 font-mono text-[11px] text-white/50 uppercase tracking-widest">
                    <Calendar size={12} /> {exp.duration}
                  </div>
                  <div className="mt-2 text-white/50 text-sm inline-flex items-center gap-2">
                    <MapPin size={12} /> {exp.location}
                  </div>
                  <div className="mt-2 text-white/45 text-xs">{exp.domain}</div>
                </div>

                {/* Node */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full bg-white ring-4 ring-[#0a0a0b]" />

                <div className={`${i % 2 === 0 ? "md:pl-10" : "md:pr-10"} pl-10 md:pl-10`}>
                  <div className="md:hidden mb-3 flex flex-col gap-1">
                    <span className="font-mono text-[11px] text-white/50 uppercase tracking-widest inline-flex items-center gap-2">
                      <Calendar size={12} /> {exp.duration}
                    </span>
                    <span className="text-white/45 text-xs">{exp.location} · {exp.domain}</span>
                  </div>
                  <div className="md:hidden absolute left-[10px] top-2 w-3 h-3 rounded-full bg-white ring-4 ring-[#0a0a0b]" />

                  <div className="mono-card p-6 tile">
                    <div className="flex items-center gap-2 text-white/70">
                      <Briefcase size={15} />
                      <span className="text-sm">{exp.role}</span>
                    </div>
                    <h3 className="mt-1 text-2xl text-white font-medium">
                      {exp.company}
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {exp.highlights.map((h, idx) => (
                        <li key={idx} className="text-white/65 text-[14.5px] leading-relaxed flex gap-3">
                          <span className="mt-2 w-1 h-1 rounded-full bg-white/50 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.stack.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[11px] text-white/70 px-2.5 py-1 rounded-full border border-white/12 bg-white/[0.03]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
