import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Key, ArrowRight, Github, Smartphone, Facebook, Instagram, Ghost } from 'lucide-react';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

export function LoginPage({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [method, setMethod] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'input' | 'verify' | 'forgot_password'>('input');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }
  }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      if (!email || !password) {
        throw new Error('Please enter both email and password.');
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Please enter a valid email address.');
      }
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password login is not enabled. Please enable it in the Firebase Console under Authentication > Sign-in method.');
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        // Auto-signup if user doesn't exist for demo purposes, or just show error
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          onLoginSuccess();
        } catch (signupErr: any) {
          if (signupErr.code === 'auth/email-already-in-use') {
            setError('Invalid email or password. Please try again or reset your password.');
          } else if (signupErr.code === 'auth/operation-not-allowed') {
            setError('Email/Password login is not enabled. Please enable it in the Firebase Console under Authentication > Sign-in method.');
          } else {
            setError(signupErr.message || 'Failed to sign in or create account.');
          }
        }
      } else {
        setError(err.message || 'Failed to sign in.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      if (!email) {
        throw new Error('Please enter your email address first.');
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Please enter a valid email address.');
      }
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
      setStep('input');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password login is not enabled. Please enable it in the Firebase Console under Authentication > Sign-in method.');
      } else {
        setError(err.message || 'Failed to send password reset email.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      if (!phone) {
        throw new Error('Please enter a valid phone number.');
      }
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
      setStep('verify');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult) return;
    setError('');
    setMessage('');
    setLoading(true);
    try {
      if (!otp) {
        throw new Error('Please enter the OTP.');
      }
      await confirmationResult.confirm(otp);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onLoginSuccess();
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        setError('Google login is not enabled. Please enable it in the Firebase Console under Authentication > Sign-in method.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        // User closed the popup, no need to show a scary error
      } else {
        setError(err.message || 'Failed to sign in with Google.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      onLoginSuccess();
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        setError('Facebook login is not enabled. Please enable it in the Firebase Console under Authentication > Sign-in method.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        // User closed the popup
      } else {
        setError(err.message || 'Failed to sign in with Facebook.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsupportedLogin = (provider: string) => {
    setError(`${provider} login is not supported in this demo. Please use Email or Google.`);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h2>
          <p className="text-slate-500 dark:text-slate-400">Sign in to continue your English journey</p>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl font-medium transition-colors col-span-2 disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          
          <button 
            type="button"
            onClick={handleFacebookLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1864D9] text-white px-4 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50"
          >
            <Facebook className="w-5 h-5" />
            Facebook
          </button>

          <button 
            type="button"
            onClick={() => handleUnsupportedLogin('Instagram')}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] hover:opacity-90 text-white px-4 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50"
          >
            <Instagram className="w-5 h-5" />
            Instagram
          </button>

          <button 
            type="button"
            onClick={() => handleUnsupportedLogin('Snapchat')}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#FFFC00] hover:bg-[#E6E300] text-slate-900 px-4 py-2.5 rounded-xl font-medium transition-colors col-span-2 disabled:opacity-50"
          >
            <Ghost className="w-5 h-5" />
            Snapchat
          </button>
        </div>

        <div className="relative flex items-center py-4 mb-4">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="flex-shrink-0 mx-4 text-slate-400 dark:text-slate-500 text-sm">or</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        {/* Method Toggle */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
          <button
            onClick={() => { setMethod('email'); setStep('input'); }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              method === 'email' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Email
          </button>
          <button
            onClick={() => { setMethod('otp'); setStep('input'); }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              method === 'otp' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Phone (OTP)
          </button>
        </div>

        {/* Forms */}
        {method === 'email' ? (
          <form onSubmit={step === 'forgot_password' ? handleForgotPassword : handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            {step !== 'forgot_password' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                  <button 
                    type="button" 
                    onClick={() => { setStep('forgot_password'); setError(''); setMessage(''); }}
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            )}
            {error && (
              <div className="text-red-500 text-sm text-center mt-2">{error}</div>
            )}
            {message && (
              <div className="text-emerald-500 text-sm text-center mt-2">{message}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-3 rounded-xl font-bold transition-colors mt-6"
            >
              {loading ? 'Processing...' : step === 'forgot_password' ? 'Reset Password' : 'Sign In'} <ArrowRight className="w-5 h-5" />
            </button>
            {step === 'forgot_password' && (
              <button 
                type="button"
                onClick={() => { setStep('input'); setError(''); setMessage(''); }}
                className="w-full text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors mt-4"
              >
                Back to Sign In
              </button>
            )}
          </form>
        ) : (
          <form onSubmit={step === 'input' ? handleOtpRequest : handleOtpVerify} className="space-y-4">
            {step === 'input' ? (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Smartphone className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-center text-2xl tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setStep('input')}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-2 block text-center w-full"
                >
                  Change phone number
                </button>
              </div>
            )}
            {error && (
              <div className="text-red-500 text-sm text-center mt-2">{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-3 rounded-xl font-bold transition-colors mt-6"
            >
              {loading ? 'Processing...' : step === 'input' ? 'Send Code' : 'Verify & Sign In'} <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}
        <div id="recaptcha-container"></div>
      </motion.div>
    </div>
  );
}
