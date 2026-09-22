import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  onTranscript: (text: string) => void;
  isProcessing?: boolean;
}

export const VoiceButton: React.FC<Props> = ({ onTranscript, isProcessing = false }) => {
  const { language, t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check Web Speech API availability
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        if (transcript) {
          onTranscript(transcript);
        }
      };

      rec.onerror = (e: any) => {
        console.warn('Speech recognition error/fallback:', e);
        setIsListening(false);
        // Fallback demo voice prompt
        const demoPrompt = language === 'hi'
          ? 'टमाटर की पत्तियों पर भूरे छल्लेदार धब्बे क्यों आ रहे हैं?'
          : 'Why are there circular brown spots on my tomato leaves?';
        onTranscript(demoPrompt);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    }
  }, [language]);

  const toggleListening = () => {
    if (isListening) {
      if (recognition) recognition.stop();
      setIsListening(false);
    } else {
      if (recognition) {
        try {
          recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
          recognition.start();
        } catch {
          // If already running or permission issue, trigger demo question
          setIsListening(true);
          setTimeout(() => {
            setIsListening(false);
            const demoPrompt = language === 'hi'
              ? 'टमाटर की पत्तियों पर भूरे छल्लेदार धब्बे क्यों आ रहे हैं?'
              : 'Why are there circular brown spots on my tomato leaves?';
            onTranscript(demoPrompt);
          }, 2000);
        }
      } else {
        // Fallback for browsers without Web Speech
        setIsListening(true);
        setTimeout(() => {
          setIsListening(false);
          const demoPrompt = language === 'hi'
            ? 'टमाटर की पत्तियों पर भूरे छल्लेदार धब्बे क्यों आ रहे हैं?'
            : 'Why are there circular brown spots on my tomato leaves?';
          onTranscript(demoPrompt);
        }, 1800);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Audio Waveform visualization during listening */}
      {isListening && (
        <div className="flex items-center gap-1.5 h-8 mb-3">
          <div className="w-1 bg-forest-500 rounded-full wave-bar" />
          <div className="w-1 bg-leaf-light rounded-full wave-bar" />
          <div className="w-1.5 bg-forest-600 rounded-full wave-bar" />
          <div className="w-1 bg-leaf-light rounded-full wave-bar" />
          <div className="w-1 bg-forest-500 rounded-full wave-bar" />
        </div>
      )}

      {/* Main Touch-Friendly Mic Button */}
      <button
        onClick={toggleListening}
        disabled={isProcessing}
        className={`relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 shadow-md ${
          isListening
            ? 'bg-rose-600 text-white shadow-rose-500/40 ring-4 ring-rose-200 animate-pulse'
            : isProcessing
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-forest-600 text-white hover:bg-forest-700 hover:shadow-forest-600/40 active:scale-95'
        }`}
        aria-label={isListening ? t('listening') : t('tapToSpeak')}
      >
        {isProcessing ? (
          <Loader2 className="w-7 h-7 animate-spin" />
        ) : isListening ? (
          <MicOff className="w-7 h-7" />
        ) : (
          <Mic className="w-7 h-7" />
        )}
      </button>

      {/* State Label */}
      <span className="text-xs font-semibold text-forest-800 mt-2">
        {isProcessing
          ? t('processingVoice')
          : isListening
          ? t('listening')
          : t('tapToSpeak')}
      </span>
    </div>
  );
};

// Text-to-speech speaker button for assistant answers
export const SpeechPlayer: React.FC<{ text: string }> = ({ text }) => {
  const { language, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={speak}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
        isPlaying
          ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
          : 'bg-white text-forest-700 border-forest-200 hover:bg-forest-50'
      }`}
      title={isPlaying ? t('stopVoice') : t('listenVoice')}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-rose-600" />
          <span>{t('stopVoice')}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-forest-600" />
          <span>{t('listenVoice')}</span>
        </>
      )}
    </button>
  );
};
