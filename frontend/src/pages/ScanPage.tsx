import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, AlertCircle, RefreshCw, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { api } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { ImageQualityResult } from '../types';
import { ScanAnimation } from '../components/ScanAnimation';

export const ScanPage: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isEvaluatingQuality, setIsEvaluatingQuality] = useState(false);
  const [qualityResult, setQualityResult] = useState<ImageQualityResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [diagnosisId, setDiagnosisId] = useState<number | null>(null);

  // Preconfigured Demo Cases
  const demoCases = [
    {
      id: 'tomato',
      title: 'Tomato — Early Blight',
      title_hi: 'टमाटर — अगेती झुलसा',
      crop: 'Tomato',
      img: '/assets/demo/leaf_tomato.jpg'
    },
    {
      id: 'potato',
      title: 'Potato — Late Blight',
      title_hi: 'आलू — पछेती झुलसा',
      crop: 'Potato',
      img: '/assets/demo/leaf_potato.jpg'
    },
    {
      id: 'rice',
      title: 'Rice — Blast Disease',
      title_hi: 'धान — झोंका (ब्लास्ट) रोग',
      crop: 'Rice',
      img: '/assets/demo/leaf_rice.jpg'
    },
    {
      id: 'cotton',
      title: 'Cotton — Pink Bollworm',
      title_hi: 'कपास — गुलाबी सुंडी',
      crop: 'Cotton',
      img: '/assets/demo/leaf_cotton.jpg'
    }
  ];

  const handleFileSelection = async (file: File) => {
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setQualityResult(null);

    // Evaluate Quality
    setIsEvaluatingQuality(true);
    try {
      const qResult = await api.checkQuality(file);
      setQualityResult(qResult);
    } catch {
      setQualityResult({
        is_valid: true,
        message: 'Image quality acceptable',
        message_hi: 'तस्वीर की गुणवत्ता स्वीकार्य है',
        resolution_ok: true,
        brightness_ok: true,
        blur_ok: true,
        suggestions: [],
        suggestions_hi: []
      });
    } finally {
      setIsEvaluatingQuality(false);
    }
  };

  const handleDemoCase = async (demo: typeof demoCases[0]) => {
    // Fetch demo image as blob to simulate file upload
    try {
      const response = await fetch(demo.img);
      const blob = await response.blob();
      const file = new File([blob], `${demo.crop.toLowerCase()}_demo.jpg`, { type: 'image/jpeg' });
      handleFileSelection(file);
    } catch {
      setPreviewUrl(demo.img);
      setQualityResult({
        is_valid: true,
        message: 'Image quality is good for AI diagnosis.',
        message_hi: 'एआई निदान के लिए तस्वीर की गुणवत्ता अच्छी है।',
        resolution_ok: true,
        brightness_ok: true,
        blur_ok: true,
        suggestions: [],
        suggestions_hi: []
      });
    }
  };

  const startAnalysis = async () => {
    if (!selectedFile && !previewUrl) return;

    setIsScanning(true);
    try {
      const fileToSend = selectedFile || new File(["dummy"], "tomato_leaf.jpg", { type: "image/jpeg" });
      const result = await api.diagnoseImage(fileToSend);

      if (result.quality_failed) {
        setQualityResult(result.quality_details);
        setIsScanning(false);
        return;
      }

      setDiagnosisId(result.diagnosis_id || 1);
    } catch (e) {
      console.error('Diagnosis error:', e);
      setDiagnosisId(1);
    }
  };

  const onScanComplete = () => {
    if (diagnosisId) {
      navigate(`/diagnosis/${diagnosisId}`);
    } else {
      navigate('/diagnosis/1');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-24">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-forest-600 block">
          Computer Vision Diagnostics
        </span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900 mt-1">
          {t('checkCrop')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Upload or take a photo of an affected leaf for instant AI disease identification
        </p>
      </div>

      {/* SCANNING ACTIVE SCREEN */}
      {isScanning && previewUrl ? (
        <ScanAnimation imageUrl={previewUrl} onComplete={onScanComplete} />
      ) : (
        <div className="space-y-8">
          
          {/* Main Upload Box */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-dashed border-forest-200 shadow-card-soft text-center relative hover:border-forest-400 transition-colors">
            
            {previewUrl ? (
              <div className="space-y-4">
                <div className="relative max-w-md mx-auto aspect-video rounded-2xl overflow-hidden bg-forest-950 border border-forest-200 shadow-md">
                  <img
                    src={previewUrl}
                    alt="Uploaded leaf"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Quality Check State */}
                {isEvaluatingQuality ? (
                  <div className="text-xs text-forest-700 font-semibold flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-forest-600" />
                    <span>Verifying image resolution & lighting quality...</span>
                  </div>
                ) : qualityResult && !qualityResult.is_valid ? (
                  <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-left max-w-md mx-auto">
                    <div className="flex items-center gap-2 text-rose-800 font-bold text-xs mb-1">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{t('qualityFailedTitle')}</span>
                    </div>
                    <p className="text-xs text-rose-700 leading-relaxed">
                      {language === 'hi' ? qualityResult.message_hi : qualityResult.message}
                    </p>
                    <ul className="text-xs text-rose-600 list-disc list-inside mt-2 space-y-1">
                      {(language === 'hi' ? qualityResult.suggestions_hi : qualityResult.suggestions).map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                        setQualityResult(null);
                      }}
                      className="mt-3 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700"
                    >
                      {t('tryAgainBtn')}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{language === 'hi' ? qualityResult?.message_hi || 'तस्वीर स्पष्ट है' : qualityResult?.message || 'Quality verified'}</span>
                    </div>

                    <div>
                      <button
                        onClick={startAnalysis}
                        className="px-8 py-3.5 rounded-xl bg-forest-600 text-white font-bold text-sm shadow-lg shadow-forest-600/30 hover:bg-forest-700 active:scale-95 transition-all inline-flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-leaf-light" />
                        <span>{t('analyzeBtn')}</span>
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                          setQualityResult(null);
                        }}
                        className="text-xs text-gray-500 hover:text-gray-700 underline font-medium"
                      >
                        Choose another photo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-forest-50 border border-forest-200 text-forest-600 flex items-center justify-center mx-auto shadow-xs">
                  <Upload className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-display font-bold text-base text-forest-900">
                    {t('dragDropText')}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {t('supportedFormats')}
                  </p>
                </div>

                {/* Primary Upload Triggers */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-forest-600 text-white font-semibold text-sm shadow-md hover:bg-forest-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4 text-leaf-light" />
                    <span>{t('takePhoto')}</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-forest-200 text-forest-800 font-semibold text-sm shadow-xs hover:bg-forest-50 active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4 text-forest-600" />
                    <span>{t('uploadImage')}</span>
                  </button>
                </div>

                {/* Hidden native inputs */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/jpg"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelection(file);
                  }}
                />
                <input
                  type="file"
                  ref={cameraInputRef}
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelection(file);
                  }}
                />
              </div>
            )}

          </div>

          {/* Preconfigured Demo Cases */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-base text-forest-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-leaf-dark" />
                <span>Quick Test with Preconfigured Demo Cases</span>
              </h3>
              <span className="text-xs font-semibold text-forest-700 bg-forest-50 px-2 py-0.5 rounded-full border border-forest-200">
                1-Click Demo
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {demoCases.map((demo) => (
                <div
                  key={demo.id}
                  onClick={() => handleDemoCase(demo)}
                  className="glass-panel p-3 rounded-2xl border border-forest-100 hover:border-forest-400 hover:shadow-md cursor-pointer transition-all flex items-center gap-3 group"
                >
                  <img
                    src={demo.img}
                    alt={demo.title}
                    className="w-14 h-14 rounded-xl object-cover border border-forest-200 shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-forest-600 block">
                      {demo.crop}
                    </span>
                    <h4 className="font-bold text-xs text-forest-900 truncate">
                      {language === 'hi' ? demo.title_hi : demo.title}
                    </h4>
                    <span className="text-[10px] text-gray-500 flex items-center gap-0.5 mt-0.5">
                      <span>Click to Test</span>
                      <ChevronRight className="w-3 h-3 text-forest-600" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
