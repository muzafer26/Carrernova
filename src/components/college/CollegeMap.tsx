import { useState, useMemo } from "react";
import { MapPin, Building2, Search, ExternalLink, GraduationCap, Compass } from "lucide-react";
import { jkColleges } from "@/data/jk-colleges";
import type { JKCollege } from "@/types/ps09";
import { Card } from "@/components/ui/card";
import { Sticker } from "@/components/ui/Sticker";

interface CollegeMapProps {
  selectedDistrict?: string;
  selectedProgram?: string;
  onSelectCollege?: (college: JKCollege) => void;
}

export function CollegeMap({ selectedDistrict, selectedProgram, onSelectCollege }: CollegeMapProps) {
  const [search, setSearch] = useState("");
  const [divisionFilter, setDivisionFilter] = useState<"All" | "Jammu" | "Kashmir">("All");
  const [activeCollege, setActiveCollege] = useState<JKCollege | null>(jkColleges[0] || null);

  // Fallback calculation: If strict district + program yields 0, fall back to program across J&K
  const { displayColleges, isDistrictFallback } = useMemo(() => {
    const strictFiltered = jkColleges.filter((c) => {
      if (selectedDistrict && c.district.toLowerCase() !== selectedDistrict.toLowerCase()) {
        return false;
      }
      if (selectedProgram && !c.programs.includes(selectedProgram)) {
        return false;
      }
      if (divisionFilter !== "All" && c.division !== divisionFilter) {
        return false;
      }
      if (search) {
        const query = search.toLowerCase();
        return (
          c.name.toLowerCase().includes(query) ||
          c.district.toLowerCase().includes(query) ||
          (c.affiliation && c.affiliation.toLowerCase().includes(query))
        );
      }
      return true;
    });

    if (strictFiltered.length > 0) {
      return { displayColleges: strictFiltered, isDistrictFallback: false };
    }

    // If empty because of district constraint, fall back to program across J&K
    if (selectedDistrict && selectedProgram) {
      const programColleges = jkColleges.filter((c) => {
        if (!c.programs.includes(selectedProgram)) return false;
        if (divisionFilter !== "All" && c.division !== divisionFilter) return false;
        if (search) {
          const query = search.toLowerCase();
          return (
            c.name.toLowerCase().includes(query) ||
            c.district.toLowerCase().includes(query) ||
            (c.affiliation && c.affiliation.toLowerCase().includes(query))
          );
        }
        return true;
      });
      if (programColleges.length > 0) {
        return { displayColleges: programColleges, isDistrictFallback: true };
      }
    }

    return { displayColleges: jkColleges, isDistrictFallback: false };
  }, [selectedDistrict, selectedProgram, divisionFilter, search]);

  useEffect(() => {
    if (displayColleges.length > 0 && (!activeCollege || !displayColleges.some((c) => c.key === activeCollege.key))) {
      setActiveCollege(displayColleges[0]);
    }
  }, [displayColleges, activeCollege]);

  const handleSelect = (c: JKCollege) => {
    setActiveCollege(c);
    if (onSelectCollege) {
      onSelectCollege(c);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white rounded-3xl border border-slate-200/80 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#e8f1ff] text-[#4582ff] rounded-2xl border border-[#d0e2ff]">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-xl text-[#0f2239]">
              J&K Verified Institution Map
            </h3>
            <p className="text-xs text-[#636363]">
              Discover verified Government Degree Colleges across Jammu & Kashmir by district and division.
            </p>
          </div>
        </div>

        {/* Division Filter */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold font-display">
          {(["All", "Kashmir", "Jammu"] as const).map((div) => (
            <button
              key={div}
              onClick={() => setDivisionFilter(div)}
              className={`px-3 py-1.5 rounded-xl transition ${
                divisionFilter === div
                  ? "bg-[#0f2239] text-white shadow-sm"
                  : "text-[#636363] hover:text-[#0f2239]"
              }`}
            >
              {div === "All" ? "All J&K" : `${div} Division`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive OpenStreetMap Geographic Visualizer */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="p-4 bg-white text-[#0f2239] rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden min-h-[440px] flex flex-col justify-between relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#4582ff]">
                <Compass className="h-4 w-4" />
                <span>Geographic Discovery Layer (OpenStreetMap J&K)</span>
              </div>
              <span className="text-xs font-bold text-[#0f2239] bg-slate-100 px-3 py-1 rounded-full">
                {displayColleges.length} Verified Institutions
              </span>
            </div>

            {isDistrictFallback && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-[11px] leading-relaxed flex items-center gap-2 font-medium">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                <span>
                  No verified GDC in District <strong>{selectedDistrict}</strong> currently lists this program. Displaying verified J&K Government Degree Colleges offering this program:
                </span>
              </div>
            )}

            {/* Real OpenStreetMap Map Embed Container */}
            <div className="relative w-full h-[240px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100 mt-3">
              <iframe
                title="Jammu & Kashmir Verified Colleges Map"
                width="100%"
                height="100%"
                className="w-full h-full border-0"
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=73.5,32.0,76.5,35.0&layer=mapnik${
                  activeCollege?.location
                    ? `&marker=${activeCollege.location.lat},${activeCollege.location.lng}`
                    : ""
                }`}
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-extrabold text-[#0f2239] border border-slate-200 shadow-sm flex items-center gap-1 font-display">
                <MapPin className="h-3 w-3 text-[#ff7f46]" />
                <span>{activeCollege ? `${activeCollege.name} (${activeCollege.district})` : "Jammu & Kashmir"}</span>
              </div>
            </div>

            {/* Interactive College Selector Cards */}
            <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[160px] overflow-y-auto pr-1">
              {displayColleges.map((c) => {
                const isSelected = activeCollege?.key === c.key;
                return (
                  <button
                    key={c.key}
                    onClick={() => handleSelect(c)}
                    className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-1 group cursor-pointer ${
                      isSelected
                        ? "bg-[#ff7f46] border-[#ff7f46] text-white shadow-md font-bold"
                        : "bg-slate-50 border-slate-200/80 text-[#0f2239] hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md ${
                          isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-[#0f2239]"
                        }`}
                      >
                        {c.district}
                      </span>
                      <Building2 className="h-3 w-3 opacity-75" />
                    </div>

                    <div>
                      <h4 className="font-display font-extrabold text-[11px] leading-tight line-clamp-1">
                        {c.name}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-[#636363]">
              <span>Source: Directorate of Higher Education J&K</span>
              <span className="flex items-center gap-1 text-[#4582ff] font-bold">
                <MapPin className="h-3 w-3" /> Real Geographic Map Verified
              </span>
            </div>
          </Card>
        </div>

        {/* College Detail Panel */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by college name, district, university..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#4582ff]"
            />
          </div>

          {activeCollege ? (
            <Card className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xl space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#4582ff] bg-[#e8f1ff] px-2.5 py-1 rounded-lg">
                    {activeCollege.division} Division · {activeCollege.district} District
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-[#0f2239] leading-snug">
                    {activeCollege.name}
                  </h3>
                </div>
                <Sticker name="college" size="md" animate={false} />
              </div>

              {activeCollege.affiliation && (
                <div className="text-xs text-[#636363] flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-[#ff7f46]" />
                  <span>Affiliation: <strong>{activeCollege.affiliation}</strong></span>
                </div>
              )}

              {/* Why This College Rationale */}
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs space-y-1">
                <span className="font-extrabold text-[#0f2239] font-display flex items-center gap-1.5 text-[11px]">
                  <Compass className="h-3.5 w-3.5 text-[#ff7f46]" /> Why This College Is Shown:
                </span>
                <p className="text-[11px] text-[#636363] leading-relaxed">
                  Official Government Degree College located in District <strong>{activeCollege.district}</strong> offering <strong>{activeCollege.programs.length} verified degree pathways</strong> in J&K.
                </p>
              </div>

              {/* Campus Facilities */}
              {activeCollege.facilities && activeCollege.facilities.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-extrabold text-[#0f2239] uppercase tracking-wider font-display">
                    Verified Facilities
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCollege.facilities.map((fac) => (
                      <span
                        key={fac}
                        className="text-[10px] font-bold bg-slate-100 text-[#0f2239] px-2.5 py-1 rounded-lg"
                      >
                        ✓ {fac}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Offered Programmes */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-extrabold text-[#0f2239] uppercase tracking-wider font-display">
                  Offered Degree Programmes ({activeCollege.programs.length})
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeCollege.programs.map((prog) => (
                    <span
                      key={prog}
                      className="text-[10px] font-extrabold uppercase bg-[#e8f1ff] text-[#4582ff] px-2.5 py-1 rounded-lg border border-[#d0e2ff]"
                    >
                      {prog.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                {activeCollege.website && (
                  <a
                    href={activeCollege.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#ff7f46] hover:underline font-display"
                  >
                    Visit Official Portal <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <span className="text-[10px] text-[#636363]">
                  Verified: {activeCollege.source.retrievedOn}
                </span>
              </div>
            </Card>
          ) : (
            <div className="p-8 text-center text-xs text-[#636363] bg-white rounded-3xl border border-slate-200 shadow-md space-y-3">
              <p>We couldn't find a verified institution record for this selection in your current district filter.</p>
              <button
                onClick={() => setDivisionFilter("All")}
                className="text-xs font-extrabold text-[#ff7f46] underline font-display cursor-pointer"
              >
                Explore All J&K Institutions
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
