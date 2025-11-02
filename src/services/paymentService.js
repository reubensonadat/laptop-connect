// src/services/paymentService.js

// This service will handle Paystack payments
const PaymentService = {
  // Initialize Paystack payment
  initializePayment: (config) => {
    return new Promise((resolve, reject) => {
      // Check if Paystack is loaded
      if (typeof window.PaystackPop === 'undefined') {
        // Load Paystack script if not already loaded
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.onload = () => {
          // Once loaded, initialize payment
          processPayment(config, resolve, reject);
        };
        script.onerror = () => {
          reject(new Error('Failed to load Paystack'));
        };
        document.body.appendChild(script);
      } else {
        // Paystack already loaded, initialize payment
        processPayment(config, resolve, reject);
      }
    });
  }
};

// Helper function to process payment
function processPayment(config, resolve, reject) {
  try {
    const paystack = new window.PaystackPop();
    paystack.newTransaction({
      ...config,
      onSuccess: (response) => {
        resolve(response);
      },
      onError: (error) => {
        reject(error);
      }
    });
  } catch (error) {
    reject(error);
  }
}

export default PaymentService;