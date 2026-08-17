# PS-09 Core Logic Repair Plan
**System:** CareerNova (SIH25094)  
**Date:** 2026-08-16  

---

## Proposed Changes Matrix

| Target File | Current Behavior | Intended Behavior | Reason / Rationale | Dependency / Risk | Verification Test |
|---|---|---|---|---|---|
| `src/routes/dashboard.directions.index.tsx` *(New File / Refactor)* | `dashboard.directions.tsx` acts as flat page, blocking child route `/dashboard/directions/$key`. | `dashboard.directions.index.tsx` serves as the list view for `/dashboard/directions`, allowing `/dashboard/directions/$key` to render standalone. | Fixes TanStack Router child route stagnation when clicking "Explore Education Options". | Low risk; standard TanStack Router file convention. | Click "Explore Education Options" in browser subagent; verify `/dashboard/directions/sciences` renders `DirectionDetailPage`. |
| `src/routes/dashboard.directions.tsx` *(Refactor)* | Flat page component. | Simple layout component rendering `<Outlet />`. | Enables child routes (`index` and `$key`) to render within `/dashboard/directions` context. | Low risk. | Browser subagent verification of `/dashboard/directions` and `/dashboard/directions/sciences`. |
| `src/routes/dashboard.profile.tsx` | Changing Class 12 stream keeps old `ps09_assess_weights` in `localStorage`. | Changing stream within Class 12 clears `ps09_assess_weights` so stale assessment signals do not contaminate the new stream recommendations. | Prevents obsolete assessment weights from scoring newly selected stream choices. | Low risk. | Switch Class 12 PCM → Commerce; verify assessment weights reset. |
| `src/lib/directions.ts` | Handles qualification gating and soft signal ranking. | Preserve non-predictive language, stream hard filtering, and explicit uncertainty handling. | Ensures zero predictive career claims and strict hard stream qualification enforcement. | High priority core logic file. | Run deterministic signal tests in `scripts/test-directions.ts`. |

---

## Phase Implementation Plan Execution Sequence

1. **Step 1:** Create `src/routes/dashboard.directions.index.tsx` containing the list view from `src/routes/dashboard.directions.tsx`.
2. **Step 2:** Refactor `src/routes/dashboard.directions.tsx` to render `<Outlet />`.
3. **Step 3:** Update `src/routes/dashboard.profile.tsx` to clear `ps09_assess_weights` when changing streams.
4. **Step 4:** Execute full browser subagent validation to verify navigation across `/dashboard/directions`, `/dashboard/directions/sciences`, `/dashboard/colleges`, `/dashboard/outcomes/sciences`, `/dashboard/resources`, and `/dashboard/nextstep`.
