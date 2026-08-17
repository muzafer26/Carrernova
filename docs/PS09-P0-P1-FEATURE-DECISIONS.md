# PS-09 — P0/P1 Feature Decisions & Implementation Priorities
**Project:** CareerNova-AI (SIH25094)  
**Date:** 2026-08-16

---

## Priority Framework

- **P0** = Must complete before ANY demo or UI polish. Failure to do this creates active credibility risk.
- **P1** = Important for product depth. Complete if time permits.
- **P2** = Nice to have. Defer to post-demo.
- **REMOVE** = Actively harmful or misaligned. Delete immediately.

---

## P0 — Mandatory Before Demo

| # | Task | Rationale | Effort |
|:---:|:---|:---|:---:|
| 1 | **Delete `dashboard.quiz.tsx`** | Fabricates career predictions with salary/demand claims using ungrounded LLM | 1 min |
| 2 | **Delete `dashboard.careers.tsx`** | Global tech career library with USD salaries, completely off-mission | 1 min |
| 3 | **Delete `dashboard.roadmaps.tsx`** | Generic tech skill roadmaps (React, Python, AWS paths) | 1 min |
| 4 | **Delete `dashboard.roadmap.$key.tsx`** | Individual roadmap detail for above | 1 min |
| 5 | **Delete `dashboard.resume.tsx`** | AI resume analyzer — job seeker tool, not education advisor | 1 min |
| 6 | **Delete `dashboard.jobs.tsx`** | Live Adzuna job board with global tech listings | 1 min |
| 7 | **Delete supporting lib files** (`careers.ts`, `jobs.ts`, `resume-parser.ts`) | Data/utility files for removed features | 2 min |
| 8 | **Audit `dashboard.tsx` sidebar** for orphaned references | Ensure no navigation link points to deleted routes | 2 min |
| 9 | **Verify build succeeds** after removals | Ensure no broken imports | 5 min |

**Total P0 effort: ~15 minutes.**

---

## P1 — Important Depth Improvements

| # | Task | Rationale | Effort |
|:---:|:---|:---|:---:|
| 1 | Add Government Exam/Career context to outcomes | Students asking "I want a government job" need to see JKPSC/JKSSB qualification requirements clearly | 30 min |
| 2 | Improve Dashboard Overview | Show student's current journey position instead of generic welcome | 30 min |

---

## P2 — Defer to Post-Demo

| # | Task | Rationale |
|:---:|:---|:---|
| 1 | Decision Intent capture ("What are you trying to figure out?") | Adds routing intelligence but current linear flow works |
| 2 | Diploma/polytechnic as distinct pathway | Requires new data source verification |
| 3 | More GDCs beyond current 5 | Requires portal-by-portal verification |
| 4 | Bilingual/multilingual support | Good for accessibility, not critical for demo |
| 5 | PWA / offline capability | Infrastructure, not product logic |

---

## REMOVE — Items That Must Not Exist in Demo

| Item | Reason |
|:---|:---|
| Generic career quiz with fabricated AI predictions | Contradicts verified-data policy |
| USD salary ranges anywhere | Not relevant to J&K students |
| Global tech career library | Not SIH25094 scope |
| Resume analyzer | Job seeker tool, not education decision tool |
| Live job search board | Employment portal, not education advisor |
| Tech skill roadmaps (React, Python, etc.) | Tech learning platform, not education advisor |

---

## Success Criteria After P0 Completion

1. Every route accessible via URL serves the J&K student education decision mission
2. Zero fabricated claims (salary, placement, career predictions) are visible
3. Zero global/non-J&K content is accessible
4. All displayed data carries verified source metadata
5. Build compiles cleanly
6. Route guards (Class 10/12 isolation) remain intact
