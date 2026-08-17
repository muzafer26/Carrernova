// ============================================================
// PS-09 — J&K Verified Government Career Pathways & Exam Maps
// SIH25094 — Source of Truth: JKPSC & JKSSB Official Examination Rules
// ============================================================

import type { GovtPathway } from "@/types/ps09";

export const govtPathways: GovtPathway[] = [
  {
    key: "jkpsc-cce",
    targetCadre: "J&K Administrative Service (JKAS) / Police Service (JKPS) / Accounts Service",
    conductingAuthority: "J&K Public Service Commission (JKPSC)",
    summary: "State gazetted officer administrative service pathway. Conducted annually via the Combined Competitive Examination (CCE) for key administrative positions across J&K UT.",
    eligibility: "Must hold a Bachelor's Degree in any discipline (B.A., B.Sc, B.Com, BCA, BBA, B.Tech) from a recognized university.",
    ageLimit: "21 to 32 years (Relaxation applies for reserved categories as per J&K UT rules).",
    selectionProcess: [
      "Stage 1: Preliminary Examination (Objective General Studies & CSAT)",
      "Stage 2: Main Examination (Written Descriptive Papers)",
      "Stage 3: Personality Test / Interview",
    ],
    educationSteppingStones: [
      {
        stage: "Step 1: Class 10 & 12 Completion",
        action: "Pass Higher Secondary in any stream (Arts, Science, or Commerce under JKBOSE).",
        details: "Stream choice does not restrict eligibility, as any recognized degree qualifies.",
      },
      {
        stage: "Step 2: Undergraduate Degree",
        action: "Enroll in a 3-year or 4-year Bachelor's degree (e.g. B.A., B.Com, B.Sc) at any recognized GDC.",
        details: "Focus on building analytical reading, essay writing, and general awareness during UG years.",
      },
      {
        stage: "Step 3: Final Year Exam Preparation",
        action: "Begin GS & optional subject preparation during final year of UG degree.",
        details: "Monitor official notification on JKPSC portal (`jkpsc.nic.in`).",
      },
      {
        stage: "Step 4: Application & Examination",
        action: "Apply online at JKPSC portal upon graduating or in final semester.",
        details: "Appear for Prelims, Mains, and Interview.",
      },
    ],
    officialPortal: {
      label: "J&K Public Service Commission (JKPSC Official Portal)",
      url: "https://jkpsc.nic.in",
    },
    source: {
      label: "J&K Public Service Commission (JKPSC) CCE Rules",
      url: "https://jkpsc.nic.in",
      retrievedOn: "2026-08-15",
      status: "verified",
    },
    verificationStatus: "verified",
  },
  {
    key: "jkssb-graduate-cadre",
    targetCadre: "J&K Non-Gazetted Executive Cadres (Sub-Inspector, Inspector, Panchayat Secretary, Accounts Assistant)",
    conductingAuthority: "J&K Services Selection Board (JKSSB)",
    summary: "State non-gazetted recruitment examinations conducted by JKSSB for executive, administrative support, and field department posts across J&K districts.",
    eligibility: "Must hold a Bachelor's Degree in any discipline (or specific stream for specialized posts like Accounts Assistant) from a recognized university.",
    ageLimit: "18 to 40 years for open merit (relaxation for reserved categories).",
    selectionProcess: [
      "Computer Based Written Test (CBT) or OMR-based Objective Test",
      "Document Verification",
      "Physical Standard / Fitness Test (for Sub-Inspector police posts)",
    ],
    educationSteppingStones: [
      {
        stage: "Step 1: Class 12 Completion",
        action: "Complete 10+2 Higher Secondary in any stream under JKBOSE.",
        details: "Commerce/Maths stream provides an added advantage for Accounts Assistant roles.",
      },
      {
        stage: "Step 2: Graduate Degree",
        action: "Earn a recognized Bachelor's Degree (B.Com, B.A., B.Sc, BCA) from a J&K Government College.",
        details: "Ensure degree registration is verified under University of Jammu or Kashmir.",
      },
      {
        stage: "Step 3: JKSSB Portal Registration & Application",
        action: "Register on JKSSB portal (`jkssb.nic.in`) and submit application for advertised posts.",
        details: "Prepare for General Knowledge (with special reference to J&K UT), Reasoning, Basic Maths, and Computer Awareness.",
      },
    ],
    officialPortal: {
      label: "J&K Services Selection Board (JKSSB Official Web Portal)",
      url: "https://jkssb.nic.in",
    },
    source: {
      label: "J&K Services Selection Board (JKSSB) Official Notifications",
      url: "https://jkssb.nic.in",
      retrievedOn: "2026-08-15",
      status: "verified",
    },
    verificationStatus: "verified",
  },
  {
    key: "jkbopee-bsc-nursing",
    targetCadre: "Professional Paramedical & Nursing Cadre (Staff Nurse / Clinical Specialist)",
    conductingAuthority: "J&K Board of Professional Entrance Examinations (JKBOPEE)",
    summary: "State professional entrance examination for admission to 4-year B.Sc Nursing, B.Sc Paramedical, and B.Sc Technology courses in Government Nursing Colleges across J&K.",
    eligibility: "Passed 10+2 examination with Physics, Chemistry, Biology (PCB) and English securing min 45% aggregate (40% for reserved categories).",
    ageLimit: "Minimum 17 years as of 31st December of the admission year.",
    selectionProcess: [
      "JKBOPEE Entrance Examination (Objective 10+2 PCB level paper)",
      "Centralized State Counseling & Seat Allotment",
    ],
    educationSteppingStones: [
      {
        stage: "Step 1: Class 12 Science (PCB)",
        action: "Pass 10+2 with Physics, Chemistry, Biology, and English under JKBOSE.",
        details: "Must meet 45% aggregate statutory eligibility threshold.",
      },
      {
        stage: "Step 2: JKBOPEE Entrance Exam",
        action: "Apply online at `jkbopee.gov.in` and sit for the B.Sc Nursing / Paramedical Common Entrance Test.",
        details: "Conducted annually between April and June.",
      },
      {
        stage: "Step 3: Professional 4-Year B.Sc Degree",
        action: "Complete 4-year B.Sc Nursing program at Government Nursing College Jammu / Srinagar.",
        details: "Includes mandatory clinical hospital internship.",
      },
    ],
    officialPortal: {
      label: "J&K BOPEE Official Web Portal",
      url: "https://www.jkbopee.gov.in",
    },
    source: {
      label: "J&K BOPEE Official Information Brochure 2026",
      url: "https://www.jkbopee.gov.in",
      retrievedOn: "2026-08-15",
      status: "verified",
    },
    verificationStatus: "verified",
  },
];

export const govtPathwaysByKey: Record<string, GovtPathway> = Object.fromEntries(
  govtPathways.map((g) => [g.key, g])
);
