import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench, CheckCircle2, Bookmark, ExternalLink, ShieldCheck, Clock, Layers } from "lucide-react";
import { JourneyProgress } from "@/components/JourneyProgress";
import { standaloneSkills } from "@/data/jk-skills";
import { isShortlisted, toggleShortlistItem } from "@/lib/shortlist";
import { Sticker } from "@/components/ui/Sticker";
import type { StudentProfile, StandaloneSkill } from "@/types/ps09";
import { isClass10Profile } from "@/lib/directions";

export const Route = createFileRoute("/dashboard/skills")({
  component: StandaloneSkillsPage,
});

function StandaloneSkillsPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
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

  const categories = ["All", ...Array.from(new Set(standaloneSkills.map((s) => s.category)))];

  const filteredSkills =
    selectedCategory === "All"
      ? standaloneSkills
      : standaloneSkills.filter((s) => s.category === selectedCategory);

  const handleToggleBookmark = (skill: StandaloneSkill) => {
    toggleShortlistItem({
      id: `skill-${skill.key}`,
      type: "skill",
      title: skill.label,
      category: skill.category,
      subtitle: `${skill.duration} • ${skill.nsqfLevel}`,
      eligibility: skill.eligibility,
      duration: skill.duration,
      authority: skill.conductingAuthority,
      sourceLabel: skill.source.label,
      sourceUrl: skill.source.url,
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
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              First-Class Vocational & ITI Pathways
            </span>
            <h1 className="text-2xl font-bold font-display mt-0.5">Skill & ITI Vocational Explorer</h1>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Explore job-ready NSQF level 4/5 skill diplomas and ITI certificates in J&K for immediate entry into technical roles without completing a 4-year degree.
            </p>
          </div>
        </div>

        <Button
          onClick={() => navigate({ to: "/dashboard/compare" })}
          variant="outline"
          className="shrink-0 text-xs border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10"
        >
          View Shortlist & Compare →
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar touch-scroll">
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            className={`cursor-pointer px-3 py-1.5 text-xs whitespace-nowrap transition ${
              selectedCategory === cat ? "bg-emerald-600 text-white font-bold" : "hover:bg-accent text-muted-foreground"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* Grid of Standalone Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSkills.map((skill) => {
          const itemBookmarked = isShortlisted(`skill-${skill.key}`);

          return (
            <Card key={skill.key} className="glass-strong border-white/10 p-6 space-y-5 flex flex-col justify-between hover:border-emerald-500/30 transition">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 border-emerald-500/20 text-[10px]">
                        {skill.category}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] border-white/10">
                        {skill.nsqfLevel}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg font-display text-foreground">{skill.label}</h3>
                  </div>

                  <Button
                    size="sm"
                    variant={itemBookmarked ? "default" : "ghost"}
                    onClick={() => handleToggleBookmark(skill)}
                    className={`shrink-0 h-9 w-9 p-0 rounded-xl transition ${
                      itemBookmarked ? "bg-emerald-600 text-white" : "text-muted-foreground hover:bg-white/10"
                    }`}
                    title={itemBookmarked ? "Remove from Decision Shortlist" : "Save to Decision Shortlist"}
                  >
                    <Bookmark className={`h-4 w-4 ${itemBookmarked ? "fill-white" : ""}`} />
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">{skill.description}</p>

                <div className="space-y-3 pt-3 border-t border-white/5 text-xs">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-emerald-400" />
                      Duration: <strong className="text-foreground font-medium">{skill.duration}</strong>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl glass border-white/5 space-y-1">
                    <span className="font-semibold text-foreground flex items-center gap-1 text-[11px]">
                      <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                      Eligibility:
                    </span>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{skill.eligibility}</p>
                  </div>

                  <div className="p-3 rounded-xl glass border-emerald-500/10 bg-emerald-500/5 space-y-1">
                    <span className="font-semibold text-emerald-300 flex items-center gap-1 text-[11px]">
                      <Wrench className="h-3.5 w-3.5 text-emerald-400" />
                      Pathway Purpose & Practical Focus:
                    </span>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{skill.purpose}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-foreground text-[11px]">Key Job Prospects:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {skill.careerProspects.map((cp) => (
                        <Badge key={cp} variant="outline" className="text-[10px] bg-white/5 text-foreground border-white/10">
                          {cp}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] text-muted-foreground">
                    Authority: <strong className="text-foreground font-medium">{skill.conductingAuthority}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-3 text-xs">
                <a
                  href={skill.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:underline font-medium text-[11px]"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {skill.source.label}
                </a>

                <Button
                  size="sm"
                  onClick={() => handleToggleBookmark(skill)}
                  variant={itemBookmarked ? "secondary" : "outline"}
                  className="text-xs shrink-0"
                >
                  {itemBookmarked ? "Saved in Shortlist" : "+ Shortlist Option"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4">
        <Button variant="outline" onClick={() => navigate({ to: "/dashboard/directions" })}>
          ← Back to Academic Directions
        </Button>
        <Button onClick={() => navigate({ to: "/dashboard/govt-pathways" })} size="lg">
          Explore Government Pathways →
        </Button>
      </div>
    </div>
  );
}
