import { useState } from 'react';

const CourseRecommendation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 'computer-science',
      name: 'Computer Science / IT',
      description: 'Powerful laptops for programming, development, and technical tasks',
      detailedDescription: 'Computer Science students need laptops that can handle coding, compiling, running virtual machines, and sometimes light gaming. Performance and multitasking capabilities are essential.',
      requirements: 'i5/Ryzen 5+, 8GB+ RAM, SSD preferred',
      detailedRequirements: 'Intel Core i5/i7 or AMD Ryzen 5/7 processor, 8GB+ RAM (16GB recommended), 256GB+ SSD, Full HD display, Good keyboard for long coding sessions',
      budgetRange: '₵3,500 - ₵8,000',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      recommendedLaptops: [
        { name: 'Dell XPS 15', reason: 'Excellent performance and build quality' },
        { name: 'MacBook Pro 13"', reason: 'Powerful M1/M2 chip with great battery life' },
        { name: 'HP Spectre x360', reason: 'Versatile 2-in-1 with strong performance' },
        { name: 'Lenovo ThinkPad X1', reason: 'Legendary keyboard and reliability' }
      ],
      color: 'blue'
    },
    {
      id: 'business',
      name: 'Business / Economics',
      description: 'Reliable laptops for business applications, presentations, and multitasking',
      detailedDescription: 'Business students need laptops that can handle productivity software, video conferencing, and multitasking. Portability and battery life are important for moving between classes.',
      requirements: 'i3/Ryzen 3+, 8GB RAM, SSD/HDD',
      detailedRequirements: 'Intel Core i3/i5 or AMD Ryzen 3/5 processor, 8GB+ RAM, 256GB+ storage, Good webcam and microphone, Long battery life',
      budgetRange: '₵2,500 - ₵5,000',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      recommendedLaptops: [
        { name: 'Dell Latitude 5420', reason: 'Business-focused with excellent security features' },
        { name: 'HP EliteBook 840', reason: 'Premium build with business-class features' },
        { name: 'Lenovo ThinkPad E14', reason: 'Reliable with great keyboard' },
        { name: 'Acer TravelMate P4', reason: 'Affordable with good performance' }
      ],
      color: 'green'
    },
    {
      id: 'graphic-design',
      name: 'Graphic Design / Arts',
      description: 'High-performance laptops with dedicated graphics for creative work',
      detailedDescription: 'Graphic design students need laptops with powerful processors, dedicated graphics, color-accurate displays, and sufficient RAM for running Adobe Creative Suite and other design software.',
      requirements: 'i5/Ryzen 5+, 16GB+ RAM, dedicated graphics',
      detailedRequirements: 'Intel Core i7 or AMD Ryzen 7 processor, 16GB+ RAM, Dedicated NVIDIA/AMD graphics, Color-accurate display (100% sRGB), 512GB+ SSD',
      budgetRange: '₵5,000 - ₵10,000',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      recommendedLaptops: [
        { name: 'MacBook Pro 16"', reason: 'Excellent color accuracy and performance' },
        { name: 'Dell XPS 17', reason: 'Stunning 4K display with powerful specs' },
        { name: 'ASUS ProArt StudioBook', reason: 'Designed specifically for creative professionals' },
        { name: 'HP Envy 16', reason: 'Great performance with color-accurate display' }
      ],
      color: 'purple'
    },
    {
      id: 'engineering',
      name: 'Engineering / Architecture',
      description: 'Workstation-grade laptops for CAD, simulation, and complex calculations',
      detailedDescription: 'Engineering students need powerful laptops that can run CAD software, simulations, and complex calculations. These laptops need dedicated graphics and plenty of RAM.',
      requirements: 'i7/Ryzen 7+, 16GB+ RAM, dedicated graphics required',
      detailedRequirements: 'Intel Core i7/i9 or AMD Ryzen 7/9 processor, 16GB+ RAM (32GB recommended), Professional-grade NVIDIA Quadro/RTX graphics, 1TB+ SSD',
      budgetRange: '₵6,000 - ₵12,000',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      recommendedLaptops: [
        { name: 'Dell Precision 5570', reason: 'Workstation performance in a mobile form factor' },
        { name: 'HP ZBook Studio', reason: 'Powerful workstation with ISV certification' },
        { name: 'Lenovo ThinkPad P1', reason: 'Thin and light with workstation power' },
        { name: 'MSI WS66', reason: 'Excellent performance for engineering software' }
      ],
      color: 'red'
    },
    {
      id: 'medicine',
      name: 'Medicine / Life Sciences',
      description: 'Lightweight, reliable laptops for research, notes, and medical applications',
      detailedDescription: 'Medical students need lightweight laptops with good battery life for long hospital rounds. They also need reliable performance for research, note-taking, and running medical software.',
      requirements: 'i5/Ryzen 5+, 8GB+ RAM, lightweight preferred',
      detailedRequirements: 'Intel Core i5/i7 or AMD Ryzen 5/7 processor, 8GB+ RAM, 256GB+ SSD, Lightweight design (under 1.5kg), 10+ hours battery life',
      budgetRange: '₵3,500 - ₵7,000',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      recommendedLaptops: [
        { name: 'MacBook Air M2', reason: 'Ultra-lightweight with excellent battery life' },
        { name: 'Dell XPS 13', reason: 'Compact and powerful with great display' },
        { name: 'HP Spectre x360 13', reason: 'Versatile 2-in-1 with premium build' },
        { name: 'Lenovo Yoga 7i', reason: 'Lightweight with good performance' }
      ],
      color: 'teal'
    },
    {
      id: 'law',
      name: 'Law / Humanities',
      description: 'Portable laptops for research, writing, and presentations',
      detailedDescription: 'Law students need portable laptops with good keyboards for extensive typing, reliable performance for research, and long battery life for long study sessions.',
      requirements: 'i3/Ryzen 3+, 8GB RAM, portable preferred',
      detailedRequirements: 'Intel Core i5 or AMD Ryzen 5 processor, 8GB+ RAM, 256GB+ SSD, Excellent keyboard, 10+ hours battery life, Lightweight design',
      budgetRange: '₵2,500 - ₵4,500',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      recommendedLaptops: [
        { name: 'Surface Laptop 4', reason: 'Premium build with excellent keyboard' },
        { name: 'HP Pavilion Aero', reason: 'Ultra-lightweight with good performance' },
        { name: 'ASUS ZenBook 14', reason: 'Compact with excellent screen' },
        { name: 'Acer Swift 3', reason: 'Great value with good performance' }
      ],
      color: 'amber'
    },
    {
      id: 'general',
      name: 'General Studies',
      description: 'Balanced laptops for everyday tasks, browsing, and entertainment',
      detailedDescription: 'General studies students need well-balanced laptops that can handle everyday tasks, web browsing, document editing, and light entertainment without breaking the bank.',
      requirements: 'i5/Ryzen 5+, 8GB RAM, balanced specs',
      detailedRequirements: 'Intel Core i5 or AMD Ryzen 5 processor, 8GB+ RAM, 256GB+ SSD, Full HD display, Good battery life',
      budgetRange: '₵3,000 - ₵6,000',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      recommendedLaptops: [
        { name: 'HP Pavilion 15', reason: 'Great balance of performance and price' },
        { name: 'Lenovo IdeaPad 5', reason: 'Solid performance with good features' },
        { name: 'Acer Aspire 5', reason: 'Affordable with good performance' },
        { name: 'ASUS VivoBook 15', reason: 'Stylish with good performance' }
      ],
      color: 'indigo'
    },
    {
      id: 'gaming',
      name: 'Gaming & Entertainment',
      description: 'High-performance laptops with dedicated graphics for gaming',
      detailedDescription: 'For students who want to game and study, these laptops offer powerful performance with dedicated graphics, high refresh rate displays, and advanced cooling systems.',
      requirements: 'i5/Ryzen 5+, 16GB+ RAM, dedicated graphics required',
      detailedRequirements: 'Intel Core i7/i9 or AMD Ryzen 7/9 processor, 16GB+ RAM, Dedicated NVIDIA RTX graphics, High refresh rate display (120Hz+), Advanced cooling',
      budgetRange: '₵5,500 - ₵12,000',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v1a2 2 0 11-4 0v-1a1 1 0 00-1-1H7a1 1 0 01-1-1V4a2 2 0 10-4 0v1a2 2 0 002 2h.01a2 2 0 002 2v1a2 2 0 104 0v-1a2 2 0 002-2H11z" />
        </svg>
      ),
      recommendedLaptops: [
        { name: 'ASUS ROG Strix', reason: 'Top-tier gaming performance' },
        { name: 'MSI GE76 Raider', reason: 'Powerful with excellent display' },
        { name: 'HP Omen 16', reason: 'Great performance with premium build' },
        { name: 'Lenovo Legion 5', reason: 'Excellent value for gaming' }
      ],
      color: 'pink'
    },
    {
      id: 'data-science',
      name: 'Data Science / Analytics',
      description: 'Powerful laptops for data processing, machine learning, and statistical analysis',
      detailedDescription: 'Data science students need powerful laptops with plenty of RAM for handling large datasets, strong processors for computations, and good displays for data visualization.',
      requirements: 'i7/Ryzen 7+, 16GB+ RAM, dedicated graphics preferred',
      detailedRequirements: 'Intel Core i7/i9 or AMD Ryzen 7/9 processor, 16GB+ RAM (32GB recommended), Dedicated graphics for GPU acceleration, 512GB+ SSD',
      budgetRange: '₵5,500 - ₵10,000',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      recommendedLaptops: [
        { name: 'MacBook Pro 16"', reason: 'Excellent performance with M1/M2 Pro/Max chips' },
        { name: 'Dell XPS 15', reason: 'Powerful with great display' },
        { name: 'Lenovo ThinkPad P1', reason: 'Workstation performance in a laptop' },
        { name: 'HP ZBook Studio', reason: 'Mobile workstation for data science' }
      ],
      color: 'cyan'
    }
  ];

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(selectedCourse?.id === course.id ? null : course);
  };

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      teal: 'bg-teal-100 text-teal-800 border-teal-200',
      amber: 'bg-amber-100 text-amber-800 border-amber-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200',
      cyan: 'bg-cyan-100 text-cyan-800 border-cyan-200'
    };
    return colorMap[color] || colorMap.blue;
  };

  const getIconBgColor = (color) => {
    const colorMap = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      red: 'bg-red-500',
      teal: 'bg-teal-500',
      amber: 'bg-amber-500',
      indigo: 'bg-indigo-500',
      pink: 'bg-pink-500',
      cyan: 'bg-cyan-500'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-4 sm:p-6 lg:p-8 mb-8 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center">
          <div className={`${getIconBgColor('blue')} text-white p-3 rounded-lg mr-4`}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Find Your Perfect Laptop</h2>
            <p className="text-sm sm:text-base text-secondary-gray">Select your course of study to see our recommendations</p>
          </div>
        </div>
        <button
          className="flex items-center text-primary-blue hover:text-blue-700 focus:outline-none font-medium text-sm sm:text-base"
          onClick={handleToggleExpand}
          aria-expanded={isExpanded}
        >
          <span className="mr-1 hidden sm:inline">{isExpanded ? 'Hide Recommendations' : 'Show Recommendations'}</span>
          <span className="mr-1 sm:hidden">{isExpanded ? 'Hide' : 'Show'}</span>
          <svg 
            className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="mt-6">
          {/* Course Categories */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {courses.map((course) => (
              <button
                key={course.id}
                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  selectedCourse?.id === course.id
                    ? getColorClasses(course.color)
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleCourseSelect(course)}
              >
                {course.name}
              </button>
            ))}
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border ${
                  selectedCourse?.id === course.id
                    ? 'ring-2 ring-primary-blue transform scale-105'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
                onClick={() => handleCourseSelect(course)}
              >
                <div className="flex items-center mb-4">
                  <div className={`${getIconBgColor(course.color)} bg-opacity-10 text-${course.color}-500 p-3 rounded-lg mr-3`}>
                    {course.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{course.name}</h3>
                </div>
                
                <p className="text-xs sm:text-sm text-secondary-gray mb-4">{course.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 mr-2 text-primary-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="text-xs font-medium text-gray-700">Requirements:</span>
                      <p className="text-xs text-secondary-gray">{course.requirements}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg className="w-4 h-4 mr-2 text-primary-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="text-xs font-medium text-gray-700">Budget:</span>
                      <p className="text-xs text-secondary-gray">{course.budgetRange}</p>
                    </div>
                  </div>
                </div>
                
                {/* Detailed information (shown when selected) */}
                {selectedCourse?.id === course.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                    <p className="text-xs text-secondary-gray mb-3">{course.detailedDescription}</p>
                    
                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-700 mb-1">Detailed Requirements:</p>
                      <p className="text-xs text-secondary-gray">{course.detailedRequirements}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-2">Recommended Models:</p>
                      <ul className="text-xs text-secondary-gray space-y-1">
                        {course.recommendedLaptops.map((laptop, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-3 h-3 mr-1 text-primary-blue mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                              <span className="font-medium">{laptop.name}</span>
                              <p className="text-gray-500">{laptop.reason}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseRecommendation;