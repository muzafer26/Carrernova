# PS-09 Education Path Clarity Repair Plan
**System:** CareerNova (SIH25094 — J&K Education Advisor)  
**Document Version:** 1.0.0  
**Date:** 2026-08-16  

---

## 1. Targeted Files & Modifications

| File Path | Purpose of Change | Data / Source Dependency | Risk & Mitigation |
|---|---|---|---|
| `src/types/ps09.ts` | Add `SkillAlternative` interface and `whatYouWillStudy` / `skillAlternative` fields to `Course`. | Domain Type System | Risk: None. Optional fields ensure backward compatibility. |
| `src/data/jk-directions.ts` | Populate curriculum highlights (`whatYouWillStudy`) and source-backed `skillAlternative` entries for all 7 verified UG courses. | Sourced from University of Jammu Syllabi & J&K Skill Development Dept (`https://jk.gov.in`) | Risk: Data accuracy. Sourced explicitly from official portals. |
| `src/routes/dashboard.directions.$key.tsx` | Render structured course detail cards displaying curriculum focus, statutory eligibility thresholds, side-by-side Degree vs. Skill route comparison, and GDC availability. | `Course` type & `directions` dataset | Risk: Layout overflow. Uses existing glassmorphic card utilities. |
| `src/routes/dashboard.compare.tsx` | Update comparison grid to include statutory application requirements and skill alternative route trade-offs. | `directions` dataset | Risk: Column alignment. Uses responsive flex/grid layouts. |

---

## 2. Step-by-Step Execution Sequence

1. **Step 1:** Update `src/types/ps09.ts` with `SkillAlternative` interface and course attributes.
2. **Step 2:** Update `src/data/jk-directions.ts` with verified curriculum focus points and skill alternative routes for all 7 UG courses.
3. **Step 3:** Update `src/routes/dashboard.directions.$key.tsx` to render the structured 5-layer clarity block (Title → What You Study → Statutory Eligibility → Degree vs Skill Trade-Off → GDC & Samarth Links).
4. **Step 4:** Update `src/routes/dashboard.compare.tsx` to display statutory application thresholds and skill pathway alternatives.
5. **Step 5:** Execute interactive browser validation (`browser_subagent`) to test confused Commerce student journey and Scenarios A-H.
6. **Step 6:** Author `docs/PS09-EDUCATION-PATH-CLARITY-VALIDATION.md`.
