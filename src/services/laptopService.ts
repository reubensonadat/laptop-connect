// services/laptopService.ts
import { Laptop } from '../types';

// Keep using your direct Google Sheets URL
const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQBk9tAiZGPr29OFv4jpD2rxyVd10lufJTvQTs3_-ZG1e7B0P1KoUqrjnOrijjoMCxYqLMRu0Rk71Cx/pub?output=csv';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache for storing fetched data
let cachedLaptops: Laptop[] | null = null;
let cacheTimestamp: number = 0;

// Interface for raw CSV data
interface RawLaptopData {
  [key: string]: string;
}

// Type conversion utilities
const convertToBoolean = (value: string | boolean): boolean => {
  if (typeof value === 'boolean') return value;
  return value === 'TRUE' || value === 'true';
};

const convertToNumber = (value: string | number | undefined): number | undefined => {
  if (value === undefined || value === '') return undefined;
  if (typeof value === 'number') return value;
  
  // Remove all commas and convert to number
  const cleanValue = String(value).replace(/,/g, '');
  const parsed = Number(cleanValue);
  return isNaN(parsed) ? undefined : parsed;
};

// CSV parsing utilities
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
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

const parseCSV = (csvText: string): RawLaptopData[] => {
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  if (lines.length === 0) return [];
  
  const headers = parseCSVLine(lines[0]);
  const data: RawLaptopData[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length !== headers.length) continue; // Skip malformed rows
    
    const row: RawLaptopData = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
    data.push(row);
  }
  
  return data;
};

// Transform raw data to Laptop objects
const transformToLaptop = (rawData: RawLaptopData): Laptop => {
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
    batteryLife: rawData.batteryLife,
    warranty: rawData.warranty,
    material: rawData.material,
    description: rawData.description,
    imageUrls: parseImageUrls(rawData.imageUrls),
    createdAt: rawData.createdAt,
    updatedAt: rawData.updatedAt,
  };
};

// Add this function to laptopService.ts
const parseImageUrls = (imageUrls: string | undefined): string | string[] | undefined => {
  if (!imageUrls) return undefined;
  
  // If it contains commas, split into an array
  if (imageUrls.includes(',')) {
    return imageUrls.split(',').map(url => url.trim());
  }
  
  return imageUrls;
};

// Fetch data from Google Sheets
const fetchCSVData = async (): Promise<string> => {
  const response = await fetch(GOOGLE_SHEETS_CSV_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch laptops: ${response.status} ${response.statusText}`);
  }
  return response.text();
};

// Main service functions
export const laptopService = {
  // Fetch all laptops from Google Sheets CSV with caching
  getLaptops: async (): Promise<Laptop[]> => {
    try {
      // Check if we have valid cached data
      const now = Date.now();
      if (cachedLaptops && (now - cacheTimestamp) < CACHE_DURATION) {
        return cachedLaptops;
      }
      
      // Fetch and parse new data
      const csvData = await fetchCSVData();
      const rawData = parseCSV(csvData);
      const laptops = rawData.map(transformToLaptop);
      
      // Update cache
      cachedLaptops = laptops;
      cacheTimestamp = now;
      
      return laptops;
    } catch (error) {
      console.error('Error fetching laptops:', error);
      // Return cached data if available, even if expired
      return cachedLaptops || [];
    }
  },

  // Get a single laptop by ID
  getLaptopById: async (id: string): Promise<Laptop | null> => {
    try {
      const laptops = await laptopService.getLaptops();
      return laptops.find(laptop => laptop.id === id) || null;
    } catch (error) {
      console.error(`Error fetching laptop with ID ${id}:`, error);
      return null;
    }
  },

  // Force refresh the cache
  refreshLaptops: async (): Promise<Laptop[]> => {
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
  }
};