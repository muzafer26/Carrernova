# PS-09 — CAREERNOVA RECOMMENDATION ENGINE FINAL AUDIT & REPAIR REPORT
**Document ID:** `PS09-RECOMMENDATION-ENGINE-FINAL-AUDIT.md`  
**Target System:** CareerNova Guided Student Journey & Advisor Engine (SIH25094)  
**Date:** August 17, 2026  
**Status:** COMPLETE & VERIFIED  

---

## 1. CURRENT BUG
Prior to this P0 repair, student recommendations exhibited arbitrary and unaligned course suggestions:
- A student choosing **Finance / Accounting / Business** interests in the quiz was assigned **B.Sc Computer Science / Computer Applications** if qualified for Science.
- A student choosing **Biotechnology / Biology / Laboratory Science** received the exact same **B.Sc Computer Application** top recommendation.
- Students were presented with static, direction-based course lists regardless of individual quiz sub-signals.

---

## 2. ROOT CAUSE
1. **Direction-Level Bottleneck:** The previous engine only scored 3 broad direction categories (`sciences`, `commerce-management`, `arts-humanities`). It did not rank individual courses (`Course` entities).
2. **Static Array Ordering:** Courses inside directions were displayed in raw file array order. In `sciences`, `bsc-computer-application` was index `0`, making it appear first for any Science student regardless of interest.
3. **Signal Discard:** The quiz collected granular sub-signals (`technical`, `lab`, `financial`, `business`, etc.) but discarded them when computing `computedWeights`, keeping only broad category totals.
4. **Conflation of Hard Eligibility & Soft Relevance:** Qualification prerequisites were not separated from student interest/activity preferences.

---

## 3. EXISTING VS. NEW ARCHITECTURE

### Old Pipeline (Faulty)
`Quiz Answers -> Direction Scores (3 broad categories) -> Static Course Array Order -> Display`

### New 2-Layer Pipeline (Verified)
`Quiz Answers -> Full AssessSignalVector (v2) -> Layer A Hard Qualification Check -> Layer B Course-Level Feature Scoring -> Deterministic Tie-Break -> Course-Level Recommendations with Rationale`

---

## 4. NEW SIGNAL MODEL (`AssessSignalVector`)
Preserves 27 explicit signal dimensions:
- **Tech & Compute:** `technology`, `programming`, `quantitative`, `analytical`
- **Life Sciences:** `biological`, `laboratory`, `scientific`, `research`
- **Commerce & Business:** `financial`, `business`, `management`
- **Humanities & Society:** `humanities`, `social`, `languages`, `publicService`, `communication`
- **Aversions:** `aversion_lab`, `aversion_math`, `aversion_financial`, `aversion_writing`, `aversion_programming`
- **Decision State:** `uncertainty`, `certainty`

---

## 5. QUALIFICATION MODEL (LAYER A)
- **Class 10 Guard:** Class 10 students receive 0 undergraduate course recommendations (Redirected to Stream & ITI Exploration).
- **Stream Prerequisites:** Evaluates `profile.stream` against course prerequisites (e.g. `bsc-biotechnology` strictly requires PCB/PCMB Science stream).

---

## 6. COURSE RECOMMENDATION FEATURE VECTORS
Each J&K degree program declares explicit feature signals (0–5 scale):
- `bcom`: `{ financial: 5, business: 5, quantitative: 4, management: 3 }`
- `bsc-biotechnology`: `{ biological: 5, laboratory: 5, scientific: 5, research: 4 }`
- `bca`: `{ technology: 5, programming: 5, analytical: 4, quantitative: 3 }`
- `ba-economics-polscience`: `{ financial: 4, quantitative: 4, humanities: 4, analytical: 5, publicService: 4 }`
- `ballb-integrated`: `{ publicService: 5, humanities: 4, social: 4, communication: 5 }`

---

## 7. SCORING FORMULA (LAYER B)
```
courseScore = 
  20 (Hard Eligibility Base)
  + interestMatchScore (0 to 25 pts)
  + signalDotProduct (0 to 35 pts)
  + goalAlignmentBonus (0 to 10 pts)
  - aversionPenalty (0 to -15 pts)
  + localCollegeVerificationBonus (0 to 10 pts)
```
Scores are normalized to 0–100 and mapped to transparent categories:
- **Strong Match:** >= 75
- **Good Match:** 55–74
- **Worth Exploring:** 35–54
- **Possible Option:** < 35

---

## 8. EXPLANATION MODEL
Every recommendation displays evidence-based rationale:
- *Example:* "B.Com appears as a Strong Match because: Matches 2 of your selected interest areas (Finance, Business); Strong alignment with your quiz activity & subject preference signals; Verified Government College offering this course exists in District Jammu."

---

## 9. UNCERTAINTY & AVERSION BEHAVIOR
- **High Uncertainty (`uncertainty >= 2`):** Suppresses forced ranking and presents broad exploration categories with neutral messaging.
- **Aversions:** Reduces relevance score (e.g. -12 points for laboratory work if `aversion_lab` is checked) without invalidating academic eligibility.

---

## 10. STATE INVALIDATION & VERSIONING
- `assessmentVersion: "v2"` is persisted with quiz weights.
- When Class or Stream is updated, assessment weights reset completely to prevent state contamination.

---

## 11. DETERMINISM & TIE-BREAKING
Zero non-deterministic factors (no random numbers, no array order accidents):
1. Score descending
2. Direct interest match count descending
3. Course key alphabetical order

---

## 12. TEST MATRIX & REGRESSION SCENARIOS

| Persona Profile | Stream | Key Quiz Signals | Expected Top Course | Result |
| :--- | :--- | :--- | :--- | :--- |
| **Finance Student** | Commerce | Financial (2.5), Business (2.0), Aversion Programming (1.0) | `bcom` / `bba` | **PASS** |
| **Biotech Student** | Science (PCB) | Biological (3.0), Lab (2.5), Scientific (2.0) | `bsc-biotechnology` | **PASS** |
| **Programming Student** | Science (PCM) | Technology (3.0), Programming (3.0), Analytical (2.0) | `bca` / `bsc-computer-application` | **PASS** |
| **Public Service Student** | Arts | Humanities (2.5), Public Service (2.5), Goal: Govt | `ba-economics-polscience` / `ballb` | **PASS** |
| **Class 10 Student** | General | N/A | 0 UG Degrees (Redirect to Streams) | **PASS** |

---

## 13. FINAL ACCEPTANCE VERDICT

**C. VERIFIED — COURSE RECOMMENDATION ENGINE IS DETERMINISTIC AND STUDENT-CONTEXT AWARE**
