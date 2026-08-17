import { Direction, StandaloneSkill, GovtPathway } from '../types/ps09';

export interface WhyRationale {
  whyShown: string[];
  whatIsNotGuaranteed: string[];
}

/**
 * Generates an evidence-backed rationale for a Degree Direction based on student profile.
 */
export function getWhyRationaleForDirection(
  direction: Direction,
  studentStream?: string,
  studentDistrict?: string
): WhyRationale {
  const whyShown: string[] = [];
  const whatIsNotGuaranteed: string[] = [];

  // Prerequisite check
  if (studentStream) {
    whyShown.push(
      `Satisfies entry prerequisites for students coming from ${studentStream} background.`
    );
  } else {
    whyShown.push(
      `Open to eligible Class 12 stream graduates as specified in academic statutes.`
    );
  }

  // Curriculum & Degree Structure
  whyShown.push(
    `Structured under NEP-2020 FYUGP: 3-Year Major Degree / 4-Year Honours with Research option.`
  );

  // Local Availability
  if (studentDistrict) {
    whyShown.push(
      `Offered in accredited Government Degree Colleges in ${studentDistrict} & across J&K.`
    );
  } else {
    whyShown.push(`Offered across accredited Government Degree Colleges in Jammu & Kashmir.`);
  }

  // Progression
  whyShown.push(
    `Unlocks verified post-graduate progression (M.Sc/M.A./MBA) and state/central competitive exam eligibility.`
  );

  // Financial Support
  whyShown.push(
    `Eligible for AICTE PMSSS J&K maintenance allowance (up to ₹1.0 Lakh/year) and NSP post-matric schemes.`
  );

  // Non-guarantees
  whatIsNotGuaranteed.push(`Completion does not guarantee immediate employment.`);
  whatIsNotGuaranteed.push(
    `Admissions are subject to J&K Samarth portal seat allocation and merit cutoffs.`
  );

  return { whyShown, whatIsNotGuaranteed };
}

/**
 * Generates an evidence-backed rationale for a Standalone ITI/Skill Trade.
 */
export function getWhyRationaleForSkill(
  skill: StandaloneSkill,
  studentStage?: string
): WhyRationale {
  const whyShown: string[] = [];
  const whatIsNotGuaranteed: string[] = [];

  whyShown.push(
    `Provides job-ready practical technical training (${skill.duration}) without requiring a 4-year academic degree.`
  );
  whyShown.push(`Directly aligned with J&K Department of Skill Development (DSD) & NCVT certification.`);
  whyShown.push(
    `Open to ${skill.eligibility} candidates seeking fast-track employment or trade certification.`
  );

  whatIsNotGuaranteed.push(`Certification does not guarantee immediate apprenticeship or job placement.`);
  whatIsNotGuaranteed.push(
    `Admissions are governed by DSD J&K counselling schedules and trade seat availability.`
  );

  return { whyShown, whatIsNotGuaranteed };
}

/**
 * Generates an evidence-backed rationale for a Govt Career Cadre Map.
 */
export function getWhyRationaleForGovtPathway(
  govt: GovtPathway
): WhyRationale {
  const whyShown: string[] = [];
  const whatIsNotGuaranteed: string[] = [];

  whyShown.push(
    `Backward-maps the exact educational qualification needed (${govt.qualifyingDegree}) to target ${govt.examTitle}.`
  );
  whyShown.push(
    `Governed by statutory recruitment rules of official state authorities (${govt.authority}).`
  );

  whatIsNotGuaranteed.push(
    `Degree completion alone does not grant government appointment; candidate must clear competitive exams.`
  );
  whatIsNotGuaranteed.push(
    `Exam cycles and post vacancies are determined by official government notifications.`
  );

  return { whyShown, whatIsNotGuaranteed };
}
