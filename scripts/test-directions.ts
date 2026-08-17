/**
 * PS-09 — Direction Matching & Course Outcomes Tests
 * SIH25094
 *
 * Run: npx tsx --tsconfig scripts/tsconfig.json scripts/test-directions.ts
 *
 * Deterministic golden tests for matchDirections(), buildExplanation(), getCollegesForCourse(), and getCourseOutcomes().
 */

import {
  matchDirections,
  buildExplanation,
  getCollegesForCourse,
  getCoursesByDirection,
  getCourseByKey,
  getCourseOutcomes,
  isClass10Profile,
  getClass10Streams,
  getClass10StreamByKey,
} from "../src/lib/directions";
import type { StudentProfile, AssessWeights } from "../src/types/ps09";

let passed = 0;
let failed = 0;
const failures: string[] = [];

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}${detail ? ` — ${detail}` : ""}`);
    failed++;
    failures.push(testName);
  }
}

function section(title: string) {
  console.log(`\n── ${title} ──────────────────────────────────────────`);
}

// ----------------------------------------------------------------
// Category A — Hard Filter Tests
// ----------------------------------------------------------------
section("A. Hard Filter — Class and Stream Qualification");

{
  const profile: StudentProfile = {
    class: "Class 12",
    stream: "Science (PCM)",
    interests: [],
    goalPreference: "",
  };
  const results = matchDirections(profile, {});
  const keys = results.map((r) => r.direction.key);

  assert(
    keys.includes("sciences") && keys.includes("commerce-management") && keys.includes("arts-humanities"),
    "PCM student qualifies for Sciences, Commerce, and Arts"
  );
}

{
  const profile: StudentProfile = {
    class: "Class 12",
    stream: "Commerce",
    interests: [],
    goalPreference: "",
  };
  const results = matchDirections(profile, {});
  const keys = results.map((r) => r.direction.key);

  assert(
    !keys.includes("sciences") && keys.includes("commerce-management") && keys.includes("arts-humanities"),
    "Commerce student qualifies for Commerce and Arts, NOT Sciences"
  );
}

{
  const profile: StudentProfile = {
    class: "Class 12",
    stream: "Arts",
    interests: [],
    goalPreference: "",
  };
  const results = matchDirections(profile, {});
  const keys = results.map((r) => r.direction.key);

  assert(
    !keys.includes("sciences") && !keys.includes("commerce-management") && keys.includes("arts-humanities"),
    "Arts student qualifies only for Arts (under strict stream requirements)"
  );
}

// ----------------------------------------------------------------
// Category B — Interest Scoring & Ranking Tests
// ----------------------------------------------------------------
section("B. Interest Scoring and Scored Ranking");

{
  const profile: StudentProfile = {
    class: "Class 12",
    stream: "Science (PCM)",
    interests: ["Computer Science", "Biology"],
    goalPreference: "",
  };
  const results = matchDirections(profile, {});
  assert(
    results[0].direction.key === "sciences",
    "Science student with Tech/Bio interests ranks Sciences #1"
  );
}

{
  const profile: StudentProfile = {
    class: "Class 12",
    stream: "Commerce",
    interests: ["Accounting", "Finance"],
    goalPreference: "",
  };
  const results = matchDirections(profile, {});
  assert(
    results[0].direction.key === "commerce-management",
    "Commerce student with Accounting/Finance interests ranks Commerce #1"
  );
}

// ----------------------------------------------------------------
// Category C — Signal-Traced Explanation Tests
// ----------------------------------------------------------------
section("C. Signal-Traced Explanations");

{
  const profile: StudentProfile = {
    class: "Class 12",
    stream: "Science (PCM)",
    interests: ["Computer Science"],
    goalPreference: "",
  };
  const weights: AssessWeights = { sciences: 0.8 };
  const results = matchDirections(profile, weights);

  const sciMatch = results.find((r) => r.direction.key === "sciences");
  assert(
    sciMatch !== undefined &&
      sciMatch.explanation.includes("Science (PCM)") &&
      sciMatch.explanation.includes("Computer Science") &&
      sciMatch.explanation.includes("strong leaning"),
    "Explanation traces stream + interest + assessment signals"
  );
}

// ----------------------------------------------------------------
// Category D — R5 College Mapping & Gating Tests
// ----------------------------------------------------------------
section("D. College Mapping & Gating");

{
  const kathuaAndAkhnoorColleges = getCollegesForCourse("bsc-computer-application");
  const keys = kathuaAndAkhnoorColleges.map((c) => c.key);
  assert(
    keys.includes("gdc-kathua") && keys.includes("gdc-akhnoor") && keys.length === 2,
    "D1: B.Sc Computer Application matches exactly GDC Kathua and GDC Akhnoor"
  );
}

{
  const kathuaOnlyColleges = getCollegesForCourse("bba");
  const keys = kathuaOnlyColleges.map((c) => c.key);
  assert(
    keys.includes("gdc-kathua") && keys.length === 1,
    "D2: BBA matches exactly GDC Kathua"
  );
}

{
  const allVerifiedColleges = getCollegesForCourse("bsc-computer-application");
  const hasUnverified = allVerifiedColleges.some((c) => c.verificationStatus !== "verified");
  assert(
    !hasUnverified && allVerifiedColleges.length === 2,
    "D3: Unverified college candidates are excluded by getCollegesForCourse()"
  );
}

{
  const profile: StudentProfile = {
    class: "Class 12",
    stream: "Science (PCM)",
    interests: [],
    goalPreference: "",
  };
  const resultsVerifiedOnly = matchDirections(profile, {}, 4, true);
  assert(
    resultsVerifiedOnly.length > 0 && resultsVerifiedOnly.every((r) => r.direction.verificationStatus === "verified"),
    "D4: matchDirections(..., requireVerified=true) returns only verified directions"
  );
}

{
  const coursesVerifiedOnly = getCoursesByDirection("sciences", true);
  assert(
    coursesVerifiedOnly.length === 3 && coursesVerifiedOnly.every((c) => c.verificationStatus === "verified"),
    "D5: getCoursesByDirection('sciences', requireVerified=true) returns 3 verified courses"
  );
}

// ----------------------------------------------------------------
// Category E — Course Outcomes & Source Integrity Tests
// ----------------------------------------------------------------
section("E. Course Outcomes & Verification Integrity");

{
  const bcaOutcomes = getCourseOutcomes("bca", true);
  assert(
    bcaOutcomes.length >= 2 && bcaOutcomes.some((o) => o.label.includes("MCA")),
    "E1: BCA course returns verified higher study outcomes including MCA"
  );
}

{
  const bcomOutcomes = getCourseOutcomes("bcom", true);
  assert(
    bcomOutcomes.length >= 2 && bcomOutcomes.some((o) => o.label.includes("M.Com")) && bcomOutcomes.some((o) => o.label.includes("ICAI")),
    "E2: B.Com course returns verified higher study (M.Com) and examination (ICAI) outcomes"
  );
}

{
  const allCourseKeys = ["bsc-computer-application", "bsc-biotechnology", "bsc-botany-chemistry", "bcom", "bba", "bca", "ba-humanities"];
  const allValidSources = allCourseKeys.every((key) => {
    const outcomes = getCourseOutcomes(key, true);
    return outcomes.every((o) => o.source && o.source.url && o.source.status === "verified");
  });
  assert(
    allValidSources,
    "E3: Every verified outcome across all 7 courses has complete verified source metadata"
  );
}

// ----------------------------------------------------------------
// Category F — Class 10 Guard & Stream Data Tests
// ----------------------------------------------------------------
section("F. Class 10 Guard & Stream Exploration Data");

{
  const class10Profile: StudentProfile = {
    class: "Class 10",
    stream: "",
    interests: [],
    goalPreference: "",
  };
  assert(
    isClass10Profile(class10Profile) === true,
    "F1: isClass10Profile returns true for class='Class 10'"
  );
}

{
  const class12Profile: StudentProfile = {
    class: "Class 12",
    stream: "Science (PCM)",
    interests: [],
    goalPreference: "",
  };
  assert(
    isClass10Profile(class12Profile) === false,
    "F2: isClass10Profile returns false for class='Class 12'"
  );
}

{
  // A Class 10 profile must produce ZERO UG direction matches
  // because all directions require classRequired=["Class 12"]
  const class10Profile: StudentProfile = {
    class: "Class 10",
    stream: "",
    interests: ["Computer Science", "Biology"],
    goalPreference: "",
  };
  const results = matchDirections(class10Profile, {}, 4, false);
  assert(
    results.length === 0,
    "F3: Class 10 profile returns zero UG direction matches (hard classRequired filter)",
    `Got ${results.length} results — expected 0`
  );
}

{
  const streams = getClass10Streams();
  assert(
    streams.length === 3,
    "F4: getClass10Streams() returns exactly 3 verified streams",
    `Got ${streams.length}`
  );
}

{
  const streams = getClass10Streams();
  const keys = streams.map((s) => s.key);
  assert(
    keys.includes("science") && keys.includes("commerce") && keys.includes("arts"),
    "F5: All three stream keys are present: science, commerce, arts"
  );
}

{
  const streams = getClass10Streams();
  const allVerified = streams.every((s) => s.verificationStatus === "verified");
  assert(allVerified, "F6: All streams returned by getClass10Streams() have verificationStatus='verified'");
}

{
  const streams = getClass10Streams();
  const allHaveSource = streams.every(
    (s) =>
      s.source &&
      s.source.url.startsWith("http") &&
      s.source.retrievedOn !== "" &&
      s.source.status === "verified"
  );
  assert(
    allHaveSource,
    "F7: All streams have complete source metadata (url, retrievedOn, status='verified')"
  );
}

{
  const streams = getClass10Streams();
  const allHaveSubjects = streams.every((s) => s.coreSubjectAreas.length >= 3);
  assert(
    allHaveSubjects,
    "F8: All streams have at least 3 core subject areas listed"
  );
}

{
  const streams = getClass10Streams();
  const allHaveQuestions = streams.every((s) => s.questionsToConsider.length >= 3);
  assert(
    allHaveQuestions,
    "F9: All streams have at least 3 questions to consider"
  );
}

{
  const scienceStream = getClass10StreamByKey("science");
  assert(
    scienceStream !== undefined && scienceStream.key === "science",
    "F10: getClass10StreamByKey('science') returns the Science stream"
  );
}

{
  const commerceStream = getClass10StreamByKey("commerce");
  assert(
    commerceStream !== undefined && commerceStream.key === "commerce",
    "F11: getClass10StreamByKey('commerce') returns the Commerce stream"
  );
}

{
  const artsStream = getClass10StreamByKey("arts");
  assert(
    artsStream !== undefined && artsStream.key === "arts",
    "F12: getClass10StreamByKey('arts') returns the Arts/Humanities stream"
  );
}

{
  const nonExistent = getClass10StreamByKey("nonexistent-key");
  assert(
    nonExistent === undefined,
    "F13: getClass10StreamByKey with unknown key returns undefined"
  );
}

{
  // Switching Class 10 → Class 12 must now produce results
  // (regression: existing Class 12 behavior must be unaffected)
  const class12Profile: StudentProfile = {
    class: "Class 12",
    stream: "Science (PCM)",
    interests: ["Computer Science"],
    goalPreference: "",
  };
  const results = matchDirections(class12Profile, {});
  assert(
    results.length > 0,
    "F14: Class 12 PCM profile still produces UG direction results (regression check)"
  );
}

// ----------------------------------------------------------------
// Category G — Phase 4B Exploration Signals & Phase 5 Eligibility Tests
// ----------------------------------------------------------------
section("G. Phase 4B Signals, Uncertainty & Phase 5 Decision Chain");

{
  // G1: High Uncertainty Handling
  const profile: StudentProfile = {
    class: "Class 12",
    stream: "Science (PCM)",
    interests: [],
    goalPreference: "",
  };
  const weights: AssessWeights = { uncertainty: 3 };
  const results = matchDirections(profile, weights);
  assert(
    results.length > 0 &&
      results[0].explanation.includes("You haven't expressed a strong preference yet"),
    "G1: High uncertainty state returns honest exploration explanation without forced ranking"
  );
}

{
  // G2: Soft Aversion Handling (Lab aversion)
  const profile: StudentProfile = {
    class: "Class 12",
    stream: "Science (PCM)",
    interests: [],
    goalPreference: "",
  };
  const weightsWithAversion: AssessWeights = { sciences: 0.8, aversion_lab: 0.5 };
  const results = matchDirections(profile, weightsWithAversion);
  const scienceMatch = results.find((r) => r.direction.key === "sciences");
  assert(
    scienceMatch !== undefined &&
      scienceMatch.explanation.includes("avoid lab work"),
    "G2: Lab aversion adds soft guidance note without removing qualified Sciences stream"
  );
}

{
  // G3: PCM + Technical signals
  const profile: StudentProfile = {
    class: "Class 12",
    stream: "Science (PCM)",
    interests: ["Computer Science"],
    goalPreference: "",
  };
  const weights: AssessWeights = { sciences: 1.2, technical: 1.0 };
  const results = matchDirections(profile, weights);
  assert(
    results[0].direction.key === "sciences",
    "G3: PCM + Technical signals ranks Sciences as top exploration direction"
  );
}

{
  // G4: PCM + Business signals
  const profile: StudentProfile = {
    class: "Class 12",
    stream: "Science (PCM)",
    interests: ["Business"],
    goalPreference: "",
  };
  const weights: AssessWeights = { "commerce-management": 1.2, business: 1.0 };
  const results = matchDirections(profile, weights);
  assert(
    results[0].direction.key === "commerce-management",
    "G4: PCM + Business signals ranks Commerce & Management as top exploration direction"
  );
}

{
  // G5: PCB + Lab signals
  const profile: StudentProfile = {
    class: "Class 12",
    stream: "Science (PCB)",
    interests: ["Biology"],
    goalPreference: "",
  };
  const weights: AssessWeights = { sciences: 1.2, lab: 1.0 };
  const results = matchDirections(profile, weights);
  assert(
    results[0].direction.key === "sciences",
    "G5: PCB + Lab signals ranks Sciences as top exploration direction"
  );
}

{
  // G6: Commerce + Accounting signals
  const profile: StudentProfile = {
    class: "Class 12",
    stream: "Commerce",
    interests: ["Accounting"],
    goalPreference: "",
  };
  const weights: AssessWeights = { "commerce-management": 1.2, financial: 1.0 };
  const results = matchDirections(profile, weights);
  assert(
    results[0].direction.key === "commerce-management",
    "G6: Commerce + Accounting signals ranks Commerce & Management as top exploration direction"
  );
}

{
  // G7: Arts + Humanities signals
  const profile: StudentProfile = {
    class: "Class 12",
    stream: "Arts",
    interests: ["Literature", "History"],
    goalPreference: "",
  };
  const weights: AssessWeights = { "arts-humanities": 1.2, humanities: 1.0 };
  const results = matchDirections(profile, weights);
  assert(
    results[0].direction.key === "arts-humanities",
    "G7: Arts + Humanities signals ranks Arts & Humanities as top exploration direction"
  );
}

{
  // G8: Non-Predictive Language Assertion across all matches
  const profile: StudentProfile = {
    class: "Class 12",
    stream: "Science (PCM)",
    interests: ["Computer Science"],
    goalPreference: "",
  };
  const weights: AssessWeights = { sciences: 0.8 };
  const results = matchDirections(profile, weights);
  const forbidPredictive = results.every(
    (r) =>
      !r.explanation.includes("suited for") &&
      !r.explanation.includes("perfect career") &&
      !r.explanation.includes("predicts your career")
  );
  assert(
    forbidPredictive,
    "G8: All explanations strictly use exploratory language and forbid predictive career claims"
  );
}

{
  // G9: Phase 5 Course Eligibility Completeness
  const allCourses = ["bsc-computer-application", "bsc-biotechnology", "bsc-botany-chemistry", "bcom", "bba", "bca", "ba-humanities"];
  const verifiedEligible = allCourses.every((cKey) => {
    const course = getCourseByKey(cKey, true);
    return course !== undefined && course.eligibility !== undefined && course.eligibility.trim().length > 10;
  });
  assert(
    verifiedEligible,
    "G9: All 7 verified UG courses have complete, non-empty eligibility specifications"
  );
}

// ----------------------------------------------------------------
// Summary
// ----------------------------------------------------------------
const total = passed + failed;
console.log("\n══════════════════════════════════════════════════════");
console.log("  PS-09 DIRECTION TESTS SUMMARY");
console.log("══════════════════════════════════════════════════════");
console.log(`  Total:   ${total}`);
console.log(`  Passed:  ${passed}`);
console.log(`  Failed:  ${failed}`);

if (failed > 0) {
  console.error("\n  ❌ TEST SUITE FAILED");
  failures.forEach((f) => console.error(`    - ${f}`));
  process.exit(1);
} else {
  console.log("\n  ✅ ALL TESTS PASSED");
  process.exit(0);
}
