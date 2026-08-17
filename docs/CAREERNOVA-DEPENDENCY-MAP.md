# CAREERNOVA — DEPENDENCY MAP
## SIH25094 | Full Route, Component, and Data Dependency Graph

**Document Version:** 1.0  
**Date:** August 17, 2026  

---

## 1. COMPONENT & DATA DEPENDENCY GRAPH

```
[Entry Route: src/routes/__root.tsx]
       │
       ├─► [Landing: src/routes/index.tsx] ──► Hero, Stats, Testimonials, StudentJourneyAnimatedList
       │
       └─► [Dashboard Root: src/routes/dashboard.tsx]
                 │
                 ├─► [Profile: dashboard.profile.tsx] ──► ps09_student_profile (localStorage)
                 ├─► [Assess: dashboard.assess.tsx] ──► ps09_assess_weights (localStorage)
                 ├─► [Streams (Class 10): dashboard.streams.tsx] ──► jk-streams.ts
                 ├─► [Directions (Class 12): dashboard.directions.index.tsx] ──► jk-directions.ts, directions.ts
                 ├─► [Skills (ITI/NSQF): dashboard.skills.tsx] ──► jk-skills.ts, shortlist.ts
                 ├─► [Govt Pathways: dashboard.govt-pathways.tsx] ──► jk-govt-pathways.ts, shortlist.ts
                 ├─► [Colleges: dashboard.colleges.tsx] ──► jk-colleges.ts
                 ├─► [Decision Workspace: dashboard.compare.tsx] ──► shortlist.ts, why-engine.ts, scholarships.ts
                 └─► [Next Step: dashboard.nextstep.tsx] ──► jk-resources.ts
```

---

## 2. REVERSE DEPENDENCY VERIFICATION

- `why-engine.ts` is imported by `dashboard.compare.tsx`, `dashboard.directions.index.tsx`, `dashboard.skills.tsx`, `dashboard.govt-pathways.tsx`.
- `shortlist.ts` is imported by `dashboard.compare.tsx`, `dashboard.skills.tsx`, `dashboard.govt-pathways.tsx`, `dashboard.directions.$key.tsx`.
- `scholarships.ts` is imported by `dashboard.compare.tsx`.
- All imports are verified and active. Zero orphan components or broken imports exist.
