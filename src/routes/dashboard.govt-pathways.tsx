import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Bookmark, ExternalLink, ArrowRight, UserCheck, CheckCircle2, GraduationCap } from "lucide-react";
import { JourneyProgress } from "@/components/JourneyProgress";
import { govtPathways } from "@/data/jk-govt-pathways";
import { isShortlisted, toggleShortlistItem } from "@/lib/shortlist";
import { Sticker } from "@/components/ui/Sticker";
import type { StudentProfile, GovtPathway } from "@/types/ps09";
import { isClass10Profile } from "@/lib/directions";

export const Route = createFileRoute("/dashboard/govt-pathways")({
  component: GovtPathwaysPage,
});

function GovtPathwaysPage() {
  const navigate = useNavigate();
  const [shortlistTrigger, setShortlistTrigger] = useState(0);

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

  const handleToggleBookmark = (pathway: GovtPathway) => {
    toggleShortlistItem({
      id: `govt-${pathway.key}`,
      type: "govt-exam",
      title: pathway.targetCadre,
      category: "Government Exam Cadre",
      subtitle: pathway.conductingAuthority,
      eligibility: pathway.eligibility,
      authority: pathway.conductingAuthority,
      sourceLabel: pathway.source.label,
      sourceUrl: pathway.source.url,
    });
    setShortlistTrigger((prev) => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <JourneyProgress />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 glass-strong rounded-3xl border border-white/10">
        <div className="flex items-start gap-4">
          <Sticker name="target" size="lg" />
          <div>
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
              Backward Career Mapping
            </span>
            <h1 className="text-2xl font-bold font-display mt-0.5">Government Service Career Pathways</h1>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Target a J&K Government career (JKPSC, JKSSB, BOPEE Nursing) and explore the step-by-step educational stepping stones required to qualify.
            </p>
          </div>
        </div>

        <Button
          onClick={() => navigate({ to: "/dashboard/compare" })}
          variant="outline"
          className="shrink-0 text-xs border-sky-500/30 text-sky-300 hover:bg-sky-500/10"
        >
          View Decision Shortlist →
        </Button>
      </div>

      {/* Grid of Government Pathways */}
      <div className="space-y-6">
        {govtPathways.map((pathway) => {
          const itemBookmarked = isShortlisted(`govt-${pathway.key}`);

          return (
            <Card key={pathway.key} className="glass-strong border-white/10 p-6 space-y-6 hover:border-sky-500/30 transition">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="bg-sky-500/10 text-sky-300 border-sky-500/20 text-[10px]">
                      {pathway.conductingAuthority}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] border-white/10">
                      Age Limit: {pathway.ageLimit}
                    </Badge>
                  </div>
                  <h2 className="text-xl font-bold font-display text-foreground">{pathway.targetCadre}</h2>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">{pathway.summary}</p>
                </div>

                <Button
                  size="sm"
                  variant={itemBookmarked ? "default" : "outline"}
                  onClick={() => handleToggleBookmark(pathway)}
                  className={`shrink-0 text-xs gap-1.5 transition ${
                    itemBookmarked ? "bg-sky-600 text-white" : "border-sky-500/30 text-sky-300"
                  }`}
                >
                  <Bookmark className={`h-3.5 w-3.5 ${itemBookmarked ? "fill-white" : ""}`} />
                  {itemBookmarked ? "Saved to Shortlist" : "+ Shortlist Cadre"}
                </Button>
              </div>

              {/* Eligibility & Selection Process */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl glass border-white/5 space-y-1.5 text-xs">
                  <span className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                    <ShieldCheck className="h-4 w-4 text-amber-400" />
                    Statutory Educational Eligibility:
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{pathway.eligibility}</p>
                </div>

                <div className="p-4 rounded-xl glass border-white/5 space-y-1.5 text-xs">
                  <span className="font-semibold text-foreground flex items-center gap-1.5 text-xs">
                    <UserCheck className="h-4 w-4 text-sky-400" />
                    Official Selection Stages:
                  </span>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {pathway.selectionProcess.map((sp, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>{sp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Educational Stepping Stones Timeline */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-sky-400" />
                  Required Educational Stepping Stones (Backward Map):
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {pathway.educationSteppingStones.map((step, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl glass border-sky-500/10 bg-sky-500/5 space-y-1 text-xs relative">
                      <span className="font-bold text-sky-300 text-[11px] block">{step.stage}</span>
                      <p className="font-medium text-foreground text-xs">{step.action}</p>
                      <p className="text-[11px] text-muted-foreground leading-tight">{step.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Handoff */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3 text-xs">
                <a
                  href={pathway.officialPortal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sky-400 hover:underline font-medium text-xs"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {pathway.officialPortal.label}
                </a>

                <span className="text-[11px] text-muted-foreground">
                  Source: {pathway.source.label}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={() => navigate({ to: "/dashboard/skills" })}>
          ← Back to Vocational Skills
        </Button>
        <Button onClick={() => navigate({ to: "/dashboard/compare" })} size="lg">
          Open Decision Workspace →
        </Button>
      </div>
    </div>
  );
}
