# CAREERNOVA — GUIDED JOURNEY & NAVIGATION UI ARCHITECTURE DOCUMENTATION
**Document ID:** `CAREERNOVA-GUIDED-JOURNEY-UI-STRUCTURE.md`  
**Target System:** CareerNova Guided Student Journey, Map Integration, & Navigation (SIH25094)  
**Date:** August 17, 2026  
**Status:** IMPLEMENTED & VERIFIED  

---

## 1. CURRENT PROBLEM ADDRESSED
Prior to this redesign pass, the internal student experience suffered from cognitive overload:
- A persistent 2-tier sidebar exposed all 11 internal routes simultaneously (Profile, Assess, Directions, Skills, Govt Pathways, Colleges, Compare, Resources, Mentor, NextStep).
- The user interface felt like a SaaS management system, CRM, or college administration tool rather than a human, step-by-step student guidance journey.
- The J&K Institution Map felt visually disconnected from CareerNova's core design language.
- User-facing sign-in/sign-out buttons introduced unnecessary friction during initial exploration.

---

## 2. NEW JOURNEY ARCHITECTURE
The new architecture transforms CareerNova into a **Guided Story-Mode Journey**:
- **Core Principle:** "Show only what is needed for the current decision. One screen = one primary decision."
- **Visual Identity:** Distraction-free, full-width container (`isGuidedJourney` active across all student journey steps).
- **Navigation Controls:** Contextual `Back` and `Next` buttons control state progression.
- **Stickers & Guidance:** 3D stickers (`books`, `compass`, `college`, `trophy`) act as contextual guides asking, explaining, and summarizing steps.

---

## 3. NAVIGATION ARCHITECTURE: SITEMAP VS. GUIDED JOURNEY

```
+-----------------------------------------------------------------------------------+
|                            LANDING PAGE / HERO                                   |
|                          [ START EXPLORING ]                                     |
+-----------------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------------+
|               GUIDED STORY JOURNEY MODE (No Persistent Sidebar)                   |
|                                                                                   |
|  [Header: CareerNova J&K Guided Journey]                     [Secondary Overview] |
|                                                                                   |
|  Chapter 1: About You (Class 10 / Class 12)                                       |
|  Chapter 2: Stream & District Selection                                           |
|  Chapter 3: Exploration Goal & Intent                                             |
|  Chapter 4: Discover Interests                                                    |
|  Chapter 5: Course-Level Ranked Recommendations (Why Recommended)                 |
|  Chapter 6: Understand This Option (Progressive Sub-Tabs)                         |
|  Chapter 7: J&K Verified Institution Map                                          |
|  Chapter 8: Compare, Save & Next Official Action                                  |
+-----------------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------------+
|               OPTIONAL SECONDARY WORKSPACE (/dashboard/overview)                   |
|                   (Compact menu for returned power-users)                        |
+-----------------------------------------------------------------------------------+
```

### Key Distinction:
- **Internal Sitemap:** All routes (`/dashboard/profile`, `/dashboard/assess`, `/dashboard/directions`, `/dashboard/colleges`, `/dashboard/compare`, `/dashboard/nextstep`) remain 100% active and accessible in code.
- **Student UI Presentation:** The full sitemap is **never exposed as a giant persistent sidebar** during the guided journey.

---

## 4. PROGRESSIVE DISCLOSURE MODEL
All detailed information is preserved behind contextual actions rather than presented in massive data tables:
- `What Will I Study?` (Curriculum overview)
- `Can I Get In?` (Eligibility statutes)
- `Scholarships & Fee Support` (J&K government schemes)
- `Admission Route & Portal` (CUET-UG / JK Samarth links)
- `Curated Learning Resources` (Free official study materials)
- `Why Is This Shown?` (Evidence-based signal alignment)
- `What Can It Lead To?` (Higher study & job outcomes)

---

## 5. MAP INTEGRATION & VISUAL THEME
- **Visual Alignment:** The map component (`CollegeMap.tsx`) uses CareerNova's core Eduor theme tokens (`#0f2239` Navy, `#ff7f46` Coral, `#4582ff` Blue, `#f4f7fe` Light BG, `#059669` Emerald verified badge).
- **Progressive Filters:** Primary filter is `Programme Key` + `District`, with an optional `Division` toggle (All J&K, Jammu, Kashmir).
- **"Why This College?":** Each college detail panel displays a dedicated rationale explaining why the institution appears based on official district location and program statutes.
- **Empty States:** When a filter returns 0 results, a clean empty state card offers "Explore All J&K Institutions" instead of a blank canvas.

---

## 6. AUTH TREATMENT IN GUIDED MVP
- User-facing `Sign In` / `Sign Out` buttons are removed from the primary student journey view to guarantee zero friction.
- Local fallback profile state (`ps09_guided_journey_state` & `ps09_student_profile`) persists progress seamlessly in local storage.

---

## 7. FINAL ACCEPTANCE CHECKLIST

- [x] Start Exploring opens full-width guided story container.
- [x] No persistent sidebar clutter during guided student journey.
- [x] No sign-in/out friction blocking exploration.
- [x] One primary decision per screen.
- [x] Contextual stickers guide student progression.
- [x] Progressive disclosure sub-tabs hide complexity until requested.
- [x] Internal sitemap architecture preserved without exposing a giant sidebar.
- [x] Contextual Back and Next controls preserve browser state.
- [x] College Map styled with Eduor tokens (`#0f2239`, `#ff7f46`, `#4582ff`).
- [x] Map popups include evidence-based "Why This College?" rationale.
- [x] Mobile & Desktop responsive layout verified.
- [x] Core recommendation logic untouched and 100% stable.
