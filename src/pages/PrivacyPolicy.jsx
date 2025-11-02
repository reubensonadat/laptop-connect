import { useEffect } from 'react';
import { scrollToTop } from '../utils/helpers';

const PrivacyPolicy = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const lastUpdated = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-blue to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-2">Last updated: {lastUpdated}</p>
          </div>

          <div className="prose prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="mb-4">
              At Laptop Connect, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your information when you use our website and services.
            </p>
            <p className="mb-4">
              By using our website, you agree to the collection and use of information in accordance with this policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">2. Information We Collect</h2>
            <p className="mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-600">
              <li><strong>Personal Information:</strong> Name, email address, phone number, delivery address, and payment information</li>
              <li><strong>Technical Information:</strong> IP address, browser type, operating system, and device information</li>
              <li><strong>Usage Information:</strong> Pages visited, time spent on the website, and click patterns</li>
              <li><strong>Cookies and Tracking Data:</strong> Information collected through cookies and similar technologies</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">3. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-600">
              <li>To process and fulfill your orders</li>
              <li>To provide customer support</li>
              <li>To communicate with you about your orders and our services</li>
              <li>To improve our website and services</li>
              <li>To personalize your experience on our website</li>
              <li>To analyze website usage and trends</li>
              <li>To detect and prevent fraud</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">4. Cookies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being set.
            </p>
            <p className="mb-4">
              We use both session cookies (which expire once you close your web browser) and persistent cookies (which stay on your device until they expire or you delete them).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">5. Data Sharing and Disclosure</h2>
            <p className="mb-4">
              We may share your personal information with:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-600">
              <li><strong>Payment Processors:</strong> To process payments securely</li>
              <li><strong>Delivery Services:</strong> To deliver your orders</li>
              <li><strong>Third-Party Service Providers:</strong> To help us operate our website and services</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
            </ul>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">6. Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-600">
              <li>Secure socket layer (SSL) technology for data transmission</li>
              <li>Encryption of sensitive information</li>
              <li>Regular security reviews and updates</li>
              <li>Restricted access to personal information</li>
            </ul>
            <p className="mb-4">
              However, no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">7. Your Rights</h2>
            <p className="mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-600">
              <li><strong>Access:</strong> You can request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> You can request correction of any inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> You can request deletion of your personal information</li>
              <li><strong>Portability:</strong> You can request a copy of your information in a structured, machine-readable format</li>
              <li><strong>Objection:</strong> You can object to our processing of your personal information</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, please contact us at info@laptopconnect.shop.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">8. Data Retention</h2>
            <p className="mb-4">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">9. Children's Privacy</h2>
            <p className="mb-4">
              Our website is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">10. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date at the bottom of this policy.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">11. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy or our data practices, please contact us at info@laptopconnect.shop or +233 20 153 4711.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;