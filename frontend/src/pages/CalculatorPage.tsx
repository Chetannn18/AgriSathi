import React, { useState } from 'react';
import { 
  Calculator, Sprout, ShieldCheck, HelpCircle, CheckCircle2, 
  ArrowRight, Download, RefreshCw, Sparkles, AlertCircle, Info, Landmark
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CropFormula {
  name: string;
  name_hi: string;
  seed_rate_per_acre: number; // kg
  seed_variety: string;
  dap_bags_per_acre: number; // 50kg bag
  urea_bags_per_acre: number; // 45kg bag
  mop_bags_per_acre: number; // 50kg bag
  zinc_kg_per_acre: number; // kg
  seed_cost_per_kg: number;
  stages: {
    stage: string;
    stage_hi: string;
    timing: string;
    instructions: string;
    instructions_hi: string;
  }[];
}

const CROP_FORMULAS: Record<string, CropFormula> = {
  Soybean: {
    name: 'Soybean',
    name_hi: 'सोयाबीन',
    seed_rate_per_acre: 30, // 30 kg/acre
    seed_variety: 'JS 20-34 / NRC 127 / JS 95-60',
    dap_bags_per_acre: 1.0, // 1 bag DAP
    urea_bags_per_acre: 0.5, // 0.5 bag Urea (Soybean fixes nitrogen naturally!)
    mop_bags_per_acre: 0.8, // 0.8 bag MOP (Potash vital for oil & pod weight)
    zinc_kg_per_acre: 5.0,
    seed_cost_per_kg: 85,
    stages: [
      {
        stage: 'Basal Dose (बुवाई के समय)',
        stage_hi: 'बुवाई के समय (बेसल डोज)',
        timing: 'Day 0 (At Sowing)',
        instructions: 'Apply 100% DAP (50 kg) + 100% MOP Potash (40 kg) + Zinc Sulphate in furrows below seed.',
        instructions_hi: 'पूरा डीएपी (50 किग्रा) + पोटाश (40 किग्रा) + जिंक सल्फेट बीज के 5 सेमी नीचे कतारों में दें।'
      },
      {
        stage: 'First Weeding & Hoeing (निंदाई-गुड़ाई)',
        stage_hi: 'निंदाई-गुड़ाई व बढ़वार (20-25 दिन)',
        timing: 'Day 20 - 25',
        instructions: 'Apply light urea (20-25 kg) only if crop appears pale. Soybean nodules begin fixing nitrogen.',
        instructions_hi: 'पत्तियों में पीलापन होने पर ही हल्का यूरिया (20-25 किग्रा) दें; जड़ ग्रंथियां नाइट्रोजन बनाना शुरू करती हैं।'
      },
      {
        stage: 'Pod Formation (फली विकास)',
        stage_hi: 'फूल व फली बनते समय (45-50 दिन)',
        timing: 'Day 45 - 50',
        instructions: 'Foliar spray of 19:19:19 or 0:52:34 @ 1 kg in 150L water per acre to enhance seed filling.',
        instructions_hi: 'दाने के भराव के लिए 0:52:34 या 19:19:19 (1 किग्रा/एकड़) का 150 लीटर पानी में पर्णीय छिड़काव करें।'
      }
    ]
  },
  Wheat: {
    name: 'Wheat',
    name_hi: 'गेहूं',
    seed_rate_per_acre: 40,
    seed_variety: 'Sharbati C-306 / GW 322 / HD 2967',
    dap_bags_per_acre: 1.2,
    urea_bags_per_acre: 2.2,
    mop_bags_per_acre: 0.8,
    zinc_kg_per_acre: 8.0,
    seed_cost_per_kg: 45,
    stages: [
      {
        stage: 'Basal Dose (बुवाई के समय)',
        stage_hi: 'बुवाई के समय (बेसल डोज)',
        timing: 'Day 0',
        instructions: 'Full DAP + Full MOP + 1/3rd Urea in soil.',
        instructions_hi: 'पूरा डीएपी + पूरा पोटाश + 1/3 यूरिया खेत की तैयारी के समय डालें।'
      },
      {
        stage: 'CRI Stage (पहली सिंचाई / कल्ले फूटते समय)',
        stage_hi: 'पहली सिंचाई (21 दिन बाद)',
        timing: 'Day 20 - 25',
        instructions: 'Top dress 1/3rd Urea (35 kg/acre) after 1st irrigation (CRI stage).',
        instructions_hi: 'पहली सिंचाई (शिखर जड़ अवस्था) के बाद 35 किग्रा यूरिया प्रति एकड़ का छिड़काव करें।'
      },
      {
        stage: 'Jointing Stage (गांठ बनते समय)',
        stage_hi: 'दूसरी सिंचाई (45 दिन बाद)',
        timing: 'Day 40 - 45',
        instructions: 'Top dress remaining 1/3rd Urea before second irrigation.',
        instructions_hi: 'बाकी बचा 1/3 यूरिया दूसरी सिंचाई से पहले छिड़कें।'
      }
    ]
  },
  Tomato: {
    name: 'Tomato',
    name_hi: 'टमाटर',
    seed_rate_per_acre: 0.15, // 150g hybrid seed
    seed_variety: 'Pusa Ruby / Abhinav / Shivam F1',
    dap_bags_per_acre: 1.5,
    urea_bags_per_acre: 1.8,
    mop_bags_per_acre: 1.2,
    zinc_kg_per_acre: 5.0,
    seed_cost_per_kg: 35000,
    stages: [
      {
        stage: 'Transplanting (रोपाई के समय)',
        stage_hi: 'पौध रोपाई के समय',
        timing: 'Day 0',
        instructions: 'Well-decomposed FYM (5 tonnes) + Full DAP + Full MOP.',
        instructions_hi: 'गोबर की सड़ी खाद + पूरा डीएपी + पूरा पोटाश क्यारियों में मिलाएं।'
      },
      {
        stage: 'Vegetative Surge (वानस्पतिक बढ़वार)',
        stage_hi: 'रोपाई के 30 दिन बाद',
        timing: 'Day 30',
        instructions: 'Apply 1st split Urea (25 kg/acre) + Drip fertigation with 19:19:19.',
        instructions_hi: '25 किग्रा यूरिया अथवा ड्रिप से 19:19:19 घुलनशील खाद दें।'
      },
      {
        stage: 'Fruiting (फल विकास)',
        stage_hi: 'फल बनने की अवस्था (50-60 दिन)',
        timing: 'Day 50 - 60',
        instructions: 'Calcium Nitrate (5 kg/acre) + Boron spray to prevent blossom end rot.',
        instructions_hi: 'फलों को फटने व सड़ने से बचाने के लिए कैल्शियम नाइट्रेट व बोरॉन का छिड़काव करें।'
      }
    ]
  },
  Potato: {
    name: 'Potato',
    name_hi: 'आलू',
    seed_rate_per_acre: 1200, // 1200 kg seed tubers
    seed_variety: 'Kufri Jyoti / Kufri Pukhraj',
    dap_bags_per_acre: 2.5,
    urea_bags_per_acre: 2.5,
    mop_bags_per_acre: 2.0,
    zinc_kg_per_acre: 10.0,
    seed_cost_per_kg: 22,
    stages: [
      {
        stage: 'Planting (बुवाई के समय)',
        stage_hi: 'कंद बुवाई के समय',
        timing: 'Day 0',
        instructions: 'All DAP + All Potash + half Urea along with seed tubers.',
        instructions_hi: 'पूरा डीएपी + पूरा पोटाश और आधा यूरिया कंदों के साथ नाली में दें।'
      },
      {
        stage: 'Earthing Up (मिट्टी चढ़ाने के समय)',
        stage_hi: 'मिट्टी चढ़ाना (30-35 दिन)',
        timing: 'Day 30 - 35',
        instructions: 'Apply remaining Urea (45 kg) before earthing up tubers.',
        instructions_hi: 'मिट्टी चढ़ाने से पूर्व शेष यूरिया डालकर सिंचाई करें।'
      }
    ]
  }
};

const GOVT_SCHEMES = [
  {
    title: 'PM-Kisan Samman Nidhi',
    title_hi: 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)',
    benefit: '₹6,000 / year in 3 equal installments directly into farmer bank account',
    benefit_hi: '₹6,000 वार्षिक वित्तीय सहायता (प्रत्यक्ष बैंक खाते में 3 किस्तों में)',
    eligibility: 'All small & marginal landholder farmer families with cultivable land.',
    eligibility_hi: 'सभी छोटे व सीमांत किसान परिवार जिनके पास कृषि योग्य भूमि है।',
    actionUrl: 'https://pmkisan.gov.in'
  },
  {
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    title_hi: 'प्रधानमंत्री फसल बीमा योजना (PMFBY)',
    benefit: 'Comprehensive crop insurance against weather, drought, pests at only 2% premium',
    benefit_hi: 'प्राकृतिक आपदा, कीट व बीमारी से फसल नुकसान पर व्यापक बीमा (मात्र 1.5% - 2% प्रीमियम)',
    eligibility: 'All farmers cultivating notified crops in notified areas.',
    eligibility_hi: 'अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले सभी किसान।',
    actionUrl: 'https://pmfby.gov.in'
  },
  {
    title: 'PM-KUSUM Solar Irrigation Pump Subsidy',
    title_hi: 'पीएम-कुसुम सोलर पंप योजना (60% सब्सिडी)',
    benefit: '60% government subsidy for installing standalone off-grid solar agriculture pumps',
    benefit_hi: 'खेत में सोलर सिंचाई पंप लगाने पर केंद्र व राज्य सरकार द्वारा 60% तक सब्सिडी',
    eligibility: 'Farmers, farmer groups, cooperatives with agricultural land.',
    eligibility_hi: 'कृषि भूमि वाले किसान, कृषक उत्पादक संगठन (FPO) व सहकारी समितियां।',
    actionUrl: 'https://pmkusum.mnre.gov.in'
  },
  {
    title: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    title_hi: 'कृषि यंत्रीकरण उप-मिशन (ट्रैक्टर व कृषि यंत्र सब्सिडी)',
    benefit: '40% to 50% subsidy on procurement of tractors, rotavators, seed drills & sprayers',
    benefit_hi: 'ट्रैक्टर, रोटावेटर, रीपर व स्प्रेयर खरीदने पर 40% से 50% तक की आर्थिक छूट',
    eligibility: 'Individual farmers, custom hiring centers, women and small farmers.',
    eligibility_hi: 'व्यक्तिगत किसान, कस्टम हायरिंग केंद्र, महिला किसान व लघु/सीमांत किसान।',
    actionUrl: 'https://agrimachinery.nic.in'
  }
];

export const CalculatorPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<string>('Soybean');
  const [area, setArea] = useState<number>(2.5);
  const [unit, setUnit] = useState<'acre' | 'bigha' | 'hectare'>('acre');
  const [activeTab, setActiveTab] = useState<'calculator' | 'schemes'>('calculator');

  // Normalization to Acres for calculation
  const areaInAcres = unit === 'acre' ? area : unit === 'bigha' ? area * 0.4 : area * 2.471;
  const cropData = CROP_FORMULAS[selectedCrop] || CROP_FORMULAS.Soybean;

  // Fertilizer bags & kg
  const dapBags = Math.round(cropData.dap_bags_per_acre * areaInAcres * 10) / 10;
  const ureaBags = Math.round(cropData.urea_bags_per_acre * areaInAcres * 10) / 10;
  const mopBags = Math.round(cropData.mop_bags_per_acre * areaInAcres * 10) / 10;
  const zincKg = Math.round(cropData.zinc_kg_per_acre * areaInAcres * 10) / 10;
  const seedKg = Math.round(cropData.seed_rate_per_acre * areaInAcres * 10) / 10;

  // Approximate Costs in INR
  const dapCost = Math.round(dapBags * 1350);
  const ureaCost = Math.round(ureaBags * 266);
  const mopCost = Math.round(mopBags * 1700);
  const zincCost = Math.round(zincKg * 95);
  const seedCost = Math.round(seedKg * cropData.seed_cost_per_kg);
  const totalCost = dapCost + ureaCost + mopCost + zincCost + seedCost;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 space-y-8">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-forest-600 block flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-forest-600" />
            <span>{language === 'hi' ? 'ICAR वैज्ञानिक खाद गणना व सरकारी योजनाएं' : 'ICAR Scientific Dosage & Subsidy Portal'}</span>
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900 mt-0.5">
            {language === 'hi' ? 'स्मार्ट किसान कैलकुलेटर एवं योजनाएं' : 'Smart Kisan Calculator & Schemes'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {language === 'hi'
              ? 'जमीन के अनुसार संतुलित खाद (यूरिया, डीएपी, पोटाश), बीज की सही मात्रा व सरकारी योजनाओं की जानकारी'
              : 'Calculate exact scientific fertilizer N-P-K bags, seed quantity, application timeline, and eligible government subsidies'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="bg-forest-100/70 p-1 rounded-xl flex items-center gap-1 border border-forest-200 shrink-0">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'calculator'
                ? 'bg-forest-600 text-white shadow-xs'
                : 'text-forest-800 hover:text-forest-900'
            }`}
          >
            {language === 'hi' ? 'खाद व बीज कैलकुलेटर' : 'Fertilizer Calculator'}
          </button>
          <button
            onClick={() => setActiveTab('schemes')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'schemes'
                ? 'bg-forest-600 text-white shadow-xs'
                : 'text-forest-800 hover:text-forest-900'
            }`}
          >
            {language === 'hi' ? 'सरकारी योजनाएं' : 'Govt Schemes'}
          </button>
        </div>
      </div>

      {activeTab === 'calculator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* INPUT FORM (Left col) */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-forest-200 shadow-card-soft space-y-6">
            <h3 className="font-display font-bold text-base text-forest-900 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-forest-600" />
              <span>{language === 'hi' ? 'खेत व फसल की जानकारी' : 'Farm & Crop Details'}</span>
            </h3>

            {/* Select Crop */}
            <div>
              <label className="text-xs font-bold text-forest-900 block mb-1.5">
                {language === 'hi' ? 'फसल चुनें:' : 'Select Crop:'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(CROP_FORMULAS).map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setSelectedCrop(crop)}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      selectedCrop === crop
                        ? 'bg-forest-600 text-white border-forest-600 shadow-xs'
                        : 'bg-white text-forest-900 border-forest-200 hover:bg-forest-50'
                    }`}
                  >
                    <div>{crop}</div>
                    <div className={`text-[10px] font-normal ${selectedCrop === crop ? 'text-forest-100' : 'text-gray-500'}`}>
                      {CROP_FORMULAS[crop].name_hi}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Area Input & Unit */}
            <div>
              <label className="text-xs font-bold text-forest-900 block mb-1.5">
                {language === 'hi' ? 'खेत का रकबा (Area):' : 'Farm Land Area:'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={area}
                  onChange={(e) => setArea(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                  className="w-1/2 px-4 py-2.5 bg-white border border-forest-200 rounded-xl text-sm font-bold text-forest-900 focus:outline-none focus:border-forest-600 shadow-xs"
                />
                <select
                  value={unit}
                  onChange={(e: any) => setUnit(e.target.value)}
                  className="w-1/2 px-4 py-2.5 bg-white border border-forest-200 rounded-xl text-xs font-bold text-forest-900 focus:outline-none focus:border-forest-600 shadow-xs"
                >
                  <option value="acre">{language === 'hi' ? 'एकड़ (Acre)' : 'Acres'}</option>
                  <option value="bigha">{language === 'hi' ? 'बीघा (Bigha)' : 'Bighas'}</option>
                  <option value="hectare">{language === 'hi' ? 'हेक्टेयर (Hectare)' : 'Hectares'}</option>
                </select>
              </div>
              <span className="text-[11px] text-gray-500 mt-1 block">
                {language === 'hi' 
                  ? `कुल रकबा: लगभग ~${areaInAcres.toFixed(2)} मानक एकड़` 
                  : `Calculated as ~${areaInAcres.toFixed(2)} standard acres`}
              </span>
            </div>

            {/* Recommended Variety Box */}
            <div className="bg-forest-50 p-3.5 rounded-2xl border border-forest-200/80 text-xs">
              <span className="font-bold text-forest-800 block mb-0.5">
                {language === 'hi' ? 'अनुशंसित उन्नत किस्में:' : 'ICAR Recommended Varieties:'}
              </span>
              <p className="text-gray-700 font-medium">
                {cropData.seed_variety}
              </p>
            </div>

            {/* Scientific Note */}
            <div className="flex items-start gap-2 text-[11px] text-gray-500">
              <Info className="w-4 h-4 text-forest-600 shrink-0 mt-0.5" />
              <span>
                {language === 'hi'
                  ? 'भारतीय कृषि अनुसंधान परिषद (ICAR-AICRP) के मृदा उर्वरता मानकों पर आधारित।'
                  : 'Based on ICAR All India Coordinated Research Project (AICRP) soil fertility standards.'}
              </span>
            </div>
          </div>

          {/* OUTPUT RESULTS (Right col) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Primary Recommendation Grid */}
            <div className="glass-panel p-6 rounded-3xl border border-forest-200 shadow-card-soft space-y-5">
              <div className="flex items-center justify-between border-b border-forest-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forest-600">
                    {language === 'hi'
                      ? `${area} ${unit === 'acre' ? 'एकड़' : unit === 'bigha' ? 'बीघा' : 'हेक्टेयर'} (${cropData.name_hi}) हेतु अनुशंसित मात्रा`
                      : `Scientific Dosage for ${area} ${unit} (${cropData.name_hi})`}
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-forest-900">
                    {language === 'hi' ? 'खाद व बीज की सटीक जरूरत' : 'Total Fertilizer & Seed Requirement'}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 block">
                    {language === 'hi' ? 'अनुमानित लागत' : 'Estimated Cost'}
                  </span>
                  <span className="font-extrabold text-forest-900 text-lg">
                    ₹{totalCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Requirement Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* DAP */}
                <div className="bg-white p-3.5 rounded-2xl border border-forest-100 shadow-2xs">
                  <span className="text-[10px] font-bold text-gray-500 uppercase block">D.A.P. (18-46-0)</span>
                  <div className="font-display font-extrabold text-xl text-forest-900 mt-1">
                    {dapBags} <span className="text-xs font-normal text-gray-600">बोरी (Bags)</span>
                  </div>
                  <span className="text-[10px] text-gray-500">~{(dapBags * 50).toFixed(0)} kg (₹{dapCost})</span>
                </div>

                {/* Urea */}
                <div className="bg-white p-3.5 rounded-2xl border border-forest-100 shadow-2xs">
                  <span className="text-[10px] font-bold text-gray-500 uppercase block">यूरिया (Urea 46% N)</span>
                  <div className="font-display font-extrabold text-xl text-forest-900 mt-1">
                    {ureaBags} <span className="text-xs font-normal text-gray-600">बोरी (Bags)</span>
                  </div>
                  <span className="text-[10px] text-gray-500">~{(ureaBags * 45).toFixed(0)} kg (₹{ureaCost})</span>
                </div>

                {/* MOP (Potash) */}
                <div className="bg-white p-3.5 rounded-2xl border border-forest-100 shadow-2xs">
                  <span className="text-[10px] font-bold text-gray-500 uppercase block">पोटाश (MOP 60%)</span>
                  <div className="font-display font-extrabold text-xl text-forest-900 mt-1">
                    {mopBags} <span className="text-xs font-normal text-gray-600">बोरी (Bags)</span>
                  </div>
                  <span className="text-[10px] text-gray-500">~{(mopBags * 50).toFixed(0)} kg (₹{mopCost})</span>
                </div>

                {/* Seed */}
                <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block">प्रमाणित बीज (Seed)</span>
                  <div className="font-display font-extrabold text-xl text-emerald-950 mt-1">
                    {seedKg} <span className="text-xs font-normal text-emerald-800">किग्रा (kg)</span>
                  </div>
                  <span className="text-[10px] text-emerald-700">₹{seedCost.toLocaleString('en-IN')} Est.</span>
                </div>
              </div>

              {/* Zinc Micro-nutrient Note */}
              <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span><strong>जिंक सल्फेट (Zinc Sulphate):</strong> {zincKg} kg आवश्यक (मृदा उर्वरता हेतु)</span>
                </div>
                <span className="font-bold">~₹{zincCost}</span>
              </div>
            </div>

            {/* 2. Step-by-Step Application Timeline */}
            <div className="glass-panel p-6 rounded-3xl border border-forest-200 shadow-card-soft space-y-4">
              <h4 className="font-display font-bold text-sm text-forest-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest-600" />
                <span>{language === 'hi' ? 'खाद कब और कैसे डालें? (समय सारणी)' : 'When & How to Apply (Nutrient Schedule)'}</span>
              </h4>

              <div className="space-y-3">
                {cropData.stages.map((stage, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white border border-forest-100 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-forest-100 text-forest-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-xs text-forest-900">
                          {language === 'hi' ? stage.stage_hi : stage.stage}
                        </h5>
                        <span className="text-[10px] font-semibold text-forest-700 bg-forest-50 px-2 py-0.5 rounded-full border border-forest-200">
                          {stage.timing}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                        {language === 'hi' ? stage.instructions_hi : stage.instructions}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* GOVT SCHEMES TAB */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {GOVT_SCHEMES.map((scheme, idx) => (
              <div 
                key={idx}
                className="glass-panel p-6 rounded-3xl border border-forest-100 hover:border-forest-300 hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-700 shrink-0">
                      <Landmark className="w-5 h-5 text-forest-600" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {language === 'hi' ? 'प्रत्यक्ष सरकारी सब्सिडी' : 'Direct Subsidy'}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-forest-900 mb-1">
                    {language === 'hi' ? scheme.title_hi : scheme.title}
                  </h3>

                  <div className="bg-forest-50/80 p-3 rounded-xl border border-forest-100 my-3 text-xs">
                    <span className="font-bold text-forest-800 block mb-0.5">
                      {language === 'hi' ? 'लाभ (Financial Benefit):' : 'Benefit:'}
                    </span>
                    <p className="text-forest-900 font-semibold leading-relaxed">
                      {language === 'hi' ? scheme.benefit_hi : scheme.benefit}
                    </p>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1">
                    <span className="font-bold text-gray-700 block">
                      {language === 'hi' ? 'पात्रता (Eligibility):' : 'Eligibility:'}
                    </span>
                    <p className="text-[11px] leading-relaxed">
                      {language === 'hi' ? scheme.eligibility_hi : scheme.eligibility}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-forest-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">
                    {language === 'hi' ? 'आधिकारिक पोर्टल' : 'Official Portal'}
                  </span>
                  <a
                    href={scheme.actionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-600 text-white text-xs font-bold hover:bg-forest-700 transition-colors"
                  >
                    <span>{language === 'hi' ? 'आवेदन करें' : 'Apply Online'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
