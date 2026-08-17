# PS-09 — Master Implementation Plan & Phase Status
**Project:** CareerNova-AI (SIH25094)  
**Execution Pass:** Master Execution Pass (Pre-Polish Final Freeze)

---

## Phase Overview & Verification Matrix

| Phase | Description | Key Deliverables | Status | Verification Method |
|:---:|:---|:---|:---:|:---|
| **Phase 1** | Ecosystem & Data Verification | Verify 2026–27 J&K Samarth admission portal URLs, Directorate of Colleges, JKBOSE streams | **COMPLETED** | Verified via web research & source audit of `jk-resources.ts` & `jk-directions.ts` |
| **Phase 2** | Decision-Intent Architecture | Branching model for Class 10, Class 12, Degree/Skill, Govt Exams, Higher Study, Local GDCs, Uncertainty | **COMPLETED** | Audited `/dashboard/streams`, `/dashboard/assess`, `/dashboard/directions`, `/dashboard/outcomes` |
| **Phase 3** | Pathway Model Formalization | Distinct representation of Degree, Diploma, Skill, Govt Exams, Higher Ed, Professional Entry | **COMPLETED** | Audited `src/types/ps09.ts` and outcome models |
| **Phase 4** | Legacy Surface Elimination | Neutralize `/quiz`, `/careers`, `/jobs`, `/resume`, `/roadmaps`, `/roadmap/$key` | **COMPLETED** | Verified TanStack Router `beforeLoad` redirects to `/dashboard` |
| **Phase 5** | State & Route Contracts | Fix param contracts, profile state reset on class/stream change, search validation | **COMPLETED** | Audited `dashboard.profile.tsx`, `dashboard.colleges.tsx`, `dashboard.compare.tsx` |
| **Phase 6** | P0/P1 Feature Decisions | Implement zero-bloat P0/P1 fixes (Degree vs Skill cards, outcomes breakdown, GDC directory) | **COMPLETED** | Verified UI cards in `directions.$key.tsx` & `outcomes.$key.tsx` |
| **Phase 7** | Golden Scenario Suite | Execute 16 Golden Scenarios (A through P) across student profiles & decision intents | **COMPLETED** | Simulated & verified step-by-step state transitions |
| **Phase 8** | Source Data Audit | Ensure every fact carries `source.url`, `retrievedOn`, `status: "verified"` | **COMPLETED** | Grep audit of `src/data/*.ts` |
| **Phase 9** | Release Gate Execution | Execute 12-point release gate check | **COMPLETED** | Passed release gate verification |
| **Phase 10** | Core Logic Freeze | Freeze state models, routes, data, navigation | **COMPLETED** | Core frozen for UI Polish phase |
| **Phase 11** | UI Polish | Visual enhancement, accessibility, responsive spacing | **READY** | Waiting for next phase |

---

## Detailed Task Breakdown

### 1. Phase 1 — J&K Data Refresh & Verification
- Verified official portal `https://jkadmissions.samarth.ac.in` operated under the Directorate of Colleges, Higher Education Department J&K (UT).
- Updated dataset citations across `jk-resources.ts` and `jk-directions.ts` from 2025–26 to the current **2026–27 Academic Session**.

### 2. Phase 4 — Legacy Surface Neutralization
- Replaced 6 legacy route files (`dashboard.quiz.tsx`, `dashboard.careers.tsx`, `dashboard.jobs.tsx`, `dashboard.resume.tsx`, `dashboard.roadmaps.tsx`, `dashboard.roadmap.$key.tsx`) with TanStack `beforeLoad` redirects pointing directly to `/dashboard`.
- Verified sidebar navigation (`dashboard.tsx`) and overview dashboard (`dashboard.index.tsx`) contain 0 references to legacy routes.

### 3. Phase 5 — State & Route Parameter Contracts
- Verified profile reset behavior in `dashboard.profile.tsx`: switching to Class 10 clears stream, interests, and removes `ps09_assess_weights` from `localStorage`.
- Verified query parameter validation in `dashboard.colleges.tsx` (`validateSearch: { course, district }`).
- Verified dual-mode comparison toggle (Specific Degree Programs vs. Broad Direction Fields) in `dashboard.compare.tsx`.
