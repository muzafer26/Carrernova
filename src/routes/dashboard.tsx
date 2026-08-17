import {
  createFileRoute,
  Link,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  LogOut,
  Compass,
  Menu,
  X,
  MessageSquare,
  BookOpen,
  User,
  Brain,
  GraduationCap,
  ArrowLeftRight,
  CheckCircle2,
  Home,
} from "lucide-react";
import { AuroraBackground } from "@/components/Aurora";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { SidebarNavigationSlim } from "@/components/ui/sidebar-slim";

export const Route = createFileRoute("/dashboard")({ component: DashboardLayout });

const navItems = [
  { to: "/dashboard", label: "Overview", icon: Home, exact: true },
  { to: "/dashboard/profile", label: "About You", icon: User },
  { to: "/dashboard/assess", label: "Discover Preferences", icon: Brain },
  { to: "/dashboard/directions", label: "Academic Degrees", icon: Compass },
  { to: "/dashboard/skills", label: "Skill & ITI Vocational", icon: Compass },
  { to: "/dashboard/govt-pathways", label: "Govt Career Pathways", icon: Compass },
  { to: "/dashboard/colleges", label: "Where to Study", icon: GraduationCap },
  { to: "/dashboard/compare", label: "Decision Workspace", icon: ArrowLeftRight },
  { to: "/dashboard/nextstep", label: "Your Next Step", icon: CheckCircle2 },
  { to: "/dashboard/resources", label: "Official Resources", icon: BookOpen },
  { to: "/dashboard/mentor", label: "Ask an Advisor", icon: MessageSquare },
];

function DashboardLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  // Determine if student is currently in Overview mode vs Guided Journey mode
  const isOverview = path === "/dashboard" || path === "/dashboard/";
  const isGuidedJourney = !isOverview;

  // Fallback demo student identity if local Supabase auth is unconfigured
  const activeUser = user || { email: "student@jk.gov.in" };

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [path]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-8 w-8 rounded-full border-2 border-[#ff7f46] border-t-transparent animate-spin" />
      </div>
    );
  }

  // If student is in Guided Journey Mode, render 100% full-width story container without persistent sidebar shell!
  if (isGuidedJourney) {
    return (
      <div className="relative min-h-screen bg-slate-50/50 flex flex-col font-sans">
        <AuroraBackground />
        
        {/* Unobtrusive Top Bar for Guided Journey */}
        <header className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-[#ff7f46] text-white rounded-xl p-2 shadow-md">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base text-[#0f2239] leading-none">
                CareerNova
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#4582ff]">
                J&K Student Guided Journey
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="text-xs font-extrabold text-[#0f2239] hover:text-[#ff7f46] bg-slate-100 hover:bg-slate-200/80 px-4 py-2 rounded-xl transition font-display flex items-center gap-1.5"
            >
              <Compass className="h-4 w-4 text-[#ff7f46]" />
              <span>Overview & All Workspaces</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    );
  }

  // Standard Dashboard View (for Overview & Advanced Workspaces)
  return (
    <div className="relative min-h-screen flex bg-slate-50/50 font-sans">
      <AuroraBackground />

      {/* Desktop Dual-Tier Slim Sidebar (Eduor Theme) */}
      <div className="hidden md:block">
        <SidebarNavigationSlim />
      </div>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 inset-x-0 z-30 px-4 py-3 flex items-center justify-between bg-white border-b border-slate-200 shadow-sm">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="bg-[#ff7f46] text-white rounded-lg p-1.5 shadow-sm">
            <GraduationCap className="h-4 w-4" />
          </div>
          <span className="font-display font-extrabold text-sm text-[#0f2239]">
            CareerNova
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg bg-slate-100 text-[#0f2239]"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-[#0f2239]/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl p-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#ff7f46] text-white rounded-lg p-1.5">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <span className="font-display font-extrabold text-base text-[#0f2239]">CareerNova</span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 rounded-lg bg-slate-100 text-[#0f2239]"
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <nav className="space-y-1 overflow-y-auto max-h-[70vh]">
                  {navItems.map((it) => {
                    const active = it.exact
                      ? path === it.to
                      : path === it.to || path.startsWith(it.to + "/");

                    return (
                      <Link
                        key={it.to}
                        to={it.to}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                          active
                            ? "bg-[#ff7f46] text-white font-extrabold shadow-md"
                            : "text-[#0f2239] hover:bg-slate-100"
                        }`}
                      >
                        <it.icon className={`h-4 w-4 ${active ? "text-white" : "text-[#4582ff]"}`} />
                        {it.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="text-[10px] font-bold text-[#636363]">J&K Student Session</div>
                <div className="text-xs font-extrabold text-[#0f2239] truncate">{activeUser.email}</div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Viewport */}
      <main className="flex-1 p-4 md:p-6 pt-20 md:pt-6 max-w-5xl">
        <Outlet />
      </main>
    </div>
  );
}
