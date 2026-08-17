# CAREERNOVA — THE "WHY ENGINE" SPECIFICATION
## SIH25094 | Evidence-Backed Pathway Rationale Framework

**Document Version:** 1.0  
**Date:** August 17, 2026  

---

## 1. PHILOSOPHY OF THE WHY ENGINE

CareerNova does not simply present a list of courses. For every stream, course, ITI trade, government exam roadmap, or scholarship shown to a student, the system generates an evidence-backed **Rationale Matrix** answering:

> *"WHY is this option being shown to ME?"*  
> *"WHAT does this option NOT guarantee?"*

---

## 2. RATIONALE MATRIX STRUCTURE

Every pathway recommendation must present two distinct blocks:

### A. "WHY THIS PATHWAY IS SHOWN TO YOU" (Evidence-Backed Factors)
1. **Prerequisite Fit:** Verified alignment with student's Class 10/12 stream & subjects (e.g. *"Class 12 PCB satisfies statutory requirement for B.Sc Nursing / NEET"*).
2. **Preference Alignment:** Matches student's stated learning style (e.g. *"Matches preference for hands-on technical/laboratory training over pure theoretical lectures"*).
3. **Local Availability:** Verified availability within J&K colleges or district (e.g. *"Available at GDC Kathua & GDC Baramulla"*).
4. **Progression Roadmap:** Verified higher-study or professional progression (e.g. *"Unlocks M.Sc Biotechnology, CSIR-NET Research, or ICAR entrances"*).
5. **Financial Support:** Contextually matched scholarship schemes (e.g. *"Eligible for AICTE PMSSS J&K maintenance allowance up to ₹1.0 Lakh/year"*).

### B. "WHAT THIS OPTION DOES NOT GUARANTEE" (Honest Boundaries)
1. **No Job Guarantee:** *"Completion of this programme does not guarantee immediate employment."*
2. **Dynamic Cutoffs:** *"Admission is subject to current seat matrix and entrance merit cutoffs on the official portal."*
3. **Selection Exams:** *"Government service requires clearing competitive examinations (JKPSC / JKSSB) post-qualification."*

---

## 3. IMPLEMENTATION IN CODEBASE

The Why Engine is implemented via pure helper functions in `src/lib/why-engine.ts` and rendered across course cards, skill cards, government exam cards, and the Decision Workspace (`/dashboard/compare`).
