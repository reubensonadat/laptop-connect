// src/pages/PrivacyPolicy.tsx
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="mb-4">
          <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
        <p className="mb-4">
          Laptop Connect collects information to provide better services to all our users. The types of information we collect include:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Personal information you provide (name, email, phone number)</li>
          <li>Payment information processed through secure third-party services</li>
          <li>Device and usage information (browser type, IP address, pages visited)</li>
          <li>Communication data when you contact us through WhatsApp or email</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Process and fulfill your orders</li>
          <li>Provide customer support</li>
          <li>Improve our services and user experience</li>
          <li>Communicate with you about your orders and our services</li>
          <li>Detect and prevent fraud</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">3. Information Sharing</h2>
        <p className="mb-4">
          We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Payment processors for transaction processing</li>
          <li>Service providers who assist in operating our business</li>
          <li>When required by law or to protect our rights</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">4. Data Security</h2>
        <p className="mb-4">
          We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">5. Cookies and Tracking</h2>
        <p className="mb-4">
          Our website uses cookies to enhance your experience. Cookies are small files stored on your device that help us understand how you use our site. You can control cookie settings through your browser preferences.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">6. Your Rights</h2>
        <p className="mb-4">
          You have the right to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your personal information</li>
          <li>Opt-out of marketing communications</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">7. Third-Party Services</h2>
        <p className="mb-4">
          Our website integrates with third-party services, including:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Paystack for payment processing</li>
          <li>WhatsApp for customer communication</li>
        </ul>
        <p className="mb-4">
          These services have their own privacy policies, and we are not responsible for their data practices.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">8. Children's Privacy</h2>
        <p className="mb-4">
          Our services are not intended for children under 18. We do not knowingly collect personal information from children under 18.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">9. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Effective Date" at the top.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">10. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="mb-4">
          Email: laptopconnect@gmail.com<br />
          Phone: [+233 201 534 711]<br />
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;