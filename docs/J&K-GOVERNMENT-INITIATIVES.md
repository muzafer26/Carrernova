# J&K GOVERNMENT INITIATIVES & MANZILEIN CASE STUDY
## SIH25094 | Analysis of State Career Initiatives & Decision Layer Value

**Document Version:** 2.0  
**Date:** August 17, 2026  
**Role:** Senior Product Architect & Domain Researcher  

---

## 1. MANZILEIN (J&K CAREER PORTAL) — CRITICAL CASE STUDY

### A. Context & Purpose
**Manzilein** (launched under the J&K School Education Department in collaboration with UNICEF and iDreamCareer) was established as a centralized career guidance portal for secondary and higher secondary school students in Jammu & Kashmir. Its goal was to aggregate static information regarding careers, colleges, entrance exams, and scholarships into a single web portal (`manzilein.in`).

### B. Analytical Case Study Matrix

| Evaluation Dimension | Manzilein Portal (Historical Initiative) | CareerNova Decision Layer (SIH25094) |
|---|---|---|
| **Target Student** | Class 9–12 school students seeking broad career information. | Post-Class 10 & 12 J&K students facing active educational transitions. |
| **Core Delivery** | Static directory of careers, entrance exams, and college cards. | Interactive **Decision Layer** providing eligibility filtering, decision shortlisting, and side-by-side comparison. |
| **Pathway Scope** | Focused primarily on traditional degrees & standard careers. | Supports 9 Pathway Families including ITI Trades, Polytechnics, Professional Degrees (Law/Agri), and Backward Govt Exam Maps. |
| **NEP-2020 FYUGP Alignment** | Legacy pre-NEP structure. | 100% Aligned with NEP-2020 Four-Year Undergraduate Programme statutes under J&K Samarth. |
| **Decision Support** | Reads like a career encyclopedia; student must infer eligibility. | Hard-filters eligibility by stream/subjects; generates personal decision summary & official portal handoffs. |
| **Current Status** | **AVAILABLE BUT LEGACY / UNCERTAIN STATUS.** Often inaccessible or out of sync with current J&K Samarth 2026-27 admission portal. | **ACTIVE VERIFIED SYSTEM.** 100% Sourced against active 2026–27 J&K government portals. |

### C. Architectural Takeaway
CareerNova does **NOT** attempt to be "Manzilein 2.0". It solves the **NEXT** problem: while information exists across government portals, students still struggle to connect, compare, and decide. CareerNova acts as the intelligent orchestration layer above government data sources.

---

## 2. OTHER RELEVANT J&K STATE INITIATIVES

1. **Aao Baat Karein (J&K Directorate of School Education Guidance Helpline):**
   - *Purpose:* Mental health and tele-counselling helpline for school students.
   - *CareerNova Role:* CareerNova contextually links students seeking clinical emotional support to official helplines rather than attempting to deliver fake AI therapy.
2. **PM-SETU / J&K Skill Development Mission (JKSDM):**
   - *Purpose:* Short-term skill training, NSQF modules, and IndiaSkills 2026-27 competitions.
   - *CareerNova Role:* Surfaces NSQF Level 4/5 skill certificates as first-class decision routes in `/dashboard/skills`.
3. **AICTE PMSSS J&K (Prime Minister's Special Scholarship Scheme):**
   - *Purpose:* Financial aid providing maintenance allowance (₹1 Lakh/yr) and academic fee waiver for J&K youth.
   - *CareerNova Role:* Dynamically matches PMSSS eligibility inside the Decision Workspace based on student stage and stream.
