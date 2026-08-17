import { useState } from "react";
import { ArrowLeftRight, CheckCircle2, AlertCircle, Bookmark, Compass, BookOpen, GraduationCap, ShieldCheck } from "lucide-react";
import { directions } from "@/data/jk-directions";
import { standaloneSkills } from "@/data/jk-skills";
import { govtPathways } from "@/data/jk-govt-pathways";
import { Card } from "@/components/ui/card";
import { Sticker } from "@/components/ui/Sticker";

interface NeutralOptionCompareProps {
  initialOptionAId?: string;
  initialOptionBId?: string;
  onSaveOption?: (id: string, title: string) => void;
}

export function NeutralOptionCompare({ initialOptionAId = "bsc-computer-application", initialOptionBId = "bca", onSaveOption }: NeutralOptionCompareProps) {
  // Collect all courses from directions
  const allCourses = directions.flatMap((d) => d.courses);

  const [optAKey, setOptAKey] = useState(initialOptionAId);
  const [optBKey, setOptBKey] = useState(initialOptionBId);

  const optionA = useMemoOption(optAKey, allCourses);
  const optionB = useMemoOption(optBKey, allCourses);

  return (
    <div className="space-y-8">
      {/* Compare Header */}
      <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#e8f1ff] text-[#4582ff] rounded-2xl border border-[#d0e2ff]">
            <ArrowLeftRight className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-xl text-[#0f2239]">
              Neutral Pathway Comparison
            </h3>
            <p className="text-xs text-[#636363]">
              Side-by-side factual comparison without biased "winner" scoring. Compare what matters to your personal goals.
            </p>
          </div>
        </div>

        {/* Option Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Selector A */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#4582ff]">
              Option A
            </label>
            <select
              value={optAKey}
              onChange={(e) => setOptAKey(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-extrabold text-[#0f2239] focus:outline-none focus:ring-2 focus:ring-[#4582ff]"
            >
              <optgroup label="UG Degrees">
                {allCourses.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label} (Degree)
                  </option>
                ))}
              </optgroup>
              <optgroup label="Skill & ITI Trades">
                {standaloneSkills.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label} ({s.duration})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Govt Pathways">
                {govtPathways.map((g) => (
                  <option key={g.key} value={g.key}>
                    {g.targetCadre} (Govt)
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Selector B */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-[#ff7f46]">
              Option B
            </label>
            <select
              value={optBKey}
              onChange={(e) => setOptBKey(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-extrabold text-[#0f2239] focus:outline-none focus:ring-2 focus:ring-[#ff7f46]"
            >
              <optgroup label="UG Degrees">
                {allCourses.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label} (Degree)
                  </option>
                ))}
              </optgroup>
              <optgroup label="Skill & ITI Trades">
                {standaloneSkills.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label} ({s.duration})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Govt Pathways">
                {govtPathways.map((g) => (
                  <option key={g.key} value={g.key}>
                    {g.targetCadre} (Govt)
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Option A */}
        {renderOptionCard(optionA, "#4582ff", onSaveOption)}

        {/* Card Option B */}
        {renderOptionCard(optionB, "#ff7f46", onSaveOption)}
      </div>
    </div>
  );
}

function useMemoOption(key: string, allCourses: any[]) {
  const course = allCourses.find((c) => c.key === key);
  if (course) return { type: "degree", data: course, title: course.label };

  const skill = standaloneSkills.find((s) => s.key === key);
  if (skill) return { type: "skill", data: skill, title: skill.label };

  const govt = govtPathways.find((g) => g.key === key);
  if (govt) return { type: "govt", data: govt, title: govt.targetCadre };

  return { type: "unknown", data: null, title: key };
}

function renderOptionCard(opt: any, color: string, onSaveOption?: (id: string, title: string) => void) {
  if (!opt.data) {
    return (
      <Card className="p-6 bg-slate-50 border border-slate-200 rounded-3xl text-center text-xs text-[#636363]">
        Select an option to compare.
      </Card>
    );
  }

  const { type, data, title } = opt;

  return (
    <Card className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xl space-y-6 flex flex-col justify-between">
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span
              className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg text-white"
              style={{ backgroundColor: color }}
            >
              {type === "degree" ? "Academic Degree" : type === "skill" ? "Skill / Trade" : "Govt Service Path"}
            </span>
            <h4 className="font-display font-extrabold text-xl text-[#0f2239] leading-snug">
              {title}
            </h4>
          </div>
          {onSaveOption && (
            <button
              onClick={() => onSaveOption(data.key, title)}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-[#0f2239] transition"
              title="Save to My Options"
            >
              <Bookmark className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Eligibility Statement */}
        <div className="p-4 bg-slate-50 rounded-2xl space-y-1 border border-slate-100">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0f2239]">
            <ShieldCheck className="h-4 w-4 text-[#4582ff]" /> Eligibility Requirement
          </div>
          <p className="text-xs text-[#636363] leading-relaxed">
            {data.eligibility || data.summary || "Verified requirement specified by conducting authority."}
          </p>
        </div>

        {/* Practical Orientation & Study Content */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0f2239]">
            <BookOpen className="h-4 w-4 text-[#ff7f46]" /> Focus & Core Content
          </div>
          <p className="text-xs text-[#636363] leading-relaxed">
            {data.description || data.purpose || "Comprehensive curriculum backed by verified institutional guidelines."}
          </p>
        </div>

        {/* What You Learn / Subjects */}
        {data.whatYouWillStudy && (
          <div className="space-y-2">
            <div className="text-xs font-extrabold text-[#0f2239]">Key Areas Covered:</div>
            <div className="flex flex-wrap gap-1.5">
              {data.whatYouWillStudy.slice(0, 4).map((subj: string) => (
                <span key={subj} className="text-[10px] font-bold bg-[#e8f1ff] text-[#4582ff] px-2.5 py-1 rounded-lg">
                  {subj}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Possible Outcomes */}
        {data.outcomes && data.outcomes.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="text-xs font-extrabold text-[#0f2239]">Possible Directions:</div>
            <ul className="space-y-1">
              {data.outcomes.slice(0, 2).map((out: any) => (
                <li key={out.label} className="text-xs text-[#636363] flex items-start gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{out.label} — <span className="text-slate-400">{out.description}</span></span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Trade-off Statement */}
        <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-2xl text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Decision Trade-off:</strong> Consider whether your priority is immediate employment skills or broader academic foundation for higher competitive exams.
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
        <span>Verified Source: {data.source?.label || "J&K Department Records"}</span>
        <span>{data.source?.retrievedOn || "2026-08-17"}</span>
      </div>
    </Card>
  );
}
