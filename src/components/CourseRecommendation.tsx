import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { Laptop, CourseConfig } from '../types';
import { toast } from 'sonner';

interface CourseRecommendationProps {
  laptops: Laptop[];
  onLaptopSelect: (laptop: Laptop) => void;
}

const CourseRecommendation: React.FC<CourseRecommendationProps> = ({ 
  laptops, 
  onLaptopSelect 
}) => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [expanded, setExpanded] = useState(false);

  const courses: CourseConfig[] = [
    {
      name: 'Computer Science / IT',
      description: 'Programming, virtual machines, software development',
      requirements: ['i5/Ryzen 5+', '8GB+ RAM', 'SSD preferred'],
      minRam: '8GB',
      requiresSSD: true,
      requiresDedicatedGraphics: false,
      budgetRange: { min: 3500, max: 8000 }
    },
    {
      name: 'Business / Economics',
      description: 'Office applications, presentations, data analysis',
      requirements: ['i3/Ryzen 3+', '8GB RAM', 'SSD/HDD'],
      minRam: '8GB',
      requiresSSD: false,
      requiresDedicatedGraphics: false,
      budgetRange: { min: 2500, max: 5000 }
    },
    {
      name: 'Graphic Design / Arts',
      description: 'Adobe Creative Suite, video editing, 3D modeling',
      requirements: ['i5/Ryzen 5+', '16GB+ RAM', 'Dedicated graphics'],
      minRam: '16GB',
      requiresSSD: true,
      requiresDedicatedGraphics: true,
      budgetRange: { min: 5000, max: 10000 }
    },
    {
      name: 'Engineering / Architecture',
      description: 'CAD software, simulations, 3D modeling',
      requirements: ['i7/Ryzen 7+', '16GB+ RAM', 'Dedicated graphics required'],
      minRam: '16GB',
      requiresSSD: true,
      requiresDedicatedGraphics: true,
      budgetRange: { min: 6000, max: 12000 }
    },
    {
      name: 'Medicine / Life Sciences',
      description: 'Research software, medical applications',
      requirements: ['i5/Ryzen 5+', '8GB+ RAM', 'Lightweight preferred'],
      minRam: '8GB',
      requiresSSD: true,
      requiresDedicatedGraphics: false,
      budgetRange: { min: 3500, max: 7000 }
    },
    {
      name: 'Law / Humanities',
      description: 'Legal research, document management, writing',
      requirements: ['i3/Ryzen 3+', '8GB RAM', 'Portable preferred'],
      minRam: '8GB',
      requiresSSD: false,
      requiresDedicatedGraphics: false,
      budgetRange: { min: 2500, max: 4500 }
    },
    {
      name: 'General Studies',
      description: 'General coursework, multimedia, future flexibility',
      requirements: ['i5/Ryzen 5+', '8GB RAM', 'Balanced specs'],
      minRam: '8GB',
      requiresSSD: true,
      requiresDedicatedGraphics: false,
      budgetRange: { min: 3000, max: 6000 }
    }
  ];

  const getRecommendations = (courseName: string): Laptop[] => {
    const course = courses.find(c => c.name === courseName);
    if (!course) return [];

    return laptops
      .filter(laptop => {
        // Check if laptop is available
        if (!laptop.availability) return false;
        
        // Check if laptop is within budget
        if (laptop.price < course.budgetRange.min || laptop.price > course.budgetRange.max) return false;
        
        // Check RAM requirement
        const laptopRamGB = parseInt(laptop.ram.replace('GB', ''));
        const minRamGB = parseInt(course.minRam.replace('GB', ''));
        if (laptopRamGB < minRamGB) return false;
        
        // Check SSD requirement
        if (course.requiresSSD && !laptop.storage.includes('SSD')) return false;
        
        // Check dedicated graphics requirement
        if (course.requiresDedicatedGraphics && !laptop.graphics) return false;
        
        return true;
      })
      .sort((a, b) => a.price - b.price)
      .slice(0, 6);
  };

  const handleCourseSelect = (courseName: string) => {
    setSelectedCourse(courseName);
    const recommendations = getRecommendations(courseName);
    
    if (recommendations.length === 0) {
      toast.info('No laptops found matching your course requirements. Try adjusting your filters.');
    } else {
      toast.success(`Found ${recommendations.length} laptops for ${courseName}`);
    }
  };

  const recommendedLaptops = selectedCourse ? getRecommendations(selectedCourse) : [];

  return (
    <div className="bg-muted/30 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Course-Based Recommendations</h2>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 rounded-md hover:bg-muted transition-colors"
        >
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>
      
      {expanded && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select your course to get personalized laptop recommendations based on your academic needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map(course => (
              <div 
                key={course.name}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedCourse === course.name 
                    ? 'border-primary bg-primary/5' 
                    : 'hover:bg-muted'
                }`}
                onClick={() => handleCourseSelect(course.name)}
              >
                <h3 className="font-semibold mb-1">{course.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                <div className="text-xs">
                  <div className="mb-1">Budget: ₵{course.budgetRange.min.toLocaleString()} - ₵{course.budgetRange.max.toLocaleString()}</div>
                  <div className="space-y-1">
                    {course.requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {recommendedLaptops.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">
                Recommended Laptops for {selectedCourse}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedLaptops.map(laptop => (
                  <div 
                    key={laptop.id}
                    className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onLaptopSelect(laptop)}
                  >
                    <div className="aspect-video bg-muted rounded-md mb-3 flex items-center justify-center">
                      {laptop.imageUrls ? (
                        <img 
                          src={laptop.imageUrls} 
                          alt={`${laptop.brand} ${laptop.model}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <div className="text-muted-foreground">No Image</div>
                      )}
                    </div>
                    <h4 className="font-semibold">{laptop.brand} {laptop.model}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{laptop.processor}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">
                        ₵{laptop.price.toLocaleString()}
                      </span>
                      <button className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseRecommendation;