# PS-09 — Final Pre-Polish Logic, Routing & Student-Journey Release Audit
**Project:** CareerNova-AI (SIH25094) — One-Stop Personalized Career & Education Advisor (Jammu & Kashmir)  
**Audit Date:** August 16, 2026  
**Auditor:** Antigravity AI (Adversarial Logic Release Gate)

---

> [!IMPORTANT]
> **RELEASE GATE SUMMARY & FINAL VERDICT**
> 
> **FINAL VERDICT: CORE LOGIC VERIFIED — READY FOR UI POLISH**
> 
> All 15 Golden Student Scenarios, Class 10/12 workflow boundaries, hard qualification filters, dynamic college mappings, key propagation paths, and edge-case fallbacks have been rigorously audited and verified against the actual current codebase. Zero P0 or P1 logic bugs remain.

---

## 1. System Architecture & Route Hierarchy

CareerNova operates as a deterministic, non-predictive student decision-support application built on top of React, TanStack Router (flat-file routing pattern), and standard web persistence (`localStorage` & URL search parameters).

### Active Route Hierarchy
```
/ (Landing Page — Role Selection)
├── /dashboard (Layout Container + JourneyProgress Header)
│   ├── /dashboard/profile (Profile Initialization & Class 10/12 Branching)
│   ├── /dashboard/streams (Class 10 Exclusive Stream Exploration)
│   ├── /dashboard/assess (Class 12 Self-Exploration Assessment — 7 Questions)
│   ├── /dashboard/directions/ (Class 12 Directions Index List)
│   ├── /dashboard/directions/$key (Class 12 Direction & Course Detail View)
│   ├── /dashboard/outcomes/$key (Course & Direction Outcome Pathways)
│   ├── /dashboard/colleges (Verified J&K Government Degree College Finder)
│   ├── /dashboard/compare (Side-by-Side Education Pathway Comparator)
│   ├── /dashboard/resources (Official J&K Portal Registry)
│   ├── /dashboard/nextstep (Contextual Official Application Handoff)
│   └── /dashboard/mentor (Grounded AI Advisor with Verified J&K Context)
```

---

## 2. Entity & Key Relationship Map

| Source Entity | Output Key | Downstream Route Target | Parameter Type | Verification Rule |
| :--- | :--- | :--- | :--- | :--- |
| **Student Profile** | `class`, `stream` | `/dashboard/directions/` | Internal State | Class 10 → `/dashboard/streams` guard |
| **Direction** | `direction.key` (e.g. `sciences`) | `/dashboard/directions/$key` | Route Param `$key` | `verificationStatus === "verified"` |
| **Course** | `course.key` (e.g. `bca`) | `/dashboard/outcomes/$key` | Route Param `$key` | `verificationStatus === "verified"` |
| **Course** | `course.key` (e.g. `bca`) | `/dashboard/colleges?course=bca` | Search Param `?course` | `programs.includes(courseKey)` |
| **College** | `college.key` (e.g. `gdc-baramulla`) | External Official Link | Direct URL | `source.status === "verified"` |
| **Skill Alternative** | `skillAlternative` | Embedded in Course Card | Local Object | Sourced from J&K DSD / JKSSDM |

---

## 3. Workflow Audit Results

### A. Class 10 vs. Class 12 Isolation Guard Audit
- **Class 10 Journey:** Class 10 students explore broad stream faculties (Science, Commerce, Arts) as defined under the JKBOSE Scheme of Studies.
- **Strict Guarding:** The single authoritative guard function `isClass10Profile(profile)` in `src/lib/directions.ts` is enforced across **all** Class 12 routes:
  - `/dashboard/assess` → Redirects Class 10 to `/dashboard/streams`
  - `/dashboard/directions/` → Redirects Class 10 to `/dashboard/streams`
  - `/dashboard/directions/$key` → Redirects Class 10 to `/dashboard/streams`
  - `/dashboard/outcomes/$key` → Redirects Class 10 to `/dashboard/streams`
  - `/dashboard/colleges` → Redirects Class 10 to `/dashboard/streams`
  - `/dashboard/compare` → Redirects Class 10 to `/dashboard/streams`
- **Result:** Zero data leakage. Class 10 students cannot view undergraduate courses, GDC listings, or postgraduate entrance exams.

### B. Qualification vs. Preference Ranking Audit
- **Hard Qualification Filter:** Applied before any soft ranking score calculation.
  - Stream requirement matching checks student stream against statutory eligibility.
  - Example: A PCB student expressing interest in programming is shown `BCA` under `commerce-management` (which permits any 10+2 stream with 45%), while `bsc-computer-application` under `sciences` explicitly displays its statutory requirement of PCM/CS at 10+2.
- **Result:** Soft interest signals never bypass academic qualification constraints.

### C. Self-Exploration Assessment Audit
- **Non-Predictive Model:** Uses 7 behavioral curiosity and work-style questions.
- **Uncertainty & Aversion Handling:** Selecting *"I don't know yet"* sets `uncertainty: 2+`, bypassing preference weightings and ranking all qualified directions neutrally with an honest explanation: *"You haven't expressed a strong preference yet. Here are some areas you can explore based on your Class 12 stream..."*
- **State Pollution Prevention:** Changing stream or class in `/dashboard/profile` automatically purges `ps09_assess_weights` from `localStorage`.

### D. Downstream Context Preservation Audit
- **Course Selection Continuity:** Selecting a course (e.g. `bca` or `bsc-computer-application`) preserves that exact key in all downstream links:
  - *"Where This Can Lead"* links directly to `/dashboard/outcomes/bca`
  - *"View Colleges"* links directly to `/dashboard/colleges?course=bca`
- **Result:** No silent fallback to generic direction data when a specific course context is active.

### E. Kashmir & Jammu Division College Dataset Coverage
- **Verified GDCs:**
  1. `gdc-kathua` (Jammu Division) — Verified programs: B.Sc CS, B.Sc Biotech, B.Sc Bio/Chem, B.Com, BBA, BCA, B.A.
  2. `gdc-akhnoor` (Jammu Division) — Verified programs: B.Sc CS, B.Sc Bio/Chem, B.Com, B.A.
  3. `gdc-baramulla` (Kashmir Division, Autonomous) — Verified programs: B.Sc CS, B.Sc Biotech, B.Sc Bio/Chem, B.Com, BBA, BCA, B.A.
  4. `gdc-anantnag` (Kashmir Division, Boys) — Verified programs: B.Sc CS, B.Sc Bio/Chem, B.Com, BCA, B.A.
  5. `gdc-sopore` (Kashmir Division, Boys) — Verified programs: B.Sc Bio/Chem, B.Com, B.A.
- **Dynamic Presentation:** Removed legacy hardcoded text strings `(GDC Kathua, GDC Akhnoor)`. College availability strings dynamically reflect verified colleges across both divisions.

### F. Degree Route vs. Skill Alternative Trade-Off Module
- Every undergraduate program card presents a side-by-side trade-off comparison between:
  1. **4-Year Academic Degree Route (NEP-2020 FYUGP):** Broad theoretical & analytical foundation, qualifies for university Master's degrees (CUET-PG, MCA, M.Com, M.Sc) and competitive exams (JKPSC).
  2. **Short-Term Skill / Vocational Alternative (NSQF / ITI / JKSDM):** Practical job-oriented certificate/diploma focusing on immediate technician/support roles (e.g., Computer Hardware & Networking, Medical Lab Tech, Tally/GST Assistant, Retail Sales).
- Sourced directly from official J&K Skill Development Department (`https://jkdsd.in`) and JKSSDM (`https://jkdpm.jk.gov.in`).

---

## 4. Golden Student Scenarios Matrix

| Scenario | Description | Expected Outcome | Actual Result | Status |
| :---: | :--- | :--- | :--- | :---: |
| **A** | Confused Class 10 student | Navigates exclusively to `/dashboard/streams`. Blocked from UG/GDC pages. | Redirected to `/dashboard/streams` on all direct URL attempts. | **PASS** |
| **B** | Commerce student interested in tech | Shown BCA under `commerce-management`. B.Sc CS under PCM excluded. | `commerce-management` matched; PCM-only B.Sc CS filtered out. | **PASS** |
| **C** | Commerce student avoiding coding | B.Com & BBA ranked top; BCA available as option. | Soft ranking prioritizes B.Com/BBA. | **PASS** |
| **D** | PCM student interested in biology | `sciences` matched; B.Sc Bio statutory requirement displayed. | Qualified for `sciences`; statutory biology note shown. | **PASS** |
| **E** | PCB student interested in programming | Shown BCA as qualified; B.Sc CS statutory PCM requirement flagged. | BCA qualified under Commerce/IT; B.Sc CS PCM constraint clear. | **PASS** |
| **F** | Arts student exploring options | Qualified for Arts & Commerce faculties; shown B.A., B.Com, BBA. | Relevant UG programs displayed under verified directions. | **PASS** |
| **G** | High uncertainty ("I don't know") | Neutral ranking of all qualified paths with honest explanation. | Score neutral; explanation states open exploration mode. | **PASS** |
| **H** | Stream change after assessment | Changing stream clears stale assessment weights. | `ps09_assess_weights` removed from `localStorage`. | **PASS** |
| **I** | Class 12 → Class 10 profile edit | Immediately shifts journey to Class 10 stream exploration. | Route guard redirects to `/dashboard/streams`. | **PASS** |
| **J** | Direct URL to course detail | Renders course detail with official sources; empty fallback if invalid. | Valid course renders cleanly; invalid key renders clean fallback. | **PASS** |
| **K** | Course → Outcomes → Colleges | `bca` course key preserved across downstream navigation. | Links maintain `bca` parameter without falling back to all sciences. | **PASS** |
| **L** | Course + District college filter | Filter returns precise intersection (e.g., B.Com in Baramulla). | Returns GDC Baramulla & GDC Boys Sopore. | **PASS** |
| **M** | Page refresh at every stage | State re-hydrates identically from `localStorage` / URL params. | Identical state restored after F5 refresh. | **PASS** |
| **N** | Browser Back / Forward | History stack preserved without corrupted UI state. | TanStack Router navigates history correctly. | **PASS** |
| **O** | Access with no stored profile | Redirects immediately to `/dashboard/profile`. | Safely redirects to profile page without crash. | **PASS** |

---

## 5. Summary of Bugs Discovered & Fixes Applied

1. **P1 Bug — Class 10 Direct URL Access:**
   - *Issue:* Direct URL visits to `/dashboard/directions/$key`, `/dashboard/outcomes/$key`, `/dashboard/colleges`, and `/dashboard/compare` allowed Class 10 students to view UG degree recommendations and college lists.
   - *Fix:* Added `isClass10Profile` redirect guard to `useEffect` across all four routes.
2. **P2 Bug — Hardcoded College Label String:**
   - *Issue:* Pages displayed hardcoded string `(GDC Kathua, GDC Akhnoor)` even when displaying Kashmir Division colleges.
   - *Fix:* Replaced hardcoded text with dynamic calculation derived from verified college records (`jkColleges`).
3. **P2 Bug — Missing Stream Qualification Mapping for Commerce:**
   - *Issue:* `streamRequirements` for `commerce-management` omitted `Science (PCB)` from stream list.
   - *Fix:* Added `Science (PCB)` and `Science (PCMB)` to `commerce-management` stream requirements in `jk-directions.ts`.

---

## 6. Final Recommendation

The core decision system, routing guards, state cleanup logic, data integrity, and student outcome pathways are **100% frozen, source-backed, and verified**.

**CareerNova is officially READY FOR UI POLISH.**
