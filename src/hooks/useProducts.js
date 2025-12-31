import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../services/productService';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        category: '',
        brand: '',
        ram: '',
        storage: '',
        condition: '',
        minPrice: 0,
        maxPrice: 30000, // Increased max price for potentially expensive items
        searchTerm: '',
        sortBy: 'price-asc'
    });

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchProducts();
                setProducts(data);
                setFilteredProducts(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch products. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    const applyFilters = useCallback(() => {
        let filtered = [...products];

        // Apply search term filter
        if (filters.searchTerm) {
            const searchTerm = filters.searchTerm.toLowerCase();
            filtered = filtered.filter(product =>
                (product.brand && product.brand.toLowerCase().includes(searchTerm)) ||
                (product.model && product.model.toLowerCase().includes(searchTerm)) ||
                (product.category && product.category.toLowerCase().includes(searchTerm)) ||
                (product.processor && product.processor.toLowerCase().includes(searchTerm))
            );
        }

        // Apply category filter
        if (filters.category && filters.category !== 'All') {
            filtered = filtered.filter(product => {
                if (!product.category) return false;
                return product.category.toLowerCase() === filters.category.toLowerCase();
            });
        }

        // Apply brand filter
        if (filters.brand) {
            filtered = filtered.filter(product => product.brand === filters.brand);
        }

        // Apply RAM filter (only if product has ram)
        if (filters.brand && filters.ram) {
            filtered = filtered.filter(product => product.ram && product.ram.includes(filters.ram));
        }

        // Apply storage filter
        if (filters.storage) {
            filtered = filtered.filter(product => product.storage && product.storage.includes(filters.storage));
        }

        // Apply condition filter
        if (filters.condition) {
            filtered = filtered.filter(product => product.condition === filters.condition);
        }

        // Apply price range filter
        filtered = filtered.filter(product =>
            product.price >= filters.minPrice && product.price <= filters.maxPrice
        );

        // Sort products
        filtered.sort((a, b) => {
            if (filters.sortBy === 'price-asc') {
                return a.price - b.price;
            } else if (filters.sortBy === 'price-desc') {
                return b.price - a.price;
            } else if (filters.sortBy === 'newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return 0;
        });

        setFilteredProducts(filtered);
    }, [products, filters]);

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
            category: '',
            brand: '',
            ram: '',
            storage: '',
            condition: '',
            minPrice: 0,
            maxPrice: 30000,
            searchTerm: ''
        });
    };

    const getProductById = (id) => {
        return products.find(product => product.id === id);
    };

    // Keep recommendation logic but adapt/rename if needed. 
    // For now, it's specific to academic laptop needs, so we might want to ensure it only recommends laptops.
    const getRecommendedProducts = (course) => {
        let recommended = [...products];

        // Filter by availability and Category 'Laptop'
        recommended = recommended.filter(product =>
            product.availability &&
            (!product.category || product.category.toLowerCase() === 'laptop')
        );

        // Apply course-specific filters
        switch (course) {
            case 'Computer Science / IT':
                recommended = recommended.filter(product =>
                    (product.processor && (product.processor.includes('i5') || product.processor.includes('Ryzen 5') ||
                        product.processor.includes('i7') || product.processor.includes('Ryzen 7'))) &&
                    (product.ram && (product.ram.includes('8GB') || product.ram.includes('16GB') || product.ram.includes('32GB')))
                );
                break;
            case 'Business / Economics':
                recommended = recommended.filter(product =>
                    (product.processor && (product.processor.includes('i3') || product.processor.includes('Ryzen 3') ||
                        product.processor.includes('i5') || product.processor.includes('Ryzen 5'))) &&
                    (product.ram && product.ram.includes('8GB'))
                );
                break;
            case 'Graphic Design / Arts':
                recommended = recommended.filter(product =>
                    (product.processor && (product.processor.includes('i5') || product.processor.includes('Ryzen 5') ||
                        product.processor.includes('i7') || product.processor.includes('Ryzen 7'))) &&
                    (product.ram && (product.ram.includes('16GB') || product.ram.includes('32GB'))) &&
                    (product.graphics && (product.graphics.includes('NVIDIA') || product.graphics.includes('AMD') ||
                        product.graphics.includes('Radeon') || product.graphics.includes('GeForce')))
                );
                break;
            case 'Engineering / Architecture':
                recommended = recommended.filter(product =>
                    (product.processor && (product.processor.includes('i7') || product.processor.includes('Ryzen 7') ||
                        product.processor.includes('i9') || product.processor.includes('Ryzen 9'))) &&
                    (product.ram && (product.ram.includes('16GB') || product.ram.includes('32GB'))) &&
                    (product.graphics && (product.graphics.includes('NVIDIA') || product.graphics.includes('AMD') ||
                        product.graphics.includes('Radeon') || product.graphics.includes('GeForce')))
                );
                break;
            case 'Medicine / Life Sciences':
                recommended = recommended.filter(product =>
                    (product.processor && (product.processor.includes('i5') || product.processor.includes('Ryzen 5') ||
                        product.processor.includes('i7') || product.processor.includes('Ryzen 7'))) &&
                    (product.ram && (product.ram.includes('8GB') || product.ram.includes('16GB'))) &&
                    product.weight < 2.5
                );
                break;
            case 'Law / Humanities':
                recommended = recommended.filter(product =>
                    (product.processor && (product.processor.includes('i3') || product.processor.includes('Ryzen 3') ||
                        product.processor.includes('i5') || product.processor.includes('Ryzen 5'))) &&
                    (product.ram && product.ram.includes('8GB')) &&
                    product.weight < 2.5
                );
                break;
            case 'General Studies':
                recommended = recommended.filter(product =>
                    (product.processor && (product.processor.includes('i5') || product.processor.includes('Ryzen 5'))) &&
                    (product.ram && product.ram.includes('8GB'))
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
        products,
        filteredProducts,
        loading,
        error,
        filters,
        updateFilter,
        clearFilters,
        getProductById,
        getRecommendedProducts
    };
};
