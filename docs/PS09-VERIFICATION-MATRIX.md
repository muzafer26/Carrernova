# PS-09 — Verification Matrix & Golden Scenario Regression Results
**Project:** CareerNova-AI (SIH25094)  
**Date:** 2026-08-16  
**Status:** ALL 20 GOLDEN SCENARIOS PASS

---

## 1. Golden Scenario Suite (A through T)

| Scenario ID | Student Persona / Scenario Description | Expected System Behavior | Actual Execution Result | Pass/Fail |
|:---:|:---|:---|:---|:---:|
| **Scenario A** | Class 10 completely uncertain | Directs to `/dashboard/streams`, presents 3 JKBOSE streams, reflection questions, school handoff notice | Navigates to `/dashboard/streams`. Shows Science, Commerce, Arts details & JKBOSE portal link. | **PASS** |
| **Scenario B** | Class 10 stream comparison | Expands stream detail cards in `/dashboard/streams` to compare Science, Commerce, and Arts | Shows subject areas, what each stream involves, and questions to consider before choosing. | **PASS** |
| **Scenario C** | Class 12 completely uncertain | Selects "I don't know" options in `/dashboard/assess`. System displays all qualified direction fields neutrally | `/dashboard/directions` lists all fields with "Worth Exploring" badges and open exploration explanations. | **PASS** |
| **Scenario D** | Commerce + technology curiosity | Selects Commerce stream & Computer Science interest. System highlights B.Com, BBA, and BCA (Commerce-qualified) | `/dashboard/directions` displays Commerce & Management field with BCA tagged as Commerce-eligible path. | **PASS** |
| **Scenario E** | Commerce + dislikes programming | Selects Commerce stream & Aversion: Programming. System highlights B.Com & BBA; de-emphasizes BCA | Recommends B.Com & BBA while noting math/coding requirements for BCA. | **PASS** |
| **Scenario F** | PCM + biology curiosity | Selects PCM stream & Biology interest. System presents B.Sc Biological & Chemical Sciences with math eligibility notes | Presents B.Sc Biological & Chemical Sciences with clear statutory eligibility breakdown. | **PASS** |
| **Scenario G** | PCB + technology curiosity | Selects PCB stream & Computer Science interest. System highlights B.Sc Computer Application & BCA (non-math eligible) | Presents B.Sc Computer Application & BCA options; excludes engineering requiring PCM. | **PASS** |
| **Scenario H** | Student comparing degree vs skill | Views course detail page (`/dashboard/directions/sciences`). System displays side-by-side Degree vs. Skill card | Displays Academic Degree Route vs. NSQF Vocational Alternative Route side-by-side with source links. | **PASS** |
| **Scenario I** | Student wanting diploma / vocational | Explores course trade-offs in `/dashboard/directions/sciences`. System shows NSQF Level 4/5 ITI certificates | Displays ITI Diploma in Hardware/Networking & MLT vocational certificates with `jkdsd.in` link. | **PASS** |
| **Scenario J** | Student wanting government career/exam | Explores course outcomes (`/dashboard/outcomes/bcom`). System details JKPSC CCE & JKSSB Graduate Level eligibility | Outlines JKPSC Gazetted Officer eligibility & JKSSB Non-Gazetted Accounts Assistant requirements. | **PASS** |
| **Scenario K** | Student wanting higher studies | Explores course outcomes (`/dashboard/outcomes/bsc-computer-application`). System details M.Sc, MCA, CUET-PG | Displays M.Sc Computer Science & MCA eligibility via NTA CUET-PG (SCQP09 paper). | **PASS** |
| **Scenario L** | Student looking for a nearby GDC | Visits `/dashboard/colleges?course=bca&district=Kathua`. System filters verified GDCs in Kathua district | Returns GDC Kathua with verified course listings and official website URL (`gdckathua.in`). | **PASS** |
| **Scenario M** | Student knows program but not college | Navigates from course detail to college list via "View Colleges" CTA | `/dashboard/colleges` opens pre-filtered to selected course. | **PASS** |
| **Scenario N** | Student changes stream | Edits profile stream from PCM to Commerce in `/dashboard/profile`. System invalidates downstream assess weights | `localStorage.removeItem("ps09_assess_weights")` triggered. Navigation re-evaluates directions correctly. | **PASS** |
| **Scenario O** | Student changes Class | Switches profile from Class 12 to Class 10 in `/dashboard/profile`. System clears stream and redirects to `/dashboard/streams` | Profile stream reset to `""`, interests reset to `[]`, redirected directly to `/dashboard/streams`. | **PASS** |
| **Scenario P** | "I don't know" mode | Selects "I don't know" on all 7 questions in `/dashboard/assess`. System enters Open Exploration mode | `uncertainty` weight set. Shows all qualified fields with broad exploration guidance. | **PASS** |
| **Scenario Q** | Direct deep-link access | Directly opens `/dashboard/outcomes/bca` via address bar | Page resolves course `bca`, loads outcomes, statutory eligibility, and official resources cleanly. | **PASS** |
| **Scenario R** | Refresh at each stage | Refreshes browser on `/dashboard/compare` or `/dashboard/directions/sciences` | Profile loaded from `localStorage`. Route re-renders cleanly without lost state or white screen. | **PASS** |
| **Scenario S** | Browser back/forward navigation | Navigates Profile → Assess → Directions → Course → Colleges and clicks Browser Back | Browser back button restores previous state smoothly via TanStack Router state management. | **PASS** |
| **Scenario T** | Invalid/corrupted profile state | Launches application with invalid JSON in `ps09_student_profile` | System catches error, resets profile to safe default, and redirects to `/dashboard/profile`. | **PASS** |

---

## 2. Source-Backed Data Integrity Verification

| Data Check | Verification Rule | Actual Sourced Outcome | Result |
|:---|:---|:---|:---:|
| **Central UG Admission Portal** | Must cite official 2026–27 Centralised Admission Portal | Updated to `https://jkadmissions.in` (Directorate of Colleges J&K UT) | **PASS** |
| **College Directory Authority** | Must cite official Directorate of Colleges Public Directory | Linked `https://directorcollegesjk.in/authusers/CourseListPublic.aspx` | **PASS** |
| **College Program Mapping** | Every college program key must map to a valid course key | 100% foreign key integrity across `jkColleges` & `directions` | **PASS** |
| **Verification Metadata** | Every student-visible record must have `source.url` & `retrievedOn` | 100% of records carry verified metadata | **PASS** |
