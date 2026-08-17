import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { JourneyProgress } from "@/components/JourneyProgress";
import type { AssessWeights, StudentProfile, AssessSignalVector } from "@/types/ps09";
import { isClass10Profile } from "@/lib/directions";
import { CURRENT_ASSESSMENT_VERSION } from "@/lib/recommendations";
import { Sticker } from "@/components/ui/Sticker";

export const Route = createFileRoute("/dashboard/assess")({
  component: AssessPage,
});

interface Option {
  label: string;
  weights: Record<string, number>;
  signalLabel?: string;
  isUncertainty?: boolean;
  isAversion?: boolean;
}

interface Question {
  id: string;
  category: string;
  text: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: "q1",
    category: "Activities",
    text: "What type of activities sound most interesting to you?",
    options: [
      {
        label: "Solving technical problems, writing software, or building digital tools",
        weights: { sciences: 0.8, technical: 0.8 },
        signalLabel: "technical and computational problem solving",
      },
      {
        label: "Understanding business operations, financial reports, or commerce management",
        weights: { "commerce-management": 0.8, business: 0.8 },
        signalLabel: "business and financial operations",
      },
      {
        label: "Reading literature, studying languages, history, or social sciences",
        weights: { "arts-humanities": 0.8, humanities: 0.8 },
        signalLabel: "humanities, languages, and social study",
      },
      {
        label: "Conducting scientific experiments, biology, or chemistry laboratory work",
        weights: { sciences: 0.8, lab: 0.8 },
        signalLabel: "experimental and biological sciences",
      },
      {
        label: "I don't know yet — I'm open to exploring all of these",
        weights: { uncertainty: 1 },
        isUncertainty: true,
      },
    ],
  },
  {
    id: "q2",
    category: "Subjects",
    text: "Which subject areas do you feel most comfortable exploring further?",
    options: [
      {
        label: "Mathematics, Computer Applications, or Physics",
        weights: { sciences: 0.6, analytical: 0.6 },
        signalLabel: "mathematical and physical sciences",
      },
      {
        label: "Chemistry, Biology, Biotechnology, or Environmental Science",
        weights: { sciences: 0.6, lab: 0.6 },
        signalLabel: "life and chemical sciences",
      },
      {
        label: "Accountancy, Business Studies, Entrepreneurship, or Economics",
        weights: { "commerce-management": 0.6, financial: 0.6 },
        signalLabel: "commerce, accounting, and economics",
      },
      {
        label: "English, Regional Languages, History, Political Science, or Sociology",
        weights: { "arts-humanities": 0.6, languages: 0.6 },
        signalLabel: "languages, history, and social sciences",
      },
      {
        label: "I'm still exploring — I haven't found a favorite subject area yet",
        weights: { uncertainty: 1 },
        isUncertainty: true,
      },
    ],
  },
  {
    id: "q3",
    category: "Ways of Working",
    text: "What style of work or problem solving sounds most engaging?",
    options: [
      {
        label: "Building logic, fixing software errors, or working with structured data",
        weights: { sciences: 0.6, technical: 0.6 },
        signalLabel: "structured technical work",
      },
      {
        label: "Planning projects, managing resources, or analyzing financial trends",
        weights: { "commerce-management": 0.6, organizational: 0.6 },
        signalLabel: "project and business management",
      },
      {
        label: "Expressing ideas in writing, researching human behavior, or discussion",
        weights: { "arts-humanities": 0.6, communication: 0.6 },
        signalLabel: "research, writing, and communication",
      },
      {
        label: "Helping, teaching, or supporting community and social development",
        weights: { "arts-humanities": 0.6, social: 0.6 },
        signalLabel: "education and social development",
      },
      {
        label: "I don't know — I haven't decided what style of work I prefer",
        weights: { uncertainty: 1 },
        isUncertainty: true,
      },
    ],
  },
  {
    id: "q4",
    category: "Curiosity",
    text: "What area are you most curious to learn more about?",
    options: [
      {
        label: "How modern software, AI, networks, or digital systems operate",
        weights: { sciences: 0.6, technical: 0.6 },
        signalLabel: "computing and software systems",
      },
      {
        label: "How markets, trade, banking, and commercial institutions operate",
        weights: { "commerce-management": 0.6, business: 0.6 },
        signalLabel: "commercial and market systems",
      },
      {
        label: "How human societies, historical events, law, and cultures develop",
        weights: { "arts-humanities": 0.6, humanities: 0.6 },
        signalLabel: "societal and cultural history",
      },
      {
        label: "How living organisms, medicine, or environmental ecosystems work",
        weights: { sciences: 0.6, lab: 0.6 },
        signalLabel: "biological and ecological systems",
      },
      {
        label: "I'm curious about many different fields and haven't narrowed it down",
        weights: { uncertainty: 1 },
        isUncertainty: true,
      },
    ],
  },
  {
    id: "q5",
    category: "Environment",
    text: "Which environment sounds like a place you would enjoy learning in?",
    options: [
      {
        label: "Computer workspace or software development laboratory",
        weights: { sciences: 0.5, technical: 0.5 },
        signalLabel: "computing laboratory environment",
      },
      {
        label: "Corporate office, business startup, or financial firm",
        weights: { "commerce-management": 0.5, business: 0.5 },
        signalLabel: "business and administrative environment",
      },
      {
        label: "Educational institution, media organization, or research library",
        weights: { "arts-humanities": 0.5, humanities: 0.5 },
        signalLabel: "academic and research environment",
      },
      {
        label: "Scientific research lab, medical center, or environmental field station",
        weights: { sciences: 0.5, lab: 0.5 },
        signalLabel: "scientific laboratory environment",
      },
      {
        label: "No preference / Any environment is fine at this stage",
        weights: { uncertainty: 1 },
        isUncertainty: true,
      },
    ],
  },
  {
    id: "q6",
    category: "Aversion (Preferences to Avoid)",
    text: "Is there any type of work you would definitely prefer to avoid?",
    options: [
      {
        label: "Laboratory practicals involving chemicals or biological specimens",
        weights: { aversion_lab: 0.5 },
        isAversion: true,
        signalLabel: "avoiding laboratory practical work",
      },
      {
        label: "Advanced abstract mathematics and complex calculus calculations",
        weights: { aversion_math: 0.5 },
        isAversion: true,
        signalLabel: "avoiding heavy mathematical calculations",
      },
      {
        label: "Financial accounting ledgers, balance sheets, and numerical auditing",
        weights: { aversion_financial: 0.5 },
        isAversion: true,
        signalLabel: "avoiding financial and accounting ledgers",
      },
      {
        label: "Extensive essay writing, long reading texts, or public speaking",
        weights: { aversion_writing: 0.5 },
        isAversion: true,
        signalLabel: "avoiding extensive essay writing",
      },
      {
        label: "None of these — I'm open to trying most types of work",
        weights: { uncertainty: 1 },
        isUncertainty: true,
      },
    ],
  },
  {
    id: "q7",
    category: "Stage of Decision",
    text: "Where do you feel you are right now in your educational decision?",
    options: [
      {
        label: "I have clear fields in mind that I want to evaluate",
        weights: { certainty: 1 },
        signalLabel: "specific field interest",
      },
      {
        label: "I have general ideas but want to see what courses exist",
        weights: { general: 1 },
        signalLabel: "open exploration mode",
      },
      {
        label: "I am completely uncertain and want to explore all eligible options",
        weights: { uncertainty: 2 },
        isUncertainty: true,
      },
    ],
  },
];

function AssessPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    // Guard: Class 10 students do not do Class 12 assessment
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

  const handleSelectOption = (qId: string, optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleComplete = () => {
    const computedWeights: AssessSignalVector = {
      assessmentVersion: CURRENT_ASSESSMENT_VERSION,
      sciences: 0,
      "commerce-management": 0,
      "arts-humanities": 0,
      uncertainty: 0,
      aversion_lab: 0,
      aversion_math: 0,
      aversion_financial: 0,
      aversion_writing: 0,
      technology: 0,
      programming: 0,
      biological: 0,
      laboratory: 0,
      financial: 0,
      business: 0,
      management: 0,
      humanities: 0,
      social: 0,
      languages: 0,
      quantitative: 0,
      analytical: 0,
      publicService: 0,
      practical: 0,
      scientific: 0,
      research: 0,
      communication: 0,
    };

    QUESTIONS.forEach((q) => {
      const selectedIdx = answers[q.id];
      if (selectedIdx !== undefined) {
        const option = q.options[selectedIdx];
        Object.entries(option.weights).forEach(([key, val]) => {
          computedWeights[key] = ((computedWeights[key] as number) || 0) + val;
        });
      }
    });

    localStorage.setItem("ps09_assess_weights", JSON.stringify(computedWeights));
    navigate({ to: "/dashboard/directions" });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <JourneyProgress />

      <div className="flex items-start gap-4 p-6 glass-strong rounded-3xl border border-white/10">
        <Sticker name="lightbulb" size="lg" />
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-display">Self-Exploration for Class 12</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This self-exploration helps highlight which higher education fields are worth exploring first. It does NOT determine your career destiny. Selecting "I don't know" is completely valid and opens broad, neutral exploration.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => (
          <Card key={q.id} className="glass-strong border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-base">
                {idx + 1}. {q.text}
              </h3>
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                {q.category}
              </span>
            </div>

            <RadioGroup
              value={answers[q.id] !== undefined ? String(answers[q.id]) : undefined}
              onValueChange={(val) => handleSelectOption(q.id, Number(val))}
              className="space-y-3"
            >
              {q.options.map((opt, oIdx) => (
                <div
                  key={oIdx}
                  className={`flex items-center space-x-3 p-3.5 rounded-xl border transition cursor-pointer ${
                    answers[q.id] === oIdx
                      ? "border-primary/50 bg-primary/10"
                      : "border-white/10 hover:bg-white/5"
                  }`}
                  onClick={() => handleSelectOption(q.id, oIdx)}
                >
                  <RadioGroupItem value={String(oIdx)} id={`${q.id}-${oIdx}`} />
                  <Label
                    htmlFor={`${q.id}-${oIdx}`}
                    className="text-sm cursor-pointer font-normal leading-snug flex-1"
                  >
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={() => navigate({ to: "/dashboard/profile" })}>
          ← Back to About You
        </Button>
        <Button onClick={handleComplete} size="lg">
          View Fields Worth Exploring →
        </Button>
      </div>
    </div>
  );
}
