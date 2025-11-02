// src/services/paymentService.js

const PaymentService = {
  initializePayment: (config) => {
    return new Promise((resolve, reject) => {
      console.log('Initializing payment with config:', config);
      
      // Function to initialize payment after script loads
      const initPayment = () => {
        try {
          // Check if Paystack is available
          if (typeof window.PaystackPop === 'undefined') {
            console.error('PaystackPop is not available');
            reject(new Error('Paystack is not loaded correctly'));
            return;
          }
          
          console.log('Creating Paystack handler');
          const handler = window.PaystackPop.setup({
            ...config,
            callback: (response) => {
              console.log('Payment successful:', response);
              resolve(response);
            },
            onClose: () => {
              console.log('Payment closed');
              reject(new Error('Payment was cancelled'));
            }
          });
          
          console.log('Opening Paystack iframe');
          handler.openIframe();
        } catch (error) {
          console.error('Error initializing payment:', error);
          reject(error);
        }
      };
      
      // Check if Paystack is already loaded
      if (typeof window.PaystackPop !== 'undefined') {
        console.log('Paystack already loaded');
        initPayment();
      } else {
        console.log('Loading Paystack script...');
        // Load Paystack script
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        
        script.onload = () => {
          console.log('Paystack script loaded');
          // Give it a moment to initialize
          setTimeout(initPayment, 500);
        };
        
        script.onerror = () => {
          console.error('Failed to load Paystack script');
          reject(new Error('Failed to load payment service'));
        };
        
        document.body.appendChild(script);
      }
    });
  }
};

export default PaymentService;