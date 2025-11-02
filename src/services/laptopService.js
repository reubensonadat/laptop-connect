// Keep using your direct Google Sheets URL
const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQBk9tAiZGPr29OFv4jpD2rxyVd10lufJTvQTs3_-ZG1e7B0P1KoUqrjnOrijjoMCxYqLMRu0Rk71Cx/pub?output=csv';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache for storing fetched data
let cachedLaptops = null;
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
      row[header] = values[index] || '';
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

// Transform raw data to Laptop objects
const transformToLaptop = (rawData) => {
  return {
    id: rawData.id,
    brand: rawData.brand,
    model: rawData.model,
    processor: rawData.processor,
    ram: rawData.ram,
    storage: rawData.storage,
    graphics: rawData.graphics,
    display: rawData.display,
    condition: rawData.condition,
    price: convertToNumber(rawData.price) || 0,
    availability: convertToBoolean(rawData.availability),
    hasBacklight: convertToBoolean(rawData.hasBacklight),
    hasFingerprint: convertToBoolean(rawData.hasFingerprint),
    hasWebcam: convertToBoolean(rawData.hasWebcam),
    hasUsbC: convertToBoolean(rawData.hasUsbC),
    hasHdmi: convertToBoolean(rawData.hasHdmi),
    hasSdCardReader: convertToBoolean(rawData.hasSdCardReader),
    hasNumericPad: convertToBoolean(rawData.hasNumericPad),
    operatingSystem: rawData.operatingSystem,
    weight: convertToNumber(rawData.weight),
    batteryLife: convertToNumber(rawData.batteryLife),
    warranty: convertToNumber(rawData.warranty),
    material: rawData.material,
    description: rawData.description,
    imageUrls: parseImageUrls(rawData.imageUrls) || '',
    createdAt: rawData.createdAt,
    updatedAt: rawData.updatedAt,
  };
};

// Fetch data from Google Sheets
const fetchCSVData = async () => {
  const response = await fetch(GOOGLE_SHEETS_CSV_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch laptops: ${response.status} ${response.statusText}`);
  }
  return response.text();
};

// Main service functions
export const fetchLaptops = async () => {
  try {
    // Check if we have valid cached data
    const now = Date.now();
    if (cachedLaptops && (now - cacheTimestamp) < CACHE_DURATION) {
      console.log('Using cached laptops data');
      return cachedLaptops;
    }
    
    // Fetch and parse new data
    console.log('Fetching new laptops data');
    const csvData = await fetchCSVData();
    const rawData = parseCSV(csvData);
    const laptops = rawData.map(transformToLaptop);
    
    // Update cache
    cachedLaptops = laptops;
    cacheTimestamp = now;
    
    console.log('Processed laptops:', laptops);
    return laptops;
  } catch (error) {
    console.error('Error fetching laptops:', error);
    // Return cached data if available, even if expired
    return cachedLaptops || [];
  }
};

export const getLaptopById = async (id) => {
  try {
    const laptops = await fetchLaptops();
    return laptops.find(laptop => laptop.id === id) || null;
  } catch (error) {
    console.error(`Error fetching laptop with ID ${id}:`, error);
    return null;
  }
};

export const refreshLaptops = async () => {
  try {
    const csvData = await fetchCSVData();
    const rawData = parseCSV(csvData);
    const laptops = rawData.map(transformToLaptop);
    
    // Update cache
    cachedLaptops = laptops;
    cacheTimestamp = Date.now();
    
    return laptops;
  } catch (error) {
    console.error('Error refreshing laptops:', error);
    return cachedLaptops || [];
  }
};