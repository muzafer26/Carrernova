// ============================================================
// PS-09 — J&K Class 10 Stream Exploration Data
// SIH25094 — Source: JKBOSE Scheme of Studies
//
// PRIMARY SOURCE:
//   J&K Board of School Education (JKBOSE)
//   Official Website: https://jkbose.jk.gov.in
//   Retrieved: 2026-08-16
//
// IMPORTANT SCOPE LIMITS:
//   - coreSubjectAreas: broad subject areas from JKBOSE faculty structure.
//     These are NOT exhaustive subject lists and NOT exact subject codes.
//     Specific combinations vary by school availability and academic session.
//     Students MUST confirm with their school and the official JKBOSE portal.
//   - ugPathExamples: product-level examples to illustrate possibilities.
//     These are NOT guaranteed pathways and NOT official eligibility claims.
//   - Stream selection after Class 10 is a SCHOOL-LEVEL process.
//     JKBOSE does NOT operate a centralized stream-selection portal.
//
// This data must NOT be used to make definitive claims about eligibility.
// ============================================================

import type { StreamExploration } from "@/types/ps09";

export const class10Streams: StreamExploration[] = [
  // ----------------------------------------------------------
  // STREAM 1 — Science
  // JKBOSE Faculty of Science
  // ----------------------------------------------------------
  {
    key: "science",
    label: "Science",
    coreSubjectAreas: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Biology",
      "Computer Science",
      "Biotechnology",
      "Environmental Science",
    ],
    whatYouLearn:
      "The Science faculty focuses on natural laws, mathematical reasoning, experimental investigation, and applied scientific thinking. Students study both theoretical concepts and laboratory-based practicals. Subject combinations typically include Physics and Chemistry as a base, with students choosing between Mathematics and Biology (or both in some schools) as electives.",
    ugPathExamples: [
      "B.Sc programs (Computer Application, Biotechnology, Biological Sciences, Chemistry)",
      "BCA (Bachelor of Computer Applications)",
      "B.Tech / Engineering (via JEE / state entrance) — requires PCM",
      "B.Sc Nursing / Paramedical programs (via JKBOPEE) — requires PCB",
      "B.Pharma — typically requires PCB",
      "BBA / B.Com — also accessible to Science stream students",
    ],
    questionsToConsider: [
      "Do you find solving mathematical problems or conducting laboratory experiments interesting?",
      "Are you curious about how natural systems, living organisms, or technology works?",
      "Do you prefer subjects that involve reasoning through problems step by step?",
      "Are you comfortable with regular practicals and experimental work?",
      "Are there specific Science areas — like computers, biology, or chemistry — that appeal to you more than others?",
    ],
    source: {
      label: "J&K Board of School Education — Scheme of Studies (Faculty of Science)",
      url: "https://jkbose.jk.gov.in",
      retrievedOn: "2026-08-16",
      status: "verified",
    },
    verificationStatus: "verified",
  },

  // ----------------------------------------------------------
  // STREAM 2 — Commerce
  // JKBOSE Faculty of Commerce
  // ----------------------------------------------------------
  {
    key: "commerce",
    label: "Commerce",
    coreSubjectAreas: [
      "Accountancy",
      "Business Studies",
      "Economics",
      "Entrepreneurship",
      "Business Mathematics",
      "English (compulsory)",
    ],
    whatYouLearn:
      "The Commerce faculty focuses on how businesses and economies function. Students develop skills in financial accounting, business management, and economic analysis. Accountancy and Business Studies are core subjects across most schools. Economics is commonly offered as an elective. Mathematics-based commerce subjects may be available at select schools.",
    ugPathExamples: [
      "B.Com (Bachelor of Commerce)",
      "BBA (Bachelor of Business Administration)",
      "BCA (Bachelor of Computer Applications) — accessible to Commerce students at select GDCs",
      "B.A. Economics or related humanities degrees",
      "Chartered Accountancy (ICAI) — Direct Entry route available for B.Com graduates",
    ],
    questionsToConsider: [
      "Are you interested in understanding how businesses are organised and managed?",
      "Does financial accounting or working with numbers in a business context appeal to you?",
      "Are you curious about economics — how prices, markets, or economies work?",
      "Do you see yourself working in business, finance, or entrepreneurship in the future?",
      "Are you comfortable with subjects that involve both conceptual understanding and numerical work?",
    ],
    source: {
      label: "J&K Board of School Education — Scheme of Studies (Faculty of Commerce)",
      url: "https://jkbose.jk.gov.in",
      retrievedOn: "2026-08-16",
      status: "verified",
    },
    verificationStatus: "verified",
  },

  // ----------------------------------------------------------
  // STREAM 3 — Arts / Humanities
  // JKBOSE Faculty of Arts (Humanities)
  // ----------------------------------------------------------
  {
    key: "arts",
    label: "Arts / Humanities",
    coreSubjectAreas: [
      "History",
      "Political Science",
      "Sociology",
      "Geography",
      "Psychology",
      "Education",
      "Economics",
      "English (compulsory)",
      "Languages (Urdu, Hindi, Kashmiri, Dogri, and others)",
    ],
    whatYouLearn:
      "The Arts/Humanities faculty explores human societies, culture, language, history, and social systems. Students engage with analytical thinking, essay writing, and critical reading. Subject combinations are flexible — students typically choose four electives from a broad set covering social sciences, languages, and humanities disciplines. Economics may also be taken in this stream.",
    ugPathExamples: [
      "B.A. (Bachelor of Arts) — majors in English, Economics, History, Political Science, Dogri, Sociology and other humanities",
      "B.A. with Language specialisation",
      "B.Ed pathway (Bachelor of Education) after a B.A. degree",
      "Law — LL.B. after graduation",
      "Social Work — after graduation",
      "Government services — JKPSC / JKSSB examinations after graduation",
    ],
    questionsToConsider: [
      "Do you enjoy reading, writing, or exploring ideas through essays and discussion?",
      "Are you curious about history, society, politics, or how cultures evolve?",
      "Do languages — Urdu, Kashmiri, Dogri, Hindi, or English — interest you?",
      "Are you drawn to understanding people, social systems, or human behaviour?",
      "Do you prefer subjects where you can express ideas and argue a perspective rather than solve numerical problems?",
    ],
    source: {
      label: "J&K Board of School Education — Scheme of Studies (Faculty of Arts/Humanities)",
      url: "https://jkbose.jk.gov.in",
      retrievedOn: "2026-08-16",
      status: "verified",
    },
    verificationStatus: "verified",
  },
];

// O(1) lookup by StreamKey
export const class10StreamsByKey: Record<string, StreamExploration> =
  Object.fromEntries(class10Streams.map((s) => [s.key, s]));
