# CareerNova V1 — Core Logic Finalization Report
**System:** CareerNova (SIH25094 — J&K Education Advisor)  
**Document Version:** 1.0.0 — Logic-First Finalization  
**Date:** 2026-08-16  

---

## 1. Final Student Problem Being Solved

CareerNova V1 solves the pre-admission educational awareness and decision gap faced by Jammu & Kashmir students in Class 10 and Class 12. 
Confused students often lack clarity regarding:
- What streams involve after Class 10.
- Which undergraduate programs match their 10+2 stream qualification.
- What specific core subjects/curriculum modules comprise programs like B.Com, BBA, and BCA.
- Which nearby Government Degree Colleges (GDCs) offer verified programs.
- How 4-year academic degrees compare against short practical vocational skill options (ITI/NSQF).
- Which official government portals (e.g. J&K Samarth, JKBOSE) contain official next actions.

CareerNova does **not** predict student career destinies or diagnose personality types. It provides a transparent, source-backed decision-support system.

---

## 2. Final Logical Architecture

```
[ STUDENT PROFILE ] (/dashboard/profile)
  ├── Class 10 ──► [ STREAM EXPLORATION ] (/dashboard/streams)
  └── Class 12 ──► [ EXPLORATION SURVEY ] (/dashboard/assess)
                          │
                          ▼
                [ QUALIFIED FIELDS ] (/dashboard/directions)
                          │
                          ▼
                [ COURSE CLARITY CARD ] (/dashboard/directions/$key)
                  ├── Curriculum Modules
                  ├── Statutory Minimum Application Threshold
                  └── Degree vs. Skill Route Trade-Off
                          │
                          ├──► [ VERIFIED GDCS ] (/dashboard/colleges)
                          ├──► [ POST-UG PATHWAYS ] (/dashboard/outcomes/$key)
                          ├──► [ COURSE COMPARISON ] (/dashboard/compare)
                          └──► [ OFFICIAL HANDOFF ] (/dashboard/nextstep)
```

---

## 3. Final State Model

* **`ps09_student_profile`:** Stores class (`Class 10` | `Class 12`), stream (`Science (PCM)`, `Science (PCB)`, `Commerce`, `Arts/Humanities`), and interests.
* **`ps09_assess_weights`:** Stores exploration weights accumulated during the 7-question survey.
* **State Reset Invalidation:**
  * Switching from Class 12 to Class 10 purges `ps09_assess_weights`, clears stream/interests, and redirects directly to `/dashboard/streams`.
  * Changing streams in `/dashboard/profile` purges `ps09_assess_weights` to prevent cross-stream weight contamination.

---

## 4. Final Route Model

| Route Path | Role & Purpose | Key Logic & State Guard |
|---|---|---|
| `/dashboard/profile` | Onboarding / Profile Entry | Class & Stream selector. Triggers state purging on state changes. |
| `/dashboard/streams` | Class 10 Stream Discovery | Hard-gated to Class 10. Prevents UG degree/college leakage. |
| `/dashboard/assess` | Class 12 Exploration Survey | 7 soft-signal questions. Excludes hard stream gating. |
| `/dashboard/directions` | Qualified Product Categories | Hard stream filter applied (`streamRequirements`). Soft survey ranks categories. |
| `/dashboard/directions/$key` | Detailed Course Clarity View | Renders curriculum, statutory eligibility, degree vs skill trade-offs, and GDC availability. |
| `/dashboard/colleges` | Verified Local GDC Lookup | Filters colleges where `college.programs` includes selected course key. |
| `/dashboard/outcomes/$key` | Verified Post-UG Pathways | Renders higher study, entrance exams, and state recruitment avenues. |
| `/dashboard/resources` | Official Ecosystem Directory | Context-sensitive grouping of official portals (J&K Samarth, JKBOSE, JKPSC). |
| `/dashboard/compare` | Side-by-Side Pathway Comparison | Renders curriculum, statutory eligibility, and skill route trade-offs for two selected fields. |
| `/dashboard/nextstep` | Destination Handoff | Direct action routing to `jkadmissions.samarth.ac.in`. |
| `/dashboard/mentor` | Grounded AI Assistant | Strictly grounded system prompt; fails safely on unverified queries. |

---

## 5. Profile → Exploration Logic

* **Class 10 Branch:** Prompts student to explore Science, Commerce, and Arts subject breakdowns. Directs to `/dashboard/streams`.
* **Class 12 Branch:** Collects soft behavioral preferences (subject curiosity, activity preference, problem-solving style, environment preference, aversion, and uncertainty). Directs to `/dashboard/directions`.

---

## 6. Qualification Logic (Hard vs. Soft Signals)

* **Hard Constraints (Stream Requirements):** Hard-coded statutory eligibility rules (e.g. PCM required for Engineering; PCB for Biology/Biotechnology). Unqualified programs are strictly excluded regardless of soft survey responses.
* **Soft Signals (Survey Preferences):** Rank qualified options based on student interest. Soft signals can **never** make an academically unqualified course eligible.
* **Uncertainty Handling:** Selecting *"I don't know yet"* or *"Neutral"* preserves all qualified options without assigning artificial numerical fit scores.

---

## 7. Course Logic

Every course entity in `src/data/jk-directions.ts` is bound to:
1. `description`: High-level explanation of the discipline.
2. `whatYouWillStudy`: Core curriculum modules.
3. `eligibility`: Sourced statutory minimum application requirements under University of Jammu / Kashmir statutes.
4. `skillAlternative`: Side-by-side trade-off block with ITI/NSQF vocational skill pathways.
5. `collegeKeys`: Explicit list of verified GDCs offering the program.
6. `source`: Primary authoritative source URL.

---

## 8. College Logic

Colleges (`src/data/jk-colleges.ts`) are rendered **only** when:
- `college.verificationStatus === "verified"`
- `college.programs.includes(courseKey)`
- Primary source metadata is complete (`gdckathua.in`, `gdcakhnoor.com`).

---

## 9. Future Pathway Logic

Outcomes (`outcomes`) are course-specific and categorized into:
- `higher-study` (M.Sc, MCA, M.Com, M.A., B.Ed)
- `exam` (CUET-PG, GAT-B, CAT, CMAT)
- `public-service` (JKPSC CCE, JKSSB)

All outcome labels use possibility framing (*"may lead toward"*, *"possible pathway"*).

---

## 10. Degree vs. Skill Context

CareerNova provides a side-by-side comparison between 4-year academic degree pathways (FYUGP) and short practical vocational skill options (ITI / NSQF Level 4/5 certificates from J&K DSD / JKSSDM). Neither route is promoted as universally superior; comparison focuses on analytical depth vs. rapid technical job readiness.

---

## 11. Resource Logic

The resource directory (`src/data/jk-resources.ts`) groups official government portals by domain context:
- `admission`: J&K Samarth Admission Portal
- `board`: JKBOSE School Education
- `university`: University of Jammu & University of Kashmir
- `scholarship`: AICTE PMSSS J&K Scheme
- `recruitment`: JKPSC & JKSSB

---

## 12. Advisor Boundaries (`src/routes/dashboard.mentor.tsx`)

The AI mentor is strictly bounded by system prompt instructions:
- Answers **only** using verified J&K dataset context.
- Responds *"I don't have verified information for that yet. Please check the official source"* when queries fall outside verified data.
- Never fabricates cutoffs, salaries, placement rates, or guaranteed admissions.

---

## 13. Data Verification Rules

1. Every student-visible claim must cite an official government or university portal.
2. Minimum application eligibility (45% Open / 40% Reserved) must be explicitly distinguished from merit-based seat allocation cutoffs.
3. Unverified data must remain unrendered or explicitly marked as unverified.

---

## 14. E2E Golden Student Scenarios Validation

All 14 Golden Student Scenarios were tested and validated:
1. **Scenario 1 (Class 10 Isolation):** Isolated to `/dashboard/streams`. Zero UG/college leakage.
2. **Scenario 2 (Class 12 PCM):** Technical/science options correctly filtered.
3. **Scenario 3 (Class 12 PCB):** Biological options displayed; PCM-only programs excluded.
4. **Scenario 4 (Class 12 Commerce):** B.Com and BBA rendered with verified GDCs.
5. **Scenario 5 (Class 12 Arts):** Humanities options displayed with JKPSC/JKSSB pathways.
6. **Scenario 6 (Commerce + Tech Curiosity):** BCA presented with ITI Software Developer skill alternative without declaring coding mandatory.
7. **Scenario 7 ("I Don't Know"):** Uncertainty preserves all qualified options neutrally.
8. **Scenario 8 (Stream Change):** Stream change purges stale assessment weights.
9. **Scenario 9 (Class Change):** Class 12 → Class 10 purges UG state and redirects to streams.
10. **Scenario 10 (Invalid Course Key):** Renders safe empty fallback state.
11. **Scenario 11 (Unverified College):** Filtered out from college directory.
12. **Scenario 12 (Missing Outcome):** Honest empty state displayed.
13. **Scenario 13 (Browser Refresh):** State restored cleanly from `localStorage`.
14. **Scenario 14 (Direct URL Loading):** Direct navigation to `/dashboard/directions/commerce-management` renders full course detail cards.

---

## 15. Actual Test Results

* **Total Scenarios Tested:** 14 Scenarios.
* **Live Execution Method:** Browser Subagent (`browser_subagent`).
* **Pass Rate:** 100% (14 / 14 PASS).

---

## 16. Remaining Blockers

* **None.** Core logic, routing, qualification safety, and state persistence are verified and stable.

---

## 17. What Was Intentionally Left for UI Polish Phase

* Visual polish, background glassmorphism tuning, card padding micro-adjustments, and hover transition enhancements were intentionally deferred to the subsequent UI Polish Phase per strict instruction.

---

## Final Status

### **`CORE LOGIC VERIFIED — READY FOR UI POLISH`**
