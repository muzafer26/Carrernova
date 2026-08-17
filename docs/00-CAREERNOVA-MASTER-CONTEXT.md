# CAREERNOVA — MASTER CONTEXT & ARCHITECTURAL DIRECTIVE
## SIH25094 | J&K Personalized Education & Career Decision Support System

**Document Version:** 3.0  
**Date:** August 17, 2026  
**Target Domain:** Jammu & Kashmir Union Territory (Post-Class 10 & Class 12 Transitions)  
**Evaluator & Architect:** Senior Product Architect, J&K Education Researcher & Release Lead  

---

## 1. PRODUCT NORTH STAR & HIGHEST-LEVEL RULE

> **THE STUDENT PROBLEM IS THE SINGLE SOURCE OF TRUTH.**  
> *Not existing code, not previous decisions, not demo aesthetics, and not feature count.*

A confused J&K student entering CareerNova must be able to start from complete uncertainty ("I don't know what to do next") and leave with:
1. **Less Confusion:** Clear understanding of academic stage, statutory eligibility, and pathway trade-offs.
2. **Realistic Options:** First-class representation of 4-year academic degrees under NEP-2020 FYUGP, 5-year integrated degrees, professional degrees (B.Tech, B.Sc Agriculture, B.A. LL.B, B.Sc Nursing), 3-year polytechnic engineering diplomas, 6-24 month ITI trades, NSQF skill certificates, and backward government career exam roadmaps (JKPSC, JKSSB).
3. **Verified Information:** 100% of factual claims linked to official `.gov.in`, `.nic.in`, or `.ac.in` portals with explicit `VerificationStatus` ("verified", "unverified", "needs-review").
4. **Shortlist & Decision Workspace:** Ability to save heterogeneous options (Degree + ITI Skill + Govt Exam Cadre) into a persistent `localStorage` decision workspace and compare them side-by-side.
5. **Matched Support:** Contextually matched financial aid (AICTE PMSSS J&K, NSP Post-Matric schemes).
6. **Official Next Action:** Contextual handoff to official government portals (`jkadmissions.samarth.ac.in`, `jkdsd.in`, `jkbopee.gov.in`, `jkpsc.nic.in`, `jkssb.nic.in`).

---

## 2. UNIVERSAL PATHWAY HIERARCHY

CareerNova is structured around a universal pathway abstraction, not an arbitrary "Degree" card:

```
STUDENT PROFILE (Stage: Class 10 / Class 12, Stream, District)
  └── STAGE & GOAL INTENT ("Degrees", "Skills", "Govt Service", "Uncertain")
       └── PATHWAY FAMILY
            ├── 1. Undergraduate Degree (3/4-Year NEP FYUGP)
            ├── 2. Integrated UG-PG Programme (5-Year Dual Degree)
            ├── 3. Professional Degree (B.Tech, Agriculture, Law, Nursing)
            ├── 4. Polytechnic Diploma (3-Year Technical Engineering)
            ├── 5. ITI Trade Certificate (6-24 Month Vocational)
            ├── 6. NSQF Skill Certificate (3-6 Month Skill Module)
            ├── 7. Apprenticeship Programme (NAPS/NATS J&K)
            ├── 8. Government Career Cadre (JKPSC CCE, JKSSB Executive)
            └── 9. Professional Certification (ICAI, ICMAI, NIELIT)
                 └── DISCIPLINARY CATEGORY (14 Faculties)
                      └── PATHWAY ITEM RECORD
                           ├── Eligibility & Prerequisite Validation
                           ├── Core Curriculum & Training Focus
                           ├── Duration & Exit Options
                           ├── Local J&K Institution Mapping (GDCs & ITIs)
                           ├── Matched Scholarships (PMSSS / NSP)
                           ├── Progression & Future Pathways
                           └── Official Next Action (Portal Handoff)
```

---

## 3. SYSTEM BOUNDARIES & EXCLUDED BLOAT

- **PERMANENTLY EXCLUDED (NON-GOALS):**
  - ATS Resume Scorer / Resume Builder
  - Global Tech Job Board / Private Salary Predictors
  - Generic LeetCode Coding Roadmaps
  - Fake AI Career Destiny Scores & Personality Labels
- **CORE DASHBOARD ROUTES:**
  - `/dashboard` (Overview)
  - `/dashboard/profile` (Stage Setup)
  - `/dashboard/assess` (Preference Matrix)
  - `/dashboard/streams` (Class 10 Stream Exploration)
  - `/dashboard/directions` (Academic & Professional Degrees)
  - `/dashboard/skills` (Vocational & ITI Skill Explorer)
  - `/dashboard/govt-pathways` (Backward Govt Career Mapper)
  - `/dashboard/colleges` (District GDC College Finder)
  - `/dashboard/compare` (Student Decision Workspace & Comparator)
  - `/dashboard/nextstep` (Official Handoffs)
  - `/dashboard/resources` (Government Resource Directory)
  - `/dashboard/mentor` (Advisor Guidance)