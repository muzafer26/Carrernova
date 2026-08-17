// ============================================================
// PS-09 — J&K Official Resource Registry
// Source of truth: Approved Official Ecosystem Audit (2026-08-15)
// ============================================================

import type { OfficialResource } from "@/types/ps09";

export const officialResources: OfficialResource[] = [
  {
    key: "jk-samarth-admissions",
    title: "J&K Higher Education Centralised Admission Portal",
    organization: "Directorate of Colleges, Higher Education Department J&K (UT)",
    category: "Admissions",
    audienceStage: "Class 12 Passed / UG Admission",
    description:
      "Official centralized online portal for undergraduate admissions across Government Degree Colleges in Jammu & Kashmir for the 2026–27 academic session under NEP-2020 FYUGP.",
    url: "https://jkadmissions.in",
    source: {
      label: "J&K Higher Education Admission Portal (Directorate of Colleges J&K 2026–27)",
      url: "https://jkadmissions.in",
      retrievedOn: "2026-08-16",
      status: "verified",
    },
    verificationStatus: "verified",
  },
  {
    key: "directorate-colleges-jk",
    title: "Directorate of Colleges J&K — Course & College Directory",
    organization: "Higher Education Department, Government of J&K",
    category: "Admissions",
    audienceStage: "Class 12 / UG / College Discovery",
    description:
      "Official public portal for exploring verified undergraduate courses, subject streams, intake capacity, and Government Degree Colleges across J&K UT.",
    url: "https://directorcollegesjk.in/authusers/CourseListPublic.aspx",
    source: {
      label: "Directorate of Colleges J&K Explore Courses & Colleges (Session 2026–27)",
      url: "https://directorcollegesjk.in/authusers/CourseListPublic.aspx",
      retrievedOn: "2026-08-16",
      status: "verified",
    },
    verificationStatus: "verified",
  },
  {
    key: "university-of-jammu",
    title: "University of Jammu Official Portal",
    organization: "University of Jammu",
    category: "Universities",
    audienceStage: "Class 12 / UG / PG",
    description:
      "Official university portal providing college affiliation lists, FYUGP course statutes, academic notifications, and postgraduate admission guidelines for Jammu Division.",
    url: "https://jammuuniversity.ac.in",
    source: {
      label: "University of Jammu Official Web Portal",
      url: "https://jammuuniversity.ac.in",
      retrievedOn: "2026-08-15",
      status: "verified",
    },
    verificationStatus: "verified",
  },
  {
    key: "university-of-kashmir",
    title: "University of Kashmir Official Portal",
    organization: "University of Kashmir",
    category: "Universities",
    audienceStage: "Class 12 / UG / PG",
    description:
      "Official university portal for academic regulations, affiliated government degree college lists, UG course frameworks, and PG admission notifications in Kashmir Division.",
    url: "https://www.kashmiruniversity.net",
    source: {
      label: "University of Kashmir Official Web Portal",
      url: "https://www.kashmiruniversity.net",
      retrievedOn: "2026-08-15",
      status: "verified",
    },
    verificationStatus: "verified",
  },
  {
    key: "jkbopee-entrance",
    title: "J&K Board of Professional Entrance Examinations (JKBOPEE)",
    organization: "J&K BOPEE (Government of J&K)",
    category: "Entrance Exams",
    audienceStage: "Class 12 / Professional Entry",
    description:
      "Official authority for conducting entrance tests and counseling for professional undergraduate programs including B.Sc Nursing, Engineering, Paramedical, and Agriculture.",
    url: "https://www.jkbopee.gov.in",
    source: {
      label: "J&K BOPEE Official Web Portal",
      url: "https://www.jkbopee.gov.in",
      retrievedOn: "2026-08-15",
      status: "verified",
    },
    verificationStatus: "verified",
  },
  {
    key: "pmsss-aicte-jk",
    title: "Prime Minister's Special Scholarship Scheme (PMSSS J&K)",
    organization: "AICTE / Ministry of Education, Govt. of India",
    category: "Scholarships",
    audienceStage: "Class 12 Passed",
    description:
      "Official scholarship scheme providing academic fee waivers and maintenance allowances for eligible J&K Class 12 graduates pursuing higher education.",
    url: "https://www.aicte-jk-scholarship-gov.in",
    source: {
      label: "AICTE PMSSS Official Portal",
      url: "https://www.aicte-jk-scholarship-gov.in",
      retrievedOn: "2026-08-16",
      status: "verified",
    },
    verificationStatus: "verified",
  },
  {
    key: "national-scholarship-portal",
    title: "National Scholarship Portal (NSP)",
    organization: "Ministry of Electronics & IT / Govt. of India & J&K Social Welfare Dept.",
    category: "Scholarships",
    audienceStage: "Class 10 / Class 12 / UG",
    description:
      "Central government portal for applying to Post-Matric Scholarships, Central Sector Scholarship Schemes, and category-specific financial aid.",
    url: "https://scholarships.gov.in",
    source: {
      label: "National Scholarship Portal Official Website",
      url: "https://scholarships.gov.in",
      retrievedOn: "2026-08-15",
      status: "verified",
    },
    verificationStatus: "verified",
  },
  {
    key: "jkpsc-state-services",
    title: "J&K Public Service Commission (JKPSC)",
    organization: "J&K Public Service Commission",
    category: "Government Exams",
    audienceStage: "Graduate / Post-UG",
    description:
      "Official state commission portal for Combined Competitive Examinations (CCE), higher education Assistant Professorships, and Gazetted officer recruitments.",
    url: "https://jkpsc.nic.in",
    source: {
      label: "JKPSC Official Portal",
      url: "https://jkpsc.nic.in",
      retrievedOn: "2026-08-15",
      status: "verified",
    },
    verificationStatus: "verified",
  },
  {
    key: "jkssb-recruitment",
    title: "J&K Services Selection Board (JKSSB)",
    organization: "J&K Services Selection Board",
    category: "Government Exams",
    audienceStage: "Graduate / Post-UG",
    description:
      "Official board portal for non-gazetted graduate-level recruitment examinations across J&K government departments.",
    url: "https://jkssb.nic.in",
    source: {
      label: "JKSSB Official Web Portal",
      url: "https://jkssb.nic.in",
      retrievedOn: "2026-08-15",
      status: "verified",
    },
    verificationStatus: "verified",
  },
  {
    key: "nta-cuet-pg",
    title: "National Testing Agency — CUET-PG Portal",
    organization: "National Testing Agency (NTA)",
    category: "Entrance Exams",
    audienceStage: "UG Final Year / Graduate",
    description:
      "Official NTA portal for Postgraduate Central University Entrance Tests (CUET-PG) for admission to M.Sc, M.Com, M.A., and MCA programs.",
    url: "https://pgcuet.samarth.ac.in",
    source: {
      label: "NTA CUET-PG Official Portal",
      url: "https://pgcuet.samarth.ac.in",
      retrievedOn: "2026-08-15",
      status: "verified",
    },
    verificationStatus: "verified",
  },
  {
    key: "jkbose-school-education",
    title: "J&K Board of School Education (JKBOSE)",
    organization: "J&K Board of School Education",
    category: "School Education",
    audienceStage: "Class 10 / Class 12",
    description:
      "Official state school board portal providing 10th and 12th syllabi, stream subject combinations, scheme of studies, and board examination notices.",
    url: "https://jkbose.jk.gov.in",
    source: {
      label: "JKBOSE Official Web Portal",
      url: "https://jkbose.jk.gov.in",
      retrievedOn: "2026-08-16",
      status: "verified",
    },
    verificationStatus: "verified",
  },
  {
    key: "gdc-kathua-portal",
    title: "Government Degree College Kathua Official Portal",
    organization: "Government Degree College Kathua (Affiliated to JU)",
    category: "Government Colleges",
    audienceStage: "Class 12 / UG",
    description:
      "Official college website providing department profiles, course intake capacities, campus notices, and academic subject combination matrices.",
    url: "http://gdckathua.in",
    source: {
      label: "Official Portal — Government Degree College Kathua",
      url: "http://gdckathua.in",
      retrievedOn: "2026-08-15",
      status: "verified",
    },
    verificationStatus: "verified",
  },
  {
    key: "gdc-akhnoor-portal",
    title: "Government Degree College Akhnoor Official Portal",
    organization: "Government Degree College Akhnoor (Affiliated to JU)",
    category: "Government Colleges",
    audienceStage: "Class 12 / UG",
    description:
      "Official college website providing undergraduate program details, NEP FYUGP subject combinations, and student notifications.",
    url: "http://gdcakhnoor.com",
    source: {
      label: "Official Portal — Government Degree College Akhnoor",
      url: "http://gdcakhnoor.com",
      retrievedOn: "2026-08-15",
      status: "verified",
    },
    verificationStatus: "verified",
  },
];

export const officialResourcesByKey: Record<string, OfficialResource> = Object.fromEntries(
  officialResources.map((r) => [r.key, r])
);
