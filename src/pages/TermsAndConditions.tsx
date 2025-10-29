// src/pages/TermsAndConditions.tsx
import React from 'react';
import { FileText, Shield, CreditCard, Truck, RotateCcw, AlertCircle } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="container px-4 py-8 md:px-6 max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Terms and Conditions</h1>
        <p className="text-muted-foreground">
          Please read these terms and conditions carefully before using our services.
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Introduction
          </h2>
          <p className="text-muted-foreground">
            Welcome to Laptop Connect. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website and purchasing our products, you accept these terms and conditions in full.
          </p>
        </section>
        
        {/* Product Information */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Product Information
          </h2>
          <div className="space-y-2 text-muted-foreground">
            <p>We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on our website.</p>
            <p>We do not accept liability for any errors or omissions and reserve the right to change information, prices, specifications, and descriptions of listed products at any time without prior notice.</p>
            <p>All laptop specifications are provided by manufacturers and may vary slightly from the actual product.</p>
          </div>
        </section>
        
        {/* Pricing and Payment */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Pricing and Payment
          </h2>
          <div className="space-y-2 text-muted-foreground">
            <p>All prices are displayed in Ghanaian Cedis (GHS) and are inclusive of applicable taxes.</p>
            <p>We offer two payment options:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full Payment: Pay the entire amount upfront</li>
              <li>Half Payment: Pay 50% now and the remaining 50% upon delivery</li>
            </ul>
            <p>Payment is processed securely through Paystack. We do not store your payment information.</p>
            <p>In the event of a payment failure, your order will not be processed, and you will be notified to try again.</p>
          </div>
        </section>
        
        {/* Delivery */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            Delivery
          </h2>
          <div className="space-y-2 text-muted-foreground">
            <p>Delivery times are estimates and may vary based on your location and product availability.</p>
            <p>Standard delivery within Accra typically takes 2-3 business days.</p>
            <p>Delivery to other regions in Ghana typically takes 3-5 business days.</p>
            <p>You will receive tracking information once your order is shipped.</p>
            <p>Someone must be available to receive the delivery at the specified address.</p>
          </div>
        </section>
        
        {/* Returns and Warranty */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-primary" />
            Returns and Warranty
          </h2>
          <div className="space-y-2 text-muted-foreground">
            <p>All new laptops come with a minimum 6-month manufacturer warranty.</p>
            <p>Used laptops come with a 3-month warranty unless otherwise specified.</p>
            <p>Warranty covers manufacturing defects and does not cover physical damage, software issues, or damage caused by misuse.</p>
            <p>If you receive a defective product, please notify us within 48 hours of delivery.</p>
            <p>Returns will only be accepted with the original packaging and all included accessories.</p>
          </div>
        </section>
        
        {/* Limitation of Liability */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Limitation of Liability
          </h2>
          <div className="space-y-2 text-muted-foreground">
            <p>Laptop Connect shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
            <p>Our total liability to you for any cause of action whatsoever, and regardless of the form of the action, will at all times be limited to the amount paid by you for the product.</p>
          </div>
        </section>
        
        {/* Governing Law */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
          <p className="text-muted-foreground">
            These terms and conditions are governed by and construed in accordance with the laws of Ghana and you irrevocably submit to the exclusive jurisdiction of the courts in Ghana.
          </p>
        </section>
        
        {/* Changes to Terms */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Changes to Terms</h2>
          <p className="text-muted-foreground">
            Laptop Connect reserves the right to amend these terms and conditions at any time. Any changes will be effective immediately upon posting on the website. Your continued use of the website after any such changes constitutes your acceptance of the new terms and conditions.
          </p>
        </section>
        
        {/* Contact Information */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>If you have any questions about these terms and conditions, please contact us:</p>
            <p>Email: laptopconnect@gmail.com</p>
            <p>Phone: +233 201 534 711</p>
          </div>
        </section>
      </div>
      
      <div className="mt-12 p-6 bg-muted rounded-lg text-center">
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;