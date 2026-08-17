# CAREERNOVA — COMPLETE CLASS 10 EDUCATION JOURNEY SPECIFICATION
**SIH25094 | Jammu & Kashmir Education Platform**
**Document Version:** 2.0.0 (Production Verified)
**Session Date:** August 18, 2026

---

## 1. Class 10 Problem & Product Contract

When a student selects `Class 10`, CareerNova enters `CLASS_10_EXPLORATION_MODE`. 

### Key Contract Rules:
1. **No Premature Degree Recommendations**: Class 10 students are making a school-stage decision (**Class 11–12 Higher Secondary Stream under JKBOSE**). They are **NOT** applying for undergraduate university degrees (B.Sc, BCA, B.Com, B.Tech).
2. **Primary Entities**:
   - `STREAM` (Science, Commerce, Arts / Humanities)
   - `SUBJECT DIRECTION` (PCM, PCB, Commerce w/ Math, Humanities w/ Pol Sci)
   - `FUTURE AREA EXPLORATION` (Clearly labelled context)
3. **Future Degree Context**: Undergraduate degrees (e.g., B.Sc Biotechnology, B.Tech CS) are shown **ONLY** under *"Future Pathway Possibilities (After 10+2)"* to help students understand what downstream choices a stream keeps open.

---

## 2. Complete Class 10 Student Journey

```
[ABOUT YOU] (Class 10, District)
    │
    ▼
[CURRENT STAGE UNDERSTANDING] (School Stage Decision Gate)
    │
    ▼
[DISCOVER INTERESTS & ACTIVITIES] (Biology, Finance, Tech, Humanities)
    │
    ▼
[RELEVANT JKBOSE STREAMS] (Science, Commerce, Arts)
    │
    ▼
[UNDERSTAND SELECTED STREAM (CHAPTER 6)]
  ├── Core Subjects & Overview (JKBOSE Faculty Scheme)
  ├── Self-Reflection Questions
  ├── Future Pathway Context (Downstream degrees after 10+2)
  ├── Evidence-Based Rationale ("Why is this shown?")
  └── Official JKBOSE Portal Link (https://jkbose.jk.gov.in)
    │
    ▼
[WHERE TO STUDY IN J&K (CHAPTER 7)] (Higher Secondary infrastructure across District)
    │
    ▼
[NEUTRAL STREAM COMPARISON & NEXT DECISION (CHAPTER 8)]
```

---

## 3. Stream Models & Subject Infrastructure (JKBOSE Aligned)

| Stream | Core Subject Areas | Key Learning Characteristics | Future Pathways Kept Open (After 10+2) |
| :--- | :--- | :--- | :--- |
| **Science Stream** | Physics, Chemistry, Mathematics, Biology, Computer Science | Scientific inquiry, lab experiments, quantitative problem solving | Engineering, Medicine, Biotech, Computing, Pure Sciences, Agriculture |
| **Commerce Stream** | Accountancy, Business Studies, Economics, Mathematics | Business principles, financial systems, market dynamics, numbers | B.Com, BBA, Finance & Taxation, Economics, CA/CS, Digital Business |
| **Arts / Humanities** | History, Political Science, Sociology, Geography, Languages | Social systems, governance, literature, human behavior, analytical writing | BA Humanities, Law (BA LLB), Journalism, Psychology, Civil Services |

---

## 4. Class 10 Scenario Matrix & Verification Results

| Scenario | Input Interests / Signals | Expected Outcome | System Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Scenario A** | Science, Biology, Experiments | Science Stream (PCB focus) | Science Stream Card + Downstream Biotech Context | ✅ PASS |
| **Scenario B** | Money, Finance, Business, Numbers | Commerce Stream | Commerce Stream Card + Downstream B.Com/BBA Context | ✅ PASS |
| **Scenario C** | History, Politics, Society, Writing | Arts / Humanities Stream | Arts Stream Card + Downstream Law/Humanities Context | ✅ PASS |
| **Scenario D** | Computers, Coding | Science Stream (with Math/CS focus) | Science Stream Card + Prerequisite Math Guidance | ✅ PASS |
| **Scenario E** | Biotechnology | Science Stream (PCB focus) | Science Stream Card (No direct B.Tech push) | ✅ PASS |
| **Scenario F** | "I don't know" / Uncertain | Broad Stream Exploration | Neutral Stream Comparison & Discovery Questions | ✅ PASS |

---

## 5. UI Information Density & Progressive Disclosure Rules

1. **Level 1 (Must Know Now)**: Stream Title, Core Focus, and Evidence-Based "Why".
2. **Level 2 (Should Know Next)**: Core Subject List and Self-Reflection Questions.
3. **Level 3 (Downstream Context)**: Future degree examples after 10+2.
4. **Level 4 (Official Verification)**: Link to JKBOSE portal (`https://jkbose.jk.gov.in`).

---

## 6. Route Guards & Safety Mechanics

- **Route Guard**: Any attempt by a Class 10 profile to visit `/dashboard/directions` or `/dashboard/outcomes` triggers an automatic, graceful client-side redirect to `/dashboard/streams`.
- **State Reset**: Switching Class Level from Class 12 to Class 10 instantly clears any cached UG degree match arrays.

---

## 7. Final Verdict

**VERDICT: `C. VERIFIED — STAGE-AWARE AND STUDENT-CONTEXT AWARE`**
The Class 10 education advisor is strictly isolated, stream-focused, deterministic, and fully aligned with JKBOSE higher secondary policies.
