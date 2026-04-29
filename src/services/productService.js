import mockProducts from './mockData';

// Cache for storing fetched data
let cachedProducts = mockProducts;
let cacheTimestamp = Date.now();

// Main service functions
export const fetchProducts = async () => {
    // Simulate network delay for that premium feel
    await new Promise(resolve => setTimeout(resolve, 300));
    return cachedProducts;
};

export const getProductById = async (id) => {
    const products = await fetchProducts();
    // Convert ID to string/number as needed to match mock data
    return products.find(product => String(product.id) === String(id)) || null;
};

export const refreshProducts = async () => {
    return cachedProducts;
};
