import React, { useState } from 'react';
import { Share2, Copy, CheckCircle, Gift } from 'lucide-react';

export function InviteBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Generate a unique invite link for the user
    // In a real app, this would be tied to the user's ID
    const userId = localStorage.getItem('userId') || Math.random().toString(36).substring(7);
    const inviteUrl = `${window.location.origin}/?invite=${userId}`;
    
    const handleShareReward = () => {
      const hasShared = localStorage.getItem('hasSharedInvite');
      if (!hasShared) {
        const storedPremium = localStorage.getItem('premiumUntil');
        const premiumUntil = storedPremium ? parseInt(storedPremium, 10) : null;
        const currentExpiry = premiumUntil && premiumUntil > Date.now() ? premiumUntil : Date.now();
        const newExpiry = currentExpiry + 3 * 24 * 60 * 60 * 1000;
        localStorage.setItem('premiumUntil', newExpiry.toString());
        localStorage.setItem('hasSharedInvite', 'true');
        window.dispatchEvent(new CustomEvent('premiumUpdated', { detail: newExpiry }));
        alert('Thanks for sharing! You have been rewarded with 3 days of free Premium!');
      }
    };

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'English Mastery 30',
          text: 'Join me and get 3 days of free Premium!',
          url: inviteUrl
        });
        handleShareReward();
        return;
      } catch (err) {
        console.log('Share canceled or failed', err);
      }
    }

    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      handleShareReward();
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = inviteUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        handleShareReward();
      } catch (e) {
        prompt("Copy this link to invite friends:", inviteUrl);
        handleShareReward();
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-xl shrink-0">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Give 3 Days, Get 3 Days!</h3>
            <p className="text-amber-50 text-sm max-w-md">
              Share your invite link with friends. When you share, you'll instantly get 3 days of Premium access for free, and they will too!
            </p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="shrink-0 flex items-center justify-center gap-2 px-6 py-3 w-full sm:w-auto bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-colors shadow-xl"
        >
          {copied ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
          {copied ? 'Copied!' : 'Copy Invite Link'}
        </button>
      </div>
    </div>
  );
}
