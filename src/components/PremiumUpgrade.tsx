import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Loader2, CheckCircle, Zap, Calendar, Award, ArrowRight, Sparkles, Star } from 'lucide-react';
import { useCredits } from '../contexts/CreditsContext';

const PLANS = [
  { id: 'trial', name: 'Free Plan', price: 0, duration: 1, icon: Zap, description: 'Try all premium features free for 1 day.' },
  { id: '1_month', name: 'Premium (1 Month)', price: 129, duration: 30, icon: Calendar, description: 'Perfect for short-term intensive learning.' },
  { id: '3_months', name: 'Premium (3 Months)', price: 149, duration: 90, icon: Sparkles, description: 'Great value for a quarter of learning.', popular: true },
  { id: '1_year', name: 'Premium (1 Year)', price: 899, duration: 365, icon: CheckCircle, description: 'Best value for complete mastery.' },
  { id: 'flat', name: 'Flat Plan', price: 1999, duration: 3650, icon: Star, description: 'One-time payment for lifetime access.' }
];

export function PremiumUpgrade() {
  const checkoutRef = useRef<HTMLDivElement>(null);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [premiumExpiry, setPremiumExpiry] = useState<number | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(() => {
    const trialUsed = localStorage.getItem('trialUsed');
    return trialUsed ? '3_months' : 'trial';
  });
  const { addCredits } = useCredits();

  const [isPlacardLoading, setIsPlacardLoading] = useState(false);

  useEffect(() => {
    // Check if user is already premium
    const expiry = localStorage.getItem('premiumUntil');
    if (expiry) {
      const expiryTime = parseInt(expiry, 10);
      if (expiryTime > Date.now()) {
        setIsPremium(true);
        setPremiumExpiry(expiryTime);
      } else {
        localStorage.removeItem('premiumUntil');
      }
    }

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async (planToPay?: typeof PLANS[0]) => {
    const plan = planToPay || PLANS.find(p => p.id === selectedPlanId);
    if (!plan) return;

    if (plan.price === 0) {
      // ... (keep existing free trial logic)
      const trialUsed = localStorage.getItem('trialUsed');
      if (trialUsed) {
        alert('You have already used your free trial.');
        return;
      }
      const expiry = Date.now() + plan.duration * 24 * 60 * 60 * 1000;
      localStorage.setItem('premiumUntil', expiry.toString());
      localStorage.setItem('trialUsed', 'true');
      localStorage.setItem('subscriptionPlan', plan.name);

      const historyStr = localStorage.getItem('paymentHistory');
      let history = [];
      try {
        history = JSON.parse(historyStr || '[]');
        if (!Array.isArray(history)) history = [];
      } catch (e) {
        history = [];
      }
      history.unshift({
        id: `trial_${Date.now()}`,
        date: Date.now(),
        plan: plan.name,
        amount: 0,
        status: 'Success',
        invoiceUrl: '#'
      });
      localStorage.setItem('paymentHistory', JSON.stringify(history));

      setIsPremium(true);
      setPremiumExpiry(expiry);
      window.dispatchEvent(new CustomEvent('premiumUpdated', { detail: expiry }));
      alert('Free trial activated! Enjoy 1 day of premium access.');
      return;
    }

    setLoadingPlan(plan.id);
    try {
      const totalAmount = plan.price;

      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: totalAmount, 
          currency: 'INR',
          receipt: `receipt_${plan.id}_${Date.now()}`
        })
      });
      
      if (!response.ok) {
        let errorMsg = 'Failed to create order';
        try {
          const errData = await response.json();
          errorMsg = errData.error || errorMsg;
        } catch (e) {
          errorMsg = `Server error: ${response.status} ${response.statusText}`;
        }
        
        if (errorMsg === 'Authentication failed' || errorMsg.includes('invalid api key')) {
          alert('Razorpay Authentication Failed: Please check that your RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set correctly in your environment variables.');
        } else {
          alert('Checkout Error: ' + errorMsg);
        }
        
        setLoadingPlan(null);
        return;
      }

      const order = await response.json();

      if (order.error) {
        alert('Error: ' + order.error);
        setLoadingPlan(null);
        return;
      }

      if (!(window as any).Razorpay) {
        alert('Razorpay payment gateway is not loaded. Please check your internet connection and refresh.');
        setLoadingPlan(null);
        return;
      }

      const options = {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: "English Mastery",
        description: `${plan.name} Subscription`,
        order_id: order.id,
        handler: function (response: any) {
          // Payment successful
          const expiry = Date.now() + plan.duration * 24 * 60 * 60 * 1000;
          localStorage.setItem('premiumUntil', expiry.toString());
          localStorage.setItem('subscriptionPlan', plan.name);
          
          const historyStr = localStorage.getItem('paymentHistory');
          let history = [];
          try {
            history = JSON.parse(historyStr || '[]');
            if (!Array.isArray(history)) history = [];
          } catch (e) {
            history = [];
          }
          history.unshift({
            id: response.razorpay_payment_id || `pay_${Date.now()}`,
            date: Date.now(),
            plan: plan.name,
            amount: totalAmount,
            status: 'Success',
            invoiceUrl: '#'
          });
          localStorage.setItem('paymentHistory', JSON.stringify(history));

          setIsPremium(true);
          setPremiumExpiry(expiry);
          
          if (plan.id === '1_month') addCredits(1000);
          else if (plan.id === '1_year') addCredits(15000);
          else if (plan.id === 'pro_to_premium') addCredits(5000);
          
          window.dispatchEvent(new CustomEvent('premiumUpdated', { detail: expiry }));
          alert(`Payment successful! Welcome to Premium.`);
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#2563eb"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        alert('Payment failed: ' + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert('Something went wrong initiating payment');
    } finally {
      setLoadingPlan(null);
    }
  };

  const selectedPlan = PLANS.find(p => p.id === selectedPlanId);
  const totalAmount = selectedPlan ? selectedPlan.price : 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {isPremium && premiumExpiry && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg flex items-center justify-between mb-8">
          <div className="flex items-center justify-between w-full">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <CheckCircle className="w-6 h-6" /> Premium Member
              </h3>
              <p className="text-emerald-50 mt-1">
                You have full access to all features. ({Math.ceil((premiumExpiry - Date.now()) / (1000 * 60 * 60 * 24))} days remaining)
              </p>
            </div>
            <button
              onClick={() => {
                setIsPlacardLoading(true);
                setTimeout(() => setIsPlacardLoading(false), 1500);
              }}
              disabled={isPlacardLoading}
              className="ml-4 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold text-lg px-4 py-2 rounded-xl transition-all hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
            >
              {isPlacardLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Manage"}
            </button>
          </div>
        </div>
      )}

      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Upgrade to Premium</h2>
        <p className="text-base text-slate-600 dark:text-slate-400">Unlock unlimited AI conversations, advanced pronunciation analysis, and more.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {PLANS.map((plan) => {
          const Icon = plan.icon;
          const isSelected = selectedPlanId === plan.id;
          
          return (
            <div 
              key={plan.id} 
              onClick={() => {
                setSelectedPlanId(plan.id);
                setTimeout(() => {
                  checkoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }, 100);
              }}
              className={`relative rounded-2xl p-6 border-2 flex flex-col cursor-pointer transition-all duration-200 transform ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg shadow-blue-500/20 scale-105 z-10' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase ${isSelected ? 'bg-blue-500' : 'bg-slate-900 dark:bg-slate-700'}`}>
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-xl ${isSelected ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className={`font-semibold ${isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-slate-900 dark:text-white'}`}>{plan.name}</h3>
              </div>
              
              <div className="mb-4">
                <span className={`text-3xl font-bold tracking-tight ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                  {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                </span>
              </div>
              
              <p className={`text-sm font-medium flex-1 ${isSelected ? 'text-blue-700/80 dark:text-blue-300' : 'text-slate-500 dark:text-slate-400'}`}>
                {plan.description}
              </p>
              
              {/* Action Button */}
              <div className="mt-6 flex items-center justify-center">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlanId(plan.id);
                    handlePayment(plan);
                  }}
                  disabled={loadingPlan === plan.id}
                  className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    isSelected 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300'
                  }`}
                >
                  {loadingPlan === plan.id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      {plan.price === 0 ? 'Start Free Trial' : 'Upgrade Now'}
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

