import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Search, Filter, AlertCircle, 
  MapPin, Bell, Sparkles, ArrowUpRight, Scale, CheckCircle2, ChevronRight, BarChart3
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MandiRecord {
  id: string;
  crop: string;
  crop_hi: string;
  variety: string;
  mandi: string;
  mandi_hi: string;
  state: string;
  min_price: number;
  max_price: number;
  modal_price: number;
  msp: number;
  trend: 'up' | 'down' | 'steady';
  trend_value: number;
  arrival_tonnes: number;
  updated_at: string;
  ai_advisory: string;
  ai_advisory_hi: string;
  recommendation: 'SELL' | 'HOLD' | 'WATCH';
}

const MANDI_DATA: MandiRecord[] = [
  {
    id: '1',
    crop: 'Soybean',
    crop_hi: 'सोयाबीन',
    variety: 'Yellow (JS 20-34 / Pusa 9712)',
    mandi: 'Indore Mandi (APMC)',
    mandi_hi: 'इंदौर मंडी (मध्य प्रदेश)',
    state: 'Madhya Pradesh',
    min_price: 4650,
    max_price: 5120,
    modal_price: 4940,
    msp: 4892,
    trend: 'up',
    trend_value: 85,
    arrival_tonnes: 1450,
    updated_at: 'Today, 11:30 AM',
    ai_advisory: 'Strong export crushing demand and lower arrivals supporting prices. Expected to touch ₹5,150 this week.',
    ai_advisory_hi: 'सोयाबीन मील की मजबूत निर्यात मांग व कम आवक से तेजी बनी हुई है। इस सप्ताह ₹5,150 तक भाव संभव।',
    recommendation: 'HOLD'
  },
  {
    id: '2',
    crop: 'Soybean',
    crop_hi: 'सोयाबीन',
    variety: 'Standard Graded',
    mandi: 'Neemuch Mandi',
    mandi_hi: 'नीमच मंडी (मध्य प्रदेश)',
    state: 'Madhya Pradesh',
    min_price: 4720,
    max_price: 5180,
    modal_price: 4980,
    msp: 4892,
    trend: 'up',
    trend_value: 110,
    arrival_tonnes: 1120,
    updated_at: 'Today, 10:45 AM',
    ai_advisory: 'Quality premium being paid for low moisture (<10%) clean grain lots.',
    ai_advisory_hi: '10% से कम नमी वाले साफ माल पर व्यापारियों द्वारा प्रीमियम भाव दिया जा रहा है।',
    recommendation: 'HOLD'
  },
  {
    id: '3',
    crop: 'Soybean',
    crop_hi: 'सोयाबीन',
    variety: 'Standard Commercial',
    mandi: 'Latur APMC',
    mandi_hi: 'लातूर मंडी (महाराष्ट्र)',
    state: 'Maharashtra',
    min_price: 4680,
    max_price: 5090,
    modal_price: 4920,
    msp: 4892,
    trend: 'up',
    trend_value: 65,
    arrival_tonnes: 1850,
    updated_at: 'Today, 12:15 PM',
    ai_advisory: 'Steady buying by local solvent extraction plants.',
    ai_advisory_hi: 'ऑयल मिलों द्वारा निरंतर लिवाली, भाव स्थिरता के साथ मजबूत।',
    recommendation: 'HOLD'
  },
  {
    id: '4',
    crop: 'Wheat',
    crop_hi: 'गेहूं',
    variety: 'Sharbati (Grade A)',
    mandi: 'Sehore Mandi',
    mandi_hi: 'सीहोर मंडी (मध्य प्रदेश)',
    state: 'Madhya Pradesh',
    min_price: 2850,
    max_price: 3350,
    modal_price: 3120,
    msp: 2275,
    trend: 'up',
    trend_value: 40,
    arrival_tonnes: 820,
    updated_at: 'Today, 01:00 PM',
    ai_advisory: 'High domestic mill demand for premium MP Sharbati wheat, selling well above MSP (+37%).',
    ai_advisory_hi: 'शरबती गेहूं की घरेलू मांग तेज, समर्थन मूल्य (MSP) से ₹845 प्रति क्विंटल ऊपर बिक रहा है।',
    recommendation: 'SELL'
  },
  {
    id: '5',
    crop: 'Mustard',
    crop_hi: 'सरसों / राई',
    variety: '42% Oil Content Condition',
    mandi: 'Bharatpur Mandi',
    mandi_hi: 'भरतपुर मंडी (राजस्थान)',
    state: 'Rajasthan',
    min_price: 5400,
    max_price: 5850,
    modal_price: 5680,
    msp: 5650,
    trend: 'down',
    trend_value: 35,
    arrival_tonnes: 650,
    updated_at: 'Today, 11:15 AM',
    ai_advisory: 'Mild profit booking in edible oils; maintain stock if oil percentage is above 41%.',
    ai_advisory_hi: 'खाद्य तेलों में मामूली नरमी, 41% से अधिक तेल वाले माल को कुछ दिन रोक सकते हैं।',
    recommendation: 'WATCH'
  },
  {
    id: '6',
    crop: 'Cotton',
    crop_hi: 'कपास (नरमा)',
    variety: 'Long Staple (29mm+)',
    mandi: 'Rajkot APMC',
    mandi_hi: 'राजकोट मंडी (गुजरात)',
    state: 'Gujarat',
    min_price: 6900,
    max_price: 7650,
    modal_price: 7380,
    msp: 7121,
    trend: 'up',
    trend_value: 95,
    arrival_tonnes: 940,
    updated_at: 'Today, 10:30 AM',
    ai_advisory: 'Spinning mills showing good demand for clean contamination-free cotton.',
    ai_advisory_hi: 'सूत मिलों की मांग से कपास भाव एमएसपी से ऊपर बने हुए हैं।',
    recommendation: 'SELL'
  },
  {
    id: '7',
    crop: 'Chana',
    crop_hi: 'चना (देसी)',
    variety: 'Desi Bold / Chana Kanta',
    mandi: 'Bikaner Mandi',
    mandi_hi: 'बीकानेर मंडी (राजस्थान)',
    state: 'Rajasthan',
    min_price: 5750,
    max_price: 6250,
    modal_price: 6020,
    msp: 5440,
    trend: 'up',
    trend_value: 50,
    arrival_tonnes: 540,
    updated_at: 'Today, 11:00 AM',
    ai_advisory: 'Festival pulse demand keeps market firm (+10.6% over MSP).',
    ai_advisory_hi: 'त्योहारी मांग से चना एमएसपी से ₹580 प्रति क्विंटल ऊपर बिक रहा है।',
    recommendation: 'SELL'
  },
  {
    id: '8',
    crop: 'Tomato',
    crop_hi: 'टमाटर',
    variety: 'Hybrid Red / Desi',
    mandi: 'Kolar Mandi',
    mandi_hi: 'कोलार मंडी (कर्नाटक)',
    state: 'Karnataka',
    min_price: 1300,
    max_price: 1950,
    modal_price: 1650,
    msp: 0,
    trend: 'up',
    trend_value: 120,
    arrival_tonnes: 2100,
    updated_at: 'Today, 09:30 AM',
    ai_advisory: 'Supplies tight in southern markets, crate prices rising. Sell mature fruit immediately.',
    ai_advisory_hi: 'दक्षिण भारत की मंडियों में आवक कम होने से क्रेट के भावों में तेजी, पके फल तुरंत बेचें।',
    recommendation: 'SELL'
  }
];

export const MandiPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [alertSetCrop, setAlertSetCrop] = useState<string | null>(null);

  const crops = ['All', 'Soybean', 'Wheat', 'Mustard', 'Cotton', 'Chana', 'Tomato'];

  const filtered = MANDI_DATA.filter((item) => {
    const matchesCrop = selectedCrop === 'All' || item.crop.toLowerCase() === selectedCrop.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesQuery = 
      item.crop.toLowerCase().includes(query) ||
      item.crop_hi.includes(query) ||
      item.mandi.toLowerCase().includes(query) ||
      item.mandi_hi.includes(query) ||
      item.state.toLowerCase().includes(query);
    return matchesCrop && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 space-y-8">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-forest-600 block flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-forest-600" />
            <span>{language === 'hi' ? 'कृषि उपज मंडी लाइव रिपोर्ट' : 'APMC Real-time Market Intelligence'}</span>
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900 mt-0.5">
            {language === 'hi' ? 'लाइव मंडी भाव एवं बाजार विश्लेषण' : 'Live Mandi Bhav & Market Rates'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {language === 'hi'
              ? 'प्रमुख भारतीय मंडियों के दैनिक भाव, एमएसपी तुलना एवं एआई बिक्री परामर्श'
              : 'Daily verified auction prices across top Indian APMC mandis with MSP comparison and AI Sell/Hold advice'}
          </p>
        </div>

        {/* Quick Ticker Badge */}
        <div className="glass-panel px-4 py-2.5 rounded-2xl border border-forest-200 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-xs">
            <span className="text-gray-500 block">{language === 'hi' ? 'लाइव एपीएमसी आवक:' : 'Live APMC Feeds:'}</span>
            <span className="font-bold text-forest-900">{language === 'hi' ? '8 मंडियों की लाइव आवक रिपोर्ट' : '8 Mandis Reporting Today'}</span>
          </div>
        </div>
      </div>

      {/* 2. Top Summary Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-forest-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-700 shrink-0">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <span className="text-xs text-gray-500">{language === 'hi' ? 'आज की सबसे तेज बढ़त' : 'Highest Gainer Today'}</span>
            <h4 className="font-bold text-sm text-forest-900">{language === 'hi' ? 'सोयाबीन (नीमच मंडी)' : 'Soybean (Neemuch APMC)'}</h4>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              ₹4,980/Qtl (+₹110 / 2.2%)
            </span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-forest-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-700 shrink-0">
            <Scale className="w-6 h-6 text-forest-600" />
          </div>
          <div>
            <span className="text-xs text-gray-500">{language === 'hi' ? 'सरकारी न्यूनतम समर्थन मूल्य' : 'Official Govt MSP'}</span>
            <h4 className="font-bold text-sm text-forest-900">{language === 'hi' ? 'सोयाबीन: ₹4,892 / क्विंटल' : 'Soybean: ₹4,892 / Qtl'}</h4>
            <span className="text-xs font-semibold text-emerald-700">{language === 'hi' ? 'बाजार भाव एमएसपी से +₹88 ऊपर' : 'Market Trading +₹88 above MSP'}</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-forest-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-700 shrink-0">
            <Sparkles className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <span className="text-xs text-gray-500">{language === 'hi' ? 'एआई बिक्री परामर्श' : 'AI Selling Recommendation'}</span>
            <h4 className="font-bold text-sm text-forest-900">{language === 'hi' ? 'सोयाबीन रोकें, गेहूं बेचें' : 'Hold Soybean, Sell Wheat'}</h4>
            <span className="text-xs text-gray-600">{language === 'hi' ? 'तिलहन की निर्यात मांग में तेजी' : 'Export demand rising for oilseeds'}</span>
          </div>
        </div>
      </div>

      {/* 3. Filters and Search */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'फसल, मंडी या राज्य खोजें (उदा. सोयाबीन, इंदौर)...' : 'Search crop, mandi, or state (e.g. Soybean, Indore)...'}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-forest-200 rounded-xl focus:outline-none focus:border-forest-500 shadow-xs"
            />
          </div>

          {/* Crop Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {crops.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCrop(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCrop === c
                    ? 'bg-forest-600 text-white shadow-sm'
                    : 'bg-white text-forest-800 hover:bg-forest-50 border border-forest-200'
                }`}
              >
                {c === 'All' ? (language === 'hi' ? 'सभी फसलें' : 'All Crops') : c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Mandi Rates Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div 
            key={item.id}
            className="glass-panel p-5 rounded-2xl border border-forest-100 hover:border-forest-300 hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header row */}
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-forest-600">
                    {item.crop} • {language === 'hi' ? item.crop_hi : ''}
                  </span>
                  <h3 className="font-bold text-base text-forest-900 leading-tight">
                    {language === 'hi' ? item.mandi_hi : item.mandi}
                  </h3>
                  <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-forest-500 shrink-0" />
                    <span>{item.state} • {item.variety}</span>
                  </p>
                </div>

                {/* AI Advice Badge */}
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shrink-0 ${
                  item.recommendation === 'HOLD'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : item.recommendation === 'SELL'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-blue-100 text-blue-800 border border-blue-300'
                }`}>
                  {item.recommendation === 'HOLD' ? '⏳ HOLD (रोकें)' : item.recommendation === 'SELL' ? '✅ SELL (बेचें)' : '👀 WATCH'}
                </span>
              </div>

              {/* Price Banner */}
              <div className="bg-forest-50/70 p-3.5 rounded-xl border border-forest-100/80 my-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">
                      Modal / Average Price (मॉडल भाव)
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="font-display font-extrabold text-2xl text-forest-900">
                        ₹{item.modal_price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-gray-600">/ क्विंटल</span>
                    </div>
                  </div>

                  {/* Trend Indicator */}
                  <div className={`flex items-center gap-1 text-xs font-bold ${
                    item.trend === 'up' ? 'text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200' : 'text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200'
                  }`}>
                    {item.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    <span>{item.trend === 'up' ? '+' : '-'}₹{item.trend_value}</span>
                  </div>
                </div>

                {/* Min / Max Range */}
                <div className="flex items-center justify-between text-xs text-gray-600 mt-2.5 pt-2 border-t border-forest-200/50">
                  <span>न्यूनतम (Min): <strong className="text-forest-900">₹{item.min_price}</strong></span>
                  <span>अधिकतम (Max): <strong className="text-forest-900">₹{item.max_price}</strong></span>
                </div>
              </div>

              {/* MSP Context */}
              {item.msp > 0 && (
                <div className="text-[11px] flex items-center justify-between px-1 py-1 text-gray-600">
                  <span>Govt MSP (न्यूनतम समर्थन मूल्य):</span>
                  <span className="font-bold text-forest-800">₹{item.msp}/Qtl</span>
                </div>
              )}

              {/* AI Market Insight */}
              <div className="mt-2.5 p-3 rounded-xl bg-white border border-forest-100 text-xs text-forest-900 leading-relaxed">
                <span className="font-bold text-forest-700 flex items-center gap-1 mb-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>{language === 'hi' ? 'एआई बाजार दृष्टिकोण:' : 'AI Market Outlook:'}</span>
                </span>
                <p className="text-[11px] text-gray-700">
                  {language === 'hi' ? item.ai_advisory_hi : item.ai_advisory}
                </p>
              </div>
            </div>

            {/* Action Row */}
            <div className="mt-4 pt-3 border-t border-forest-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-gray-400">
                {language === 'hi' ? item.updated_at.replace('Today', 'आज') : item.updated_at}
              </span>
              <button
                onClick={() => {
                  setAlertSetCrop(item.crop);
                  setTimeout(() => setAlertSetCrop(null), 3000);
                }}
                className="text-xs font-semibold text-forest-700 hover:text-forest-900 flex items-center gap-1 hover:underline"
              >
                {alertSetCrop === item.crop ? (
                  <span className="text-emerald-700 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {language === 'hi' ? 'अलर्ट सक्रिय!' : 'Alert Active!'}
                  </span>
                ) : (
                  <>
                    <Bell className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'भाव अलर्ट लगाएं' : 'Set Rate Alert'}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
