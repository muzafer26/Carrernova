import { createFileRoute, Link } from "@tanstack/react-router";
import { User, Brain, Compass, GraduationCap, ArrowLeftRight, CheckCircle2, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { StudentProfile } from "@/types/ps09";
import { isClass10Profile } from "@/lib/directions";
import { Sticker } from "@/components/ui/Sticker";

export const Route = createFileRoute("/dashboard/")({ component: DashboardOverview });

function DashboardOverview() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ps09_student_profile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const steps = [
    { title: "1. About You", desc: "Select class level, stream, and topics you enjoy", to: "/dashboard/profile", icon: User },
    { title: "2. Discover Preferences", desc: "Share your preferences to highlight relevant options", to: "/dashboard/assess", icon: Brain },
    { title: "3. Academic Degree Pathways", desc: "Explore undergraduate degree options under NEP FYUGP", to: "/dashboard/directions", icon: Compass },
    { title: "4. Skill & ITI Vocational Explorer", desc: "Discover job-ready ITI & NSQF skill certificate pathways", to: "/dashboard/skills", icon: Compass },
    { title: "5. Government Career Pathways", desc: "Backward map target JKPSC & JKSSB cadres to degree paths", to: "/dashboard/govt-pathways", icon: Compass },
    { title: "6. Decision Workspace & Shortlist", desc: "Save and compare your shortlisted options side-by-side", to: "/dashboard/compare", icon: ArrowLeftRight },
  ];

  const isClass10 = profile ? isClass10Profile(profile) : false;

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#4582ff] font-display">
            WORKSPACES & OVERVIEW
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold font-display text-[#0f2239]">
            J&K Student Career & Education System
          </h1>
          <p className="text-xs md:text-sm text-[#636363] mt-1 font-sans">
            Factual education guidance for Jammu & Kashmir students (Class 10 & Class 12).
          </p>
        </div>

        <Link
          to="/dashboard/profile"
          className="bg-[#ff7f46] hover:bg-[#e66c35] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 font-display shrink-0"
        >
          <span>Launch Guided Journey</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <Card className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <Sticker name="pathway" size="lg" animate={false} />
            <div>
              <span className="text-xs font-bold text-[#4582ff] uppercase tracking-wider font-display">
                {profile ? "Your Active Profile" : "Start Guided Exploration"}
              </span>
              <h2 className="text-xl font-extrabold font-display text-[#0f2239] mt-0.5">
                {profile
                  ? isClass10
                    ? "Class 10 • Stream Exploration"
                    : `${profile.class} • ${profile.stream}`
                  : "Find Education Pathways & Colleges in J&K"}
              </h2>
              <p className="text-xs text-[#636363] mt-1 leading-relaxed max-w-xl">
                {profile
                  ? isClass10
                    ? "Explore stream options (Science, Commerce, Arts) for Class 11/12 under JKBOSE."
                    : `Interests: ${profile.interests.join(", ") || "General"}. Tailored degree programs across J&K Government Degree Colleges.`
                  : "Answer one decision at a time to discover degree programs, eligibility, and verified government colleges across J&K."}
              </p>
            </div>
          </div>
          <Button asChild size="lg" className="shrink-0 self-start md:self-center bg-[#0f2239] hover:bg-[#1a365d] text-white rounded-2xl font-display font-bold text-xs">
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-2"
            >
              Resume Story Journey <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Card>

      {/* Workspace Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step) => (
          <Link key={step.to} to={step.to} className="block group">
            <Card className="bg-white border border-slate-200/80 rounded-2xl h-full hover:border-[#4582ff] hover:shadow-md transition p-5 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#e8f1ff] text-[#4582ff] shrink-0">
                <step.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold font-display text-base text-[#0f2239] group-hover:text-[#4582ff] transition">
                  {step.title}
                </h3>
                <p className="text-xs text-[#636363] mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
