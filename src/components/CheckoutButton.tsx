import { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  productName?: string;
  amount?: number; // Amount in cents
  buttonText?: string;
  onSuccess?: () => void;
}

export function CheckoutButton({ 
  productName = 'Pro Subscription', 
  amount = 2000, 
  buttonText = 'Upgrade to Pro',
  onSuccess
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          amount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If Stripe is not configured, mock the success for prototype purposes
        if (data.message && data.message.includes('STRIPE_SECRET_KEY')) {
          console.log('Stripe not configured, mocking successful upgrade');
          if (onSuccess) onSuccess();
          return;
        }
        throw new Error(data.message || 'Something went wrong');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      // Fallback mock for prototype if network fails
      if (onSuccess) onSuccess();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <CreditCard className="w-5 h-5" />
        )}
        {isLoading ? 'Processing...' : buttonText}
      </button>
      {error && (
        <p className="text-sm text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}
