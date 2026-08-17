# PS-09 — Lessons Learned & Engineering Playbook
**Project:** CareerNova-AI (SIH25094)  
**Date:** 2026-08-16

---

## 1. Discovered Architectural Gotchas & Root Causes

### A. Preserving Stale External Portal URLs Across Academic Sessions
- **Issue:** Previous document audits retained `https://jkadmissions.samarth.ac.in` from older 2025–26 references without cross-referencing current 2026–27 Directorate advisories.
- **Root Cause:** Trusting static documentation over live primary source verification.
- **Remediation & Rule:** Section 20 of the Master Execution Contract established that external primary sources MUST override older documentation. Reverified and updated the central UG admission portal destination to `https://jkadmissions.in` and Directorate of Colleges portal `https://directorcollegesjk.in`.

### B. Legacy Feature Bloat & Conflicting Identities
- **Issue:** Legacy developer-career tooling (ATS resume analyzers, Adzuna job boards, salary calculators, tech roadmaps) remained exposed via direct URLs.
- **Root Cause:** Reusing generic boilerplate templates without gating feature scope strictly to the problem statement.
- **Remediation & Rule:** All legacy routes were completely neutralized with TanStack `beforeLoad` redirects to `/dashboard`.

### C. State Leakage Across Academic Stages
- **Issue:** Class 10 students could reach Class 12 undergraduate degree pages.
- **Root Cause:** Global student profile stored class and stream without enforcing route guards based on `isClass10Profile(profile)`.
- **Remediation & Rule:** Implemented strict route guards across `/dashboard/streams`, `/dashboard/assess`, `/dashboard/directions`, `/dashboard/colleges`, `/dashboard/compare`. Class 10 profile updates automatically invalidate Class 12 stream and assess state.

---

## 2. Mandatory Engineering Playbook Rules

1. **Verify Primary Sources First:** Never introduce unverified LLM predictions or third-party salary claims. Every fact must carry `source.label`, `source.url`, and `verificationStatus: "verified"`.
2. **Session Date Integrity:** Admission portals update annually. Always tag portal citations with the active academic session (e.g. `J&K Centralised Higher Education Admission Portal 2026–27`).
3. **Test User Actions, Not Just Routes:** Test click transitions, back/forward history, browser refresh, state invalidation, and direct URL entry.
4. **Golden Scenario Suite:** Rerun all 20 Golden Scenarios (A through T) whenever routing, state, or data structures are modified.
