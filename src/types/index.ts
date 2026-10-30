/**
 * ROOT & ROUTES - Migrant Family Support & Service Continuity
 * Domain Types and Data Contracts
 */

export type UserRole = 'WORKER' | 'CONTRACTOR' | 'FIELD_WORKER' | 'ADMIN';

export type SupportedLanguage = 'en' | 'hi' | 'mr' | 'bho';

export interface UserPersona {
  id: string;
  name: string;
  role: UserRole;
  designation: string;
  organization?: string;
  location: string;
  phone: string;
  email: string;
  avatarPlaceholder: string;
}

export type EShramStatus = 'REGISTERED' | 'NOT_REGISTERED' | 'PENDING_ASSISTANCE';

export interface FamilyMember {
  id: string;
  workerId: string;
  name: string;
  relationship: 'SPOUSE' | 'CHILD' | 'PARENT' | 'SIBLING' | 'OTHER';
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  isTraveling: boolean;
  educationStatus?: 'NEVER_ENROLLED' | 'IN_SCHOOL_ORIGIN' | 'DROPOUT' | 'NEEDS_DESTINATION_SCHOOL' | 'COMPLETED_PRIMARY';
  previousSchoolName?: string;
  targetSchoolLevel?: string;
  immunizationStatus?: 'UP_TO_DATE' | 'DUE' | 'OVERDUE' | 'UNKNOWN';
  lastVaccineGiven?: string;
  nextVaccineDue?: string;
  specialNeeds?: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  phone: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  occupation: string;
  eShramStatus: EShramStatus;
  originState: string;
  originDistrict: string;
  originBlock?: string;
  originPincode?: string;
  contractorId?: string;
  contractorName?: string;
  preferredLanguage: SupportedLanguage;
  consentGiven: boolean;
  consentDate: string;
  consentScope: string[];
  members: FamilyMember[];
  registeredDate: string;
  isSampleData: boolean;
  notes?: string;
}

export type JourneyStatus = 
  | 'ORIGIN'
  | 'JOURNEY_STARTED'
  | 'DESTINATION_IDENTIFIED'
  | 'SERVICES_REFERRED'
  | 'FOLLOWUP_PENDING'
  | 'CONFIRMED'
  | 'CASE_CLOSED';

export interface MigrationJourney {
  id: string;
  workerId: string;
  workerName: string;
  originState: string;
  originDistrict: string;
  destinationState: string;
  destinationDistrict: string;
  destinationWorksite: string;
  destinationPincode: string;
  startDate: string;
  expectedEndDate: string;
  actualEndDate?: string;
  travelingMemberIds: string[];
  status: JourneyStatus;
  educationNeeds: string[];
  healthNeeds: string[];
  childcareNeeds: string[];
  rationNeeds: string[];
  nextFollowUpDate: string;
  assignedFieldWorkerId?: string;
  assignedFieldWorkerName?: string;
  verifiedSource?: string;
  verifiedDate?: string;
  notes: string;
  isSampleData: boolean;
}

export type SchemeCategory = 
  | 'FOOD_SECURITY'
  | 'HEALTH_INSURANCE'
  | 'EDUCATION'
  | 'CHILDCARE_NUTRITION'
  | 'SOCIAL_SECURITY'
  | 'MATERNITY'
  | 'HOUSING'
  | 'IMMUNIZATION';

export interface GovernmentScheme {
  id: string;
  code: string;
  name: string;
  marathiName: string;
  hindiName: string;
  department: string;
  level: 'CENTRAL' | 'STATE';
  applicableStates: string[];
  category: SchemeCategory;
  targetBeneficiaries: string;
  description: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  applicationProcess: string;
  portabilityConditions: string;
  officialPortalUrl: string;
  lastVerifiedDate: string;
  officialSource: string;
  verificationStatus: 'VERIFIED' | 'UNDER_REVIEW';
}

export type ApplicationStage =
  | 'GUIDANCE_VIEWED'
  | 'CHECKLIST_COMPLETED'
  | 'APPLICATION_STARTED'
  | 'SUBMITTED'
  | 'VERIFICATION_PENDING'
  | 'BENEFIT_RECEIVED'
  | 'ACTION_REQUIRED'
  | 'REJECTED';

export interface BenefitApplication {
  id: string;
  workerId: string;
  workerName: string;
  schemeId: string;
  schemeCode: string;
  schemeName: string;
  stage: ApplicationStage;
  officialReferenceNumber?: string;
  appliedDate?: string;
  lastUpdatedDate: string;
  followUpDate?: string;
  verifiedBy?: string;
  verifiedDate?: string;
  verificationSource?: string;
  notes?: string;
  isSampleData: boolean;
}

export interface EducationRecord {
  id: string;
  childId: string;
  childName: string;
  workerId: string;
  workerName: string;
  currentAge: number;
  originSchoolName?: string;
  targetStandard: string;
  rteSection4Applicable: boolean; // Direct age-appropriate admission without TC
  status: 'NEEDS_GUIDANCE' | 'REFERRED' | 'ENROLLED' | 'FOLLOWUP_NEEDED';
  assignedSchoolId?: string;
  assignedSchoolName?: string;
  bridgeCourseProvided: boolean;
  freeUniformBooksProvided: boolean;
  nextFollowUpDate: string;
  notes?: string;
}

export interface HealthRecord {
  id: string;
  childId: string;
  childName: string;
  workerId: string;
  workerName: string;
  currentAgeMonths: number;
  mcpCardAvailable: boolean; // Mother-Child Protection card
  nextVaccineDue: string;
  dueDate: string;
  phcReferred: boolean;
  targetPhcName?: string;
  status: 'UP_TO_DATE' | 'DUE' | 'OVERDUE' | 'CONFIRMED';
  lastFollowUpDate: string;
}

export interface ChildcareRecord {
  id: string;
  childId: string;
  childName: string;
  workerId: string;
  workerName: string;
  currentAgeMonths: number;
  anganwadiCentreName?: string;
  takeHomeRationReceived: boolean;
  hotMealReceived: boolean;
  growthMonitored: boolean;
  lastVisitDate?: string;
  status: 'ENROLLED' | 'REFERRED' | 'NOT_ENROLLED';
}

export interface ChildProtectionCase {
  id: string;
  childId: string;
  childName: string;
  workerId: string;
  workerName: string;
  reportedDate: string;
  issueType: 'OUT_OF_SCHOOL_LABOUR_RISK' | 'DOCUMENTATION_BARRIER' | 'UNACCOMPANIED_TRAVEL' | 'EMERGENCY_SUPPORT';
  priority: 'HIGH' | 'CRITICAL';
  status: 'CONFIDENTIAL_TRIAGE' | 'DCPU_REFERRED' | 'CHILDLINE_ENGAGED' | 'SAFE_RESOLVED';
  caseWorkerAssigned: string;
  escalationNotice: string;
  notesRestricted: string; // Strictly confidential, hidden from contractors
}

export type ServiceCategory = 
  | 'SCHOOL'
  | 'PRIMARY_HEALTH_CENTRE'
  | 'ANGANWADI'
  | 'LABOUR_SEVA_KENDRA'
  | 'NGO_CENTRE'
  | 'CHILD_SUPPORT';

export interface DestinationService {
  id: string;
  name: string;
  category: ServiceCategory;
  district: string;
  taluka: string;
  pincode: string;
  address: string;
  contactPhone: string;
  contactPerson: string;
  operatingHours: string;
  servicesOffered: string[];
  eligibilityNotes: string;
  verificationStatus: 'VERIFIED_OFFICIAL' | 'VERIFIED_NGO' | 'SAMPLE_DATA';
  lastVerifiedDate: string;
}

export interface ContinuityGap {
  id: string;
  title: string;
  description: string;
  ruleType: 
    | 'OUT_OF_SCHOOL_CHILD'
    | 'MISSED_IMMUNIZATION'
    | 'UNREGISTERED_BOCW'
    | 'OVERDUE_FOLLOWUP'
    | 'UNVERIFIED_SERVICE'
    | 'RATION_PORTABILITY_PENDING';
  workerId: string;
  workerName: string;
  childId?: string;
  childName?: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  responsibleRole: 'FIELD_WORKER' | 'ADMIN' | 'CONTRACTOR';
  dueDate: string;
  lastUpdated: string;
  recommendedAction: string;
  resolved: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  targetEntityType: string;
  targetEntityId: string;
  details: string;
}

export interface DataCorrectionRequest {
  id: string;
  workerId: string;
  workerName: string;
  requestedByRole: UserRole;
  fieldToCorrect: string;
  currentValue: string;
  suggestedValue: string;
  reason: string;
  status: 'PENDING_REVIEW' | 'APPROVED_APPLIED' | 'REJECTED';
  submittedDate: string;
  reviewedBy?: string;
  reviewedDate?: string;
}
