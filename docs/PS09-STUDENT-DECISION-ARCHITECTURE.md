# PS-09 — Student Decision Architecture
**Project:** CareerNova-AI (SIH25094)  
**Date:** 2026-08-16

---

## Conceptual Decision Architecture

```
STUDENT ENTERS
    │
    ▼
┌─────────────────────────────┐
│  STAGE IDENTIFICATION       │  "What class are you in?"
│  /dashboard/profile         │  → Class 10 or Class 12
│                             │  → Stream (if Class 12)
│                             │  → Interests (optional)
└──────────┬──────────────────┘
           │
    ┌──────┴───────┐
    │              │
    ▼              ▼
┌────────┐    ┌────────────────────────────────────────────────┐
│CLASS 10│    │ CLASS 12 JOURNEY                               │
│        │    │                                                │
│Streams │    │  ┌──────────────────────────────────────────┐  │
│Explorer│    │  │ INTEREST EXPLORATION                     │  │
│        │    │  │ /dashboard/assess                        │  │
│Science │    │  │ 7 questions: Activities, Subjects,       │  │
│Commerce│    │  │ Work Style, Curiosity, Environment,      │  │
│Arts    │    │  │ Aversions, Decision Stage                │  │
│        │    │  │ "I don't know" = valid on every question │  │
│        │    │  └──────────────┬───────────────────────────┘  │
│        │    │                 │                               │
│        │    │                 ▼                               │
│        │    │  ┌──────────────────────────────────────────┐  │
│        │    │  │ DIRECTION DISCOVERY                      │  │
│        │    │  │ /dashboard/directions                    │  │
│        │    │  │ Stream-qualified fields:                 │  │
│        │    │  │   Sciences | Commerce | Arts             │  │
│        │    │  │ Ranked by exploration signals            │  │
│        │    │  │ High uncertainty → show ALL qualified    │  │
│        │    │  └──────────────┬───────────────────────────┘  │
│        │    │                 │                               │
│        │    │                 ▼                               │
│        │    │  ┌──────────────────────────────────────────┐  │
│        │    │  │ PATH UNDERSTANDING                       │  │
│        │    │  │ /dashboard/directions/$key               │  │
│        │    │  │                                          │  │
│        │    │  │ Per course:                              │  │
│        │    │  │   ├── What is it?                        │  │
│        │    │  │   ├── What will I study? (curriculum)    │  │
│        │    │  │   ├── Am I eligible? (statutory)         │  │
│        │    │  │   ├── Degree vs. Skill Trade-Off         │  │
│        │    │  │   ├── Where in J&K? (verified GDCs)      │  │
│        │    │  │   └── What can it lead toward?           │  │
│        │    │  └──────────────┬───────────────────────────┘  │
│        │    │                 │                               │
│        │    │          ┌──────┼──────┐                        │
│        │    │          ▼      ▼      ▼                        │
│        │    │   ┌──────┐ ┌──────┐ ┌──────────┐               │
│        │    │   │COMPAR│ │COLLEG│ │ OUTCOMES │               │
│        │    │   │  E   │ │  ES  │ │          │               │
│        │    │   │      │ │      │ │ Higher   │               │
│        │    │   │Course│ │GDCs  │ │ Study    │               │
│        │    │   │vs    │ │by    │ │ Exams    │               │
│        │    │   │Course│ │Dist  │ │ PG paths │               │
│        │    │   └──┬───┘ └──┬───┘ └────┬─────┘               │
│        │    │      └────────┼──────────┘                      │
│        │    │               ▼                                 │
│        │    │  ┌──────────────────────────────────────────┐   │
│        │    │  │ DECISION & NEXT ACTION                   │   │
│        │    │  │ /dashboard/nextstep                      │   │
│        │    │  │                                          │   │
│        │    │  │ Class 12:                                │   │
│        │    │  │   → J&K Samarth (GDC admission)         │   │
│        │    │  │   → JKBOPEE (professional entrance)     │   │
│        │    │  │   → PMSSS (scholarship)                 │   │
│        │    │  │   → NSP (financial aid)                  │   │
│        │    │  └──────────────────────────────────────────┘   │
│        │    └────────────────────────────────────────────────┘
│        │
│Next:   │
│Talk to │    SUPPORT TOOLS (available at any stage):
│school  │    ├── /dashboard/resources (12 official portals)
│JKBOSE  │    └── /dashboard/mentor (grounded AI advisor)
└────────┘
```

## Data Flow Architecture

```
StudentProfile (localStorage)
  ├── class: "Class 10" | "Class 12"
  ├── stream: "" | "Science (PCM)" | "Commerce" | ...
  ├── interests: string[]
  └── goalPreference: string
          │
          ▼
AssessWeights (localStorage)
  ├── sciences: 0–N
  ├── commerce-management: 0–N
  ├── arts-humanities: 0–N
  ├── uncertainty: 0–N
  └── aversion_*: 0–N
          │
          ▼
matchDirections() [src/lib/directions.ts]
  ├── Filters: stream-qualified directions only
  ├── Ranks: by assessment weight scores
  ├── Handles: uncertainty → all directions shown neutrally
  └── Returns: DirectionMatch[] with explanations
          │
          ▼
Direction → Course[] → collegeKeys[] → jkColleges[]
  │           │            │
  │           │            └── GDC name, district, programs, source
  │           │
  │           └── key, label, eligibility, whatYouWillStudy,
  │               skillAlternative, outcomes[], source
  │
  └── key, label, streamRequirements, courses[], source
```

## State Management Rules

1. **Profile changes purge assessment:** Changing `stream` or `class` in Profile removes `ps09_assess_weights` from localStorage.
2. **Class 10 route guards:** `isClass10Profile()` redirects from assess/directions/outcomes/colleges/compare to `/dashboard/streams`.
3. **No profile → redirect:** Routes check for stored profile; missing profile redirects to `/dashboard/profile`.
4. **Assessment is optional:** A student can skip assessment and browse all directions manually.
5. **Verification cascades:** Only `verificationStatus === "verified"` data is displayed to students.
