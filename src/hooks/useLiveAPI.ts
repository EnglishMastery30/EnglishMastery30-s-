import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

export type TranscriptSegment = {
  id: number;
  text: string;
  isFinal: boolean;
  speaker: 'user' | 'ai';
};

export function useLiveAPI(systemInstruction: string, apiKey?: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0);
  const [transcripts, setTranscripts] = useState<TranscriptSegment[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sessionRef = useRef<any>(null);
  
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextPlayTimeRef = useRef<number>(0);
  
  const transcriptIdRef = useRef(0);
  const userTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    setTranscripts([]);
    transcriptIdRef.current = 0;
    
    try {
      const keyToUse = apiKey || process.env.GEMINI_API_KEY;
      if (!keyToUse) throw new Error("API key is missing.");
      const ai = new GoogleGenAI({ apiKey: keyToUse });
      
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      const audioCtx = audioContextRef.current;
      
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(e => {
        throw new Error("Microphone access denied. Please allow microphone permissions.");
      });
      sourceRef.current = audioCtx.createMediaStreamSource(streamRef.current);
      
      analyserRef.current = audioCtx.createAnalyser();
      analyserRef.current.fftSize = 256;
      sourceRef.current.connect(analyserRef.current);

      processorRef.current = audioCtx.createScriptProcessor(4096, 1, 1);
      
      let sessionPromise: any;
      
      sessionPromise = ai.live.connect({
        model: "gemini-2.0-flash-exp",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setIsConnecting(false);
            
            processorRef.current!.onaudioprocess = (e) => {
              if (!isConnected) return;

              const inputData = e.inputBuffer.getChannelData(0);
              
              // Calculate volume for visualizer using analyser for better responsiveness
              if (analyserRef.current) {
                const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                analyserRef.current.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((p, c) => p + c, 0) / dataArray.length;
                setVolume(average / 255);
              }

              const pcm16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                let s = Math.max(-1, Math.min(1, inputData[i]));
                pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
              }
              
              const buffer = new Uint8Array(pcm16.buffer);
              let binary = '';
              for (let i = 0; i < buffer.byteLength; i++) {
                binary += String.fromCharCode(buffer[i]);
              }
              const base64 = btoa(binary);
              
              sessionPromise.then((session: any) => {
                session.sendRealtimeInput({
                  audio: { data: base64, mimeType: 'audio/pcm;rate=16000' }
                });
              });
            };
            
            sourceRef.current!.connect(processorRef.current!);
            processorRef.current!.connect(audioCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.interrupted) {
              activeSourcesRef.current.forEach(s => {
                try { s.stop(); } catch (e) {}
              });
              activeSourcesRef.current.clear();
              nextPlayTimeRef.current = audioCtx.currentTime;
              setIsProcessing(false);
            }
            
            if (message.serverContent?.modelTurn) {
              setIsProcessing(true);
            }
            
            if (message.serverContent?.turnComplete) {
              setIsProcessing(false);
              setTranscripts(prev => {
                const last = prev[prev.length - 1];
                if (last && !last.isFinal && last.speaker === 'ai') {
                  const updated = [...prev];
                  updated[updated.length - 1] = { ...last, isFinal: true };
                  return updated;
                }
                return prev;
              });
            }

            if (message.serverContent?.outputTranscription?.text) {
              const text = message.serverContent.outputTranscription.text;
              setTranscripts(prev => {
                const last = prev[prev.length - 1];
                if (last && !last.isFinal && last.speaker === 'ai') {
                  const updated = [...prev];
                  updated[updated.length - 1] = { ...last, text: last.text + text };
                  return updated;
                } else {
                  transcriptIdRef.current += 1;
                  return [...prev, { id: transcriptIdRef.current, text, isFinal: false, speaker: 'ai' }];
                }
              });
            }

            const base64Audio = message.serverContent?.modelTurn?.parts?.find(p => p.inlineData)?.inlineData?.data;
            
            if (message.serverContent?.inputTranscription?.text) {
              const text = message.serverContent.inputTranscription.text;
              setTranscripts(prev => {
                const last = prev[prev.length - 1];
                if (last && !last.isFinal && last.speaker === 'user') {
                  const updated = [...prev];
                  updated[updated.length - 1] = { ...last, text: last.text + text };
                  return updated;
                } else {
                  transcriptIdRef.current += 1;
                  return [...prev, { id: transcriptIdRef.current, text, isFinal: false, speaker: 'user' }];
                }
              });

              if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current);
              userTimeoutRef.current = setTimeout(() => {
                setTranscripts(prev => {
                  const last = prev[prev.length - 1];
                  if (last && !last.isFinal && last.speaker === 'user') {
                    const updated = [...prev];
                    updated[updated.length - 1] = { ...last, isFinal: true };
                    return updated;
                  }
                  return prev;
                });
              }, 1500);
            }

            if (base64Audio) {
              const binaryString = atob(base64Audio);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }
              const pcm16 = new Int16Array(bytes.buffer);
              const float32 = new Float32Array(pcm16.length);
              for (let i = 0; i < pcm16.length; i++) {
                float32[i] = pcm16[i] / 32768;
              }
              
              const audioBuffer = audioCtx.createBuffer(1, float32.length, 24000);
              audioBuffer.getChannelData(0).set(float32);
              
              const source = audioCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(audioCtx.destination);
              
              if (nextPlayTimeRef.current < audioCtx.currentTime) {
                nextPlayTimeRef.current = audioCtx.currentTime;
              }
              
              source.start(nextPlayTimeRef.current);
              nextPlayTimeRef.current += audioBuffer.duration;
              
              activeSourcesRef.current.add(source);
              source.onended = () => {
                activeSourcesRef.current.delete(source);
              };
            }
          },
          onclose: () => {
            disconnect();
          },
          onerror: (err: any) => {
            console.error("Live API Error:", err);
            setError(err.message || "An error occurred");
            disconnect();
          }
        }
      });
      
      sessionRef.current = sessionPromise;
      
    } catch (err: any) {
      console.error("Connection Error:", err);
      setError(err.message || "Failed to connect");
      setIsConnecting(false);
      disconnect();
    }
  }, [systemInstruction]);

  const disconnect = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.then((session: any) => {
        try { session.close(); } catch (e) {}
      });
      sessionRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    activeSourcesRef.current.forEach(s => {
      try { s.stop(); } catch (e) {}
    });
    activeSourcesRef.current.clear();
    
    if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current);
    
    setIsConnected(false);
    setIsConnecting(false);
    setIsProcessing(false);
    setVolume(0);
  }, []);

  return {
    isConnected,
    isConnecting,
    isProcessing,
    error,
    volume,
    transcripts,
    connect,
    disconnect
  };
}
