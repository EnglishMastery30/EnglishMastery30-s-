import React, { createContext, useContext, useState, useEffect } from 'react';

interface ApiKeys {
  gemini: string;
  openai: string;
  upai: string;
}

interface CreditsContextType {
  credits: number;
  addCredits: (amount: number) => void;
  consumeCredits: (amount: number, feature: string) => boolean;
  apiKeys: ApiKeys;
  setApiKey: (provider: keyof ApiKeys, key: string) => void;
  useCustomKeys: boolean;
  setUseCustomKeys: (use: boolean) => void;
  paymentHistory: any[];
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export function CreditsProvider({ children }: { children: React.ReactNode }) {
  const [credits, setCredits] = useState<number>(() => {
    const stored = localStorage.getItem('userCredits');
    return stored ? parseInt(stored, 10) : 100; // Default 100 free credits
  });

  const [apiKeys, setApiKeys] = useState<ApiKeys>(() => {
    const stored = localStorage.getItem('userApiKeys');
    return stored ? JSON.parse(stored) : { gemini: '', openai: '', upai: '' };
  });

  const [useCustomKeys, setUseCustomKeys] = useState<boolean>(() => {
    return localStorage.getItem('useCustomKeys') === 'true';
  });

  const [paymentHistory, setPaymentHistory] = useState<any[]>(() => {
    const stored = localStorage.getItem('paymentHistory');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('userCredits', credits.toString());
  }, [credits]);

  useEffect(() => {
    localStorage.setItem('userApiKeys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  useEffect(() => {
    localStorage.setItem('useCustomKeys', useCustomKeys.toString());
  }, [useCustomKeys]);

  const addCredits = (amount: number) => {
    setCredits(prev => prev + amount);
  };

  const consumeCredits = (amount: number, feature: string) => {
    // If user is using their own keys, we don't deduct platform credits
    if (useCustomKeys) {
      console.log(`[BYOK] Used custom API key for ${feature}. No credits deducted.`);
      return true;
    }

    if (credits >= amount) {
      setCredits(prev => prev - amount);
      console.log(`[Credits] Consumed ${amount} credits for ${feature}. Remaining: ${credits - amount}`);
      return true;
    } else {
      console.warn(`[Credits] Insufficient credits for ${feature}. Needed: ${amount}, Have: ${credits}`);
      return false;
    }
  };

  const setApiKey = (provider: keyof ApiKeys, key: string) => {
    setApiKeys(prev => ({ ...prev, [provider]: key }));
  };

  return (
    <CreditsContext.Provider value={{
      credits,
      addCredits,
      consumeCredits,
      apiKeys,
      setApiKey,
      useCustomKeys,
      setUseCustomKeys,
      paymentHistory
    }}>
      {children}
    </CreditsContext.Provider>
  );
}

export function useCredits() {
  const context = useContext(CreditsContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
}
