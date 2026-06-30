CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price REAL NOT NULL,
  original_price REAL,
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  material_type TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  rating REAL DEFAULT 4.8,
  reviews INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  items JSONB NOT NULL,
  subtotal REAL NOT NULL,
  shipping INTEGER DEFAULT 2000,
  total REAL NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  order_status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS coupons (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT NOT NULL,
  discount_value REAL NOT NULL,
  min_order REAL DEFAULT 0,
  max_uses INTEGER,
  uses INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO products (id, name, slug, description, price, original_price, images, category, material_type, in_stock, featured, rating, reviews) VALUES
('1', 'Royal Damask - Gold Edition', 'royal-damask-gold', 'Premium damask fabric with intricate gold patterns', 5500, 7000, ARRAY['/products/damask-gold-1.jpg', '/products/damask-gold-2.jpg', '/products/damask-gold-3.jpg'], 'Fabric', 'fabric', true, true, 4.9, 124),
('2', 'Aba Ivory Lace', 'aba-ivory-lace', 'Beautiful beaded lace in ivory white', 8500, NULL, ARRAY['/products/lace-ivory-1.jpg', '/products/lace-ivory-2.jpg', '/products/lace-ivory-3.jpg'], 'Beaded Lace', 'beaded_lace', true, true, 4.8, 89),
('3', 'Senator Classic Blue', 'senator-classic-blue', 'Premium senator material in classic blue', 4500, 5500, ARRAY['/products/senator-blue-1.jpg', '/products/senator-blue-2.jpg', '/products/senator-blue-3.jpg'], 'Senator', 'senator', true, false, 4.7, 67),
('4', 'Cord Lace Deluxe', 'cord-lace-deluxe', 'Elegant cord lace for special occasions', 6500, NULL, ARRAY['/products/cord-lace-1.jpg', '/products/cord-lace-2.jpg', '/products/cord-lace-3.jpg'], 'Cord Lace', 'cord_lace', true, true, 4.8, 56),
('5', 'Plain Chiffon - Wine', 'plain-chiffon-wine', 'Soft plain chiffon in deep wine', 3000, NULL, ARRAY['/products/plain-wine-1.jpg', '/products/plain-wine-2.jpg'], 'Plain', 'plain', true, false, 4.6, 34),
('6', 'Patterned Silk - Ankara', 'patterned-silk-ankara', 'Vibrant patterned silk fabric', 4000, 5000, ARRAY['/products/patterned-ankara-1.jpg', '/products/patterned-ankara-2.jpg', '/products/patterned-ankara-3.jpg'], 'Patterned', 'patterned', true, false, 4.7, 45),
('7', 'Beaded Lace - Emerald', 'beaded-lace-emerald', 'Stunning beaded lace in emerald green', 9500, NULL, ARRAY['/products/beaded-emerald-1.jpg', '/products/beaded-emerald-2.jpg', '/products/beaded-emerald-3.jpg'], 'Beaded Lace', 'beaded_lace', true, true, 4.9, 78),
('8', 'Cord Lace - Royal Purple', 'cord-lace-royal-purple', 'Luxurious cord lace in royal purple', 7000, 8500, ARRAY['/products/cord-purple-1.jpg', '/products/cord-purple-2.jpg', '/products/cord-purple-3.jpg'], 'Cord Lace', 'cord_lace', true, false, 4.8, 42)
ON CONFLICT (id) DO NOTHING;
