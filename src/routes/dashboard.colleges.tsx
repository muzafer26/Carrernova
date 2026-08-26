import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, GraduationCap, MapPin } from "lucide-react";
import { JourneyProgress } from "@/components/JourneyProgress";
import { getCollegesForCourse, isClass10Profile } from "@/lib/directions";
import { directions } from "@/data/jk-directions";
import { jkColleges } from "@/data/jk-colleges";
import type { StudentProfile } from "@/types/ps09";
import { Sticker } from "@/components/ui/Sticker";

export const Route = createFileRoute("/dashboard/colleges")({
  component: CollegesPage,
  validateSearch: (search: Record<string, unknown> = {}) => {
    return {
      course: typeof search?.course === "string" ? search.course : "",
      district: typeof search?.district === "string" ? search.district : "",
    };
  },
});

function CollegesPage() {
  const { course: initialCourse, district: initialDistrict } = Route.useSearch();
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

  const verifiedColleges = jkColleges.filter(
    (c) => c.verificationStatus === "verified" && c.source.status === "verified"
  );
  const verifiedDistricts = Array.from(
    new Set(verifiedColleges.map((c) => c.district))
  ).sort();

  const allVerifiedCourses = directions.flatMap((d) =>
    d.courses.filter((c) => c.verificationStatus === "verified")
  );

  const defaultCourse = allVerifiedCourses.some((c) => c.key === initialCourse)
    ? initialCourse
    : allVerifiedCourses[0]?.key || "bsc-computer-application";

  const defaultDistrict = verifiedDistricts.includes(initialDistrict)
    ? initialDistrict
    : "all";

  const [selectedCourse, setSelectedCourse] = useState(defaultCourse);
  const [selectedDistrict, setSelectedDistrict] = useState(defaultDistrict);

  useEffect(() => {
    if (initialCourse && allVerifiedCourses.some((c) => c.key === initialCourse)) {
      setSelectedCourse(initialCourse);
    }
    if (initialDistrict && verifiedDistricts.includes(initialDistrict)) {
      setSelectedDistrict(initialDistrict);
    } else if (!initialDistrict || initialDistrict === "") {
      setSelectedDistrict("all");
    }
  }, [initialCourse, initialDistrict]);

  const filterDistrict = selectedDistrict === "all" ? undefined : selectedDistrict;
  const matchedColleges = getCollegesForCourse(selectedCourse, filterDistrict);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <JourneyProgress />

      <div className="flex items-start gap-4 p-6 glass-strong rounded-3xl border border-white/10">
        <Sticker name="college" size="lg" />
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-display">Where You Can Study</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Verified Government Degree Colleges (GDCs) in Jammu & Kashmir offering your chosen course (Verified CareerNova Subset).
          </p>
        </div>
      </div>

      {/* Filter Options */}
      <Card className="glass-strong border-white/10 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">Choose a Course</label>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a course" />
            </SelectTrigger>
            <SelectContent>
              {allVerifiedCourses.map((c) => (
                <SelectItem key={c.key} value={c.key}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">Choose Your District</label>
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger>
              <SelectValue placeholder="All Verified Districts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Verified Districts ({verifiedDistricts.join(", ")})</SelectItem>
              {verifiedDistricts.map((d) => (
                <SelectItem key={d} value={d}>
                  {d} District
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Regional Verification Coverage Notice */}
      <Card className="glass border-white/10 p-3.5 flex items-center gap-3 text-xs text-muted-foreground">
        <MapPin className="h-4 w-4 text-primary shrink-0" />
        <p>
          <strong className="text-foreground">Regional Coverage Note:</strong> All displayed records are verified against official Government Degree College portals and University of Jammu & University of Kashmir affiliation directories across both Jammu and Kashmir Divisions.
        </p>
      </Card>

      {/* College Results */}
      {matchedColleges.length === 0 ? (
        <Card className="glass border-white/10 p-8 text-center space-y-3">
          <GraduationCap className="h-8 w-8 text-muted-foreground mx-auto" />
          <h3 className="font-semibold text-base">No Colleges Found for This Selection</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            No government degree college in this specific district offers the selected course yet in our verified dataset. Try selecting &quot;All Districts&quot; to see available options across J&K.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchedColleges.map((college) => (
            <Card key={college.key} className="glass-strong border-white/10 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-base leading-tight">{college.name}</h3>
                  <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-[10px] shrink-0">
                    Official College Information
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> District: {college.district} ({college.type})
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Verified Courses Offered Here:</span>
                <div className="flex flex-wrap gap-1">
                  {college.programs.map((pKey) => {
                    const cObj = allVerifiedCourses.find((c) => c.key === pKey);
                    return (
                      <Badge key={pKey} variant="secondary" className="text-[10px]">
                        {cObj?.label || pKey}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs">
                <a
                  href={college.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary flex items-center gap-1 hover:underline"
                >
                  Official College Website <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4">
        <Button variant="outline" onClick={() => navigate({ to: "/dashboard/directions" })}>
          ← Back to Directions
        </Button>
        <Button onClick={() => navigate({ to: "/dashboard/compare" })} size="lg">
          Compare Your Options →
        </Button>
      </div>
    </div>
  );
}
