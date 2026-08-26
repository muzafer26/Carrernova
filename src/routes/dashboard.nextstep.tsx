import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, AlertCircle, Compass, GraduationCap, FileText } from "lucide-react";
import { JourneyProgress } from "@/components/JourneyProgress";
import type { StudentProfile } from "@/types/ps09";
import { isClass10Profile } from "@/lib/directions";
import { Sticker } from "@/components/ui/Sticker";

export const Route = createFileRoute("/dashboard/nextstep")({
  component: NextStepPage,
});

interface PortalItem {
  title: string;
  desc: string;
  url: string;
  tag: string;
  isPrimary?: boolean;
}

function NextStepPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ps09_student_profile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const isClass10 = profile ? isClass10Profile(profile) : false;
  const isProfessional = profile
    ? profile.stream?.toLowerCase().includes("pcm") ||
      profile.stream?.toLowerCase().includes("pcb") ||
      profile.goalPreference?.toLowerCase().includes("professional")
    : false;

  const getPortals = (): { title: string; subtitle: string; advice: string; items: PortalItem[] } => {
    if (isClass10) {
      return {
        title: "Next Steps for Class 10 Students",
        subtitle: "Key official government portals for school stream selection and scholarship support.",
        advice:
          "Stream selection is managed directly by your school after Class 10 results. Review official JKBOSE syllabus schemes to understand subject options before discussing stream allocation with your school.",
        items: [
          {
            title: "J&K Board of School Education (JKBOSE)",
            desc: "Official state board portal for Class 11/12 syllabi, subject combination matrices, and academic notifications.",
            url: "https://jkbose.jk.gov.in",
            tag: "School Education Board",
            isPrimary: true,
          },
          {
            title: "National Scholarship Portal (NSP)",
            desc: "Central government portal for Post-Matric Scholarships and state-sponsored financial assistance.",
            url: "https://scholarships.gov.in",
            tag: "Scholarships",
            isPrimary: true,
          },
        ],
      };
    }

    // Class 12 UG / General & Professional Context
    const items: PortalItem[] = [
      {
        title: "J&K Centralised Higher Education Admission Portal",
        desc: "Official centralized portal for undergraduate admissions across Government Degree Colleges in Jammu & Kashmir (Session 2026–27).",
        url: "https://jkadmissions.in",
        tag: "Main Admission Portal",
        isPrimary: true,
      },
      {
        title: "Directorate of Colleges J&K — Course & College Directory",
        desc: "Official Directorate portal for public course/college exploration, seat capacities, and college notifications.",
        url: "https://directorcollegesjk.in/authusers/CourseListPublic.aspx",
        tag: "College & Course Directory",
      },
      {
        title: "University of Jammu Portal",
        desc: "Academic notifications, FYUGP statutes, and college lists for Jammu division degree colleges.",
        url: "https://jammuuniversity.ac.in",
        tag: "University Portal",
      },
      {
        title: "University of Kashmir Portal",
        desc: "Affiliation lists, admission notices, and guidelines for Kashmir division degree colleges.",
        url: "https://www.kashmiruniversity.net",
        tag: "University Portal",
      },
    ];

    if (isProfessional) {
      items.push({
        title: "JKBOPEE Entrance & Counseling Portal",
        desc: "Official entrance notifications and counseling information for professional undergraduate courses (Nursing, Engineering, Paramedical).",
        url: "https://www.jkbopee.gov.in",
        tag: "Professional Counseling",
      });
    }

    items.push({
      title: "PMSSS AICTE J&K Scholarship Portal",
      desc: "Prime Minister's Special Scholarship Scheme supporting eligible J&K Class 12 graduates studying outside J&K.",
      url: "https://www.aicte-jk-scholarship-gov.in",
      tag: "Scholarship Scheme",
    });

    return {
      title: "Your Next Admission Steps",
      subtitle: "Direct links to official J&K admission websites where you submit your formal application.",
      advice:
        "CareerNova helps you explore verified options and statutory eligibility. When you are ready, submit your application directly on official portals like J&K Samarth.",
      items,
    };
  };

  const portalData = getPortals();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <JourneyProgress />

      <div className="flex items-start gap-4 p-6 glass-strong rounded-3xl border border-white/10">
        <Sticker name="pathway" size="lg" />
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-display">{portalData.title}</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">{portalData.subtitle}</p>
        </div>
      </div>

      {/* Contextual Guidance Notice */}
      <Card className="glass border-emerald-500/30 bg-emerald-500/5 p-4 flex items-start gap-3 text-xs text-emerald-200">
        <AlertCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold text-emerald-300">Official Process Guidance:</strong>
          <p className="mt-0.5 leading-relaxed">{portalData.advice}</p>
        </div>
      </Card>

      {/* Official Portals List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Official Government Portals</h2>

        {portalData.items.map((portal) => (
          <Card
            key={portal.url}
            className={`glass-strong border-white/10 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
              portal.isPrimary ? "ring-1 ring-primary/30" : ""
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-base">{portal.title}</h3>
                <Badge variant={portal.isPrimary ? "default" : "secondary"} className="text-[10px]">
                  {portal.tag}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{portal.desc}</p>
            </div>

            <Button asChild size="sm" className="shrink-0">
              <a href={portal.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                Visit Website <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </Card>
        ))}
      </div>

      {/* Action Navigation */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4">
        <Button
          variant="outline"
          onClick={() => navigate({ to: isClass10 ? "/dashboard/streams" : "/dashboard/compare" })}
        >
          ← {isClass10 ? "Back to Streams" : "Back to Compare"}
        </Button>
        <Button onClick={() => navigate({ to: "/dashboard/profile" })}>Start New Search</Button>
      </div>
    </div>
  );
}
