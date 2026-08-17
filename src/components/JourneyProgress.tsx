import { Link, useRouterState } from "@tanstack/react-router";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import type { StudentProfile } from "@/types/ps09";
import { isClass10Profile } from "@/lib/directions";

interface Step {
  id: string;
  label: string;
  path: string;
}

// Class 12 journey steps — existing path
const STEPS_CLASS12: Step[] = [
  { id: "profile", label: "About You", path: "/dashboard/profile" },
  { id: "assess", label: "Discover", path: "/dashboard/assess" },
  { id: "directions", label: "Explore", path: "/dashboard/directions" },
  { id: "colleges", label: "Colleges", path: "/dashboard/colleges" },
  { id: "compare", label: "Compare", path: "/dashboard/compare" },
  { id: "nextstep", label: "Next Step", path: "/dashboard/nextstep" },
];

// Class 10 journey steps — stream exploration path
const STEPS_CLASS10: Step[] = [
  { id: "profile", label: "About You", path: "/dashboard/profile" },
  { id: "streams", label: "Explore Streams", path: "/dashboard/streams" },
];

export function JourneyProgress() {
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  const [steps, setSteps] = useState<Step[]>(STEPS_CLASS12);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ps09_student_profile");
      if (saved) {
        const p: StudentProfile = JSON.parse(saved);
        setSteps(isClass10Profile(p) ? STEPS_CLASS10 : STEPS_CLASS12);
      }
    } catch (e) {
      // Fall back to Class 12 steps if profile is unreadable
    }
  }, [currentPath]); // Re-evaluate on every route change in case class level changes

  // Find index of current step
  const activeIndex = steps.findIndex(
    (s) => currentPath === s.path || currentPath.startsWith(s.path + "/")
  );

  return (
    <div className="w-full glass-strong rounded-2xl p-3 border border-white/10 mb-6 overflow-x-auto">
      <div className="flex items-center min-w-max justify-between px-2 gap-2 text-xs">
        {steps.map((step, idx) => {
          const isDone = activeIndex > idx;
          const isActive = activeIndex === idx;

          return (
            <div key={step.id} className="flex items-center gap-2">
              <Link
                to={step.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                    : isDone
                    ? "text-foreground hover:bg-white/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                ) : (
                  <span
                    className={`flex items-center justify-center h-4 w-4 rounded-full text-[10px] ${
                      isActive ? "bg-primary-foreground text-primary font-bold" : "bg-white/10"
                    }`}
                  >
                    {idx + 1}
                  </span>
                )}
                <span>{step.label}</span>
              </Link>

              {idx < steps.length - 1 && (
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
