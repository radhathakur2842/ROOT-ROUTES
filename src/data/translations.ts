import { SupportedLanguage } from '../types';

export interface TranslationStrings {
  brandTitle: string;
  tagline: string;
  roles: {
    WORKER: string;
    CONTRACTOR: string;
    FIELD_WORKER: string;
    ADMIN: string;
  };
  roleDescriptions: {
    WORKER: string;
    CONTRACTOR: string;
    FIELD_WORKER: string;
    ADMIN: string;
  };
  nav: {
    dashboard: string;
    workers: string;
    journeys: string;
    schemes: string;
    benefits: string;
    childServices: string;
    directory: string;
    followups: string;
    reports: string;
    privacy: string;
  };
  common: {
    switchRole: string;
    activeRole: string;
    language: string;
    sampleDataBadge: string;
    searchPlaceholder: string;
    filter: string;
    all: string;
    status: string;
    action: string;
    save: string;
    cancel: string;
    confirm: string;
    close: string;
    viewDetails: string;
    resolve: string;
    resolved: string;
    pending: string;
    critical: string;
    high: string;
    medium: string;
    phone: string;
    location: string;
    officialPortal: string;
    verified: string;
    underReview: string;
    potRelevant: string;
    disclaimer: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationStrings> = {
  en: {
    brandTitle: 'ROOT & ROUTES',
    tagline: 'Every Move, Every Right, Every Family.',
    roles: {
      WORKER: 'Migrant Worker / Family',
      CONTRACTOR: 'Labour Contractor / Employer',
      FIELD_WORKER: 'NGO / Field Case Worker',
      ADMIN: 'Government / Platform Admin',
    },
    roleDescriptions: {
      WORKER: 'Access personal migration records, scheme guidance, child education & health cards.',
      CONTRACTOR: 'Manage worker onboardings & worksite schedules. Sensitive family & child records restricted.',
      FIELD_WORKER: 'Coordinate field intakes, verified school & health referrals, follow-up on service gaps.',
      ADMIN: 'Oversight of scheme directories, DPDP compliance, data audits, and aggregated planning metrics.',
    },
    nav: {
      dashboard: 'Dashboard',
      workers: 'Workers & Families',
      journeys: 'Migration Journeys',
      schemes: 'Government Schemes',
      benefits: 'Benefit Tracker',
      childServices: 'Child Services',
      directory: 'Service Directory',
      followups: 'Continuity Gaps',
      reports: 'Planning Reports',
      privacy: 'Privacy & DPDP',
    },
    common: {
      switchRole: 'Switch Persona',
      activeRole: 'Active View',
      language: 'Language',
      sampleDataBadge: 'Prototype / Fictional Data',
      searchPlaceholder: 'Search by name, district, scheme or keyword...',
      filter: 'Filter',
      all: 'All',
      status: 'Status',
      action: 'Action',
      save: 'Save Changes',
      cancel: 'Cancel',
      confirm: 'Confirm',
      close: 'Close',
      viewDetails: 'View Details',
      resolve: 'Mark Resolved',
      resolved: 'Resolved',
      pending: 'Pending',
      critical: 'Critical Priority',
      high: 'High Priority',
      medium: 'Medium Priority',
      phone: 'Phone',
      location: 'Location',
      officialPortal: 'Official Portal',
      verified: 'Verified Information',
      underReview: 'Under Review',
      potRelevant: 'Potentially Relevant',
      disclaimer: 'Independent migrant service navigation system. Not an official government portal. Records require authorized verification.',
    },
  },
  hi: {
    brandTitle: 'रूट एंड रूट्स (ROOT & ROUTES)',
    tagline: 'हर सफ़र, हर अधिकार, हर परिवार।',
    roles: {
      WORKER: 'प्रवासी श्रमिक / परिवार',
      CONTRACTOR: 'श्रम ठेकेदार / नियोक्ता',
      FIELD_WORKER: 'एनजीओ / फील्ड केस वर्कर',
      ADMIN: 'सरकारी / प्लेटफॉर्म प्रशासक',
    },
    roleDescriptions: {
      WORKER: 'अपनी प्रवास जानकारी, सरकारी योजनाएं, बच्चों की पढ़ाई और स्वास्थ्य सहायता देखें।',
      CONTRACTOR: 'श्रमिकों का पंजीकरण व कार्यस्थल सहायता। बच्चों व गोपनीय मामलों की जानकारी प्रतिबंधित है।',
      FIELD_WORKER: 'स्कूल प्रवेश, स्वास्थ्य जांच, राशन पोर्टेबिलिटी और फील्ड सत्यापन की देखरेख।',
      ADMIN: 'योजना विवरण, गोपनीयता कानून (DPDP) अनुपालन, ऑडिट और समग्र आंकड़े।',
    },
    nav: {
      dashboard: 'डैशबोर्ड',
      workers: 'श्रमिक और परिवार',
      journeys: 'प्रवास यात्रा ट्रैकर',
      schemes: 'सरकारी कल्याण योजनाएं',
      benefits: 'आवेदन स्थिति ट्रैकर',
      childServices: 'बाल सेवा निरंतरता',
      directory: 'सत्यापित सेवा निर्देशिका',
      followups: 'सेवा अंतराल और कार्य',
      reports: 'योजना रिपोर्ट',
      privacy: 'गोपनीयता और सहमति',
    },
    common: {
      switchRole: 'भूमिका बदलें',
      activeRole: 'सक्रिय भूमिका',
      language: 'भाषा',
      sampleDataBadge: 'प्रोटोटाइप / काल्पनिक डेटा',
      searchPlaceholder: 'नाम, जिला, योजना या कीवर्ड से खोजें...',
      filter: 'फ़िल्टर',
      all: 'सभी',
      status: 'स्थिति',
      action: 'कार्रवाई',
      save: 'सुरक्षित करें',
      cancel: 'रद्द करें',
      confirm: 'पुष्टि करें',
      close: 'बंद करें',
      viewDetails: 'विवरण देखें',
      resolve: 'समाधान दर्ज करें',
      resolved: 'पूर्ण',
      pending: 'लंबित',
      critical: 'अति आवश्यक',
      high: 'उच्च प्राथमिकता',
      medium: 'मध्यम प्राथमिकता',
      phone: 'फोन',
      location: 'स्थान',
      officialPortal: 'आधिकारिक पोर्टल',
      verified: 'सत्यापित जानकारी',
      underReview: 'पुनरावलोकन में',
      potRelevant: 'संभावित रूप से उपयोगी',
      disclaimer: 'स्वतंत्र प्रवासी सेवा नेविगेशन मंच। यह आधिकारिक सरकारी डेटाबेस नहीं है।',
    },
  },
  mr: {
    brandTitle: 'रूट अँड रूट्स (ROOT & ROUTES)',
    tagline: 'प्रत्येक स्थलांतर, प्रत्येक हक्क, प्रत्येक कुटुंब.',
    roles: {
      WORKER: 'स्थलांतरित कामगार / कुटुंब',
      CONTRACTOR: 'कामगार कंत्राटदार / मालक',
      FIELD_WORKER: 'स्वयंसेवी संस्था / क्षेत्रीय कार्यकर्ता',
      ADMIN: 'प्रशासकीय / नोडल अधिकारी',
    },
    roleDescriptions: {
      WORKER: 'वैयक्तिक स्थलांतर नोंद, योजना मार्गदर्शन, मुलांचे शिक्षण व आरोग्य पत्रिका पहा.',
      CONTRACTOR: 'कामगारांची प्राथमिक नोंदणी व कामाच्या ठिकाणची व्यवस्था. कौटुंबिक गोपनीय माहिती प्रतिबंधित.',
      FIELD_WORKER: 'शाळा प्रवेश, अंगणवाडी पोषण, लसीकरण व प्रत्यक्ष पडताळणीचे काम.',
      ADMIN: 'योजनांची माहिती, गोपनीय नियमावली (DPDP), ऑडिट नोंदी व जिल्हानिहाय अहवाल.',
    },
    nav: {
      dashboard: 'डॅशबोर्ड',
      workers: 'कामगार आणि कुटुंबे',
      journeys: 'स्थलांतर प्रवास ट्रॅकर',
      schemes: 'शासकीय कल्याणकारी योजना',
      benefits: 'लाभ अर्ज स्थिती',
      childServices: 'बाल सेवा निरंतरता',
      directory: 'पडताळलेली सेवा निर्देशिका',
      followups: 'प्रलंबित सेवा त्रुटी',
      reports: 'नियोजन अहवाल',
      privacy: 'गोपनीयता व संमती',
    },
    common: {
      switchRole: 'भूमिका बदला',
      activeRole: 'सध्याची भूमिका',
      language: 'भाषा',
      sampleDataBadge: 'प्रात्यक्षिक / नमुना माहिती',
      searchPlaceholder: 'नाव, जिल्हा, योजना किंवा विषयानुसार शोधा...',
      filter: 'फिल्टर',
      all: 'सर्व',
      status: 'स्थिती',
      action: 'कृती',
      save: 'जतन करा',
      cancel: 'रद्द करा',
      confirm: 'नक्की करा',
      close: 'बंद करा',
      viewDetails: 'तपशील पहा',
      resolve: 'पूर्ण म्हणून नोंदवा',
      resolved: 'पूर्ण झाले',
      pending: 'प्रलंबित',
      critical: 'अति तात्काळ',
      high: 'उच्च प्राधान्य',
      medium: 'मध्यम प्राधान्य',
      phone: 'फोन',
      location: 'स्थान',
      officialPortal: 'अधिकृत संकेतस्थळ',
      verified: 'पडताळलेली माहिती',
      underReview: 'तपासणी सुरू',
      potRelevant: 'संभाव्य उपयुक्त',
      disclaimer: 'स्वतंत्र स्थलांतरित सेवा मदत प्रणाली. थेट सरकारी यंत्रणा नाही; प्रत्यक्ष पडताळणी आवश्यक.',
    },
  },
  bho: {
    brandTitle: 'रूट एंड रूट्स (ROOT & ROUTES)',
    tagline: 'हर सफर, हर अधिकार, हर परिवार।',
    roles: {
      WORKER: 'प्रवासी मजदूर / परिवार',
      CONTRACTOR: 'ठेकेदार / मालिक',
      FIELD_WORKER: 'संस्था / फील्ड साथी',
      ADMIN: 'सरकारी / एडमिन साहेब',
    },
    roleDescriptions: {
      WORKER: 'अपन प्रवास के जानकारी, योजना, लइका लोगन के पढ़ाई आ दवाई-सुई के हाल देखल जा सकेला।',
      CONTRACTOR: 'मजदूरन के आमद-रफ्त के देखरेख। बाल-बच्चा के संवेदनशील जानकारी बंद रही।',
      FIELD_WORKER: 'स्कूल में नाम लिखावल, राशन मिलल, सुई दिलवावल आ फील्ड में मदद।',
      ADMIN: 'योजना के सही जानकारी आ जिला स्तर के जरूरी रिपोर्ट।',
    },
    nav: {
      dashboard: 'डैशबोर्ड',
      workers: 'मजदूर आ परिवार',
      journeys: 'सफ़र नामा',
      schemes: 'सरकारी योजना',
      benefits: 'दरखास्त के हाल',
      childServices: 'लइकन के पढ़ाई-दवाई',
      directory: 'मदद केंद्र के पता',
      followups: 'बाकी काम',
      reports: 'रिपोर्ट',
      privacy: 'सहमति आ सुरक्षा',
    },
    common: {
      switchRole: 'रोल बदलीं',
      activeRole: 'चालू रोल',
      language: 'भाषा',
      sampleDataBadge: 'काल्पनिक / नमूना डेटा',
      searchPlaceholder: 'नाम, जिला या योजना से खोजीं...',
      filter: 'छांटीं',
      all: 'सभे',
      status: 'हालत',
      action: 'काम',
      save: 'सहेजीं',
      cancel: 'छोड़ीं',
      confirm: 'पक्का करीं',
      close: 'बंद करीं',
      viewDetails: 'पूरा देखीं',
      resolve: 'काम हो गइल',
      resolved: 'हो गइल',
      pending: 'बाकी बा',
      critical: 'तुरंत जरूरी',
      high: 'बड़ा जरूरी',
      medium: 'साधारण',
      phone: 'फोन',
      location: 'जगह',
      officialPortal: 'सरकारी वेबसाइट',
      verified: 'जांचल जानकारी',
      underReview: 'जांच चलत बा',
      potRelevant: 'काम के हो सकेला',
      disclaimer: 'प्रवासी भाई-बहिनन खातिर मदद मंच। ई कौनों सरकारी दफ्तर ना हवे।',
    },
  },
};
