// ============================================================
// PS-09 — Class 10 Stream Exploration Page
// SIH25094
//
// PURPOSE:
//   Help a Class 10 student understand the three main streams
//   available after Class 10 in J&K (Science, Commerce, Arts).
//
// WHAT THIS PAGE MUST NEVER DO:
//   - Recommend a specific undergraduate course
//   - Recommend a specific college
//   - Predict a career outcome
//   - State that a student "should" choose a particular stream
//
// WHAT THIS PAGE DOES:
//   - Explains what each stream involves (sourced from JKBOSE)
//   - Shows subject areas (broad categories, not exhaustive codes)
//   - Provides questions for self-reflection
//   - Links to the official JKBOSE portal
//   - Makes clear that final stream selection is school-level
// ============================================================

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import type { StudentProfile } from "@/types/ps09";
import { getClass10Streams, isClass10Profile } from "@/lib/directions";
import { Sticker } from "@/components/ui/Sticker";

export const Route = createFileRoute("/dashboard/streams")({
  component: Class10StreamsPage,
});

function Class10StreamsPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const streams = getClass10Streams();

  useEffect(() => {
    const saved = localStorage.getItem("ps09_student_profile");
    if (saved) {
      try {
        const p: StudentProfile = JSON.parse(saved);
        setProfile(p);
        // Guard: if a Class 12 student somehow lands here, redirect to correct path
        if (!isClass10Profile(p)) {
          navigate({ to: "/dashboard/directions" });
        }
      } catch (e) {
        navigate({ to: "/dashboard/profile" });
      }
    } else {
      navigate({ to: "/dashboard/profile" });
    }
  }, [navigate]);

  // Guard: don't render if profile not yet loaded or not Class 10
  if (!profile || !isClass10Profile(profile)) {
    return null;
  }

  const toggleExpand = (key: string) => {
    setExpandedKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-start gap-4 p-6 glass-strong rounded-3xl border border-white/10">
        <Sticker name="backpack" size="lg" />
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-display">Explore Streams After Class 10</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You do not need to know your whole future yet. These are the three main streams available in Class 11/12 under the J&K Board of School Education (JKBOSE). Understanding each stream helps you have an informed conversation with your school.
          </p>
        </div>
      </div>

      {/* Important Disclaimer Notice */}
      <Card className="glass border-white/10 p-4 flex items-start gap-3">
        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <div className="text-xs text-muted-foreground leading-relaxed space-y-1">
          <p>
            <strong className="text-foreground">Stream selection is handled by your school</strong>{" "}
            after your Class 10 results. JKBOSE does not operate a centralized stream-selection portal.
          </p>
          <p>
            The subject areas listed here are broad categories from the official JKBOSE Scheme of
            Studies. Specific subject combinations vary by school and academic session. Always
            confirm with your school and check the{" "}
            <a
              href="https://jkbose.jk.gov.in"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-0.5"
            >
              official JKBOSE portal <ExternalLink className="h-3 w-3" />
            </a>
            .
          </p>
        </div>
      </Card>

      {/* Stream Cards */}
      <div className="space-y-4">
        {streams.map((stream) => {
          const isExpanded = expandedKey === stream.key;

          return (
            <Card key={stream.key} className="glass-strong border-white/10 overflow-hidden">
              {/* Stream header — always visible */}
              <button
                className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-white/5 transition"
                onClick={() => toggleExpand(stream.key)}
                aria-expanded={isExpanded}
                id={`stream-header-${stream.key}`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold font-display">{stream.label}</h2>
                    <Badge
                      variant="outline"
                      className="text-[10px] border-emerald-500/40 text-emerald-400"
                    >
                      JKBOSE Faculty
                    </Badge>
                  </div>

                  {/* Core subject areas — always visible, brief */}
                  <div className="flex flex-wrap gap-1.5">
                    {stream.coreSubjectAreas.slice(0, 5).map((subj) => (
                      <Badge key={subj} variant="secondary" className="text-xs">
                        {subj}
                      </Badge>
                    ))}
                    {stream.coreSubjectAreas.length > 5 && (
                      <Badge variant="secondary" className="text-xs text-muted-foreground">
                        +{stream.coreSubjectAreas.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-muted-foreground mt-1">
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div
                  className="px-6 pb-6 space-y-5 border-t border-white/10 pt-5"
                  id={`stream-detail-${stream.key}`}
                >
                  {/* What you learn */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <BookOpen className="h-4 w-4 text-primary" />
                      What this stream involves
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {stream.whatYouLearn}
                    </p>
                  </div>

                  {/* All subject areas */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Subject areas in this faculty (JKBOSE)
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {stream.coreSubjectAreas.map((subj) => (
                        <Badge key={subj} variant="secondary" className="text-xs">
                          {subj}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Subject availability varies by school. Confirm exact offerings with your
                      school or the{" "}
                      <a
                        href={stream.source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-0.5"
                      >
                        JKBOSE portal <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                      .
                    </p>
                  </div>

                  {/* UG path examples */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Examples of paths this stream can open (not guarantees)
                    </p>
                    <ul className="space-y-1">
                      {stream.ugPathExamples.map((ex) => (
                        <li
                          key={ex}
                          className="text-xs text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-0.5">›</span>
                          <span>{ex}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-[11px] text-muted-foreground italic">
                      These are illustrative examples. Actual eligibility for UG programs depends on
                      Class 12 subjects, marks, and official admission requirements at the time of
                      application.
                    </p>
                  </div>

                  {/* Questions to consider */}
                  <div className="space-y-2 p-4 rounded-xl glass border-white/5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      Questions to consider before choosing
                    </div>
                    <ul className="space-y-2">
                      {stream.questionsToConsider.map((q) => (
                        <li key={q} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 shrink-0">?</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Official source */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2 text-xs">
                    <span className="text-muted-foreground">
                      Source: {stream.source.label}
                    </span>
                    <a
                      href={stream.source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 shrink-0"
                    >
                      Official JKBOSE Portal <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Scholarship awareness — factual, not a detailed guide */}
      <Card className="glass border-white/10 p-4 space-y-2">
        <p className="text-xs font-semibold text-foreground">
          Financial support awareness
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Once you are in Class 11/12, you may be eligible for scholarships via the{" "}
          <a
            href="https://scholarships.gov.in"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline inline-flex items-center gap-0.5"
          >
            National Scholarship Portal (NSP) <ExternalLink className="h-3 w-3" />
          </a>
          . After Class 12, the{" "}
          <a
            href="https://www.aicte-jk-scholarship-gov.in"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline inline-flex items-center gap-0.5"
          >
            PMSSS scheme <ExternalLink className="h-3 w-3" />
          </a>{" "}
          supports eligible J&K students studying outside J&K. Check official portals for
          current eligibility and deadlines.
        </p>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <Button variant="outline" onClick={() => navigate({ to: "/dashboard/profile" })}>
          ← Back to About You
        </Button>
        <a
          href="https://jkbose.jk.gov.in"
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto"
        >
          <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
            Official JKBOSE Portal <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </a>
      </div>
    </div>
  );
}
