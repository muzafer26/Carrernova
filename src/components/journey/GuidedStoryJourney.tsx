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
  AlertCircle,
  MapPin,
} from "lucide-react";
import { Sticker } from "@/components/ui/Sticker";
import { directions } from "@/data/jk-directions";
import { jkColleges } from "@/data/jk-colleges";
import { standaloneSkills } from "@/data/jk-skills";
import { govtPathways } from "@/data/jk-govt-pathways";
import { officialResources } from "@/data/jk-resources";
import { jkScholarships } from "@/data/jk-scholarships";
import { jkAdmissionRoutes } from "@/data/jk-admission-routes";
import { jkLearningResources } from "@/data/jk-learning-resources";
import { class10Streams } from "@/data/jk-streams";
import { CollegeMap } from "@/components/college/CollegeMap";
import { NeutralOptionCompare } from "@/components/compare/NeutralOptionCompare";
import { rankCourses, checkCourseEligibility } from "@/lib/recommendations";
import type { StudentProfile } from "@/types/ps09";

interface StudentJourneyState {
  classLevel: "10" | "12" | "";
  stream: string;
  district: string;
  affordabilityConstraint?: "low" | "moderate" | "high" | "unknown";
  primaryGoal: string;
  selectedInterests: string[];
  selectedPathwayFamily: string;
  selectedCourseKey: string;
  detailTab: "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09";
  savedOptions: string[];
}

const DEFAULT_STATE: StudentJourneyState = {
  classLevel: "12",
  stream: "science-pcm",
  district: "Jammu",
  affordabilityConstraint: "unknown",
  primaryGoal: "degrees",
  selectedInterests: [],
  selectedPathwayFamily: "sciences",
  selectedCourseKey: "bsc-computer-application",
  detailTab: "01",
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
    setJourney((prev) => {
      const nextState = { ...prev, ...fields };

      // STATE RESET & INVALIDATION RULES
      if (fields.classLevel && fields.classLevel !== prev.classLevel) {
        nextState.stream = fields.classLevel === "10" ? "" : (prev.stream || "science-pcm");
        nextState.selectedCourseKey = "";
        nextState.selectedPathwayFamily = "";
        nextState.savedOptions = []; // Invalidate stale saved items across levels
      }

      if (fields.stream && fields.stream !== prev.stream) {
        nextState.selectedCourseKey = "";
        nextState.selectedPathwayFamily = "";
        nextState.savedOptions = prev.savedOptions.filter((key) => {
          const course = directions.flatMap((d) => d.courses).find((c) => c.key === key);
          if (!course) return true;
          const isEligible = checkCourseEligibility(course, {
            class: nextState.classLevel === "10" ? "Class 10" : "Class 12",
            stream: fields.stream,
            interests: nextState.selectedInterests,
            district: nextState.district,
          });
          return isEligible === "ELIGIBLE";
        });
      }

      if (fields.primaryGoal && fields.primaryGoal !== prev.primaryGoal) {
        nextState.selectedCourseKey = "";
        nextState.selectedPathwayFamily = "";
      }

      const profileToSave: StudentProfile = {
        class: nextState.classLevel === "10" ? "Class 10" : "Class 12",
        stream: nextState.classLevel === "10" ? "" : nextState.stream,
        district: nextState.district,
        affordabilityConstraint: nextState.affordabilityConstraint,
        interests: nextState.selectedInterests,
        goalPreference: nextState.primaryGoal,
      };
      localStorage.setItem("ps09_student_profile", JSON.stringify(profileToSave));

      return nextState;
    });
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

  const studentProfile: StudentProfile = React.useMemo(
    () => ({
      class: journey.classLevel === "10" ? "Class 10" : "Class 12",
      stream: journey.stream,
      district: journey.district,
      affordabilityConstraint: journey.affordabilityConstraint,
      interests: journey.selectedInterests,
      goalPreference: journey.primaryGoal,
    }),
    [
      journey.classLevel,
      journey.stream,
      journey.district,
      journey.affordabilityConstraint,
      journey.selectedInterests,
      journey.primaryGoal,
    ]
  );

  // Dynamic choice-dependent interest topics based on stage and stream
  const availableInterests = React.useMemo(() => {
    if (journey.classLevel === "10") {
      return [
        "Mathematics & Problem Solving",
        "Biological Sciences & Nature",
        "Business & Commercial Numbers",
        "Reading, Writing & Languages",
        "Technology & Computing",
        "Practical Hands-on Tech Skills",
      ];
    }

    switch (journey.stream) {
      case "science-pcm":
        return [
          "Computer & Software",
          "Mathematics & Data Science",
          "Physics & Engineering",
          "Business & Finance",
          "Civil Services & Law",
          "Exploring Broadly",
        ];
      case "science-pcb":
        return [
          "Biotechnology & Life Sciences",
          "Health & Medical Sciences",
          "Chemistry & Lab Research",
          "Environmental Science",
          "Civil Services & Law",
          "Exploring Broadly",
        ];
      case "science-pcmb":
        return [
          "Computer & Software",
          "Biotechnology & Life Sciences",
          "Mathematics & Data Science",
          "Health & Medical Sciences",
          "Business & Finance",
          "Civil Services & Law",
        ];
      case "commerce":
        return [
          "Accounting & Finance",
          "Business & Entrepreneurship",
          "Economics & Policy",
          "Banking & Financial Services",
          "Marketing & Management",
          "Civil Services & Law",
        ];
      case "arts":
        return [
          "History & Cultural Studies",
          "Politics & Public Policy",
          "Literature & Languages",
          "Psychology & Social Sciences",
          "Economics & Society",
          "Media, Journalism & Law",
        ];
      default:
        return [
          "Computer & Software",
          "Biotechnology & Life Sciences",
          "Business & Finance",
          "Literature & Languages",
          "Civil Services & Law",
          "Exploring Broadly",
        ];
    }
  }, [journey.classLevel, journey.stream]);

  // Detector for adversarial interest vs eligibility conflicts
  const ineligibleInterestConflicts = React.useMemo(() => {
    if (journey.classLevel === "10") return [];
    const conflicts: Array<{ interest: string; courseLabel: string; requiredStream: string }> = [];

    const allCourses = directions.flatMap((d) => d.courses);
    for (const intr of journey.selectedInterests) {
      const intrLower = intr.toLowerCase();
      for (const c of allCourses) {
        const eligibility = checkCourseEligibility(c, studentProfile);
        if (eligibility === "NOT_ELIGIBLE") {
          if (
            (intrLower.includes("biotech") || intrLower.includes("life science")) && c.key === "bsc-biotechnology" ||
            (intrLower.includes("computer") || intrLower.includes("software")) && c.key === "bsc-computer-application"
          ) {
            const reqStream = c.key === "bsc-biotechnology" ? "Science (PCB or PCMB)" : "Science (PCM, PCMB, IT/CS)";
            if (!conflicts.some((cf) => cf.courseLabel === c.label)) {
              conflicts.push({ interest: intr, courseLabel: c.label, requiredStream: reqStream });
            }
          }
        }
      }
    }
    return conflicts;
  }, [journey.classLevel, journey.selectedInterests, studentProfile]);

  const rankedCourseMatches = React.useMemo(() => {
    if (journey.classLevel === "10") return [];
    return rankCourses(studentProfile, {}, 10, true);
  }, [studentProfile, journey.classLevel]);

  const currentCourse = directions
    .flatMap((d) => d.courses)
    .find((c) => c.key === journey.selectedCourseKey);

  const currentClass10Stream = class10Streams.find(
    (s) => s.key === journey.selectedCourseKey
  );

  const currentSkill = standaloneSkills.find(
    (s) => s.key === journey.selectedCourseKey
  );

  const currentGovt = govtPathways.find(
    (g) => g.key === journey.selectedCourseKey
  );

  // Active pathway resolution (strictly explicit selection)
  const activeCourse = currentCourse;
  const activeClass10 = currentClass10Stream;
  const activeSkill = currentSkill;
  const activeGovt = currentGovt;
  const hasExplicitSelection = Boolean(
    activeCourse || activeClass10 || activeSkill || activeGovt
  );

  const totalSteps = 9;

  return (
    <div className="max-w-4xl mx-auto py-3 sm:py-6 px-2 sm:px-4 space-y-4 sm:space-y-8 font-sans">
      {/* Navigation & Progress Indicator Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#0f2239] text-white shadow-sm shrink-0">
            <Sticker name="compass" size="sm" animate={false} />
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#4582ff] font-display">
              GUIDED DECISION JOURNEY
            </div>
            <div className="font-extrabold text-sm sm:text-base text-[#0f2239] font-display">
              Step {step} of {totalSteps}:{" "}
              {step === 1 && "Welcome"}
              {step === 2 && "Academic Stage"}
              {step === 3 && "Pathway Thinking"}
              {step === 4 && "Stream & District"}
              {step === 5 && "Discover Curiosity"}
              {step === 6 && "Relevant Pathway Options"}
              {step === 7 && "Pathway Deep Dive"}
              {step === 8 && "J&K College Locator Map"}
              {step === 9 && "Comparison & Official Action"}
            </div>
          </div>
        </div>

        {/* Minimal Progress Dots */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i + 1 === step
                  ? "w-6 sm:w-8 bg-[#ff7f46]"
                  : i + 1 < step
                  ? "w-2 bg-[#4582ff]"
                  : "w-2 bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Journey Screen Container */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {/* SCREEN 1: START EXPLORING EXPERIENCE */}
          {step === 1 && (
            <motion.div
              key="screen1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl space-y-8 text-center flex flex-col items-center"
            >
              <div className="p-4 bg-[#f4f7fe] border border-slate-100 rounded-3xl">
                <Sticker name="graduate" size="lg" animate={false} />
              </div>

              <div className="space-y-3 max-w-xl">
                <span className="text-xs font-black uppercase tracking-wider text-[#4582ff] font-display bg-[#4582ff]/10 px-3 py-1 rounded-full">
                  CAREERNOVA • J&K EDUCATION NAVIGATOR
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#0f2239] tracking-tight">
                  Let's get to know you.
                </h1>
                <p className="text-base text-[#636363] leading-relaxed font-normal">
                  Answer a few simple questions and we'll help you explore education and career paths relevant to you in Jammu & Kashmir.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="bg-[#ff7f46] hover:bg-[#e66c35] text-white font-extrabold text-sm uppercase tracking-wider px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center gap-3 font-display cursor-pointer"
                >
                  <span>Let's start</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 2: ACADEMIC STAGE */}
          {step === 2 && (
            <motion.div
              key="screen2"
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
                    STAGE 1 • ACADEMIC LEVEL
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-display text-[#0f2239]">
                    Where are you in your education journey?
                  </h2>
                  <p className="text-sm text-[#636363] leading-relaxed">
                    Select your current school or higher secondary completion stage.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <button
                  onClick={() => {
                    updateJourney({ classLevel: "10" });
                    setStep(3);
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
                      I'm in Class 10
                    </h3>
                    <p className="text-xs text-[#636363] leading-relaxed">
                      Exploring higher secondary stream choices (Science, Commerce, Arts) or practical ITI trades under JKBOSE.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#3a86ff] uppercase tracking-wider pt-2 font-display">
                    <span>Select Class 10</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </button>

                <button
                  onClick={() => {
                    updateJourney({ classLevel: "12" });
                    setStep(3);
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
                      I've completed Class 12
                    </h3>
                    <p className="text-xs text-[#636363] leading-relaxed">
                      Looking for undergraduate degree programs, skill vocational diplomas, or government service exam pathways.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#ff7f46] uppercase tracking-wider pt-2 font-display">
                    <span>Select Class 12</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-[#636363] hover:text-[#0f2239] flex items-center gap-2 font-display cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: PATHWAY THINKING */}
          {step === 3 && (
            <motion.div
              key="screen3"
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
                    STAGE 2 • PATHWAY GOAL
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-display text-[#0f2239]">
                    {journey.classLevel === "10"
                      ? "What are you thinking about after Class 10?"
                      : "What are you thinking about next?"}
                  </h2>
                  <p className="text-sm text-[#636363] leading-relaxed">
                    {journey.classLevel === "10"
                      ? "These are your primary Class 11–12 school stream choices."
                      : "These are your primary post-12 higher education goals."}
                  </p>
                </div>
              </div>

              {journey.classLevel === "10" ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: "science", title: "Science Stream", desc: "Physics, Chemistry, Biology & Mathematics" },
                      { key: "commerce", title: "Commerce Stream", desc: "Accountancy, Business Studies & Economics" },
                      { key: "arts", title: "Arts & Humanities", desc: "History, Political Science & Sociology" },
                      { key: "idk", title: "I'm not sure yet", desc: "Help me explore subject trade-offs and future possibilities" },
                    ].map((g) => (
                      <button
                        key={g.key}
                        onClick={() => {
                          updateJourney({ primaryGoal: g.key });
                          setStep(4);
                        }}
                        className={`p-6 rounded-3xl border-2 text-left transition-all duration-200 cursor-pointer space-y-2 ${
                          journey.primaryGoal === g.key
                            ? "border-[#ff7f46] bg-[#ff7f46]/5 shadow-lg"
                            : "border-slate-200/80 bg-white hover:bg-slate-50 shadow-sm"
                        }`}
                      >
                        <h3 className="font-extrabold font-display text-[#0f2239] text-base">{g.title}</h3>
                        <p className="text-xs text-[#636363] leading-relaxed">{g.desc}</p>
                      </button>
                    ))}
                  </div>

                  {/* Separate Section: ITI After Class 10 */}
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
                    <div className="flex items-center gap-2 text-[#ff7f46] font-extrabold font-display text-xs uppercase tracking-wider">
                      <Sparkles className="h-4 w-4" />
                      <span>Another Route After Class 10</span>
                    </div>
                    <h4 className="font-extrabold font-display text-[#0f2239] text-base">
                      Prefer practical skill training right away?
                    </h4>
                    <p className="text-xs text-[#636363] leading-relaxed">
                      This is a different pathway from continuing through Class 11–12. Explore verified ITI vocational trades under the J&K Department of Skill Development.
                    </p>
                    <button
                      onClick={() => {
                        updateJourney({ primaryGoal: "skills" });
                        setStep(4);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0f2239] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#1a365d] transition font-display cursor-pointer"
                    >
                      <span>Explore ITI & Vocational Pathways</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: "degrees", title: "A university degree", desc: "4-Year NEP UG degree programs (B.Sc, B.Com, B.A., BCA, BBA) across J&K Government Degree Colleges." },
                    { key: "skills", title: "Skill / vocational training", desc: "Practical NSQF Level 4/5 vocational trade diplomas (ITI Hardware, MLT, Web Dev, Accounting)." },
                    { key: "govt", title: "Government career", desc: "Public service exam maps (JKPSC CCE Administrative Cadre, JKSSB Executive Cadre)." },
                    { key: "idk", title: "I'm not sure yet", desc: "That's okay. Let me narrow it down by exploring eligible stream pathways." },
                  ].map((g) => (
                    <button
                      key={g.key}
                      onClick={() => {
                        updateJourney({ primaryGoal: g.key });
                        setStep(4);
                      }}
                      className={`p-6 rounded-3xl border-2 text-left transition-all duration-200 cursor-pointer space-y-2 ${
                        journey.primaryGoal === g.key
                          ? "border-[#ff7f46] bg-[#ff7f46]/5 shadow-lg"
                          : "border-slate-200/80 bg-white hover:bg-slate-50 shadow-sm"
                      }`}
                    >
                      <h3 className="font-extrabold font-display text-[#0f2239] text-base">{g.title}</h3>
                      <p className="text-xs text-[#636363] leading-relaxed">{g.desc}</p>
                    </button>
                  ))}
                </div>
              )}

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

          {/* SCREEN 4: STREAM & DISTRICT & CONSTRAINTS */}
          {step === 4 && (
            <motion.div
              key="screen4"
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
                    STAGE 3 • STREAM & LOCALITY
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
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-[#636363] hover:text-[#0f2239] flex items-center gap-2 font-display cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(5)}
                  disabled={journey.classLevel === "12" && !journey.stream}
                  className="bg-[#ff7f46] hover:bg-[#e66c35] disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 font-display cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 5: DISCOVER CURIOSITY */}
          {step === 5 && (
            <motion.div
              key="screen5"
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
                    STAGE 4 • INTEREST EXPLORATION
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
                {availableInterests.map((interest) => {
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
                  onClick={() => setStep(4)}
                  className="px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-[#636363] hover:text-[#0f2239] flex items-center gap-2 font-display cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(6)}
                  className="bg-[#ff7f46] hover:bg-[#e66c35] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 font-display cursor-pointer"
                >
                  <span>See Relevant Pathways</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 6: RELEVANT PATHWAY OPTIONS */}
          {step === 6 && (
            <motion.div
              key="screen6"
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
                    STAGE 5 • RELEVANT PATHWAYS
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-display text-[#0f2239]">
                    Here are relevant options for you in J&K:
                  </h2>
                  <p className="text-sm text-[#636363] leading-relaxed">
                    Based on your educational stage in {journey.district} District, explore these verified pathways:
                  </p>
                </div>
              </div>

              {/* Adversarial Qualification Conflict Notice Banner */}
              {ineligibleInterestConflicts.length > 0 && (
                <div className="p-6 bg-amber-50 border border-amber-200/90 rounded-3xl space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-extrabold font-display text-xs uppercase tracking-wider">
                    <AlertCircle className="h-4 w-4 text-amber-700" />
                    <span>QUALIFICATION REQUIREMENT NOTICE</span>
                  </div>
                  <p className="text-xs text-amber-950 leading-relaxed font-semibold">
                    You expressed interest in <strong>"{ineligibleInterestConflicts[0].interest}"</strong>. Under J&K university eligibility regulations, degree programs in that domain (e.g. {ineligibleInterestConflicts[0].courseLabel}) require <strong>{ineligibleInterestConflicts[0].requiredStream}</strong>.
                  </p>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Because your current stream is <strong>{journey.stream.toUpperCase()}</strong>, this specific program is unavailable. Your interest is valid, so CareerNova presents your eligible degree pathways below alongside practical skill alternatives.
                  </p>
                </div>
              )}

              {journey.classLevel === "10" ? (
                <div className="space-y-8">
                  {/* Stream Choices Section */}
                  <div className="space-y-4">
                    <h3 className="font-extrabold font-display text-xl text-[#0f2239]">
                      Higher Secondary School Streams (Classes 11–12 under JKBOSE)
                    </h3>

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
                            <h4 className="font-extrabold font-display text-lg text-[#0f2239]">
                              {st.label} Stream
                            </h4>
                            <p className="text-xs text-[#636363] leading-relaxed line-clamp-3">
                              {st.whatYouLearn}
                            </p>
                            <div className="pt-1">
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
                              setStep(7);
                            }}
                            className="w-full bg-[#0f2239] hover:bg-[#1a365d] text-white font-extrabold text-xs uppercase tracking-wider py-3 rounded-2xl shadow-md transition flex items-center justify-center gap-2 font-display cursor-pointer"
                          >
                            <span>Understand {st.label}</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ITI Vocational Trades Section for Class 10 */}
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs font-black uppercase tracking-wider text-[#ff7f46] font-display">
                        ANOTHER ROUTE AFTER CLASS 10
                      </span>
                      <h3 className="font-extrabold font-display text-lg text-[#0f2239]">
                        Prefer practical skill training right away? Explore ITI & Vocational Pathways
                      </h3>
                      <p className="text-xs text-[#636363] leading-relaxed">
                        This is a different pathway from continuing through Class 11–12. Explore verified ITI vocational trades under the J&K Department of Skill Development.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {standaloneSkills.map((sk) => (
                        <div key={sk.key} className="p-5 bg-white rounded-2xl border border-slate-200/80 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase bg-[#ff7f46]/10 text-[#ff7f46] px-2 py-0.5 rounded font-display">
                              {sk.nsqfLevel}
                            </span>
                            <span className="text-[11px] font-bold text-slate-500 font-display">{sk.duration}</span>
                          </div>
                          <h4 className="font-extrabold font-display text-sm text-[#0f2239]">{sk.label}</h4>
                          <p className="text-xs text-[#636363] line-clamp-2">{sk.description}</p>
                          <a href={sk.source.url} target="_blank" rel="noreferrer" className="text-xs font-extrabold text-[#ff7f46] hover:underline inline-flex items-center gap-1 font-display pt-1">
                            Official Portal <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* SKILL-FIRST PRESENTATION */}
                  {journey.primaryGoal === "skills" && (
                    <div className="space-y-4">
                      <div className="p-4 bg-[#e8f1ff] border border-[#d0e2ff] rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[#4582ff] font-extrabold font-display text-xs uppercase tracking-wider">
                          <Sparkles className="h-4 w-4" />
                          <span>SKILL / VOCATIONAL PATHWAY • PRIMARY RESULTS</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#636363]">J&K Dept. of Skill Development (DSD ITI)</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {standaloneSkills.map((sk) => (
                          <div key={sk.key} className="p-6 bg-white rounded-3xl border-2 border-[#ff7f46]/40 shadow-md space-y-3 flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-wider bg-[#ff7f46]/10 text-[#ff7f46] px-2.5 py-0.5 rounded-full font-display">
                                  Skill / Vocational Pathway • {sk.nsqfLevel}
                                </span>
                                <span className="text-[11px] font-extrabold text-[#636363] font-display">{sk.duration}</span>
                              </div>
                              <h3 className="font-extrabold font-display text-base text-[#0f2239]">{sk.label}</h3>
                              <p className="text-xs text-[#636363] leading-relaxed">{sk.description}</p>
                              <div className="pt-1 text-xs">
                                <strong className="text-[#0f2239]">Practical Skills Provided:</strong>{" "}
                                <span className="text-[#636363]">{sk.careerProspects.join(", ")}</span>
                              </div>
                            </div>
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                              <span className="text-[11px] text-slate-500">{sk.conductingAuthority}</span>
                              <a href={sk.source.url} target="_blank" rel="noreferrer" className="text-xs font-extrabold text-[#ff7f46] hover:underline inline-flex items-center gap-1 font-display">
                                Official Portal <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* GOVERNMENT CAREER PRESENTATION */}
                  {journey.primaryGoal === "govt" && (
                    <div className="space-y-4">
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2 text-emerald-900 font-extrabold font-display text-xs uppercase tracking-wider">
                          <ShieldCheck className="h-4 w-4 text-emerald-700" />
                          <span>GOVERNMENT CAREER PATHWAYS • DESTINATIONS</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700">JKPSC & JKSSB Official Rules</span>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {govtPathways.map((gp) => (
                          <div key={gp.key} className="p-6 bg-white rounded-3xl border-2 border-emerald-300/80 shadow-md space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full font-display">
                                Government Career Path
                              </span>
                              <span className="text-[11px] font-bold text-slate-500 font-display">Authority: {gp.conductingAuthority}</span>
                            </div>
                            <h3 className="font-extrabold font-display text-lg text-[#0f2239]">{gp.targetCadre}</h3>
                            <p className="text-xs text-[#636363] leading-relaxed">{gp.summary}</p>

                            {/* Goverment Career Hierarchy Breakdown */}
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 text-xs">
                              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                                <div className="text-[10px] font-black text-[#4582ff] font-display uppercase">1. Goal</div>
                                <div className="font-bold text-[#0f2239]">{gp.targetCadre.split("(")[0]}</div>
                              </div>
                              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                                <div className="text-[10px] font-black text-[#4582ff] font-display uppercase">2. Education Req</div>
                                <div className="font-bold text-[#0f2239]">Bachelor's Degree</div>
                              </div>
                              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                                <div className="text-[10px] font-black text-[#4582ff] font-display uppercase">3. Exam</div>
                                <div className="font-bold text-[#0f2239]">{gp.key.toUpperCase()}</div>
                              </div>
                              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                                <div className="text-[10px] font-black text-[#4582ff] font-display uppercase">4. Selection</div>
                                <div className="font-bold text-[#0f2239]">Merit / CBT / Interview</div>
                              </div>
                            </div>

                            <p className="text-[11px] text-slate-500 italic">
                              * Note: Completing an undergraduate degree meets the educational stage prerequisite for examination. It does not guarantee employment. Verify current recruitment notifications on the official portal.
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* "I DON'T KNOW" EXPERIENCE */}
                  {journey.primaryGoal === "idk" && (
                    <div className="p-6 bg-amber-50/90 border border-amber-200 rounded-3xl space-y-3">
                      <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs font-display uppercase tracking-wider">
                        <Compass className="h-4 w-4 text-amber-700" />
                        <span>Exploration Mode Active ("I don't know" state)</span>
                      </div>
                      <h4 className="font-extrabold font-display text-amber-950 text-base">
                        That's okay. Let's narrow it down.
                      </h4>
                      <p className="text-xs text-amber-800 leading-relaxed">
                        CareerNova does not manufacture arbitrary predictions. Below are verified eligible pathway families for your Class 12 {journey.stream.toUpperCase()} stream. Investigate each family to discover what interests you.
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {journey.primaryGoal === "skills" && (
                      <h4 className="font-extrabold font-display text-[#0f2239] text-sm pt-4">
                        Academic Degree Pathways (Secondary Exploration)
                      </h4>
                    )}
                    <div className="grid grid-cols-1 gap-4">
                      {rankedCourseMatches.map((match) => {
                        const c = match.course;
                        const isSelected = journey.selectedCourseKey === c.key;
                        return (
                          <div
                            key={c.key}
                            className={`p-6 rounded-3xl border-2 transition-all duration-200 space-y-4 ${
                              isSelected
                                ? "border-[#ff7f46] bg-white shadow-xl ring-2 ring-[#ff7f46]/20"
                                : "border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-[#4582ff] shadow-sm"
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#4582ff]/10 text-[#4582ff] font-display">
                                    {match.matchCategory}
                                  </span>
                                  <span className="text-[10px] font-bold text-slate-400 font-display">
                                    Relevance Score: {match.score}/100
                                  </span>
                                </div>
                                <h3 className="font-extrabold font-display text-lg text-[#0f2239]">
                                  {c.label}
                                </h3>
                              </div>

                              <button
                                onClick={() => {
                                  updateJourney({
                                    selectedCourseKey: c.key,
                                    selectedPathwayFamily: c.directionKey || "sciences",
                                  });
                                  setStep(7);
                                }}
                                className="bg-[#0f2239] hover:bg-[#1a365d] text-white font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-2xl shadow-md transition flex items-center justify-center gap-2 font-display shrink-0 cursor-pointer"
                              >
                                <span>Understand Option</span>
                                <ArrowRight className="h-4 w-4" />
                              </button>
                            </div>

                            <p className="text-xs text-[#636363] leading-relaxed">
                              {c.description}
                            </p>

                            {/* Clear Distinction: STREAM vs INTEREST vs ELIGIBILITY */}
                            <div className="p-4 bg-slate-100/80 rounded-2xl border border-slate-200/60 space-y-2">
                              <div className="text-[11px] font-extrabold text-[#0f2239] font-display flex items-center gap-1.5">
                                <ShieldCheck className="h-3.5 w-3.5 text-[#4582ff]" />
                                <span>Why this option is appearing:</span>
                              </div>
                              <ul className="space-y-1 text-xs text-[#636363] list-disc list-inside">
                                {match.signalBreakdown.positive.map((reason, rIdx) => (
                                  <li key={rIdx}>{reason}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={() => setStep(5)}
                  className="px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-[#636363] hover:text-[#0f2239] flex items-center gap-2 font-display cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 7: PATHWAY DETAIL PAGE (LEVEL 1 - 8 PROGRESSIVE DISCLOSURE: SECTIONS 01 TO 09) */}
          {step === 7 && (
            <motion.div
              key="screen7"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-8"
            >
              {!hasExplicitSelection ? (
                <div className="space-y-6">
                  <div className="p-6 bg-[#e8f1ff] border border-[#d0e2ff] rounded-3xl space-y-2">
                    <div className="flex items-center gap-2 text-[#4582ff] font-extrabold text-xs uppercase font-display">
                      <Compass className="h-4 w-4" />
                      <span>EXPLORE RELEVANT PATHWAYS</span>
                    </div>
                    <h3 className="font-extrabold font-display text-xl text-[#0f2239]">
                      Which option would you like to explore in detail?
                    </h3>
                    <p className="text-xs text-[#636363] leading-relaxed">
                      CareerNova does not decide your career for you. Select any option below to examine its statutory eligibility rules, core subjects, verified J&K colleges, and official application portals.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {journey.classLevel === "10"
                      ? class10Streams.map((st) => (
                          <button
                            key={st.key}
                            onClick={() => updateJourney({ selectedCourseKey: st.key })}
                            className="p-5 bg-slate-50 hover:bg-white rounded-3xl border border-slate-200 hover:border-[#ff7f46] text-left transition shadow-2xs hover:shadow-md space-y-2 cursor-pointer group"
                          >
                            <span className="text-[10px] font-black uppercase text-[#ff7f46] bg-[#ff7f46]/10 px-2.5 py-0.5 rounded-full font-display">
                              JKBOSE Stream
                            </span>
                            <h4 className="font-extrabold font-display text-base text-[#0f2239] group-hover:text-[#ff7f46] transition">
                              {st.label} Stream (Classes 11–12)
                            </h4>
                            <p className="text-xs text-[#636363] line-clamp-2">{st.whatYouLearn}</p>
                          </button>
                        ))
                      : rankedCourseMatches.map((m) => (
                          <button
                            key={m.course.key}
                            onClick={() => updateJourney({ selectedCourseKey: m.course.key })}
                            className="p-5 bg-slate-50 hover:bg-white rounded-3xl border border-slate-200 hover:border-[#4582ff] text-left transition shadow-2xs hover:shadow-md space-y-2 cursor-pointer group"
                          >
                            <span className="text-[10px] font-black uppercase text-[#4582ff] bg-[#4582ff]/10 px-2.5 py-0.5 rounded-full font-display">
                              {m.matchCategory}
                            </span>
                            <h4 className="font-extrabold font-display text-base text-[#0f2239] group-hover:text-[#4582ff] transition">
                              {m.course.label}
                            </h4>
                            <p className="text-xs text-[#636363] line-clamp-2">{m.course.description}</p>
                          </button>
                        ))}
                  </div>
                </div>
              ) : journey.classLevel === "10" && activeClass10 ? (
                <>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <span className="text-xs font-black uppercase tracking-wider text-[#4582ff] font-display">
                        PATHWAY DEEP DIVE • CLASS 10 STREAM
                      </span>
                      <h2 className="text-3xl font-extrabold font-display text-[#0f2239]">
                        {activeClass10.label} Stream (Classes 11–12)
                      </h2>
                      <p className="text-sm text-[#636363] leading-relaxed max-w-2xl">
                        {activeClass10.whatYouLearn}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleSave(activeClass10.key)}
                      className={`px-4 py-2.5 rounded-2xl border font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer font-display ${
                        journey.savedOptions.includes(activeClass10.key)
                          ? "bg-[#ff7f46] text-white border-[#ff7f46] shadow-md"
                          : "bg-slate-50 text-[#0f2239] border-slate-200/80 hover:bg-slate-100"
                      }`}
                    >
                      <Bookmark className="h-4 w-4" />
                      <span>{journey.savedOptions.includes(activeClass10.key) ? "Saved" : "Save Stream"}</span>
                    </button>
                  </div>

                  {/* Class 10 Progressive Disclosure Tabs */}
                  <div className="flex flex-wrap gap-2 border-b border-slate-200/80 pb-4">
                    {[
                      { key: "01", label: "01 — What is it?" },
                      { key: "02", label: "02 — Core Subjects" },
                      { key: "03", label: "03 — Self-Reflection" },
                      { key: "04", label: "04 — Future Pathways (After 10+2)" },
                      { key: "05", label: "05 — ITI Trade Alternatives" },
                      { key: "06", label: "06 — Official Board Source" },
                    ].map((t) => (
                      <button
                        key={t.key}
                        onClick={() => updateJourney({ detailTab: t.key as any })}
                        className={`px-3.5 py-2 rounded-xl text-xs font-extrabold font-display transition cursor-pointer ${
                          journey.detailTab === t.key || (!journey.detailTab && t.key === "01")
                            ? "bg-[#0f2239] text-white shadow-sm"
                            : "bg-slate-100 text-[#636363] hover:text-[#0f2239]"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {(journey.detailTab === "01" || !journey.detailTab) && (
                    <div className="space-y-4 bg-slate-50/60 p-6 rounded-2xl border border-slate-200/60">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">01 — What is it?</h4>
                      <p className="text-xs text-[#636363] leading-relaxed">{activeClass10.whatYouLearn}</p>
                    </div>
                  )}

                  {journey.detailTab === "02" && (
                    <div className="space-y-4 bg-slate-50/60 p-6 rounded-2xl border border-slate-200/60">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">02 — Core Subjects</h4>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {activeClass10.coreSubjectAreas.map((subj, idx) => (
                          <span key={idx} className="bg-white border border-slate-200 text-[#0f2239] font-bold text-xs px-3 py-1.5 rounded-xl shadow-2xs">
                            {subj}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {journey.detailTab === "03" && (
                    <div className="space-y-4 bg-slate-50/60 p-6 rounded-2xl border border-slate-200/60">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">03 — Questions to Consider</h4>
                      <ul className="space-y-2 text-xs text-[#636363] list-disc list-inside leading-relaxed">
                        {activeClass10.questionsToConsider.map((q, idx) => (
                          <li key={idx} className="text-[#0f2239] font-medium">{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {journey.detailTab === "04" && (
                    <div className="space-y-4 bg-amber-50/60 p-6 rounded-2xl border border-amber-200/60">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">04 — What choosing this keeps open after Class 12</h4>
                      <div className="grid grid-cols-1 gap-2 pt-1">
                        {activeClass10.ugPathExamples.map((ex, idx) => (
                          <div key={idx} className="p-3 bg-white rounded-xl border border-amber-100 text-xs text-[#0f2239] font-medium flex items-center gap-2">
                            <Sparkles className="h-3.5 w-3.5 text-[#ff7f46] shrink-0" />
                            <span>{ex}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {journey.detailTab === "05" && (
                    <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">05 — Skill & ITI Alternatives Right After 10th</h4>
                      <p className="text-xs text-[#636363]">
                        If you prefer immediate practical training rather than academic Class 11–12, explore J&K ITI trade diplomas (Computer Hardware, Soil Testing, Retail).
                      </p>
                    </div>
                  )}

                  {journey.detailTab === "06" && (
                    <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">06 — Official JKBOSE Source</h4>
                      <p className="text-xs text-[#636363]">{activeClass10.source.label}</p>
                      <a href={activeClass10.source.url} target="_blank" rel="noreferrer" className="text-xs font-extrabold text-[#ff7f46] hover:underline inline-flex items-center gap-1 font-display">
                        Visit Official JKBOSE Portal <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}
                </>
              ) : (activeCourse || activeSkill || activeGovt) ? (
                <>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <span className="text-xs font-black uppercase tracking-wider text-[#4582ff] font-display">
                        PATHWAY DEEP DIVE • UNDERGRADUATE DEGREE
                      </span>
                      <h2 className="text-3xl font-extrabold font-display text-[#0f2239]">
                        {activeCourse?.label || "Undergraduate Degree Pathway"}
                      </h2>
                      <p className="text-sm text-[#636363] leading-relaxed max-w-2xl">
                        {activeCourse?.description || "Verified program in Jammu & Kashmir higher education."}
                      </p>
                    </div>

                    {activeCourse && (
                      <button
                        onClick={() => handleToggleSave(activeCourse.key)}
                        className={`px-4 py-2.5 rounded-2xl border font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition cursor-pointer font-display ${
                          journey.savedOptions.includes(activeCourse.key)
                            ? "bg-[#ff7f46] text-white border-[#ff7f46] shadow-md"
                            : "bg-slate-50 text-[#0f2239] border-slate-200/80 hover:bg-slate-100"
                        }`}
                      >
                        <Bookmark className="h-4 w-4" />
                        <span>{journey.savedOptions.includes(activeCourse.key) ? "Saved" : "Save Option"}</span>
                      </button>
                    )}
                  </div>

                  {/* Level 1 - 8 Progressive Disclosure Sub-Tabs: 01 to 09 */}
                  <div className="flex flex-wrap gap-2 border-b border-slate-200/80 pb-4">
                    {[
                      { key: "01", label: "01 — What is it?" },
                      { key: "02", label: "02 — Why seeing this?" },
                      { key: "03", label: "03 — What will you study?" },
                      { key: "04", label: "04 — Eligibility" },
                      { key: "05", label: "05 — Where in J&K?" },
                      { key: "06", label: "06 — Financial Support" },
                      { key: "07", label: "07 — What comes next?" },
                      { key: "08", label: "08 — Alternatives" },
                      { key: "09", label: "09 — Official Action" },
                    ].map((t) => (
                      <button
                        key={t.key}
                        onClick={() => updateJourney({ detailTab: t.key as any })}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold font-display transition cursor-pointer ${
                          journey.detailTab === t.key || (!journey.detailTab && t.key === "01")
                            ? "bg-[#0f2239] text-white shadow-sm"
                            : "bg-slate-100 text-[#636363] hover:text-[#0f2239]"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* 01 — What is it? */}
                  {(journey.detailTab === "01" || !journey.detailTab) && (
                    <div className="space-y-4 bg-slate-50/60 p-6 rounded-2xl border border-slate-200/60">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">01 — What is it?</h4>
                      <p className="text-xs text-[#636363] leading-relaxed">{activeCourse?.description}</p>
                    </div>
                  )}

                  {/* 02 — Why are you seeing this? */}
                  {journey.detailTab === "02" && (
                    <div className="space-y-4 bg-[#e8f1ff]/60 p-6 rounded-2xl border border-[#d0e2ff]">
                      <div className="flex items-center gap-2 text-[#4582ff] font-extrabold font-display text-sm">
                        <ShieldCheck className="h-4 w-4" />
                        <span>02 — Why are you seeing this option?</span>
                      </div>
                      <p className="text-xs text-[#0f2239] leading-relaxed">
                        You selected {journey.stream.toUpperCase()} in Class 12. This course accepts your educational stream, aligns with your selected curiosity interests ({journey.selectedInterests.join(", ") || "broad exploration"}), and verified Government Degree Colleges exist in Jammu & Kashmir.
                      </p>
                    </div>
                  )}

                  {/* 03 — What will you study / learn? */}
                  {journey.detailTab === "03" && (
                    <div className="space-y-4 bg-slate-50/60 p-6 rounded-2xl border border-slate-200/60">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">03 — What will you study?</h4>
                      <p className="text-xs text-[#636363] leading-relaxed">
                        Curriculum structured under the 4-Year National Education Policy (NEP-2020) framework covering major, minor, and multidisciplinary subject combinations.
                      </p>
                    </div>
                  )}

                  {/* 04 — Eligibility */}
                  {journey.detailTab === "04" && (
                    <div className="space-y-4 bg-slate-50/60 p-6 rounded-2xl border border-slate-200/60">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">04 — Eligibility Requirements</h4>
                      <div className="space-y-2 text-xs text-[#636363]">
                        <div><strong className="text-[#0f2239]">Statutory Prerequisite:</strong> {activeCourse?.eligibility || "Passed 10+2 from JKBOSE or recognized board"}</div>
                        <div><strong className="text-[#0f2239]">Entrance Exams:</strong> {activeCourse?.relatedExams?.join(", ") || "CUET UG / J&K Samarth Merit"}</div>
                      </div>
                    </div>
                  )}

                  {/* 05 — Where can you pursue it in J&K? */}
                  {journey.detailTab === "05" && (
                    <div className="space-y-4 bg-slate-50/60 p-6 rounded-2xl border border-slate-200/60">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">05 — Verified J&K Government Degree Colleges</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {jkColleges
                          .filter((col) => activeCourse && col.programs.includes(activeCourse.key))
                          .map((col) => (
                            <div key={col.key} className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                              <div className="font-bold text-[#0f2239]">{col.name}</div>
                              <div className="text-[11px] text-[#636363]">District {col.district} • {col.affiliation}</div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* 06 — Affordability & verified support */}
                  {journey.detailTab === "06" && (
                    <div className="space-y-4">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">
                        06 — Financial support you may want to check
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {jkScholarships.map((s) => (
                          <div key={s.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-extrabold text-[#0f2239]">{s.name}</span>
                              <span className="text-[10px] font-black uppercase bg-[#4582ff]/10 text-[#4582ff] px-2 py-0.5 rounded">
                                Potentially Relevant
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

                  {/* 07 — What could come next? */}
                  {journey.detailTab === "07" && (
                    <div className="space-y-4 bg-slate-50/60 p-6 rounded-2xl border border-slate-200/60">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">07 — What could come next?</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeCourse?.outcomes?.map((o, idx) => (
                          <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
                            <div className="font-bold text-[#0f2239]">{o.label}</div>
                            <span className="text-[10px] uppercase font-bold text-[#4582ff]">{o.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 08 — Alternatives */}
                  {journey.detailTab === "08" && (
                    <div className="space-y-4 bg-slate-50/60 p-6 rounded-2xl border border-slate-200/60">
                      <h4 className="font-extrabold font-display text-[#0f2239] text-base">08 — Vocational Skill Trade Alternatives</h4>
                      <p className="text-xs text-[#636363]">
                        If you want a faster practical entry into technical roles without 4 years of university, check ITI diplomas in Computer Hardware or Web Development.
                      </p>
                    </div>
                  )}

                  {/* 09 — Official next step */}
                  {journey.detailTab === "09" && (
                    <div className="space-y-4 bg-[#0f2239] text-white p-6 rounded-2xl">
                      <h4 className="font-extrabold font-display text-white text-base">09 — Official Next Step</h4>
                      <p className="text-xs text-slate-300">
                        Admissions for degree courses in J&K Government Degree Colleges are registered on the official Samarth higher education portal.
                      </p>
                      <a href="https://jk.samarth.ac.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff7f46] text-white font-extrabold text-xs uppercase tracking-wider font-display">
                        <span>Open J&K Samarth Portal</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                </>
              ) : null}

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={() => setStep(6)}
                  className="px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-[#636363] hover:text-[#0f2239] flex items-center gap-2 font-display cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Pathways</span>
                </button>
                <button
                  onClick={() => setStep(8)}
                  className="bg-[#ff7f46] hover:bg-[#e66c35] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 font-display cursor-pointer"
                >
                  <span>See Where To Study in J&K (Map)</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 8: J&K COLLEGE LOCATOR MAP */}
          {step === 8 && (
            <motion.div
              key="screen8"
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
                    STAGE 6 • LOCALITY & MAP
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-display text-[#0f2239]">
                    Where can I study this in J&K?
                  </h2>
                  <p className="text-sm text-[#636363] leading-relaxed">
                    Verified Government Degree Colleges offering programs in District {journey.district} and across Jammu & Kashmir:
                  </p>
                </div>
              </div>

              {/* J&K College Map */}
              <CollegeMap
                selectedDistrict={journey.district}
                selectedProgram={journey.selectedCourseKey}
              />

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={() => setStep(7)}
                  className="px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-[#636363] hover:text-[#0f2239] flex items-center gap-2 font-display cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(9)}
                  className="bg-[#ff7f46] hover:bg-[#e66c35] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 font-display cursor-pointer"
                >
                  <span>Compare Options & Next Decision</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* SCREEN 9: COMPARISON & OFFICIAL ACTION */}
          {step === 9 && (
            <motion.div
              key="screen9"
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
                    STAGE 7 • NEUTRAL COMPARISON & NEXT DECISION
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold font-display text-[#0f2239]">
                    Compare & Take Official Action
                  </h2>
                  <p className="text-sm text-[#636363] leading-relaxed">
                    Compare courses side-by-side without artificial winner scores, and proceed to the official portal.
                  </p>
                </div>
              </div>

              {/* Neutral Comparison Component */}
              <NeutralOptionCompare
                initialOptionAId={journey.selectedCourseKey || "bsc-computer-application"}
                initialOptionBId="bca"
                onSaveOption={(key) => handleToggleSave(key)}
              />

              {/* Recommended Official Action Box */}
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
                  onClick={() => setStep(8)}
                  className="px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider text-[#636363] hover:text-[#0f2239] flex items-center gap-2 font-display cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Map</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
