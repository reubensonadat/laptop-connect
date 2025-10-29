import React from 'react';
import { Award, Users, Shield, Truck, Headphones, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="container px-4 py-8 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6 text-center">
          About LaptopConnect
        </h1>
        
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-center text-muted-foreground">
            Your trusted partner for finding the perfect laptop for your academic needs. 
            We specialize in providing high-quality laptops tailored to specific course requirements.
          </p>
        </div>
        
        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            At LaptopConnect, we believe every student deserves access to the right technology 
            to succeed in their academic journey. Our mission is to simplify the process of 
            finding the perfect laptop by providing personalized recommendations based on your 
            specific course requirements.
          </p>
          <p className="text-muted-foreground">
            We understand that different courses have different technical requirements, and 
            our intelligent recommendation system ensures you get a laptop that meets your 
            needs without breaking the bank.
          </p>
        </section>
        
        {/* Values Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-lg">
              <Award className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Quality</h3>
              <p className="text-sm text-muted-foreground">
                We only offer high-quality laptops from reputable brands that meet our strict standards.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-lg">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Customer Focus</h3>
              <p className="text-sm text-muted-foreground">
                Our customers are at the heart of everything we do. We're here to help you find the perfect laptop.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-muted/30 rounded-lg">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Trust</h3>
              <p className="text-sm text-muted-foreground">
                We build trust through transparency, quality products, and exceptional customer service.
              </p>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Truck className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Quick and reliable delivery to your location within Ghana.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Headphones className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Expert Support</h3>
                <p className="text-sm text-muted-foreground">
                  Our team is always ready to help you with any questions or concerns.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Award className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Quality Assurance</h3>
                <p className="text-sm text-muted-foreground">
                  All our laptops are tested and verified to ensure they meet our quality standards.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Heart className="h-6 w-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Customer Satisfaction</h3>
                <p className="text-sm text-muted-foreground">
                  We're committed to ensuring you're happy with your purchase.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Laptop Models</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">7</div>
              <div className="text-sm text-muted-foreground">Course Categories</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground mb-4 italic">
                "LaptopConnect helped me find the perfect laptop for my computer science course. 
                The recommendation system was spot on, and the delivery was fast. Highly recommend!"
              </p>
              <div className="font-semibold">Kwame Asante</div>
              <div className="text-sm text-muted-foreground">Computer Science Student</div>
            </div>
            
            <div className="p-6 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground mb-4 italic">
                "As a graphic design student, I needed a powerful laptop with dedicated graphics. 
                LaptopConnect found me the perfect option within my budget. Thank you!"
              </p>
              <div className="font-semibold">Ama Mensah</div>
              <div className="text-sm text-muted-foreground">Graphic Design Student</div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="text-center p-8 bg-muted/30 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have questions or need help finding the perfect laptop? We're here to help!
          </p>
          <a 
            href="mailto:laptopconnect@gmail.com" 
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;