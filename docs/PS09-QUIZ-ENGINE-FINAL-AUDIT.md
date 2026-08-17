# CAREERNOVA — P0 QUIZ & RECOMMENDATION ENGINE FINAL AUDIT
## SIH25094 | JAMMU & KASHMIR EDUCATION ADVISOR

---

## 1. OBSERVED BUGS
- **Class 10 Stage Pollution:** Previously, Class 10 students could inadvertently view or receive undergraduate degree recommendations (e.g. BCA, B.Tech, B.Sc) when accessing post-12 routes.
- **Uncontrolled Direct Links:** Navigating directly to post-12 routes (`/dashboard/directions`, `/dashboard/compare`, `/dashboard/colleges`) as a Class 10 student bypassed stream selection.
- **Keyword-Only Shortcuts:** Keyword matching for "Biotechnology" could previously trigger B.Tech recommendations without verifying PCM/JEE prerequisites.
- **Static Map Box:** Chapter 7 of the guided journey rendered a static placeholder rather than interactive geographic map tiles.

---

## 2. ROOT CAUSES
- Lack of a central educational stage gate helper (`getAllowedRecommendationLevel`).
- Absence of explicit route-level guards on deep links for Class 10 profiles.
- Oversimplified keyword matching in earlier iterations without eligibility constraints.

---

## 3. CLASS 10 VS CLASS 12 MODEL
| Dimension | Class 10 (`SCHOOL_STAGE`) | Class 12 (`POST_12`) |
| :--- | :--- | :--- |
| **Primary Decision** | "What stream/subject direction should I explore for Classes 11–12 under JKBOSE?" | "What realistic post-12 degree, ITI, or govt pathway options should I explore?" |
| **Allowed Output** | Science (PCM/PCB/PCMB), Commerce, Arts/Humanities streams | UG Degrees (B.Com, BCA, B.Sc), ITI, Skill Diplomas, Govt Exam Cadres |
| **UG Course Display** | Forbidden as immediate recommendation (only allowed as "Future Pathway Example") | Allowed as primary ranked recommendations based on hard eligibility |

---

## 4. EXISTING ASSESSMENT ARCHITECTURE
- **Assessment Versioning:** Persisted as `assessmentVersion: "v2"`.
- **Signal Vector:** `AssessSignalVector` containing 27 sub-signals (technology, programming, financial, biological, laboratory, humanities, etc.).

---

## 5. NEW SIGNAL MODEL
- Quantitative weights derived from student quiz responses.
- Supports dot-product scoring against canonical course signal vectors.

---

## 6. ELIGIBILITY MODEL (HARD GATE)
`checkCourseEligibility(course, profile)` enforces strict stream requirements:
- **Class 10:** Hard gate returns `NOT_ELIGIBLE` for all post-12 courses.
- **Class 12:** Checks stream prerequisites (e.g., B.Sc Biotech requires PCB/PCMB; BCA requires Science/Commerce with Math background; B.Sc IT requires Science).

---

## 7. PROGRAMME SCORING MODEL
`score = positiveInterestMatch + activityMatch + workStyleMatch + goalMatch + subjectAlignment + contextualAlignment - aversionPenalty`

---

## 8. INTEREST MAPPING
- Direct interest matches contribute up to 25 points.
- Extracted signals contribute up to 35 points via dot-product analysis.

---

## 9. NEGATIVE SIGNALS (AVERSION PENALIZATION)
- `aversion_programming`: Reduces priority of BCA/B.Sc IT by 12 points.
- `aversion_lab`: Reduces priority of B.Sc Biotech/Botany by 12 points.
- `aversion_financial`: Reduces priority of B.Com/Accountancy by 12 points.

---

## 10. CONFLICTING SIGNALS
- Deterministic score weighting ensures stronger positive signal vectors outweigh minor noise.

---

## 11. GOAL MAPPING
- `degrees`: Boosts university undergraduate programmes.
- `govt`: Boosts Public Service, Law, Economics, and B.Com pathways.
- `skills`: Boosts ITI and vocational diploma alternatives.

---

## 12. SUBJECT MAPPING
- Respects specific subject combinations (PCM, PCB, PCMB, Commerce + Math, Arts + Social Sciences).

---

## 13. UNCERTAINTY HANDLING
- High uncertainty (`uncertainty >= 2`) presents broad pathway exploration options rather than forced course assignments.

---

## 14. CLASS 10 OUTPUT CONTRACT
- `recommendedEntityType`: `STREAM` or `SUBJECT_AREA`.
- Output: Science, Commerce, Arts/Humanities with JKBOSE faculty context.

---

## 15. CLASS 12 OUTPUT CONTRACT
- `recommendedEntityType`: `PROGRAMME`, `DEGREE`, `DIPLOMA`, `ITI`, `SKILL`, `GOVT-EDUCATION-PATHWAY`.

---

## 16. RECOMMENDATION EXPLANATION
- Every recommended course includes an evidence-based explanation (`signalBreakdown.positive`, `signalBreakdown.negative`).

---

## 17. ASSESSMENT VERSIONING
- Invalidates stale quiz results from prior schema versions.

---

## 18. STATE INVALIDATION
- Changing class or stream clears prior invalid course rankings.

---

## 19. DETERMINISM
- 0 randomness (`Math.random` removed). Ties broken deterministically by score, signal count, then course key alphabetical order.

---

## 20. AUTOMATED TEST MATRIX
Implemented in `scripts/test-recommendations.ts`:
- Test 1: Stage Gate (`getAllowedRecommendationLevel`)
- Test 2: Finance Persona (Commerce)
- Test 3: Biotechnology Persona (PCB)
- Test 4: Programming Persona (PCM)
- Test 5: Humanities Persona (Arts)
- Test 6: Class 10 Hard Isolation
- Test 7: Inverse Profile & Sensitivity
- Test 8: Deterministic Repeatability

---

## 21. BROWSER TESTS
Verified end-to-end flow from Landing (`/`) -> Guided Story Journey (`/dashboard/profile`) -> Stream Exploration / Course Match -> J&K College Map (`/dashboard/colleges`).

---

## 22. FAILURES
None in final audit.

---

## 23. FIXES
- Added central `getAllowedRecommendationLevel` stage gate.
- Enforced Class 10 stage guard across all post-12 routes.
- Integrated OpenStreetMap interactive J&K college map.

---

## 24. REGRESSION RESULTS
8 / 8 Automated Test Suites PASSED (100%).

---

## 25. REMAINING LIMITATIONS
- Dataset expands as Directorate of Higher Education updates annual intake capacity.

---

## 26. FINAL VERDICT

**C. VERIFIED — DETERMINISTIC, STAGE-AWARE, STUDENT-CONTEXT RECOMMENDATION ENGINE**
