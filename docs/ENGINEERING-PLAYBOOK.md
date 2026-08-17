# CAREERNOVA ENGINEERING PLAYBOOK
## SIH25094 | Coding Standards & Architectural Guidelines

**Document Version:** 2.0  
**Date:** August 17, 2026  

---

## 1. CORE ARCHITECTURAL PRINCIPLES

1. **Type Safety & Domain Modeling:** All domain entities must inherit from strict TypeScript interfaces in `src/types/ps09.ts`. Every factual claim must include a valid `SourceMeta` object.
2. **State Management & Persistence:** Shortlist state must persist in `localStorage` (`ps09_student_shortlist`) via pure helper functions in `src/lib/shortlist.ts`.
3. **Stage Separation & Guarding:** Class 10 profiles (`isClass10Profile(profile)`) must be guarded into stream exploration (`/dashboard/streams`). Class 12 profiles explore undergraduate pathways (`/dashboard/directions`).
4. **Data Provenance & Source Metadata:** No factual entity may exist without `source: SourceMeta` and `verificationStatus: VerificationStatus`.
5. **No AI Hallucinations:** The AI Advisor (`/dashboard/mentor`) must answer strictly based on verified `CareerNova` context and decline to invent unverified eligibility rules, cutoffs, or fees.

---

## 2. FILE LOCATION STANDARDS

- Domain Interfaces: `src/types/ps09.ts`
- Data Datasets: `src/data/jk-*.ts`
- Utility Helpers: `src/lib/*.ts`
- Route Components: `src/routes/dashboard.*.tsx`
- Shared Components: `src/components/ui/`
- Documentation: `docs/`
