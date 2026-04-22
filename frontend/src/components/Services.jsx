import React from "react";
import { services } from "../mock";
import * as Lucide from "lucide-react";

export default function Services() {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--py", `${e.clientY - r.top}px`);
  };

  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container-x">
        <div className="eyebrow reveal">05 / What I Do</div>
        <h2 className="section-title mt-4 reveal text-4xl md:text-5xl text-white max-w-3xl">
          Services — senior-level frontend craft, delivered.
        </h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => {
            const Icon = Lucide[s.icon] || Lucide.Sparkles;
            return (
              <div
                key={i}
                onMouseMove={onMove}
                className="mono-card tile p-6 reveal h-full flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl border border-white/15 flex items-center justify-center">
                  <Icon size={18} className="text-white" />
                </div>
                <h3 className="mt-5 text-white font-medium text-lg">{s.title}</h3>
                <p className="mt-2 text-white/55 text-sm leading-relaxed">{s.description}</p>
                <div className="mt-auto pt-6 font-mono text-[11px] text-white/35">
                  0{i + 1} / 0{services.length}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
