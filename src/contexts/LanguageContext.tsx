import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'te' | 'hi' | 'ta' | 'kn' | 'ml' | 'es' | 'fr' | 'ar' | 'ja';

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.curriculum': 'Curriculum',
    'nav.reports': 'Reports',
    'nav.admin': 'Admin',
    'nav.profile': 'Profile',
    'landing.login': 'Log in',
    'landing.getStarted': 'Get Started',
    'landing.title1': 'Master Spoken',
    'landing.title2': 'English in 30 Days',
    'landing.subtitle': 'Practice real-life conversations with an advanced AI tutor. Build confidence, improve pronunciation, and expand your vocabulary through interactive daily sessions.',
    'landing.startLearning': 'Start Learning Now',
    'landing.downloadApp': 'Download App',
    'profile.title': 'Profile',
    'profile.subscription': 'Subscription',
    'profile.preferences': 'Preferences',
    'profile.languageSettings': 'Language Settings',
    'profile.notifications': 'Notifications',
    'profile.darkMode': 'Dark Mode',
    'profile.signOut': 'Sign Out',
  },
  te: {
    'nav.dashboard': 'డ్యాష్‌బోర్డ్',
    'nav.curriculum': 'పాఠ్యాంశాలు',
    'nav.reports': 'నివేదికలు',
    'nav.admin': 'అడ్మిన్',
    'nav.profile': 'ప్రొఫైల్',
    'landing.login': 'లాగిన్',
    'landing.getStarted': 'ప్రారంభించండి',
    'landing.title1': 'మాట్లాడే ఇంగ్లీష్‌పై',
    'landing.title2': '30 రోజుల్లో పట్టు సాధించండి',
    'landing.subtitle': 'అధునాతన AI ట్యూటర్‌తో నిజ జీవిత సంభాషణలను ప్రాక్టీస్ చేయండి. ఇంటరాక్టివ్ రోజువారీ సెషన్ల ద్వారా ఆత్మవిశ్వాసాన్ని పెంచుకోండి.',
    'landing.startLearning': 'ఇప్పుడే నేర్చుకోవడం ప్రారంభించండి',
    'landing.downloadApp': 'యాప్ డౌన్‌లోడ్ చేయండి',
    'profile.title': 'ప్రొఫైల్',
    'profile.subscription': 'చందా',
    'profile.preferences': 'ప్రాధాన్యతలు',
    'profile.languageSettings': 'భాషా సెట్టింగ్‌లు',
    'profile.notifications': 'నోటిఫికేషన్‌లు',
    'profile.darkMode': 'డార్క్ మోడ్',
    'profile.signOut': 'సైన్ అవుట్',
  },
  hi: {
    'nav.dashboard': 'डैशबोर्ड',
    'nav.curriculum': 'पाठ्यक्रम',
    'nav.reports': 'रिपोर्ट',
    'nav.admin': 'व्यवस्थापक',
    'nav.profile': 'प्रोफ़ाइल',
    'landing.login': 'लॉग इन करें',
    'landing.getStarted': 'शुरू करें',
    'landing.title1': 'स्पोकन इंग्लिश में',
    'landing.title2': '30 दिनों में महारत हासिल करें',
    'landing.subtitle': 'एक उन्नत AI ट्यूटर के साथ वास्तविक जीवन की बातचीत का अभ्यास करें। इंटरैक्टिव दैनिक सत्रों के माध्यम से आत्मविश्वास बढ़ाएं।',
    'landing.startLearning': 'अभी सीखना शुरू करें',
    'landing.downloadApp': 'ऐप डाउनलोड करें',
    'profile.title': 'प्रोफ़ाइल',
    'profile.subscription': 'सदस्यता',
    'profile.preferences': 'प्राथमिकताएं',
    'profile.languageSettings': 'भाषा सेटिंग्स',
    'profile.notifications': 'सूचनाएं',
    'profile.darkMode': 'डार्क मोड',
    'profile.signOut': 'साइन आउट',
  },
  ta: {
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.curriculum': 'பாடத்திட்டம்',
    'nav.reports': 'அறிக்கைகள்',
    'nav.admin': 'நிர்வாகி',
    'nav.profile': 'சுயவிவரம்',
    'landing.login': 'உள்நுழைய',
    'landing.getStarted': 'தொடங்குங்கள்',
    'landing.title1': 'ஸ்போக்கன் இங்கிலீஷில்',
    'landing.title2': '30 நாட்களில் நிபுணத்துவம் பெறுங்கள்',
    'landing.subtitle': 'மேம்பட்ட AI ஆசிரியருடன் நிஜ வாழ்க்கை உரையாடல்களைப் பயிற்சி செய்யுங்கள். ஊடாடும் தினசரி அமர்வுகள் மூலம் நம்பிக்கையை வளர்த்துக் கொள்ளுங்கள்.',
    'landing.startLearning': 'இப்போதே கற்கத் தொடங்குங்கள்',
    'landing.downloadApp': 'பயன்பாட்டைப் பதிவிறக்கவும்',
    'profile.title': 'சுயவிவரம்',
    'profile.subscription': 'சந்தா',
    'profile.preferences': 'விருப்பங்கள்',
    'profile.languageSettings': 'மொழி அமைப்புகள்',
    'profile.notifications': 'அறிவிப்புகள்',
    'profile.darkMode': 'டார்க் மோட்',
    'profile.signOut': 'வெளியேறு',
  },
  kn: {
    'nav.dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    'nav.curriculum': 'ಪಠ್ಯಕ್ರಮ',
    'nav.reports': 'ವರದಿಗಳು',
    'nav.admin': 'ನಿರ್ವಾಹಕ',
    'nav.profile': 'ಪ್ರೊಫೈಲ್',
    'landing.login': 'ಲಾಗಿನ್',
    'landing.getStarted': 'ಪ್ರಾರಂಭಿಸಿ',
    'landing.title1': 'ಸ್ಪೋಕನ್ ಇಂಗ್ಲಿಷ್',
    'landing.title2': '30 ದಿನಗಳಲ್ಲಿ ಕರಗತ ಮಾಡಿಕೊಳ್ಳಿ',
    'landing.subtitle': 'ಸುಧಾರಿತ AI ಬೋಧಕನೊಂದಿಗೆ ನೈಜ ಜೀವನದ ಸಂಭಾಷಣೆಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ. ಸಂವಾದಾತ್ಮಕ ದೈನಂದಿನ ಅವಧಿಗಳ ಮೂಲಕ ಆತ್ಮವಿಶ್ವಾಸವನ್ನು ಬೆಳೆಸಿಕೊಳ್ಳಿ.',
    'landing.startLearning': 'ಈಗಲೇ ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಿ',
    'landing.downloadApp': 'ಅಪ್ಲಿಕೇಶನ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    'profile.title': 'ಪ್ರೊಫೈಲ್',
    'profile.subscription': 'ಚಂದಾದಾರಿಕೆ',
    'profile.preferences': 'ಆದ್ಯತೆಗಳು',
    'profile.languageSettings': 'ಭಾಷಾ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    'profile.notifications': 'ಅಧಿಸೂಚನೆಗಳು',
    'profile.darkMode': 'ಡಾರ್ಕ್ ಮೋಡ್',
    'profile.signOut': 'ಸೈನ್ ಔಟ್',
  },
  ml: {
    'nav.dashboard': 'ഡാഷ്‌ബോർഡ്',
    'nav.curriculum': 'പാഠ്യപദ്ധതി',
    'nav.reports': 'റിപ്പോർട്ടുകൾ',
    'nav.admin': 'അഡ്മിൻ',
    'nav.profile': 'പ്രൊഫൈൽ',
    'landing.login': 'ലോഗിൻ',
    'landing.getStarted': 'ആരംഭിക്കുക',
    'landing.title1': 'സ്പോക്കൺ ഇംഗ്ലീഷ്',
    'landing.title2': '30 ദിവസത്തിനുള്ളിൽ സ്വായത്തമാക്കുക',
    'landing.subtitle': 'നൂതന AI ട്യൂട്ടർ ഉപയോഗിച്ച് യഥാർത്ഥ ജീവിത സംഭാഷണങ്ങൾ പരിശീലിക്കുക. സംവേദനാത്മക പ്രതിദിന സെഷനുകളിലൂടെ ആത്മവിശ്വാസം വളർത്തുക.',
    'landing.startLearning': 'ഇപ്പോൾ പഠിക്കാൻ തുടങ്ങുക',
    'landing.downloadApp': 'ആപ്പ് ഡൗൺലോഡ് ചെയ്യുക',
    'profile.title': 'പ്രൊഫൈൽ',
    'profile.subscription': 'സബ്സ്ക്രിപ്ഷൻ',
    'profile.preferences': 'മുൻഗണനകൾ',
    'profile.languageSettings': 'ഭാഷാ ക്രമീകരണങ്ങൾ',
    'profile.notifications': 'അറിയിപ്പുകൾ',
    'profile.darkMode': 'ഡാർക്ക് മോഡ്',
    'profile.signOut': 'സൈൻ ഔട്ട്',
  },
  es: {
    'nav.dashboard': 'Panel',
    'nav.curriculum': 'Plan de estudios',
    'nav.reports': 'Informes',
    'nav.admin': 'Admin',
    'nav.profile': 'Perfil',
    'landing.login': 'Iniciar sesión',
    'landing.getStarted': 'Empezar',
    'landing.title1': 'Domina el inglés hablado',
    'landing.title2': 'en 30 días',
    'landing.subtitle': 'Practica conversaciones de la vida real con un tutor de IA avanzado. Desarrolla confianza y mejora tu pronunciación.',
    'landing.startLearning': 'Empieza a aprender ahora',
    'landing.downloadApp': 'Descargar App',
    'profile.title': 'Perfil',
    'profile.subscription': 'Suscripción',
    'profile.preferences': 'Preferencias',
    'profile.languageSettings': 'Configuración de idioma',
    'profile.notifications': 'Notificaciones',
    'profile.darkMode': 'Modo oscuro',
    'profile.signOut': 'Cerrar sesión',
  },
  fr: {
    'nav.dashboard': 'Tableau de bord',
    'nav.curriculum': 'Programme',
    'nav.reports': 'Rapports',
    'nav.admin': 'Admin',
    'nav.profile': 'Profil',
    'landing.login': 'Connexion',
    'landing.getStarted': 'Commencer',
    'landing.title1': 'Maîtrisez l\'anglais parlé',
    'landing.title2': 'en 30 jours',
    'landing.subtitle': 'Pratiquez des conversations réelles avec un tuteur IA avancé. Développez votre confiance et améliorez votre prononciation.',
    'landing.startLearning': 'Commencez à apprendre',
    'landing.downloadApp': 'Télécharger l\'app',
    'profile.title': 'Profil',
    'profile.subscription': 'Abonnement',
    'profile.preferences': 'Préférences',
    'profile.languageSettings': 'Paramètres de langue',
    'profile.notifications': 'Notifications',
    'profile.darkMode': 'Mode sombre',
    'profile.signOut': 'Se déconnecter',
  },
  ar: {
    'nav.dashboard': 'لوحة القيادة',
    'nav.curriculum': 'المنهج',
    'nav.reports': 'التقارير',
    'nav.admin': 'المسؤول',
    'nav.profile': 'الملف الشخصي',
    'landing.login': 'تسجيل الدخول',
    'landing.getStarted': 'البدء',
    'landing.title1': 'أتقن التحدث باللغة الإنجليزية',
    'landing.title2': 'في 30 يومًا',
    'landing.subtitle': 'تدرب على محادثات الحياة الواقعية مع مدرس ذكاء اصطناعي متقدم. ابني ثقتك بنفسك وحسن نطقك من خلال جلسات يومية تفاعلية.',
    'landing.startLearning': 'ابدأ التعلم الآن',
    'landing.downloadApp': 'تنزيل التطبيق',
    'profile.title': 'الملف الشخصي',
    'profile.subscription': 'الاشتراك',
    'profile.preferences': 'التفضيلات',
    'profile.languageSettings': 'إعدادات اللغة',
    'profile.notifications': 'الإشعارات',
    'profile.darkMode': 'الوضع الداكن',
    'profile.signOut': 'تسجيل الخروج',
  },
  ja: {
    'nav.dashboard': 'ダッシュボード',
    'nav.curriculum': 'カリキュラム',
    'nav.reports': 'レポート',
    'nav.admin': '管理',
    'nav.profile': 'プロフィール',
    'landing.login': 'ログイン',
    'landing.getStarted': 'はじめる',
    'landing.title1': '30日で英会話を',
    'landing.title2': 'マスターする',
    'landing.subtitle': '高度なAIチューターと実生活の会話を練習しましょう。インタラクティブな毎日のセッションを通じて自信をつけ、発音を改善します。',
    'landing.startLearning': '今すぐ学習を始める',
    'landing.downloadApp': 'アプリをダウンロード',
    'profile.title': 'プロフィール',
    'profile.subscription': 'サブスクリプション',
    'profile.preferences': '設定',
    'profile.languageSettings': '言語設定',
    'profile.notifications': '通知',
    'profile.darkMode': 'ダークモード',
    'profile.signOut': 'サインアウト',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Auto-detect language on mount
    const browserLang = navigator.language.split('-')[0];
    const supported: Language[] = ['en', 'te', 'hi', 'ta', 'kn', 'ml', 'es', 'fr', 'ar', 'ja'];
    
    // Check localStorage first
    const savedLang = localStorage.getItem('app_language') as Language;
    if (savedLang && supported.includes(savedLang)) {
      setLanguage(savedLang);
    } else if (supported.includes(browserLang as Language)) {
      setLanguage(browserLang as Language);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [dir, language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
