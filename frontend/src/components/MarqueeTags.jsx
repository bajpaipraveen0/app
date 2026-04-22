import React from "react";
import { tags } from "../mock";

export default function MarqueeTags() {
  const doubled = [...tags, ...tags];
  return (
    <section className="py-6 border-y border-white/5 bg-white/[0.015]">
      <div className="marquee">
        <div className="marquee-track">
          {doubled.map((t, i) => (
            <span
              key={i}
              className="font-mono text-sm text-white/40 tracking-wider uppercase"
            >
              {t}
              <span className="mx-6 text-white/15">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
