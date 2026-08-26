// ============================================================
// PS-09 — CAREERNOVA P0 RECOMMENDATION ENGINE
// SIH25094 — Deterministic, Signal-Based Course & Pathway Matcher
// Source of truth: 02-MVP-REQUIREMENTS.md R3, R5, R9
// ============================================================

import type {
  Course,
  CourseMatch,
  StudentProfile,
  AssessSignalVector,
} from "@/types/ps09";
import { directions } from "@/data/jk-directions";
import { jkColleges } from "@/data/jk-colleges";

export const CURRENT_ASSESSMENT_VERSION = "v2";

// ----------------------------------------------------------------
// getAllowedRecommendationLevel
//
// Central educational-stage gate helper
// ----------------------------------------------------------------
export function getAllowedRecommendationLevel(
  profile: StudentProfile
): "SCHOOL_STAGE" | "POST_12" {
  if (profile.class === "Class 10") {
    return "SCHOOL_STAGE";
  }
  return "POST_12";
}

// ----------------------------------------------------------------
// checkCourseEligibility
//
// Layer A Guard — Qualification Check
// Returns "ELIGIBLE", "NOT_ELIGIBLE", or "REQUIRES_MORE_INFO"
// ----------------------------------------------------------------
export function checkCourseEligibility(
  course: Course,
  profile: StudentProfile
): "ELIGIBLE" | "NOT_ELIGIBLE" | "REQUIRES_MORE_INFO" {
  if (!profile.class) return "REQUIRES_MORE_INFO";
  
  // Class 10 Guard: Class 10 students do NOT qualify for undergraduate degrees
  if (profile.class === "Class 10") {
    return "NOT_ELIGIBLE";
  }

  const userStream = (profile.stream || "").toLowerCase();

  // Strict Programme Prerequisites Check (J&K Samarth & University Statutes)

  // 1. Biological Sciences (B.Sc Biotech, B.Sc Botany/Chemistry/Zoology) require Biology background
  if (course.key === "bsc-biotechnology" || course.key === "bsc-botany-chemistry") {
    if (
      userStream.includes("commerce") ||
      userStream.includes("arts") ||
      userStream.includes("humanities") ||
      (userStream.includes("pcm") && !userStream.includes("pcmb") && !userStream.includes("bio"))
    ) {
      return "NOT_ELIGIBLE";
    }
  }

  // 2. B.Sc Computer Application requires Science Stream (PCM / IT)
  if (course.key === "bsc-computer-application") {
    if (
      userStream.includes("commerce") ||
      userStream.includes("arts") ||
      userStream.includes("humanities") ||
      (userStream.includes("pcb") && !userStream.includes("pcmb") && !userStream.includes("pcm") && !userStream.includes("it") && !userStream.includes("cs"))
    ) {
      return "NOT_ELIGIBLE";
    }
  }

  return "ELIGIBLE";
}

// ----------------------------------------------------------------
// scoreCourse
//
// Layer B Relevance Engine — Deterministic Scoring Formula
// Evaluates course feature signals against student AssessSignalVector & Profile
// Order of evaluation:
//   1. Stage check (Class 10 vs 12)
//   2. Goal/Pathway context
//   3. Exact programme eligibility
//   4. Interest relevance
//   5. Subject relevance
//   6. Goal relevance
//   7. Locality
//   8. Affordability / Support
// ----------------------------------------------------------------
export function scoreCourse(
  course: Course,
  profile: StudentProfile,
  signals: AssessSignalVector = {}
): CourseMatch {
  const eligibilityStatus = checkCourseEligibility(course, profile);

  if (eligibilityStatus === "NOT_ELIGIBLE") {
    const reasonNote =
      profile.class === "Class 10"
        ? "Class 10 students are exploring higher secondary streams, not applying for college degrees."
        : `Your stream (${profile.stream || "General"}) does not meet the prerequisite subjects for ${course.label}.`;
    return {
      course,
      score: 0,
      matchCategory: "Possible Option",
      eligibilityStatus: "NOT_ELIGIBLE",
      explanation: reasonNote,
      signalBreakdown: {
        positive: [],
        negative: [reasonNote],
        eligibilityNote: `Ineligible for Class ${profile.class || "10"} (${profile.stream || "None"})`,
      },
    };
  }

  let score = 25.0; // Base score for fulfilling hard qualification prerequisite
  const positiveReasons: string[] = [];
  const negativeReasons: string[] = [];

  const courseSignals = course.recommendationSignals || {};
  const userInterests = profile.interests || [];
  const goal = (profile.goalPreference || "").toLowerCase();

  // Signal 1: Verified Stream Eligibility
  positiveReasons.push(`Class 12 ${profile.stream || "General"} stream satisfies program eligibility`);

  // Signal 2: Interest Matching & Synonym Domain Mapping (0 to 30 points)
  let interestMatchCount = 0;
  const matchedInterestNames: string[] = [];
  for (const interest of userInterests) {
    const interestLower = interest.toLowerCase();
    const labelLower = course.label.toLowerCase();
    const descLower = course.description.toLowerCase();
    const directionLower = (course.directionKey || "").toLowerCase();
    const topicsLower = (course.whatYouWillStudy || []).map((t) => t.toLowerCase()).join(" ");

    let isMatch = false;

    if (
      labelLower.includes(interestLower) ||
      descLower.includes(interestLower) ||
      directionLower.includes(interestLower) ||
      topicsLower.includes(interestLower)
    ) {
      isMatch = true;
    } else if (
      (interestLower.includes("business") && course.key === "bba") ||
      (interestLower.includes("finance") || interestLower.includes("account")) && course.key === "bcom" ||
      (interestLower.includes("computer") || interestLower.includes("software") || interestLower.includes("tech")) && (course.key === "bsc-computer-application" || course.key === "bca") ||
      (interestLower.includes("biotech") || interestLower.includes("bio") || interestLower.includes("health")) && (course.key === "bsc-biotechnology" || course.key === "bsc-botany-chemistry") ||
      (interestLower.includes("humanities") || interestLower.includes("literature") || interestLower.includes("language")) && (course.key === "ba-humanities" || course.key === "ba-economics-polscience") ||
      (interestLower.includes("law") || interestLower.includes("legal")) && course.key === "ballb-integrated" ||
      (interestLower.includes("civil") || interestLower.includes("govt") || interestLower.includes("public")) && (course.key === "ba-economics-polscience" || course.key === "ballb-integrated")
    ) {
      isMatch = true;
    }

    if (isMatch) {
      interestMatchCount++;
      matchedInterestNames.push(interest);
    }
  }
  const interestScore = Math.min(interestMatchCount * 12, 30);
  score += interestScore;
  if (matchedInterestNames.length > 0) {
    positiveReasons.push(`Matches interest area(s): ${matchedInterestNames.join(", ")}`);
  }

  // Signal 3: Vector Signal Alignment (0 to 25 points)
  let dotProduct = 0;
  Object.entries(courseSignals).forEach(([sigKey, sigVal]) => {
    if (typeof sigVal === "number" && sigVal > 0) {
      const userWeight = (signals[sigKey] as number) || 0;
      if (userWeight > 0) {
        dotProduct += userWeight * sigVal;
      }
    }
  });

  const signalScore = Math.min(dotProduct * 3.5, 25);
  score += signalScore;

  if (dotProduct > 2.0) {
    positiveReasons.push(`High alignment with expressed learning preferences`);
  }

  // Signal 4: Goal Alignment (0 to 15 points)
  if (goal.includes("degrees") && course.directionKey) {
    score += 8;
    positiveReasons.push(`Directly fulfills your goal of exploring 4-year NEP UG Degree programs`);
  }
  if (goal.includes("govt") && (course.key === "ba-economics-polscience" || course.key === "ballb-integrated" || course.key === "bcom" || course.key === "ba-humanities")) {
    score += 12;
    positiveReasons.push(`Provides strong syllabus coverage for JKPSC & JKSSB civil service exams`);
  }
  if (goal.includes("skills") && course.skillAlternative) {
    score += 10;
    positiveReasons.push(`Offers an NSQF certified ITI/diploma alternative for rapid entry`);
  }

  // Signal 5: Locality Proximity (0 to 10 points)
  const districtColleges = jkColleges.filter(
    (col) =>
      col.programs.includes(course.key) &&
      col.verificationStatus === "verified" &&
      (!profile.district || col.district.toLowerCase() === profile.district.toLowerCase())
  );
  if (districtColleges.length > 0) {
    score += 10;
    positiveReasons.push(`Verified Government College offering this course exists in District ${profile.district || "Jammu"}`);
  }

  // Signal 6: Affordability & Scholarship Support (0 to 10 points)
  if (profile.affordabilityConstraint === "low" || profile.affordabilityConstraint === "moderate") {
    score += 8;
    positiveReasons.push(`Eligible for J&K Government Post-Matric & PMSSS scholarship fee support`);
  }

  // Signal 7: Aversion Penalties (0 to -20 points)
  if ((signals.aversion_lab ?? 0) > 0 && (courseSignals.laboratory ?? 0) >= 3) {
    score -= 15;
    negativeReasons.push(`Requires laboratory practical work, which you preferred to avoid`);
  }
  if ((signals.aversion_financial ?? 0) > 0 && (courseSignals.financial ?? 0) >= 3) {
    score -= 15;
    negativeReasons.push(`Requires accounting & numerical ledgers, which you preferred to avoid`);
  }
  if ((signals.aversion_programming ?? 0) > 0 && (courseSignals.programming ?? 0) >= 3) {
    score -= 15;
    negativeReasons.push(`Requires computer programming logic, which you preferred to avoid`);
  }
  if ((signals.aversion_writing ?? 0) > 0 && (courseSignals.humanities ?? 0) >= 3) {
    score -= 10;
    negativeReasons.push(`Requires extensive essay writing, which you preferred to avoid`);
  }

  // Final score clamping
  const finalScore = Math.max(0, Math.min(100, Math.round(score)));

  // Match Categorization
  let matchCategory: CourseMatch["matchCategory"] = "Possible Option";
  if (finalScore >= 75) matchCategory = "Strong Match";
  else if (finalScore >= 55) matchCategory = "Good Match";
  else if (finalScore >= 35) matchCategory = "Worth Exploring";

  const explanation = `Why you're seeing this: ${positiveReasons.join("; ")}.${
    negativeReasons.length > 0 ? ` (Note: ${negativeReasons.join("; ")})` : ""
  }`;

  return {
    course,
    score: finalScore,
    matchCategory,
    eligibilityStatus: "ELIGIBLE",
    explanation,
    signalBreakdown: {
      positive: positiveReasons,
      negative: negativeReasons,
      eligibilityNote: `Eligible for Class 12 (${profile.stream})`,
    },
  };
}

// ----------------------------------------------------------------
// rankCourses
//
// Returns deterministic ranked courses across all J&K pathways
// Deterministic Tie-Breaking Order:
//   1. Score descending
//   2. Direct interest match count
//   3. Course Key alphabetical order
// ----------------------------------------------------------------
export function rankCourses(
  profile: StudentProfile,
  signals: AssessSignalVector = {},
  maxResults = 10,
  onlyEligible = true
): CourseMatch[] {
  const allCourses: Course[] = directions.flatMap((d) => d.courses);
  const scoredMatches: CourseMatch[] = [];

  for (const course of allCourses) {
    if (course.verificationStatus !== "verified") continue;
    const match = scoreCourse(course, profile, signals);
    if (onlyEligible && match.eligibilityStatus === "NOT_ELIGIBLE") continue;
    scoredMatches.push(match);
  }

  return scoredMatches
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.signalBreakdown.positive.length !== a.signalBreakdown.positive.length) {
        return b.signalBreakdown.positive.length - a.signalBreakdown.positive.length;
      }
      return a.course.key.localeCompare(b.course.key);
    })
    .slice(0, maxResults);
}
