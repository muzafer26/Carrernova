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
  const eligText = (course.eligibility || "").toLowerCase();

  // If course eligibility mentions specific stream requirements:
  if (eligText.includes("science stream") || eligText.includes("pcm") || eligText.includes("pcb")) {
    if (userStream.includes("commerce") || userStream.includes("arts") || userStream.includes("humanities")) {
      // Check if course allows any stream or math background
      if (!eligText.includes("any stream") && !eligText.includes("open to all")) {
        return "NOT_ELIGIBLE";
      }
    }
  }

  if (course.key === "bsc-biotechnology" || course.key === "bsc-botany-chemistry") {
    if (userStream.includes("commerce") || userStream.includes("arts")) {
      return "NOT_ELIGIBLE";
    }
  }

  if (course.key === "bsc-computer-application") {
    // Requires Science / IT background
    if (userStream.includes("arts") || (userStream.includes("commerce") && !userStream.includes("math"))) {
      return "NOT_ELIGIBLE";
    }
  }

  return "ELIGIBLE";
}

// ----------------------------------------------------------------
// scoreCourse
//
// Layer B Relevance Engine — Deterministic Scoring Formula
// Evaluates course feature signals against student AssessSignalVector
// ----------------------------------------------------------------
export function scoreCourse(
  course: Course,
  profile: StudentProfile,
  signals: AssessSignalVector
): CourseMatch {
  const eligibilityStatus = checkCourseEligibility(course, profile);

  if (eligibilityStatus === "NOT_ELIGIBLE") {
    return {
      course,
      score: 0,
      matchCategory: "Possible Option",
      eligibilityStatus: "NOT_ELIGIBLE",
      explanation: `Your current academic background (${profile.stream || "Class 10"}) does not fulfill the entry prerequisites for ${course.label}.`,
      signalBreakdown: {
        positive: [],
        negative: [`Ineligible stream prerequisite`],
        eligibilityNote: `Requires Science / Specific Prerequisite subjects`,
      },
    };
  }

  let score = 20.0; // Base score for meeting hard qualification gate
  const positiveReasons: string[] = [];
  const negativeReasons: string[] = [];

  const courseSignals = course.recommendationSignals || {};
  const userInterests = profile.interests || [];
  const goal = (profile.goalPreference || "").toLowerCase();

  // 1. Direct Interest Matching (0 to 25 points)
  let interestMatchCount = 0;
  for (const interest of userInterests) {
    const interestLower = interest.toLowerCase();
    const labelLower = course.label.toLowerCase();
    const descLower = course.description.toLowerCase();

    if (
      labelLower.includes(interestLower) ||
      descLower.includes(interestLower) ||
      (course.whatYouWillStudy || []).some((topic) => topic.toLowerCase().includes(interestLower))
    ) {
      interestMatchCount++;
    }
  }
  const interestScore = Math.min(interestMatchCount * 8, 25);
  score += interestScore;
  if (interestMatchCount > 0) {
    positiveReasons.push(`Matches ${interestMatchCount} of your selected interest areas (${userInterests.slice(0, 2).join(", ")})`);
  }

  // 2. Signal Dot Product (0 to 35 points)
  let dotProduct = 0;
  Object.entries(courseSignals).forEach(([sigKey, sigVal]) => {
    if (typeof sigVal === "number" && sigVal > 0) {
      const userWeight = (signals[sigKey] as number) || 0;
      if (userWeight > 0) {
        dotProduct += userWeight * sigVal;
      }
    }
  });

  const signalScore = Math.min(dotProduct * 3.5, 35);
  score += signalScore;

  if (dotProduct > 2.0) {
    positiveReasons.push(`Strong alignment with your quiz activity & subject preference signals`);
  }

  // 3. Goal Alignment (0 to 10 points)
  if (goal.includes("degrees") && course.directionKey) {
    score += 5;
  }
  if (goal.includes("govt") && (course.key === "ba-economics-polscience" || course.key === "ballb-integrated" || course.key === "bcom")) {
    score += 8;
    positiveReasons.push(`Aligns well with public service & government exam preparation goals`);
  }
  if (goal.includes("skills") && course.skillAlternative) {
    score += 5;
    positiveReasons.push(`Offers direct vocational skill alternative pathway`);
  }

  // 4. Aversion Penalties (0 to -15 points)
  if ((signals.aversion_lab ?? 0) > 0 && (courseSignals.laboratory ?? 0) >= 3) {
    score -= 12;
    negativeReasons.push(`Involves laboratory practical work, which you preferred to avoid`);
  }
  if ((signals.aversion_financial ?? 0) > 0 && (courseSignals.financial ?? 0) >= 3) {
    score -= 12;
    negativeReasons.push(`Involves accounting ledgers & numerical finance, which you preferred to avoid`);
  }
  if ((signals.aversion_programming ?? 0) > 0 && (courseSignals.programming ?? 0) >= 3) {
    score -= 12;
    negativeReasons.push(`Involves computer programming & software logic, which you preferred to avoid`);
  }
  if ((signals.aversion_writing ?? 0) > 0 && (courseSignals.humanities ?? 0) >= 3) {
    score -= 8;
    negativeReasons.push(`Involves extensive essay writing & long texts, which you preferred to avoid`);
  }

  // 5. Local College Verification Bonus (0 to 10 points)
  const districtColleges = jkColleges.filter(
    (col) =>
      col.programs.includes(course.key) &&
      col.verificationStatus === "verified" &&
      (!profile.district || col.district.toLowerCase() === profile.district.toLowerCase())
  );
  if (districtColleges.length > 0) {
    score += 8;
    positiveReasons.push(`Verified Government College offering this course exists in District ${profile.district || "Jammu"}`);
  }

  // Final score clamping
  const finalScore = Math.max(0, Math.min(100, Math.round(score)));

  // Match Categorization
  let matchCategory: CourseMatch["matchCategory"] = "Possible Option";
  if (finalScore >= 75) matchCategory = "Strong Match";
  else if (finalScore >= 55) matchCategory = "Good Match";
  else if (finalScore >= 35) matchCategory = "Worth Exploring";

  // Build rationale explanation
  let explanation = `${course.label} may be worth exploring for your background.`;
  if (positiveReasons.length > 0) {
    explanation = `${course.label} appears as a ${matchCategory} because: ${positiveReasons.join("; ")}.`;
  }
  if (negativeReasons.length > 0) {
    explanation += ` Note: ${negativeReasons.join("; ")}.`;
  }

  return {
    course,
    score: finalScore,
    matchCategory,
    eligibilityStatus: "ELIGIBLE",
    explanation,
    signalBreakdown: {
      positive: positiveReasons,
      negative: negativeReasons,
      eligibilityNote: `Eligible for Class ${profile.class} (${profile.stream})`,
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
