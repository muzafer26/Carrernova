# CAREERNOVA — PROBLEM MODEL & DECISION FLOW
## SIH25094 | J&K Student Decision Problem Specification

**Document Version:** 3.0  
**Date:** August 17, 2026  

---

## 1. THE STUDENT UNCERTAINTY MATRIX

```
                          STUDENT UNCERTAINTY
                                   │
      ┌────────────────────────────┼────────────────────────────┐
      ▼                            ▼                            ▼
Stage Identification      Pathway Discovery            Eligibility & Location
 - Where am I?             - Degrees vs ITI Skills?     - Do I qualify?
 - Stream choice fit?      - Govt Exam Cadres?          - Where in J&K can I study?
      │                            │                            │
      └────────────────────────────┼────────────────────────────┘
                                   ▼
                       DECISION & WHY ENGINE
                        - "Why is this shown to me?"
                        - Side-by-Side Heterogeneous Comparator
                        - Matched Scholarships (PMSSS/NSP)
                        - Official Portal Handoff
```

---

## 2. COMPREHENSIVE QUESTION MATRIX

| Student Question | System Capability | Target Route | Status |
|---|---|---|---|
| "What options exist after Class 10?" | Stream guidance & subject core breakdown | `/dashboard/streams` | **PASSED** |
| "What degrees exist after Class 12?" | Stream-filtered academic & professional degree explorer | `/dashboard/directions` | **PASSED** |
| "What non-degree/skill options exist?" | Standalone ITI & NSQF vocational certificate explorer | `/dashboard/skills` | **PASSED** |
| "How do I become a Gazetted Officer / Nurse?" | Backward educational maps (JKPSC / JKSSB / JKBOPEE) | `/dashboard/govt-pathways` | **PASSED** |
| "Where can I study locally?" | District-filtered Government Degree College (GDC) finder | `/dashboard/colleges` | **PASSED** |
| "Why is this option being shown to me?" | Integrated Why Engine (Evidence-backed rationale) | Universal Pathway Cards | **PASSED** |
| "How do I compare options?" | Side-by-side heterogeneous Decision Workspace | `/dashboard/compare` | **PASSED** |
| "What financial support exists?" | Contextual PMSSS AICTE & NSP scholarship matcher | `/dashboard/compare` | **PASSED** |
| "What official portal do I use?" | Direct handoffs to Samarth, DSD, JKPSC, JKSSB | `/dashboard/nextstep` | **PASSED** |
