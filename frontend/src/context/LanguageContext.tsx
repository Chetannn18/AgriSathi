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
  mandiRates: { en: "Mandi Rates", hi: "मंडी भाव" },
  calculator: { en: "Calculator", hi: "खाद कैलकुलेटर" },
  assistant: { en: "Ask AgriSathi", hi: "पूछें एग्रीसाथी" },
  myFarm: { en: "My Farm", hi: "मेरा खेत" },
  history: { en: "Diagnosis History", hi: "निदान इतिहास" },
  diseaseLibrary: { en: "Disease Library", hi: "रोग निर्देशिका" },
  weather: { en: "Weather", hi: "मौसम" },
  expertReview: { en: "Expert Review", hi: "विशेषज्ञ समीक्षा" },
  profile: { en: "Profile", hi: "प्रोफाइल" },
  demoBadge: { en: "Demo Mode Active", hi: "डेमो मोड सक्रिय" },
  howItWorks: { en: "How It Works", hi: "कार्यप्रणाली" },
  features: { en: "Features", hi: "विशेषताएं" },
  about: { en: "About", hi: "परिचय" },

  // Hero & Landing
  heroHeadline: { en: "Your Crop's AI Companion", hi: "आपकी फसल का एआई साथी" },
  heroSubtitle: {
    en: "Identify crop problems, understand what is happening, and get practical agricultural guidance in your language.",
    hi: "फसल के रोगों की पहचान करें, कारणों को समझें और अपनी मातृभाषा में व्यावहारिक कृषि सलाह प्राप्त करें।"
  },
  tryDemo: { en: "Try Demo Mode", hi: "डेमो चलाएं" },
  fromLeafToAction: { en: "Multimodal Indian AgriTech • From Leaf to Action", hi: "भारतीय कृषि तकनीक • पत्ती से समाधान तक" },
  seeWhatsHappening: { en: "See what's happening in your crop. Understand the problem. Know what to do next.", hi: "अपनी फसल में देखें क्या हो रहा है। समस्या समझें। आगे क्या करना है जानें।" },
  visualDiagnosisSeconds: { en: "Visual Diagnosis in 3 Seconds", hi: "3 सेकंड में त्वरित रोग पहचान" },
  spokenHindiEnglish: { en: "Spoken Hindi & English", hi: "हिन्दी एवं अंग्रेजी में बोलकर" },
  fieldTestedGuidance: { en: "Field Tested Guidance", hi: "आईसीएआर प्रमाणित कृषि समाधान" },
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
  aiLeafDiagnosisAdvice: { en: "AI leaf diagnosis & advice", hi: "एआई पत्ती रोग जांच व सलाह" },
  liveApmcPrices: { en: "Live APMC prices & trends", hi: "ताजा मंडी भाव व बाजार रुझान" },
  ureaDapDosage: { en: "Urea, DAP & seed dosage", hi: "यूरिया, डीएपी व बीज मात्रा" },
  voiceChatVernacular: { en: "Voice or text chat in Hindi", hi: "हिन्दी में बोलकर या लिखकर पूछें" },
  myFarmPlots: { en: "2 Plots • Active Drip System", hi: "2 खेत • ड्रिप सिंचाई प्रणाली" },
  encyclopediaCrops: { en: "Encyclopedia of 20+ crops", hi: "20+ फसलों की रोग निर्देशिका" },

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
  targetCropLabel: { en: "Target Crop:", hi: "फसल चुनें:" },
  targetCropHint: { en: "(tailors diagnosis to crop pathogen rules)", hi: "(सटीक पत्ती रोग विश्लेषण हेतु)" },
  autoDetect: { en: "Auto-Detect (AI)", hi: "ऑटो (AI पहचान)" },
  quickTestCases: { en: "Quick Test with Preconfigured Demo Cases", hi: "पूर्व-कॉन्फ़िगर डेमो पत्तियों से तुरंत जांचें" },
  oneClickDemo: { en: "1-Click Demo", hi: "1-क्लिक टेस्ट" },
  clickToTest: { en: "Click to Test", hi: "जांचने के लिए क्लिक करें" },
  chooseAnotherPhoto: { en: "Choose another photo", hi: "दूसरी तस्वीर चुनें" },
  verifyingQuality: { en: "Verifying image resolution & lighting quality...", hi: "तस्वीर के रिज़ॉल्यूशन व रोशनी की जांच हो रही है..." },
  qualityVerified: { en: "Quality verified", hi: "तस्वीर स्पष्ट एवं स्वीकार्य है" },
  cvDiagnosticsTitle: { en: "Computer Vision Diagnostics", hi: "कंप्यूटर विज़न रोग निदान" },
  scanPageSubtitle: { en: "Upload or take a photo of an affected leaf for instant AI disease identification", hi: "त्वरित एआई रोग पहचान के लिए प्रभावित पत्ती की तस्वीर अपलोड करें या खींचें" },

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
  recorded: { en: "Recorded", hi: "दर्ज किया गया" },
  kvkVerified: { en: "KVK Agronomist Verified", hi: "कृषि वैज्ञानिक द्वारा सत्यापित" },
  immediateAdvisorySubtext: {
    en: "Immediate field interventions approved by ICAR and state agricultural extension guidelines:",
    hi: "आईसीएआर और कृषि विस्तार दिशा-निर्देशों द्वारा अनुमोदित तत्काल उपाय:"
  },

  // Mandi Page
  mandiTitle: { en: "Live Mandi Rates & APMC Intelligence", hi: "लाइव मंडी भाव एवं बाजार विश्लेषण" },
  mandiSubtitle: {
    en: "Real-time crop market prices from major Indian APMCs with AI commodity price trend forecasts",
    hi: "प्रमुख भारतीय मंडियों से फसलों के ताजा भाव व एआई मूल्य पूर्वानुमान"
  },
  searchMandiPlaceholder: { en: "Search crop, variety, or mandi (e.g. Soybean, Indore, Neemuch)...", hi: "फसल, किस्म या मंडी खोजें (जैसे सोयाबीन, इंदौर, नीमच)..." },
  allCommodities: { en: "All Commodities", hi: "सभी फसलें" },
  mspBenchmark: { en: "MSP Benchmark", hi: "न्यूनतम समर्थन मूल्य (MSP)" },
  arrivalToday: { en: "Arrivals Today", hi: "आज की आवक" },
  modalPrice: { en: "Modal Price", hi: "मॉडल भाव" },
  minMaxPrice: { en: "Min / Max", hi: "न्यूनतम / अधिकतम" },
  aiTrendAdvisory: { en: "AI Market Advisory", hi: "एआई बाजार सलाह" },
  recommendation: { en: "Recommendation", hi: "सलाह" },
  sellAction: { en: "SELL", hi: "बेचें" },
  holdAction: { en: "HOLD", hi: "रोकें" },
  watchAction: { en: "WATCH", hi: "नजर रखें" },

  // Fertilizer Calculator
  calcTitle: { en: "Scientific Fertilizer & Seed Rate Calculator", hi: "वैज्ञानिक खाद एवं बीज दर कैलकुलेटर" },
  calcSubtitle: {
    en: "Calculate exact DAP, Urea, MOP (Potash), and certified seed quantities customized to your plot acreage",
    hi: "अपने खेत के क्षेत्रफल अनुसार डीएपी, यूरिया, पोटाश व प्रमाणित बीज की सही मात्रा की गणना करें"
  },
  enterPlotArea: { en: "Enter Plot Area (Acres)", hi: "खेत का क्षेत्रफल दर्ज करें (एकड़)" },
  selectCropPrompt: { en: "Select Target Crop", hi: "फसल चुनें" },
  calculateNow: { en: "Calculate Recommended Dosages", hi: "खाद व बीज की मात्रा निकालें" },
  recommendedSeedDose: { en: "Certified Seed Requirement", hi: "प्रमाणित बीज की आवश्यकता" },
  dapRequirement: { en: "DAP Fertilizer (18:46:0)", hi: "डीएपी खाद (18:46:0)" },
  ureaRequirement: { en: "Urea Fertilizer (46% N)", hi: "यूरिया खाद (46% N)" },
  mopRequirement: { en: "MOP Potash (0:0:60)", hi: "पोटाश (MOP 0:0:60)" },
  zincRequirement: { en: "Zinc Sulphate (21%)", hi: "जिंक सल्फेट (21%)" },
  applicationSchedule: { en: "Stage-wise Application Schedule", hi: "अवस्था अनुसार खाद देने की समय सारिणी" },

  // Weather
  weatherTitle: { en: "Agromet Climate & Pathogen Correlation", hi: "मौसम आधारित रोग व जलवायु पूर्वानुमान" },
  weatherSubtitle: {
    en: "Real-time agricultural weather context from IMD Agromet indices to anticipate fungal and pest outbreaks",
    hi: "मौसम विज्ञान केंद्र (IMD) के अनुसार वास्तविक समय में मौसम व कवक रोग जोखिम का पूर्वानुमान"
  },
  humidityMetric: { en: "Humidity", hi: "आर्द्रता (नमी)" },
  rainRiskMetric: { en: "Rain Risk", hi: "वर्षा की संभावना" },
  windMetric: { en: "Wind Speed", hi: "हवा की गति" },
  fiveDayForecast: { en: "5-Day Agromet Forecast", hi: "5 दिवसीय कृषि मौसम पूर्वानुमान" },
  humiditySporeTitle: { en: "Humidity & Spore Germination", hi: "नमी एवं फफूंद बीजाणु अंकुरण" },
  tempWindowsTitle: { en: "Temperature Windows", hi: "तापमान अनुकूलता चक्र" },
  farmerActionChecklist: { en: "Farmer Action Checklist", hi: "किसान कार्य सूची" },

  // Diseases Library
  diseaseEncyclopediaTitle: { en: "Verified Field Encyclopedia", hi: "सत्यापित फसल रोग निर्देशिका" },
  diseaseEncyclopediaSubtitle: {
    en: "Comprehensive pathological catalog across major Indian crops with ICAR prevention protocols",
    hi: "आईसीएआर रोकथाम प्रोटोकॉल के साथ प्रमुख भारतीय फसलों का रोग निदान कैटलॉग"
  },
  searchDiseasePlaceholder: { en: "Search crop or disease (e.g. Blight, Blast, Rust, Mildew)...", hi: "फसल या रोग खोजें (उदा. झुलसा, ब्लास्ट, रतुआ, पाउडरी)..." },
  viewIcarProtocol: { en: "View ICAR Protocol", hi: "आईसीएआर प्रोटोकॉल देखें" },
  keySymptomLabel: { en: "Key Symptom:", hi: "प्रमुख लक्षण:" },
  scanForThisDisease: { en: "Scan For This Disease", hi: "इस रोग की जांच हेतु फोटो लें" },

  // History
  historyRecordTitle: { en: "Longitudinal Health Records", hi: "दीर्घकालिक फसल स्वास्थ्य रिकॉर्ड" },
  historySubtitle: {
    en: "Review past crop diagnoses, certified agronomist reviews, and foliar recovery timelines",
    hi: "पुराने फसल निदान, विशेषज्ञ समीक्षा और पत्ती सुधार समयरेखा देखें"
  },
  day1VsDay7: { en: "Visual Progression: Day 1 vs Day 7", hi: "तस्वीर तुलना: पहला दिन बनाम 7वां दिन" },
  day1Initial: { en: "Day 1: Initial Infection", hi: "पहला दिन: प्रारंभिक संक्रमण" },
  day7Healed: { en: "Day 7: Post Bio-treatment", hi: "7वां दिन: उपचार के बाद की स्थिति" },
  allCrops: { en: "All Crops", hi: "सभी फसलें" },
  searchHistoryPlaceholder: { en: "Search disease or crop...", hi: "रोग या फसल खोजें..." },

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

  // Expert Portal
  expertPortalTitle: { en: "Agricultural Expert Review Desk", hi: "कृषि विशेषज्ञ समीक्षा पटल" },
  expertSubtitle: { en: "Review and certify AI diagnosis cases submitted by farmers", hi: "किसानों द्वारा भेजे गए रोग मामलों की पुष्टि और मार्गदर्शन" },
  pendingCases: { en: "Pending Cases Queue", hi: "लंबित मामलों की सूची" },
  confirmCase: { en: "Confirm Prediction", hi: "निदान की पुष्टि करें" },
  correctCase: { en: "Correct Prediction", hi: "निदान संशोधित करें" },
  expertNotePlaceholder: { en: "Add agronomist notes and certified dosage...", hi: "कृषि विशेषज्ञ की टिप्पणी और अनुशंसित मात्रा लिखें..." },
  submitReview: { en: "Submit Expert Recommendation", hi: "विशेषज्ञ सलाह दर्ज करें" },

  // Crop Names
  cropSoybean: { en: "Soybean", hi: "सोयाबीन" },
  cropTomato: { en: "Tomato", hi: "टमाटर" },
  cropPotato: { en: "Potato", hi: "आलू" },
  cropRice: { en: "Rice", hi: "धान" },
  cropCotton: { en: "Cotton", hi: "कपास" },
  cropChilli: { en: "Chilli", hi: "मिर्च" },
  cropWheat: { en: "Wheat", hi: "गेहूं" },
  cropMaize: { en: "Maize", hi: "मक्का" }
};

const CROP_MAP_HI: Record<string, string> = {
  Soybean: "सोयाबीन",
  Tomato: "टमाटर",
  Potato: "आलू",
  Rice: "धान",
  Cotton: "कपास",
  Chilli: "मिर्च",
  Wheat: "गेहूं",
  Maize: "मक्का"
};

const STAGE_MAP_HI: Record<string, string> = {
  Germination: "अंकुरण (Germination)",
  Vegetative: "वानस्पतिक बढ़वार (Vegetative)",
  Flowering: "फूल आना (Flowering)",
  Development: "फल/फली विकास (Development)",
  Maturity: "परिपक्वता (Maturity)",
  Harvest: "कटाई अवस्था (Harvest)"
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getCropName: (crop: string) => string;
  getStageName: (stage: string) => string;
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

  const getCropName = (crop: string): string => {
    if (language === 'hi' && CROP_MAP_HI[crop]) {
      return CROP_MAP_HI[crop];
    }
    return crop;
  };

  const getStageName = (stage: string): string => {
    if (language === 'hi' && STAGE_MAP_HI[stage]) {
      return STAGE_MAP_HI[stage];
    }
    return stage;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getCropName, getStageName }}>
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
