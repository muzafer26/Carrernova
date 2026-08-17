// ============================================================
// PS-09 — Contextual Scholarship & Financial Support Helper
// SIH25094 — Source of Truth: AICTE PMSSS J&K & National Scholarship Portal (NSP)
// ============================================================

import type { StudentProfile } from "@/types/ps09";

export interface ScholarshipMatch {
  key: string;
  title: string;
  provider: string;
  relevanceReason: string;
  amountDetails: string;
  eligibilitySummary: string;
  officialUrl: string;
  audienceStage: string;
}

export function getContextualScholarships(
  profile: StudentProfile | null,
  courseKey?: string,
  collegeType?: string
): ScholarshipMatch[] {
  const matches: ScholarshipMatch[] = [];

  // PMSSS Scheme
  const isClass12 = profile ? profile.class === "Class 12" : true;
  if (isClass12) {
    matches.push({
      key: "pmsss-aicte-jk",
      title: "Prime Minister's Special Scholarship Scheme (PMSSS J&K)",
      provider: "AICTE / Ministry of Education, Govt. of India",
      relevanceReason:
        "Direct financial waiver for eligible J&K Class 12 graduates pursuing higher education in general degrees, professional engineering, or medical streams.",
      amountDetails:
        "Academic Fee Waiver (up to ₹1.25 Lakh/yr for General UG, up to ₹3.0 Lakh/yr for Professional) + Maintenance Allowance of ₹1.0 Lakh/yr.",
      eligibilitySummary:
        "Domicile of J&K / Ladakh, passed Class 12 from JKBOSE or CBSE school in J&K, family income below ₹8.0 Lakh per annum.",
      officialUrl: "https://www.aicte-jk-scholarship-gov.in",
      audienceStage: "Class 12 Passed",
    });
  }

  // NSP Post-Matric & Central Sector Scheme
  matches.push({
    key: "national-scholarship-portal",
    title: "National Scholarship Portal (NSP) — Post-Matric & Central Sector Schemes",
    provider: "Ministry of Electronics & IT / Govt. of India & J&K Social Welfare Dept.",
    relevanceReason:
      "Central government umbrella scholarship for SC/ST/OBC/EWS/Minority students pursuing Class 11, Class 12, ITI vocational diplomas, or undergraduate GDC degree programs.",
    amountDetails:
      "Post-matric fee reimbursement & annual stipend based on category and scheme rules.",
    eligibilitySummary:
      "Category certificate (SC/ST/OBC/EWS) or merit criteria, family income threshold as per specific ministry guidelines.",
    officialUrl: "https://scholarships.gov.in",
    audienceStage: "Class 10 / Class 12 / UG Degree / ITI",
  });

  return matches;
}
