# PS-09 — Problem Model & Decision Uncertainty Taxonomy
**Project:** CareerNova-AI (SIH25094)  
**Date:** 2026-08-16

---

## The Core Problem (SIH25094)

J&K students after Class 10 and Class 12 face a **decision gap**, not an information gap.

Information exists across JKBOSE, University of Jammu, University of Kashmir, J&K Samarth, JKBOPEE, JKPSC, JKSSB, and individual college portals. But it is:
- **Fragmented** across 10+ disconnected portals
- **Raw** — presented as admission rules, not as decision guidance
- **Stage-agnostic** — a Class 10 student cannot distinguish what's relevant to them
- **Comparison-absent** — no official source compares B.Com vs BBA vs BCA
- **Consequence-opaque** — students don't understand what a degree leads toward
- **Trade-off-invisible** — no clear degree vs. skill/vocational comparison exists

## Complete Decision Uncertainty Taxonomy

### Class 10 Uncertainties
| ID | Uncertainty | Example |
|:---:|:---|:---|
| U1 | What streams exist after Class 10? | "I don't know what Science/Commerce/Arts mean" |
| U2 | What subjects does each stream involve? | "What would I actually study in Commerce?" |
| U3 | What future paths does each stream keep open? | "If I choose Arts, am I locked out of tech?" |
| U4 | How do I choose when I don't know what I like? | "I have no clear preference" |
| U5 | How do I respond to parental pressure? | "My parents want Science but I'm unsure" |
| U6 | What is the official process for stream selection? | "How does JKBOSE stream assignment work?" |

### Class 12 Uncertainties
| ID | Uncertainty | Example |
|:---:|:---|:---|
| U7 | What degree options exist for my stream? | "I'm Commerce — what can I study?" |
| U8 | What will I actually study in each degree? | "What's the difference between BBA curriculum and B.Com?" |
| U9 | Am I academically eligible? | "I have 48% — can I apply for BCA?" |
| U10 | Is a degree worth the time? | "Should I do a 4-year degree or a 6-month skill course?" |
| U11 | Where can I study in J&K? | "Which GDCs near Kathua offer B.Sc Computer Application?" |
| U12 | What can this degree lead toward? | "If I do B.Com, can I do MBA later?" |
| U13 | What exams require a degree? | "Do I need graduation for JKPSC?" |
| U14 | How do two similar options differ? | "B.Com vs BBA vs BCA — what's the real difference?" |
| U15 | What is the official next step? | "Where exactly do I apply for GDC admission?" |
| U16 | I genuinely don't know what I want | "I have no idea what field interests me" |

### Cross-Stage Uncertainties
| ID | Uncertainty | Example |
|:---:|:---|:---|
| U17 | What government career paths require graduation? | "I want a government job — do I need a degree?" |
| U18 | Can I combine degree + skill development? | "Can I do a degree and also learn practical skills?" |
| U19 | What vocational/diploma options exist? | "Is ITI/polytechnic a viable path?" |

## CareerNova's Coverage

| Uncertainty | Addressed? | By Which Feature |
|:---:|:---:|:---|
| U1–U6 | ✓ | `/dashboard/streams` (JKBOSE-sourced stream exploration) |
| U7 | ✓ | `/dashboard/directions` (stream-filtered field discovery) |
| U8 | ✓ | `/dashboard/directions/$key` (whatYouWillStudy arrays) |
| U9 | ✓ | `/dashboard/directions/$key` (statutory eligibility) |
| U10 | ✓ | `/dashboard/directions/$key` (Degree vs. Skill Trade-Off) |
| U11 | ✓ | `/dashboard/colleges` (verified GDC directory, district filter) |
| U12 | ✓ | `/dashboard/outcomes/$key` (verified PG/exam pathways) |
| U13 | ✓ | `/dashboard/outcomes/$key` (JKPSC CCE, JKSSB listed) |
| U14 | ✓ | `/dashboard/compare` (dual-mode comparison) |
| U15 | ✓ | `/dashboard/nextstep` (stage-aware official handoff) |
| U16 | ✓ | `/dashboard/assess` ("I don't know" → Open Exploration) |
| U17 | Partial | Mentioned in B.A. outcomes; not a dedicated path |
| U18 | Partial | Trade-off shown per course; no combined model |
| U19 | Partial | NSQF/ITI mentioned as alternatives; not a standalone path |
