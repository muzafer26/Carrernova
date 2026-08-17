# PS-09 — Current vs. Required Feature Analysis
**Project:** CareerNova-AI (SIH25094)  
**Date:** 2026-08-16

---

## Complete Route Audit

### PS09-ALIGNED (In Sidebar Navigation — KEEP)

| Route | File | Size | Purpose | Verdict |
|:---|:---|:---:|:---|:---:|
| `/dashboard` | `dashboard.index.tsx` | 4.8KB | Overview / welcome | **KEEP** |
| `/dashboard/profile` | `dashboard.profile.tsx` | 7.6KB | Student profile input | **KEEP** |
| `/dashboard/assess` | `dashboard.assess.tsx` | 12.6KB | Activity exploration assessment | **KEEP** |
| `/dashboard/streams` | `dashboard.streams.tsx` | 12.8KB | Class 10 stream exploration | **KEEP** |
| `/dashboard/directions` | `dashboard.directions.index.tsx` | 6.2KB | Direction discovery list | **KEEP** |
| `/dashboard/directions/$key` | `dashboard.directions.$key.tsx` | 10.9KB | Course detail & trade-offs | **KEEP** |
| `/dashboard/outcomes/$key` | `dashboard.outcomes.$key.tsx` | 11.3KB | Future pathway outcomes | **KEEP** |
| `/dashboard/colleges` | `dashboard.colleges.tsx` | 8.3KB | Verified GDC directory | **KEEP** |
| `/dashboard/compare` | `dashboard.compare.tsx` | 17.1KB | Dual-mode comparison | **KEEP** |
| `/dashboard/nextstep` | `dashboard.nextstep.tsx` | 7.0KB | Official next action | **KEEP** |
| `/dashboard/resources` | `dashboard.resources.tsx` | 3.4KB | Official portal directory | **KEEP** |
| `/dashboard/mentor` | `dashboard.mentor.tsx` | 8.2KB | Grounded AI advisor | **KEEP** |

### LEGACY / ORPHANED (NOT in Sidebar — REMOVE)

| Route | File | Size | What It Does | Why It Must Go |
|:---|:---|:---:|:---|:---|
| `/dashboard/quiz` | `dashboard.quiz.tsx` | 7.7KB | 5Q generic AI career quiz → fabricated salary/demand predictions | **Ungrounded LLM output, contradicts verified-data policy** |
| `/dashboard/careers` | `dashboard.careers.tsx` | 7.2KB | Global tech career library with USD salaries ($70k–$150k+) | **Not J&K, not education-focused, fabricated salary data** |
| `/dashboard/roadmaps` | `dashboard.roadmaps.tsx` | 4.5KB | Generic tech skill roadmap index (React, Python, AWS) | **Not J&K education, generic tech learning platform** |
| `/dashboard/roadmap/$key` | `dashboard.roadmap.$key.tsx` | 18.1KB | Individual roadmap detail with learning resources | **Same — tech skill platform, not education advisor** |
| `/dashboard/resume` | `dashboard.resume.tsx` | 13.0KB | AI Resume Analyzer (ATS scoring, career fit) | **Job seeker tool, not student decision support** |
| `/dashboard/jobs` | `dashboard.jobs.tsx` | 29.2KB | Live Adzuna job search (global, USD salaries, tech stacks) | **Global job board, not J&K education decision tool** |

**Total legacy code to remove: ~79.7KB across 6 route files** (plus associated lib/data files).

### Supporting Library Files to Audit for Removal

| File | Used By | Action |
|:---|:---|:---:|
| `src/lib/careers.ts` | `careers.tsx`, `roadmaps.tsx`, `roadmap.$key.tsx` | **REMOVE** if only legacy consumers |
| `src/lib/jobs.ts` | `jobs.tsx` | **REMOVE** |
| `src/lib/resume-parser.ts` | `resume.tsx` | **REMOVE** |
| `src/lib/ai.ts` | `quiz.tsx` (aiJson function) | **AUDIT** — may be used by mentor too |

---

## Data Model Assessment

### What Exists (Verified)

| Data File | Records | Verification |
|:---|:---:|:---|
| `src/data/jk-directions.ts` | 3 directions, 7 courses | All verified with primary sources |
| `src/data/jk-colleges.ts` | 5 GDCs (Jammu + Kashmir divisions) | All verified with official portals |
| `src/data/jk-streams.ts` | 3 streams (Science, Commerce, Arts) | Verified against JKBOSE |
| `src/data/jk-resources.ts` | 12 official resource entries | All verified with portal URLs |
| `src/types/ps09.ts` | Complete type system with SourceMeta | Enforces verification schema |

### What's Missing (P1–P2)

| Gap | Impact | Feasibility |
|:---|:---|:---|
| More GDCs (J&K has ~70+ GDCs) | Limited geographic coverage | Requires portal-by-portal verification |
| Diploma/polytechnic pathway data | Cannot serve ITI/polytechnic-interested students | Requires JKBOPEE/DTE data |
| Government exam prerequisite mapping | Weak JKPSC/JKSSB qualification guidance | Data exists on JKPSC portal |
