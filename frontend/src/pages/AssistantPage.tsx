import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, ExternalLink, HelpCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import { ChatMessage } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { VoiceButton, SpeechPlayer } from '../components/VoiceButton';

export const AssistantPage: React.FC = () => {
  const { t, language } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      session_id: 1,
      sender: 'assistant',
      text: language === 'hi'
        ? 'नमस्ते! मैं आपका एग्रीसाथी (AgriSathi) कृषि सहायक हूँ। आप अपनी फसल के बारे में बोलकर या लिखकर प्रश्न पूछ सकते हैं।'
        : 'Hello! I am your AgriSathi agricultural companion. You can ask crop care questions by voice or text in English or Hindi.',
      sources: [
        {
          title: 'ICAR Agromet Advisory Portal',
          organization: 'ICAR - Indian Council of Agricultural Research',
          url: 'https://icar.org.in'
        }
      ],
      suggested_followups: language === 'hi'
        ? [
            'पत्तियां पीली क्यों पड़ रही हैं?',
            'भारी बारिश के बाद क्या करें?',
            'टमाटर में अगेती झुलसा की रोकथाम'
          ]
        : [
            'Why are my leaves turning yellow?',
            'What should I do after heavy rain?',
            'How to prevent tomato early blight?'
          ],
      created_at: new Date().toISOString()
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      session_id: 1,
      sender: 'user',
      text: query.trim(),
      created_at: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsProcessing(true);

    try {
      const response = await api.sendMessage(query.trim(), language, 1);
      setMessages((prev) => [...prev, response]);
    } catch (e) {
      console.error('Chat error:', e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 flex flex-col h-[calc(100vh-5rem)]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-forest-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-forest-600 text-white flex items-center justify-center shadow-md shadow-forest-600/20">
            <Bot className="w-5 h-5 text-leaf-light" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-forest-900">
              {t('assistantTitle')}
            </h1>
            <p className="text-xs text-gray-500">
              {t('assistantSubtitle')} • ICAR RAG Grounded
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-forest-700 bg-forest-50 px-2.5 py-1 rounded-full border border-forest-200">
            {language === 'hi' ? 'हिन्दी मोड' : 'English Mode'}
          </span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-1">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-forest-700 text-white'
                    : 'bg-leaf-dark text-white shadow-xs'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-leaf-light" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 shadow-xs text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-forest-600 text-white rounded-tr-xs'
                    : 'glass-panel text-gray-800 rounded-tl-xs border border-forest-100'
                }`}
              >
                {/* Message Text with markdown line breaks */}
                <div className="whitespace-pre-line space-y-2">
                  {msg.text}
                </div>

                {/* Voice Readout Player (for Assistant) */}
                {!isUser && (
                  <div className="mt-3 pt-2.5 border-t border-forest-100/60 flex items-center justify-between">
                    <SpeechPlayer text={msg.text} />
                    <span className="text-[10px] text-gray-400">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}

                {/* Grounded RAG Citations */}
                {!isUser && msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-forest-100/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700 block mb-1">
                      {t('sourcesTitle')}
                    </span>
                    <div className="space-y-1">
                      {msg.sources.map((src, idx) => (
                        <a
                          key={idx}
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-forest-700 hover:text-forest-900 bg-forest-50 px-2 py-0.5 rounded border border-forest-200 mr-1.5"
                        >
                          <BookOpen className="w-3 h-3 text-forest-600" />
                          <span>{src.title}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-gray-400" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Smart Follow-up Prompts */}
                {!isUser && msg.suggested_followups && msg.suggested_followups.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-forest-100/60">
                    <span className="text-[10px] font-bold text-gray-500 block mb-1.5">
                      Suggested follow-ups:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggested_followups.map((chip, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(chip)}
                          className="text-[11px] font-medium text-forest-800 bg-white hover:bg-forest-50 border border-forest-200 px-2.5 py-1 rounded-full transition-colors text-left"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}

        {isProcessing && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-leaf-dark text-white flex items-center justify-center text-xs">
              <Bot className="w-4 h-4 text-leaf-light" />
            </div>
            <div className="glass-panel p-3.5 rounded-2xl rounded-tl-xs border border-forest-100 text-xs text-forest-700 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-forest-600" />
              <span>Retrieving agricultural knowledge & preparing advice...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions Bar */}
      <div className="pb-3 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
        <span className="text-[11px] font-semibold text-gray-400 shrink-0">
          Try asking:
        </span>
        {(language === 'hi' ? [
          'पत्तियों का पीला पड़ना कैसे रोकें?',
          'टमाटर के अर्ली ब्लाइट का जैविक उपचार',
          'धान में झोंका (ब्लास्ट) रोग से बचाव'
        ] : [
          'Why are leaves turning yellow?',
          'Organic remedy for early blight',
          'Rice blast treatment options'
        ]).map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="text-xs text-forest-800 bg-forest-50/80 hover:bg-forest-100 border border-forest-200/80 px-3 py-1 rounded-full shrink-0 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Bar & Large Voice Button Container */}
      <div className="glass-panel p-3 rounded-2xl border border-forest-200 shadow-md flex items-center gap-3 shrink-0">
        
        {/* Large Accessible Microphone */}
        <div className="shrink-0">
          <VoiceButton
            onTranscript={(transcript) => handleSendMessage(transcript)}
            isProcessing={isProcessing}
          />
        </div>

        {/* Text Input */}
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder={t('typeQuestionPlaceholder')}
          className="flex-1 bg-transparent border-0 focus:outline-none text-xs sm:text-sm text-forest-900 placeholder:text-gray-400 px-2"
        />

        {/* Send Button */}
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isProcessing}
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
            inputText.trim() && !isProcessing
              ? 'bg-forest-600 text-white shadow-md hover:bg-forest-700 active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>

      </div>

    </div>
  );
};
