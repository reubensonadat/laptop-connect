// Keep using your direct Google Sheets URL
const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQBk9tAiZGPr29OFv4jpD2rxyVd10lufJTvQTs3_-ZG1e7B0P1KoUqrjnOrijjoMCxYqLMRu0Rk71Cx/pub?output=csv';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache for storing fetched data
let cachedProducts = null;
let cacheTimestamp = 0;

// Type conversion utilities
const convertToBoolean = (value) => {
    if (typeof value === 'boolean') return value;
    return value === 'TRUE' || value === 'true';
};

const convertToNumber = (value) => {
    if (value === undefined || value === '') return undefined;
    if (typeof value === 'number') return value;

    // Remove all commas and convert to number
    const cleanValue = String(value).replace(/,/g, '');
    const parsed = Number(cleanValue);
    return isNaN(parsed) ? undefined : parsed;
};

// CSV parsing utilities
const parseCSVLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            // Handle escaped quotes
            if (i + 1 < line.length && line[i + 1] === '"') {
                current += '"';
                i++; // Skip the next quote
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current);
    return result;
};

const parseCSV = (csvText) => {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) return [];

    const headers = parseCSVLine(lines[0]);
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length !== headers.length) continue; // Skip malformed rows

        const row = {};
        headers.forEach((header, index) => {
            // Normalize header to lowercase for consistent access if needed, 
            // but keeping it as is to match sheet exactly for now.
            const cleanHeader = header.trim();
            row[cleanHeader] = values[index] || '';
        });

        data.push(row);
    }

    return data;
};

// Parse image URLs
const parseImageUrls = (imageUrls) => {
    if (!imageUrls) return '';

    // If it's already a string, return it
    if (typeof imageUrls === 'string') {
        return imageUrls;
    }

    // If it's an array, join it back into a string
    if (Array.isArray(imageUrls)) {
        return imageUrls.join(',');
    }

    // For any other type, convert to string
    return String(imageUrls);
};

// Transform raw data to Product objects
const transformToProduct = (rawData) => {
    // Helper to safely parse booleans
    const convertToBoolean = (val) => {
        if (typeof val === 'boolean') return val;
        return String(val).toUpperCase() === 'TRUE';
    };

    // Helper to safely parse array helper
    const parseImageUrls = (val) => {
        if (!val) return [];
        if (Array.isArray(val)) return val;
        return String(val).split(',').map(item => item.trim());
    };

    // Core fields that represent the main product identity
    const coreFields = [
        'id', 'category', 'Category', 'brand', 'Brand', 'model', 'Model',
        'price', 'Price', 'availability', 'Availability', 'condition', 'Condition',
        'description', 'Description', 'imageUrls', 'ImageUrls',
        'createdAt', 'updatedAt', 'name', 'Name', 'type', 'Type'
    ];

    // Try to determine category
    let category = 'Laptop'; // Default
    if (rawData.category || rawData.Category) {
        category = rawData.category || rawData.Category;
    } else if (rawData.type || rawData.Type) {
        category = rawData.type || rawData.Type;
    }

    // Create the base product object
    const product = {
        id: rawData.id || `P${Math.random().toString(36).substr(2, 9)}`,
        category: category,
        brand: rawData.brand || rawData.Brand || 'Generic',
        model: rawData.model || rawData.Model || '',
        price: convertToNumber(rawData.price || rawData.Price) || 0,
        availability: convertToBoolean(rawData.availability || rawData.Availability),
        condition: rawData.condition || rawData.Condition || 'Used',
        description: rawData.description || rawData.Description || '',
        imageUrls: parseImageUrls(rawData.imageUrls || rawData.ImageUrls),
        createdAt: rawData.createdAt || new Date().toISOString(),
        updatedAt: rawData.updatedAt || new Date().toISOString(),
        // Collection for all other specification fields
        specs: {}
    };

    // Construct a display name if not explicitly provided
    product.name = rawData.name || rawData.Name || `${product.brand} ${product.model}`.trim();

    // Iterate over all keys in the input data
    Object.keys(rawData).forEach(key => {
        // Skip core fields (case insensitive check)
        if (coreFields.some(field => field.toLowerCase() === key.toLowerCase())) return;

        // Skip empty values
        const value = rawData[key];
        if (value === null || value === undefined || value === '' || value === 'NULL') return;

        // Add to specs object
        product.specs[key] = value;

        // Also keep them at top level for backward compatibility
        product[key] = value;
    });

    return product;
};

// Fetch data from Google Sheets
const fetchCSVData = async () => {
    // In a real scenario, you might want to fetch different sheets for different categories 
    // or one big sheet. Assuming one big sheet for now.
    const response = await fetch(GOOGLE_SHEETS_CSV_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }
    return response.text();
};

// Main service functions
export const fetchProducts = async () => {
    try {
        // Check if we have valid cached data
        const now = Date.now();
        if (cachedProducts && (now - cacheTimestamp) < CACHE_DURATION) {
            console.log('Using cached products data');
            return cachedProducts;
        }

        // Fetch and parse new data
        console.log('Fetching new products data');
        const csvData = await fetchCSVData();
        const rawData = parseCSV(csvData);
        const products = rawData.map(transformToProduct);

        // Update cache
        cachedProducts = products;
        cacheTimestamp = now;

        console.log('Processed products:', products);
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        // Return cached data if available, even if expired
        return cachedProducts || [];
    }
};

export const getProductById = async (id) => {
    try {
        const products = await fetchProducts();
        return products.find(product => product.id === id) || null;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        return null;
    }
};

export const refreshProducts = async () => {
    try {
        const csvData = await fetchCSVData();
        const rawData = parseCSV(csvData);
        const products = rawData.map(transformToProduct);

        // Update cache
        cachedProducts = products;
        cacheTimestamp = Date.now();

        return products;
    } catch (error) {
        console.error('Error refreshing products:', error);
        return cachedProducts || [];
    }
};
