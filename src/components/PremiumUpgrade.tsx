import React, { useState, useEffect } from 'react';
import { CreditCard, Loader2, CheckCircle, Zap, Calendar, Award } from 'lucide-react';

const PLANS = [
  { id: 'trial', name: '1 Day Free', price: 0, duration: 1, icon: Zap, description: 'Try all premium features free for 1 day.' },
  { id: '1_month', name: '1 Month', price: 49, duration: 30, icon: Calendar, description: 'Perfect for short-term intensive learning.' },
  { id: '6_months', name: '6 Months', price: 149, duration: 180, icon: Award, description: 'Great value for steady progress.', popular: true },
  { id: '1_year', name: '1 Year', price: 399, duration: 365, icon: CheckCircle, description: 'Best value for complete mastery.' }
];

export function PremiumUpgrade() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [premiumExpiry, setPremiumExpiry] = useState<number | null>(null);

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
  }, []);

  const handlePayment = async (plan: typeof PLANS[0]) => {
    if (plan.price === 0) {
      const trialUsed = localStorage.getItem('trialUsed');
      if (trialUsed) {
        alert('You have already used your free trial.');
        return;
      }
      const expiry = Date.now() + plan.duration * 24 * 60 * 60 * 1000;
      localStorage.setItem('premiumUntil', expiry.toString());
      localStorage.setItem('trialUsed', 'true');
      setIsPremium(true);
      setPremiumExpiry(expiry);
      window.dispatchEvent(new CustomEvent('premiumUpdated', { detail: expiry }));
      alert('Free trial activated! Enjoy 1 day of premium access.');
      return;
    }

    setLoadingPlan(plan.id);
    try {
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: plan.price, currency: 'INR' })
      });
      const order = await response.json();

      if (order.error) {
        alert('Error: ' + order.error);
        setLoadingPlan(null);
        return;
      }

      const options = {
        key: order.key_id, // Key ID returned from backend
        amount: order.amount,
        currency: order.currency,
        name: "English Mastery 30",
        description: `${plan.name} Premium Subscription`,
        order_id: order.id,
        handler: function (response: any) {
          // Payment successful
          const expiry = Date.now() + plan.duration * 24 * 60 * 60 * 1000;
          localStorage.setItem('premiumUntil', expiry.toString());
          setIsPremium(true);
          setPremiumExpiry(expiry);
          window.dispatchEvent(new CustomEvent('premiumUpdated', { detail: expiry }));
          alert(`Payment successful! Welcome to Premium.`);
        },
        prefill: {
          name: "Student",
          email: "student@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#4f46e5"
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

  return (
    <div className="space-y-6">
      {isPremium && premiumExpiry && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle className="w-6 h-6" /> Premium Member
            </h3>
            <p className="text-emerald-50 mt-1">
              You have full access to all features. ({Math.ceil((premiumExpiry - Date.now()) / (1000 * 60 * 60 * 24))} days remaining)
            </p>
          </div>
        </div>
      )}

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Upgrade to Premium</h2>
        <p className="text-slate-600 dark:text-slate-400">Unlock unlimited AI conversations, advanced pronunciation analysis, and more.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PLANS.map((plan) => {
          const Icon = plan.icon;
          return (
            <div 
              key={plan.id} 
              className={`relative bg-white dark:bg-slate-800 rounded-2xl p-6 border-2 flex flex-col ${
                plan.popular ? 'border-indigo-500 shadow-indigo-100 dark:shadow-indigo-900/20 shadow-xl' : 'border-slate-200 dark:border-slate-700 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${plan.popular ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">{plan.name}</h3>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">
                  {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1">
                {plan.description}
              </p>
              <button
                onClick={() => handlePayment(plan)}
                disabled={loadingPlan !== null}
                className={`w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                  plan.popular 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white'
                } disabled:opacity-70`}
              >
                {loadingPlan === plan.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : plan.price === 0 ? (
                  'Start Free Trial'
                ) : (
                  'Upgrade Now'
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
