# CAREERNOVA — COMPLETE CLASS 12 STUDENT JOURNEY AUDIT & LOGIC SPECIFICATION
**SIH25094 | Jammu & Kashmir Education Platform**
**Document Version:** 1.0.0 (Production Verified)
**Session Date:** August 18, 2026

---

## 1. Class 12 Problem Definition & Product Contract

When a student selects `Class 12`, CareerNova enters `POST_12_DECISION_MODE`. The student has completed or is completing Class 12 and has already selected a high school stream (Science, Commerce, or Arts/Humanities).

### Key Contract Rules:
1. **Stream is Qualification Context, NOT Recommendation**: A student with a Commerce background should NOT automatically be forced into B.Com; Science students should NOT automatically receive B.Sc/B.Tech; Arts students should NOT be reduced to generic B.A.
2. **Hard Eligibility Filtering FIRST**: Every post-12 pathway is subjected to prerequisite subject validation before relevance scoring.
3. **Diverse Pathway Universe**: Supports Undergraduate Academic Degrees, Professional Courses (Law, Agriculture, Health), ITI / Skill Diplomas, Polytechnic, Government Examination Pathways (JKSSB/JKPSC entry points), and Postgraduate Progression.

---

## 2. The Three Parallel Class 12 Flows

```
                   CLASS 12 STUDENT PROFILE
                             │
     ┌───────────────────────┼───────────────────────┐
     ▼                       ▼                       ▼
FLOW A: SCIENCE         FLOW B: COMMERCE        FLOW C: ARTS
 (PCM, PCB, PCMB)     (Acct, Econ, BusSt)     (Hist, PolSci, Soc)
     │                       │                       │
     └───────────────────────┼───────────────────────┘
                             ▼
                 FIRST QUESTION GATE:
   "What are you trying to figure out after Class 12?"
   ├── 1. I know what I want to study
   ├── 2. I have some interests but I'm unsure
   ├── 3. I don't know what I want (OPEN EXPLORATION)
   ├── 4. I want a degree vs practical skill training
   ├── 5. I want a government-service pathway
   └── 6. I want to find colleges near me / affordable options
                             │
                             ▼
                  HARD ELIGIBILITY ENGINE
                             │
                             ▼
                 RELEVANCE & SIGNAL MATCHING
```

---

## 3. Signal Vectors & Mathematical Relevance Scoring

The engine evaluates relevance scores ($S_{course}$) using a weighted dot-product formula:

$$S_{course} = W_{interest} \cdot S_{interest} + W_{subject} \cdot S_{subject} + W_{goal} \cdot S_{goal} - W_{aversion} \cdot A$$

Where:
- $S_{interest}$: Signal intensity for interest domain (0.0 to 3.0)
- $S_{subject}$: Academic subject preference bonus (+0.5 if favorite subject aligns)
- $S_{goal}$: Alignment with student's macro-goal (`degrees`, `govt`, `skills`, `local`)
- $A$: Penalty for student-indicated aversions (e.g. `aversion_programming`, `aversion_lab`)

---

## 4. Class 12 Scenario Matrix & Verification Results

| Persona / Scenario | Input Profile & Signals | Top Recommendations | Match Category | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Commerce + Finance** | Commerce, Finance/Acct high, Programming aversion | B.Com General, B.Com Finance & Taxation, BBA | Strong Match | ✅ PASS |
| **Commerce + Tech** | Commerce, Coding/Tech high | BCA, B.Sc Computer Apps (where eligible) | Strong Match | ✅ PASS |
| **Science + Bio/Lab** | Science (PCB), Biology, Lab high, Finance aversion | B.Sc Biotechnology, B.Sc Botany & Chemistry | Strong Match | ✅ PASS |
| **Science + Computing** | Science (PCM), Programming high | BCA, B.Sc Computer Apps | Strong Match | ✅ PASS |
| **Science + Pure Sci** | Science (PCM), Physics/Chemistry high | B.Sc Physics/Math, B.Sc Chemistry | Strong Match | ✅ PASS |
| **Arts + Humanities** | Arts, History/PolSci high, Public Service goal | B.A. Economics & Pol Science, B.A. LLB | Strong Match | ✅ PASS |
| **Class 12 + "I don't know"**| Stream known, Interest unknown | Open Exploration Mode (broad eligible families) | Discovery Mode | ✅ PASS |

---

## 5. Information Density & Progressive Disclosure Architecture

To prevent cognitive overload, content is structured into 4 strict levels:

- **Level 1 — Must Know Now**: Course Title, Stream Eligibility Badge, Brief 2-sentence Focus Summary, and Evidence Rationale.
- **Level 2 — Should Know Next**: Progressive sub-tabs ("What Will I Study?", "Can I Get In?", "Where in J&K?").
- **Level 3 — Deep Details**: Specific curriculum subjects, scholarships, and postgraduate options.
- **Level 4 — Source & Session**: J&K Higher Education Directorate 2026–27 session verification tags.

---

## 6. Automated & Browser Test Suite Execution

All logic contracts are validated using automated test scripts:
- `scripts/test-recommendations.ts`: Validates stage gating, signal scoring, hard eligibility, and determinism.
- `scripts/test-class12-journeys.ts`: Validates scenario matrix coverage across Science, Commerce, and Arts.

---

## 7. Final Verdict

**VERDICT: `C. VERIFIED — CLASS 12 STUDENT JOURNEY WORKS`**
The CareerNova Class 12 recommendation engine is stage-aware, stream-aware, subject-aware, deterministic, and fully backed by verified J&K 2026–27 institutional data.
