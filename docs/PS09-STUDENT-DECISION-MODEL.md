# CareerNova Student Decision Model & Journey Specifications
**System:** CareerNova (SIH25094)  
**Date:** 2026-08-16  

---

## 1. Core Architectural Separation

The system maintains an absolute structural boundary between **Class 10** and **Class 12** exploration journeys.

```
                                  ┌─────────────────────────┐
                                  │   STUDENT ONBOARDING    │
                                  │   Select Class & Stream │
                                  └────────────┬────────────┘
                                               │
                       ┌───────────────────────┴───────────────────────┐
                       │                                               │
                       ▼                                               ▼
           ┌──────────────────────┐                        ┌──────────────────────┐
           │   CLASS 10 JOURNEY   │                        │   CLASS 12 JOURNEY   │
           │  Stream Exploration  │                        │  Degree Exploration  │
           └───────────┬──────────┘                        └───────────┬──────────┘
                       │                                               │
                       ▼                                               ▼
           • Explore 11th Streams                          • Hard Stream Qualification
           • Subject Combinations                          • 5-Dim Exploration Survey
           • Key Questions to Consider                     • Soft Signal Ranking
           • JKBOSE Official Resources                     • Course & Eligibility Match
           • (ZERO UG/GDC Recommendations)                 • Verified J&K College Map
                                                           • Post-UG Pathways & PMSSS
```

---

## 2. Class 10 Exploration Journey

### Primary Objective
Help the student answer: *"What stream options (Science, Commerce, Arts) exist for Class 11 in J&K, what subjects do they involve, and what questions should I consider before selecting my subjects on JKBOSE?"*

### Journey Stages
1. **Profile Setup (`/dashboard/profile`):** Select Class = 10. Interest tagging and stream dropdowns are disabled.
2. **Stream Discovery (`/dashboard/streams`):** Explore Science, Commerce, and Arts/Humanities streams.
3. **Subject Breakdown:** View core subject areas (e.g., Physics, Chemistry, Mathematics, Computer Science for Science stream; Accountancy, Business Studies, Economics for Commerce).
4. **Questions to Consider:** Reflect on activity preferences, workload expectations, and study habits.
5. **Official Resource Linkage:** Direct link to JKBOSE Official Portal (`https://jkbose.jk.gov.in`) for syllabi and scheme of studies.

### Strict Isolation Rules
* Class 10 profiles NEVER receive undergraduate degree recommendations (B.Sc, B.Com, B.A., BCA).
* Class 10 profiles NEVER receive Government Degree College (GDC) recommendations.
* Class 10 profiles NEVER receive career predictions or postgraduate entrance exam mappings.

---

## 3. Class 12 Exploration Journey

### Primary Objective
Help the student answer: *"Given my completed 10+2 stream, what higher education fields and undergraduate degree courses am I qualified to explore in J&K, which colleges offer them, and what official portals do I use to apply?"*

### Journey Stages
1. **Profile Setup (`/dashboard/profile`):** Select Class = 12 and Stream (Science PCM, Science PCB, Science PCMB, Commerce, Arts).
2. **Behavioral Exploration Survey (`/dashboard/assess`):** Answer 7 questions covering:
   - Preferred Activities
   - Subject Curiosity
   - Ways of Working
   - Curiosity Exposure
   - Work Environment
   - Soft Aversion (dislikes)
   - Certainty / Uncertainty level ("I don't know")
3. **Fields Worth Exploring (`/dashboard/directions`):**
   - **Hard Qualification Filter:** Only display fields matching the student's 10+2 stream eligibility.
   - **Soft Ranking:** Sort qualified fields based on survey signal affinity.
   - **Non-Predictive Rationale:** Display exploratory explanations (*"X may be worth exploring because..."*) avoiding predictive career claims.
   - **Uncertainty Handling:** If student selects high uncertainty, display all qualified fields with equal standing and honest exploration text.
4. **Course & Statutory Eligibility (`/dashboard/directions/$key`):** Review degree options (e.g., B.Sc Computer Application, BCA, B.Com, BBA) with statutory minimum application criteria sourced from J&K Samarth & University Statutes.
5. **Verified Institutional Mapping (`/dashboard/colleges`):** View J&K Government Degree Colleges (e.g., GDC Kathua, GDC Akhnoor) offering the selected program.
6. **Postgraduate Pathways & Scholarships (`/dashboard/outcomes/$key` & `/dashboard/resources`):** Review post-UG options (CUET-PG, JKPSC, JKSSB) and financial aid (PMSSS J&K, NSP).
7. **Next Decision Action (`/dashboard/nextstep`):** Directed to official government destination (e.g. J&K Samarth Portal for UG admissions).

---

## 4. Exploration Signal Taxonomy (5 Dimensions)

| Dimension | Description | System Treatment |
|---|---|---|
| **1. Qualification (Hard)** | 10+2 Stream (PCM, PCB, Commerce, Arts) | **Hard Constraint:** Eliminates legally ineligible degrees. |
| **2. Affinity (Soft)** | Activity preferences, subject interest | **Soft Boost:** Elevates relevance rank among qualified directions. |
| **3. Work Style (Soft)** | Structured logic, creative, organizational | **Soft Refinement:** Refines sub-course recommendations (e.g., BCA vs B.Sc CS). |
| **4. Aversion (Soft)** | Dislike of lab work, heavy calculus, writing | **Soft Penalty:** Lowers priority score without eliminating qualified options; appends explanatory note. |
| **5. Uncertainty (Neutral)** | Explicit "I don't know" selection | **Neutralizer:** Suppresses score multipliers; returns all qualified fields with honest exploration text. |
