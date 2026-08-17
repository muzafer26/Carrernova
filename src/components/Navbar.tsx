import { Link, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { LogOut, GraduationCap, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { ShinyButton } from "@/components/ui/shiny-button";

export function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { scrollY } = useScroll();
  const padTop = useTransform(scrollY, [0, 120], [16, 10]);
  const width = useTransform(scrollY, [0, 120], ["min(1240px, calc(100% - 32px))", "min(1040px, calc(100% - 32px))"]);
  const bg = useTransform(scrollY, [0, 80], ["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.98)"]);
  const borderC = useTransform(scrollY, [0, 80], ["rgba(226, 232, 240, 0.8)", "rgba(203, 213, 225, 1)"]);
  const shadow = useTransform(scrollY, [0, 120], ["0 4px 20px rgba(15, 34, 57, 0.06)", "0 10px 30px rgba(15, 34, 57, 0.12)"]);

  const links = [
    { href: "#how-it-works", label: "How It Works" },
    { href: "#explore", label: "What You Can Explore" },
    { href: "#trust", label: "Official Data" },
  ];

  return (
    <motion.div
      style={{ paddingTop: padTop }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
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
        className="pointer-events-auto rounded-full border px-4 md:px-6 h-14 flex items-center justify-between"
      >
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff7f46] text-white shadow-md">
            <GraduationCap className="h-4.5 w-4.5" />
          </span>
          <span className="font-display text-base font-extrabold tracking-tight text-[#0f2239]">
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

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={() => navigate({ to: "/dashboard" })}
                className="text-xs font-semibold px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition"
              >
                Dashboard
              </button>
              <button
                onClick={async () => {
                  try {
                    await supabase.auth.signOut();
                  } catch (e) {}
                  navigate({ to: "/" });
                }}
                className="p-2 rounded-full hover:bg-white/10 transition text-muted-foreground hover:text-foreground"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link to="/dashboard/profile">
              <ShinyButton className="px-5 py-2 text-[11px]">
                Start Exploring <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </ShinyButton>
            </Link>
          )}
        </div>
      </motion.header>
    </motion.div>
  );
}
