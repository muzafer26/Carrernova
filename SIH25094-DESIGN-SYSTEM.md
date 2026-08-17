# SIH25094 — Design System Specification
**One-Stop Personalized Career & Education Advisor (J&K)**

---

## 1. Product Personality
* **Calm & Trustworthy**: Reassures Class 10/12 students with clear, transparent guidance.
* **Student-Centered**: Prioritizes student clarity over technical complexity.
* **Informative & Honest**: Explicitly distinguishes factual official records from exploratory options.
* **Modern & Clean**: Maintains a sleek dark-glass theme with restrained, quiet lighting.
* **Anti-Gimmick**: Avoids fake percentages, scientific fit certainties, and flashy developer-marketing decorations.

---

## 2. Typography
* **Primary Sans-Serif**: `Inter` or system sans for crisp body readability (`text-xs` to `text-sm`, line height 1.6).
* **Display / Headings**: `Outfit` or `Plus Jakarta Sans` (`font-display`, weight `font-bold` / `font-semibold`).
* **Monospace / Dates**: `JetBrains Mono` or system mono for verification timestamps (`text-[10px]`, opacity `80%`).

---

## 3. Color System (Tailwind Tokens)
* **Background Canvas**: Slate / Deep Navy (`#0b0f19` / `bg-background`).
* **Primary / Accent**: Muted Emerald / Indigo (`#10b981` / `#6366f1` / `text-primary`).
* **Card Borders**: Subtle white stroke (`border-white/10` / `hover:border-white/20`).
* **Verified Badge**: Subtle emerald border and text (`border-emerald-500/40 text-emerald-400 bg-emerald-950/20`).
* **Foreground Text**: Crisp white (`#f8fafc`) for headings; muted slate (`#94a3b8`) for descriptions.

---

## 4. Backgrounds
* **Glass Surfaces**: `.glass` (`background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px)`).
* **Strong Glass Surfaces**: `.glass-strong` (`background: rgba(255, 255, 255, 0.06); backdrop-filter: blur(16px)`).
* **Gradients**: Quiet, ambient radial background glows (`bg-gradient-to-b from-slate-900 via-slate-950 to-black`).

---

## 5. Card Surfaces
* **Standard Cards**: `glass border-white/10 rounded-2xl p-5 shadow-lg transition-all`.
* **Hero / Featured Cards**: `glass-strong border-white/15 rounded-2xl p-6 md:p-8`.

---

## 6. Buttons
* **Primary CTA**: `bg-primary text-primary-foreground font-semibold rounded-xl px-5 py-2.5 hover:bg-primary/90 transition shadow-md flex items-center gap-2`.
* **Secondary / Outline**: `variant="outline" glass border-white/10 hover:bg-white/10 rounded-xl text-xs font-medium`.

---

## 7. Inputs & Form Controls
* **Input Fields**: `bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none`.

---

## 8. Badges
* **Category Badges**: `variant="secondary" text-[10px] font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-md`.

---

## 9. Source Badges
* **Official Source Badge**: `border-emerald-500/40 text-emerald-400 bg-emerald-950/30 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1`.

---

## 10. Journey Progress
* **6-Step Progress Header**: Clear horizontal step indicators (`About You` → `Discover` → `Explore` → `Colleges` → `Compare` → `Next Step`) with highlighted active step pill and completed checks.

---

## 11. Recommendation Cards
* **Header**: `"This May Suit You"` or `"Why This May Suit You"`.
* **Content**: Qualitative fit description, stream qualification status, matched interests, and direct course links.

---

## 12. Course Cards
* **Visual Hierarchy**:
  1. Course Title & Category Badge
  2. Plain-Language Explanation
  3. Verified College Availability (*"Offered at X Government Degree Colleges in J&K"*)
  4. Official Source Badge & Link

---

## 13. College Cards
* **Visual Hierarchy**:
  1. College Name & District Badge
  2. Institution Type (*"Government"*)
  3. Program Availability Pills
  4. Official Source Link

---

## 14. Resource Cards
* **Visual Hierarchy**:
  1. Resource Title & Category Badge
  2. Description & Organization Name
  3. Target Audience / Stage Tag
  4. Verification Date & Direct *"Visit Official Website"* Link

---

## 15. Empty States
* **Design Pattern**: Centered icon inside rounded glass pill, clear non-judgmental student message, and two actionable navigation buttons.

---

## 16. Error States
* **Design Pattern**: Gentle inline notice explaining offline mode or network fallback without raw error stack traces.

---

## 17. Loading States
* **Design Pattern**: Subtle skeleton pulsing lines or quiet emerald spinner (`Loader2 className="animate-spin text-primary"`).

---

## 18. Navigation
* **Navbar**: Top persistent navbar with SIH25094 title, journey progress quick-jump links, and simple profile trigger.

---

## 19. Mobile Layout
* **Grid**: Single column stacks (`grid-cols-1`).
* **Navigation**: Scrollable horizontal step tabs or touch-friendly drawer menu.

---

## 20. Desktop Layout
* **Grid**: 2-column or 3-column structured grids (`max-w-4xl` or `max-w-6xl mx-auto`).

---

## 21. Motion Principles
* **Transitions**: Micro-interactions powered by `framer-motion` (`initial={{ opacity: 0, y: 8 }}` `animate={{ opacity: 1, y: 0 }}` `transition={{ duration: 0.25 }}`).

---

## 22. Accessibility Rules
* High contrast ratio text (`text-foreground` on dark glass).
* Interactive elements have explicit hover/focus outline rings.
* All links use `rel="noreferrer"` and descriptive labels.

---

## 23. Copy Tone
* Empathetic, supportive, plain language. Never uses developer jargon (*"schema"*, *"vector"*, *"algorithm"*) or false certainty (*"100% Guaranteed Fit"*).

---

## 24. Spacing System
* Standardized Tailwind scale: `space-y-3`, `space-y-6`, `gap-4`, `p-5`, `p-6`.

---

## 25. Visual Hierarchy
* **Level 1 (Title)**: `text-2xl font-bold font-display`
* **Level 2 (Section Subtitle)**: `text-lg font-semibold font-display text-primary`
* **Level 3 (Card Title)**: `text-base font-semibold`
* **Level 4 (Body / Explanation)**: `text-xs text-muted-foreground leading-relaxed`
* **Level 5 (Metadata / Source)**: `text-[10px] text-muted-foreground/80 font-mono`
