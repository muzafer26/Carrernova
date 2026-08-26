import { Link, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { GraduationCap, ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { ShinyButton } from "@/components/ui/shiny-button";

export function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  const padTop = useTransform(scrollY, [0, 120], [16, 10]);
  const width = useTransform(scrollY, [0, 120], ["min(1240px, calc(100% - 24px))", "min(1040px, calc(100% - 24px))"]);
  const bg = useTransform(scrollY, [0, 80], ["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.98)"]);
  const borderC = useTransform(scrollY, [0, 80], ["rgba(226, 232, 240, 0.8)", "rgba(203, 213, 225, 1)"]);
  const shadow = useTransform(scrollY, [0, 120], ["0 4px 20px rgba(15, 34, 57, 0.06)", "0 10px 30px rgba(15, 34, 57, 0.12)"]);

  const links = [
    { href: "#how-it-works", label: "How It Works" },
    { href: "#explore", label: "What You Can Explore" },
    { href: "#trust", label: "Official Data" },
  ];

  return (
    <>
      <motion.div
        style={{ paddingTop: padTop }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-3 sm:px-4"
      >
        <motion.header
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width,
            backgroundColor: bg,
            borderColor: borderC,
            boxShadow: shadow,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
          className="pointer-events-auto rounded-full border px-3 sm:px-6 h-14 flex items-center justify-between gap-2"
        >
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff7f46] text-white shadow-md">
              <GraduationCap className="h-4.5 w-4.5" />
            </span>
            <span className="font-display text-sm sm:text-base font-extrabold tracking-tight text-[#0f2239]">
              CareerNova
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs font-bold text-[#636363] hover:text-[#ff7f46] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/dashboard/journey">
              <ShinyButton className="px-3.5 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-extrabold font-display">
                Start Exploring <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1" />
              </ShinyButton>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full text-[#0f2239] hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </motion.header>
      </motion.div>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-[#0f2239]/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed top-20 left-4 right-4 z-50 bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-black uppercase text-[#4582ff] font-display">Navigation</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-full text-[#636363] hover:text-[#0f2239]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col space-y-2">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="p-3 rounded-2xl text-xs font-bold text-[#0f2239] hover:bg-slate-100 transition flex items-center justify-between font-display"
                  >
                    <span>{l.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#ff7f46]" />
                  </a>
                ))}

                <Link
                  to="/dashboard/profile"
                  onClick={() => setMobileOpen(false)}
                  className="p-3.5 rounded-2xl bg-[#ff7f46] text-white font-extrabold text-xs uppercase tracking-wider transition text-center shadow-md font-display mt-2 flex items-center justify-center gap-2"
                >
                  <span>Student Exploration Guided Journey</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
