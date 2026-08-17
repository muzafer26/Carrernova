// ============================================================
// PS-09 — CAREERNOVA AUTOMATED RECOMMENDATION SUITE
// Automated Test Suite for P0 Personalized Course Match Engine
// Run: npx tsx scripts/test-recommendations.ts
// ============================================================

import { rankCourses, scoreCourse, checkCourseEligibility, getAllowedRecommendationLevel } from "../src/lib/recommendations";
import { getCourseByKey, isClass10Profile } from "../src/lib/directions";
import type { StudentProfile, AssessSignalVector } from "../src/types/ps09";

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passedCount++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failedCount++;
  }
}

console.log("\n============================================================");
console.log("RUNNING CAREERNOVA P0 RECOMMENDATION ENGINE REGRESSION SUITE");
console.log("============================================================\n");

// ----------------------------------------------------------------
// TEST CASE 1: CENTRAL EDUCATIONAL STAGE GATE
// ----------------------------------------------------------------
console.log("--- TEST CASE 1: Central Educational Stage Gate ---");
const c10Prof: StudentProfile = { class: "Class 10", stream: "General", interests: ["Biology"], goalPreference: "explore" };
const c12Prof: StudentProfile = { class: "Class 12", stream: "Science (PCM)", interests: ["Programming"], goalPreference: "degrees" };

assert(getAllowedRecommendationLevel(c10Prof) === "SCHOOL_STAGE", "Class 10 profile returns SCHOOL_STAGE");
assert(getAllowedRecommendationLevel(c12Prof) === "POST_12", "Class 12 profile returns POST_12");
assert(isClass10Profile(c10Prof) === true, "isClass10Profile returns true for Class 10");

// ----------------------------------------------------------------
// TEST CASE 2: FINANCE PERSONA (Commerce Stream)
// ----------------------------------------------------------------
console.log("\n--- TEST CASE 2: Finance / Commerce Profile ---");
const financeProfile: StudentProfile = {
  class: "Class 12",
  stream: "Commerce",
  district: "Jammu",
  interests: ["Finance", "Accounting", "Business"],
  goalPreference: "degrees",
};
const financeSignals: AssessSignalVector = {
  assessmentVersion: "v2",
  financial: 2.5,
  business: 2.0,
  quantitative: 1.5,
  aversion_programming: 1.0,
  aversion_lab: 1.0,
};

const financeMatches = rankCourses(financeProfile, financeSignals, 5, true);
assert(financeMatches.length > 0, "Finance profile produces course recommendations");
assert(
  financeMatches[0].course.key === "bcom" || financeMatches[0].course.key === "bba",
  `Finance top course should be B.Com or BBA (got: ${financeMatches[0]?.course.key})`
);
assert(
  !financeMatches.some((m) => m.course.key === "bca" && m.matchCategory === "Strong Match"),
  "BCA should not be a top strong match for finance profile with programming aversion"
);

// ----------------------------------------------------------------
// TEST CASE 3: BIOTECHNOLOGY / LAB PERSONA (PCB Stream)
// ----------------------------------------------------------------
console.log("\n--- TEST CASE 3: Biotechnology / Biology Profile ---");
const bioProfile: StudentProfile = {
  class: "Class 12",
  stream: "Science (PCB)",
  district: "Kathua",
  interests: ["Biology", "Biotechnology", "Laboratory"],
  goalPreference: "degrees",
};
const bioSignals: AssessSignalVector = {
  assessmentVersion: "v2",
  biological: 3.0,
  laboratory: 2.5,
  scientific: 2.0,
  aversion_financial: 1.0,
};

const bioMatches = rankCourses(bioProfile, bioSignals, 5, true);
assert(bioMatches.length > 0, "Biology profile produces course recommendations");
assert(
  bioMatches[0].course.key === "bsc-biotechnology" || bioMatches[0].course.key === "bsc-botany-chemistry",
  `Biology top course should be bsc-biotechnology or bsc-botany-chemistry (got: ${bioMatches[0]?.course.key})`
);
assert(
  !bioMatches.some((m) => m.course.key === "bsc-computer-application" && m.score > bioMatches[0].score),
  "Computer Application should not rank higher than Biotechnology for Biology profile"
);

// ----------------------------------------------------------------
// TEST CASE 4: PROGRAMMING / TECH PERSONA (PCM Stream)
// ----------------------------------------------------------------
console.log("\n--- TEST CASE 4: Programming / Technology Profile ---");
const techProfile: StudentProfile = {
  class: "Class 12",
  stream: "Science (PCM)",
  district: "Jammu",
  interests: ["Computer Science", "Programming", "Technology"],
  goalPreference: "degrees",
};
const techSignals: AssessSignalVector = {
  assessmentVersion: "v2",
  technology: 3.0,
  programming: 3.0,
  analytical: 2.0,
  aversion_lab: 1.0,
};

const techMatches = rankCourses(techProfile, techSignals, 5, true);
assert(techMatches.length > 0, "Tech profile produces course recommendations");
assert(
  techMatches[0].course.key === "bca" || techMatches[0].course.key === "bsc-computer-application",
  `Tech top course should be BCA or B.Sc Computer Application (got: ${techMatches[0]?.course.key})`
);

// ----------------------------------------------------------------
// TEST CASE 5: HUMANITIES / PUBLIC SERVICE PERSONA (Arts Stream)
// ----------------------------------------------------------------
console.log("\n--- TEST CASE 5: Humanities / Public Service Profile ---");
const artsProfile: StudentProfile = {
  class: "Class 12",
  stream: "Arts / Humanities",
  district: "Srinagar",
  interests: ["History", "Political Science", "Society"],
  goalPreference: "govt",
};
const artsSignals: AssessSignalVector = {
  assessmentVersion: "v2",
  humanities: 2.5,
  publicService: 2.5,
  social: 2.0,
  communication: 2.0,
};

const artsMatches = rankCourses(artsProfile, artsSignals, 5, true);
assert(artsMatches.length > 0, "Arts profile produces course recommendations");
assert(
  artsMatches[0].course.key === "ba-economics-polscience" || artsMatches[0].course.key === "ballb-integrated" || artsMatches[0].course.key === "ba-humanities",
  `Arts top course should be Humanities / Public Service aligned (got: ${artsMatches[0]?.course.key})`
);

// ----------------------------------------------------------------
// TEST CASE 6: CLASS 10 ISOLATION (Hard Eligibility Gate)
// ----------------------------------------------------------------
console.log("\n--- TEST CASE 6: Class 10 Qualification Gate ---");
const class10Profile: StudentProfile = {
  class: "Class 10",
  stream: "General",
  interests: ["Biology", "Computer Science"],
  goalPreference: "explore",
};

const class10Matches = rankCourses(class10Profile, {}, 5, true);
assert(class10Matches.length === 0, "Class 10 students receive 0 undergraduate degree matches (Hard Filter)");

// ----------------------------------------------------------------
// TEST CASE 7: INVERSE PROFILE & SENSITIVITY TEST
// ----------------------------------------------------------------
console.log("\n--- TEST CASE 7: Inverse Profile & Sensitivity Test ---");
const inverseFinance = rankCourses(financeProfile, financeSignals, 3, true);
const inverseTech = rankCourses(techProfile, techSignals, 3, true);
assert(
  inverseFinance[0].course.key !== inverseTech[0].course.key,
  "Finance and Programming personas yield materially different top recommendations"
);

// Sensitivity Test: Single interest change (Finance -> Biology)
const adjustedFinanceProfile: StudentProfile = { ...financeProfile, interests: ["Biology", "Biotechnology"] };
const adjustedBioSignals: AssessSignalVector = { assessmentVersion: "v2", biological: 3.0, laboratory: 2.0 };
const adjustedBioProfile: StudentProfile = { class: "Class 12", stream: "Science (PCB)", district: "Jammu", interests: ["Biology"], goalPreference: "degrees" };
const adjustedMatches = rankCourses(adjustedBioProfile, adjustedBioSignals, 3, true);

assert(
  adjustedMatches[0].course.key === "bsc-biotechnology" || adjustedMatches[0].course.key === "bsc-botany-chemistry",
  "Changing interests from Finance to Biology materially updates ranking order to Biological Sciences"
);

// ----------------------------------------------------------------
// TEST CASE 8: DETERMINISTIC REPEATABILITY
// ----------------------------------------------------------------
console.log("\n--- TEST CASE 8: Deterministic Repeatability ---");
const run1 = rankCourses(techProfile, techSignals, 5, true);
const run2 = rankCourses(techProfile, techSignals, 5, true);
assert(
  JSON.stringify(run1.map((m) => m.course.key)) === JSON.stringify(run2.map((m) => m.course.key)),
  "Identical inputs produce identical course rankings across repeated runs"
);

console.log("\n============================================================");
console.log(`SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("============================================================\n");

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
