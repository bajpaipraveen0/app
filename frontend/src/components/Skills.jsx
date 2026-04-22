import React, { useEffect, useRef, useState } from "react";
import { skills } from "../mock";

function SkillBar({ name, level }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="py-2.5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/85 text-sm">{name}</span>
        <span className="font-mono text-[11px] text-white/45">{level}%</span>
      </div>
      <div className="progress">
        <span style={{ width: seen ? `${level}%` : "0%" }} />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="container-x">
        <div className="eyebrow reveal">02 / Skills</div>
        <h2 className="section-title mt-4 reveal text-4xl md:text-5xl text-white max-w-3xl">
          A toolkit refined over 6+ years of shipping production Angular.
        </h2>
        <p className="mt-5 reveal text-white/55 max-w-2xl">
          From enterprise healthcare to realtime mobility apps — here’s the stack I reach for to move fast without breaking things.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((group, idx) => (
            <div key={idx} className="mono-card p-7 reveal tile">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium text-lg">{group.category}</h3>
                <span className="font-mono text-[11px] text-white/40">
                  0{idx + 1}
                </span>
              </div>
              <div className="mt-5">
                {group.items.map((it, i) => (
                  <SkillBar key={i} name={it.name} level={it.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
