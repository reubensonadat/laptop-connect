import { useEffect } from 'react';
import { scrollToTop } from '../utils/helpers';

const TermsAndConditions = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Please read these terms carefully before using our services
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
              Welcome to Laptop Connect. These Terms and Conditions govern your use of our website and the purchase of products from our store. By accessing our website and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions.
            </p>
            <p className="mb-4">
              Please read these Terms and Conditions carefully before using our website. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">2. Use of the Website</h2>
            <p className="mb-4">
              You may use our website for lawful purposes only. You agree not to use the website:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-600">
              <li>In any way that violates any applicable national or international law</li>
              <li>To transmit, or procure the sending of, any unsolicited or unauthorized advertising or promotional material</li>
              <li>To impersonate or attempt to impersonate Laptop Connect, a Laptop Connect employee, another user, or any other person or entity</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">3. Products and Services</h2>
            <p className="mb-4">
              We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the website. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors.
            </p>
            <p className="mb-4">
              We reserve the right to change the products, services, and prices described on the website at any time without notice. We are not liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the products or services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">4. Payment and Pricing</h2>
            <p className="mb-4">
              All prices are displayed in Ghanaian Cedis (GHS) and are inclusive of applicable taxes. We accept payment through Paystack, a secure payment gateway. By providing your payment information, you represent that you are authorized to use the payment method.
            </p>
            <p className="mb-4">
              We offer two payment options: full payment and half payment. For half payments, the remaining balance must be paid before delivery of the product.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">5. Delivery</h2>
            <p className="mb-4">
              We offer delivery services within Ghana. Delivery times may vary depending on your location. We will provide you with an estimated delivery date when you place your order.
            </p>
            <p className="mb-4">
              Risk of loss and title for all products ordered by you pass to you on our delivery to the specified delivery address.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">6. Return Policy</h2>
            <p className="mb-4">
              If you are not satisfied with your purchase, you may return the product within 7 days of delivery for a refund or exchange, subject to the following conditions:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-600">
              <li>The product must be in its original condition, with all accessories and packaging</li>
              <li>You must provide the original receipt or proof of purchase</li>
              <li>The product must not be damaged or show signs of excessive use</li>
              <li>Software, CDs, and other digital products cannot be returned once opened</li>
            </ul>
            <p className="mb-4">
              Return shipping costs will be borne by the customer, unless the return is due to our error or a defective product.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">7. Warranty</h2>
            <p className="mb-4">
              All new laptops come with a manufacturer's warranty as specified in the product description. Used laptops come with a 30-day warranty covering hardware defects.
            </p>
            <p className="mb-4">
              The warranty does not cover damage caused by accident, misuse, or normal wear and tear. To make a warranty claim, please contact us with your order number and a description of the issue.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">8. Intellectual Property</h2>
            <p className="mb-4">
              The content of the website, including but not limited to text, graphics, images, logos, and software, is the property of Laptop Connect or its content suppliers and is protected by international copyright laws.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">9. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall Laptop Connect, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the website.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">10. Governing Law</h2>
            <p className="mb-4">
              These Terms and Conditions shall be interpreted and governed by the laws of Ghana. Any dispute arising from these terms shall be subject to the exclusive jurisdiction of the courts of Ghana.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">11. Changes to Terms and Conditions</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website after any changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">12. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms and Conditions, please contact us at info@laptopconnect.shop or +233 20 153 4711.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;