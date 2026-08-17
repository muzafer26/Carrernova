# PS-09 — SIH25094 Competitor Benchmark Analysis
**Project:** CareerNova-AI  
**Audit Date:** 2026-08-16  
**Purpose:** Benchmark CareerNova against known SIH25094 competitor submissions to identify differentiation, gaps, and feature bloat.

---

## 1. Known SIH25094 Competitor Submissions

### A. Career Compass AI
| Feature | Present |
|:---|:---:|
| Aptitude / Interest Quiz | ✓ |
| Personalized Career Suggestions | ✓ |
| Suitable Course Recommendations | ✓ |
| Nearby College Directory | ✓ |
| Entrance Exam Information | ✓ |
| Study Materials | ✓ |
| Career Guidance | ✓ |
| AI Chatbot | ✓ |
| Scholarship Information | ✓ |

### B. EduPath
| Feature | Present |
|:---|:---:|
| Aptitude / Interest Quiz | ✓ |
| Stream Suggestions | ✓ |
| Course-to-Career Visual Mapping | ✓ |
| Job / Government Exam Directory | ✓ |
| Higher Education Pathways | ✓ |
| Nearby Government College Directory | ✓ |
| Eligibility Checker | ✓ |
| College Facilities Info | ✓ |
| Open-Source Learning Materials | ✓ |
| Scholarship Info | ✓ |
| Offline Capability | ✓ |

### C. EduSpark / SparkUP
| Feature | Present |
|:---|:---:|
| Bilingual Guidance | ✓ |
| Aptitude / Interest Quiz | ✓ |
| Stream Suggestions | ✓ |
| Career Path Mapping | ✓ |
| Government College Directory | ✓ |
| Scholarship Info | ✓ |
| Admission Notifications | ✓ |
| Government-Focused Verified Data | ✓ |

---

## 2. Feature Commonality Across SIH25094 Solutions

These features appear in **ALL or MOST** competitor proposals:

| Feature | Career Compass | EduPath | EduSpark | **Common?** |
|:---|:---:|:---:|:---:|:---:|
| Quiz / Assessment | ✓ | ✓ | ✓ | **Universal** |
| Career / Course Recommendations | ✓ | ✓ | ✓ | **Universal** |
| College Directory | ✓ | ✓ | ✓ | **Universal** |
| Scholarship Info | ✓ | ✓ | ✓ | **Universal** |
| AI Chatbot | ✓ | – | – | Partial |
| Stream Guidance | – | ✓ | ✓ | Common |
| Eligibility Check | – | ✓ | – | Partial |
| Career Path Mapping | – | ✓ | ✓ | Common |
| Entrance Exam Info | ✓ | – | – | Partial |
| Study Materials | ✓ | ✓ | – | Partial |
| Admission Notifications | – | – | ✓ | Unique |
| Bilingual Support | – | – | ✓ | Unique |
| Offline Capability | – | ✓ | – | Unique |

> **Critical Conclusion:** Quiz + Course Recommendation + College Directory + Scholarship + Chatbot is a **baseline, not a differentiator**. Every team has this.

---

## 3. CareerNova Feature Comparison Against Competitors

| CareerNova Feature | Competitor Equivalent | CareerNova Advantage |
|:---|:---|:---|
| PS09 Activity-Based Assessment (7Q) | Generic aptitude quiz | ✓ **Asks about activities, work styles, aversions — not just subject names** |
| Verified J&K GDC Registry (5 colleges, both divisions) | "Nearby colleges" (unclear verification) | ✓ **Source-backed with primary portal URLs and verification dates** |
| Course-specific Statutory Eligibility | "Eligibility checker" (unclear source) | ✓ **Directly sourced from university statutes with exact aggregate thresholds** |
| Degree vs. Skill Route Trade-Off (per course) | Not found in competitors | ✓✓ **Unique — directly answers SIH25094's graduation-value question** |
| Course-specific Higher Study Outcomes | "Career path mapping" (generic) | ✓ **Verified PG pathways with CUET-PG paper codes, GAT-B, ICAI routes** |
| Class 10 / Class 12 Journey Isolation | Not found in competitors | ✓ **Route guards enforce stage-appropriate content** |
| "I don't know" Uncertainty Handling | Not found in competitors | ✓ **Open Exploration mode with neutral presentation** |
| Official Resource Registry (12 portals) | "Scholarship info" / links | ✓ **Structured, stage-aware portal directory** |
| Stage-Aware Grounded AI Mentor | Generic AI chatbot | ✓ **Profile-injected, data-grounded, refuses to fabricate** |
| Dual-Mode Compare (Courses + Directions) | Not found in competitors | ✓ **Side-by-side curriculum, eligibility, colleges, skill alternatives** |

---

## 4. What Competitors Do That CareerNova Does NOT

| Capability | Competitor | CareerNova Status | Priority |
|:---|:---|:---|:---:|
| Study Materials / Learning Resources | Career Compass, EduPath | **Missing** — but NCS/SWAYAM/university portals exist | P2 (link, don't rebuild) |
| Bilingual / Multilingual Support | EduSpark | **Missing** | P2 |
| Offline Capability (PWA) | EduPath | **Missing** | P2 |
| Admission Notification Alerts | EduSpark | **Missing** — Samarth portal handles this | P2 (link) |
| College Facilities Info | EduPath | **Missing** — college portals are linked | P2 |

> **Verdict:** None of these missing features are P0 for demo. CareerNova's differentiation is stronger in decision-support depth, not breadth.

---

## 5. What CareerNova Has That NO Competitor Demonstrates

1. **Exploration-First Model:** Assessment frames questions around activities/work-styles rather than subject-name matching. "I don't know" is a valid answer.
2. **Degree vs. Skill Route Trade-Off:** Every course card presents a neutral, source-backed comparison between 4-year degree and short-term NSQF/ITI vocational alternative.
3. **Source-Backed Verification Metadata:** Every factual claim carries `SourceMeta` with portal URL, retrieval date, and verification status.
4. **Class 10/12 Stage Isolation:** Strict route guards prevent Class 10 students from accessing UG-specific content.
5. **Course-Level Curriculum Modules:** `whatYouWillStudy` arrays give students concrete understanding of what they would actually learn.

---

## 6. Final Competitive Positioning

```
GENERIC SIH25094 SOLUTION:
Quiz → Career Label → College List → Scholarship Links

CAREERNOVA DIFFERENTIATION:
Exploration → Understand Activities → Discover Qualified Paths
→ Understand Curriculum → Check Eligibility → Degree vs. Skill Trade-Off
→ Verified J&K GDCs → Verified PG/Exam Outcomes → Official Next Action
```

CareerNova is **NOT** trying to be the most feature-rich.
It is trying to be the most **decision-useful** for a confused J&K student.
