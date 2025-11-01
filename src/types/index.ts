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

// Add these interfaces to your existing types file

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    reference: string;
    amount: number;
    currency: string;
    transaction_date: string;
    status: string;
    payment_type: string;
    domain: string;
    gateway_response: string;
    plan: any;
    plan_object: any;
    paid_at: string;
    created_at: string;
    channel: string;
    ip_address: string;
    fees: number;
    fees_split: any;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: any;
    };
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      customer_code: string;
      phone: string;
      metadata: any;
      risk_action: string;
      international_format_phone: any;
    };
    subaccount: any;
    split: any;
    order_id: string;
    paidAt: string;
    createdAt: string;
    requested_amount: number;
    transaction: any;
  };
}

export interface PaymentVerificationResponse {
  status: boolean;
  message: string;
  data: PaystackResponse['data'];
}