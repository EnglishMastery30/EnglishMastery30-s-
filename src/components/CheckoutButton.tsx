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
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount / 100, // Converting cents/paise back to base unit for the API
          productName,
        }),
      });

      const orderData = await response.json();

      if (!response.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Check for Razorpay in window
      if (!(window as any).Razorpay) {
        // Load Razorpay script if not present
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "English Master",
        description: productName,
        image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=100&h=100&fit=crop",
        order_id: orderData.id,
        handler: function (response: any) {
          console.log("Payment successful:", response);
          if (onSuccess) onSuccess();
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Something went wrong');
      // Fallback mock check if needed, but safer to show error
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
