import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, CreditCard, Shield, Clock, AlertCircle } from 'lucide-react';

interface PaymentHistoryItem {
  id: string;
  provider: string;
  plan: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  nextRenewal: string | null;
}

export function SubscriptionPage() {
  const [history, setHistory] = useState<PaymentHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
    
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    // Load Cashfree script
    const cfScript = document.createElement('script');
    cfScript.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    cfScript.async = true;
    document.body.appendChild(cfScript);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(cfScript);
    };
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/payments/history');
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  const handleRazorpaySubscribe = async (planName: string, amount: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/razorpay/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planName, amount, planId: 'plan_mock123' })
      });
      const data = await res.json();

      if (data.mock) {
        alert('Mock Razorpay Subscription Created! (Keys missing in .env)');
        fetchHistory();
        setLoading(false);
        return;
      }

      if (data.success && data.subscriptionId) {
        const options = {
          key: data.key,
          subscription_id: data.subscriptionId,
          name: 'English Mastery 30',
          description: `${planName} Subscription`,
          handler: function (response: any) {
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            fetchHistory();
          },
          prefill: {
            name: 'John Doe',
            email: 'john@example.com',
            contact: '9999999999'
          },
          theme: {
            color: '#4f46e5'
          }
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        setError(data.error || 'Failed to initiate Razorpay payment');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCashfreeSubscribe = async (planName: string, amount: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/cashfree/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planName, amount })
      });
      const data = await res.json();

      if (data.mock) {
        alert('Mock Cashfree Subscription Created! (Keys missing in .env)');
        fetchHistory();
        setLoading(false);
        return;
      }

      if (data.success && data.paymentSessionId) {
        const cashfree = await (window as any).Cashfree({
          mode: "sandbox" // or "production"
        });
        
        cashfree.checkout({
          paymentSessionId: data.paymentSessionId,
          redirectTarget: "_modal"
        }).then((result: any) => {
          if(result.error){
            setError(result.error.message);
          }
          if(result.redirect){
            console.log("Redirection")
          }
          if(result.paymentDetails){
            alert("Payment successful!");
            fetchHistory();
          }
        });
      } else {
        setError(data.error || 'Failed to initiate Cashfree payment');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this subscription?')) return;
    try {
      await fetch('/api/payments/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchHistory();
    } catch (err) {
      console.error('Failed to cancel', err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-12"
    >
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Premium Plans</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Unlock unlimited AI voice coaching, advanced grammar analysis, and personalized learning paths.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-2xl flex items-start gap-3 text-left max-w-2xl mx-auto">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <p className="text-sm text-rose-700 dark:text-rose-300">{error}</p>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Pro Plan */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 flex flex-col">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Pro Monthly</h3>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-bold text-slate-900 dark:text-white">$15</span>
            <span className="text-slate-500 dark:text-slate-400">/month</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            {['Unlimited AI Conversations', 'Advanced Pronunciation Analysis', 'Custom Vocabulary Lists', 'Auto-renews monthly'].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-3">
            <button 
              onClick={() => handleRazorpaySubscribe('Pro Monthly', 15)}
              disabled={loading}
              className="w-full py-3 px-4 bg-[#02042b] hover:bg-[#0f172a] text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Subscribe with Razorpay
            </button>
            <button 
              onClick={() => handleCashfreeSubscribe('Pro Monthly', 15)}
              disabled={loading}
              className="w-full py-3 px-4 bg-[#6c2bd9] hover:bg-[#5b21b6] text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Subscribe with Cashfree
            </button>
          </div>
        </div>

        {/* Annual Plan */}
        <div className="bg-indigo-600 rounded-3xl border border-indigo-500 shadow-xl p-8 flex flex-col relative overflow-hidden">
          <div className="absolute top-6 right-6 bg-white/20 px-3 py-1 rounded-full text-white text-xs font-bold tracking-wider uppercase">
            Best Value
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Pro Annual</h3>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-bold text-white">$120</span>
            <span className="text-indigo-200">/year</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            {['Everything in Monthly', 'Save $60 per year', 'Priority AI Processing', 'Auto-renews annually'].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-white">
                <Check className="w-5 h-5 text-indigo-200 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-3">
            <button 
              onClick={() => handleRazorpaySubscribe('Pro Annual', 120)}
              disabled={loading}
              className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-indigo-900 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Subscribe with Razorpay
            </button>
            <button 
              onClick={() => handleCashfreeSubscribe('Pro Annual', 120)}
              disabled={loading}
              className="w-full py-3 px-4 bg-indigo-900 hover:bg-indigo-950 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Subscribe with Cashfree
            </button>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-500" />
          Payment & Subscription History
        </h3>
        
        {history.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 text-center py-8">No payment history found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Plan</th>
                  <th className="pb-3 font-medium">Provider</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Next Renewal</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800/50 last:border-0">
                    <td className="py-4 text-sm text-slate-900 dark:text-slate-300">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-sm font-medium text-slate-900 dark:text-white">
                      {item.plan}
                    </td>
                    <td className="py-4 text-sm text-slate-600 dark:text-slate-400">
                      {item.provider}
                    </td>
                    <td className="py-4 text-sm text-slate-900 dark:text-slate-300">
                      ${item.amount.toFixed(2)}
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        item.status === 'active' 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                          : item.status === 'cancelled'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                      }`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-slate-600 dark:text-slate-400">
                      {item.nextRenewal ? new Date(item.nextRenewal).toLocaleDateString() : '-'}
                    </td>
                    <td className="py-4 text-right">
                      {item.status === 'active' && (
                        <button 
                          onClick={() => handleCancel(item.id)}
                          className="text-xs font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
