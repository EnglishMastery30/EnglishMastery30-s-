import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Globe, Volume2, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCredits } from '../contexts/CreditsContext';
import { generateContentWithFallback } from '../utils/aiFallback';
import { motion } from 'motion/react';
import { AudioVisualizer } from './AudioVisualizer';

export function AudioTranslator({ isLocked = false }: { isLocked?: boolean }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [translation, setTranslation] = useState('');
  const [volume, setVolume] = useState(0);
  const { targetLanguage } = useLanguage();
  const { apiKeys, consumeCredits, useCustomKeys } = useCredits();
  
  const languageNames: Record<string, string> = {
    en: 'English',
    te: 'Telugu',
    hi: 'Hindi',
    ta: 'Tamil',
    kn: 'Kannada',
    ml: 'Malayalam',
    es: 'Spanish',
    fr: 'French',
    ar: 'Arabic',
    ja: 'Japanese'
  };
  const targetLanguageName = languageNames[targetLanguage] || targetLanguage.toUpperCase();
  
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const transcriptRef = useRef('');

  const isRecordingRef = useRef(false);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
            setTranscript(prev => prev + (prev ? ' ' : '') + finalTranscript);
            transcriptRef.current = transcriptRef.current + (transcriptRef.current ? ' ' : '') + finalTranscript;
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        // Only restart if we still want to be recording
        if (isRecordingRef.current) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                // Ignore if it's already started
            }
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      stopAudioVisualization();
    };
  }, []);

  const startAudioVisualization = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      microphoneRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const updateVolume = () => {
        if (!analyserRef.current) return;
        
        analyserRef.current.getByteFrequencyData(dataArray);
        
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        
        const average = sum / bufferLength;
        setVolume(average / 255); // Normalize to 0-1
        
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };
      
      updateVolume();
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopAudioVisualization = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setVolume(0);
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      stopAudioVisualization();
      setIsRecording(false);
      if (transcriptRef.current) {
          handleTranslate(transcriptRef.current);
      }
    } else {
      setTranscript('');
      transcriptRef.current = '';
      setTranslation('');
      recognitionRef.current.lang = 'en-US'; // Set source language
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.error('Error starting recording:', e);
        }
      }
      startAudioVisualization();
      setIsRecording(true);
    }
  };

  const handleTranslate = async (textToTranslate: string) => {
    if (!textToTranslate) return;
    
    if (!consumeCredits(1, 'Audio Translator AI')) {
      alert('Insufficient credits. Please buy more credits or use your own API key.');
      return;
    }
    
    setIsTranslating(true);
    
    try {
        const apiKey = useCustomKeys && apiKeys.gemini ? apiKeys.gemini : process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("API key is missing.");
        
        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey });
        
        const response = await generateContentWithFallback(ai, {
            model: 'gemini-1.5-flash',
            contents: `Translate the following English text to ${targetLanguageName}. Provide ONLY the translation, nothing else. Text: "${textToTranslate}"`
        });
        
        const translatedText = response.text || `Translation failed`;
        setTranslation(translatedText);
        if (translatedText !== 'Translation failed') {
            synthesizeTranslationWait(translatedText); // Try auto playing
        }
    } catch (error) {
        console.error("Translation error:", error);
        setTranslation("Translation service unavailable.");
    } finally {
        setIsTranslating(false);
    }
  };

  const synthesizeTranslationWait = (textToSpeak: string) => {
    setIsPlaying(true);
    const synthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    let voices = synthesis.getVoices();
    
    if (voices.length === 0) {
      setTimeout(() => {
        voices = synthesis.getVoices();
        const targetVoice = voices.find(v => v.lang.startsWith(targetLanguage));
        
        if (targetVoice) { 
           utterance.voice = targetVoice; 
        } else {
           // Fallback if specific target voice isn't found, try to find any English voice
           const fallbackVoice = voices.find(v => v.lang.startsWith('en'));
           if (fallbackVoice) utterance.voice = fallbackVoice;
        }

        utterance.lang = targetLanguage;
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        synthesis.speak(utterance);
      }, 500); // Increased timeout to ensure voices are loaded
      return;
    }

    const targetVoice = voices.find(v => v.lang.startsWith(targetLanguage));
    if (targetVoice) {
         utterance.voice = targetVoice;
    } else {
         const fallbackVoice = voices.find(v => v.lang.startsWith('en'));
         if (fallbackVoice) utterance.voice = fallbackVoice;
    }
    
    utterance.lang = targetLanguage;
    
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    synthesis.speak(utterance);
  };

  const synthesizeTranslation = () => {
    if (!translation) return;
    synthesizeTranslationWait(translation);
  };


  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm h-full flex flex-col items-center">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Live Voice Translator</h2>
        <p className="text-slate-500 dark:text-slate-400">Speak in English, instantly hear it in your language</p>
      </div>

       <div className="w-full flex-1 max-w-2xl mx-auto flex flex-col justify-center mb-8 relative min-h-[200px]">
         {isRecording ? (
            <div className="absolute inset-0 flex items-center justify-center">
                <AudioVisualizer volume={volume} isConnected={true} />
            </div>
         ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-4">
                    <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Ready to Translate</h3>
                <p className="text-slate-500 max-w-sm">Tap the microphone to start speaking. We'll translate and play it back automatically.</p>
            </div>
         )}
       </div>

       {/* Transcript & Translation Display */}
       <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 h-32 overflow-y-auto relative">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest absolute top-3 left-4">Original (English)</span>
              <p className="mt-6 text-slate-700 dark:text-slate-300">
                  {transcript || <span className="text-slate-400 italic">Waiting for speech...</span>}
              </p>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-800 h-32 overflow-y-auto relative">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest absolute top-3 left-4">Translation ({targetLanguageName})</span>
              {isTranslating ? (
                  <div className="mt-6 flex items-center gap-2 text-indigo-500">
                      <Loader2 className="w-4 h-4 animate-spin" /> Translating...
                  </div>
              ) : (
                   <p className="mt-6 text-indigo-900 dark:text-indigo-100 font-medium">
                      {translation || <span className="text-indigo-400/60 italic">Translation will appear here</span>}
                  </p>
              )}
          </div>
       </div>

      <div className="flex gap-4 items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleRecording}
          disabled={isLocked}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all ${
            isRecording 
              ? 'bg-rose-500 text-white shadow-rose-500/40 animate-pulse' 
              : 'bg-indigo-600 text-white shadow-indigo-600/40 hover:bg-indigo-700'
          } ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </motion.button>
        
        {translation && !isRecording && (
             <motion.button
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={synthesizeTranslation}
               disabled={isPlaying}
               className={`p-4 rounded-full flex items-center justify-center transition-all shadow-lg ${isPlaying ? 'bg-emerald-100 text-emerald-600 shadow-emerald-500/20 cursor-wait' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-slate-200/50 hover:bg-slate-50'}`}
             >
                 <Volume2 className={`w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`} />
             </motion.button>
        )}
      </div>
    </div>
  );
}
