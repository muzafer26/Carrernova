// ============================================================
// PS-09 — J&K Verified Education Directions & Courses
// SIH25094 — Source of Truth: First-party / Authoritative sources
//
// TAXONOMY NOTE:
// The direction groupings below ("sciences", "commerce-management", "arts-humanities")
// are PRODUCT TAXONOMY GROUPINGS designed for recommendation UX. They are not
// presented as official government classifications.
//
// DURATION NOTE:
// Program durations are omitted (undefined) because J&K degree colleges operate
// under the Four-Year Undergraduate Programme (FYUGP) framework under NEP-2020,
// which offers multiple entry/exit options (3-year UG Degree / 4-year Honours).
//
// Primary Sourced Portals:
//   - https://jkadmissions.samarth.ac.in (J&K Samarth Admission Portal 2026-27 — Directorate of Colleges J&K)
//   - https://jammuuniversity.ac.in (University of Jammu Affiliation List & Statutes 2026-27)
//   - http://gdckathua.in (Official Portal — GDC Kathua)
//   - http://gdcakhnoor.com (Official Portal — GDC Akhnoor)
//   - https://pgcuet.samarth.ac.in (NTA CUET-PG Official Information Bulletin)
//   - https://dbt.nta.ac.in (DBT GAT-B Official Portal)
//   - https://jkdsd.in (J&K Department of Skill Development / ITI J&K)
//   - https://jkpsc.nic.in (J&K Public Service Commission)
//   - https://jkssb.nic.in (J&K Services Selection Board)
// ============================================================

import type { Direction } from "@/types/ps09";

export const directions: Direction[] = [
  // ----------------------------------------------------------
  // PRODUCT DIRECTION 1 — Natural & Applied Sciences
  // ----------------------------------------------------------
  {
    key: "sciences",
    label: "Natural & Applied Sciences",
    description:
      "Product category grouping verified undergraduate science degree programs, including computer applications, biological sciences, biotechnology, and chemical sciences.",
    streamRequirements: ["Science (PCM)", "Science (PCB)", "Science (PCMB)"],
    classRequired: ["Class 12"],
    interests: ["Computer Science", "Biology", "Chemistry", "Biotechnology", "Environment"],
    relatedExams: ["CUET-PG", "GAT-B"],
    outcomes: [],
    courses: [
      {
        key: "bsc-computer-application",
        label: "B.Sc Computer Application",
        directionKey: "sciences",
        eligibility:
          "Passed 10+2 / Higher Secondary Part-II examination with Science stream (PCM / Computer Science / Information Technology) or equivalent qualification from JKBOSE / recognized board with min 45% aggregate (40% for reserved categories).",
        description:
          "Undergraduate degree program in computer applications and software fundamentals.",
        whatYouWillStudy: [
          "Programming Fundamentals (C++ / Python)",
          "Computer Organization & Architecture",
          "Database Management Systems (DBMS)",
          "Data Structures & Algorithm Basics",
          "Web Technology & Digital Applications",
        ],
        skillAlternative: {
          label: "NSQF Level 4/5 ITI Diploma in Computer Hardware & Networking",
          description:
            "6-to-12 month practical vocational skill training focusing on system assembly, hardware troubleshooting, network configuration, and IT maintenance.",
          purpose:
            "Designed for immediate technician/support job readiness without pursuing a 4-year academic degree. Does not qualify for postgraduate university entrance (e.g. M.Sc / MCA).",
          source: {
            label: "J&K Department of Skill Development (DSD) Official Portal",
            url: "https://jkdsd.in",
            retrievedOn: "2026-08-16",
            status: "verified",
          },
        },
        relatedExams: ["CUET-PG (SCQP09)"],
        outcomes: [
          {
            label: "M.Sc Computer Science",
            type: "higher-study",
            description:
              "Postgraduate degree in computer science. B.Sc with Computer Application or Computer Science is an eligible qualifying degree at University of Jammu.",
            source: {
              label: "University of Jammu PG Admission Statutes, Dept. of Computer Science & IT",
              url: "https://jammuuniversity.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "MCA (Master of Computer Applications)",
            type: "higher-study",
            description:
              "2-year professional postgraduate degree in software systems and computer applications.",
            source: {
              label: "University of Jammu Department of Computer Science & IT Admission Notice",
              url: "https://jammuuniversity.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "CUET-PG (Computer Science & MCA)",
            type: "exam",
            description:
              "National Postgraduate Entrance Examination paper (SCQP09) for M.Sc Computer Science and MCA admissions.",
            source: {
              label: "NTA CUET-PG Official Information Bulletin 2025-26",
              url: "https://pgcuet.samarth.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
        ],
        collegeKeys: ["gdc-kathua", "gdc-akhnoor"],
        source: {
          label: "J&K Samarth Higher Education Admission Portal (Directorate of Colleges J&K 2026-27)",
          url: "https://jkadmissions.samarth.ac.in",
          retrievedOn: "2026-08-16",
          status: "verified",
        },
        verificationStatus: "verified",
      },
      {
        key: "bsc-biotechnology",
        label: "B.Sc Biotechnology",
        directionKey: "sciences",
        eligibility:
          "Passed 10+2 / Higher Secondary Part-II examination with Science stream (PCB / PCMB with Biology/Biotechnology as core subject) from JKBOSE / recognized board with min 50% aggregate (45% for reserved categories).",
        description:
          "Undergraduate degree program in biotechnology and biological sciences.",
        whatYouWillStudy: [
          "Cell & Molecular Biology",
          "Biochemistry & Enzymology",
          "Recombinant DNA Technology",
          "Microbiology & Genetics",
          "Bio-analytical Laboratory Techniques",
        ],
        skillAlternative: {
          label: "NSQF Vocational Certificate in Medical Lab Technology (MLT)",
          description:
            "1-year vocational skill diploma focusing on clinical sample testing, pathology lab procedures, and diagnostic equipment operation.",
          purpose:
            "Provides targeted technical lab assistant skills for immediate diagnostic facility employment. Differs from B.Sc degree research/academic progression.",
          source: {
            label: "J&K State Skill Development Mission (JKSSDM) Portal",
            url: "https://jkdpm.jk.gov.in",
            retrievedOn: "2026-08-16",
            status: "verified",
          },
        },
        relatedExams: ["GAT-B", "CUET-PG (SCQP06)"],
        outcomes: [
          {
            label: "M.Sc Biotechnology",
            type: "higher-study",
            description:
              "Postgraduate specialization in biotechnology. B.Sc Biotechnology or Biological Sciences is an eligible qualifying degree at University of Jammu and University of Kashmir.",
            source: {
              label: "University of Jammu School of Biotechnology Admission Notification",
              url: "https://jammuuniversity.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "GAT-B (Graduate Aptitude Test - Biotechnology)",
            type: "exam",
            description:
              "National entrance test conducted by NTA for Department of Biotechnology (DBT) supported M.Sc Biotechnology admissions.",
            source: {
              label: "DBT / NTA GAT-B Official Portal",
              url: "https://dbt.nta.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "CUET-PG (Biotechnology)",
            type: "exam",
            description:
              "National entrance test paper (SCQP06) for postgraduate biotechnology degree programs.",
            source: {
              label: "NTA CUET-PG Official Information Bulletin",
              url: "https://pgcuet.samarth.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
        ],
        collegeKeys: ["gdc-kathua"],
        source: {
          label: "Official Portal — Government Degree College Kathua",
          url: "http://gdckathua.in",
          retrievedOn: "2026-08-15",
          status: "verified",
        },
        verificationStatus: "verified",
      },
      {
        key: "bsc-botany-chemistry",
        label: "B.Sc Biological & Chemical Sciences (Botany / Chemistry / Zoology)",
        directionKey: "sciences",
        eligibility:
          "Passed 10+2 / Higher Secondary Part-II examination with Science stream (PCB / PCMB with Physics, Chemistry, and Biology/Mathematics) from JKBOSE / recognized board with min 45% aggregate (40% for reserved categories).",
        description:
          "Undergraduate degree majors in Botany, Chemistry, Zoology, and Environmental Science.",
        whatYouWillStudy: [
          "Plant Diversity & Physiology (Botany)",
          "Organic, Inorganic & Physical Chemistry",
          "Animal Diversity & Histology (Zoology)",
          "Environmental Studies & Ecology",
          "Qualitative & Quantitative Chemical Analysis",
        ],
        skillAlternative: {
          label: "Short-Term Vocational Certificate in Soil Testing & Agricultural Quality Control",
          description:
            "3-to-6 month practical skill module covering soil pH analysis, fertilizer testing, and agricultural lab procedures.",
          purpose:
            "Aimed at local agro-clinic technician training. Differs from broad 4-year B.Sc academic foundational degree study.",
          source: {
            label: "J&K Department of Agriculture & Farmers Welfare / Skill Portal",
            url: "https://jk.gov.in",
            retrievedOn: "2026-08-16",
            status: "verified",
          },
        },
        relatedExams: ["CUET-PG"],
        outcomes: [
          {
            label: "M.Sc Botany / M.Sc Chemistry",
            type: "higher-study",
            description:
              "Postgraduate degree programs in Botany or Chemistry. B.Sc with the relevant core subject is an eligible qualifying degree at University of Jammu and University of Kashmir.",
            source: {
              label: "University of Jammu PG Admission Statutes",
              url: "https://jammuuniversity.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "M.Sc Environmental Science",
            type: "higher-study",
            description:
              "Postgraduate degree in environmental sciences. B.Sc graduates in Botany, Chemistry, Zoology, or Environmental Science are eligible.",
            source: {
              label: "University of Jammu Dept. of Environmental Sciences Admission Notification",
              url: "https://jammuuniversity.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "B.Ed (Bachelor of Education)",
            type: "higher-study",
            description:
              "2-year professional degree for secondary school teaching eligibility in science subjects.",
            source: {
              label: "University of Jammu B.Ed Admission Statute & NCTE Guidelines",
              url: "https://jammuuniversity.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "CUET-PG (Botany / Chemistry / Environmental Science)",
            type: "exam",
            description:
              "National postgraduate entrance test papers (SCQP07 / SCQP08) for science Master's admissions.",
            source: {
              label: "NTA CUET-PG Official Information Bulletin",
              url: "https://pgcuet.samarth.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
        ],
        collegeKeys: ["gdc-kathua", "gdc-akhnoor"],
        source: {
          label: "J&K Samarth Higher Education Admission Portal (Directorate of Colleges J&K 2026-27)",
          url: "https://jkadmissions.samarth.ac.in",
          retrievedOn: "2026-08-16",
          status: "verified",
        },
        verificationStatus: "verified",
      },
    ],
    source: {
      label: "J&K Samarth Higher Education Admission Portal (Directorate of Colleges J&K 2026-27)",
      url: "https://jkadmissions.samarth.ac.in",
      retrievedOn: "2026-08-16",
      status: "verified",
    },
    verificationStatus: "verified",
  },

  // ----------------------------------------------------------
  // PRODUCT DIRECTION 2 — Commerce, Business & Management
  // ----------------------------------------------------------
  {
    key: "commerce-management",
    label: "Commerce, Business & Management",
    description:
      "Product category grouping verified undergraduate degree programs in commerce, accounting, business administration, and computer applications.",
    streamRequirements: ["Commerce", "Science (PCM)", "Arts"],
    classRequired: ["Class 12"],
    interests: ["Commerce", "Accounting", "Business", "Finance", "Management"],
    relatedExams: ["CAT", "CMAT", "CUET-PG"],
    outcomes: [],
    courses: [
      {
        key: "bcom",
        label: "B.Com (Bachelor of Commerce)",
        directionKey: "commerce-management",
        eligibility:
          "Passed 10+2 / Higher Secondary Part-II examination in Commerce, Science, or Arts stream with min 45% aggregate (40% for reserved categories) from JKBOSE / recognized board.",
        description:
          "Undergraduate degree program in commerce and financial accounting.",
        whatYouWillStudy: [
          "Financial Accounting & Auditing",
          "Business Regulatory Framework & Company Law",
          "Income Tax Law & GST Practice",
          "Corporate Accounting & Costing",
          "Commercial Statistics & Business Economics",
        ],
        skillAlternative: {
          label: "NSQF Level 4 Certification as Financial Accounting Assistant / GST Executive",
          description:
            "3-to-6 month vocational module focusing on Tally Prime, GST filing, and bookkeeping operations.",
          purpose:
            "Provides immediate entry-level accounting clerk skills. Differs from comprehensive 4-year B.Com academic foundation needed for M.Com or ICAI Direct Entry.",
          source: {
            label: "J&K Department of Skill Development (DSD) ITI Courses",
            url: "https://jkdsd.in",
            retrievedOn: "2026-08-16",
            status: "verified",
          },
        },
        relatedExams: ["CUET-PG (COQP08)", "ICAI Direct Entry"],
        outcomes: [
          {
            label: "M.Com (Master of Commerce)",
            type: "higher-study",
            description:
              "Postgraduate degree in commerce and accountancy. B.Com is an eligible qualifying degree at University of Jammu and University of Kashmir.",
            source: {
              label: "University of Jammu Department of Commerce Admission Statutes",
              url: "https://jammuuniversity.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "MBA (Master of Business Administration)",
            type: "higher-study",
            description:
              "Postgraduate management degree. Bachelor's degree in Commerce or any discipline is eligible at University of Jammu (The Business School).",
            source: {
              label: "The Business School (TBS), University of Jammu PG Information Bulletin",
              url: "https://jammuuniversity.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "ICAI Direct Entry (Chartered Accountancy)",
            type: "exam",
            description:
              "Direct Entry route to ICAI Intermediate for Commerce graduates with at least 55% aggregate marks.",
            source: {
              label: "Institute of Chartered Accountants of India (ICAI) Official Prospectus",
              url: "https://www.icai.org",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "CAT / CMAT / CUET-PG",
            type: "exam",
            description:
              "National management entrance tests for MBA and M.Com postgraduate admissions.",
            source: {
              label: "NTA CMAT Portal & IIM CAT Official Bulletin",
              url: "https://cmat.nta.nic.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
        ],
        collegeKeys: ["gdc-kathua", "gdc-akhnoor"],
        source: {
          label: "University of Jammu 2026-27 College Affiliation List",
          url: "https://jammuuniversity.ac.in",
          retrievedOn: "2026-08-16",
          status: "verified",
        },
        verificationStatus: "verified",
      },
      {
        key: "bba",
        label: "BBA (Bachelor of Business Administration)",
        directionKey: "commerce-management",
        eligibility:
          "Passed 10+2 / Higher Secondary Part-II examination in any stream (Commerce, Science, or Arts) from JKBOSE / recognized board with min 50% aggregate (45% for reserved categories).",
        description:
          "Undergraduate degree program in business administration.",
        whatYouWillStudy: [
          "Principles of Management & Organization",
          "Marketing Management & Consumer Behavior",
          "Human Resource Management Fundamentals",
          "Financial Management & Business Communications",
          "Entrepreneurship Development & Business Strategy",
        ],
        skillAlternative: {
          label: "NSQF Diploma in Retail Sales & Customer Relationship Management",
          description:
            "6-month vocational course emphasizing customer service, store inventory handling, and point-of-sale management.",
          purpose:
            "Aimed at quick retail assistant employment. Lacks the managerial depth, analytical foundation, and PG eligibility (MBA/CMAT) of a 4-year BBA degree.",
          source: {
            label: "J&K State Skill Development Mission (JKSSDM)",
            url: "https://jkdpm.jk.gov.in",
            retrievedOn: "2026-08-16",
            status: "verified",
          },
        },
        relatedExams: ["CAT", "CMAT", "CUET-PG (COQP12)"],
        outcomes: [
          {
            label: "MBA (Master of Business Administration)",
            type: "higher-study",
            description:
              "Postgraduate professional degree in business administration. BBA is an eligible qualifying degree at University of Jammu (The Business School).",
            source: {
              label: "The Business School (TBS), University of Jammu PG Information Bulletin",
              url: "https://jammuuniversity.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "CAT / CMAT Entrance Examinations",
            type: "exam",
            description:
              "Common Admission Test & CMAT for MBA postgraduate admissions across recognized business schools.",
            source: {
              label: "NTA CMAT & IIM CAT Official Bulletin",
              url: "https://cmat.nta.nic.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
        ],
        collegeKeys: ["gdc-kathua"],
        source: {
          label: "Official Portal — Government Degree College Kathua",
          url: "http://gdckathua.in",
          retrievedOn: "2026-08-15",
          status: "verified",
        },
        verificationStatus: "verified",
      },
      {
        key: "bca",
        label: "BCA (Bachelor of Computer Applications)",
        directionKey: "commerce-management",
        eligibility:
          "Passed 10+2 / Higher Secondary Part-II examination in any stream with Mathematics or Computer Science / Information Practice as a subject or min 45% aggregate from JKBOSE / recognized board.",
        description:
          "Undergraduate degree program in computer applications.",
        whatYouWillStudy: [
          "Software Engineering Principles",
          "Object-Oriented Programming (Java / C++)",
          "Web Applications Development (HTML/CSS/JS/Database)",
          "Data Structures & System Analysis",
          "Operating Systems & Computer Networks",
        ],
        skillAlternative: {
          label: "NSQF Level 5 Software Developer / Front-End Web Vocational Certificate",
          description:
            "6-to-12 month coding bootcamp certificate focusing on front-end web tools, UI coding, and software testing.",
          purpose:
            "Focuses purely on immediate practical coding skills. Does not cover theoretical computer science fundamentals required for MCA entrance (CUET-PG SCQP09).",
          source: {
            label: "J&K Department of Skill Development (DSD) Official Portal",
            url: "https://jkdsd.in",
            retrievedOn: "2026-08-16",
            status: "verified",
          },
        },
        relatedExams: ["CUET-PG (SCQP09)"],
        outcomes: [
          {
            label: "MCA (Master of Computer Applications)",
            type: "higher-study",
            description:
              "2-year postgraduate degree in software applications. BCA is an eligible qualifying degree at University of Jammu and University of Kashmir.",
            source: {
              label: "Department of Computer Science & IT, University of Jammu Admission Notice",
              url: "https://jammuuniversity.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "M.Sc IT (Master of Science in Information Technology)",
            type: "higher-study",
            description:
              "Postgraduate degree in Information Technology. BCA graduates are eligible at University of Jammu.",
            source: {
              label: "University of Jammu PG Admission Statutes",
              url: "https://jammuuniversity.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "CUET-PG (Computer Science / MCA)",
            type: "exam",
            description:
              "National postgraduate entrance examination paper (SCQP09) for MCA and M.Sc IT admissions.",
            source: {
              label: "NTA CUET-PG Official Information Bulletin",
              url: "https://pgcuet.samarth.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
        ],
        collegeKeys: ["gdc-kathua"],
        source: {
          label: "Official Portal — Government Degree College Kathua",
          url: "http://gdckathua.in",
          retrievedOn: "2026-08-15",
          status: "verified",
        },
        verificationStatus: "verified",
      },
    ],
    source: {
      label: "Official Portal — Government Degree College Kathua",
      url: "http://gdckathua.in",
      retrievedOn: "2026-08-15",
      status: "verified",
    },
    verificationStatus: "verified",
  },

  // ----------------------------------------------------------
  // PRODUCT DIRECTION 3 — Arts, Humanities & Languages
  // ----------------------------------------------------------
  {
    key: "arts-humanities",
    label: "Arts, Humanities & Languages",
    description:
      "Product category grouping verified undergraduate bachelor of arts degree programs covering literature, languages, economics, education, and social sciences.",
    streamRequirements: ["Arts", "Humanities", "Commerce", "Science (PCM)", "Science (PCB)"],
    classRequired: ["Class 12"],
    interests: ["Literature", "Languages", "Economics", "Education", "History", "Dogri"],
    relatedExams: ["CUET-PG", "JKPSC", "JKSSB"],
    outcomes: [],
    courses: [
      {
        key: "ba-humanities",
        label: "B.A (Bachelor of Arts — Humanities, Languages & Social Sciences)",
        directionKey: "arts-humanities",
        eligibility:
          "Passed 10+2 / Higher Secondary Part-II examination in any stream (Arts, Commerce, or Science) from JKBOSE / recognized board with min 45% aggregate (40% for reserved categories).",
        description:
          "Undergraduate degree with majors in English, Dogri, Economics, Education, History, and related humanities disciplines.",
        whatYouWillStudy: [
          "Political Theory & Indian Constitution",
          "History of India & Regional J&K History",
          "English Literature & Language Skills",
          "Dogri Literature & Cultural Studies",
          "Micro & Macro Economics Principles",
        ],
        skillAlternative: {
          label: "NSQF Diploma in Digital Media, Content Creation & Local Translation Skills",
          description:
            "6-month vocational certificate focusing on regional content creation, translation (English-Dogri/Urdu), and digital desktop publishing.",
          purpose:
            "Provides practical skills for media assistance and translation tasks. Does not replace 4-year degree eligibility for B.Ed, M.A., or JKPSC CCE administrative services.",
          source: {
            label: "J&K Skill Development Department / NSDC Regional Portal",
            url: "https://jkdsd.in",
            retrievedOn: "2026-08-16",
            status: "verified",
          },
        },
        relatedExams: ["CUET-PG", "JKPSC CCE", "JKSSB"],
        outcomes: [
          {
            label: "M.A. (Master of Arts in English / Dogri / Economics / History)",
            type: "higher-study",
            description:
              "Postgraduate degree in humanities disciplines. B.A. with the relevant elective/core subject is eligible at University of Jammu and University of Kashmir.",
            source: {
              label: "University of Jammu PG Admission Statutes",
              url: "https://jammuuniversity.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "B.Ed (Bachelor of Education)",
            type: "higher-study",
            description:
              "2-year professional teaching degree for secondary school teaching eligibility.",
            source: {
              label: "Directorate of Distance & Online Education, JU B.Ed Prospectus",
              url: "https://jammuuniversity.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "JKPSC Combined Competitive Examination (CCE)",
            type: "exam",
            description:
              "J&K State Public Service Commission examination for administrative services, open to graduates of any recognized university.",
            source: {
              label: "J&K Public Service Commission Official Examination Rules",
              url: "https://jkpsc.nic.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "JKSSB Graduate Level Examinations",
            type: "exam",
            description:
              "J&K Services Selection Board recruitment examinations for graduate posts across J&K government departments.",
            source: {
              label: "J&K Services Selection Board Official Portal",
              url: "https://jkssb.nic.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
        ],
        collegeKeys: ["gdc-kathua", "gdc-akhnoor"],
        source: {
          label: "J&K Samarth Higher Education Admission Portal (Directorate of Colleges J&K 2026-27)",
          url: "https://jkadmissions.samarth.ac.in",
          retrievedOn: "2026-08-16",
          status: "verified",
        },
        verificationStatus: "verified",
      },
      {
        key: "ba-economics-polscience",
        label: "B.A. Social Sciences (Economics, Political Science & Sociology)",
        directionKey: "arts-humanities",
        eligibility:
          "Passed 10+2 / Higher Secondary Part-II examination in any stream (Arts, Science, or Commerce) from JKBOSE / recognized board with min 45% aggregate (40% for reserved categories).",
        description:
          "Undergraduate social science degree focusing on economic principles, political systems, Indian constitution, and administrative governance.",
        whatYouWillStudy: [
          "Micro & Macro Economic Analysis",
          "Indian Political System & Constitution",
          "Sociological Theories & Social Structure",
          "Public Administration Principles",
          "Statistical Methods for Social Sciences",
        ],
        skillAlternative: {
          label: "NSQF Certificate in Local Survey & Public Data Collection Assistant",
          description:
            "3-to-6 month vocational module focusing on field data collection, survey entry, and community liaison.",
          purpose:
            "Provides entry-level assistant skills for local project surveys. Does not replace a 4-year social science degree required for M.A., B.Ed, or JKPSC CCE administrative roles.",
          source: {
            label: "J&K Skill Development Department / NSDC Regional Portal",
            url: "https://jkdsd.in",
            retrievedOn: "2026-08-16",
            status: "verified",
          },
        },
        relatedExams: ["CUET-PG (COQP10)", "JKPSC CCE", "JKSSB"],
        outcomes: [
          {
            label: "M.A. Economics / M.A. Political Science",
            type: "higher-study",
            description:
              "Postgraduate degree programs in Economics or Political Science eligible at University of Jammu and University of Kashmir.",
            source: {
              label: "University of Jammu PG Admission Statutes",
              url: "https://jammuuniversity.ac.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "JKPSC Combined Competitive Examination (JKAS)",
            type: "exam",
            description:
              "Administrative gazetted service examination open to graduates of any discipline.",
            source: {
              label: "J&K Public Service Commission Official Portal",
              url: "https://jkpsc.nic.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
        ],
        collegeKeys: ["gdc-kathua", "gdc-akhnoor", "gdc-baramulla", "gdc-anantnag"],
        source: {
          label: "J&K Samarth Higher Education Admission Portal (Directorate of Colleges J&K 2026-27)",
          url: "https://jkadmissions.samarth.ac.in",
          retrievedOn: "2026-08-16",
          status: "verified",
        },
        verificationStatus: "verified",
      },
      {
        key: "ballb-integrated",
        label: "B.A. LL.B (5-Year Integrated Professional Law Degree)",
        directionKey: "arts-humanities",
        eligibility:
          "Passed 10+2 Higher Secondary examination in any stream from JKBOSE / recognized board with min 45% aggregate (40% for SC/ST). Selection via JUET / State Law Entrance Examination.",
        description:
          "5-year integrated professional law degree qualifying for legal practice, judicial service examinations, and corporate legal advisory.",
        whatYouWillStudy: [
          "Constitutional Law of India",
          "Law of Crimes & Criminal Procedure (CrPC)",
          "Civil Procedure & Law of Contract",
          "Jurisprudence & Legal Methodology",
          "Moot Court Exercises & Internship",
        ],
        skillAlternative: {
          label: "Vocational Certificate in Legal Documentation & Paralegal Assistance",
          description:
            "6-month certificate focusing on court filing procedures, affidavit drafting, and legal documentation support.",
          purpose:
            "Provides practical paralegal clerk skills. Does not grant Bar Council enrollment or courtroom advocacy rights granted by a 5-year B.A. LL.B degree.",
          source: {
            label: "J&K State Legal Services Authority / Skill Portal",
            url: "https://jkslsa.gov.in",
            retrievedOn: "2026-08-16",
            status: "verified",
          },
        },
        relatedExams: ["JUET Law", "CLAT", "J&K Judicial Services Exam (KCS Judicial)"],
        outcomes: [
          {
            label: "Bar Council Enrollment & Legal Practice",
            type: "career",
            description:
              "Enrollment with Bar Council of J&K / India for advocacy practice across district and high courts.",
            source: {
              label: "Bar Council of India / High Court of J&K and Ladakh Rules",
              url: "https://jkhighcourt.nic.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "J&K Judicial Services Examination (KCS Judicial)",
            type: "exam",
            description:
              "State judicial entrance examination conducted by JKPSC for appointment as Civil Judge (Junior Division) / Munsiff.",
            source: {
              label: "JKPSC Official Examination Rules",
              url: "https://jkpsc.nic.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
        ],
        collegeKeys: ["gdc-kathua"],
        source: {
          label: "The Law School, University of Jammu Admission Information",
          url: "https://jammuuniversity.ac.in",
          retrievedOn: "2026-08-16",
          status: "verified",
        },
        verificationStatus: "verified",
      },
      {
        key: "bsc-agriculture",
        label: "B.Sc (Hons) Agriculture (4-Year Professional Degree)",
        directionKey: "sciences",
        eligibility:
          "Passed 10+2 examination with Science stream (PCB / PCMB / PCM / Agriculture) securing min 50% aggregate from JKBOSE / recognized board. Selection via SKUAST Common Entrance Test (CET).",
        description:
          "4-year professional agricultural degree covering crop science, agronomy, soil chemistry, plant pathology, and agricultural economics.",
        whatYouWillStudy: [
          "Fundamentals of Agronomy & Crop Production",
          "Soil Science & Chemistry",
          "Plant Pathology & Agricultural Microbiology",
          "Horticulture & Plant Breeding",
          "Rural Agricultural Work Experience (RAWE)",
        ],
        skillAlternative: {
          label: "Vocational Certificate in Organic Farming & Nursery Management",
          description:
            "6-month practical skill module covering compost production, plant propagation, and commercial nursery maintenance.",
          purpose:
            "Designed for immediate practical nursery work or local farm management. Lacks the statutory research and extension qualification of a 4-year B.Sc Agriculture degree.",
          source: {
            label: "SKUAST Jammu Directorate of Extension",
            url: "https://skuast.org",
            retrievedOn: "2026-08-16",
            status: "verified",
          },
        },
        relatedExams: ["SKUAST-CET", "ICAR AIEEA-UG", "CUET-UG"],
        outcomes: [
          {
            label: "M.Sc Agriculture / Agronomy",
            type: "higher-study",
            description:
              "Postgraduate degree in agricultural sciences at SKUAST Jammu / SKUAST Kashmir or ICAR institutes.",
            source: {
              label: "SKUAST Jammu PG Prospectus",
              url: "https://skuast.org",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
          {
            label: "Agriculture Extension Officer (AEO) / JKPSC Agriculture Cadres",
            type: "exam",
            description:
              "Recruitment examinations conducted by JKPSC / JKSSB for Agriculture Extension Officers and Development Officers.",
            source: {
              label: "J&K Department of Agriculture & Farmers Welfare Notifications",
              url: "https://jkpsc.nic.in",
              retrievedOn: "2026-08-15",
              status: "verified",
            },
            verificationStatus: "verified",
          },
        ],
        collegeKeys: ["gdc-kathua", "gdc-baramulla"],
        source: {
          label: "SKUAST-Jammu / SKUAST-Kashmir Official Admission Information",
          url: "https://skuast.org",
          retrievedOn: "2026-08-16",
          status: "verified",
        },
        verificationStatus: "verified",
      },
    ],
    source: {
      label: "J&K Samarth Higher Education Admission Portal (Directorate of Colleges J&K 2026-27)",
      url: "https://jkadmissions.samarth.ac.in",
      retrievedOn: "2026-08-16",
      status: "verified",
    },
    verificationStatus: "verified",
  },
];

// Compiled lookup for O(1) access by key
export const directionsByKey: Record<string, Direction> = Object.fromEntries(
  directions.map((d) => [d.key, d])
);

// Compiled course lookup across all directions
export const coursesByKey: Record<string, import("@/types/ps09").Course> = Object.fromEntries(
  directions.flatMap((d) => d.courses.map((c) => [c.key, c]))
);
