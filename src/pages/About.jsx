import { useEffect } from 'react';
import { scrollToTop } from '../utils/helpers';

const About = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const stats = [
    { number: "100+", label: "Laptops Sold" },
    { number: "2025", label: "Year Founded" },
    { number: "24/7", label: "Support Available" },
    { number: "100%", label: "Customer Satisfaction" }
  ];

  const milestones = [
    { year: "2025", title: "Founded", description: "Started our journey to provide quality laptops in Ghana" },
    { year: "2025", title: "First 100 Sales", description: "Reached our first milestone of 100 laptops sold" },
    { year: "2025", title: "Growing", description: "Expanding our product range and customer base" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-blue to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Laptop Connect</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your trusted partner for quality laptops in Ghana since 2025
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-white text-primary-blue font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </button>
              <button 
                onClick={() => window.location.href = '/contact'}
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-blue transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 180 60 240 45C300 30 360 30 420 45C480 60 540 90 600 105C660 120 720 120 780 105C840 90 900 60 960 45C1020 30 1080 30 1140 45C1200 60 1260 90 1320 105C1380 120 1440 120 1440 120V120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-blue mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
              <div className="w-20 h-1 bg-primary-blue mx-auto mb-6"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  Laptop Connect was founded in 2025 with a simple mission: to provide Ghanaian students and professionals with access to quality laptops at affordable prices. We understand that a reliable laptop is essential for academic success and professional growth in today's digital world.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  Though we're a young company, we've already helped over 100 customers find the perfect laptop for their specific needs. Our team of tech experts carefully selects each laptop in our inventory to ensure it meets the highest standards of performance and reliability.
                </p>
                <p className="text-lg text-gray-700">
                  We're committed to providing not just products, but complete solutions that include personalized recommendations, flexible payment options, and exceptional customer service.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://via.placeholder.com/500x400/2563eb/ffffff?text=Our+Journey" 
                  alt="Our Story" 
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary-blue text-white p-4 rounded-lg shadow-lg">
                  <p className="font-semibold">Founded in 2025</p>
                  <p className="text-sm">Growing Fast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-blue text-white p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-700">
                  Our mission is to bridge the digital divide in Ghana by making quality laptops accessible to everyone. We believe that technology should empower, not hinder, educational and professional pursuits.
                </p>
                <p className="text-gray-700 mt-4">
                  We're committed to providing not just products, but complete solutions that include personalized recommendations, flexible payment options, and exceptional customer service.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-success-green text-white p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-700">
                  Our vision is to become Ghana's most trusted laptop retailer, known for our quality products, competitive prices, and customer-centric approach.
                </p>
                <p className="text-gray-700 mt-4">
                  We aim to expand our reach across the country and establish partnerships with educational institutions to support digital learning initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <div className="w-20 h-1 bg-primary-blue mx-auto mb-6"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Quality', desc: 'We never compromise on quality' },
                { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Affordability', desc: 'Competitive prices for everyone' },
                { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'Customer Service', desc: 'You are at the heart of everything' },
                { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Integrity', desc: 'Honest and transparent business' }
              ].map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-primary-blue bg-opacity-10 text-primary-blue p-3 rounded-lg inline-block mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <div className="w-20 h-1 bg-primary-blue mx-auto mb-6"></div>
              <p className="text-gray-600">Our milestones so far</p>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-blue"></div>
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                    <div className={`inline-block ${index % 2 === 0 ? 'ml-auto' : ''}`}>
                      <div className="bg-primary-blue text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-1/2 flex justify-center">
                    <div className={`w-4 h-4 bg-primary-blue rounded-full border-4 border-white ${index % 2 === 0 ? 'ml-auto' : ''}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-blue to-blue-600 text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Laptop?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join our growing family of satisfied customers who trust Laptop Connect
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 bg-white text-primary-blue font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Our Collection
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;