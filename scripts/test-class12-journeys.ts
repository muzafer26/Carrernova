// ============================================================
// CAREERNOVA AUTOMATED CLASS 12 JOURNEY TEST SUITE
// Validates hard eligibility, signal sensitivity, multi-stream logic, determinism
// Run: npx tsx scripts/test-class12-journeys.ts
// ============================================================

import { rankCourses, checkCourseEligibility, getAllowedRecommendationLevel } from "../src/lib/recommendations";
import type { StudentProfile, AssessSignalVector } from "../src/types/ps09";

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`✅ PASS: ${msg}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${msg}`);
    failed++;
  }
}

console.log("\n============================================================");
console.log("RUNNING CAREERNOVA CLASS 12 JOURNEY REGRESSION SUITE");
console.log("============================================================\n");

// 1. Stage Gate
const c12Prof: StudentProfile = { class: "Class 12", stream: "Commerce", district: "Jammu" };
assert(getAllowedRecommendationLevel(c12Prof) === "POST_12", "Class 12 profile returns POST_12 mode");

// 2. Scenario 1: Commerce + Finance Persona
console.log("\n--- Scenario 1: Commerce + Finance Persona ---");
const finSignals: AssessSignalVector = { assessmentVersion: "v2", financial: 3.0, business: 2.0, aversion_programming: 1.0 };
const finMatches = rankCourses({ class: "Class 12", stream: "Commerce" }, finSignals, 5, true);
assert(finMatches.length > 0, "Commerce Finance persona produces matches");
assert(finMatches[0].course.key === "bcom" || finMatches[0].course.key === "bba", `Top match is B.Com/BBA (got: ${finMatches[0]?.course.key})`);
assert(!finMatches.some(m => m.course.key === "bca" && m.matchCategory === "Strong Match"), "BCA is NOT a top strong match for Finance persona");

// 3. Scenario 2: Commerce + Tech Persona
console.log("\n--- Scenario 2: Commerce + Tech Persona ---");
const comTechSignals: AssessSignalVector = { assessmentVersion: "v2", technology: 3.0, programming: 3.0, business: 1.0 };
const comTechMatches = rankCourses({ class: "Class 12", stream: "Commerce" }, comTechSignals, 5, true);
assert(comTechMatches.length > 0, "Commerce Tech persona produces matches");
assert(comTechMatches[0].course.key === "bca" || comTechMatches[0].course.key === "bsc-computer-application", `Top match is BCA or B.Sc Comp App (got: ${comTechMatches[0]?.course.key})`);

// 4. Scenario 3: Science PCB + Biology Persona
console.log("\n--- Scenario 3: Science PCB + Biology Persona ---");
const bioSignals: AssessSignalVector = { assessmentVersion: "v2", biological: 3.0, laboratory: 2.5, scientific: 2.0 };
const bioMatches = rankCourses({ class: "Class 12", stream: "Science (PCB)" }, bioSignals, 5, true);
assert(bioMatches.length > 0, "Science PCB persona produces matches");
assert(bioMatches[0].course.key === "bsc-biotechnology" || bioMatches[0].course.key === "bsc-botany-chemistry", `Top match is Biotech or Botany (got: ${bioMatches[0]?.course.key})`);

// 5. Scenario 4: Arts + Humanities Persona
console.log("\n--- Scenario 4: Arts + Humanities Persona ---");
const artsSignals: AssessSignalVector = { assessmentVersion: "v2", humanities: 2.5, publicService: 2.5, social: 2.0 };
const artsMatches = rankCourses({ class: "Class 12", stream: "Arts / Humanities" }, artsSignals, 5, true);
assert(artsMatches.length > 0, "Arts Humanities persona produces matches");
assert(artsMatches[0].course.key === "ba-economics-polscience" || artsMatches[0].course.key === "ballb-integrated" || artsMatches[0].course.key === "ba-humanities", `Top match is Arts aligned (got: ${artsMatches[0]?.course.key})`);

// 6. One-Answer Sensitivity Test
console.log("\n--- Scenario 5: One-Answer Sensitivity Test ---");
const baseSignals: AssessSignalVector = { assessmentVersion: "v2", financial: 2.0, programming: 0 };
const modifiedSignals: AssessSignalVector = { assessmentVersion: "v2", financial: 2.0, programming: 3.0 };
const baseRank = rankCourses({ class: "Class 12", stream: "Commerce" }, baseSignals, 3, true);
const modifiedRank = rankCourses({ class: "Class 12", stream: "Commerce" }, modifiedSignals, 3, true);
assert(baseRank[0].course.key !== modifiedRank[0].course.key, "Toggling programming signal changes top course rank");

// 7. Determinism Test
console.log("\n--- Scenario 6: Deterministic Repeatability ---");
const runA = rankCourses(c12Prof, finSignals, 5, true);
const runB = rankCourses(c12Prof, finSignals, 5, true);
assert(JSON.stringify(runA.map(m => m.course.key)) === JSON.stringify(runB.map(m => m.course.key)), "Identical inputs yield identical rankings across repeated executions");

console.log("\n============================================================");
console.log(`CLASS 12 SUITE SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("============================================================\n");

if (failed > 0) process.exit(1);
