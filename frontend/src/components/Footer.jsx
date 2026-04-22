import React from "react";
import { personal } from "../mock";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative z-10 border-t border-white/10 mt-10">
      <div className="container-x py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center">
                <span className="font-mono text-[13px] text-white">PB</span>
              </div>
              <div className="leading-tight">
                <div className="text-white text-sm font-medium">{personal.name}</div>
                <div className="font-mono text-[10px] text-white/45 tracking-widest uppercase">
                  Senior Frontend Engineer
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-white/55 text-sm leading-relaxed">
              Building scalable Angular experiences for teams that refuse to compromise on craft, performance, or pace.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest">
              Elsewhere
            </div>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 hover:text-white text-sm inline-flex items-center gap-2"
                >
                  <Linkedin size={13} /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${personal.email}`}
                  className="text-white/70 hover:text-white text-sm inline-flex items-center gap-2"
                >
                  <Mail size={13} /> Email
                </a>
              </li>
              <li>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 hover:text-white text-sm inline-flex items-center gap-2"
                >
                  <Github size={13} /> GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[11px] text-white/40 uppercase tracking-widest">
              Currently
            </div>
            <div className="mt-4 text-white text-sm">Open to senior roles</div>
            <div className="text-white/55 text-sm">{personal.location}</div>
            <div className="mt-4 inline-flex items-center gap-2 text-white/70 text-xs">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              Available for new opportunities
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-white/45 text-xs">
            © {new Date().getFullYear()} Praveen Bajpai. Handcrafted with Angular energy.
          </div>
          <button
            onClick={scrollTop}
            className="btn btn-ghost text-xs py-2 px-3"
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
