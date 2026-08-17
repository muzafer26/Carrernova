# CareerNova V1 Product Boundary & Scope Specifications
**System:** CareerNova (SIH25094)  
**Date:** 2026-08-16  

---

## 1. V1 Core Functional Boundaries

To maintain high data integrity, strict non-predictive guidance, and total reliance on verified primary sources, CareerNova V1 strictly enforces the following functional boundaries:

```
                            ┌──────────────────────────────────────┐
                            │     CAREERNOVA V1 CORE FUNCTIONAL    │
                            │                BOUNDARY              │
                            └──────────────────┬───────────────────┘
                                               │
                  ┌────────────────────────────┴────────────────────────────┐
                  │                                                         │
                  ▼                                                         ▼
       [ IN SCOPE - MUST DO ]                                    [ OUT OF SCOPE - MUST NOT DO ]
  • Class 10 Stream Exploration                             • Application Filing / Seat Allotment
  • Class 12 Stream Qualification Filter                    • Synthetic Salary & Placement Scores
  • 5-Dim Behavioral Exploration Survey                    • Personality Aptitude / Career Prediction
  • Soft Signal Ranking & Non-Predictive Rationale           • Resume Builders / Job Application Feeds
  • Statutory Minimum Eligibility (Samarth / JU)            • Unverified Commercial College Profiles
  • Verified GDC Institutional Mapping                      • Duplicate Govt Application Forms
  • Post-UG Pathways (CUET-PG, JKPSC, JKSSB)                
  • Contextual Official Ecosystem Resource Links            
```

---

## 2. Explicit "WHAT NOT TO BUILD" Mandate

1. **NO Admission Application Systems:** CareerNova will NOT process online applications, fee payments, or seat preferences. It will route students directly to `jkadmissions.samarth.ac.in`.
2. **NO Predictive Career Algorithms:** CareerNova will NOT output claims such as *"You are 92% suited to become a Software Engineer"*. It will present qualified fields worth exploring.
3. **NO Synthetic Salary or Placement Metrics:** CareerNova will NOT invent average salary numbers, placement percentages, or college rankings. It will link to official recruitment portals (JKPSC / JKSSB).
4. **NO Private / Commercial College Promotion:** CareerNova will focus exclusively on verified J&K Government Degree Colleges (GDCs) and statutory universities.
5. **NO Redundant Job Feeds or Resume Builders:** Features unrelated to student educational transition (e.g. job boards, resume generators) are strictly out of scope for V1.

---

## 3. Core Student Decision Loop (V1 Target)

```
1. Student Profile Setup (Class 10 or Class 12 Stream)
   ↓
2. Behavioral Exploration Survey (7 Qs with explicit "I don't know" options)
   ↓
3. Fields Worth Exploring (Qualified ranking + exploratory non-predictive explanation)
   ↓
4. Degree Courses & Eligibility (Statutory application requirements + source link)
   ↓
5. Verified Institutions (GDC Kathua, GDC Akhnoor, GDC Kashmir Division)
   ↓
6. Post-UG Pathways & Scholarships (CUET-PG, PMSSS J&K, NSP)
   ↓
7. Next Decision Action (Link to official J&K Samarth / JKBOSE portal)
```

This represents the complete, minimal, evidence-backed V1 core loop for SIH25094.
