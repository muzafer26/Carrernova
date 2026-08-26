import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  GraduationCap,
  Wrench,
  ShieldAlert,
  BookOpen,
  Trash2,
  ExternalLink,
  BookmarkCheck,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { JourneyProgress } from "@/components/JourneyProgress";
import { directions } from "@/data/jk-directions";
import { jkColleges } from "@/data/jk-colleges";
import { isClass10Profile, getCourseByKey } from "@/lib/directions";
import { getShortlist, saveShortlist, clearShortlist } from "@/lib/shortlist";
import { getContextualScholarships } from "@/lib/scholarships";
import type { StudentProfile, Course, ShortlistItem } from "@/types/ps09";
import { Sticker } from "@/components/ui/Sticker";

export const Route = createFileRoute("/dashboard/compare")({
  component: ComparePage,
});

function ComparePage() {
  const navigate = useNavigate();
  const verifiedDirections = directions.filter((d) => d.verificationStatus === "verified");
  const allVerifiedCourses: Course[] = verifiedDirections.flatMap((d) =>
    d.courses.filter((c) => c.verificationStatus === "verified")
  );

  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [shortlist, setShortlist] = useState<ShortlistItem[]>([]);
  const [viewMode, setViewMode] = useState<"workspace" | "manual">("workspace");
  const [compareMode, setCompareMode] = useState<"courses" | "directions">("courses");

  // Dropdown manual selectors
  const [course1Key, setCourse1Key] = useState<string>("bcom");
  const [course2Key, setCourse2Key] = useState<string>("bca");

  const [dir1Key, setDir1Key] = useState<string>(() => verifiedDirections[0]?.key || "sciences");
  const [dir2Key, setDir2Key] = useState<string>(
    () => verifiedDirections[1]?.key || "commerce-management"
  );

  useEffect(() => {
    const saved = localStorage.getItem("ps09_student_profile");
    if (saved) {
      try {
        const p: StudentProfile = JSON.parse(saved);
        if (isClass10Profile(p)) {
          navigate({ to: "/dashboard/streams" });
        }
        setStudentProfile(p);
      } catch (e) {}
    }
    setShortlist(getShortlist());
  }, [navigate]);

  const handleRemoveShortlistItem = (id: string) => {
    const updated = shortlist.filter((i) => i.id !== id);
    saveShortlist(updated);
    setShortlist(updated);
  };

  const handleClearShortlist = () => {
    clearShortlist();
    setShortlist([]);
  };

  const contextualScholarships = getContextualScholarships(studentProfile);

  const c1 = getCourseByKey(course1Key, true) || allVerifiedCourses[0];
  const c2 = getCourseByKey(course2Key, true) || allVerifiedCourses[1];

  const d1 = verifiedDirections.find((d) => d.key === dir1Key);
  const d2 = verifiedDirections.find((d) => d.key === dir2Key);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <JourneyProgress />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 glass-strong rounded-3xl border border-white/10">
        <div className="flex items-start gap-4">
          <Sticker name="target" size="lg" />
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Student Decision Workspace
            </span>
            <h1 className="text-2xl font-bold font-display mt-0.5">Shortlist & Pathway Comparator</h1>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Review saved degrees, ITI skill pathways, and government exam cadres side-by-side to make your final decision.
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 glass p-1 rounded-xl shrink-0 self-start sm:self-center">
          <Button
            variant={viewMode === "workspace" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("workspace")}
            className="text-xs rounded-lg gap-1.5"
          >
            <BookmarkCheck className="h-3.5 w-3.5" />
            My Shortlist ({shortlist.length})
          </Button>
          <Button
            variant={viewMode === "manual" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("manual")}
            className="text-xs rounded-lg gap-1.5"
          >
            <Layers className="h-3.5 w-3.5" />
            Manual Comparator
          </Button>
        </div>
      </div>

      {viewMode === "workspace" ? (
        <div className="space-y-6">
          {shortlist.length === 0 ? (
            <Card className="glass-strong border-white/10 p-8 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-2xl glass flex items-center justify-center text-primary">
                <BookmarkCheck className="h-6 w-6" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-lg font-bold font-display">Your Decision Shortlist is Empty</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Bookmark degrees, ITI skill options, or government career pathways while exploring to compare them together in this workspace.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-2.5 pt-2">
                <Button onClick={() => navigate({ to: "/dashboard/directions" })} size="sm" className="w-full sm:w-auto">
                  Explore Degree Directions →
                </Button>
                <Button onClick={() => navigate({ to: "/dashboard/skills" })} variant="outline" size="sm" className="w-full sm:w-auto">
                  Explore ITI & Vocational Skills →
                </Button>
                <Button onClick={() => navigate({ to: "/dashboard/govt-pathways" })} variant="outline" size="sm" className="w-full sm:w-auto">
                  Explore Govt Pathways →
                </Button>
              </div>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Showing <strong>{shortlist.length}</strong> saved options across Degree, Skill, and Government Exam pathways.
                </p>
                <Button variant="ghost" size="sm" onClick={handleClearShortlist} className="text-xs text-rose-400 hover:text-rose-300">
                  <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear Shortlist
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shortlist.map((item) => (
                  <Card key={item.id} className="glass-strong border-white/10 p-5 space-y-4 flex flex-col justify-between hover:border-primary/40 transition">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <Badge
                            variant="secondary"
                            className={`text-[10px] ${
                              item.type === "skill"
                                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                                : item.type === "govt-exam"
                                ? "bg-sky-500/10 text-sky-300 border-sky-500/20"
                                : "bg-primary/10 text-primary border-primary/20"
                            }`}
                          >
                            {item.type === "skill"
                              ? "Vocational Skill"
                              : item.type === "govt-exam"
                              ? "Government Exam"
                              : "Academic Degree"}
                          </Badge>
                          <h3 className="font-bold text-base font-display">{item.title}</h3>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveShortlistItem(item.id)}
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-rose-400 shrink-0"
                          title="Remove from shortlist"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>

                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>

                      <div className="space-y-2 pt-2 border-t border-white/5 text-xs">
                        <div className="p-2.5 rounded-lg glass border-white/5 space-y-1">
                          <span className="font-semibold text-foreground text-[11px] block">Eligibility Criteria:</span>
                          <p className="text-[11px] text-muted-foreground leading-snug">{item.eligibility}</p>
                        </div>

                        {item.authority && (
                          <div className="text-[11px] text-muted-foreground">
                            Authority: <strong className="text-foreground">{item.authority}</strong>
                          </div>
                        )}
                      </div>
                    </div>

                    {item.sourceUrl && (
                      <div className="pt-2 border-t border-white/5">
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between text-xs text-primary hover:underline font-medium"
                        >
                          <span>Official Information Portal</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Contextual Scholarships Block */}
          <Card className="glass-strong border-amber-500/20 bg-amber-500/5 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base font-display text-amber-200">Contextual Financial Support & Scholarships</h3>
                <p className="text-xs text-muted-foreground">
                  Official J&K and Central Government financial schemes relevant to your saved options.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contextualScholarships.map((sch) => (
                <div key={sch.key} className="p-4 rounded-xl glass border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-300">
                      {sch.provider}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">{sch.audienceStage}</span>
                  </div>
                  <h4 className="font-bold text-sm text-foreground">{sch.title}</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{sch.relevanceReason}</p>
                  <p className="text-[11px] text-amber-300 font-medium">{sch.amountDetails}</p>
                  <a
                    href={sch.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline pt-1"
                  >
                    Apply on Official Portal <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        /* Manual Comparator Mode */
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 glass p-4 rounded-2xl border border-white/10">
            <div className="text-xs text-muted-foreground">
              Compare two degree programs or general fields side-by-side:
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={compareMode === "courses" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCompareMode("courses")}
                className="text-xs"
              >
                Degree Programs
              </Button>
              <Button
                variant={compareMode === "directions" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCompareMode("directions")}
                className="text-xs"
              >
                Broad Fields
              </Button>
            </div>
          </div>

          {compareMode === "courses" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="glass-strong border-white/10 p-4 space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Degree Program 1</label>
                <Select value={course1Key} onValueChange={setCourse1Key}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {allVerifiedCourses.map((c) => (
                      <SelectItem key={c.key} value={c.key}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Card>

              <Card className="glass-strong border-white/10 p-4 space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Degree Program 2</label>
                <Select value={course2Key} onValueChange={setCourse2Key}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {allVerifiedCourses.map((c) => (
                      <SelectItem key={c.key} value={c.key}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="glass-strong border-white/10 p-4 space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Direction Field 1</label>
                <Select value={dir1Key} onValueChange={setDir1Key}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {verifiedDirections.map((d) => (
                      <SelectItem key={d.key} value={d.key}>{d.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Card>

              <Card className="glass-strong border-white/10 p-4 space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Direction Field 2</label>
                <Select value={dir2Key} onValueChange={setDir2Key}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {verifiedDirections.map((d) => (
                      <SelectItem key={d.key} value={d.key}>{d.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Card>
            </div>
          )}

          {/* Side-by-Side Cards */}
          {compareMode === "courses" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[c1, c2].map((course, idx) => {
                if (!course) return null;
                const parentDir = verifiedDirections.find((d) => d.key === course.directionKey);
                const matchedColleges = jkColleges.filter(
                  (c) => c.verificationStatus === "verified" && c.programs.includes(course.key)
                );

                return (
                  <Card key={course.key || idx} className="glass-strong border-white/10 p-6 space-y-5 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-[10px]">
                          Program {idx + 1}
                        </Badge>
                        <h3 className="font-bold text-lg font-display">{course.label}</h3>
                        <p className="text-xs text-muted-foreground">{course.description}</p>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-white/5 text-xs">
                        <div>
                          <span className="font-semibold text-foreground flex items-center gap-1">
                            <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
                            Statutory Eligibility:
                          </span>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed bg-white/5 p-2 rounded">
                            {course.eligibility}
                          </p>
                        </div>

                        <div className="p-3 rounded-lg glass border-white/5 space-y-1">
                          <span className="font-semibold text-foreground flex items-center gap-1 text-[11px]">
                            <BookOpen className="h-3.5 w-3.5 text-primary" />
                            Core Curriculum Modules:
                          </span>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">
                            {course.whatYouWillStudy?.join(" • ") || "Standard subject modules."}
                          </p>
                        </div>

                        <div>
                          <span className="font-semibold text-foreground flex items-center gap-1">
                            <GraduationCap className="h-3.5 w-3.5 text-primary" />
                            Verified Colleges ({matchedColleges.length}):
                          </span>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                            {matchedColleges.map((c) => c.name).join(", ") || "Verification pending."}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        onClick={() => navigate({ to: `/dashboard/outcomes/${course.key}` })}
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                      >
                        View Outcomes for {course.label} →
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[d1, d2].map((dir, idx) => {
                if (!dir) return null;
                return (
                  <Card key={dir.key || idx} className="glass-strong border-white/10 p-6 space-y-5 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-[10px]">
                          Field {idx + 1}
                        </Badge>
                        <h3 className="font-bold text-lg font-display">{dir.label}</h3>
                        <p className="text-xs text-muted-foreground">{dir.description}</p>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-white/5 text-xs">
                        <div>
                          <span className="font-semibold text-foreground">Stream Requirement:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {dir.streamRequirements.map((st) => (
                              <Badge key={st} variant="secondary" className="text-[10px]">{st}</Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="font-semibold text-foreground">Programs Included:</span>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                            {dir.courses.map((c) => c.label).join(" • ")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        onClick={() => navigate({ to: `/dashboard/directions/${dir.key}` })}
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                      >
                        View Details for {dir.label} →
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4">
        <Button variant="outline" onClick={() => navigate({ to: "/dashboard/colleges" })}>
          ← Back to Colleges
        </Button>
        <Button onClick={() => navigate({ to: "/dashboard/nextstep" })} size="lg">
          Your Next Step →
        </Button>
      </div>
    </div>
  );
}
