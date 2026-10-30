import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserPersona, 
  UserRole, 
  SupportedLanguage, 
  WorkerProfile, 
  MigrationJourney, 
  GovernmentScheme, 
  BenefitApplication, 
  EducationRecord, 
  HealthRecord, 
  ChildcareRecord, 
  ChildProtectionCase, 
  DestinationService, 
  ContinuityGap, 
  AuditLog, 
  DataCorrectionRequest,
  ApplicationStage,
  JourneyStatus 
} from '../types';
import { 
  DEMO_PERSONAS, 
  INITIAL_WORKERS, 
  INITIAL_JOURNEYS, 
  GOVERNMENT_SCHEMES, 
  INITIAL_BENEFIT_APPLICATIONS, 
  INITIAL_EDUCATION_RECORDS, 
  INITIAL_HEALTH_RECORDS, 
  INITIAL_CHILDCARE_RECORDS, 
  INITIAL_PROTECTION_CASES, 
  DESTINATION_SERVICES, 
  INITIAL_CONTINUITY_GAPS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_DATA_CORRECTIONS 
} from '../data/mockData';
import { TRANSLATIONS } from '../data/translations';

interface AppContextType {
  // Current user & locale
  currentPersona: UserPersona;
  currentRole: UserRole;
  language: SupportedLanguage;
  t: typeof TRANSLATIONS['en'];
  setLanguage: (lang: SupportedLanguage) => void;
  switchPersona: (personaId: string) => void;

  // Active Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Domain entities
  workers: WorkerProfile[];
  journeys: MigrationJourney[];
  schemes: GovernmentScheme[];
  applications: BenefitApplication[];
  educationRecords: EducationRecord[];
  healthRecords: HealthRecord[];
  childcareRecords: ChildcareRecord[];
  protectionCases: ChildProtectionCase[];
  destinationServices: DestinationService[];
  continuityGaps: ContinuityGap[];
  auditLogs: AuditLog[];
  corrections: DataCorrectionRequest[];

  // Mutations
  addWorker: (worker: Omit<WorkerProfile, 'id' | 'registeredDate'>) => void;
  updateWorker: (id: string, updates: Partial<WorkerProfile>) => void;
  addJourney: (journey: Omit<MigrationJourney, 'id'>) => void;
  updateJourneyStatus: (journeyId: string, newStatus: JourneyStatus, note?: string) => void;
  addBenefitApplication: (workerId: string, schemeId: string, notes?: string) => void;
  updateApplicationStage: (appId: string, stage: ApplicationStage, verificationSource?: string, notes?: string) => void;
  updateEducationRecord: (recordId: string, updates: Partial<EducationRecord>) => void;
  updateHealthRecord: (recordId: string, updates: Partial<HealthRecord>) => void;
  updateChildcareRecord: (recordId: string, updates: Partial<ChildcareRecord>) => void;
  addProtectionCase: (caseData: Omit<ChildProtectionCase, 'id' | 'reportedDate'>) => void;
  resolveGap: (gapId: string) => void;
  submitDataCorrection: (correction: Omit<DataCorrectionRequest, 'id' | 'submittedDate' | 'status'>) => void;
  reviewDataCorrection: (correctionId: string, status: 'APPROVED_APPLIED' | 'REJECTED') => void;
  resetDemoData: () => void;

  // Access checks
  canAccessChildProtection: boolean;
  canAccessChildMedical: boolean;
  canVerifyRecords: boolean;
  canManageSchemes: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'root_routes_v1_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current Persona & Language
  const [currentPersona, setCurrentPersona] = useState<UserPersona>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}persona`);
    if (saved) {
      const found = DEMO_PERSONAS.find(p => p.id === saved);
      if (found) return found;
    }
    return DEMO_PERSONAS[0]; // Ramesh Kumar (Worker)
  });

  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}lang`) as SupportedLanguage;
    return saved && ['en', 'hi', 'mr', 'bho'].includes(saved) ? saved : 'en';
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Load datasets with localStorage fallback
  const [workers, setWorkers] = useState<WorkerProfile[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}workers`);
    return saved ? JSON.parse(saved) : INITIAL_WORKERS;
  });

  const [journeys, setJourneys] = useState<MigrationJourney[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}journeys`);
    return saved ? JSON.parse(saved) : INITIAL_JOURNEYS;
  });

  const [schemes] = useState<GovernmentScheme[]>(GOVERNMENT_SCHEMES);

  const [applications, setApplications] = useState<BenefitApplication[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}apps`);
    return saved ? JSON.parse(saved) : INITIAL_BENEFIT_APPLICATIONS;
  });

  const [educationRecords, setEducationRecords] = useState<EducationRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}edu`);
    return saved ? JSON.parse(saved) : INITIAL_EDUCATION_RECORDS;
  });

  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}health`);
    return saved ? JSON.parse(saved) : INITIAL_HEALTH_RECORDS;
  });

  const [childcareRecords, setChildcareRecords] = useState<ChildcareRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}childcare`);
    return saved ? JSON.parse(saved) : INITIAL_CHILDCARE_RECORDS;
  });

  const [protectionCases, setProtectionCases] = useState<ChildProtectionCase[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}protection`);
    return saved ? JSON.parse(saved) : INITIAL_PROTECTION_CASES;
  });

  const [destinationServices] = useState<DestinationService[]>(DESTINATION_SERVICES);

  const [continuityGaps, setContinuityGaps] = useState<ContinuityGap[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}gaps`);
    return saved ? JSON.parse(saved) : INITIAL_CONTINUITY_GAPS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}audit`);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [corrections, setCorrections] = useState<DataCorrectionRequest[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}corrections`);
    return saved ? JSON.parse(saved) : INITIAL_DATA_CORRECTIONS;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}persona`, currentPersona.id);
  }, [currentPersona]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}lang`, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}workers`, JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}journeys`, JSON.stringify(journeys));
  }, [journeys]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}apps`, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}edu`, JSON.stringify(educationRecords));
  }, [educationRecords]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}health`, JSON.stringify(healthRecords));
  }, [healthRecords]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}childcare`, JSON.stringify(childcareRecords));
  }, [childcareRecords]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}protection`, JSON.stringify(protectionCases));
  }, [protectionCases]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}gaps`, JSON.stringify(continuityGaps));
  }, [continuityGaps]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}audit`, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}corrections`, JSON.stringify(corrections));
  }, [corrections]);

  // Log an audit event
  const logAudit = (action: string, targetEntityType: string, targetEntityId: string, details: string) => {
    const newLog: AuditLog = {
      id: `aud_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      actorId: currentPersona.id,
      actorName: currentPersona.name,
      actorRole: currentPersona.role,
      action,
      targetEntityType,
      targetEntityId,
      details,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const switchPersona = (personaId: string) => {
    const found = DEMO_PERSONAS.find(p => p.id === personaId);
    if (found) {
      setCurrentPersona(found);
      logAudit('SWITCH_PERSONA', 'USER_SESSION', found.id, `User switched perspective to ${found.name} (${found.role})`);
    }
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
  };

  const addWorker = (workerData: Omit<WorkerProfile, 'id' | 'registeredDate'>) => {
    const newId = `w_${Date.now()}`;
    const newWorker: WorkerProfile = {
      ...workerData,
      id: newId,
      registeredDate: new Date().toISOString().split('T')[0],
      isSampleData: true,
    };
    setWorkers(prev => [newWorker, ...prev]);
    logAudit('CREATE_WORKER', 'WORKER_PROFILE', newId, `Registered worker ${newWorker.name} (${newWorker.originDistrict} -> Pune)`);
  };

  const updateWorker = (id: string, updates: Partial<WorkerProfile>) => {
    setWorkers(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
    logAudit('UPDATE_WORKER', 'WORKER_PROFILE', id, `Updated worker profile fields: ${Object.keys(updates).join(', ')}`);
  };

  const addJourney = (journeyData: Omit<MigrationJourney, 'id'>) => {
    const newId = `j_${Date.now()}`;
    const newJourney: MigrationJourney = {
      ...journeyData,
      id: newId,
      isSampleData: true,
    };
    setJourneys(prev => [newJourney, ...prev]);
    logAudit('CREATE_JOURNEY', 'MIGRATION_JOURNEY', newId, `Recorded new migration journey for ${newJourney.workerName}`);
  };

  const updateJourneyStatus = (journeyId: string, newStatus: JourneyStatus, note?: string) => {
    setJourneys(prev => prev.map(j => {
      if (j.id === journeyId) {
        return {
          ...j,
          status: newStatus,
          notes: note ? `${j.notes} | Update: ${note}` : j.notes,
          verifiedDate: new Date().toISOString().split('T')[0],
          verifiedSource: `${currentPersona.name} (${currentPersona.role})`,
        };
      }
      return j;
    }));
    logAudit('UPDATE_JOURNEY_STATUS', 'MIGRATION_JOURNEY', journeyId, `Transitioned status to ${newStatus}. Note: ${note || 'None'}`);
  };

  const addBenefitApplication = (workerId: string, schemeId: string, notes?: string) => {
    const worker = workers.find(w => w.id === workerId);
    const scheme = schemes.find(s => s.id === schemeId);
    if (!worker || !scheme) return;

    const newId = `app_${Date.now()}`;
    const newApp: BenefitApplication = {
      id: newId,
      workerId,
      workerName: worker.name,
      schemeId,
      schemeCode: scheme.code,
      schemeName: scheme.name,
      stage: 'GUIDANCE_VIEWED',
      lastUpdatedDate: new Date().toISOString().split('T')[0],
      notes: notes || 'Guidance viewed and eligibility checklist initiated.',
      isSampleData: true,
    };
    setApplications(prev => [newApp, ...prev]);
    logAudit('START_BENEFIT_APPLICATION', 'BENEFIT_APPLICATION', newId, `Started application for ${scheme.name} for ${worker.name}`);
  };

  const updateApplicationStage = (appId: string, stage: ApplicationStage, verificationSource?: string, notes?: string) => {
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          stage,
          lastUpdatedDate: new Date().toISOString().split('T')[0],
          verifiedBy: currentPersona.name,
          verificationSource: verificationSource || a.verificationSource || `Manual verification by ${currentPersona.role}`,
          notes: notes ? `${a.notes || ''} | ${notes}` : a.notes,
        };
      }
      return a;
    }));
    logAudit('UPDATE_APPLICATION_STAGE', 'BENEFIT_APPLICATION', appId, `Stage changed to ${stage}`);
  };

  const updateEducationRecord = (recordId: string, updates: Partial<EducationRecord>) => {
    setEducationRecords(prev => prev.map(r => r.id === recordId ? { ...r, ...updates } : r));
    logAudit('UPDATE_EDUCATION_RECORD', 'EDUCATION_RECORD', recordId, `Updated education status for record ${recordId}`);
  };

  const updateHealthRecord = (recordId: string, updates: Partial<HealthRecord>) => {
    setHealthRecords(prev => prev.map(r => r.id === recordId ? { ...r, ...updates } : r));
    logAudit('UPDATE_HEALTH_RECORD', 'HEALTH_RECORD', recordId, `Updated health/immunization status for record ${recordId}`);
  };

  const updateChildcareRecord = (recordId: string, updates: Partial<ChildcareRecord>) => {
    setChildcareRecords(prev => prev.map(r => r.id === recordId ? { ...r, ...updates } : r));
    logAudit('UPDATE_CHILDCARE_RECORD', 'CHILDCARE_RECORD', recordId, `Updated childcare status for record ${recordId}`);
  };

  const addProtectionCase = (caseData: Omit<ChildProtectionCase, 'id' | 'reportedDate'>) => {
    const newId = `prot_${Date.now()}`;
    const newCase: ChildProtectionCase = {
      ...caseData,
      id: newId,
      reportedDate: new Date().toISOString().split('T')[0],
    };
    setProtectionCases(prev => [newCase, ...prev]);
    logAudit('CREATE_PROTECTION_CASE', 'CHILD_PROTECTION_CASE', newId, `CONFIDENTIAL: Protection referral created for child ${newCase.childName}`);
  };

  const resolveGap = (gapId: string) => {
    setContinuityGaps(prev => prev.map(g => g.id === gapId ? { ...g, resolved: true, lastUpdated: new Date().toISOString().split('T')[0] } : g));
    logAudit('RESOLVE_CONTINUITY_GAP', 'CONTINUITY_GAP', gapId, `Continuity task marked resolved by ${currentPersona.name}`);
  };

  const submitDataCorrection = (corr: Omit<DataCorrectionRequest, 'id' | 'submittedDate' | 'status'>) => {
    const newId = `corr_${Date.now()}`;
    const newCorr: DataCorrectionRequest = {
      ...corr,
      id: newId,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'PENDING_REVIEW',
    };
    setCorrections(prev => [newCorr, ...prev]);
    logAudit('SUBMIT_DATA_CORRECTION', 'DATA_CORRECTION_REQUEST', newId, `Correction submitted for ${newCorr.workerName}: ${newCorr.fieldToCorrect}`);
  };

  const reviewDataCorrection = (correctionId: string, status: 'APPROVED_APPLIED' | 'REJECTED') => {
    setCorrections(prev => prev.map(c => {
      if (c.id === correctionId) {
        return {
          ...c,
          status,
          reviewedBy: currentPersona.name,
          reviewedDate: new Date().toISOString().split('T')[0],
        };
      }
      return c;
    }));
    logAudit('REVIEW_DATA_CORRECTION', 'DATA_CORRECTION_REQUEST', correctionId, `Correction reviewed: ${status}`);
  };

  const resetDemoData = () => {
    localStorage.clear();
    setWorkers(INITIAL_WORKERS);
    setJourneys(INITIAL_JOURNEYS);
    setApplications(INITIAL_BENEFIT_APPLICATIONS);
    setEducationRecords(INITIAL_EDUCATION_RECORDS);
    setHealthRecords(INITIAL_HEALTH_RECORDS);
    setChildcareRecords(INITIAL_CHILDCARE_RECORDS);
    setProtectionCases(INITIAL_PROTECTION_CASES);
    setContinuityGaps(INITIAL_CONTINUITY_GAPS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setCorrections(INITIAL_DATA_CORRECTIONS);
    setCurrentPersona(DEMO_PERSONAS[0]);
    setLanguageState('en');
    setActiveTab('dashboard');
  };

  // Permissions
  const canAccessChildProtection = currentPersona.role !== 'CONTRACTOR';
  const canAccessChildMedical = currentPersona.role !== 'CONTRACTOR';
  const canVerifyRecords = currentPersona.role === 'FIELD_WORKER' || currentPersona.role === 'ADMIN';
  const canManageSchemes = currentPersona.role === 'ADMIN';

  return (
    <AppContext.Provider
      value={{
        currentPersona,
        currentRole: currentPersona.role,
        language,
        t: TRANSLATIONS[language] || TRANSLATIONS.en,
        setLanguage,
        switchPersona,
        activeTab,
        setActiveTab,
        workers,
        journeys,
        schemes,
        applications,
        educationRecords,
        healthRecords,
        childcareRecords,
        protectionCases,
        destinationServices,
        continuityGaps,
        auditLogs,
        corrections,
        addWorker,
        updateWorker,
        addJourney,
        updateJourneyStatus,
        addBenefitApplication,
        updateApplicationStage,
        updateEducationRecord,
        updateHealthRecord,
        updateChildcareRecord,
        addProtectionCase,
        resolveGap,
        submitDataCorrection,
        reviewDataCorrection,
        resetDemoData,
        canAccessChildProtection,
        canAccessChildMedical,
        canVerifyRecords,
        canManageSchemes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
