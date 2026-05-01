import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Clock, Shield, AlertCircle, CheckCircle, Bell, XCircle, Download, ChevronLeft, Zap } from 'lucide-react';

interface PaymentHistoryItem {
  id: string;
  date: number;
  plan: string;
  amount: number;
  status: string;
  invoiceUrl: string;
}

export function SubscriptionManagement({ onBack }: { onBack: () => void }) {
  const [isPremium, setIsPremium] = useState(false);
  const [premiumExpiry, setPremiumExpiry] = useState<number | null>(null);
  const [subscriptionPlan, setSubscriptionPlan] = useState<string>('Free Plan');
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>([]);
  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => {
    const expiry = localStorage.getItem('premiumUntil');
    if (expiry) {
      const expiryTime = parseInt(expiry, 10);
      if (expiryTime > Date.now()) {
        setIsPremium(true);
        setPremiumExpiry(expiryTime);
        setSubscriptionPlan(localStorage.getItem('subscriptionPlan') || 'Premium Plan');
      }
    }

    try {
      const historyStr = localStorage.getItem('paymentHistory');
      if (historyStr) {
        const history = JSON.parse(historyStr);
        if (Array.isArray(history)) {
          setPaymentHistory(history);
        }
      }
    } catch (e) {
      console.error("Failed to parse payment history", e);
      setPaymentHistory([]);
    }

    const notifications = localStorage.getItem('emailNotifications');
    if (notifications !== null) {
      setEmailNotifications(notifications === 'true');
    }
  }, []);

  const handleCancelSubscription = () => {
    if (window.confirm('Are you sure you want to cancel your subscription? You will lose access to premium features after your current billing period ends.')) {
      alert('Your subscription has been cancelled. You will not be billed again.');
    }
  };

  const toggleNotifications = () => {
    const newValue = !emailNotifications;
    setEmailNotifications(newValue);
    localStorage.setItem('emailNotifications', newValue.toString());
    if (newValue) {
      alert('Email notifications enabled! You will receive alerts when your subscription is about to expire or gets renewed.');
    } else {
      alert('Email notifications disabled.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-8 p-4 sm:p-6"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Profile
      </button>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
              <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Subscription Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Current Plan</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">{subscriptionPlan}</span>
                  {isPremium && (
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 text-xs font-medium rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Active
                    </span>
                  )}
                </div>
              </div>

              {isPremium && premiumExpiry && (
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Renewal Date</p>
                  <p className="text-lg font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {new Date(premiumExpiry).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center space-y-3 md:items-end">
              {isPremium ? (
                <button 
                  onClick={handleCancelSubscription}
                  className="px-6 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 dark:text-rose-400 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Cancel Subscription
                </button>
              ) : (
                <button 
                  onClick={onBack}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
                >
                  Upgrade to Premium
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-800/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-500" />
                Email Notifications
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Receive alerts when your subscription is about to expire or renews.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={emailNotifications}
                onChange={toggleNotifications}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-500" />
            Payment History
          </h3>
        </div>
        
        {paymentHistory.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">No payment history found.</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Your past payments and invoices will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-500 dark:text-slate-400">
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Description</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {paymentHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-300 whitespace-nowrap">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      {item.plan}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-300">
                      ₹{item.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${
                        item.status === 'Success' 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                      }`}>
                        {item.status === 'Success' && <CheckCircle className="w-3 h-3" />}
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => alert('Downloading invoice...')}
                        className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors inline-flex"
                        title="Download Invoice"
                      >
                        <Download className="w-4 h-4" />
                      </button>
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
