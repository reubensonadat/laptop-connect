export interface Laptop {
  id: string;
  brand: string;
  model: string;
  processor: string;
  ram: string;
  storage: string;
  graphics?: string;
  display?: string;
  condition: string;
  price: number;
  availability: boolean;
  hasBacklight: boolean;
  hasFingerprint: boolean;
  hasWebcam: boolean;
  hasUsbC: boolean;
  hasHdmi: boolean;
  hasSdCardReader: boolean;
  hasNumericPad: boolean;
  operatingSystem?: string;
  weight?: number;
  batteryLife?: string;
  warranty?: string;
  material?: string;
  description?: string;
 imageUrls?: string | string[];
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  laptopId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  amount: number;
  paymentType: 'Full' | 'Half';
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface BuyerInfo {
  name: string;
  email: string;
  phone: string;
  deliveryLocation?: string;
  notes?: string;
  agreedToTerms: boolean;
}

export interface Filters {
  brand: string;
  ram: string;
  storage: string;
  condition: string;
  priceRange: [number, number];
  searchTerm: string;
}

export interface CourseConfig {
  name: string;
  description: string;
  requirements: string[];
  minRam: string;
  requiresSSD: boolean;
  requiresDedicatedGraphics: boolean;
  budgetRange: {
    min: number;
    max: number;
  };
}