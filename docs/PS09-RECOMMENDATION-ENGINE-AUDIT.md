# PS-09 — CAREERNOVA RECOMMENDATION ENGINE AUDIT REPORT
**Document ID:** `PS09-RECOMMENDATION-ENGINE-AUDIT.md`  
**Target System:** CareerNova Guided Student Journey & Advisor Engine (SIH25094)  
**Date:** August 17, 2026  
**Status:** Audit Complete — Action Required  

---

## 1. EXECUTIVE SUMMARY & PROBLEM STATEMENT

During end-to-end evaluation of the CareerNova quiz and recommendation workflow, inconsistent and arbitrary course recommendations were observed:
- A student choosing **Finance / Accounting / Business** interests in the quiz still receives **B.Sc Computer Science / Computer Applications** as a top recommendation if qualified for Science.
- A student choosing **Biotechnology / Biology / Laboratory Science** receives the exact same **B.Sc Computer Application** top recommendation.
- A student choosing **Humanities / History / Public Service** receives generic direction cards without course-level relevance differentiation.

### Root Cause Diagnosis
1. **Direction-Level Bottleneck:** The current recommendation engine (`matchDirections()` in `src/lib/directions.ts`) only calculates scores for 3 broad direction categories (`sciences`, `commerce-management`, `arts-humanities`). It **does not score or rank individual courses** (`Course` objects).
2. **Fixed Course Array Ordering:** Courses within a direction are displayed in the static order defined in `src/data/jk-directions.ts`. In `sciences`, `bsc-computer-application` is index `0`. Thus, any student whose top direction is `sciences` sees `B.Sc Computer Application` first, whether they chose Biology, Chemistry, or Software!
3. **Signal Discard in Assessment:** While `dashboard.assess.tsx` collects granular sub-signals (`technical`, `business`, `lab`, `financial`, `languages`, `social`, etc.), it **discards all sub-signals** when computing `computedWeights`, storing only 3 coarse direction keys in `localStorage`.
4. **Qualification & Relevance Conflation:** Hard eligibility (stream prerequisites) is conflated with soft relevance (quiz answers and interests), leading to eligible courses appearing as "strongly recommended" without evidence of student alignment.

---

## 2. COMPLETE PIPELINE AUDIT

```
+------------------------------+
|   dashboard.assess.tsx       |  Collects 7 questions (q1..q7)
+--------------+---------------+
               |
               v
+------------------------------+
|   AssessWeights Computations |  DISCARDS granular signals (lab, financial, technical)
+--------------+---------------+  ONLY stores: sciences, commerce-management, arts-humanities
               |
               v
+------------------------------+
|   localStorage Persistence   |  Key: ps09_assess_weights
+--------------+---------------+
               |
               v
+------------------------------+
|   src/lib/directions.ts     |  matchDirections() evaluates 3 broad directions
+--------------+---------------+  Hard stream check -> Adds +1.0 for interest -> Adds direction weight * 1.5
               |
               v
+------------------------------+
|   dashboard.directions.index |  Renders top 2-4 Direction Cards
+--------------+---------------+
               |
               v
+------------------------------+
|   dashboard.directions.$key  |  Renders direction.courses in STATIC ARRAY ORDER!
+------------------------------+  (bsc-computer-application is always #1 in sciences)
```

---

## 3. AUDIT FINDINGS BY COMPONENT

### A. Assessment Component (`src/routes/dashboard.assess.tsx`)
- **Current Input:** User answers 7 radio questions covering activities, subjects, work style, curiosity, environment, aversions, and certainty.
- **Current Signal Extraction:** Options define `weights` containing keys like `{ sciences: 0.8, technical: 0.8 }` or `{ sciences: 0.8, lab: 0.8 }`.
- **Current Bug:** In `handleComplete()`, `computedWeights` only initializes keys: `sciences`, `commerce-management`, `arts-humanities`, `uncertainty`, `aversion_lab`, `aversion_math`, `aversion_financial`, `aversion_writing`. All granular keys (`technical`, `lab`, `financial`, `business`, `languages`, `social`, etc.) are dropped. Both Biology and Software increment `sciences` identically!

### B. Core Recommendation Logic (`src/lib/directions.ts`)
- **Current Score Formula:**  
  `score = 1.0 (base qualification) + 1.0 * (matched interests) + 1.5 * (direction weight) - 0.4 (aversion penalty)`
- **Current Ranking:** Sorts directions by `score` descending.
- **Current Filter:** Hard stream filter checks if `profile.stream` matches `direction.streamRequirements`.
- **Current Fallback:** If uncertainty is high (`uncertainty >= 2`), returns directions with neutral base score and generic text.
- **Current Course Selection:** **NON-EXISTENT.** No course-level scoring function exists. `getCoursesByDirection()` returns courses in raw data file order.

### C. Course Metadata (`src/data/jk-directions.ts`)
- **Current Metadata:** Courses contain `key`, `label`, `eligibility`, `description`, `whatYouWillStudy`, `outcomes`.
- **Missing Feature Vectors:** Courses lack structured `recommendationSignals` (e.g., `financial`, `biological`, `laboratory`, `technology`, `programming`, `quantitative`, `management`, `social`, `publicService`).

---

## 4. REPAIR ARCHITECTURE PLAN (LAYER A & LAYER B)

To satisfy P0 requirements, CareerNova will implement a two-layer architecture:

### Layer A — Qualification / Possibility (Hard Gate)
- **Question:** "Can this student realistically pursue this course?"
- **Inputs:** Class level, Stream (PCM, PCB, PCMB, Commerce, Arts), Subjects (if provided).
- **Output:** `ELIGIBLE` | `NOT_ELIGIBLE` | `REQUIRES_MORE_INFO`.
- **Rule:** If `NOT_ELIGIBLE`, the course can NEVER be ranked as a top recommended course.

### Layer B — Relevance & Exploration (Soft Signal Scoring)
- **Question:** "Among qualified courses, which align best with student signals?"
- **Inputs:** Granular Assessment Signal Vector (`AssessSignalVector`) + Profile Interests + Goals + Aversions.
- **Output:** Deterministic Course Relevance Score (0–100) + Match Category + Rationale.

---

## 5. SIGNAL VECTOR & COURSE FEATURE MODEL

### Assessment Signal Vector (`AssessSignalVector`)
```typescript
export interface AssessSignalVector {
  // Broad Domains
  technology: number;
  programming: number;
  biological: number;
  laboratory: number;
  financial: number;
  business: number;
  management: number;
  humanities: number;
  social: number;
  languages: number;
  quantitative: number;
  analytical: number;
  publicService: number;
  practical: number;

  // Preferences & Aversions
  aversion_lab: number;
  aversion_math: number;
  aversion_financial: number;
  aversion_writing: number;
  aversion_programming: number;

  // Decision State
  uncertainty: number;
  certainty: number;
}
```

### Course Feature Metadata (`CourseRecommendationSignals`)
Each course in `jk-directions.ts` will declare explicit feature weights (0 to 5 scale):
- `bsc-computer-application`: `{ technology: 5, programming: 5, analytical: 4, quantitative: 3 }`
- `bsc-biotechnology`: `{ biological: 5, laboratory: 5, scientific: 5, analytical: 3 }`
- `bcom`: `{ financial: 5, business: 5, quantitative: 4, management: 3 }`
- `bba`: `{ business: 5, management: 5, communication: 4, financial: 3 }`
- `ba-psychology`: `{ social: 5, humanities: 5, analytical: 3, communication: 4 }`
- `ba-economics`: `{ financial: 4, quantitative: 5, analytical: 5, humanities: 3 }`

---

## 6. DETERMINISTIC COURSE SCORING FORMULA

```
courseScore = 
  eligibilityGate (0 if ineligible, 20 base if eligible)
  + interestMatchScore (0 to 25)
  + signalDotProduct (0 to 35)
  + goalAlignmentBonus (0 to 10)
  + aversionPenalty (0 to -15)
  + localAvailabilityBonus (0 to 10)
```

### Match Categories:
- **Strong Match:** Score >= 75
- **Good Match:** Score 55 - 74
- **Worth Exploring:** Score 35 - 54
- **Possible Option:** Score < 35

### Deterministic Tie-Breaking Order:
1. Higher Signal Dot Product
2. Higher Direct Interest Match Count
3. Goal Alignment Match
4. Local Verification Availability
5. Course Key Alphabetical Order (Final deterministic fallback)

---

## 7. NEXT STEPS FOR IMPLEMENTATION
1. Define `AssessSignalVector` and update `src/types/ps09.ts`.
2. Enrich `Course` schema with `recommendationSignals` in `src/data/jk-directions.ts`.
3. Implement `extractSignals()`, `checkCourseEligibility()`, `scoreCourse()`, and `rankCourses()` in `src/lib/recommendations.ts`.
4. Update `src/routes/dashboard.assess.tsx` to persist full `AssessSignalVector` with `assessmentVersion: "v2"`.
5. Update `dashboard.directions.index.tsx` and `GuidedStoryJourney.tsx` to render course-level ranked recommendations with inspectable "Why" rationale.
6. Create comprehensive test suite `scripts/test-recommendations.ts` with test matrix across all streams and profiles.
