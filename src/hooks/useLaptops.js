import { useState, useEffect, useCallback } from 'react';
import { fetchLaptops } from '../services/laptopService';

export const useLaptops = () => {
  const [laptops, setLaptops] = useState([]);
  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    brand: '',
    ram: '',
    storage: '',
    condition: '',
    minPrice: 0,
    maxPrice: 10000,
    searchTerm: ''
  });

  useEffect(() => {
    const getLaptops = async () => {
      try {
        setLoading(true);
        const data = await fetchLaptops();
        setLaptops(data);
        setFilteredLaptops(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch laptops. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getLaptops();
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...laptops];

    // Apply search term filter
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(laptop => 
        (laptop.brand && laptop.brand.toLowerCase().includes(searchTerm)) ||
        (laptop.model && laptop.model.toLowerCase().includes(searchTerm)) ||
        (laptop.processor && laptop.processor.toLowerCase().includes(searchTerm))
      );
    }

    // Apply brand filter
    if (filters.brand) {
      filtered = filtered.filter(laptop => laptop.brand === filters.brand);
    }

    // Apply RAM filter
    if (filters.ram) {
      filtered = filtered.filter(laptop => laptop.ram && laptop.ram.includes(filters.ram));
    }

    // Apply storage filter
    if (filters.storage) {
      filtered = filtered.filter(laptop => laptop.storage && laptop.storage.includes(filters.storage));
    }

    // Apply condition filter
    if (filters.condition) {
      filtered = filtered.filter(laptop => laptop.condition === filters.condition);
    }

    // Apply price range filter
    filtered = filtered.filter(laptop => 
      laptop.price >= filters.minPrice && laptop.price <= filters.maxPrice
    );

    // Sort by price (low to high)
    filtered.sort((a, b) => a.price - b.price);

    setFilteredLaptops(filtered);
  }, [laptops, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      ram: '',
      storage: '',
      condition: '',
      minPrice: 0,
      maxPrice: 10000,
      searchTerm: ''
    });
  };

  const getLaptopById = (id) => {
    return laptops.find(laptop => laptop.id === id);
  };

  const getRecommendedLaptops = (course) => {
    let recommended = [...laptops];

    // Filter by availability
    recommended = recommended.filter(laptop => laptop.availability);

    // Apply course-specific filters
    switch (course) {
      case 'Computer Science / IT':
        recommended = recommended.filter(laptop => 
          (laptop.processor && (laptop.processor.includes('i5') || laptop.processor.includes('Ryzen 5') || 
           laptop.processor.includes('i7') || laptop.processor.includes('Ryzen 7'))) &&
          (laptop.ram && (laptop.ram.includes('8GB') || laptop.ram.includes('16GB') || laptop.ram.includes('32GB')))
        );
        break;
      case 'Business / Economics':
        recommended = recommended.filter(laptop => 
          (laptop.processor && (laptop.processor.includes('i3') || laptop.processor.includes('Ryzen 3') || 
           laptop.processor.includes('i5') || laptop.processor.includes('Ryzen 5'))) &&
          (laptop.ram && laptop.ram.includes('8GB'))
        );
        break;
      case 'Graphic Design / Arts':
        recommended = recommended.filter(laptop => 
          (laptop.processor && (laptop.processor.includes('i5') || laptop.processor.includes('Ryzen 5') || 
           laptop.processor.includes('i7') || laptop.processor.includes('Ryzen 7'))) &&
          (laptop.ram && (laptop.ram.includes('16GB') || laptop.ram.includes('32GB'))) &&
          (laptop.graphics && (laptop.graphics.includes('NVIDIA') || laptop.graphics.includes('AMD') || 
           laptop.graphics.includes('Radeon') || laptop.graphics.includes('GeForce')))
        );
        break;
      case 'Engineering / Architecture':
        recommended = recommended.filter(laptop => 
          (laptop.processor && (laptop.processor.includes('i7') || laptop.processor.includes('Ryzen 7') || 
           laptop.processor.includes('i9') || laptop.processor.includes('Ryzen 9'))) &&
          (laptop.ram && (laptop.ram.includes('16GB') || laptop.ram.includes('32GB'))) &&
          (laptop.graphics && (laptop.graphics.includes('NVIDIA') || laptop.graphics.includes('AMD') || 
           laptop.graphics.includes('Radeon') || laptop.graphics.includes('GeForce')))
        );
        break;
      case 'Medicine / Life Sciences':
        recommended = recommended.filter(laptop => 
          (laptop.processor && (laptop.processor.includes('i5') || laptop.processor.includes('Ryzen 5') || 
           laptop.processor.includes('i7') || laptop.processor.includes('Ryzen 7'))) &&
          (laptop.ram && (laptop.ram.includes('8GB') || laptop.ram.includes('16GB'))) &&
          laptop.weight < 2.5
        );
        break;
      case 'Law / Humanities':
        recommended = recommended.filter(laptop => 
          (laptop.processor && (laptop.processor.includes('i3') || laptop.processor.includes('Ryzen 3') || 
           laptop.processor.includes('i5') || laptop.processor.includes('Ryzen 5'))) &&
          (laptop.ram && laptop.ram.includes('8GB')) &&
          laptop.weight < 2.5
        );
        break;
      case 'General Studies':
        recommended = recommended.filter(laptop => 
          (laptop.processor && (laptop.processor.includes('i5') || laptop.processor.includes('Ryzen 5'))) &&
          (laptop.ram && laptop.ram.includes('8GB'))
        );
        break;
      default:
        break;
    }

    // Sort by price (low to high)
    recommended.sort((a, b) => a.price - b.price);

    // Limit to 6 results
    return recommended.slice(0, 6);
  };

  return {
    laptops,
    filteredLaptops,
    loading,
    error,
    filters,
    updateFilter,
    clearFilters,
    getLaptopById,
    getRecommendedLaptops
  };
};