// src/services/simplePaymentService.ts

const PAYSTACK_PUBLIC_KEY = 'pk_test_1409f64b8fe6b58765066f52d5fba38c786e828b'; // Your test key

export const initializePayment = (email: string, amount: number, reference: string, callback: (response: any) => void) => {
  // Load Paystack script if not already loaded
  if (!(window as any).PaystackPop) {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => {
      setupPaymentHandler(email, amount, reference, callback);
    };
    document.body.appendChild(script);
  } else {
    setupPaymentHandler(email, amount, reference, callback);
  }
};

const setupPaymentHandler = (email: string, amount: number, reference: string, callback: (response: any) => void) => {
  const handler = (window as any).PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: email,
    amount: amount * 100, // Paystack expects amount in kobo (cents)
    ref: reference,
    currency: 'GHS', // Explicitly set currency to GHS
    callback: callback,
    onClose: function() {
      console.log('Payment closed');
    }
  });
  
  handler.openIframe();
};

export const generateReference = (): string => {
  const date = new Date();
  const timestamp = date.getTime();
  const random = Math.floor(Math.random() * 1000000);
  return `LAP-${timestamp}-${random}`;
};