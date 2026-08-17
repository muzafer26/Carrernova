# CareerNova Education Path Clarity Implementation & Validation Report
**System:** CareerNova (SIH25094 — J&K Education Advisor)  
**Document Version:** 1.0.0  
**Date:** 2026-08-16  

---

## 1. What Student Problem Was Addressed

Prior to this phase, CareerNova had established correct routing and stream qualification gating, but lacked **Education Path Clarity** on course detail and comparison views. A confused Class 12 Commerce student could see course names (B.Com, BBA, BCA), but could not readily understand:
* What they would actually study in each programme.
* What statutory minimum application eligibility thresholds apply under University of Jammu / Kashmir statutes.
* How a 4-year undergraduate academic degree compares against short vocational/skill-oriented alternative routes (e.g. ITI / NSQF Level 4/5 certificates).
* How options compare side-by-side.

---

## 2. What Code Changed

1. **`src/types/ps09.ts`:**
   * Introduced `SkillAlternative` interface (`label`, `description`, `purpose`, `source`).
   * Enhanced `Course` interface with optional `whatYouWillStudy: string[]` and `skillAlternative: SkillAlternative` fields.

2. **`src/routes/dashboard.directions.$key.tsx`:**
   * Refactored `DirectionDetailPage` to render a structured 5-layer clarity block:
     1. Course Header & Overview
     2. *What You Will Study* (Curriculum Modules)
     3. *Minimum Statutory Application Requirement* (Labeled with University of Jammu / Kashmir citations)
     4. *Degree Route vs. Skill / Vocational Alternative Route* (Side-by-side trade-off block)
     5. *Verified GDC Availability* & *Official Portal Action Buttons*

3. **`src/routes/dashboard.compare.tsx`:**
   * Upgraded `ComparePage` to render curriculum highlights, statutory application thresholds, and vocational skill alternative trade-offs side-by-side.

---

## 3. What Data Changed

* **`src/data/jk-directions.ts`:**
  * Populated `whatYouWillStudy` (curriculum modules) and verified `skillAlternative` entries for all 7 core UG programs:
    * `bsc-computer-application` → ITI Diploma in Hardware & Networking
    * `bsc-biotechnology` → NSQF Certificate in Medical Lab Technology (MLT)
    * `bsc-botany-chemistry` → Soil Testing & Agricultural Quality Control Certificate
    * `bcom` → NSQF Level 4 Financial Accounting Assistant / GST Executive
    * `bba` → NSQF Diploma in Retail Sales & Customer Relationship Management
    * `bca` → NSQF Level 5 Software Developer / Web Vocational Certificate
    * `ba-humanities` → NSQF Diploma in Digital Media, Content Creation & Local Translation

---

## 4. Why Each Change Was Required

* **Curriculum Modules (`whatYouWillStudy`):** Solved student confusion between generic titles by explaining specific learning topics (e.g. Accounting vs. Software Engineering).
* **Statutory Minimum Application Threshold Labeling:** Solved student confusion between minimum application eligibility percentages (45% Open / 40% Reserved) and competitive merit seat allotment cutoffs on J&K Samarth.
* **Degree vs. Skill Alternative Block (`skillAlternative`):** Solved the PS-09 trade-off mandate, enabling students to compare 4-year degree progression (M.Sc/MCA/CUET-PG) vs. short practical vocational certification without claiming one route is universally superior.

---

## 5. Official Sources Supporting New Claims

1. **J&K Department of Skill Development (DSD) / ITI J&K:** `https://jkdsd.in` (Retrieved 2026-08-16)
2. **J&K State Skill Development Mission (JKSSDM):** `https://jkdpm.jk.gov.in` (Retrieved 2026-08-16)
3. **University of Jammu Admission Statutes & Prospectus:** `https://jammuuniversity.ac.in` (Retrieved 2026-08-15)
4. **J&K Samarth Higher Education Admission Portal:** `jkadmissions.samarth.ac.in` (Retrieved 2026-08-15)

---

## 6. Which Pages Changed Behavior

* **`/dashboard/directions/$key`:** Displays detailed curriculum focus, statutory application thresholds, side-by-side Degree vs Skill route trade-offs, and verified college availability for each program.
* **`/dashboard/compare`:** Renders side-by-side curriculum focus, statutory eligibility rules, and vocational skill alternative routes for two selected fields.

---

## 7. Which State Transitions Were Tested

* **Class 12 Commerce Assessment → Directions → Course Detail:** Verified that setting Class 12 Commerce correctly presents Commerce & Management, where B.Com, BBA, and BCA show clear curriculum differences and skill route alternatives.
* **Stream Reset Handling:** Verified that changing streams in `/dashboard/profile` purges stale assessment weights, keeping Commerce recommendations isolated from Science signals.
* **Class 10 Stream Exploration Isolation:** Confirmed `/dashboard/streams` remains isolated to Class 10 stream discovery with zero UG or college leakage.

---

## 8. Which Student Scenarios Were Tested

* **Scenario A (Confused Class 12 Commerce Student):** Student interested in business and computers now sees clear differences between B.Com (Accounting), BBA (Management), and BCA (Applications), along with practical ITI/NSQF skill route alternatives.
* **Scenario B (Class 10 Student):** Strictly isolated to stream exploration at `/dashboard/streams`.
* **Scenario C (Parent Evaluation):** Parent can easily understand statutory eligibility rules, GDC locations (Kathua, Akhnoor), and official portal links.

---

## 9. What Remains Missing

* **Kashmir Division GDC Expansion:** College dataset is currently centered on verified Jammu Division GDCs (Kathua, Akhnoor); populating additional Kashmir Division GDCs across Anantnag, Baramulla, and Srinagar remains an ongoing data entry task.

---

## 10. Final Outcome Assessment

### **`SOLVED (CORE DECISION FLOW & PATH CLARITY)`**

*Rationale:* The core PS-09 student decision problem is now materially solved. A confused J&K student transitions from uncertainty to clarity, understanding stream qualifications, course differences, curriculum modules, statutory minimum application requirements, verified GDC availability, postgraduate pathways, degree vs. vocational skill trade-offs, and the exact official handoff to `jkadmissions.samarth.ac.in`.
