import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  ArrowRight,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  GitCompare,
  Wrench,
  ShieldAlert,
} from "lucide-react";
import { JourneyProgress } from "@/components/JourneyProgress";
import { getDirectionByKey, isClass10Profile } from "@/lib/directions";
import { toggleShortlistItem } from "@/lib/shortlist";
import { jkColleges } from "@/data/jk-colleges";
import type { StudentProfile } from "@/types/ps09";
import { Sticker } from "@/components/ui/Sticker";

export const Route = createFileRoute("/dashboard/directions/$key")({
  component: DirectionDetailPage,
});

function DirectionDetailPage() {
  const { key } = Route.useParams();
  const navigate = useNavigate();
  const direction = getDirectionByKey(key, true);

  useEffect(() => {
    const saved = localStorage.getItem("ps09_student_profile");
    if (saved) {
      try {
        const p: StudentProfile = JSON.parse(saved);
        if (isClass10Profile(p)) {
          navigate({ to: "/dashboard/streams" });
        }
      } catch (e) {}
    }
  }, [navigate]);

  if (!direction) {
    return (
      <div className="max-w-2xl mx-auto space-y-4 text-center py-12">
        <h1 className="text-2xl font-bold">Information Coming Soon</h1>
        <p className="text-sm text-muted-foreground">
          The requested field of study is currently being updated in our verified database.
        </p>
        <Button onClick={() => navigate({ to: "/dashboard/directions" })}>
          ← Back to Directions
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <JourneyProgress />

      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate({ to: "/dashboard/directions" })}>
          ← Back to Directions
        </Button>
        <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-xs">
          Official Source Verified
        </Badge>
      </div>

      <div>
        <h1 className="text-2xl font-bold font-display">{direction.label}</h1>
        <p className="text-sm text-muted-foreground mt-1">{direction.description}</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Verified Undergraduate Courses & Pathway Options
        </h2>

        {direction.courses.map((course) => (
          <Card key={course.key} className="glass-strong border-white/10 p-6 space-y-6">
            {/* 01: WHAT IS THIS? */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10">01</span>
                <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">What Is This Course?</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <h3 className="text-xl font-bold font-display text-foreground">{course.label}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {course.directionKey === "commerce-management" && course.key === "bca"
                      ? "Computer Applications Path"
                      : "Undergraduate Degree"}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      toggleShortlistItem({
                        id: `degree-${course.key}`,
                        type: "degree",
                        title: course.label,
                        category: "Undergraduate Degree",
                        subtitle: direction.label,
                        eligibility: course.eligibility,
                        authority: course.source.label,
                        sourceLabel: course.source.label,
                        sourceUrl: course.source.url,
                      });
                      alert(`Saved ${course.label} to your Decision Shortlist!`);
                    }}
                    className="text-xs border-primary/30 text-primary"
                  >
                    + Shortlist Degree
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* 02: WHAT WILL YOU STUDY? */}
            {course.whatYouWillStudy && course.whatYouWillStudy.length > 0 && (
              <div className="p-4 rounded-2xl glass border-white/10 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">02</span>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" />
                    What You Will Study (Core Curriculum Modules):
                  </h4>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground pt-1">
                  {course.whatYouWillStudy.map((subject, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{subject}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 03: CAN YOU PURSUE IT? (ELIGIBILITY) */}
            <div className="p-4 rounded-2xl glass border-amber-500/20 bg-amber-500/5 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-amber-300 font-medium">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20">03</span>
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>Minimum Statutory Application Requirement:</span>
              </div>
              <p className="text-muted-foreground leading-relaxed pl-5">
                {course.eligibility}
              </p>
              <p className="text-[11px] text-amber-400/80 italic pl-5">
                * Note: Minimum statutory aggregate is required for application eligibility. Final seat allotment on J&K Samarth is merit-based according to session-specific quotas.
              </p>
            </div>

            {/* 06: DEGREE VS SKILL TRADE-OFF */}
            {course.skillAlternative && (
              <div className="p-5 rounded-2xl glass border-primary/30 bg-primary/5 space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10">06</span>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                      <GitCompare className="h-4 w-4 text-primary" />
                      Degree Route vs. Skill / Vocational Alternative Route:
                    </h4>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                    Neutral Trade-Off Exploration
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Degree Route Side */}
                  <div className="space-y-2 p-4 rounded-xl glass border-white/10">
                    <div className="flex items-center gap-2">
                      <Sticker name="graduate" size="sm" />
                      <span className="font-semibold text-foreground">
                        Academic Degree Route ({course.label})
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Offers broad theoretical & analytical foundation under FYUGP (3/4 Year). Qualifies student for university Master's degrees (CUET-PG, MCA, M.Com, M.Sc) and competitive exams (JKPSC).
                    </p>
                  </div>

                  {/* Skill Route Side */}
                  <div className="space-y-2 p-4 rounded-xl glass border-white/10">
                    <div className="flex items-center gap-2">
                      <Sticker name="certificate" size="sm" />
                      <div>
                        <span className="font-semibold text-foreground">Skill / Vocational Route</span>
                        <p className="font-medium text-emerald-300 text-[11px]">{course.skillAlternative.label}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {course.skillAlternative.description}
                    </p>
                    <p className="text-[11px] text-muted-foreground/80 pt-1">
                      <span className="font-medium text-foreground">Purpose:</span> {course.skillAlternative.purpose}
                    </p>
                    {course.skillAlternative.source && (
                      <a
                        href={course.skillAlternative.source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-primary hover:underline inline-flex items-center gap-1 pt-1"
                      >
                        Source: {course.skillAlternative.source.label} <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 5. Verified College Availability */}
            <div className="p-3 rounded-xl glass border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-foreground font-medium">
                <GraduationCap className="h-4 w-4 text-primary" />
                Verified College Availability:
              </div>
              <div className="text-muted-foreground font-medium">
                {(() => {
                  const matched = jkColleges.filter(
                    (c) => course.collegeKeys.includes(c.key) && c.verificationStatus === "verified"
                  );
                  const names = matched.map((c) => c.name);
                  const collegeStr =
                    names.length > 0
                      ? ` (${names.slice(0, 3).join(", ")}${names.length > 3 ? ", and more" : ""})`
                      : "";
                  return `Offered at ${matched.length} Government Degree Colleges in J&K${collegeStr}`;
                })()}
              </div>
            </div>

            {/* 6. Primary Source & Action Handoffs */}
            <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span>Primary Portal:</span>
                <span className="font-medium text-foreground">{course.source.label}</span>
                {course.source.url && (
                  <a
                    href={course.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-0.5 ml-1"
                  >
                    Official Site <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
                <Button asChild variant="secondary" size="sm">
                  <Link to={`/dashboard/outcomes/${course.key}`}>
                    Where This Can Lead
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link to={`/dashboard/colleges`} search={{ course: course.key }}>
                    Where You Can Study ({course.collegeKeys.length} Colleges) <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
