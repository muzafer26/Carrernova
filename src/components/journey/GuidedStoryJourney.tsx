import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Compass,
  GraduationCap,
  Building,
  Bookmark,
  BookOpen,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  ArrowLeftRight,
  DollarSign,
  FileText,
} from "lucide-react";
import { Sticker } from "@/components/ui/Sticker";
import { directions } from "@/data/jk-directions";
import { jkColleges } from "@/data/jk-colleges";
import { jkSkills } from "@/data/jk-skills";
import { jkGovtPathways } from "@/data/jk-govt-pathways";
import { officialResources } from "@/data/jk-resources";
import { jkScholarships } from "@/data/jk-scholarships";
import { jkAdmissionRoutes } from "@/data/jk-admission-routes";
import { jkLearningResources } from "@/data/jk-learning-resources";
import { class10Streams } from "@/data/jk-streams";
import { CollegeMap } from "@/components/college/CollegeMap";
import { NeutralOptionCompare } from "@/components/compare/NeutralOptionCompare";

interface StudentJourneyState {
  classLevel: "10" | "12" | "";
  stream: string;
  district: string;
  affordabilityConstraint?: "low" | "moderate" | "high" | "unknown";
  primaryGoal: string;
  selectedInterests: string[];
  selectedPathwayFamily: string;
  selectedCourseKey: string;
  detailTab: "overview" | "eligibility" | "colleges" | "scholarships" | "admissions" | "resources" | "outcomes" | "why";
  savedOptions: string[];
}

const DEFAULT_STATE: StudentJourneyState = {
  classLevel: "",
  stream: "",
  district: "Jammu",
  affordabilityConstraint: "unknown",
  primaryGoal: "",
  selectedInterests: [],
  selectedPathwayFamily: "",
  selectedCourseKey: "",
  detailTab: "overview",
  savedOptions: [],
};

const DISTRICTS = [
  "Jammu",
  "Srinagar",
  "Kathua",
  "Anantnag",
  "Baramulla",
  "Udhampur",
  "Rajouri",
  "Poonch",
  "Pulwama",
  "Kupwara",
  "Doda",
  "Bandipora",
  "Budgam",
  "Ganderbal",
  "Kishtwar",
  "Kulgam",
  "Ramban",
  "Reasi",
  "Samba",
  "Shopian",
];

export function GuidedStoryJourney() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [journey, setJourney] = useState<StudentJourneyState>(() => {
    const saved = localStorage.getItem("ps09_guided_journey_state");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    localStorage.setItem("ps09_guided_journey_state", JSON.stringify(journey));
  }, [journey]);

  const updateJourney = (fields: Partial<StudentJourneyState>) => {
    setJourney((prev) => ({ ...prev, ...fields }));
  };

  const handleToggleSave = (courseKey: string) => {
    setJourney((prev) => {
      const exists = prev.savedOptions.includes(courseKey);
      const updated = exists
        ? prev.savedOptions.filter((k) => k !== courseKey)
        : [...prev.savedOptions, courseKey];
      return { ...prev, savedOptions: updated };
    });
  };

  const currentCourse = directions
    .flatMap((d) => d.courses)
    .find((c) => c.key === journey.selectedCourseKey);

  const currentClass10Stream = class10Streams.find(
    (s) => s.key === journey.selectedCourseKey
  );

  const totalSteps = 8;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-8 font-sans">
      {/* Top Header Bar & Progress Steps Indicator */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#0f2239] text-white shadow-sm">
            <Sticker name="compass" size="sm" animate={false} />
          </div>
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-[#4582ff] font-display">
              GUIDED STUDENT JOURNEY
            </div>
            <div className="font-extrabold text-base text-[#0f2239] font-display">
              Step {step} of {totalSteps}:{" "}
              {step === 1 && "About You"}
              {step === 2 && "Your Stream & District"}
              {step === 3 && "What You Want To Explore"}
              {step === 4 && "Discover Interests"}
              {step === 5 && "Relevant Pathway Families"}
              {step === 6 && "Understand This Option"}
              {step === 7 && "Where To Study in J&K (Map)"}
              {step === 8 && "Compare, Save & Next Decision"}
            </div>
          </div>
        </div>

        {/* Progress Indicator Dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i + 1 === step
                  ? "w-8 bg-[#ff7f46]"
                  : i + 1 < step
                  ? "w-2 bg-[#4582ff]"
                  : "w-2 bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Chapter Content Frame */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {/* STEP 1: CLASS SELECTION */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-8"
            >
              <div className="flex items-start gap-5">
                <div className="p-3 bg-[#f4f7fe] border border-slate-100 rounded-2xl shrink-0">
                  <Sticker name="graduate" size="lg" animate={false} />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#4582ff] font-display">
                    CHAPTER 1 • ABOUT YOU
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-display text-[#0f2239]">
                    Hey! Let's start simple. What class are you currently in?
                  </h2>
                  <p className="text-sm text-[#636363] leading-relaxed">
                    We tailor education and career pathways based on your exact academic stage in Jammu & Kashmir.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <button
                  onClick={() => {
                    updateJourney({ classLevel: "10" });
                    setStep(2);
                  }}
                  className={`p-8 rounded-3xl border-2 text-left transition-all duration-200 cursor-pointer space-y-4 ${
                    journey.classLevel === "10"
                      ? "border-[#ff7f46] bg-[#ff7f46]/5 shadow-xl ring-2 ring-[#ff7f46]/20"
                      : "border-slate-200/80 hover:border-[#4582ff] bg-white hover:bg-slate-50 shadow-md"
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#3a86ff] text-white flex items-center justify-center font-display font-extrabold text-xl shadow-md">
                    10
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold font-display text-[#0f2239]">
                      Class 10 Student
                    </h3>
                    <p className="text-xs text-[#636363] leading-relaxed">
                      I want to choose the right academic stream (Science, Commerce, Arts) or explore vocational ITI options.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#3a86ff] uppercase tracking-wider pt-2 font-display">
                    <span>Select Class 10 Path</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </button>

                <button
                  onClick={() => {
                    updateJourney({ classLevel: "12" });
                    setStep(2);
                  }}
                  className={`p-8 rounded-3xl border-2 text-left transition-all duration-200 cursor-pointer space-y-4 ${
                    journey.classLevel === "12"
                      ? "border-[#ff7f46] bg-[#ff7f46]/5 shadow-xl ring-2 ring-[#ff7f46]/20"
                      : "border-slate-200/80 hover:border-[#4582ff] bg-white hover:bg-slate-50 shadow-md"
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#ff7f46] text-white flex items-center justify-center font-display font-extrabold text-xl shadow-md">
                    12
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold font-display text-[#0f2239]">
                      Class 12 Student
                    </h3>
                    <p className="text-xs text-[#636363] leading-relaxed">
                      I am looking for undergraduate degree courses (B.Sc, B.Com, B.A., BCA, BBA) across J&K Government Degree Colleges.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#ff7f46] uppercase tracking-wider pt-2 font-display">
                    <span>Select Class 12 Path</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: STREAM & DISTRICT & CONSTRAINTS */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-8"
            >
              <div className="flex items-start gap-5">
                <div className="p-3 bg-[#f4f7fe] border border-slate-100 rounded-2xl shrink-0">
                  <Sticker name="books" size="lg" animate={false} />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#4582ff] font-display">
                    CHAPTER 1 • ABOUT YOU
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-display text-[#0f2239]">
                    {journey.classLevel === "12"
                      ? "Which stream are you studying and where from?"
                      : "Which J&K district are you studying in?"}
                  </h2>
                  <p className="text-sm text-[#636363] leading-relaxed">
                    This ensures we show programs and colleges verified in your local area.
                  </p>
                </div>
              </div>

              {journey.classLevel === "12" && (
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-wider text-[#0f2239] font-display">
                    Select Your Class 12 Stream:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { key: "science-pcm", label: "Science (PCM)", desc: "Physics, Chem, Math" },
                      { key: "science-pcb", label: "Science (PCB)", desc: "Physics, Chem, Bio" },
                      { key: "science-pcmb", label: "Science (PCMB)", desc: "Math & Biology" },
                      { key: "commerce", label: "Commerce", desc: "Accounts & Business" },
                      { key: "arts", label: "Arts / Humanities", desc: "History, Eco, Pol Sc" },
                    ].map((s) => (
                      <button
                        key={s.key}
                        onClick={() => updateJourney({ stream: s.key })}
                        className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer space-y-1 ${
                          journey.stream === s.key
                            ? "border-[#ff7f46] bg-[#ff7f46]/10 text-[#0f2239] font-bold shadow-md"
                            : "border-slate-200/80 bg-slate-50/50 hover:bg-slate-100 text-[#0f2239]"
                        }`}
                      >
                        <div className="font-extrabold text-sm font-display">{s.label}</div>
                        <div className="text-[11px] text-[#636363]">{s.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-[#0f2239] font-display">
                    Select Your J&K District:
                  </label>
                  <select
                    value={journey.district}
                    onChange={(e) => updateJourney({ district: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-5 py-3.5 text-sm font-bold text-[#0f2239] focus:outline-none focus:ring-2 focus:ring-[#ff7f46]/40"
                  >
                    {DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        District {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-wider text-[#0f2239] font-display">
                    Affordability Consideration:
                  </label>
                  <select
                    value={journey.affordabilityConstraint || "unknown"}
                    onChange={(e) => updateJourney({ affordabilityConstraint: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl px-5 py-3.5 text-sm font-bold text-[#0f2239] focus:outline-none focus:ring-2 focus:ring-[#ff7f46]/40"
                  >
                    <option value="low">Lower-cost / Govt college preferred</option>
                    <option value="moderate">Moderate / Scholarship support</option>
                    <option value="high">Open to fee structures</option>
                    <option value="unknown">No specific constraint</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-[#636363] hover:text-[#0f2239] flex items-center gap-2 font-display cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={journey.classLevel === "12" && !journey.stream}
                  className="bg-[#ff7f46] hover:bg-[#e66c35] disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 font-display cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: WHAT ARE YOU TRYING TO FIGURE OUT? */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-8"
            >
              <div className="flex items-start gap-5">
                <div className="p-3 bg-[#f4f7fe] border border-slate-100 rounded-2xl shrink-0">
                  <Sticker name="target" size="lg" animate={false} />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#4582ff] font-display">
                    CHAPTER 3 • YOUR GOAL
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-display text-[#0f2239]">
                    What are you trying to figure out today?
                  </h2>
                  <p className="text-sm text-[#636363] leading-relaxed">
                    Select your primary objective to customize your exploration journey.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(journey.classLevel === "10"
                  ? [
                      {
                        key: "streams",
                        title: "Explore Class 11–12 School Streams",
                        desc: "Understand Science, Commerce, and Arts subject streams under JKBOSE.",
                        sticker: "books" as const,
                      },
                      {
                        key: "skills",
                        title: "Explore ITI & Vocational Skill Trades",
                        desc: "Practical trades (COPA, Electrician, Plumber) available right after Class 10.",
                        sticker: "target" as const,
                      },
                      {
                        key: "idk",
                        title: "I don't know yet — Help me explore",
                        desc: "Walk me step-by-step through subjects and future possibilities.",
                        sticker: "compass" as const,
                      },
                    ]
                  : [
                      {
                        key: "idk",
                        title: "I don't know yet — Help me explore",
                        desc: "Walk me step-by-step through stream options & career families.",
                        sticker: "compass" as const,
                      },
                      {
                        key: "degrees",
                        title: "I want to explore UG Degree Courses",
                        desc: "B.Sc, B.Com, B.A., BCA, BBA programs in J&K colleges.",
                        sticker: "graduate" as const,
                      },
                      {
                        key: "skills",
                        title: "I want practical & skill options",
                        desc: "ITI vocational trades & polytechnic diplomas.",
                        sticker: "target" as const,
                      },
                      {
                        key: "govt",
                        title: "I want government career pathways",
                        desc: "JKPSC, SSC, Banking, Defense, & civil services pathways.",
                        sticker: "trophy" as const,
                      },
                    ]
                ).map((g) => (
                  <button
                    key={g.key}
                    onClick={() => {
                      updateJourney({ primaryGoal: g.key });
                      setStep(4);
                    }}
                    className={`p-6 rounded-3xl border-2 text-left transition-all duration-200 cursor-pointer space-y-3 flex items-start gap-4 ${
                      journey.primaryGoal === g.key
                        ? "border-[#ff7f46] bg-[#ff7f46]/5 shadow-lg"
                        : "border-slate-200/80 bg-white hover:bg-slate-50 shadow-sm"
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-slate-100 border border-slate-200/60 shrink-0">
                      <Sticker name={g.sticker} size="sm" animate={false} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold font-display text-[#0f2239] text-base">
                        {g.title}
                      </h3>
                      <p className="text-xs text-[#636363] leading-relaxed">{g.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-[#636363] hover:text-[#0f2239] flex items-center gap-2 font-display cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: DISCOVER YOURSELF */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-8"
            >
              <div className="flex items-start gap-5">
                <div className="p-3 bg-[#f4f7fe] border border-slate-100 rounded-2xl shrink-0">
                  <Sticker name="trophy" size="lg" animate={false} />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#4582ff] font-display">
                    CHAPTER 2 • DISCOVER YOURSELF
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-display text-[#0f2239]">
                    What kinds of topics catch your curiosity?
                  </h2>
                  <p className="text-sm text-[#636363] leading-relaxed">
                    You don't need to commit to a career today. Select topics you enjoy exploring:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "Computer & Software",
                  "Biotechnology & Life Sciences",
                  "Chemistry & Lab Work",
                  "Business & Finance",
                  "Management & Leadership",
                  "Literature & Languages",
                  "Economics & Policy",
                  "Hands-on Tech Trades",
                  "Civil Services & Law",
                ].map((interest) => {
                  const isSelected = journey.selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => {
                        const updated = isSelected
                          ? journey.selectedInterests.filter((i) => i !== interest)
                          : [...journey.selectedInterests, interest];
                        updateJourney({ selectedInterests: updated });
                      }}
                      className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer space-y-2 ${
                        isSelected
                          ? "border-[#4582ff] bg-[#4582ff]/10 text-[#0f2239] font-bold shadow-md"
                          : "border-slate-200/80 bg-slate-50/50 hover:bg-slate-100 text-[#0f2239]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold font-display">{interest}</span>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-[#4582ff]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-[#636363] hover:text-[#0f2239] flex items-center gap-2 font-display cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="bg-[#ff7f46] hover:bg-[#e66c35] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 font-display cursor-pointer"
                >
                  <span>See Relevant Families</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: PATHWAY FAMILIES */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-8"
            >
              <div className="flex items-start gap-5">
                <div className="p-3 bg-[#f4f7fe] border border-slate-100 rounded-2xl shrink-0">
                  <Sticker name="college" size="lg" animate={false} />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#4582ff] font-display">
                    CHAPTER 4 • PATHWAY FAMILIES
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-display text-[#0f2239]">
                    Here are relevant pathway options for you:
                  </h2>
                  <p className="text-sm text-[#636363] leading-relaxed">
                    Based on your background in {journey.district} District, explore these verified pathway categories:
                  </p>
                </div>
              </div>

              {journey.classLevel === "10" ? (
                <div className="space-y-4">
                  <div className="p-4 bg-[#e8f1ff] border border-[#d0e2ff] text-[#0f2239] rounded-2xl text-xs space-y-1">
                    <strong className="font-extrabold text-[#4582ff] font-display">School Stage Decision Gate:</strong>
                    <p className="text-[#636363] leading-relaxed">
                      As a Class 10 student, your immediate decision point is selecting your higher secondary stream (Classes 11–12) under JKBOSE. Undergraduate degree courses are downstream options after 10+2.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {class10Streams.map((st) => (
                      <div
                        key={st.key}
                        className="p-6 rounded-3xl border border-slate-200/80 bg-slate-50/50 space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#ff7f46] bg-[#ff7f46]/10 px-2.5 py-1 rounded-full font-display">
                            JKBOSE Stream
                          </span>
                          <h3 className="font-extrabold font-display text-xl text-[#0f2239]">
                            {st.label}
                          </h3>
                          <p className="text-xs text-[#636363] leading-relaxed line-clamp-3">
                            {st.whatYouLearn}
                          </p>
                          <div className="pt-2">
                            <span className="text-[11px] font-bold text-[#0f2239]">Core Subjects:</span>
                            <p className="text-xs text-[#4582ff] font-medium">
                              {st.coreSubjectAreas.join(", ")}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            updateJourney({
                              selectedCourseKey: st.key,
                              selectedPathwayFamily: st.key,
                            });
                            setStep(6);
                          }}
                          className="w-full bg-[#0f2239] hover:bg-[#1a365d] text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-2xl shadow-md transition flex items-center justify-center gap-2 font-display cursor-pointer"
                        >
                          <span>Explore {st.label} Stream</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {directions.map((d) => (
                    <div
                      key={d.key}
                      className="p-6 rounded-3xl border border-slate-200/80 bg-slate-50/50 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-extrabold font-display text-lg text-[#0f2239]">
                            {d.title}
                          </h3>
                          <p className="text-xs text-[#636363]">{d.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {d.courses.map((c) => (
                          <button
                            key={c.key}
                            onClick={() => {
                              updateJourney({
                                selectedCourseKey: c.key,
                                selectedPathwayFamily: d.key,
                              });
                              setStep(6);
                            }}
                            className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer space-y-2 ${
                              journey.selectedCourseKey === c.key
                                ? "border-[#ff7f46] bg-white shadow-md ring-2 ring-[#ff7f46]/20"
                                : "border-slate-200/80 bg-white hover:border-[#4582ff] shadow-2xs"
                            }`}
                          >
                            <div className="font-extrabold text-sm font-display text-[#0f2239]">
                              {c.label}
                            </div>
                            <p className="text-xs text-[#636363] line-clamp-2 leading-relaxed">
                              {c.description}
                            </p>
                            <div className="text-[11px] font-bold text-[#ff7f46] uppercase tracking-wider flex items-center gap-1 font-display pt-1">
                              <span>Understand This Option</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-[#636363] hover:text-[#0f2239] flex items-center gap-2 font-display cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: UNDERSTAND A PATH (PROGRESSIVE DISCLOSURE) */}
          {step === 6 && (journey.classLevel === "10" ? currentClass10Stream : currentCourse) && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-8"
            >
              {journey.classLevel === "10" && currentClass10Stream ? (
                <>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <span className="text-xs font-black uppercase tracking-wider text-[#4582ff] font-display">
                        CHAPTER 6 • UNDERSTAND THIS STREAM
                      </span>
                      <h2 className="text-3xl font-extrabold font-display text-[#0f2239]">
                        {currentClass10Stream.label} Stream (Classes 11–12)
                      </h2>
                      <p className="text-sm text-[#636363] leading-relaxed max-w-2xl">
                        {currentClass10Stream.whatYouLearn}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleSave(currentClass10Stream.key)}
                      className={`px-4 py-2.5 rounded-2xl border font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer font-display ${
                        journey.savedOptions.includes(currentClass10Stream.key)
                          ? "bg-[#ff7f46] text-white border-[#ff7f46] shadow-md"
                          : "bg-slate-50 text-[#0f2239] border-slate-200/80 hover:bg-slate-100"
                      }`}
                    >
                      <Bookmark className="h-4 w-4" />
                      <span>
                        {journey.savedOptions.includes(currentClass10Stream.key) ? "Saved" : "Save Stream"}
                      </span>
                    </button>
                  </div>

                  {/* Progressive Disclosure Sub-Tabs for Class 10 */}
                  <div className="flex flex-wrap gap-2 border-b border-slate-200/80 pb-4">
                    {[
                      { key: "overview", label: "Core Subjects & Overview" },
                      { key: "questions", label: "Questions to Consider" },
                      { key: "future", label: "Future Pathways (After 10+2)" },
                      { key: "why", label: "Why Is This Shown?" },
                      { key: "jkbose", label: "JKBOSE Official Verification" },
                    ].map((t) => (
                      <button
                        key={t.key}
                        onClick={() => updateJourney({ detailTab: t.key as any })}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold font-display transition cursor-pointer ${
                          journey.detailTab === t.key || (journey.detailTab as string) === "overview" && t.key === "overview"
                            ? "bg-[#0f2239] text-white shadow-sm"
                            : "bg-slate-100 text-[#636363] hover:text-[#0f2239]"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* Class 10 Tab 1: Core Subjects & Overview */}
                  {(journey.detailTab === "overview" || !journey.detailTab) && (
                    <div className="space-y-4 bg-slate-50/60 p-6 rounded-2xl border border-slate-200/60">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">
                        Core Subject Areas (JKBOSE Faculty of {currentClass10Stream.label})
                      </h4>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {currentClass10Stream.coreSubjectAreas.map((subj, idx) => (
                          <span
                            key={idx}
                            className="bg-white border border-slate-200 text-[#0f2239] font-bold text-xs px-3 py-1.5 rounded-xl shadow-2xs"
                          >
                            {subj}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-[#636363] leading-relaxed pt-2">
                        {currentClass10Stream.whatYouLearn}
                      </p>
                    </div>
                  )}

                  {/* Class 10 Tab 2: Questions to Consider */}
                  {journey.detailTab === "questions" && (
                    <div className="space-y-4 bg-slate-50/60 p-6 rounded-2xl border border-slate-200/60">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">
                        Self-Reflection Questions for Class 10 Students
                      </h4>
                      <ul className="space-y-2 text-xs text-[#636363] list-disc list-inside leading-relaxed">
                        {currentClass10Stream.questionsToConsider.map((q, idx) => (
                          <li key={idx} className="text-[#0f2239] font-medium">{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Class 10 Tab 3: Future Pathways */}
                  {journey.detailTab === "future" && (
                    <div className="space-y-4 bg-amber-50/60 p-6 rounded-2xl border border-amber-200/60">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase text-amber-700 font-display tracking-wider">
                          Contextual Information Only — Not Immediate Selection
                        </span>
                        <h4 className="font-extrabold font-display text-[#0f2239] text-base">
                          What Choosing {currentClass10Stream.label} Keeps Open After Class 12:
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 gap-2 pt-1">
                        {currentClass10Stream.ugPathExamples.map((ex, idx) => (
                          <div key={idx} className="p-3 bg-white rounded-xl border border-amber-100 text-xs text-[#0f2239] font-medium flex items-center gap-2">
                            <Sparkles className="h-3.5 w-3.5 text-[#ff7f46] shrink-0" />
                            <span>{ex}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Class 10 Tab 4: Why Shown */}
                  {journey.detailTab === "why" && (
                    <div className="space-y-4 bg-[#e8f1ff]/60 p-6 rounded-2xl border border-[#d0e2ff]">
                      <div className="flex items-center gap-2 text-[#4582ff] font-extrabold font-display text-sm">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Evidence-Based Rationale</span>
                      </div>
                      <p className="text-xs text-[#0f2239] leading-relaxed">
                        You selected interests such as {journey.selectedInterests.join(", ") || "broad exploration"}. Exploring the {currentClass10Stream.label} stream helps align your higher secondary subjects with these interests.
                      </p>
                    </div>
                  )}

                  {/* Class 10 Tab 5: JKBOSE Official Info */}
                  {journey.detailTab === "jkbose" && (
                    <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">
                        Official J&K Board Source
                      </h4>
                      <p className="text-xs text-[#636363]">
                        {currentClass10Stream.source.label}
                      </p>
                      <a
                        href={currentClass10Stream.source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-extrabold text-[#ff7f46] hover:underline inline-flex items-center gap-1 font-display"
                      >
                        Visit Official JKBOSE Portal <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}
                </>
              ) : currentCourse ? (
                <>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <span className="text-xs font-black uppercase tracking-wider text-[#4582ff] font-display">
                        CHAPTER 6 • UNDERSTAND THIS PATHWAY
                      </span>
                      <h2 className="text-3xl font-extrabold font-display text-[#0f2239]">
                        {currentCourse.label}
                      </h2>
                      <p className="text-sm text-[#636363] leading-relaxed max-w-2xl">
                        {currentCourse.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleSave(currentCourse.key)}
                      className={`px-4 py-2.5 rounded-2xl border font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer font-display ${
                        journey.savedOptions.includes(currentCourse.key)
                          ? "bg-[#ff7f46] text-white border-[#ff7f46] shadow-md"
                          : "bg-slate-50 text-[#0f2239] border-slate-200/80 hover:bg-slate-100"
                      }`}
                    >
                      <Bookmark className="h-4 w-4" />
                      <span>
                        {journey.savedOptions.includes(currentCourse.key) ? "Saved" : "Save Option"}
                      </span>
                    </button>
                  </div>

                  {/* Progressive Disclosure Sub-Tabs */}
                  <div className="flex flex-wrap gap-2 border-b border-slate-200/80 pb-4">
                    {[
                      { key: "overview", label: "What Will I Study?" },
                      { key: "eligibility", label: "Can I Get In?" },
                      { key: "scholarships", label: "Scholarships & Fee Support" },
                      { key: "admissions", label: "Admission Route & Portal" },
                      { key: "resources", label: "Curated Learning Resources" },
                      { key: "why", label: "Why Is This Shown?" },
                      { key: "outcomes", label: "What Can It Lead To?" },
                    ].map((t) => (
                      <button
                        key={t.key}
                        onClick={() => updateJourney({ detailTab: t.key as any })}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold font-display transition cursor-pointer ${
                          journey.detailTab === t.key
                            ? "bg-[#0f2239] text-white shadow-sm"
                            : "bg-slate-100 text-[#636363] hover:text-[#0f2239]"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* Sub-Tab 1: Overview */}
                  {journey.detailTab === "overview" && (
                    <div className="space-y-4 bg-slate-50/60 p-6 rounded-2xl border border-slate-200/60">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">
                        Program Overview
                      </h4>
                      <p className="text-xs text-[#636363] leading-relaxed">
                        {currentCourse.description}
                      </p>
                    </div>
                  )}

                  {/* Sub-Tab 2: Eligibility */}
                  {journey.detailTab === "eligibility" && (
                    <div className="space-y-4 bg-slate-50/60 p-6 rounded-2xl border border-slate-200/60">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">
                        Eligibility & Entrance Exams
                      </h4>
                      <div className="space-y-2 text-xs text-[#636363]">
                        <div>
                          <strong className="text-[#0f2239]">Eligible Stream:</strong>{" "}
                          {journey.stream || "Class 12 Science / Commerce / Arts"}
                        </div>
                        <div>
                          <strong className="text-[#0f2239]">Required Entrance Exams:</strong>{" "}
                          {currentCourse.relatedExams?.join(", ") || "CUET UG / J&K Samarth Portal Merit"}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sub-Tab 3: Scholarships */}
                  {journey.detailTab === "scholarships" && (
                    <div className="space-y-4">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">
                        Potentially Relevant Financial Support (J&K)
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {jkScholarships.map((s) => (
                          <div key={s.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-extrabold text-[#0f2239]">{s.name}</span>
                              <span className="text-[10px] font-black uppercase bg-[#4582ff]/10 text-[#4582ff] px-2 py-0.5 rounded">
                                {s.authority}
                              </span>
                            </div>
                            <p className="text-xs text-[#636363]">{s.eligibilitySummary}</p>
                            <a href={s.officialUrl} target="_blank" rel="noreferrer" className="text-[11px] font-extrabold text-[#ff7f46] hover:underline inline-flex items-center gap-1">
                              Verify Eligibility on Official Portal <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sub-Tab 4: Admissions */}
                  {journey.detailTab === "admissions" && (
                    <div className="space-y-4">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">
                        Official Admission Routes
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {jkAdmissionRoutes.map((ar) => (
                          <div key={ar.id} className="p-4 bg-[#0f2239] text-white rounded-2xl space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-extrabold text-white">{ar.name}</span>
                              <span className="text-[10px] font-bold text-[#00d6d3]">{ar.forLevel}</span>
                            </div>
                            <p className="text-xs text-slate-300">{ar.description}</p>
                            <a href={ar.officialWebsite} target="_blank" rel="noreferrer" className="text-[11px] font-extrabold text-[#ff7f46] hover:underline inline-flex items-center gap-1">
                              Open Official Admission Portal <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sub-Tab 5: Learning Resources */}
                  {journey.detailTab === "resources" && (
                    <div className="space-y-4">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">
                        Curated Open Learning Resources
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {jkLearningResources.map((res) => (
                          <div key={res.key} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                            <div className="font-extrabold text-xs text-[#0f2239]">{res.title}</div>
                            <p className="text-[11px] text-[#636363]">{res.description}</p>
                            <a href={res.url} target="_blank" rel="noreferrer" className="text-[11px] font-extrabold text-[#4582ff] hover:underline inline-flex items-center gap-1">
                              Access Resource <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sub-Tab 6: Why Shown */}
                  {journey.detailTab === "why" && (
                    <div className="space-y-4 bg-[#e8f1ff]/60 p-6 rounded-2xl border border-[#d0e2ff]">
                      <div className="flex items-center gap-2 text-[#4582ff] font-extrabold font-display text-sm">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Evidence-Backed Explanation</span>
                      </div>
                      <p className="text-xs text-[#0f2239] leading-relaxed">
                        You are seeing this option because your current academic background in Class {journey.classLevel} makes it eligible, and verified offering colleges exist in Jammu & Kashmir.
                      </p>
                    </div>
                  )}

                  {/* Sub-Tab 7: Outcomes */}
                  {journey.detailTab === "outcomes" && (
                    <div className="space-y-4 bg-slate-50/60 p-6 rounded-2xl border border-slate-200/60">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">
                        Verified Outcomes & Pathways
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentCourse.outcomes?.map((o, idx) => (
                          <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                            <div className="font-bold text-xs text-[#0f2239]">{o.label}</div>
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-[#4582ff] inline-block mt-1">
                              {o.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : null}

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={() => setStep(5)}
                  className="px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-[#636363] hover:text-[#0f2239] flex items-center gap-2 font-display cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Pathways</span>
                </button>
                <button
                  onClick={() => setStep(7)}
                  className="bg-[#ff7f46] hover:bg-[#e66c35] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 font-display cursor-pointer"
                >
                  <span>See Where To Study in J&K (Map)</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 7: WHERE TO STUDY IN J&K (MAP & LIST) */}
          {step === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-8"
            >
              <div className="flex items-start gap-5">
                <div className="p-3 bg-[#f4f7fe] border border-slate-100 rounded-2xl shrink-0">
                  <Sticker name="college" size="lg" animate={false} />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#4582ff] font-display">
                    CHAPTER 7 • WHERE CAN YOU STUDY?
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-display text-[#0f2239]">
                    Government Degree Colleges Map & Directory
                  </h2>
                  <p className="text-sm text-[#636363] leading-relaxed">
                    Verified institutions offering degree programs in {journey.district} District and across J&K:
                  </p>
                </div>
              </div>

              {/* J&K Interactive Institution Map */}
              <CollegeMap
                selectedDistrict={journey.district}
                selectedProgram={journey.selectedCourseKey}
              />

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={() => setStep(6)}
                  className="px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-[#636363] hover:text-[#0f2239] flex items-center gap-2 font-display cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(8)}
                  className="bg-[#ff7f46] hover:bg-[#e66c35] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 font-display cursor-pointer"
                >
                  <span>Compare Options & Next Decision</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 8: MY SAVED OPTIONS & NEUTRAL COMPARISON & NEXT DECISION */}
          {step === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-8"
            >
              <div className="flex items-start gap-5">
                <div className="p-3 bg-[#f4f7fe] border border-slate-100 rounded-2xl shrink-0">
                  <Sticker name="trophy" size="lg" animate={false} />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#4582ff] font-display">
                    CHAPTER 8 • FINAL SUMMARY, COMPARISON & NEXT DECISION
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-display text-[#0f2239]">
                    Review & Compare Your Options
                  </h2>
                  <p className="text-sm text-[#636363] leading-relaxed">
                    Compare courses side-by-side without biased winner scoring, and proceed to the official portal.
                  </p>
                </div>
              </div>

              {/* Neutral Comparison Section */}
              <NeutralOptionCompare
                initialOptionAId={journey.selectedCourseKey || "bsc-computer-application"}
                initialOptionBId="bca"
                onSaveOption={(key) => handleToggleSave(key)}
              />

              {/* Current Position Summary Box */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="text-[11px] font-black uppercase tracking-wider text-[#636363] font-display">
                    YOUR CLASS & STREAM
                  </div>
                  <div className="font-extrabold font-display text-[#0f2239] text-base">
                    Class {journey.classLevel || "12"}{" "}
                    {journey.stream ? `(${journey.stream.toUpperCase()})` : ""}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="text-[11px] font-black uppercase tracking-wider text-[#636363] font-display">
                    LOCATION & CONSTRAINT
                  </div>
                  <div className="font-extrabold font-display text-[#0f2239] text-base">
                    District {journey.district}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="text-[11px] font-black uppercase tracking-wider text-[#636363] font-display">
                    SAVED OPTIONS
                  </div>
                  <div className="font-extrabold font-display text-[#ff7f46] text-base">
                    {journey.savedOptions.length} Options Saved
                  </div>
                </div>
              </div>

              {/* Recommended Next Official Action */}
              <div className="p-6 rounded-3xl bg-[#0f2239] text-white space-y-4 shadow-lg">
                <div className="flex items-center gap-2 text-[#00d6d3] text-xs font-black uppercase tracking-wider font-display">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>RECOMMENDED NEXT OFFICIAL ACTION</span>
                </div>
                <h3 className="font-extrabold font-display text-xl text-white">
                  Submit Admission Registration on J&K Samarth Portal
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Admissions for degree courses across all Government Degree Colleges in Jammu & Kashmir are processed on the official Samarth higher education portal.
                </p>
                <div className="pt-2">
                  <a
                    href="https://jk.samarth.ac.in"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#ff7f46] hover:bg-[#e66c35] text-white font-extrabold text-xs uppercase tracking-wider transition font-display shadow-md"
                  >
                    <span>Open J&K Samarth Portal</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-[#636363] hover:text-[#0f2239] flex items-center gap-2 font-display cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Start Over</span>
                </button>
                <button
                  onClick={() => navigate({ to: "/dashboard" })}
                  className="bg-[#4582ff] hover:bg-[#3a75e6] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 font-display cursor-pointer"
                >
                  <span>Go to Overview Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

