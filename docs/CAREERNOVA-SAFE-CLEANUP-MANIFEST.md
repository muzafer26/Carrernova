# CAREERNOVA — SAFE CLEANUP MANIFEST
## SIH25094 | Repository Cleanup & Dependency Tracking

**Audit Date:** August 17, 2026  

---

## 1. CLEANUP CANDIDATE MATRIX

| Item Name | Type | Used By | Dependency Status | Flow Impact | Decision | Evidence |
|---|---|---|---|---|---|---|
| `src/routes/dashboard.quiz.tsx` | Route File | Legacy quiz redirect | Non-breaking redirect | Zero flow disruption | **LEGACY — REDIRECT / PRESERVE** | Preserved for backwards compat |
| `src/routes/dashboard.careers.tsx` | Route File | Legacy careers route | Non-breaking redirect | Zero flow disruption | **LEGACY — REDIRECT / PRESERVE** | Preserved for backwards compat |
| `src/routes/dashboard.jobs.tsx` | Route File | Legacy jobs route | Non-breaking redirect | Zero flow disruption | **LEGACY — REDIRECT / PRESERVE** | Preserved for backwards compat |
| `src/routes/dashboard.resume.tsx` | Route File | Legacy resume route | Non-breaking redirect | Zero flow disruption | **LEGACY — REDIRECT / PRESERVE** | Preserved for backwards compat |
| `src/routes/dashboard.roadmaps.tsx` | Route File | Legacy roadmaps route | Non-breaking redirect | Zero flow disruption | **LEGACY — REDIRECT / PRESERVE** | Preserved for backwards compat |
| `ScholarSync-main` | External Dir | Standalone repo | Independent | Zero impact on CareerNova | **NO DEPENDENCY (KEEP SEPARATE)** | 0 Imports in CareerNova |

---

## 2. REPOSITORY INTEGRITY AUDIT

- **Orphan / Broken Imports:** 0 Unresolved Imports.
- **Route File Exports:** Cleaned named exports from route files to satisfy TanStack Router code-splitting standards.
- **CSS Import Order:** Updated `src/styles.css` so Google Font `@import url(...)` precedes all other statements.
- **State Persistence:** `localStorage` shortlist and profile keys are 100% active and protected.
