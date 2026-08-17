// ============================================================
// PS-09 — Core Direction Logic
// SIH25094 — Pure functions. No side effects. No AI calls.
// Source of truth: 02-MVP-REQUIREMENTS.md R3, R5, R9
//
// All functions are deterministic:
//   matchDirections()       R3 — scored direction ranking
//   buildExplanation()      R9 — signal-traced plain text
//   getCollegesForCourse()  R5 — exact key filter with verification gate
//   getCourseOutcomes()     R6 — course-level verified outcomes
// ============================================================

import type {
  Direction,
  DirectionMatch,
  Course,
  Outcome,
  JKCollege,
  StudentProfile,
  AssessWeights,
  StreamExploration,
} from "@/types/ps09";
import { directions } from "@/data/jk-directions";
import { jkColleges } from "@/data/jk-colleges";
import { class10Streams, class10StreamsByKey } from "@/data/jk-streams";

// ----------------------------------------------------------------
// isClass10Profile
//
// Single authoritative guard for Class 10 branching.
// All routing logic must call this function rather than
// comparing profile.class strings directly.
// ----------------------------------------------------------------
export function isClass10Profile(profile: StudentProfile): boolean {
  return profile.class === "Class 10";
}

// ----------------------------------------------------------------
// matchDirections
//
// R3: "Show 2–4 suitable directions with what they mean,
//      why they appeared, and related education options."
//
// Hard Filter: Stream & Class level determine QUALIFICATION.
// Soft Ranking: Assessment signals & interests determine RANKING.
// Uncertainty: Neutral scores for all qualified fields + honest text.
// Aversion: Soft penalty without eliminating qualified paths.
//
// requireVerified: boolean — when true, only directions with
// verificationStatus === "verified" will be matched for student UI.
// ----------------------------------------------------------------
export function matchDirections(
  profile: StudentProfile,
  assessWeights: AssessWeights = {},
  maxResults = 4,
  requireVerified = false
): DirectionMatch[] {
  // Class 10 Guard: Class 10 students MUST receive ZERO undergraduate direction matches
  if (isClass10Profile(profile)) {
    return [];
  }

  const scored: DirectionMatch[] = [];
  const uncertaintyScore = assessWeights.uncertainty ?? 0;
  const isHighUncertainty = uncertaintyScore >= 2;

  for (const direction of directions) {
    // Verification Gate for student UI
    if (requireVerified && direction.verificationStatus !== "verified") {
      continue;
    }

    // Step 1 — Hard filter: class level
    if (
      direction.classRequired.length > 0 &&
      !direction.classRequired.includes(profile.class)
    ) {
      continue;
    }

    // Step 1 — Hard filter: stream qualification
    if (direction.streamRequirements.length > 0) {
      const streamMatches = direction.streamRequirements.some(
        (req) =>
          req.toLowerCase() === profile.stream.toLowerCase() ||
          profile.stream.toLowerCase().includes(req.toLowerCase())
      );
      if (!streamMatches) continue;
    }

    // Base score for meeting hard qualification requirement
    let score = 1.0;

    // Step 2 — Soft ranking: profile interests
    for (const interest of profile.interests) {
      const interestMatches = direction.interests.some(
        (di) =>
          di.toLowerCase() === interest.toLowerCase() ||
          di.toLowerCase().includes(interest.toLowerCase()) ||
          interest.toLowerCase().includes(di.toLowerCase())
      );
      if (interestMatches) {
        score += 1.0;
      }
    }

    // Step 3 — Soft ranking: self-assessment signals (only if not high uncertainty)
    if (!isHighUncertainty) {
      const assessScore = assessWeights[direction.key] ?? 0;
      score += assessScore * 1.5;

      // Soft Aversion penalties (reduces ranking priority without eliminating qualified paths)
      if (direction.key === "sciences" && (assessWeights.aversion_lab ?? 0) > 0) {
        score -= 0.4;
      }
      if (direction.key === "commerce-management" && (assessWeights.aversion_financial ?? 0) > 0) {
        score -= 0.4;
      }
      if (direction.key === "arts-humanities" && (assessWeights.aversion_writing ?? 0) > 0) {
        score -= 0.4;
      }
    }

    // Step 4 — Build non-predictive explanation
    const explanation = buildExplanation(direction, profile, assessWeights);

    scored.push({ direction, score, explanation });
  }

  // Sort by score descending, return top N
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

// ----------------------------------------------------------------
// buildExplanation
//
// Formulates evidence-based rationale.
// RULES:
//   - NEVER use "you are suited for..." or "AI predicts your career..."
//   - ALWAYS frame as "X may be worth exploring because..."
//   - Explicitly handle high uncertainty / no-preference state
// ----------------------------------------------------------------
export function buildExplanation(
  direction: Direction,
  profile: StudentProfile,
  assessWeights: AssessWeights = {}
): string {
  const uncertaintyScore = assessWeights.uncertainty ?? 0;

  // High Uncertainty / "I don't know" state
  if (uncertaintyScore >= 2) {
    return `You haven't expressed a strong preference yet. Here are some areas you can explore based on your Class 12 stream (${profile.stream}).`;
  }

  const reasons: string[] = [];

  // 1. Hard Qualification (Stream)
  if (direction.streamRequirements.length > 0) {
    const streamMatched = direction.streamRequirements.some(
      (req) =>
        req.toLowerCase() === profile.stream.toLowerCase() ||
        profile.stream.toLowerCase().includes(req.toLowerCase())
    );
    if (streamMatched) {
      reasons.push(
        `${direction.label} may be worth exploring because your stream (${profile.stream}) qualifies you for this field.`
      );
    }
  } else {
    reasons.push(
      `${direction.label} may be worth exploring as an open field accessible to your background.`
    );
  }

  // 2. Profile Interests
  const matchedInterests = profile.interests.filter((interest) =>
    direction.interests.some(
      (di) =>
        di.toLowerCase() === interest.toLowerCase() ||
        di.toLowerCase().includes(interest.toLowerCase()) ||
        interest.toLowerCase().includes(di.toLowerCase())
    )
  );
  if (matchedInterests.length > 0) {
    reasons.push(
      `You indicated specific interest in: ${matchedInterests.join(", ")}.`
    );
  }

  // 3. Assessment Exploration Signals
  const weight = assessWeights[direction.key] ?? 0;
  if (weight >= 0.6) {
    reasons.push(
      `Your responses in the self-exploration exercise showed alignment with learning activities in ${direction.label}.`
    );
  } else if (weight >= 0.3) {
    reasons.push(
      `Your responses suggest some interest in topics covered under ${direction.label}.`
    );
  }

  // 4. Soft Aversion Notice
  if (direction.key === "sciences" && (assessWeights.aversion_lab ?? 0) > 0) {
    reasons.push(
      `Note: You expressed a preference to avoid lab work; consider non-laboratory science & technology paths within this stream.`
    );
  }
  if (direction.key === "commerce-management" && (assessWeights.aversion_financial ?? 0) > 0) {
    reasons.push(
      `Note: You expressed a preference to avoid heavy financial ledger work; consider management or general business options.`
    );
  }

  return reasons.join(" ");
}

// ----------------------------------------------------------------
// getCollegesForCourse
//
// R5: "Show relevant J&K government colleges for the selected course."
//
// Strict Verification Gate:
//   - Only returns colleges whose programs[] includes courseKey
//   - ONLY returns colleges with verificationStatus === "verified"
//   - ONLY returns colleges with source.status === "verified"
//   - ONLY returns colleges with non-empty source.url and source.retrievedOn
//   - Optionally filters by district
// ----------------------------------------------------------------
export function getCollegesForCourse(
  courseKey: string,
  districtFilter?: string
): JKCollege[] {
  return jkColleges
    .filter((college) => {
      // Must offer this course
      if (!college.programs.includes(courseKey)) return false;
      // Must be explicitly verified
      if (college.verificationStatus !== "verified") return false;
      if (college.source.status !== "verified") return false;
      if (!college.source.url || college.source.url.trim() === "") return false;
      if (!college.source.retrievedOn || college.source.retrievedOn.trim() === "") return false;
      // Optional district filter
      if (
        districtFilter &&
        college.district.toLowerCase() !== districtFilter.toLowerCase()
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      const districtCmp = a.district.localeCompare(b.district);
      if (districtCmp !== 0) return districtCmp;
      return a.name.localeCompare(b.name);
    });
}

// ----------------------------------------------------------------
// getCoursesByDirection
//
// Utility: returns courses for a given direction key.
// requireVerified: when true, filters only verified courses.
// ----------------------------------------------------------------
export function getCoursesByDirection(directionKey: string, requireVerified = false): Course[] {
  const direction = directions.find((d) => d.key === directionKey);
  if (!direction) return [];
  if (requireVerified) {
    return direction.courses.filter((c) => c.verificationStatus === "verified");
  }
  return direction.courses;
}

// ----------------------------------------------------------------
// getDirectionByKey
// ----------------------------------------------------------------
export function getDirectionByKey(key: string, requireVerified = false): Direction | undefined {
  const direction = directions.find((d) => d.key === key);
  if (direction && requireVerified && direction.verificationStatus !== "verified") {
    return undefined;
  }
  return direction;
}

// ----------------------------------------------------------------
// getCourseByKey
// ----------------------------------------------------------------
export function getCourseByKey(courseKey: string, requireVerified = false): Course | undefined {
  for (const d of directions) {
    const course = d.courses.find((c) => c.key === courseKey);
    if (course) {
      if (requireVerified && course.verificationStatus !== "verified") return undefined;
      return course;
    }
  }
  return undefined;
}

// ----------------------------------------------------------------
// getCourseOutcomes
//
// R6: Returns verified outcomes for a specific course key.
// Gating: Only returns outcomes with verificationStatus === "verified".
// ----------------------------------------------------------------
export function getCourseOutcomes(courseKey: string, requireVerified = true): Outcome[] {
  const course = getCourseByKey(courseKey, requireVerified);
  if (!course) return [];
  if (requireVerified) {
    return course.outcomes.filter(
      (o) => o.verificationStatus === "verified" && o.source.status === "verified"
    );
  }
  return course.outcomes;
}

// ----------------------------------------------------------------
// getClass10Streams
//
// Returns all verified Class 10 stream exploration records.
// Used exclusively by the Class 10 branch of the student journey.
// Class 12 paths must NEVER call this function.
// ----------------------------------------------------------------
export function getClass10Streams(): StreamExploration[] {
  return class10Streams.filter((s) => s.verificationStatus === "verified");
}

// ----------------------------------------------------------------
// getClass10StreamByKey
//
// Returns a single verified Class 10 stream by key.
// Returns undefined if the stream is not verified or does not exist.
// ----------------------------------------------------------------
export function getClass10StreamByKey(key: string): StreamExploration | undefined {
  const stream = class10StreamsByKey[key];
  if (!stream || stream.verificationStatus !== "verified") return undefined;
  return stream;
}
