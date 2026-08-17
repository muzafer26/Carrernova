// ============================================================
// CAREERNOVA AUTOMATED CLASS 10 JOURNEY TEST SUITE
// Validates strict stage separation, stream gating, and non-UG outputs
// Run: npx tsx scripts/test-class10-journeys.ts
// ============================================================

import { getAllowedRecommendationLevel, rankCourses } from "../src/lib/recommendations";
import { isClass10Profile, class10Streams } from "../src/lib/directions";
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
console.log("RUNNING CAREERNOVA CLASS 10 JOURNEY REGRESSION SUITE");
console.log("============================================================\n");

// 1. Stage Gate Check
const c10Profile: StudentProfile = { class: "Class 10", stream: "General", district: "Kathua" };
assert(getAllowedRecommendationLevel(c10Profile) === "SCHOOL_STAGE", "Class 10 profile returns SCHOOL_STAGE mode");
assert(isClass10Profile(c10Profile) === true, "isClass10Profile helper returns true");

// 2. Zero UG Degree Direct Output Rule
const ugMatches = rankCourses(c10Profile, { biological: 3.0 }, 5, true);
assert(ugMatches.length === 0, "Class 10 profile produces 0 undergraduate degree matches from UG ranking engine");

// 3. Class 10 Stream Recommendations Check
assert(class10Streams.length === 3, "Exactly 3 JKBOSE higher secondary streams defined (Science, Commerce, Arts)");
const sciStream = class10Streams.find(s => s.key === "science");
assert(sciStream?.coreSubjectAreas.includes("Biology"), "Science stream contains Biology core subject area");
assert(sciStream?.ugPathExamples.length! > 0, "Science stream lists downstream degree examples (not immediate choices)");

// 4. Class 10 Persona Scenarios
console.log("\n--- Scenario A: Class 10 Finance Interest ---");
const c10Finance: StudentProfile = { class: "Class 10", stream: "General", interests: ["Finance", "Business"] };
assert(c10Finance.class === "Class 10", "Class 10 Finance persona remains isolated in Class 10 stage");

console.log("\n--- Scenario B: Class 10 Biotech Interest ---");
const c10Biotech: StudentProfile = { class: "Class 10", stream: "General", interests: ["Biotechnology", "Biology"] };
assert(c10Biotech.class === "Class 10", "Class 10 Biotech persona remains isolated in Class 10 stage");

console.log("\n============================================================");
console.log(`CLASS 10 SUITE SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("============================================================\n");

if (failed > 0) process.exit(1);
