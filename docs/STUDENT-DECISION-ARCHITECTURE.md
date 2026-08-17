# STUDENT DECISION ARCHITECTURE
## SIH25094 | Structural Decision Flow & Route Engine

**Document Version:** 2.0  
**Date:** August 17, 2026  

---

## 1. DECISION ENGINE ARCHITECTURE

```
                               PROFILE ONBOARDING
                             (Stage, Stream, District)
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
             CLASS 10                                         CLASS 12
                 │                                               │
      Stream Guidance Engine                           Pathway Discovery Engine
      - Core Subject Areas                             - Academic Degrees (NEP FYUGP)
      - Future Opportunities                           - Professional Degrees (Law, Agri)
      - Reflection Questions                           - Standalone ITI & Skill Trades
                 │                                     - Backward Govt Career Cadres
                 │                                               │
                 └───────────────────────┬───────────────────────┘
                                         ▼
                             PERSISTENT DECISION WORKSPACE
                              - localStorage Shortlist Storage
                              - Side-by-Side Heterogeneous Comparator
                              - Dynamic Scholarship Matcher (PMSSS/NSP)
                                         │
                                         ▼
                             OFFICIAL DECISION HANDOFF
                              - Direct Official Portal Links
                              - Contextual Handoff Checklist
```

---

## 2. STATE PERSISTENCE SCHEMA

Shortlist state (`ps09_student_shortlist`) is structured as a JSON array of `ShortlistItem` records:
- `id`: Unique identifier (e.g. `bsc-computer-application`, `iti-computer-hardware`, `jkpsc-cce`).
- `type`: `"degree" | "skill" | "govt-exam"`.
- `title`: Human-readable name.
- `category`: Category classification.
- `eligibility`: Plain language prerequisite requirement.
- `linkTo`: Internal route destination.
- `sourceLabel` & `sourceUrl`: Authoritative government source metadata.
