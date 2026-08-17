# PS-09 Core System Logic & State Map
**System:** CareerNova (SIH25094)  
**Date:** 2026-08-16  

---

## A. Current Flow vs. Intended Flow

### Current Implementation Flow
```
[ Profile (/profile) ] ──► [ Assess (/assess) ] ──► [ Directions (/directions) ]
                                                              │
                                                        (Routing Bug)
                                                              ▼
                                                   [ Stagnant Page / Broken Link ]
```

### Intended Architectural Flow
```
[ Profile Setup ] ──► [ Class 10: Stream Exploration (/streams) ] ──► [ Official JKBOSE Portal ]
        │
        ▼ (Class 12)
[ Behavioral Survey (/assess) ] ──► [ Qualified Fields (/directions) ]
                                              │
                                              ▼
                                 [ Field Detail & Degrees (/directions/$key) ]
                                              │
                                              ▼
                                 [ Verified GDC Availability (/colleges) ]
                                              │
                                              ▼
                                 [ Post-UG Pathways & Exams (/outcomes/$key) ]
                                              │
                                              ▼
                                 [ Official Resource Linkage (/resources) ]
                                              │
                                              ▼
                                 [ Actionable Next Step (/nextstep) ]
```

---

## B. Complete Route Hierarchy & Status Audit

| Route File | Path | Intended Purpose | Audit Status | Identified Bug / Disconnect |
|---|---|---|---|---|
| `routes/__root.tsx` | `/` | Root app container | PASS | N/A |
| `routes/index.tsx` | `/` | Landing page | PASS | N/A |
| `routes/dashboard.tsx` | `/dashboard` | Dashboard layout & navigation sidebar | PASS | Standard dashboard container |
| `routes/dashboard.profile.tsx` | `/dashboard/profile` | Class & Stream profile setup | PASS | Class 10/12 state switching logic verified |
| `routes/dashboard.streams.tsx` | `/dashboard/streams` | Class 10 stream exploration | PASS | Properly displays Science, Commerce, Arts streams for Class 10 |
| `routes/dashboard.assess.tsx` | `/dashboard/assess` | 7-question Class 12 behavioral survey | PASS | Contains explicit "I don't know" options and soft aversion penalties |
| `routes/dashboard.directions.tsx` | `/dashboard/directions` | Qualified directional fields list | **BROKEN** | Registered as parent route of `$key` without `<Outlet />` or `index.tsx` separation |
| `routes/dashboard.directions.$key.tsx` | `/dashboard/directions/$key` | Field detail & degree course list | **UNREACHABLE VIA LINK** | Navigation to `/dashboard/directions/sciences` updates URL but fails to render content due to routing bug |
| `routes/dashboard.colleges.tsx` | `/dashboard/colleges` | Verified GDC college listings | PASS | Filters by course key & district |
| `routes/dashboard.outcomes.$key.tsx` | `/dashboard/outcomes/$key` | Post-UG study pathways & exams | PASS | Renders verified exams (CUET-PG) and higher study pathways |
| `routes/dashboard.compare.tsx` | `/dashboard/compare` | Option comparison tool | PASS | Compares verified courses |
| `routes/dashboard.resources.tsx` | `/dashboard/resources` | Official ecosystem resource portal | PASS | Maps verified portals (Samarth, PMSSS, JKBOSE) |
| `routes/dashboard.mentor.tsx` | `/dashboard/mentor` | Grounded AI guidance assistant | PASS | Uses verified system prompts without inventing data |
| `routes/dashboard.nextstep.tsx` | `/dashboard/nextstep` | Destination action page | PASS | Directs students to official portals |

---

## C. State Objects & Persistence Specification

| State Key | Storage Location | Data Structure | Reset / Recalculation Rules |
|---|---|---|---|
| `ps09_student_profile` | `localStorage` | `{ class: string, stream: string, interests: string[], goalPreference: string }` | Class 12 → Class 10 clears `interests` and sets `stream = ""`. Class 10 → Class 12 defaults `stream = "Science (PCM)"`. |
| `ps09_assess_weights` | `localStorage` | `Record<string, number>` (e.g. `{ sciences: 1.2, aversion_lab: 0.5, uncertainty: 0 }`) | Cleared when Class 12 → Class 10 transition occurs. Should also be reset when Class 12 stream is changed to avoid stale signal pollution. |

---

## D. Every Data Relationship Mapping

1. `Direction` (e.g. `sciences`) → `Course` (e.g. `bsc-computer-application`)
2. `Course` → `Eligibility` (Statutory 10+2 requirement string)
3. `Course` → `Colleges` (Array of verified GDC keys: `gdc-kathua`, `gdc-akhnoor`)
4. `Course` → `Outcomes` (Array of post-UG study pathways and entrance exams: `CUET-PG SCQP09`, `M.Sc CS`)
5. `Course` / `Direction` → `Official Resource` (`jk-samarth-admissions`, `university-of-jammu`, `pmsss-aicte-jk`)

---

## E. Logic Contradictions & Broken Connections Found

1. **Routing Layout Bug:** `src/routes/dashboard.directions.tsx` captures `/dashboard/directions/*` without delegating to `dashboard.directions.index.tsx` or rendering an `<Outlet />`.
2. **Stale Assessment State on Stream Change:** If a Class 12 PCM student completes assessment and then edits profile to Class 12 Commerce, old PCM assessment weights remain in `localStorage`, scoring Commerce directions with obsolete PCM signals.
3. **Implicit Default State:** Opening `/dashboard/directions` directly without an initial profile initializes a hardcoded default profile rather than enforcing profile completion.

---

## F. Recommended Repair Order

1. **Fix Routing Hierarchy:** Rename `dashboard.directions.tsx` view to `dashboard.directions.index.tsx` (or wrap layout with `<Outlet />`) so `/dashboard/directions` loads the list view and `/dashboard/directions/$key` cleanly loads the detail view.
2. **Enforce Clean State Recalculation:** Update `dashboard.profile.tsx` so that modifying the Class 12 stream removes stale `ps09_assess_weights`, forcing fresh behavioral assessment.
3. **Verify Decision Chain Integrity:** Ensure all course, college, outcome, and resource linkages remain 100% verified across all routes.
