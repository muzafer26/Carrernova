import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, ExternalLink, GraduationCap, FileCheck, Compass, ArrowRight } from "lucide-react";
import { JourneyProgress } from "@/components/JourneyProgress";
import { getDirectionByKey, getCourseByKey, getCoursesByDirection, isClass10Profile } from "@/lib/directions";
import type { Outcome, StudentProfile } from "@/types/ps09";
import { Sticker } from "@/components/ui/Sticker";

export const Route = createFileRoute("/dashboard/outcomes/$key")({
  component: OutcomesPage,
});

function OutcomesPage() {
  const { key } = Route.useParams();
  const navigate = useNavigate();

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

  // Try to find matching direction or course
  const direction = getDirectionByKey(key, true);
  const course = getCourseByKey(key, true);

  // Collect verified outcomes
  let outcomes: Outcome[] = [];
  let title = key;
  let description = "Possible educational and examination pathways after this program.";

  if (course) {
    title = course.label;
    description = course.description;
    outcomes = course.outcomes.filter((o) => o.verificationStatus === "verified");
  } else if (direction) {
    title = direction.label;
    description = direction.description;
    // Aggregate outcomes across verified courses under this direction
    const verifiedCourses = getCoursesByDirection(direction.key, true);
    outcomes = verifiedCourses.flatMap((c) => c.outcomes).filter((o) => o.verificationStatus === "verified");
  }

  const higherStudy = outcomes.filter((o) => o.type === "higher-study");
  const exams = outcomes.filter((o) => o.type === "exam");
  const careers = outcomes.filter((o) => o.type === "career");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <JourneyProgress />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 glass-strong rounded-3xl border border-white/10">
        <div className="flex items-start gap-4">
          <Sticker name="trophy" size="lg" />
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Where This Can Lead
            </span>
            <h1 className="text-2xl font-bold font-display mt-0.5">{title}</h1>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
        </div>
        <Button onClick={() => navigate({ to: "/dashboard/compare" })} size="sm" className="shrink-0 gap-1.5 self-end md:self-center">
          Compare Options <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {outcomes.length === 0 ? (
        /* Humanized Student-Facing Empty State */
        <Card className="glass-strong border-white/10 p-8 text-center space-y-4">
          <div className="p-3 rounded-full glass border-white/10 w-fit mx-auto text-primary">
            <Info className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-base">Outcome Information Coming Soon</h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Official career outcome information for this specific option is not yet available in our verified dataset. We only share confirmed official higher education and examination eligibility pathways.
          </p>
          <div className="pt-2 flex justify-center gap-3 flex-wrap">
            <Button
              variant="outline"
              onClick={() =>
                navigate({
                  to: "/dashboard/colleges",
                  search: course ? { course: course.key } : undefined,
                })
              }
            >
              Find Colleges Offering This Program
            </Button>
            <Button onClick={() => navigate({ to: "/dashboard/compare" })} size="lg">
              Compare Your Options →
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Higher Study Pathways */}
          {higherStudy.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-base font-semibold font-display text-primary">
                <GraduationCap className="h-5 w-5" />
                <h2>Possible Higher Study Options</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {higherStudy.map((item, idx) => (
                  <Card key={idx} className="glass-strong border-white/10 p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="secondary" className="text-[10px]">
                          Higher Study
                        </Badge>
                        <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-[10px]">
                          Official Source
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-base leading-snug">{item.label}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 text-xs">
                      <span className="text-[10px] text-muted-foreground truncate max-w-[200px]" title={item.source.label}>
                        {item.source.label}
                      </span>
                      <a
                        href={item.source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1 shrink-0"
                      >
                        Source <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Entrance & Examination Pathways */}
          {exams.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-base font-semibold font-display text-primary">
                <FileCheck className="h-5 w-5" />
                <h2>Relevant Examination & Admission Pathways</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exams.map((item, idx) => (
                  <Card key={idx} className="glass-strong border-white/10 p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="secondary" className="text-[10px]">
                          Entrance / Examination
                        </Badge>
                        <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-[10px]">
                          Official Source
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-base leading-snug">{item.label}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 text-xs">
                      <span className="text-[10px] text-muted-foreground truncate max-w-[200px]" title={item.source.label}>
                        {item.source.label}
                      </span>
                      <a
                        href={item.source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1 shrink-0"
                      >
                        Source <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Broad Career Directions */}
          {careers.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-base font-semibold font-display text-primary">
                <Compass className="h-5 w-5" />
                <h2>Broad Career Directions</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {careers.map((item, idx) => (
                  <Card key={idx} className="glass-strong border-white/10 p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="secondary" className="text-[10px]">
                          Career Direction
                        </Badge>
                        <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-[10px]">
                          Official Source
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-base leading-snug">{item.label}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 text-xs">
                      <span className="text-[10px] text-muted-foreground truncate max-w-[200px]" title={item.source.label}>
                        {item.source.label}
                      </span>
                      <a
                        href={item.source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1 shrink-0"
                      >
                        Source <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Action Navigation */}
          <div className="pt-4 flex items-center justify-between border-t border-white/10">
            <Button
              variant="outline"
              onClick={() =>
                navigate({
                  to: "/dashboard/colleges",
                  search: course ? { course: course.key } : undefined,
                })
              }
            >
              View Colleges Offering This Course
            </Button>
            <Button onClick={() => navigate({ to: "/dashboard/nextstep" })} size="lg">
              Proceed to Next Step →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
