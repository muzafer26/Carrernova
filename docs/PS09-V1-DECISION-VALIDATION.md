# PS-09 Real Student Decision Validation Specifications
**System:** CareerNova (SIH25094)  
**Date:** 2026-08-16  

---

## 1. Objective & Scope

This document specifies the end-to-end decision validation matrix for CareerNova V1 before executing interactive browser journey tests. The goal is to prove that a confused J&K student can move from uncertainty to an actionable next educational step with 100% qualification-safe, source-backed guidance.

---

## 2. Complete Journey Test Matrix

### Journey A: Class 10 Stream Exploration
* **Input:** Class = 10.
* **Flow:** `/dashboard/profile` → `/dashboard/streams` → `/dashboard/directions`.
* **Verification Checks:**
  1. Profile setup redirects Class 10 to `/dashboard/streams`.
  2. `/dashboard/streams` displays Science, Commerce, Arts stream breakdowns, core subjects, and key questions to consider.
  3. Direct navigation to `/dashboard/directions` safely yields zero undergraduate course or GDC recommendations.
  4. Attached source points to JKBOSE Official Portal (`https://jkbose.jk.gov.in`).
  5. Refreshing, going back, or changing stream clears any stale assessment weights.

---

### Journey B: Class 12 PCM Profiles
* **Input:** Class = 12, Stream = Science (PCM).
* **Sub-Profile B1 (Programming & Logic):** Computational signals + building apps + math affinity.
  * *Expected Output:* Ranks `sciences` top; highlights B.Sc Computer Application & BCA with computer applications rationale.
* **Sub-Profile B2 (Technology without Programming):** Digital tools + design + working with people + aversion to coding.
  * *Expected Output:* Ranks `sciences` / `commerce-management` with non-coding technology/digital business guidance notes; does not claim student "must be a programmer".
* **Sub-Profile B3 (Analytical Math & Physics):** Physics + pure analytical math + no computer preference.
  * *Expected Output:* Ranks `sciences` with physical/mathematical sciences focus; distinguishes rationale from software/coding paths.

---

### Journey C: Class 12 PCB Profiles
* **Input:** Class = 12, Stream = Science (PCB).
* **Verification Checks:**
  1. Qualifies for `sciences` (B.Sc Biotechnology, B.Sc Botany & Chemistry).
  2. Hard qualification filter strictly blocks PCM-only degrees if student lacks mathematics.
  3. Soft lab aversion penalty lowers laboratory science rank without eliminating PCB eligibility.

---

### Journey D: Class 12 Commerce Profiles
* **Input:** Class = 12, Stream = Commerce.
* **Sub-Profiles:**
  - Accounting Focus → Ranks `commerce-management` (B.Com).
  - Management & Business Focus → Ranks `commerce-management` (BBA / B.Com).
  - Technical / Digital Interest → Ranks `commerce-management` (BCA path accessible to Commerce with CS/Math background under University of Jammu statutes).
* **Verification Checks:**
  1. Commerce profiles are strictly blocked from PCB-only Science degrees (e.g., B.Sc Biotech).
  2. Course eligibility notes explicitly cite statutory minimums from University of Jammu Department of Commerce.

---

### Journey E: Class 12 Arts Profiles
* **Input:** Class = 12, Stream = Arts.
* **Verification Checks:**
  1. Qualifies for `arts-humanities` (B.A. Humanities & Social Sciences).
  2. Qualifies for open-discipline degrees (e.g. BBA / BCA where 10+2 open entry is permitted under university statutes).
  3. Hard filter blocks Science PCB-only degrees.

---

## 3. Contradiction & Uncertainty Test Cases

| Scenario ID | Student Input Combination | Expected System Rationale & Guidance Behavior |
|---|---|---|
| **CONTRA-01** | Technical interest + Coding aversion | Ranks tech-adjacent digital management/applications; appends explanatory note: *"Includes technology applications that do not require pure software coding."* |
| **CONTRA-02** | Science PCB + Lab work aversion | Retains PCB science eligibility; appends explanatory note: *"Note: You expressed a preference to avoid laboratory work..."* |
| **CONTRA-03** | Commerce + Heavy accounting aversion | Elevates BBA / Management path over heavy financial accounting B.Com modules. |
| **UNCERT-01** | All "I don't know" assessment selections | Suppresses artificial score multipliers; returns all stream-eligible directions with equal standing and honest text: *"You haven't expressed a strong preference yet. Here are some areas you can explore based on your Class 12 stream."* |

---

## 4. 7-Course Decision Chain Matrix

| Course Key | Parent Direction | Hard Stream Qualification | Statutory Eligibility (Verified Source) | Verified College Mapping | Post-UG Pathway / Exam | Official Ecosystem Link |
|---|---|---|---|---|---|---|
| `bsc-computer-application` | `sciences` | PCM / CS / IT | Min 45% (40% Reserved) in 10+2 PCM (JU Statutes) | GDC Kathua, GDC Akhnoor | M.Sc Computer Science / MCA (CUET-PG SCQP09) | J&K Samarth Admission Portal |
| `bsc-biotechnology` | `sciences` | PCB / PCMB | Min 50% (45% Reserved) in 10+2 PCB (JU Biotech Notification) | GDC Kathua | M.Sc Biotechnology (GAT-B Entrance Test) | J&K Samarth Admission Portal |
| `bsc-botany-chemistry` | `sciences` | PCB / PCMB | Min 45% (40% Reserved) in 10+2 PCB (JU Statutes) | GDC Kathua | M.Sc Botany / M.Sc Chemistry (CUET-PG) | J&K Samarth Admission Portal |
| `bcom` | `commerce-management` | Commerce / PCM / Arts | Min 45% (40% Reserved) in 10+2 (JU Commerce Statutes) | GDC Kathua, GDC Akhnoor | M.Com / ICAI Direct Entry / MBA | University of Jammu / Samarth |
| `bba` | `commerce-management` | Any Stream | Min 50% (45% Reserved) in 10+2 (GDC Kathua Prospectus) | GDC Kathua | MBA (CMAT / CUET-PG) | J&K Samarth Admission Portal |
| `bca` | `commerce-management` | Any Stream + Math/CS | Min 45% in 10+2 with Math/CS (JU BCA Statutes) | GDC Kathua, GDC Akhnoor | MCA / M.Sc IT (CUET-PG SCQP09) | J&K Samarth Admission Portal |
| `ba-humanities` | `arts-humanities` | Any Stream | Min 45% (40% Reserved) in 10+2 (JU Statutes) | GDC Kathua, GDC Akhnoor | M.A. / B.Ed / JKPSC CCE / JKSSB | J&K Samarth / JKPSC Portal |

---

## 5. Realistic Student Validation Scenario

* **Profile:** Class 12 Commerce student who is confused, likes technology/computers, does not know if they want to code, and wants to understand what B.Com, BBA, or BCA actually lead to.
* **Target Outcome:**
  1. System accepts uncertainty without forcing a single career prediction.
  2. Shows Commerce & Management and Computer Applications paths eligible for Commerce.
  3. Explains statutory application eligibility for B.Com, BBA, and BCA clearly.
  4. Maps verified local institutions (GDC Kathua, GDC Akhnoor).
  5. Links post-UG pathways (M.Com, MBA, MCA via CUET-PG).
  6. Routes student to J&K Samarth Admission Portal (`jkadmissions.samarth.ac.in`) as their next decision action.
