import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { JourneyProgress } from "@/components/JourneyProgress";
import { matchDirections, isClass10Profile } from "@/lib/directions";
import { rankCourses } from "@/lib/recommendations";
import type { DirectionMatch, StudentProfile, AssessSignalVector, CourseMatch } from "@/types/ps09";
import { Sticker } from "@/components/ui/Sticker";

export const Route = createFileRoute("/dashboard/directions/")({
  component: DirectionsIndexPage,
});

function DirectionsIndexPage() {
  const navigate = useNavigate();
  const [directionMatches, setDirectionMatches] = useState<DirectionMatch[]>([]);
  const [courseMatches, setCourseMatches] = useState<CourseMatch[]>([]);
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("ps09_student_profile");
    const savedWeights = localStorage.getItem("ps09_assess_weights");

    if (!savedProfile) {
      navigate({ to: "/dashboard/profile" });
      return;
    }

    let p: StudentProfile;
    try {
      p = JSON.parse(savedProfile);
      if (!p.class || !Array.isArray(p.interests)) {
        navigate({ to: "/dashboard/profile" });
        return;
      }
    } catch (e) {
      navigate({ to: "/dashboard/profile" });
      return;
    }

    // Class 10 Guard: redirect directly to streams exploration page
    if (isClass10Profile(p)) {
      navigate({ to: "/dashboard/streams" });
      return;
    }

    // Class 12 Guard: require valid stream
    if (!p.stream) {
      navigate({ to: "/dashboard/profile" });
      return;
    }

    let weights: AssessSignalVector = {};
    if (savedWeights) {
      try {
        weights = JSON.parse(savedWeights);
      } catch (e) {}
    }

    setProfile(p);
    const dirResults = matchDirections(p, weights, 4, true);
    setDirectionMatches(dirResults);

    const courseResults = rankCourses(p, weights, 6, true);
    setCourseMatches(courseResults);
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      <JourneyProgress />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-slate-200/80 shadow-md">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-2xl bg-[#0f2239] text-white shrink-0">
            <Sticker name="compass" size="md" animate={false} />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#4582ff] font-display">
              COURSE & PATHWAY RECOMMENDATION ENGINE
            </span>
            <h1 className="text-2xl font-extrabold font-display text-[#0f2239]">
              Your Recommended Courses & Directions
            </h1>
            <p className="text-xs text-[#636363] mt-1 leading-relaxed">
              Course-level personalized matches evaluated against your Class 12 qualification stream ({profile?.stream}) and verified quiz signals.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate({ to: "/dashboard/profile" })}
          className="shrink-0 self-start sm:self-center rounded-xl font-bold font-display"
        >
          Edit Profile
        </Button>
      </div>

      {profile && (
        <Card className="bg-slate-50 border-slate-200/80 p-4 rounded-2xl flex flex-wrap gap-4 text-xs text-[#0f2239]">
          <div><strong className="text-[#4582ff]">Class:</strong> {profile.class}</div>
          <div><strong className="text-[#4582ff]">Stream:</strong> {profile.stream}</div>
          <div><strong className="text-[#4582ff]">Interests:</strong> {profile.interests.join(", ") || "None"}</div>
        </Card>
      )}

      {/* SECTION 1: COURSE-LEVEL RANKED RECOMMENDATIONS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold font-display text-[#0f2239] flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#ff7f46]" />
            <span>Top Recommended Programmes (Course-Level)</span>
          </h2>
          <span className="text-xs text-[#636363] font-bold font-display">
            {courseMatches.length} Eligible Courses Evaluated
          </span>
        </div>

        {courseMatches.length === 0 ? (
          <Card className="p-8 text-center space-y-3 bg-white rounded-3xl border border-slate-200">
            <p className="text-xs text-[#636363]">No verified course matches found for your current profile.</p>
            <Button onClick={() => navigate({ to: "/dashboard/profile" })}>Adjust Profile</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseMatches.map(({ course, score, matchCategory, explanation, signalBreakdown }) => (
              <Card
                key={course.key}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-lg transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full font-display ${
                          matchCategory === "Strong Match"
                            ? "bg-[#ff7f46]/10 text-[#ff7f46] border border-[#ff7f46]/30"
                            : matchCategory === "Good Match"
                            ? "bg-[#4582ff]/10 text-[#4582ff] border border-[#4582ff]/30"
                            : "bg-slate-100 text-[#636363]"
                        }`}
                      >
                        {matchCategory} ({score}/100)
                      </span>
                      <h3 className="font-extrabold font-display text-lg text-[#0f2239] mt-2">
                        {course.label}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#636363] leading-relaxed line-clamp-2">
                    {course.description}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/60 text-xs space-y-1.5">
                    <div className="font-bold text-[#0f2239] flex items-center gap-1.5 font-display text-[11px]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#4582ff]" />
                      <span>Why Recommended:</span>
                    </div>
                    <p className="text-[11px] text-[#636363] leading-relaxed">{explanation}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-[#059669] flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Official J&K College Offering</span>
                  </span>
                  <Button asChild size="sm" className="bg-[#ff7f46] hover:bg-[#e66c35] text-white rounded-xl font-bold font-display">
                    <Link to={`/dashboard/directions/${course.directionKey}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: BROAD DIRECTION CATEGORIES */}
      <div className="space-y-4 pt-4 border-t border-slate-200/80">
        <h2 className="text-xl font-extrabold font-display text-[#0f2239]">
          Broad Direction Categories
        </h2>

        {directionMatches.length === 0 ? (
          <Card className="bg-white rounded-3xl p-8 text-center space-y-3 border border-slate-200">
            <p className="text-xs text-[#636363]">No verified directions match your selected qualifications.</p>
            <Button onClick={() => navigate({ to: "/dashboard/profile" })}>Adjust Qualification Stream</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {directionMatches.map(({ direction, explanation }, idx) => (
              <Card key={direction.key} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-extrabold font-display text-[#0f2239]">{direction.label}</h3>
                      <Badge variant="secondary" className="text-xs font-display">
                        {idx === 0 ? "Top Category" : "Worth Exploring"}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#636363] mt-1 leading-relaxed">{direction.description}</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button asChild size="sm" variant="outline" className="rounded-xl font-bold font-display">
                    <Link to={`/dashboard/directions/${direction.key}`} className="flex items-center gap-2">
                      Explore Direction Category <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

