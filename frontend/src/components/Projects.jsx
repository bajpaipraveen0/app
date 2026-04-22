import React, { useState } from "react";
import { projects } from "../mock";
import { ArrowUpRight, ExternalLink, Github, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

export default function Projects() {
  const [active, setActive] = useState(null);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--py", `${e.clientY - r.top}px`);
  };

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container-x">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="eyebrow reveal">04 / Selected Work</div>
            <h2 className="section-title mt-4 reveal text-4xl md:text-5xl text-white max-w-3xl">
              A few builds I&apos;m proud of.
            </h2>
          </div>
          <p className="reveal text-white/55 max-w-sm text-[15px]">
            Real production work across healthcare, mobility, on-demand, and recruitment — tap any card for the full story.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              onMouseMove={onMove}
              className="mono-card tile p-7 text-left group relative reveal"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="font-mono text-[11px] text-white/40">
                    0{i + 1} — {p.year}
                  </div>
                  <h3 className="mt-3 text-2xl text-white font-medium tracking-tight">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-white/55 text-sm">{p.tagline}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-black transition-all shrink-0">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <p className="mt-5 text-white/65 text-[14.5px] leading-relaxed line-clamp-3">
                {p.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] text-white/70 px-2.5 py-1 rounded-full border border-white/12 bg-white/[0.03]"
                  >
                    {t}
                  </span>
                ))}
                {p.stack.length > 5 && (
                  <span className="font-mono text-[11px] text-white/45 px-2.5 py-1">
                    +{p.stack.length - 5}
                  </span>
                )}
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/45">{p.client}</span>
                <span className="text-xs font-mono text-white/55 uppercase tracking-widest">
                  {p.role}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl bg-[#0f0f11] border border-white/10 text-white">
          {active && (
            <>
              <DialogHeader>
                <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest">
                  {active.year} · {active.client}
                </div>
                <DialogTitle className="text-3xl font-medium tracking-tight text-white">
                  {active.name}
                </DialogTitle>
                <DialogDescription className="text-white/55 text-base">
                  {active.tagline}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-2 space-y-5">
                <p className="text-white/70 text-[15px] leading-relaxed">
                  {active.description}
                </p>

                <div>
                  <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-2">
                    Impact
                  </div>
                  <ul className="space-y-2">
                    {active.impact.map((im, i) => (
                      <li key={i} className="text-white/75 text-sm flex gap-3">
                        <span className="mt-2 w-1 h-1 rounded-full bg-white/60 shrink-0" />
                        <span>{im}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-2">
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {active.stack.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] text-white/80 px-2.5 py-1 rounded-full border border-white/15 bg-white/[0.04]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex gap-3">
                  {active.demoUrl && (
                    <a href={active.demoUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  {active.codeUrl && (
                    <a href={active.codeUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                      <Github size={14} /> Source
                    </a>
                  )}
                  {!active.demoUrl && !active.codeUrl && (
                    <div className="text-xs text-white/45">
                      Enterprise / NDA project — demo available on request.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
