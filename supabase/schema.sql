-- ============================================
-- TECHCORE (LAPTOP CONNECT) - SCHEMA
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Storage Bucket for Products
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Admin can upload product images" ON storage.objects;
CREATE POLICY "Admin can upload product images"
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Admin can delete product images" ON storage.objects;
CREATE POLICY "Admin can delete product images"
ON storage.objects FOR DELETE USING (bucket_id = 'product-images');

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO public.categories (name, slug, display_order) VALUES
('Laptops', 'laptops', 1),
('Phones', 'phones', 2),
('Watches', 'watches', 3),
('Accessories', 'accessories', 4)
ON CONFLICT (name) DO NOTHING;

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    price DECIMAL(12, 2) NOT NULL CHECK (price >= 0),
    cost_price DECIMAL(12, 2) DEFAULT 0 CHECK (cost_price >= 0),
    condition TEXT CHECK (condition IN ('NEW', 'REFURBISHED', 'USED', 'UK_USED')),
    availability BOOLEAN DEFAULT TRUE,
    specs JSONB DEFAULT '{}'::jsonb, -- Store dynamic tech specs like RAM, Processor, etc.
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PRODUCT IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0
);

-- 4. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    customer_name TEXT, 
    customer_phone TEXT,
    total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    delivery_method TEXT DEFAULT 'delivery',
    delivery_location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(12, 2) NOT NULL,
    unit_cost DECIMAL(12, 2) NOT NULL DEFAULT 0 
);

-- RLS Policies
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- PUBLIC SELECTS
DROP POLICY IF EXISTS "Public view categories" ON public.categories;
CREATE POLICY "Public view categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public view products" ON public.products;
CREATE POLICY "Public view products" ON public.products FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public view product images" ON public.product_images;
CREATE POLICY "Public view product images" ON public.product_images FOR SELECT USING (true);

-- ADMIN POLICIES
DROP POLICY IF EXISTS "Admin full access categories" ON public.categories;
CREATE POLICY "Admin full access categories" ON public.categories FOR ALL USING (true);

DROP POLICY IF EXISTS "Admin full access products" ON public.products;
CREATE POLICY "Admin full access products" ON public.products FOR ALL USING (true);

DROP POLICY IF EXISTS "Admin full access product images" ON public.product_images;
CREATE POLICY "Admin full access product images" ON public.product_images FOR ALL USING (true);

DROP POLICY IF EXISTS "Admin full access customers" ON public.customers;
CREATE POLICY "Admin full access customers" ON public.customers FOR ALL USING (true);

DROP POLICY IF EXISTS "Admin full access orders" ON public.orders;
CREATE POLICY "Admin full access orders" ON public.orders FOR ALL USING (true);

DROP POLICY IF EXISTS "Admin full access order_items" ON public.order_items;
CREATE POLICY "Admin full access order_items" ON public.order_items FOR ALL USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON public.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
