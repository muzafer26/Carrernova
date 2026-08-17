# PS-09 Education Path Clarity Specification
**System:** CareerNova (SIH25094 — J&K Education Advisor)  
**Document Version:** 1.0.0  
**Date:** 2026-08-16  

---

## 1. Objective

To upgrade the core student decision flow across CareerNova so that a confused J&K student transitions from uncertainty to **Education Path Clarity**. The application must contextualize every verified undergraduate degree with:
1. **What You Study:** Core subjects and curriculum focus.
2. **Statutory Application Eligibility:** Exact 10+2 stream qualification rules labeled as *"Minimum Statutory Application Threshold"*.
3. **Contextual Skill / Vocational Alternative Route:** Side-by-side comparison explaining traditional 4-year degree vs. short vocational skill options without claiming one path is universally superior.
4. **Verified Local GDC Availability:** Institutional mapping across J&K.
5. **Post-UG Pathways:** CUET-PG entrance exams, higher study, state exams (JKPSC/JKSSB).
6. **Contextual Official Source:** Direct destination handoff (J&K Samarth Admission Portal / J&K Skill Development Department).

---

## 2. Core Information Architecture Per Course

For every verified course in `src/data/jk-directions.ts`, the UI will display a structured 5-layer clarity block:

```
┌────────────────────────────────────────────────────────────────────────┐
│ COURSE TITLE & DIRECTION BADGE                                         │
│ Plain Language Overview (2-3 sentences)                                │
├────────────────────────────────────────────────────────────────────────┤
│ 📚 WHAT YOU WILL STUDY                                                 │
│ Key subjects & core modules (e.g. Programming, Data Structures, DB)    │
├────────────────────────────────────────────────────────────────────────┤
│ 📋 STATUTORY APPLICATION ELIGIBILITY                                   │
│ Sourced 10+2 stream rule & min aggregate (labeled Minimum Application) │
├────────────────────────────────────────────────────────────────────────┤
│ ⚖️ DEGREE VS. SKILL ALTERNATIVE ROUTE COMPARISON                       │
│ • Degree Route (4-Year FYUGP): Academic foundation, MCA/M.Sc, CUET-PG   │
│ • Skill/Vocational Route: Short NSQF/ITI Diploma, immediate practical  │
│   skills. Sourced Official Link: J&K Skill Development Dept            │
├────────────────────────────────────────────────────────────────────────┤
│ 🏫 VERIFIED GDC AVAILABILITY & OFFICIAL PORTAL HANDOFF                 │
│ Colleges offering course (e.g., GDC Kathua) + J&K Samarth Direct Link  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Data Schema Enhancements (`src/types/ps09.ts` & `src/data/jk-directions.ts`)

Add optional `whatYouWillStudy` array and `skillAlternative` object to the `Course` interface in `src/types/ps09.ts`:

```typescript
export interface SkillAlternative {
  label: string;
  description: string;
  purpose: string;
  source: SourceMeta;
}

export interface Course {
  // ... existing fields ...
  whatYouWillStudy?: string[];
  skillAlternative?: SkillAlternative;
}
```

---

## 4. Required Course Data Entries (`src/data/jk-directions.ts`)

All 7 verified core courses will be populated with authoritative, source-backed skill alternative context and curriculum highlights:

1. **`bsc-computer-application`:**
   * *What You Study:* Programming in C++/Python, Computer Organization, Database Management Systems, Web Fundamentals.
   * *Skill Alternative:* 6–12 month NSQF/ITI Diploma in Computer Hardware & Networking / Software Application Development (J&K Skill Development Department).
2. **`bsc-biotechnology`:**
   * *What You Study:* Cell Biology, Molecular Genetics, Biochemistry, Recombinant DNA Technology, Lab Techniques.
   * *Skill Alternative:* Short-term Vocational Certificate in Medical Lab Technology (MLT) / Clinical Diagnostics.
3. **`bsc-botany-chemistry`:**
   * *What You Study:* Organic & Inorganic Chemistry, Plant Physiology, Ecology, Analytical Chemistry.
   * *Skill Alternative:* Diploma in Agricultural Chemistry & Soil Testing / Horticulture Skills.
4. **`bcom`:**
   * *What You Study:* Financial Accounting, Business Law, Corporate Accounting, Income Tax, Commercial Statistics.
   * *Skill Alternative:* Short-term Tally/GST Certification & Financial Accounting Assistant (NSQF Level 4).
5. **`bba`:**
   * *What You Study:* Principles of Management, Organizational Behavior, Marketing Management, Business Economics.
   * *Skill Alternative:* Diploma in Retail Management / Digital Marketing & Sales Operations.
6. **`bca`:**
   * *What You Study:* Software Engineering, Data Structures & Algorithms, Web Development, Database Systems, Java/Python.
   * *Skill Alternative:* 6-month Web Development / Full-Stack Coding Bootcamp & NSQF Software Developer Certification.
7. **`ba-humanities`:**
   * *What You Study:* History, Political Science, English Literature, Sociology, Public Administration.
   * *Skill Alternative:* Diploma in Content Writing, Journalism & Mass Communication / Local Language Translation Skills.

---

## 5. UI Component Updates (`src/routes/dashboard.directions.$key.tsx` & `src/routes/dashboard.compare.tsx`)

* Update `DirectionDetailPage` to render:
  * Key Curriculum Modules (*"What You Will Study"*).
  * Statutory Minimum Application Eligibility note with University of Jammu / Kashmir citation.
  * Side-by-side **Degree vs. Skill Alternative Pathway Comparison** card with neutral, non-biased guidance.
  * Direct action links to J&K Samarth Admission Portal and J&K Skill Development Department (`jk.gov.in`).
* Update `ComparePage` to include statutory eligibility and skill route trade-off columns.

---

## 6. Verification & Stop Conditions

* **Zero Fake Data:** All skill alternative citations must reference official sources (J&K Skill Development Department `https://jkdpm.jk.gov.in` / NSDC / ITI J&K).
* **ScholarSync Isolation:** ScholarSync codebase untouched.
* **No UI Redesign:** Preserve existing dark-mode glassmorphic design system.
