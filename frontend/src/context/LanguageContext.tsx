import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Navigation
  appName: { en: "AgriSathi", hi: "एग्रीसाथी" },
  tagline: { en: "Multimodal AI Agricultural Assistant", hi: "बहुविध एआई कृषि सहायक" },
  home: { en: "Home", hi: "होम" },
  dashboard: { en: "Dashboard", hi: "डैशबोर्ड" },
  checkCrop: { en: "Check My Crop", hi: "फसल जांचें" },
  assistant: { en: "Ask AgriSathi", hi: "पूछें एग्रीसाथी" },
  myFarm: { en: "My Farm", hi: "मेरा खेत" },
  history: { en: "Diagnosis History", hi: "निदान इतिहास" },
  diseaseLibrary: { en: "Disease Library", hi: "रोग निर्देशिका" },
  weather: { en: "Weather", hi: "मौसम" },
  expertReview: { en: "Expert Review", hi: "विशेषज्ञ समीक्षा" },
  profile: { en: "Profile", hi: "प्रोफाइल" },
  demoBadge: { en: "Demo Mode Active", hi: "डेमो मोड सक्रिय" },

  // Hero & Landing
  heroHeadline: { en: "Your Crop's AI Companion", hi: "आपकी फसल का एआई साथी" },
  heroSubtitle: {
    en: "Identify crop problems, understand what is happening, and get practical agricultural guidance in your language.",
    hi: "फसल के रोगों की पहचान करें, कारणों को समझें और अपनी मातृभाषा में व्यावहारिक कृषि सलाह प्राप्त करें।"
  },
  tryDemo: { en: "Try Demo Mode", hi: "डेमो चलाएं" },
  howItWorks: { en: "How It Works", hi: "यह कैसे काम करता है" },
  step1Title: { en: "1. Capture", hi: "1. फोटो लें" },
  step1Desc: { en: "Take a photo or upload an affected crop leaf image.", hi: "प्रभावित पत्ती की फोटो खींचे या अपलोड करें।" },
  step2Title: { en: "2. Understand", hi: "2. समझें" },
  step2Desc: { en: "AI detects visible symptoms, disease confidence, and weather risks.", hi: "एआई लक्षणों, रोग की संभावना और मौसम के जोखिम का विश्लेषण करता है।" },
  step3Title: { en: "3. Act", hi: "3. समाधान अपनाएं" },
  step3Desc: { en: "Receive practical ICAR-grounded steps, organic remedies, and prevention tips.", hi: "आईसीएआर द्वारा सत्यापित समाधान, जैविक उपचार और रोकथाम अपनाएं।" },

  // Dashboard
  greeting: { en: "Good morning", hi: "सुप्रभात" },
  welcomeBack: { en: "Welcome back to AgriSathi", hi: "एग्रीसाथी में आपका स्वागत है" },
  weatherCardTitle: { en: "Weather & Disease Risk", hi: "मौसम एवं रोग जोखिम" },
  myCropCardTitle: { en: "Active Crop Status", hi: "सक्रिय फसल स्थिति" },
  quickActions: { en: "Quick Actions", hi: "त्वरित सेवाएं" },
  recentDiagnosis: { en: "Recent Diagnosis", hi: "हालिया निदान" },
  viewAll: { en: "View All", hi: "सभी देखें" },
  viewDetails: { en: "View Details", hi: "विवरण देखें" },
  importantAlert: { en: "Important Advisory", hi: "महत्वपूर्ण कृषि सलाह" },

  // Scan & Upload
  takePhoto: { en: "Take Photo", hi: "फोटो खींचें" },
  uploadImage: { en: "Upload Image", hi: "फोटो अपलोड करें" },
  dragDropText: { en: "Drop your crop leaf photo here or click to browse", hi: "यहाँ पत्ती की फोटो खींचकर छोड़ें या ब्राउज़ करें" },
  supportedFormats: { en: "Supports JPG, PNG up to 10MB", hi: "JPG, PNG प्रारूप (अधिकतम 10MB)" },
  selectFarmPrompt: { en: "Select Farm (Optional)", hi: "खेत चुनें (वैकल्पिक)" },
  analyzeBtn: { en: "Start AI Analysis", hi: "एआई विश्लेषण शुरू करें" },
  analyzingText: { en: "Analyzing your crop...", hi: "आपकी फसल का विश्लेषण हो रहा है..." },
  stepReading: { en: "Reading image & verifying quality", hi: "तस्वीर की गुणवत्ता जांची जा रही है" },
  stepDetecting: { en: "Detecting visible symptoms", hi: "लक्षणों की पहचान की जा रही है" },
  stepComparing: { en: "Comparing disease patterns", hi: "रोग के पैटर्न से मिलान किया जा रहा है" },
  stepPreparing: { en: "Preparing agricultural guidance", hi: "कृषि परामर्श तैयार किया जा रहा है" },

  // Quality check
  qualityFailedTitle: { en: "Image Quality Needs Improvement", hi: "तस्वीर की गुणवत्ता में सुधार आवश्यक है" },
  tryAgainBtn: { en: "Try Again", hi: "पुनः प्रयास करें" },

  // Diagnosis Detail
  diagnosisResult: { en: "Diagnosis Result", hi: "निदान परिणाम" },
  possibleDisease: { en: "Possible Disease", hi: "संभावित रोग" },
  confidence: { en: "Confidence", hi: "सटीकता" },
  severity: { en: "Severity", hi: "गंभीरता" },
  whatWeFound: { en: "What We Found", hi: "हमने क्या पाया (लक्षण)" },
  whyWeThinkThis: { en: "Why We Think This", hi: "एआई प्रमाण का आधार" },
  whatToDoNow: { en: "What To Do Now", hi: "अभी क्या कदम उठाएं" },
  prevention: { en: "Prevention", hi: "भविष्य में रोकथाम" },
  monitor: { en: "What To Monitor", hi: "किन बातों पर नजर रखें" },
  differentialTitle: { en: "Differential Diagnosis (Possible Causes)", hi: "विभेदक निदान (अन्य संभावनाएं)" },
  importantNoteTitle: { en: "Important Safety Note", hi: "महत्वपूर्ण सुरक्षा सूचना" },
  importantNoteText: {
    en: "AI-assisted identification, not laboratory-confirmed diagnosis. Follow approved agricultural pesticide labels and local KVK advisory.",
    hi: "यह एआई-आधारित प्राथमिक पहचान है, प्रयोगशाला-पुष्ट निदान नहीं। कीटनाशकों के अनुमोदित लेबल और कृषि विज्ञान केंद्र (KVK) के निर्देशों का पालन करें।"
  },
  sourcesTitle: { en: "Agricultural Knowledge Sources", hi: "सत्यापित कृषि संदर्भ स्रोत" },
  requestExpertBtn: { en: "Request Expert Review", hi: "विशेषज्ञ से पुष्टि कराएं" },
  expertRequested: { en: "Submitted to Expert Queue", hi: "विशेषज्ञ समीक्षा हेतु प्रेषित" },
  feedbackHelpfulPrompt: { en: "Was this diagnosis helpful?", hi: "क्या यह निदान उपयोगी था?" },
  yes: { en: "Yes", hi: "हाँ" },
  no: { en: "No", hi: "नहीं" },

  // Assistant & Voice
  assistantTitle: { en: "Ask AgriSathi AI", hi: "एग्रीसाथी से पूछें" },
  assistantSubtitle: { en: "Multimodal Vernacular Agricultural Advisor", hi: "बहुभाषी एआई कृषि सलाहकार" },
  suggestedQuestions: { en: "Suggested Questions", hi: "अक्सर पूछे जाने वाले सवाल" },
  typeQuestionPlaceholder: { en: "Type your farming question here...", hi: "यहाँ अपना कृषि से संबंधित प्रश्न लिखें..." },
  tapToSpeak: { en: "Tap to Speak", hi: "बोलने के लिए दबाएं" },
  listening: { en: "Listening...", hi: "सुन रहे हैं..." },
  processingVoice: { en: "Understanding your question...", hi: "आपका प्रश्न समझा जा रहा है..." },
  listenVoice: { en: "Listen Audio", hi: "आवाज में सुनें" },
  stopVoice: { en: "Stop Audio", hi: "आवाज बंद करें" },

  // Farm
  addFarm: { en: "Add New Farm", hi: "नया खेत जोड़ें" },
  farmName: { en: "Farm Name", hi: "खेत का नाम" },
  location: { en: "Location", hi: "स्थान" },
  areaAcres: { en: "Area (Acres)", hi: "क्षेत्रफल (एकड़)" },
  currentCrop: { en: "Current Crop", hi: "वर्तमान फसल" },
  cropStage: { en: "Crop Stage", hi: "फसल की अवस्था" },
  irrigation: { en: "Irrigation Type", hi: "सिंचाई का प्रकार" },
  saveFarm: { en: "Save Farm Profile", hi: "खेत विवरण सहेजें" },

  // History & Comparison
  historyTitle: { en: "Crop Health History", hi: "फसल स्वास्थ्य इतिहास" },
  filterByCrop: { en: "Filter by Crop", hi: "फसल के अनुसार छांटें" },
  allCrops: { en: "All Crops", hi: "सभी फसलें" },
  imageComparisonTitle: { en: "Visual Progression: Day 1 vs Day 7", hi: "तस्वीर तुलना: पहला दिन बनाम 7वां दिन" },
  beforeTreatment: { en: "Day 1: Initial Diagnosis", hi: "पहला दिन: प्रारंभिक संक्रमण" },
  afterTreatment: { en: "Day 7: Post Bio-treatment", hi: "7वां दिन: उपचार के बाद की स्थिति" },

  // Expert Portal
  expertPortalTitle: { en: "Agricultural Expert Review Desk", hi: "कृषि विशेषज्ञ समीक्षा पटल" },
  expertSubtitle: { en: "Review and certify AI diagnosis cases submitted by farmers", hi: "किसानों द्वारा भेजे गए रोग मामलों की पुष्टि और मार्गदर्शन" },
  pendingCases: { en: "Pending Cases Queue", hi: "लंबित मामलों की सूची" },
  confirmCase: { en: "Confirm Prediction", hi: "निदान की पुष्टि करें" },
  correctCase: { en: "Correct Prediction", hi: "निदान संशोधित करें" },
  expertNotePlaceholder: { en: "Add agronomist notes and certified dosage...", hi: "कृषि विशेषज्ञ की टिप्पणी और अनुशंसित मात्रा लिखें..." },
  submitReview: { en: "Submit Expert Recommendation", hi: "विशेषज्ञ सलाह दर्ज करें" }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('agrisathi_lang') as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('agrisathi_lang', language);
  }, [language]);

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language] || translations[key]['en'];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
