# CareerNova V1 — Final Implementation Report
**System:** CareerNova (SIH25094 — J&K Education Advisor)  
**Document Version:** 1.0.0 — Final V1  
**Date:** 2026-08-16  

---

## 1. Final Product Scope & Mission

CareerNova V1 is a **One-Stop Personalized Career & Education Advisor tailored specifically for Jammu & Kashmir**. It addresses the pre-admission awareness and decision-support gap faced by Class 10 and Class 12 students. CareerNova does **not** attempt to predict a student's career destiny, diagnose personality types, or replace government admission platforms like J&K Samarth (`jkadmissions.samarth.ac.in`). Instead, it provides a source-backed, stream-qualified, decision-support layer that helps students move from initial confusion to a well-informed next education decision.

---

## 2. Problem Solved

| Problem Dimension | Before CareerNova V1 | CareerNova V1 Solution |
|---|---|---|
| **Class 10 Stream Choice** | Premature exposure to college & UG degrees creates confusion. | Isolated Class 10 stream discovery (`/dashboard/streams`) covering Science, Commerce, and Arts with JKBOSE links. |
| **Stream Qualification Safety** | Students explore ineligible degrees due to generic portal search engines. | Deterministic stream gating ensures students only see programs for which they satisfy statutory requirements. |
| **B.Com vs. BBA vs. BCA Clarity** | Students confuse general business, accounting, and computer applications. | Structured course detail cards highlight specific curriculum modules, statutory eligibility, and degree vs. skill trade-offs. |
| **Local Institutional Discovery** | Students struggle to know which nearby GDCs offer specific majors. | Verified GDC institutional lookup table mapping programs directly to local colleges (e.g. GDC Kathua, GDC Akhnoor). |
| **Degree vs. Skill Alternative** | Students are forced into 4-year degrees without knowing vocational skill options. | Side-by-side neutral trade-off comparison cards comparing 4-year FYUGP degrees against short ITI/NSQF skill courses. |
| **Official Destination Handoff** | Students get lost on third-party blogs or outdated commercial sites. | Direct handoff guidance routing students to official portals (J&K Samarth, JKBOSE, AICTE PMSSS J&K). |

---

## 3. Implemented Architecture & System Flow

```
[ PROFILE SETUP ] (/dashboard/profile)
  ├── Class 10 Selection ──► [ STREAM DISCOVERY ] (/dashboard/streams)
  └── Class 12 Selection ──► [ EXPLORATION SURVEY ] (/dashboard/assess)
                                   │
                                   ▼
                         [ QUALIFIED FIELDS ] (/dashboard/directions)
                                   │
                                   ▼
                         [ COURSE CLARITY ] (/dashboard/directions/$key)
                           • Curriculum Modules
                           • Minimum Statutory Application Requirement
                           • Degree vs. Skill Trade-Off
                                   │
                                   ├──► [ VERIFIED GDCS ] (/dashboard/colleges)
                                   ├──► [ POST-UG PATHWAYS ] (/dashboard/outcomes/$key)
                                   ├──► [ COURSE COMPARISON ] (/dashboard/compare)
                                   └──► [ OFFICIAL HANDOFF ] (/dashboard/nextstep)
```

---

## 4. Key Implemented Capabilities

1. **Class 10 Isolation:** Strict routing logic prevents Class 10 students from seeing college or UG degree recommendations.
2. **Deterministic Stream Filtering:** Hard constraints (PCM/PCB/Commerce/Arts) strictly override soft survey preferences.
3. **Soft Signal Ranking & Uncertainty Support:** Behavioral preferences rank qualified options without issuing fake percentage predictions. Explicit support for *"I don't know yet"*.
4. **Structured Path Clarity:** Every verified course card displays curriculum focus (`whatYouWillStudy`), statutory eligibility thresholds (University of Jammu/Kashmir statutes), side-by-side degree vs. skill alternative trade-offs (`skillAlternative`), and verified GDC availability.
5. **State Reset Integrity:** Changing stream or class in `/dashboard/profile` purges stale assessment weights (`ps09_assess_weights`) to prevent state contamination across journeys.

---

## 5. Verified Data Sources

1. **J&K Samarth Higher Education Admission Portal:** `jkadmissions.samarth.ac.in` (2025-26 Academic Session)
2. **University of Jammu Statutes & Affiliation List:** `jammuuniversity.ac.in`
3. **Official Portals of Government Degree Colleges:** GDC Kathua (`gdckathua.in`), GDC Akhnoor (`gdcakhnoor.com`)
4. **J&K Department of Skill Development (DSD) / ITI J&K:** `jkdsd.in`
5. **J&K State Skill Development Mission (JKSSDM):** `jkdpm.jk.gov.in`
6. **National Testing Agency (CUET-PG & GAT-B):** `pgcuet.samarth.ac.in`, `dbt.nta.ac.in`
7. **AICTE PMSSS J&K Scholarship Scheme:** `aicte-jk-scholarship-gov.in`

---

## 6. Known System Limitations

* **Kashmir Division GDC Coverage:** Institutional dataset is centered on verified Jammu Division GDCs (Kathua, Akhnoor). Kashmir Division GDCs across Anantnag, Baramulla, and Srinagar can be continuously added as official university affiliation records are updated.
* **Session-Specific Seat Cutoffs:** CareerNova displays minimum statutory application eligibility rules, leaving competitive seat allotment cutoffs to the official J&K Samarth portal during live seat allocation rounds.
