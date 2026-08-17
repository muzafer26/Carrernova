// ============================================================
// PS-09 — SIH25094 Domain Types
// Source of truth: 02-MVP-REQUIREMENTS.md
// ============================================================

export type VerificationStatus = "verified" | "unverified" | "needs-review";

// ----------------------------------------------------------------
// Source metadata — required on every factual data entity
// ----------------------------------------------------------------
export interface SourceMeta {
  /** Human-readable name of the authoritative source */
  label: string;
  /** Direct URL to the source document or page */
  url: string;
  /** ISO date string "YYYY-MM-DD" — when this data was retrieved */
  retrievedOn: string;
  /** Verification status of this specific metadata / claim */
  status: VerificationStatus;
}

// ----------------------------------------------------------------
// Outcome — a possible result of pursuing a direction or course
// Never promise outcomes. R6 spec: "map courses to possible directions"
// ----------------------------------------------------------------
export interface Outcome {
  /** Short label, e.g. "Software Engineer at IT company" */
  label: string;
  /** "career" | "exam" | "higher-study" */
  type: "career" | "exam" | "higher-study";
  /** 1–2 sentence plain language description */
  description: string;
  /** Source for this outcome claim — required */
  source: SourceMeta;
  /** Explicit verification status of this outcome claim */
  verificationStatus: VerificationStatus;
}

// ----------------------------------------------------------------
export interface SkillAlternative {
  label: string;
  description: string;
  purpose: string;
  source: SourceMeta;
}

// ----------------------------------------------------------------
// Course — a specific degree/program within a direction
// ----------------------------------------------------------------
export interface Course {
  /** Unique slug, e.g. "bsc-computer-application" */
  key: string;
  /** Human label, e.g. "B.Sc Computer Application" */
  label: string;
  /** Parent direction key */
  directionKey: string;
  /** Duration in years — optional; omit when FYUGP entry/exit options vary */
  durationYears?: number;
  /** Plain-text eligibility statement — must be sourced */
  eligibility: string;
  /** 2–3 sentence description */
  description: string;
  /** Key topics and core subjects covered in this program */
  whatYouWillStudy?: string[];
  /** Sourced vocational/skill-oriented alternative route for trade-off exploration */
  skillAlternative?: SkillAlternative;
  /** Possible outcomes for this specific course */
  outcomes: Outcome[];
  /** Exam names as plain strings */
  relatedExams: string[];
  /** Keys of JKCollege entries that offer this course */
  collegeKeys: string[];
  /** Source for program info */
  source: SourceMeta;
  /** Explicit verification status of this course entity */
  verificationStatus: VerificationStatus;
  /** Granular recommendation signal weights (0 to 5) for course-level personalization */
  recommendationSignals?: CourseSignalProfile;
}

export interface CourseSignalProfile {
  technology?: number;
  programming?: number;
  biological?: number;
  laboratory?: number;
  financial?: number;
  business?: number;
  management?: number;
  humanities?: number;
  social?: number;
  languages?: number;
  quantitative?: number;
  analytical?: number;
  publicService?: number;
  practical?: number;
  scientific?: number;
  research?: number;
  communication?: number;
}

// ----------------------------------------------------------------
// Direction — a broad education/career path
// Product / UX taxonomy grouping verified courses
// ----------------------------------------------------------------
export interface Direction {
  /** Unique slug, e.g. "sciences" */
  key: string;
  /** Human label, e.g. "Natural & Applied Sciences" */
  label: string;
  /** Plain-language description */
  description: string;
  /**
   * Class 12 streams that qualify for this direction.
   * Empty array means no stream restriction.
   */
  streamRequirements: string[];
  /**
   * Qualification levels that can enter this direction.
   */
  classRequired: string[];
  /**
   * Interest tags used for UX recommendation matching (product mapping).
   */
  interests: string[];
  /** Courses available under this direction */
  courses: Course[];
  /** Direction-level outcomes (R6) */
  outcomes: Outcome[];
  /** Exam names relevant at direction level */
  relatedExams: string[];
  /** Source for this direction's info */
  source: SourceMeta;
  /** Explicit verification status of this direction entity */
  verificationStatus: VerificationStatus;
}

// ----------------------------------------------------------------
// JKCollege — a verified J&K government college
// Maps to R5 "Where You Can Study"
// ----------------------------------------------------------------
export interface JKCollege {
  /** Unique slug, e.g. "gdc-kathua" */
  key: string;
  /** Official institution name */
  name: string;
  /** J&K district, e.g. "Kathua", "Jammu" */
  district: string;
  /** Regional division */
  division?: "Jammu" | "Kashmir";
  /** Institution classification */
  type: "Government" | "Government-aided" | "University" | "Polytechnic" | "ITI";
  /** University affiliation */
  affiliation?: string;
  /** Street address */
  address?: string;
  /** Verified campus facilities */
  facilities?: string[];
  /** Official website URL */
  website?: string;
  /** Geographic coordinates for Leaflet Map */
  location?: {
    lat: number;
    lng: number;
  };
  /** Course keys this college offers */
  programs: string[];
  /** Source for this college entry — required */
  source: SourceMeta;
  /** Explicit verification status of this college mapping */
  verificationStatus: VerificationStatus;
}

// ----------------------------------------------------------------
// Heterogeneous SavedOption (replaces restrictive single-type save)
// ----------------------------------------------------------------
export interface SavedOption {
  id: string;
  entityType: "programme" | "institution" | "skill" | "diploma" | "government-path";
  entityId: string;
  title: string;
  subtitle?: string;
  district?: string;
  savedBecause?: string;
  createdAt: string;
}

// ----------------------------------------------------------------
// Scholarship — Financial support scheme
// ----------------------------------------------------------------
export interface Scholarship {
  id: string;
  name: string;
  authority: string;
  eligibilitySummary: string;
  applicableStages: string[];
  applicablePathways?: string[];
  categories?: string[];
  officialUrl: string;
  session?: string;
  retrievedOn: string;
  verificationStatus: VerificationStatus;
}

// ----------------------------------------------------------------
// AdmissionRoute — Official admission authority & route
// ----------------------------------------------------------------
export interface AdmissionRoute {
  id: string;
  name: string;
  fullForm?: string;
  description: string;
  eligibility: string;
  officialWebsite: string;
  forLevel: string;
  conductingBody: string;
}

// ----------------------------------------------------------------
// OfficialResource — structured government / university portal record
// ----------------------------------------------------------------
export type ResourceCategory =
  | "School Education"
  | "Admissions"
  | "Government Colleges"
  | "Scholarships"
  | "Entrance Exams"
  | "Government Exams"
  | "Universities"
  | "Learning Resources"
  | "Official Career / Higher Study Information";

export interface OfficialResource {
  key: string;
  title: string;
  organization: string;
  category: ResourceCategory;
  audienceStage: string;
  description: string;
  url: string;
  source: SourceMeta;
  verificationStatus: VerificationStatus;
}

// ----------------------------------------------------------------
// AssessOption — a single answer choice in an assessment question
// ----------------------------------------------------------------
export interface AssessOption {
  label: string;
  weights: Record<string, number>;
}

// ----------------------------------------------------------------
// AssessQuestion — one question in the R2 assessment
// ----------------------------------------------------------------
export interface AssessQuestion {
  id: string;
  text: string;
  options: AssessOption[];
}

// ----------------------------------------------------------------
// DirectionMatch — output of matchDirections()
// ----------------------------------------------------------------
export interface DirectionMatch {
  direction: Direction;
  score: number;
  explanation: string;
}

// ----------------------------------------------------------------
// StudentProfile — inputs from R1 "About You"
// ----------------------------------------------------------------
export interface StudentProfile {
  /** "Class 10" | "Class 12" */
  class: string;
  /**
   * For Class 12: one of the stream keys ("Science (PCM)", "Science (PCB)", etc.)
   * For Class 10: empty string — the student has not yet selected a stream.
   */
  stream: string;
  /** Student's district in J&K */
  district?: string;
  interests: string[];
  goalPreference: string;
  constraints?: {
    affordability?: "low" | "moderate" | "high" | "unknown";
    locality?: "stay_near_home" | "jammu_region" | "kashmir_region" | "open_to_relocate";
    studyMode?: "regular" | "distance" | "either";
  };
}

export type AssessWeights = Record<string, number>;

export interface AssessSignalVector {
  assessmentVersion?: string;
  technology?: number;
  programming?: number;
  biological?: number;
  laboratory?: number;
  financial?: number;
  business?: number;
  management?: number;
  humanities?: number;
  social?: number;
  languages?: number;
  quantitative?: number;
  analytical?: number;
  publicService?: number;
  practical?: number;
  scientific?: number;
  research?: number;
  communication?: number;
  
  aversion_lab?: number;
  aversion_math?: number;
  aversion_financial?: number;
  aversion_writing?: number;
  aversion_programming?: number;

  uncertainty?: number;
  certainty?: number;
  [key: string]: number | string | undefined;
}

export interface CourseMatch {
  course: Course;
  score: number;
  matchCategory: "Strong Match" | "Good Match" | "Worth Exploring" | "Possible Option";
  eligibilityStatus: "ELIGIBLE" | "NOT_ELIGIBLE" | "REQUIRES_MORE_INFO";
  explanation: string;
  signalBreakdown: {
    positive: string[];
    negative: string[];
    eligibilityNote: string;
  };
}

// ----------------------------------------------------------------
// StreamKey — Class 10 stream identifiers
// ----------------------------------------------------------------
export type StreamKey = "science" | "commerce" | "arts";

// ----------------------------------------------------------------
// StreamExploration — Class 10 stream description
//
// Product taxonomy for stream guidance.
// Source: JKBOSE Scheme of Studies (https://jkbose.jk.gov.in).
//
// RULES:
//   - coreSubjectAreas: broad subject areas from official scheme;
//     NOT exhaustive; NOT exact subject codes.
//   - ugPathExamples: qualitative examples only; NOT promises.
//   - questionsToConsider: exploration prompts for student reflection.
//   - source: must point to authoritative JKBOSE official URL.
// ----------------------------------------------------------------
export interface StreamExploration {
  /** Discriminated key — must be a StreamKey */
  key: StreamKey;
  /** Student-facing label */
  label: string;
  /**
   * Broad subject areas typically offered under this faculty.
   * Sourced from JKBOSE Scheme of Studies.
   * Exact combinations vary by school and session — always refer to JKBOSE.
   */
  coreSubjectAreas: string[];
  /** Plain-language explanation of what this stream involves */
  whatYouLearn: string;
  /**
   * Examples of UG paths this stream can open.
   * Product interpretation — not sourced claims.
   * Framed as possibilities, NOT guarantees.
   */
  ugPathExamples: string[];
  /** Reflective questions to help students consider their own fit */
  questionsToConsider: string[];
  /** Authoritative source — must be official JKBOSE URL */
  source: SourceMeta;
  verificationStatus: VerificationStatus;
}

// ----------------------------------------------------------------
// StandaloneSkill — First-class Vocational / ITI / Skill Pathway
// ----------------------------------------------------------------
export interface StandaloneSkill {
  key: string;
  label: string;
  category: "IT & Hardware" | "Healthcare & Medical" | "Agriculture & Allied" | "Finance & Accounting" | "Retail & Business" | "Software & Web" | "Media & Languages";
  duration: string;
  nsqfLevel: string;
  eligibility: string;
  description: string;
  purpose: string;
  careerProspects: string[];
  conductingAuthority: string;
  source: SourceMeta;
  verificationStatus: VerificationStatus;
}

// ----------------------------------------------------------------
// GovtPathway — Backward Government Career Pathway Map
// ----------------------------------------------------------------
export interface GovtPathway {
  key: string;
  targetCadre: string;
  conductingAuthority: string;
  summary: string;
  eligibility: string;
  ageLimit: string;
  selectionProcess: string[];
  educationSteppingStones: {
    stage: string;
    action: string;
    details: string;
  }[];
  officialPortal: {
    label: string;
    url: string;
  };
  source: SourceMeta;
  verificationStatus: VerificationStatus;
}

// ----------------------------------------------------------------
// ShortlistItem — Persistent Decision Workspace Item
// ----------------------------------------------------------------
export type ShortlistItemType = "degree" | "skill" | "govt-exam";

export interface ShortlistItem {
  id: string;
  type: ShortlistItemType;
  title: string;
  category: string;
  subtitle: string;
  eligibility: string;
  duration?: string;
  authority?: string;
  linkTo?: string;
  sourceLabel?: string;
  sourceUrl?: string;
}

