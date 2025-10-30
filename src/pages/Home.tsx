import React, { useState, useEffect } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';
import { laptopService } from '../services/laptopService';
import { Laptop, Filters } from '../types';
import LaptopCard from '../components/LaptopCard';
import LaptopModal from '../components/LaptopModal';
import CourseRecommendation from '../components/CourseRecommendation';
import SearchFilter from '../components/SearchFilter';

const Home = () => {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [filteredLaptops, setFilteredLaptops] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    brand: '',
    ram: '',
    storage: '',
    condition: '',
    priceRange: [0, 12000], // Increased max price
    searchTerm: ''
  });

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const data = await laptopService.getLaptops();
        setLaptops(data);
        setFilteredLaptops(data);
      } catch (error) {
        console.error('Error fetching laptops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaptops();
  }, []);

  useEffect(() => {
    // Apply filters whenever they change
    let result = [...laptops];

    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(laptop => 
        laptop.brand.toLowerCase().includes(searchLower) ||
        laptop.model.toLowerCase().includes(searchLower) ||
        laptop.processor.toLowerCase().includes(searchLower) ||
        (laptop.description && laptop.description.toLowerCase().includes(searchLower))
      );
    }

    // Filter by brand
    if (filters.brand) {
      result = result.filter(laptop => laptop.brand === filters.brand);
    }

    // Filter by RAM - exact match
    if (filters.ram) {
      result = result.filter(laptop => laptop.ram === filters.ram);
    }

    // Filter by storage type - check if storage contains the selected type
    if (filters.storage) {
      result = result.filter(laptop => laptop.storage.includes(filters.storage));
    }

    // Filter by condition - exact match
    if (filters.condition) {
      result = result.filter(laptop => laptop.condition === filters.condition);
    }

    // Filter by price range
    result = result.filter(laptop => 
      laptop.price >= filters.priceRange[0] && 
      laptop.price <= filters.priceRange[1]
    );

    setFilteredLaptops(result);
  }, [filters, laptops]);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      ram: '',
      storage: '',
      condition: '',
      priceRange: [0, 12000], // Increased max price
      searchTerm: ''
    });
  };

  const openLaptopModal = (laptop: Laptop) => {
    setSelectedLaptop(laptop);
  };

  const closeModal = () => {
    setSelectedLaptop(null);
  };

  return (
    <div className="container px-4 py-8 md:px-6">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Find Your Perfect Laptop
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Discover laptops tailored to your academic needs with our intelligent recommendation system
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search by brand, model, or processor..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange({ searchTerm: e.target.value })}
          />
        </div>
        
        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted transition-colors"
        >
          <Filter className="h-4 w-4" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </section>

      {/* Course Recommendation Section */}
      <section className="mb-12">
        <CourseRecommendation 
          laptops={laptops} 
          onLaptopSelect={openLaptopModal}
        />
      </section>

      {/* Filters Section */}
      {showFilters && (
        <section className="mb-8">
          <SearchFilter 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
        </section>
      )}

      {/* Results Count */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          Available Laptops ({filteredLaptops.length})
        </h2>
      </div>

      {/* Laptops Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredLaptops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLaptops.map(laptop => (
            <LaptopCard 
              key={laptop.id} 
              laptop={laptop} 
              onClick={() => openLaptopModal(laptop)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No laptops found matching your criteria.
          </p>
          <button 
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Laptop Detail Modal */}
      {selectedLaptop && (
        <LaptopModal 
          laptop={selectedLaptop} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

export default Home;