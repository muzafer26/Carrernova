# CAREERNOVA — P0 IMPLEMENTATION PLAN & VERTICAL SLICE ROADMAP
## SIH25094 | Architecture & Verification Roadmap

**Document Date:** August 17, 2026  
**Implementation Standard:** Vertical Slice Delivery with Mandatory Regression Testing  

---

## 1. VERTICAL SLICE DELIVERY MATRIX

| Vertical Slice | Scope & Focus | Target Files | Verification Strategy | Status |
|---|---|---|---|---|
| **Slice 1: Universal Pathway Model** | Core TypeScript interfaces & source metadata | `src/types/ps09.ts` | Static Type Check & Schema Inspection | **COMPLETED** |
| **Slice 2: Official Programme Catalogue** | Sourced academic degree & course dataset | `src/data/jk-directions.ts` | Source URL Verification & Eligibility Audit | **COMPLETED** |
| **Slice 3: Institution & District Mapping** | GDCs & District location mapping | `src/data/jk-colleges.ts` | District Filter & Program Key Mapping Audit | **COMPLETED** |
| **Slice 4: Vocational & ITI Pathways** | Standalone ITI & NSQF Skill dataset & explorer | `src/data/jk-skills.ts`, `dashboard.skills.tsx` | Category Filter & Shortlist Integration Audit | **COMPLETED** |
| **Slice 5: Government Career Pathways** | Backward educational roadmap dataset & viewer | `src/data/jk-govt-pathways.ts`, `dashboard.govt-pathways.tsx` | Stepping Stones & Official Portal Handoff Audit | **COMPLETED** |
| **Slice 6: Scholarship Relevance** | PMSSS AICTE & NSP contextual matcher | `src/lib/scholarships.ts` | Profile Stage & Target Match Audit | **COMPLETED** |
| **Slice 7: Universal Comparison** | Decision Workspace side-by-side comparator | `src/routes/dashboard.compare.tsx` | Heterogeneous Item Comparison Audit | **COMPLETED** |
| **Slice 8: Persistent Shortlist** | `localStorage` state management | `src/lib/shortlist.ts` | Persistence & Toggle Action Audit | **COMPLETED** |
| **Slice 9: Personal Next-Action Plan** | Stage routing guards & next decision engine | `src/routes/dashboard.nextstep.tsx`, `dashboard.tsx` | Stage Separation & Link Audit | **COMPLETED** |
| **Slice 10: Official Notices & Handoffs** | Official government resource directory | `src/data/jk-resources.ts`, `dashboard.resources.tsx` | 100% External URL Integrity Audit | **COMPLETED** |

---

## 2. FINAL RELEASE GATE CHECKLIST

- [x] All 7 required research documents in `docs/` created and verified.
- [x] 100% of external links point to verified government (.gov.in / .nic.in) or official university (.ac.in / .edu.in) portals.
- [x] Class 10 vs. Class 12 stage guards enforced.
- [x] Persistent decision shortlisting active across degrees, skills, and government exam cadres.
- [x] Zero product bloat (Resume Builder, ATS Scorer, Generic Job Board completely removed).
