# CareerNova V1 — Final Logic Freeze Audit
**SIH25094 | Last Gate Before UI/UX Polish**
**Date:** 2026-08-16 | **Audit Only — No Code Modified**

---

## 1. Final Product Contract

CareerNova is a J&K-focused education decision-support system. Its job is to move a confused student from CONFUSION → UNDERSTANDING → REALISTIC OPTIONS → NEXT DECISION. It is not a career predictor, personality test, government portal replacement, or job board. Every claim must be source-backed. Every route must reduce student uncertainty.

---

## 2. Final System Map

```
STUDENT
  ↓ enters class + stream + interests
PROFILE (/dashboard/profile)
  ↓ Class 10 → STREAMS (/dashboard/streams)
  ↓ Class 12 → ASSESS (/dashboard/assess)
  ↓ soft weights computed + stored
DIRECTIONS (/dashboard/directions/)
  ↓ hard stream filter → ranked qualified fields
COURSE DETAIL (/dashboard/directions/$key)
  ↓ curriculum, eligibility, degree vs skill
COLLEGES (/dashboard/colleges?course=X)
  ↓ verified GDC lookup by course key
OUTCOMES (/dashboard/outcomes/$key)
  ↓ course-specific verified pathways
COMPARE (/dashboard/compare)
  ↓ two directions side-by-side
RESOURCES (/dashboard/resources)
  ↓ contextual official portals
NEXT STEP (/dashboard/nextstep)
  ↓ official destination handoff
ADVISOR (/dashboard/mentor) — supporting only
```

---

## 3. Final Page Hierarchy

| Level | Purpose | Route |
|---|---|---|
| 1 | Student Situation | `/dashboard/profile` |
| 2a | Class 10 Exploration | `/dashboard/streams` |
| 2b | Class 12 Exploration | `/dashboard/assess` |
| 3 | Qualified Fields | `/dashboard/directions/` |
| 4 | Course Detail | `/dashboard/directions/$key` |
| 5 | Eligibility | Within Level 4 card |
| 6 | Local Institution | `/dashboard/colleges` |
| 7 | Future Pathways | `/dashboard/outcomes/$key` |
| 8 | Skill Alternative | Within Level 4 card |
| 9 | Official Resources | `/dashboard/resources` |
| 10 | Compare | `/dashboard/compare` |
| 11 | Next Decision | `/dashboard/nextstep` |
| Sup | Grounded Advisor | `/dashboard/mentor` |

**Status:** Hierarchy is correctly implemented.

---

## 4. Route Contracts

### `/dashboard/profile`
- **Input:** None required (first visit allowed)
- **Output:** `ps09_student_profile` in localStorage; navigates to `/streams` (Class 10) or `/assess` (Class 12)
- **Invalid:** Missing fields → form prevents submission
- **Stale:** Stream change purges `ps09_assess_weights` ✅
- **Class change:** Class 10 clears stream+interests+weights ✅
- **Direct URL:** Safe — renders profile form with defaults

### `/dashboard/streams`
- **Input:** `ps09_student_profile` with `class === "Class 10"`
- **Guard:** If Class 12 profile → redirects to `/dashboard/directions` ✅
- **Guard:** If no profile → redirects to `/dashboard/profile` ✅
- **Output:** Stream awareness; no state change; links to JKBOSE
- **UG Leakage:** Zero — no degree/college cards rendered ✅

### `/dashboard/assess`
- **Input:** Class 12 profile in localStorage
- **Guard:** Class 10 profile → redirects to `/dashboard/streams` ✅
- **Output:** `ps09_assess_weights` written to localStorage on complete
- **Uncertainty:** "I don't know" options set `uncertainty` weight → neutral ranking ✅

### `/dashboard/directions/` (index)
- **Input:** Reads `ps09_student_profile` + `ps09_assess_weights` from localStorage
- **Fallback default:** ⚠️ **LOGIC GAP FOUND** — If no localStorage profile exists, a hardcoded default (`Class 12 / Science (PCM) / Computer Science`) is applied silently. A student who navigates here directly without completing profile will see PCM-filtered results without any indication the results are based on a default, not their actual profile.
- **Hard filter:** `matchDirections()` enforces stream gating ✅
- **Class 10 guard:** `matchDirections()` returns `[]` for Class 10 ✅
- **Empty state:** "No verified directions match" + "Adjust Qualification" button ✅

### `/dashboard/directions/$key`
- **Input:** URL param `$key` = direction key
- **Route structure:** `dashboard.directions.tsx` renders `<Outlet />` only — no content of its own ✅ (previously broken, now fixed)
- **Invalid key:** Safe "Information Coming Soon" fallback ✅
- **Output:** 5-layer clarity block: title, curriculum, eligibility, degree vs skill, GDC links

### `/dashboard/colleges`
- **Input:** `?course=` search param (optional); defaults to `bsc-computer-application`
- **Filter:** `getCollegesForCourse()` requires `verificationStatus === "verified"` + source verified ✅
- **District dropdown:** ⚠️ **LOGIC GAP FOUND** — Lists "Baramulla (Kashmir)" and "Anantnag (Kashmir)" as selectable districts but no verified colleges exist for those districts. Selecting them produces an honest empty state, but the presence of Kashmir districts in the dropdown implies coverage that doesn't exist yet. This is a misleading affordance.
- **Empty state:** Renders honest "no verified colleges" notice ✅

### `/dashboard/outcomes/$key`
- **Input:** URL param `$key` — tries course key first, then direction key
- **Course-specific:** `getCourseByKey(key)` evaluated before direction fallback ✅
- **Verified filter:** Only `verificationStatus === "verified"` outcomes shown ✅
- **Empty state:** "Outcome Information Coming Soon" with next action buttons ✅

### `/dashboard/nextstep`
- **Input:** None — reads no profile state
- **⚠️ LOGIC GAP FOUND:** Always displays same 4 portals (J&K Samarth, JU, KU, JKBOPEE) regardless of student class, stream, or selected course. A Class 10 student sees JKBOPEE (professional entrance counselling) which is irrelevant. A student who went through the Arts pathway gets the same list as a PCM student. The "next step" is not contextual.
- **Mitigation:** The portals shown are real and useful for Class 12 GDC students; the JKBOPEE entry is the main irrelevant one for most users.

### `/dashboard/compare`
- **Input:** Direction key selections via local state dropdowns
- **Output:** Side-by-side direction comparison with curriculum, eligibility, skill alternatives
- **Stale state:** Uses local component state (dropdowns), not persisted — ✅ no contamination risk
- **Same selection twice:** Both columns render same direction — not ideal UX but not a logic error

### `/dashboard/resources`
- **Input:** None (static registry render)
- **Categorized:** JKBOSE / Samarth / Universities / Scholarships / Recruitment ✅
- **Context sensitivity:** Page does not filter resources by student class/stream — minor gap

### `/dashboard/mentor`
- **System prompt:** Grounded to verified dataset only ✅
- **Fallback:** "I don't have verified information for that yet" ✅
- **Uses stale profile?:** Reads no profile — sends `verifiedContext` built at module level from static data ✅

---

## 5. State Contracts

| State Key | Storage | Written By | Invalidated By | Default When Missing |
|---|---|---|---|---|
| `ps09_student_profile` | localStorage | `/dashboard/profile` on save | Never auto-cleared | Hardcoded default in directions index ⚠️ |
| `ps09_assess_weights` | localStorage | `/dashboard/assess` on complete | Stream change, class change | `{}` empty weights |

**No other persisted state exists.** Course selection, comparison selections, and college filters are local component state (not persisted) — this is correct; they should not survive navigation.

---

## 6. Profile Logic

- Class selector → `handleClassChange()` → clears incompatible state ✅
- Stream selector → `onValueChange` → clears `ps09_assess_weights` ✅
- Save → `localStorage.setItem` → navigate to correct branch ✅
- No interests are required; empty interests array is valid ✅

---

## 7. Class 10 Logic

- `isClass10Profile()` is the single authoritative guard — used in `matchDirections()`, `dashboard.streams.tsx`, and `dashboard.assess.tsx` ✅
- Zero UG direction matches for Class 10 (`matchDirections` returns `[]`) ✅
- `ugPathExamples` in streams data are labeled "illustrative examples, not guarantees" ✅
- JKBOSE link prominently placed ✅
- Next Step page shown to Class 10 students shows JKBOPEE ⚠️ (irrelevant for Class 10)

---

## 8. Class 12 Logic

- Stream hard-filter enforced in `matchDirections()` via `streamRequirements` ✅
- Soft signals rank but cannot override qualification ✅
- Uncertainty handling: high uncertainty score → explanation says "here are eligible options based on your stream" ✅

---

## 9. Exploration Logic

7 questions covering: Activities, Subjects, Ways of Working, Curiosity, Environment, Aversion, Decision Stage.

**Distinction checks:**
- Technology vs programming: Q1 option says "writing software" — conflates technology curiosity with programming. A student curious about computers but uncertain about coding might pick this option and get a higher computing weight. ⚠️ **MINOR LOGIC GAP** — The distinction between "interest in technology" and "willingness to code" is partially collapsed in Q1/Q3/Q4 options.
- Business vs accounting: Q2 includes "Accountancy" and "Business Studies" in same option. Student can pick "Accountancy, Business Studies..." and this raises `commerce-management` weight but also `financial` sub-weight, which then applies an aversion penalty if Q6 aversion_financial is also selected. This is self-correcting. ✅
- "I don't know" preserved as `uncertainty` weight → neutral results ✅
- Aversion: reduces ranking score (penalty), does not eliminate qualified direction ✅

---

## 10. Qualification Logic

- Hard constraints (class, stream) applied in `matchDirections()` BEFORE soft signals ✅
- Soft signals multiply by 1.5 at most; cannot override hard constraint ✅
- BCA for Commerce: Commerce is in `streamRequirements` for `commerce-management` direction which includes BCA. This is the course-level note — BCA at GDC Kathua has an eligibility string specifying "Mathematics / Computer Science / IT as subject." However, the stream-level hard filter only checks `Commerce` (valid), and the subject-level requirement (Maths/CS in 10+2) is expressed only in the eligibility string on the course card, not enforced computationally. ⚠️ **STRUCTURAL LIMITATION** — The data model cannot currently enforce subject-combination eligibility at the hard-filter level, only communicate it via the eligibility text string.

---

## 11. Course Logic

Each course has: `key`, `label`, `directionKey`, `description`, `whatYouWillStudy`, `eligibility`, `relatedExams`, `outcomes`, `collegeKeys`, `skillAlternative`, `source`, `verificationStatus`.

All 7 courses have complete data. No manufactured data found. ✅

---

## 12. Eligibility Logic

- Eligibility modeled per-programme per-institution per-session ✅
- 45% (Open) / 40% (Reserved) cited as statutory minimum application threshold under JU 2025-26 statutes ✅
- Disclaimer on card: distinguishes minimum eligibility from merit cutoff ✅
- Historical session (2025-26) explicitly labeled ✅
- No current 2026-27 admission cycle data claimed ✅

---

## 13. College Logic

- `getCollegesForCourse()` requires 4-part verification (programs[], verified status, source verified, source URL + date) ✅
- GDC Kathua (verified, 7 programs) and GDC Akhnoor (verified, 4 programs) ✅
- GDC Sopore + GDC Anantnag: `verificationStatus: "unverified"`, `programs: []` — will never appear in student results ✅
- **District filter gap:** Kashmir districts appear in dropdown UI but have no verified data → honest empty state rendered, but dropdown implies coverage ⚠️

---

## 14. Outcome Logic

- `getCourseByKey()` checked before `getDirectionByKey()` in outcomes route ✅
- `/dashboard/outcomes/bcom` → B.Com-specific outcomes only ✅
- `/dashboard/outcomes/bca` → BCA-specific (MCA, M.Sc IT, CUET-PG SCQP09) ✅
- Verified filter: only `verificationStatus === "verified"` outcomes shown ✅
- Wording: "Possible pathway", "may lead toward" — not "guaranteed" ✅

---

## 15. Degree/Skill Logic

- `skillAlternative` present for all 7 courses ✅
- Each cites official J&K DSD or JKSSDM source ✅
- No claim that skill = quick job or degree = better long-term ✅
- Purpose field explicitly states trade-off differences ✅

---

## 16. Compare Logic

- Direction-level comparison using local state (no stale persistence risk) ✅
- Shows curriculum, eligibility, skill alternatives side-by-side ✅
- Same direction selected twice: renders same card twice — not a data error, minor UX issue

---

## 17. Resource Logic

- Resources categorized: admission, board, university, scholarship, professional, recruitment ✅
- Each resource has title, URL, category, purpose ✅
- Page does not filter by student class/stream — a Class 10 student sees JKBOPEE ⚠️

---

## 18. Next Step Logic

**⚠️ REAL LOGIC PROBLEM — NOT CONTEXTUAL**

`/dashboard/nextstep` always shows the same 4 portals regardless of student journey:
1. J&K Samarth — relevant for Class 12 GDC UG admission ✅
2. University of Jammu — relevant for Class 12 ✅
3. University of Kashmir — relevant for Class 12 ✅
4. JKBOPEE — relevant only for professional programme students; irrelevant for most Class 12 GDC students; completely irrelevant for Class 10 students

**Impact:** Low for core Commerce/PCM/PCB/Arts GDC journeys (JKBOPEE is harmless extra info). Higher for Class 10 students who should not see professional counselling as a "next step."

---

## 19. Advisor Logic

- Grounded system prompt restricts to verified dataset ✅
- Offline fallback message present ✅
- Never fabricates data ✅
- `verifiedContext` is built statically at module load from `directions` + `officialResources` ✅
- Does not read current student profile — gives general verified information ✅ (acceptable for advisory role)

---

## 20. Error/Empty Logic

| Scenario | Behavior | Status |
|---|---|---|
| Invalid direction key | "Information Coming Soon" + Back button | ✅ |
| No verified colleges for course | "No verified colleges found" notice | ✅ |
| No outcomes for course | "Outcome Information Coming Soon" notice | ✅ |
| No profile in localStorage | Directions index uses hardcoded default | ⚠️ |
| Class 10 on assess | Redirect to streams | ✅ |
| Class 12 on streams | Redirect to directions | ✅ |
| No profile on streams | Redirect to profile | ✅ |
| Corrupted localStorage JSON | `try/catch` silently uses default | ⚠️ Minor |
| Advisor API failure | "Operating in offline mode" message | ✅ |

---

## 21. Persistence Logic

- `ps09_student_profile`: survives reload ✅
- `ps09_assess_weights`: survives reload ✅
- Course/college/comparison selections: local component state, reset on navigation ✅ (intentional)
- Corrupted JSON: caught silently, falls back to hardcoded default ⚠️

---

## 22. Browser History Logic

- TanStack Router handles history correctly ✅
- Back from `/dashboard/colleges` → `/dashboard/directions/$key` restores direction detail ✅
- State stored in localStorage (not URL params) survives back/forward ✅
- No "Course A UI with Course B state" scenario possible since course display reads from URL param + data, not from persisted selection ✅

---

## 23. Auth Logic

- Auth uses Supabase; fallback demo user `student@jk.gov.in` applied if auth is unconfigured ✅
- Protected routes accessible without auth in fallback mode — acceptable for demo context
- Sign-out navigates to `/` ✅
- Advisor uses auth user info only for display; not for data restriction ✅

---

## 24. Offline/Failure Logic

- Deterministic local data (directions, colleges, outcomes, resources) always available regardless of network ✅
- Advisor API failure handled with fallback message ✅
- No external data fetches for core navigation flow ✅

---

## 25. Session/Freshness Logic

- All eligibility data explicitly cited as 2025-26 academic session ✅
- Labeled as "minimum statutory application requirement" not current cutoff ✅
- Current date August 16, 2026: no 2026-27 data exists in dataset; this is correctly acknowledged ✅
- No timeless facts for session-sensitive data ✅

---

## 26. J&K Coverage

| Coverage Area | Status |
|---|---|
| GDC Kathua (Jammu Division) | **VERIFIED** — 7 programs |
| GDC Akhnoor (Jammu Division) | **VERIFIED** — 4 programs |
| GDC Sopore (Kashmir Division) | **UNVERIFIED** — existence confirmed, programs not mapped |
| GDC Anantnag (Kashmir Division) | **UNVERIFIED** — existence confirmed, programs not mapped |
| Other GDCs | **NOT YET MAPPED** |

The product does not claim full J&K coverage. Unverified colleges never appear in student results. **Kashmir district options in the dropdown UI are a misleading affordance.** ⚠️

---

## 27. Student Benefit Analysis

| Feature | Before CareerNova | After CareerNova | Verdict |
|---|---|---|---|
| Profile | No structured starting point | Class/stream captured; correct branch activated | **SOLVES** |
| Class 10 Streams | No structured stream overview | Science/Commerce/Arts explained with subjects + JKBOSE | **SOLVES** |
| Assessment | No preference discovery | 7-question soft signal collection; uncertainty preserved | **SOLVES** |
| Directions | No qualified field filtering | Stream-gated ranked fields | **SOLVES** |
| Course Detail | No curriculum context | Curriculum modules + statutory eligibility + degree vs skill | **SOLVES** |
| Colleges | No local GDC discovery | Verified GDC lookup by course | **SOLVES** |
| Outcomes | No pathway context | Course-specific verified PG/exam pathways | **SOLVES** |
| Degree vs Skill | No comparison context | Side-by-side neutral comparison with sourced ITI alternatives | **SOLVES** |
| Resources | Generic portals | Categorized contextual official portals | **PARTIALLY SOLVES** (not filtered by stage) |
| Next Step | No official handoff | Official portal links | **PARTIALLY SOLVES** (not contextual by profile) |
| Advisor | No guided Q&A | Grounded dataset-bounded Q&A | **SOLVES within boundaries** |

---

## 28. Golden Scenario Matrix

| Scenario | Profile | Flow | Expected | Status | Evidence |
|---|---|---|---|---|---|
| A. Class 10 undecided | Class 10 | Profile → Streams | Stream discovery; zero UG leakage | ✅ PASS | Guard in streams.tsx + matchDirections returns [] |
| B. Class 12 PCM technical | Class 12 PCM | → Assess → Directions → Sciences | B.Sc Computer Application, Sciences visible | ✅ PASS | streamRequirements includes PCM |
| C. Class 12 PCB biology | Class 12 PCB | → Assess → Directions → Sciences | Biotechnology, Botany visible; PCM-only excluded | ✅ PASS | PCB in streamRequirements |
| D. Class 12 Commerce business | Class 12 Commerce | → Assess → Directions → Commerce | B.Com, BBA visible with GDC data | ✅ PASS | Commerce in streamRequirements |
| E. Class 12 Arts | Class 12 Arts | → Assess → Directions → Arts | B.A. Humanities visible; JKPSC pathways | ✅ PASS | Arts in streamRequirements |
| F. Commerce + tech curiosity | Class 12 Commerce | → BCA card | Coding uncertainty acknowledged; BCA eligibility string shows Maths/CS req | ✅ PASS (with structural limitation noted) | eligibility string on BCA card |
| G. "I don't know" | Class 12 any | All uncertainty options | All qualified directions shown; exploration framing | ✅ PASS | uncertainty ≥ 2 triggers neutral explanation |
| H. Stream change | Class 12 Commerce → PCM | Re-assess | Old weights cleared; PCM results | ✅ PASS | removeItem in profile.tsx |
| I. Class change | Class 12 → Class 10 | Profile update | UG state cleared; streams route | ✅ PASS | handleClassChange clears stream+interests+weights |
| J. Invalid course | /dashboard/directions/xyz | Direct URL | Safe fallback | ✅ PASS | direction not found → fallback UI |
| K. Unverified college | Any course select | Colleges page | Unverified colleges never shown | ✅ PASS | getCollegesForCourse verification gate |
| L. Missing outcome | Course with no outcomes | /dashboard/outcomes/$key | Honest empty state | ✅ PASS | outcomes.length === 0 branch |
| M. Refresh at directions | After assess | Browser refresh | Weights restored from localStorage | ✅ PASS | useEffect reads localStorage |
| N. Direct URL course | /dashboard/directions/bca | No prior navigation | Course detail renders safely | ✅ PASS | no profile dependency in detail page |

---

## 29. Functionally Works vs Logically Correct vs Solves Problem

| Page | Functionally Works | Logically Correct | Solves Student Problem |
|---|---|---|---|
| Profile | ✅ | ✅ | ✅ |
| Streams (Class 10) | ✅ | ✅ | ✅ |
| Assess | ✅ | ✅ with minor gap (tech≠coding) | ✅ |
| Directions Index | ✅ | ⚠️ silent default profile | ✅ for students who completed profile |
| Course Detail | ✅ | ✅ | ✅ |
| Colleges | ✅ | ⚠️ Kashmir districts misleading | ✅ for available data |
| Outcomes | ✅ | ✅ | ✅ |
| Compare | ✅ | ✅ | ✅ |
| Resources | ✅ | ⚠️ not filtered by stage | PARTIALLY |
| Next Step | ✅ | ⚠️ not contextual by profile | PARTIALLY |
| Advisor | ✅ | ✅ | ✅ within boundaries |

---

## 30. Missing Capabilities

None that are blocking the core PS-09 flow. The product successfully takes a confused student through the complete decision journey.

---

## 31. Necessary Additions (Justified Only)

### FIX 1 — Directions Index: Silent Default Profile (Priority: MEDIUM)
**Student problem:** A student who navigates to `/dashboard/directions` without completing profile sees Science PCM results without knowing results are based on a default, not their actual data.
**Why current system fails:** Hardcoded default in `DirectionsIndexPage` useEffect.
**Fix:** Redirect to `/dashboard/profile` with a clear message if no valid profile exists, rather than silently applying a default.
**Official data required:** None.
**Integration:** Single guard check in `DirectionsIndexPage` useEffect.
**V1 scope:** YES — this is a state integrity issue.

### FIX 2 — Next Step: Context by Educational Stage (Priority: LOW-MEDIUM)
**Student problem:** Class 10 student sees JKBOPEE (professional entrance counselling) as a "next step" — irrelevant and potentially confusing.
**Why current system fails:** No profile read in `NextStepPage`.
**Fix:** Read `ps09_student_profile` from localStorage; if Class 10 → show JKBOSE as primary; if Class 12 → show Samarth + JU/KU as primary; show JKBOPEE only as secondary/contextual.
**Official data required:** None — all portals already exist.
**Integration:** Simple profile read + conditional render.
**V1 scope:** YES — improves decision quality for Class 10 users.

### FIX 3 — Colleges District Dropdown: Remove Unverified Kashmir Districts (Priority: LOW)
**Student problem:** Selecting "Baramulla (Kashmir)" or "Anantnag (Kashmir)" implies coverage exists, produces empty state.
**Why current system fails:** Districts in dropdown are not gated by verified data availability.
**Fix:** Remove Kashmir districts from dropdown until verified college data is available. Optionally add a note: "Kashmir Division coverage coming soon."
**V1 scope:** YES — honesty over false affordance.

---

## 32. Unnecessary / Avoidable Features

None present in the codebase. No job boards, resumes, generic AI, or India-wide features found.

---

## 33. Immutable Contracts For UI Phase

The following MUST NOT be changed during UI/UX polish:

**Route paths:**
- `/dashboard/profile`, `/dashboard/streams`, `/dashboard/assess`, `/dashboard/directions`, `/dashboard/directions/$key`, `/dashboard/colleges`, `/dashboard/outcomes/$key`, `/dashboard/resources`, `/dashboard/compare`, `/dashboard/nextstep`, `/dashboard/mentor`

**localStorage keys:**
- `ps09_student_profile`
- `ps09_assess_weights`

**Data keys (direction/course/college):**
- `sciences`, `commerce-management`, `arts-humanities`
- `bsc-computer-application`, `bsc-biotechnology`, `bsc-botany-chemistry`, `bcom`, `bba`, `bca`, `ba-humanities`
- `gdc-kathua`, `gdc-akhnoor`

**Verification rules:**
- `verificationStatus === "verified"` gate on all student-visible data
- `source.status === "verified"` gate on college display

**Qualification logic:**
- `matchDirections()` hard stream filter must always apply before soft signals
- `isClass10Profile()` must remain the single class-branching authority
- Soft signals must never override hard qualification

**Course-outcome relationship:**
- `getCourseByKey()` must be checked before `getDirectionByKey()` in outcomes route

**State invalidation rules:**
- Stream change → clear `ps09_assess_weights`
- Class 10 change → clear stream + interests + `ps09_assess_weights`

**Advisor boundaries:**
- System prompt grounding must not be weakened
- Fallback message must remain for unsupported queries

---

---

## 34. Final Logic Freeze Audit — Resolution & Verification

### Implemented Fixes Summary:

1. **Fix 1 — Directions Index Silent Default Profile (`src/routes/dashboard.directions.index.tsx`):**
   - Removed fallback default `Class 12 / Science (PCM)` profile.
   - If `ps09_student_profile` is missing or corrupted, the page now safely redirects to `/dashboard/profile`.
   - If profile is `Class 10`, it redirects to `/dashboard/streams`.
   - Recommendations are strictly calculated for valid Class 12 profiles.

2. **Fix 2 — Contextual Next Step (`src/routes/dashboard.nextstep.tsx`):**
   - Implemented dynamic portal selection based on student profile stage.
   - **Class 10:** Displays **JKBOSE** as primary school education board resource and **NSP** for scholarships; excludes JKBOPEE as an immediate action.
   - **Class 12 General UG:** Displays **J&K Samarth Admission Portal** as primary, along with University of Jammu / Kashmir portals and PMSSS financial aid.
   - **Professional Context:** Includes **JKBOPEE Entrance Portal** when the student's profile stream/goal involves professional entry.

3. **Fix 3 — College District Dropdown (`src/routes/dashboard.colleges.tsx`):**
   - Dynamically filters the district dropdown to list only districts with verified college records (`Jammu`, `Kathua`).
   - Removed unverified district options (`Baramulla`, `Anantnag`) from the selectable list.
   - Added an explicit, non-interactive regional coverage note clarifying that Kashmir Division college mappings are being verified against official university records.

---

### Executed Validation Test Matrix:

| Test | Objective | Result |
|---|---|---|
| **TEST A** | No profile in localStorage → `/dashboard/directions` | **PASS** — Redirects directly to `/dashboard/profile` |
| **TEST B** | Corrupted profile JSON → `/dashboard/directions` | **PASS** — Redirects safely to `/dashboard/profile` |
| **TEST C** | Class 10 student → `/dashboard/nextstep` | **PASS** — Displays JKBOSE + NSP as primary; no JKBOPEE |
| **TEST D** | Class 12 general UG student → `/dashboard/nextstep` | **PASS** — Displays J&K Samarth as primary admission portal |
| **TEST E** | Professional program context → `/dashboard/nextstep` | **PASS** — Includes JKBOPEE entrance portal |
| **TEST F** | College district dropdown filter | **PASS** — Displays only verified districts (`Kathua`, `Jammu`) |
| **TEST G** | Verified college lookup for courses | **PASS** — GDC Kathua & GDC Akhnoor display correctly |
| **TEST H** | Unverified colleges isolation | **PASS** — GDC Sopore & GDC Anantnag remain hidden |
| **TEST I** | Class 10/12 state transitions | **PASS** — Purges stale weights; routes to correct branch |
| **TEST J** | Course → outcome relationship | **PASS** — `/outcomes/bca` renders BCA-specific pathways |

---

# **`CORE LOGIC VERIFIED — READY FOR UI POLISH`**

*All three logic freeze blockers have been resolved and verified. Business logic, state contracts, routing, and data integrity are frozen and ready for final visual UI polish.*

