# PS-09 — Final Product-Problem Reconstruction & Logic Audit
**Project:** CareerNova-AI (SIH25094) — One-Stop Personalized Career & Education Advisor (Jammu & Kashmir)  
**Audit Date:** August 16, 2026  
**Auditor:** Antigravity AI (Product & Decision Logic Authority)

---

> [!IMPORTANT]
> **AUDIT MANDATE & CORE PRODUCT POSITIONING**
> 
> CareerNova is engineered specifically to solve **SIH25094** for Jammu & Kashmir students.
> It is **NOT** a generic career predictor, personality test, job board, salary estimator, or generic national portal.
> 
> **The Core Student Problem:**
> Confused J&K students after Class 10 and Class 12 lack localized, reliable, and source-backed educational guidance. This creates uncertainty regarding:
> 1. The long-term value of graduation vs. immediate short-term skill options.
> 2. What specific undergraduate degrees actually unlock in terms of curriculum, higher study, and career fields.
> 3. Which verified Government Degree Colleges (GDCs) in J&K offer those programs.
> 4. What official admission next steps they must take.

---

## 1. Product Audit Against Core SIH25094 Problem

### The SIH25094 Decision Gap
SIH25094 highlights that students in J&K suffer from poor academic decision-making, dropout risks, and migration to expensive private institutions due to a lack of awareness about local government colleges and degree pathways.

### The Authoritative Student Decision Question
> *"If a genuinely confused J&K student enters CareerNova and says: 'I don't know what I want to study or what career is right for me,' does CareerNova actually help that student discover, understand, narrow, and decide?"*

### Audit Verdict: YES, with targeted logic enhancements.
CareerNova's model is **Exploration-First**, treatable as:
`CONFUSION → UNDERSTAND POSITION → EXPLORE INTERESTS / UNFAMILIAR AREAS → DISCOVER PATHS → UNDERSTAND EACH PATH → COMPARE OPTIONS → CHECK QUALIFICATION → SEE LOCAL GDCs → UNDERSTAND FUTURE OPTIONS → MAKE DECISION → TAKE OFFICIAL NEXT STEP`.

---

## 2. Feature & Route Classification (KEEP / REDESIGN / MERGE / REMOVE)

| Page / Component | Core Student Question Answered | Decision Value & Action Enabled | Classification | Required Enhancement |
| :--- | :--- | :--- | :---: | :--- |
| **`/dashboard/profile`** | "Where am I currently in my studies?" | Initializes Class 10 vs. Class 12 boundary & stream selection. | **KEEP** | Enforce strict Class 10/12 separation & state clearing on stream edits. |
| **`/dashboard/streams`** | "What streams can I choose after Class 10 and what do they keep open?" | Explains JKBOSE faculty streams, subject areas, and illustrative future paths for Class 10. | **KEEP** | Maintain absolute isolation from UG degrees & GDCs. |
| **`/dashboard/assess`** | "What activities or problem styles am I curious to explore?" | 7-question curiosity & work-style self-exploration exercise. Handles "I don't know" and aversion. | **REDESIGN** | Frame strictly as curiosity exploration (not a career prediction test). Ensure "I don't know" unlocks open exploration mode. |
| **`/dashboard/directions/`** | "Which general fields of study suit my stream qualification?" | Displays qualified directions (Sciences, Commerce, Arts) with plain-language alignment rationale. | **KEEP** | Core direction discovery list. |
| **`/dashboard/directions/$key`** | "What is this field, what degrees exist, what will I study, what are statutory eligibility rules, and what short-term skill routes exist?" | Deep path understanding with core curriculum modules, statutory eligibility, GDCs, and side-by-side Degree vs. Skill trade-offs. | **KEEP** | Essential path-understanding route. Fulfills 100% of path clarity requirements. |
| **`/dashboard/outcomes/$key`** | "What can this degree lead toward in higher studies, exams, or career fields?" | Verified course-specific higher study pathways (CUET-PG, MCA, M.Com, MBA, B.Ed) & exams (JKPSC, JKSSB). | **KEEP** | Source-backed future study/exam possibilities without false job promises. |
| **`/dashboard/colleges`** | "Which nearby Government Degree Colleges in J&K offer this program?" | Verified GDCs across Jammu & Kashmir filtered by course and district. | **KEEP** | Connects degree choices to verified local government colleges. |
| **`/dashboard/compare`** | "How do two options differ in curriculum, math/tech intensity, eligibility, colleges, and skill routes?" | Side-by-side comparison of 2 education paths. | **REDESIGN** | Enhance to allow comparing specific courses (e.g. B.Com vs BBA vs BCA) alongside broad directions, highlighting key differences in curriculum & technical intensity. |
| **`/dashboard/resources`** | "Where can I find authoritative links to official J&K portals?" | Categorized portal directory. | **KEEP** | Stage-aware official resource repository. |
| **`/dashboard/nextstep`** | "What is my exact official next action?" | Stage-aware official handoff (JKBOSE/NSP for Class 10; J&K Samarth/JU/KU/JKBOPEE/PMSSS for Class 12). | **KEEP** | Direct official next step guidance. |
| **`/dashboard/mentor`** | "I have specific questions about J&K degrees, GDCs, or admission rules." | Grounded AI advisor. | **REDESIGN** | Pass student profile context (Class, Stream, Selected Course) into system prompt so mentor responses are stage-aware and qualified. |

---

## 3. Core Logic Rules & Constraints

1. **Qualification ≠ Interest:**
   - Academic eligibility (stream & class level) is a **hard filter** applied BEFORE soft interest ranking.
   - Soft interest signals never bypass statutory eligibility. A PCB student expressing interest in programming is guided toward BCA (which permits any 10+2 stream with 45%), while B.Sc Computer Application explicitly states its statutory requirement of PCM/CS at 10+2.
2. **"I Don't Know" is a Valid State:**
   - Selecting "I don't know" does not force a confidence score or fabricate predictions. It triggers an **Open Exploration Mode** that presents all qualified directions with clear explanations of what each field involves.
3. **Degree vs. Skill Route Trade-Off:**
   - Every program card presents a realistic, neutral comparison between:
     - **4-Year Degree Route (NEP FYUGP):** Broad analytical foundation, PG eligibility (CUET-PG, MCA, M.Com, MBA, B.Ed), JKPSC administrative eligibility.
     - **Short-Term Skill Alternative (NSQF / ITI / JKSDM):** Practical job-oriented certificate/diploma focusing on immediate technician/support roles (e.g., Computer Hardware, Medical Lab Tech, Tally/GST, Retail Sales).
   - No false promises ("skill course = quick job" or "degree = guaranteed high salary").
4. **Government Degree College Purpose:**
   - Connects degree programs directly to verified local J&K GDCs in both Jammu and Kashmir Divisions (GDC Kathua, GDC Akhnoor, GDC Baramulla, GDC Boys Anantnag, GDC Boys Sopore), reinforcing government colleges as high-value local educational destinations.

---

## 4. Golden Student Journey Scenarios (Validation Matrix)

| Scenario | Student Situation | Before CareerNova | After CareerNova | Decision & Next Action |
| :---: | :--- | :--- | :--- | :--- |
| **A** | Confused Class 10 student | Unsure what streams exist in Class 11/12 or what they keep open. | Understands JKBOSE Science, Commerce, and Arts faculties, core subject areas, and illustrative future paths. | Identifies preferred stream options to discuss with school. |
| **B** | Commerce student interested in tech | Thinks only Science students can do computer studies. | Discovers BCA under Commerce/Management (which permits Commerce 10+2), while learning B.Sc CS requires PCM. | Shortlists BCA, checks local GDCs offering BCA (GDC Kathua, GDC Baramulla, GDC Anantnag). |
| **C** | PCB student interested in programming | Unsure if medical/PCB background locks them out of tech. | Learns BCA accepts any 10+2 stream with 45%, while B.Sc CS requires PCM. | Chooses BCA as a qualified tech route; checks J&K Samarth application process. |
| **D** | PCM student interested in biology | Wants to explore biological sciences without PCB. | Learns B.Sc Biotechnology requires PCB/PCMB with Biology; sees B.Sc Botany/Chemistry requirements. | Evaluates dual PCMB options or shifts to computer/applied science degrees. |
| **E** | Student answers "I don't know" | Extremely confused, lacks clear interest signals. | Receives Open Exploration list of all stream-qualified directions with plain explanations. | Inspects core modules of each qualified field to build preference signals. |
| **F** | Student considering short skill course vs degree | Unsure whether 4-year degree is worth the time compared to ITI diploma. | Compares 4-year degree (FYUGP, PG/exam eligibility) vs 6-12 mo NSQF skill certificate side-by-side. | Decides whether immediate technician entry or long-term academic degree matches their goal. |
| **G** | Student comparing B.Com vs BBA vs BCA | Unsure how Commerce degrees differ from Business or IT degrees. | Side-by-side comparison of curriculum focus, math/tech intensity, and career/PG outcomes. | Chooses the degree matching their preferred style of work. |
| **H** | Student ready to apply in J&K | Doesn't know where or how to apply for GDC admission. | Sees verified GDCs offering their chosen course and receives direct link to J&K Samarth portal. | Visits official `https://jkadmissions.samarth.ac.in` portal to apply. |

---

## 5. Planned Logic Enhancements for Implementation

1. **Refine `/dashboard/compare` Route:**
   - Support selecting specific courses (e.g. `bcom` vs `bba` vs `bca`, or `bsc-computer-application` vs `bca`) in addition to broad directions, displaying side-by-side curriculum focus, math/tech intensity, statutory eligibility, GDC availability, and skill alternatives.
2. **Context-Aware AI Mentor (`/dashboard/mentor`):**
   - Inject the student's active profile (Class, Stream, Selected Course) into the system prompt of the AI Mentor so responses are automatically stage-aware, qualified, and localized to J&K.

---

## 6. Conclusion & Next Steps

The audit confirms that CareerNova's underlying architecture and data model are directly aligned with SIH25094. Proceeding to Phase 2 (Implementation of targeted logic enhancements on `/dashboard/compare` and `/dashboard/mentor`).
