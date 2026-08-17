// ============================================================
// PS-09 — Shortlist & Decision Workspace Utilities
// Persistent state for saved student decision options
// ============================================================

import type { ShortlistItem } from "@/types/ps09";

const SHORTLIST_STORAGE_KEY = "ps09_student_shortlist";

export function getShortlist(): ShortlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(SHORTLIST_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error("Failed to load shortlist from localStorage", e);
    return [];
  }
}

export function saveShortlist(items: ShortlistItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SHORTLIST_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save shortlist to localStorage", e);
  }
}

export function toggleShortlistItem(item: ShortlistItem): boolean {
  const current = getShortlist();
  const exists = current.some((i) => i.id === item.id);
  let updated: ShortlistItem[];

  if (exists) {
    updated = current.filter((i) => i.id !== item.id);
  } else {
    updated = [...current, item];
  }

  saveShortlist(updated);
  return !exists; // returns true if newly added, false if removed
}

export function isShortlisted(id: string): boolean {
  const current = getShortlist();
  return current.some((i) => i.id === id);
}

export function clearShortlist(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SHORTLIST_STORAGE_KEY);
}
