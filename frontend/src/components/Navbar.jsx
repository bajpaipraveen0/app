import React, { useEffect, useState } from "react";
import { navLinks, personal } from "../mock";
import { Download, Menu, X } from "lucide-react";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // scroll spy
      const offsets = navLinks.map((l) => {
        const el = document.getElementById(l.id);
        if (!el) return { id: l.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: l.id, top: Math.abs(rect.top - 120) };
      });
      offsets.sort((a, b) => a.top - b.top);
      setActive(offsets[0].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[#0a0a0b]/70 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-2.5 group"
        >
          <div className="relative w-8 h-8 rounded-lg border border-white/15 flex items-center justify-center overflow-hidden">
            <span className="font-mono text-[13px] text-white tracking-tight">PB</span>
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="text-sm font-medium text-white">Praveen Bajpai</div>
            <div className="font-mono text-[10px] text-white/50 tracking-widest uppercase">
              Angular · Frontend
            </div>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <button
              key={l.id}
              className={`nav-link ${active === l.id ? "active" : ""}`}
              onClick={() => go(l.id)}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={personal.resumeUrl}
            className="btn btn-ghost text-sm"
            onClick={(e) => {
              if (personal.resumeUrl === "#") {
                e.preventDefault();
                alert("Resume download coming soon — connect once backend is wired.");
              }
            }}
          >
            <Download size={15} />
            Resume
          </a>
        </div>

        <button
          className="md:hidden w-10 h-10 rounded-lg border border-white/15 flex items-center justify-center"
          onClick={() => setOpen((o) => !o)}
          aria-label="menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0a0a0b]/95 backdrop-blur-md">
          <div className="container-x py-4 flex flex-col gap-2">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`text-left px-3 py-2.5 rounded-lg ${
                  active === l.id ? "bg-white/10 text-white" : "text-white/60"
                }`}
              >
                {l.label}
              </button>
            ))}
            <a
              href={personal.resumeUrl}
              className="btn btn-primary mt-2"
              onClick={(e) => {
                if (personal.resumeUrl === "#") {
                  e.preventDefault();
                  alert("Resume download coming soon.");
                }
              }}
            >
              <Download size={15} /> Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
