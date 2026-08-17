import type { AdmissionRoute } from "@/types/ps09";

export const jkAdmissionRoutes: AdmissionRoute[] = [
  {
    id: "jk-samarth-ug",
    name: "J&K Samarth Centralized UG Admissions",
    fullForm: "J&K Samarth Higher Education Admission System",
    description: "Single-window admission portal for undergraduate programs across all Government Degree Colleges in Jammu & Kashmir.",
    eligibility: "10+2 qualification from recognized board (JKBOSE / CBSE). Subject eligibility varies by program.",
    officialWebsite: "https://jk.samarth.ac.in",
    forLevel: "Undergraduate (BA, B.Com, B.Sc, BCA, BBA)",
    conductingBody: "Higher Education Department, Government of Jammu & Kashmir",
  },
  {
    id: "jkbopee-cet",
    name: "JKBOPEE Common Entrance Test (JKCET)",
    fullForm: "J&K Board of Professional Entrance Examinations",
    description: "State-level entrance examination for admission into B.E. / B.Tech engineering courses across J&K colleges.",
    eligibility: "10+2 with Physics, Chemistry, and Mathematics (PCM) with minimum 45% marks.",
    officialWebsite: "https://jkbopee.gov.in",
    forLevel: "Professional Degrees (B.Tech, MBBS, Nursing)",
    conductingBody: "J&K Board of Professional Entrance Examinations (JKBOPEE)",
  },
  {
    id: "jkdsd-iti-admissions",
    name: "J&K Directorate of Skill Development ITI Admissions",
    fullForm: "J&K DSD Centralized ITI Portal",
    description: "Centralized merit-based admission for NCVT / SCVT trade certificates across all Government ITIs in J&K.",
    eligibility: "Class 10 (or Class 8 depending on trade specification). No upper age limit for most trades.",
    officialWebsite: "https://jkdsd.in",
    forLevel: "Vocational & Trade Certificates",
    conductingBody: "Directorate of Skill Development J&K",
  },
  {
    id: "cusrinagar-ug",
    name: "Cluster University Srinagar Admissions",
    fullForm: "Cluster University Srinagar Integrated & Honors Programs",
    description: "Admissions to constituent colleges including SP College, Women's College MA Road, and AAAM Degree College.",
    eligibility: "10+2 merit score / CUET scores as notified per academic session.",
    officialWebsite: "https://cusrinagar.edu.in",
    forLevel: "UG Honors & 5-Year Integrated Degrees",
    conductingBody: "Cluster University Srinagar",
  },
];
