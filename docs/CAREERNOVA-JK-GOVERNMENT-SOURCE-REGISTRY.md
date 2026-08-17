# CAREERNOVA — J&K GOVERNMENT EDUCATION SOURCE REGISTRY
**SIH25094 | Verified J&K Government Ecosystem Catalog**  
*Document Version: 2.0 | Session: 2026–2027*

---

## Executive Summary
This registry catalogs all official Jammu & Kashmir Higher Education, Skill Development, School Education, Admission, Examination, and Scholarship systems integrated into CareerNova.

CareerNova serves as the **student decision layer** over these official government portals, providing discovery, context, progressive disclosure, and direct official handoff.

---

## Official J&K Government Source Registry

### 1. Directorate of Colleges J&K (Higher Education Department)
- **Authority:** Higher Education Department, Govt. of J&K
- **Official URL:** `https://hed.jk.gov.in` / `https://colleges-api.onrender.com`
- **Purpose:** Centralized directory and programme offerings across 140+ Government Degree Colleges (GDCs) in J&K.
- **Target Student:** Class 12 students seeking BA, B.Sc, B.Com, BCA, BBA, B.Tech, and NEP 2020 4-year degree programs.
- **CareerNova Role:** Direct Data & Institution Discovery (`src/data/jk-colleges.ts`, `src/services/jkCollegeApi.ts`).

### 2. J&K Centralized Admissions Portal (J&K Samarth)
- **Authority:** Department of Higher Education, J&K / UGC Samarth
- **Official URL:** `https://jk.samarth.ac.in` / `https://jkadmissions.in`
- **Purpose:** Single-window admission portal for undergraduate admissions across all Government Degree Colleges in Jammu & Kashmir.
- **Target Student:** Class 12 graduates applying for GDC seats across J&K districts.
- **CareerNova Role:** Official Handoff & Next Step Action (`src/routes/dashboard.nextstep.tsx`).

### 3. Directorate of Skill Development & ITI System (J&K DSD)
- **Authority:** Directorate of Skill Development, Govt. of J&K
- **Official URL:** `https://jkdsd.in`
- **Purpose:** Admissions and course offerings for 50+ Industrial Training Institutes (ITIs) offering NCVT/SCVT trade certificates (COPA, Electrician, Plumber, Welder, Fashion Technology).
- **Target Student:** Class 10 and Class 12 students seeking job-ready vocational skills.
- **CareerNova Role:** Vocational Pathway Discovery & Direct Link (`src/data/jk-skills.ts`).

### 4. J&K Skill Development Mission (JKSDM)
- **Authority:** Skill Development Department, Govt. of J&K
- **Official URL:** `https://jksdm.org.in`
- **Purpose:** State skill surveys, PMKVY 4.0, PM-SETU, SANKALP, and IndiaSkills 2026–27 registrations.
- **Target Student:** Youth seeking skill-gap training, short-term certificates, and national skill competitions.
- **CareerNova Role:** Skill-Gap Context & Official Handoff (`src/data/jk-govt-pathways.ts`).

### 5. J&K Professional Entrance Examinations Board (JKBOPEE)
- **Authority:** J&K Board of Professional Entrance Examinations
- **Official URL:** `https://jkbopee.gov.in`
- **Purpose:** Entrance exams and state quota counselling for Engineering (JKCET), Medical (NEET UG state quota), Nursing, Paramedical, AYUSH, and B.Ed.
- **Target Student:** Class 12 Science (PCM/PCB) students seeking professional degree admissions.
- **CareerNova Role:** Professional Route Guidance & Official Notification Handoff.

### 6. Prime Minister's Special Scholarship Scheme for J&K (AICTE PMSSS)
- **Authority:** AICTE & Ministry of Education, Govt. of India / J&K Govt
- **Official URL:** `https://aicte-jk-scholarship-gov.in`
- **Purpose:** Full financial support (tuition fee + maintenance allowance) for J&K students studying outside UT or in premier institutions.
- **Target Student:** Class 12 J&K domiciled students with family income < ₹8 Lakh/annum.
- **CareerNova Role:** Financial Support Context & Verification Handoff.

### 7. J&K Public Service Commission (JKPSC)
- **Authority:** Jammu & Kashmir Public Service Commission
- **Official URL:** `https://jkpsc.nic.in`
- **Purpose:** Recruitment examinations for J&K Combined Competitive Exam (CCE / KAS), Judicial Services, Assistant Conservator Forests, Assistant Director Statistics.
- **Target Student:** Graduates seeking Class-I and Class-II gazetted administrative careers in J&K.
- **CareerNova Role:** Government-Service Pathway Context (`src/data/jk-govt-pathways.ts`).

### 8. J&K Services Selection Board (JKSSB)
- **Authority:** Jammu & Kashmir Services Selection Board
- **Official URL:** `https://jkssb.nic.in`
- **Purpose:** Non-gazetted state cadre, divisional cadre, and district cadre recruitments (Junior Assistant, Panchayat Secretary, Accounts Assistant).
- **Target Student:** Class 10, Class 12, and Graduate candidates seeking public sector jobs.
- **CareerNova Role:** Entry Requirement Mapping & Official Exam Handoff.

### 9. Jammu & Kashmir Board of School Education (JKBOSE)
- **Authority:** J&K Board of School Education
- **Official URL:** `https-[#CAREERNOVA — GUIDED STORY-MODE STUDENT EXPERIENCE
# START EXPLORING → COMPLETE STUDENT JOURNEY
# MINIMALIST PRESENTATION | PROGRESSIVE DISCLOSURE
# PRESERVE CORE LOGIC | REMOVE CRM/ADMIN FEEL
#
# THIS TASK IS ABOUT EXPERIENCE STRUCTURE AND PRESENTATION.
#
# DO NOT REMOVE VERIFIED J&K CONTENT.
# DO NOT REMOVE CORE DECISION LOGIC.
# DO NOT SHRINK THE PRODUCT BY REMOVING INFORMATION.
#
# SIMPLIFY THE WAY INFORMATION IS REVEALED.

============================================================
1. CORE PROBLEM
============================================================

The current internal experience feels like a:

- CRM
- attendance management system
- admin dashboard
- enterprise form
- data-management interface

instead of:

A STUDENT GUIDANCE JOURNEY.

The student should feel:

"Someone is guiding me through this."

NOT:

"I have entered a management system and need to configure my profile."

============================================================
2. PRIMARY UX TRANSFORMATION
============================================================

CURRENT FEEL:

Start Exploring
→ Dashboard
→ many cards
→ many controls
→ many filters
→ lots of information
→ student gets overwhelmed

TARGET FEEL:

Start Exploring
→ About You
→ one small question
→ answer
→ Next
→ next question
→ Discover Yourself
→ one small exploration
→ Next
→ Possible Paths
→ choose one
→ Why this?
→ Understand
→ Where can I do it?
→ Where can it lead?
→ Compare
→ Save
→ Next Decision
→ Official Action

The product remains information-rich internally.

The experience becomes information-light at each moment.

============================================================
3. ONE THING AT A TIME
============================================================

CORE RULE:

ONE SCREEN
=
ONE IMPORTANT QUESTION / DECISION.

Avoid putting these simultaneously on the screen:

- profile form
- interests
- stream
- district
- course cards
- colleges
- scholarships
- outcomes
- resources
- comparison
- mentor
- navigation
- multiple dashboards

Instead reveal them progressively.

Example:

SCREEN:

"Let's start simple.
What class are you currently in?"

[ Class 10 ]

[ Class 12 ]

NEXT

Nothing else competing for attention.

============================================================
4. START EXPLORING
============================================================

When the user clicks:

START EXPLORING

DO NOT immediately send them into a management dashboard.

Enter:

GUIDED JOURNEY MODE.

The journey should feel intentionally sequential.

Show:

- current chapter
- one question
- small answer set
- NEXT

Minimal secondary controls.

============================================================
5. ABOUT YOU
============================================================

Create a human-style introduction.

Possible presentation:

Character/sticker/illustration:

"Hey. Let's start by understanding where you are."

Then:

"What class are you in?"

Answer.

NEXT.

Then:

"Which stream are you studying?"

Only show this when appropriate.

NEXT.

Then:

"Where are you studying from?"

District.

NEXT.

Then:

"What are you trying to figure out?"

Examples:

"I don't know yet"
"I want to explore degrees"
"I want practical/skill options"
"I want to understand government pathways"
"I want to find colleges"
"I already know a programme"
"I need financial-support information"

Do NOT ask all questions in one form.

============================================================
6. CHARACTER / STICKER SYSTEM
============================================================

Use the existing assets from:

D:\OrbitAvayana\design

Use them as a GUIDE.

The character/sticker can:

- ask questions
- react to progress
- explain a step
- introduce a new chapter
- explain WHY
- encourage continuation
- summarize progress

But do NOT make the app childish.

Do NOT put a sticker everywhere.

Do NOT create visual clutter.

Use the character only where it improves the feeling of guidance.

============================================================
7. CHAPTER STRUCTURE
============================================================

Use a clear journey model.

CHAPTER 1
ABOUT YOU

CHAPTER 2
DISCOVER YOURSELF

CHAPTER 3
WHAT ARE YOU TRYING TO FIGURE OUT?

CHAPTER 4
YOUR POSSIBLE PATHWAYS

CHAPTER 5
WHY THESE PATHWAYS?

CHAPTER 6
UNDERSTAND A PATH

CHAPTER 7
WHERE CAN YOU DO IT?

CHAPTER 8
WHERE CAN IT LEAD?

CHAPTER 9
WHAT ALTERNATIVES EXIST?

CHAPTER 10
COMPARE

CHAPTER 11
MY OPTIONS

CHAPTER 12
MY NEXT DECISION

CHAPTER 13
OFFICIAL ACTION

Do not force every student through every chapter.

The system must branch according to their goal.

============================================================
8. PROGRESSIVE DISCLOSURE
============================================================

Keep all verified information available.

BUT:

do not display all of it immediately.

Example:

Student selects:

"Psychology"

First show:

WHAT IS IT?

Then:

"What would you like to know?"

[ What will I study? ]
[ Can I enter? ]
[ Where can I study? ]
[ What can it lead to? ]
[ Why might it suit me? ]

Only reveal the selected information.

This keeps the UI minimal without deleting content.

============================================================
9. DISCOVERY
============================================================

After About You, introduce:

DISCOVER YOURSELF

Character:

"You don't need to know your career yet.
Let's see what kinds of things interest you."

Use the existing exploration/interest system.

Do NOT label it:

CAREER PREDICTION.

Do NOT generate:

"92% fit"

or:

"You should become..."

Instead:

"Here are some areas you may want to explore."

============================================================
10. EXPLORATION INTERACTIONS
============================================================

Use one interaction at a time.

Possible activities:

- scenario
- mini problem
- subject exploration
- work-style choice
- practical task
- reading activity
- science situation
- business scenario
- creative situation
- people/helping scenario

Result:

"These are areas you seemed interested in exploring."

NOT:

"Your ideal career is..."

============================================================
11. "I DON'T KNOW"
============================================================

If student selects:

"I DON'T KNOW"

DO NOT treat it as failure.

Show:

"That's okay.
We'll explore a few possibilities together."

Then progressively present:

- subjects
- fields
- pathway families
- practical vs academic
- government-oriented
- skill-oriented
- local options

One exploration decision at a time.

============================================================
12. POSSIBLE PATHWAYS
============================================================

DO NOT show 50 programme cards immediately.

First show a small number of relevant PATHWAY FAMILIES.

Examples:

Academic Degree
Practical / Skill
Diploma / Polytechnic
Government-Oriented Path
Professional Education

The actual options must come from the student's context and verified data.

Then:

"Which one would you like to understand?"

============================================================
13. PATHWAY DETAIL
============================================================

When student chooses a pathway:

Do NOT show every data field on one screen.

First:

"What is this?"

Then:

"What would you like to know?"

[ What will I study? ]
[ Can I get in? ]
[ Where can I do it? ]
[ Why is it being shown to me? ]
[ What can it lead to? ]
[ What are the alternatives? ]

Progressively reveal.

============================================================
14. WHY EXPERIENCE
============================================================

Every important option must have:

WHY THIS IS SHOWN

Use a small concise explanation.

Example:

"You're seeing this because:
your current academic background makes it possible,
you showed interest in this area,
and verified options exist in J&K."

Then:

SEE THE DETAILS

This must be evidence-backed.

============================================================
15. WHERE CAN I DO IT?
============================================================

Do not immediately dump the full college database.

Ask:

"Want to see where this is available?"

[ Near me ]
[ Across J&K ]

Then show:

verified institution
programme
district
division

Expand details only when requested.

============================================================
16. WHY THIS COLLEGE?
============================================================

When the student opens an institution:

show:

WHY THIS MAY BE RELEVANT

- programme available
- location
- eligibility relationship
- official programme information
- current admission route if verified
- support information if verified

Never:

"best college"
"top college"
"highest placement"

without authoritative evidence.

============================================================
17. FUTURE PATHWAYS
============================================================

Do not dump:

20 careers
15 exams
10 PG programmes

Instead ask:

"Want to see where this can lead?"

Then:

[ Higher Study ]
[ Government Exams ]
[ Career Fields ]
[ Professional Routes ]

Show only the selected category.

============================================================
18. SCHOLARSHIP / SUPPORT
============================================================

Do not put a giant scholarship grid on the screen.

If relevant:

"Financial support may be available for this path."

Then:

SEE SUPPORT

Show:

- potentially relevant scheme
- why it may matter
- current session
- official authority
- official source
- what still needs verification

============================================================
19. COMPARE
============================================================

Comparison should occur when a student has actually reached a decision.

Example:

"You've been exploring two options."

[ Option A ]
[ Option B ]

Compare only useful dimensions:

Eligibility
Duration
Learning/training
Local availability
Future pathways
Support
Important trade-offs

No giant spreadsheet unless the student asks for more detail.

============================================================
20. SAVE / SHORTLIST
============================================================

After understanding an option:

"Want to keep this?"

[ Save to My Options ]
[ Keep Exploring ]

Saved options go into:

MY OPTIONS

The student should be able to compare saved options later.

============================================================
21. FINAL STUDENT SUMMARY
============================================================

At the end of the journey:

"Here's where you are now."

Show:

CURRENT POSITION

MY OPTIONS

WHAT I UNDERSTAND

WHAT I STILL NEED TO CHECK

MY NEXT DECISION

NEXT OFFICIAL ACTION

Do not end with a generic dashboard.

============================================================
22. DASHBOARD
============================================================

Only after enough journey context exists should the dashboard become
the student's workspace.

The dashboard should be a SUMMARY.

Not the starting point.

Example:

YOUR JOURNEY

Current stage:
Class 12 Commerce

Exploring:
Business + Technology

My options:
3 saved

Current decision:
BCA vs BBA

Next action:
Check current J&K admission information

This is useful.

============================================================
23. LOGIN / LOGOUT
============================================================

The current MVP does NOT need to force authentication if the underlying
product can safely work without it.

Audit dependencies FIRST.

Before removing authentication:

trace:

- auth provider
- session
- protected routes
- database
- profile storage
- deployment
- state
- tests

If nothing essential depends on it:

remove the LOGIN / LOGOUT requirement from the student journey.

Prefer:

START EXPLORING immediately.

Allow anonymous/local journey state if safe.

Do NOT delete backend/auth infrastructure blindly.

If auth is still required by something real:

report exactly why.

============================================================
24. BACK / NEXT / PROGRESS
============================================================

The journey must have:

BACK
NEXT
current step/chapter indicator

But avoid a large progress-management UI.

Example:

ABOUT YOU
●───○───○───○

or:

Step 2 of 5

Keep it subtle.

============================================================
25. EXIT / RESUME
============================================================

The student should be able to:

pause
leave
return

without losing important safe local journey state.

If they resume:

"Welcome back.
You were exploring Psychology."

No need for a CRM-style dashboard.

============================================================
26. FAILURE STATES
============================================================

If information is unavailable:

do not show empty cards.

Show:

"We couldn't verify this yet."

Then:

"Check official source"

or:

"Explore another option."

============================================================
27. DIRECT URL / DEEP LINK SAFETY
============================================================

The guided journey must not break direct URLs.

If required context is missing:

redirect to the appropriate journey step.

Example:

No profile
→ About You

Class 10 trying to open UG detail
→ Class 10 journey

Invalid programme
→ safe empty state

============================================================
28. UI LANGUAGE
============================================================

The interface should sound human.

Prefer:

"Let's start."

"Tell us a little about yourself."

"That helps."

"Now let's explore."

"Here's why this is showing up."

"Want to see where you can study it?"

"Which one would you like to understand?"

Avoid:

"Configure your profile."

"Select parameters."

"Manage preferences."

"View recommendation matrix."

"Manage educational pathways."

The student is not managing a database.

============================================================
29. VISUAL LANGUAGE
============================================================

The internal experience should NOT look like:

CRM
ERP
Attendance system
Admin dashboard
Management software
SaaS analytics

Use:

- generous whitespace
- one focal point
- editorial typography
- illustrations/stickers
- subtle cards
- minimal controls
- clear hierarchy
- calm transitions

Avoid:

- excessive glassmorphism
- neon AI styling
- giant gradient backgrounds
- too many panels
- dense tables
- constant badges
- dashboard widgets everywhere

============================================================
30. DESIGN ASSETS
============================================================

Use:

D:\OrbitAvayana\design

and existing stickers.

Do not invent a completely unrelated visual language.

Use supplied design assets to support the story/journey.

Do not let decorations overpower the content.

============================================================
31. IMPORTANT — DO NOT REMOVE CONTENT
============================================================

This is critical.

We are NOT reducing CareerNova's knowledge.

We are changing:

HOW INFORMATION IS REVEALED.

Broad research/data stays behind the scenes.

Student sees:

CURRENT DECISION

then:

RELEVANT INFORMATION

then:

NEXT DECISION.

This is progressive disclosure.

============================================================
32. TEST BEFORE MARKING COMPLETE
============================================================

Test the new guided journey with:

Class 10 confused
Class 12 confused
PCM
PCB
PCMB
Commerce
Arts
"I don't know"
degree-oriented
skill-oriented
government-oriented
diploma-oriented
local-only
financially concerned
Jammu Division
Kashmir Division

Verify each can:

Start
Answer
Next
Back
Complete
Save
Resume
Reach next decision

============================================================
33. REGRESSION TEST
============================================================

After redesigning the journey, re-test:

profile state
eligibility
pathway relationships
college relationships
outcomes
compare
shortlist
resources
next step
direct URLs
refresh
back/forward

The presentation change must NOT break core logic.

============================================================
34. PERFORMANCE / ACCESSIBILITY
============================================================

Check:

mobile
tablet
desktop
keyboard
focus
labels
contrast
reduced motion
large text
long content
slow network

No user should be blocked by the visual storytelling.

============================================================
35. DO NOT IMPLEMENT AUTH DELETION WITHOUT PROOF
============================================================

No blind deletion.

If auth is unnecessary:

remove only the user-facing requirement first.

Then verify.

Then remove unused backend/dependencies if proven safe.

============================================================
36. FINAL ACCEPTANCE CRITERIA
============================================================

PASS only if:

[ ] Start Exploring feels like a guided journey.
[ ] No CRM/admin-management feeling.
[ ] About You happens one step at a time.
[ ] Character/stickers guide rather than decorate.
[ ] One important question per screen.
[ ] No information dump.
[ ] Full verified content remains accessible.
[ ] "I Don't Know" feels safe.
[ ] Why explanations are available.
[ ] Student can explore multiple pathway families.
[ ] Student can understand local J&K options.
[ ] Student can compare.
[ ] Student can shortlist.
[ ] Student can identify next decision.
[ ] Student can reach official action.
[ ] Class 10/12 logic remains correct.
[ ] Back/Next/Refresh work.
[ ] Direct URLs work safely.
[ ] Authentication removal, if performed, does not break anything.
[ ] Mobile/tablet/desktop remain functional.
[ ] Accessibility is preserved.
[ ] No critical logic regression.

============================================================
37. FINAL RULE
============================================================

DO NOT REMOVE INFORMATION.

DO NOT FLOOD THE STUDENT WITH INFORMATION.

STORE BROAD KNOWLEDGE.

REVEAL NARROWLY.

ONE QUESTION.

ONE ANSWER.

ONE NEXT STEP.

ONE DECISION AT A TIME.

The goal is:

"I don't feel like I'm filling out a government/CRM form."

The goal is:

"I feel like someone is walking me through this."

============================================================
STOP CONDITION
============================================================

After implementing this journey:

TEST IT.

REGRESSION TEST THE CORE SYSTEM.

DO NOT immediately add more visual features.

Only after the journey is stable should the rest of the UI be polished.
`https://jkbose.nic.in`
- **Purpose:** Class 10 and Class 12 board curriculum, syllabi, scheme of studies, and stream eligibility rules.
- **Target Student:** Secondary and Higher Secondary school students in J&K.
- **CareerNova Role:** Contextual Stream Rules & Verification Handoff.

---

## Integration Priority Matrix

| Authority | Initiative | Priority | Integration Type | Student Stage |
|---|---|---|---|---|
| Directorate of Colleges | GDC Program Ecosystem | **P0** | Direct Data | Class 12 / UG |
| J&K Samarth Portal | Single Window UG Admissions | **P0** | Official Handoff | Class 12 / UG |
| Directorate of Skill Dev | ITI Vocational Admissions | **P0** | Direct Data | Class 10 / 12 |
| JKSDM | PMKVY 4.0 / Skill Survey | **P0** | Contextual | Youth / Skill |
| JKBOPEE | JKCET / Professional Exams | **P0** | Contextual | Class 12 Science |
| AICTE / J&K Govt | PMSSS Scholarship | **P0** | Contextual | Class 12 / Financial |
| JKPSC | Combined Competitive Exam | **P0** | Contextual | Graduates / Govt |
| JKSSB | Non-Gazetted Recruitments | **P1** | Contextual | Class 10/12/Grad |
| JKBOSE | Stream Rules & Syllabus | **P1** | Reference | Class 10 / 11 |
