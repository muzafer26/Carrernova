# Jammu & Kashmir Official Education Ecosystem Research Map
**System:** CareerNova (SIH25094)  
**Date:** 2026-08-16  
**Scope:** Authoritative Primary Government & University Information Portals in J&K  

---

## 1. Overview & Ecosystem Architecture

The education ecosystem in Jammu & Kashmir is governed by distinct statutory and administrative bodies across school education, general higher education, professional education, and financial support. CareerNova functions as the **guidance and decision-support layer** built on top of this official ecosystem, intentionally avoiding the duplication of application portals, merit list engines, or administrative portals.

```
                  ┌────────────────────────────────────────────────────────┐
                  │          OFFICIAL J&K GOVERNMENT & UNIVERSITY          │
                  │                   INFORMATION PORTALS                  │
                  └───────────────────────────┬────────────────────────────┘
                                              │
                                              ▼
                  ┌────────────────────────────────────────────────────────┐
                  │                      CAREERNOVA                        │
                  │        (Decision, Guidance & Exploration Layer)        │
                  └───────────────────────────┬────────────────────────────┘
                                              │
                                              ▼
                  ┌────────────────────────────────────────────────────────┐
                  │                 STUDENT NEXT DECISION                  │
                  │   (Select Stream / Apply on Samarth / Check PMSSS)     │
                  └────────────────────────────────────────────────────────┘
```

---

## 2. Comprehensive Source Group Analysis

### Source Group A: School Education
* **Primary Authority:** J&K Board of School Education (JKBOSE) & J&K School Education Department.
* **Official Portals:** `https://jkbose.jk.gov.in` (also `https://jkbose.nic.in`).
* **What Government Provides:** Class 10 & 12 syllabi, scheme of studies, subject combinations, examination timetables, and re-evaluation notices.
* **What Student Must Figure Out:** 
  * How choice of subjects in Class 11 (e.g. PCM vs PCB vs Commerce vs Arts) restricts or opens higher education eligibility 2 years later.
  * Which stream aligns with their activity preferences and curiosity without assuming a specific career outcome.
* **CareerNova Role:** Provides Class 10 stream exploration, subject breakdowns, and key questions to consider before subject registration on JKBOSE.

---

### Source Group B: J&K Higher Education & Samarth Ecosystem
* **Primary Authority:** J&K Higher Education Department & Directorate of Colleges.
* **Official Portals:** `https://jkadmissions.samarth.ac.in` (J&K Samarth Admission Portal).
* **What Government Provides:** Centralized e-governance admission portal for Four-Year Undergraduate Programmes (FYUGP) under NEP 2020 across all Government Degree Colleges (GDCs) in J&K. Handles online preference filling, seat allocation rounds, and merit list publication.
* **What Student Must Figure Out:** 
  * Which degree major/minor combination matches their 10+2 stream eligibility.
  * Which specific GDCs offer their desired programme (programmes vary by college).
  * The difference between CUET-UG and Non-CUET merit admission phases.
* **CareerNova Role:** Connects student qualification + exploration signals to verified degree courses and institutional availability *before* the student submits preferences on Samarth.

---

### Source Group C: University of Jammu Ecosystem
* **Primary Authority:** University of Jammu (JU).
* **Official Portals:** `https://jammuuniversity.ac.in`.
* **What Government Provides:** Academic statutes, affiliation rules for GDCs in Jammu Division (e.g., GDC Kathua, GDC Akhnoor, GDC Udhampur, GDC Poonch), minimum qualifying marks for UG/PG programs, and postgraduate entrance notifications.
* **What Student Must Figure Out:** Statutory minimum academic eligibility (e.g., 45% aggregate for Open, 40% for Reserved categories) and post-UG study pathways (M.Sc, M.Com, M.A., MCA).
* **CareerNova Role:** Maps University of Jammu degree offerings and statutory eligibility rules to verified direction cards.

---

### Source Group D: University of Kashmir Ecosystem
* **Primary Authority:** University of Kashmir (KU).
* **Official Portals:** `https://www.kashmiruniversity.net`.
* **What Government Provides:** Academic statutes and affiliation directory for GDCs across Kashmir Division (districts including Anantnag, Baramulla, Budgam, Ganderbal, Kupwara, Pulwama, Shopian, Kulgam, Srinagar, Bandipora), FYUGP curriculum structure, and PG entrance examinations (KUET).
* **What Student Must Figure Out:** Institutional availability of specialized majors (e.g., Media Studies, Environmental Science, Arabic, Kashmiri) in Kashmir Division GDCs.
* **CareerNova Role:** Integrates Kashmir Division GDC institutional mapping and university statutory eligibility alongside Jammu Division options.

---

### Source Group E: Professional Education (JKBOPEE)
* **Primary Authority:** J&K Board of Professional Entrance Examinations (JKBOPEE).
* **Official Portals:** `https://www.jkbopee.gov.in`.
* **What Government Provides:** Entrance examinations, merit rank generation, and state-level counselling for professional programs (MBBS, BDS, B.Tech/B.E., B.Sc Nursing, Paramedical, Agriculture).
* **What Student Must Figure Out:** When a professional entrance pathway applies versus a general university degree, and what qualifying subjects/cutoff trends apply.
* **CareerNova Role:** Contextual routing—directing students to JKBOPEE *only* when they explore professional health, engineering, or paramedical paths.

---

### Source Group F: Scholarships & Financial Support
* **Primary Authorities:** AICTE (Ministry of Education) & Ministry of Electronics & IT (NSP).
* **Official Portals:**
  * **PMSSS J&K:** `https://www.aicte-jk-scholarship-gov.in`
  * **National Scholarship Portal:** `https://scholarships.gov.in`
* **What Government Provides:** Financial support schemes, fee waivers, and maintenance allowances for eligible J&K students pursuing higher education inside and outside the UT.
* **What Student Must Figure Out:** Scholarship eligibility rules (e.g. domicile requirements, family income caps, 10+2 stream criteria) before deadlines pass.
* **CareerNova Role:** Highlights relevant official scholarship schemes alongside verified degree programs so financial constraints do not block exploration.

---

### Source Group G: Entrance Examinations
* **Primary Authorities:** National Testing Agency (NTA), JKBOPEE, University Bodies.
* **Official Portals:** `https://pgcuet.samarth.ac.in` (CUET-PG), `https://cuet.samarth.ac.in` (CUET-UG).
* **What Government Provides:** National and state testing frameworks for undergraduate and postgraduate admissions.
* **CareerNova Role:** Maps entrance requirements (e.g., CUET-PG SCQP09 for MCA) directly to relevant post-undergraduate study pathways.

---

### Source Group H: Government Career / Recruitment Pathways
* **Primary Authorities:** J&K Public Service Commission (JKPSC) & J&K Services Selection Board (JKSSB).
* **Official Portals:** `https://jkpsc.nic.in` (JKPSC) & `https://jkssb.nic.in` (JKSSB).
* **What Government Provides:** Official notifications for Combined Competitive Examinations (CCE), Assistant Professorships, and non-gazetted state service recruitments.
* **CareerNova Role:** Contextual long-term context—showing students what official competitive exam avenues exist after completing specific bachelor's degrees, without making predictive career guarantees.

---

### Source Group I: College-Level Sources (GDCs)
* **Primary Authorities:** Individual Government Degree Colleges across Jammu & Kashmir.
* **Official Portals:** `http://gdckathua.in` (GDC Kathua), `http://gdcakhnoor.com` (GDC Akhnoor), GDC Women Anantnag, GDC Baramulla, etc.
* **What Government Provides:** Local department lists, campus notices, subject combination matrices, and college prospectus documents.
* **CareerNova Role:** Connects verified courses to local GDC institutional records.
