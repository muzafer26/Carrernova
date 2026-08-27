import React, { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Brain,
  Compass,
  GraduationCap,
  ArrowLeftRight,
  CheckCircle2,
  BookOpen,
  MessageSquare,
  ChevronRight,
  Sparkles,
  HelpCircle,
} from "lucide-react";

export interface NavGroupItem {
  to: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
  badge?: string | number;
}

export interface NavGroup {
  label: string;
  icon: React.ElementType;
  items: NavGroupItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Explore",
    icon: Home,
    items: [
      { to: "/dashboard", label: "Overview & Workspaces", icon: Home, exact: true, badge: "HUB" },
      { to: "/dashboard/profile", label: "Guided Advisor", icon: User },
    ],
  },
  {
    label: "Pathways",
    icon: Compass,
    items: [
      { to: "/dashboard/directions", label: "Academic Degree Pathways", icon: Compass },
      { to: "/dashboard/skills", label: "Skill & ITI Vocational", icon: Compass, badge: "Trades" },
      { to: "/dashboard/govt-pathways", label: "Govt Career Pathways", icon: Compass, badge: "JKPSC" },
      { to: "/dashboard/colleges", label: "Where to Study (GDCs)", icon: GraduationCap },
      { to: "/dashboard/compare", label: "Decision Workspace", icon: ArrowLeftRight },
    ],
  },
  {
    label: "Counseling",
    icon: CheckCircle2,
    items: [
      { to: "/dashboard/nextstep", label: "Your Next Step", icon: CheckCircle2, badge: "Official" },
      { to: "/dashboard/resources", label: "Official J&K Portals", icon: BookOpen },
      { to: "/dashboard/mentor", label: "Ask an Advisor", icon: MessageSquare },
    ],
  },
];


export function SidebarNavigationSlim() {
  const navigate = useNavigate();
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  // Default selected tier index (0: Explore, 1: Pathways, 2: Counseling)
  const getInitialActiveGroupIndex = () => {
    if (currentPath.includes("/directions") || currentPath.includes("/colleges") || currentPath.includes("/compare")) {
      return 1;
    }
    if (currentPath.includes("/nextstep") || currentPath.includes("/resources") || currentPath.includes("/mentor")) {
      return 2;
    }
    return 0;
  };

  const [activeGroupIndex, setActiveGroupIndex] = useState<number>(getInitialActiveGroupIndex());
  const [expanded, setExpanded] = useState<boolean>(true);

  const activeGroup = navGroups[activeGroupIndex];

  return (
    <aside className="sticky top-0 h-screen flex z-30 select-none">
      {/* Tier 1: Slim Icon Navigation Column */}
      <div className="w-16 bg-[#0f2239] text-white flex flex-col justify-between items-center py-4 border-r border-[#0f2239] shadow-lg">
        {/* Brand Icon */}
        <Link
          to="/"
          className="w-10 h-10 rounded-2xl bg-[#ff7f46] text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform"
          title="CareerNova Home"
        >
          <GraduationCap className="h-5 w-5" />
        </Link>

        {/* Navigation Group Icons */}
        <nav className="flex flex-col items-center gap-3 my-auto">
          {navGroups.map((group, idx) => {
            const isGroupActive = activeGroupIndex === idx;
            const Icon = group.icon;

            return (
              <button
                key={group.label}
                onClick={() => {
                  setActiveGroupIndex(idx);
                  if (!expanded) setExpanded(true);
                }}
                className={`relative group w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                  isGroupActive
                    ? "bg-[#ff7f46] text-white shadow-md"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {/* Active Indicator Bar */}
                {isGroupActive && (
                  <motion.div
                    layoutId="activeGroupIndicator"
                    className="absolute -right-1 top-2 bottom-2 w-1 rounded-l bg-white"
                  />
                )}
                {/* Tooltip */}
                <span className="absolute left-16 bg-[#0f2239] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {group.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="flex flex-col items-center gap-2 pt-2 border-t border-white/10 w-full">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-10 h-10 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white flex items-center justify-center transition"
            title={expanded ? "Collapse panel" : "Expand panel"}
          >
            <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Tier 2: Expanded Options Sub-Panel */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 220, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white border-r border-slate-200/80 shadow-md flex flex-col h-full overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#4582ff]">
                  Student Path
                </span>
                <h3 className="text-sm font-extrabold text-[#0f2239] font-display">
                  {activeGroup.label}
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#4582ff]/10 text-[#4582ff]">
                Eduor
              </span>
            </div>

            <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
              {activeGroup.items.map((item) => {
                const isExact = item.exact;
                const isActive = isExact
                  ? currentPath === item.to
                  : currentPath === item.to || currentPath.startsWith(item.to + "/");

                const ItemIcon = item.icon;

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#ff7f46] text-white shadow-md font-extrabold"
                        : "text-[#0f2239] hover:bg-slate-100 hover:text-[#ff7f46]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ItemIcon className={`h-4 w-4 ${isActive ? "text-white" : "text-[#4582ff]"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                        isActive ? "bg-white text-[#ff7f46]" : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="p-3 border-t border-slate-100 bg-slate-50/50">
              <div className="text-[10px] font-bold text-[#636363]">J&K Student Portal</div>
              <div className="text-xs font-extrabold text-[#0f2239] truncate">
                Student Advisor Workspace
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
