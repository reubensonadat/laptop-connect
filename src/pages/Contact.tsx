import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real implementation, you would send this data to your backend
    // For this example, we'll simulate a submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Your message has been sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Laptop Connect | Get in Touch with Our Team</title>
        <meta name="description" content="Contact Laptop Connect for all your laptop needs in Ghana. Reach out via phone, email, WhatsApp, or visit our store in Accra. We're here to help you find the perfect laptop." />
        <meta name="keywords" content="contact laptop connect, laptop support ghana, laptop store contact, laptop accra, customer service" />
        <link rel="canonical" href="https://laptopconnect.com/contact" />
      </Helmet>
      
      <div className="container px-4 py-8 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-6 text-center">
            Contact Us
          </h1>
          
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have questions about our laptops or need help finding the perfect one for your course? 
            We're here to help! Get in touch with us through any of the following methods.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+233 201 534 711</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">laptopconnect@gmail.com</p>
                    <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground">Accra, Ghana</p>
                    <p className="text-sm text-muted-foreground">By appointment only</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">WhatsApp</h3>
                    <a 
                      href="https://wa.me/233201534711" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Chat with us on WhatsApp
                    </a>
                    <p className="text-sm text-muted-foreground">Quick responses available</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9am - 5pm</p>
                    <p className="text-muted-foreground">Saturday: 10am - 2pm</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md bg-background"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md bg-background"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md bg-background"
                    placeholder="What is this about?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md bg-background"
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">How do I know which laptop is right for my course?</h3>
                <p className="text-muted-foreground">
                  Our intelligent recommendation system analyzes your course requirements and suggests 
                  laptops that meet those needs. Simply select your course from the dropdown on the home page.
                </p>
              </div>
              
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">Do you offer payment plans?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer a half-payment option where you can pay 50% upfront and the remaining 
                  50% upon delivery. This option is available for all laptops.
                </p>
              </div>
              
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">How long does delivery take?</h3>
                <p className="text-muted-foreground">
                  Delivery typically takes 2-3 business days within Accra and 3-5 business days for 
                  other regions in Ghana. You'll receive tracking information once your order is shipped.
                </p>
              </div>
              
              <div className="p-6 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">Do you provide warranty for your laptops?</h3>
                <p className="text-muted-foreground">
                  Yes, all our laptops come with a minimum 6-month warranty. Extended warranty options 
                  are available for purchase at checkout.
                </p>
              </div>
            </div>
          </div>
          
          {/* Response Time Section */}
          <div className="text-center p-8 bg-muted/30 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Response Time</h2>
            <p className="text-muted-foreground mb-4">
              We strive to respond to all inquiries as quickly as possible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-semibold">Email</div>
                <div className="text-muted-foreground">Within 24 hours</div>
              </div>
              <div>
                <div className="font-semibold">Phone</div>
                <div className="text-muted-foreground">During business hours</div>
              </div>
              <div>
                <div className="font-semibold">WhatsApp</div>
                <div className="text-muted-foreground">Within 2 hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;