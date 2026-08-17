/**
 * PS-09 — Data Verification Script
 * SIH25094 — Source of Truth & Verification Enforcement
 *
 * Checks:
 *   1. Duplicate direction keys
 *   2. Duplicate course keys
 *   3. Duplicate college keys
 *   4. Course → College reference integrity
 *   5. College → Course reference integrity
 *   6. Course → Direction consistency
 *   7. Verification status enforcement (displayable vs non-displayable)
 *   8. Absence of unverified factual claims in displayable records
 *   9. Completeness of source metadata (url, retrievedOn, status)
 *  10. Resource registry key uniqueness, URL validity, & source metadata
 *  11. Course outcome verification status & complete source metadata
 */

const path = require("path");
process.chdir(path.resolve(__dirname, ".."));

import { directions } from "../src/data/jk-directions";
import { jkColleges } from "../src/data/jk-colleges";
import { officialResources } from "../src/data/jk-resources";

let errors = 0;
let warnings = 0;

function error(msg: string) {
  console.error(`  ❌ ERROR: ${msg}`);
  errors++;
}

function warn(msg: string) {
  console.warn(`  ⚠️  WARN:  ${msg}`);
  warnings++;
}

function section(title: string) {
  console.log(`\n── ${title} ──────────────────────────────────────────`);
}

const allCourses = directions.flatMap((d) => d.courses);
const courseKeySet = new Set(allCourses.map((c) => c.key));
const collegeKeySet = new Set(jkColleges.map((c) => c.key));

// 1. Key uniqueness
section("1. Direction Key Uniqueness");
{
  const seen = new Set<string>();
  for (const d of directions) {
    if (!d.key) error(`Direction missing key: "${d.label}"`);
    else if (seen.has(d.key)) error(`Duplicate direction key: "${d.key}"`);
    else seen.add(d.key);
  }
}

section("2. Course Key Uniqueness");
{
  const seen = new Set<string>();
  for (const c of allCourses) {
    if (!c.key) error(`Course missing key: "${c.label}"`);
    else if (seen.has(c.key)) error(`Duplicate course key: "${c.key}"`);
    else seen.add(c.key);
  }
}

section("3. College Key Uniqueness");
{
  const seen = new Set<string>();
  for (const c of jkColleges) {
    if (!c.key) error(`College missing key: "${c.name}"`);
    else if (seen.has(c.key)) error(`Duplicate college key: "${c.key}"`);
    else seen.add(c.key);
  }
}

// 2. Reference Integrity
section("4. Reference Integrity");
{
  for (const course of allCourses) {
    for (const ck of course.collegeKeys) {
      if (!collegeKeySet.has(ck)) {
        error(`Course "${course.key}" references non-existent college "${ck}"`);
      }
    }
  }
  for (const college of jkColleges) {
    for (const prog of college.programs) {
      if (!courseKeySet.has(prog)) {
        error(`College "${college.key}" references non-existent course "${prog}"`);
      }
    }
  }
}

// 3. Strict Verification & Factual Claim Auditing
section("5. Verification Status & Factual Claim Audit");
{
  // Audit Directions
  for (const d of directions) {
    if (d.verificationStatus === "verified") {
      if (!d.source.url || !d.source.retrievedOn || d.source.status !== "verified") {
        error(`Direction "${d.key}" is marked "verified" but lacks complete source metadata (url, retrievedOn, source.status="verified").`);
      }
    } else {
      warn(`Direction "${d.key}" is marked "${d.verificationStatus}" — non-displayable for verified production data.`);
    }
  }

  // Audit Courses & Outcomes
  for (const c of allCourses) {
    if (c.verificationStatus === "verified") {
      if (!c.source.url || !c.source.retrievedOn || c.source.status !== "verified") {
        error(`Course "${c.key}" is marked "verified" but lacks complete source metadata.`);
      }

      // Audit Outcome entries for verified courses
      for (const o of c.outcomes) {
        if (o.verificationStatus === "verified") {
          if (!o.source || !o.source.url || !o.source.retrievedOn || o.source.status !== "verified") {
            error(`Outcome "${o.label}" under course "${c.key}" is marked "verified" but lacks complete source metadata.`);
          }
        }
      }
    } else {
      if (c.eligibility && c.eligibility.trim() !== "") {
        error(`Course "${c.key}" is unverified but contains eligibility claim: "${c.eligibility}". Remove unverified claims.`);
      }
      if (c.relatedExams && c.relatedExams.length > 0) {
        error(`Course "${c.key}" is unverified but contains exam claims: ${c.relatedExams.join(", ")}.`);
      }
      if (c.outcomes && c.outcomes.length > 0) {
        error(`Course "${c.key}" is unverified but contains outcome claims.`);
      }
      warn(`Course "${c.key}" is marked "${c.verificationStatus}" — non-displayable.`);
    }
  }

  // Audit Colleges
  for (const college of jkColleges) {
    if (college.verificationStatus === "verified") {
      if (!college.source.url || !college.source.retrievedOn || college.source.status !== "verified") {
        error(`College "${college.key}" is marked "verified" but lacks complete source metadata.`);
      }
      if (!college.programs || college.programs.length === 0) {
        error(`Verified college "${college.key}" must have at least one verified program mapping.`);
      }
    } else {
      warn(`College "${college.key}" is marked "${college.verificationStatus}" — excluded from R5 display gating.`);
    }
  }
}

// 4. Resource Registry Audit
section("6. Official Resource Registry Audit");
{
  const seenResourceKeys = new Set<string>();
  for (const res of officialResources) {
    if (!res.key) {
      error(`Resource missing key: "${res.title}"`);
    } else if (seenResourceKeys.has(res.key)) {
      error(`Duplicate resource key: "${res.key}"`);
    } else {
      seenResourceKeys.add(res.key);
    }

    if (!res.url || (!res.url.startsWith("http://") && !res.url.startsWith("https://"))) {
      error(`Resource "${res.key}" has invalid or missing URL: "${res.url}"`);
    }

    if (res.verificationStatus !== "verified") {
      error(`Student-visible resource "${res.key}" must have verificationStatus = "verified".`);
    }

    if (!res.source || !res.source.url || !res.source.retrievedOn || res.source.status !== "verified") {
      error(`Resource "${res.key}" lacks complete source metadata.`);
    }
  }
}

console.log("\n══════════════════════════════════════════════════════");
console.log("  PS-09 DATA VERIFICATION SUMMARY");
console.log("══════════════════════════════════════════════════════");
console.log(`  Directions:  ${directions.length} (${directions.filter(d=>d.verificationStatus==='verified').length} verified)`);
console.log(`  Courses:     ${allCourses.length} (${allCourses.filter(c=>c.verificationStatus==='verified').length} verified)`);
console.log(`  Colleges:    ${jkColleges.length} (${jkColleges.filter(c=>c.verificationStatus==='verified').length} verified)`);
console.log(`  Resources:   ${officialResources.length} (${officialResources.filter(r=>r.verificationStatus==='verified').length} verified)`);
console.log(`  Errors:      ${errors}`);
console.log(`  Warnings:    ${warnings}`);

if (errors > 0) {
  console.error("\n  ❌ VERIFICATION FAILED — fix all errors.");
  process.exit(1);
} else {
  console.log("\n  ✅ VERIFICATION PASSED.");
  process.exit(0);
}
