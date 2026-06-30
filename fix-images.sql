-- Fix image paths to match actual files in public/products/

-- Product 1: Damask (was "Royal Damask - Gold Edition")
UPDATE products SET 
  name = 'Damask',
  slug = 'damask',
  description = 'Premium damask fabric, perfect for traditional ceremonies, owambe, and special occasions. Rich texture and elegant finish.',
  price = 5000,
  original_price = NULL,
  images = ARRAY['/products/damask-1.jpg', '/products/damask-2.jpg', '/products/damask-3.jpg', '/products/damask-4.jpg', '/products/damask-5.jpg', '/products/damask-6.jpg', '/products/damask-7.jpg', '/products/damask-8.jpg', '/products/damask-9.jpg'],
  category = 'Fabric',
  material_type = 'fabric',
  featured = true
WHERE id = '1';

-- Product 2: Velvet Beaded Lace (was "Aba Ivory Lace")
UPDATE products SET 
  name = 'Velvet Beaded Lace',
  slug = 'velvet-beaded-lace',
  description = 'Luxurious velvet beaded lace with intricate beadwork. Ideal for wedding outfits and high-end fashion.',
  price = 12000,
  original_price = NULL,
  images = ARRAY['/products/velvet-beaded-1.jpg', '/products/velvet-beaded-2.jpg', '/products/velvet-beaded-3.jpg', '/products/velvet-beaded-4.jpg', '/products/velvet-beaded-5.jpg', '/products/velvet-beaded-6.jpg', '/products/velvet-beaded-7.jpg', '/products/velvet-beaded-8.jpg', '/products/velvet-beaded-9.jpg', '/products/velvet-beaded-10.jpg', '/products/velvet-beaded-11.jpg', '/products/velvet-beaded-12.jpg', '/products/velvet-beaded-13.jpg'],
  category = 'Beaded Lace',
  material_type = 'beaded lace',
  featured = true
WHERE id = '2';

-- Product 3: Luxury Beaded Lace (was "Senator Classic Blue")
UPDATE products SET 
  name = 'Luxury Beaded Lace',
  slug = 'luxury-beaded-lace',
  description = 'Top-tier luxury beaded lace for exclusive occasions. Exquisite craftsmanship and premium quality.',
  price = 20000,
  original_price = NULL,
  images = ARRAY['/products/luxury-beaded-1.jpg', '/products/luxury-beaded-2.jpg', '/products/luxury-beaded-3.jpg', '/products/luxury-beaded-4.jpg', '/products/luxury-beaded-5.jpg', '/products/luxury-beaded-6.jpg', '/products/luxury-beaded-7.jpg', '/products/luxury-beaded-8.jpg', '/products/luxury-beaded-9.jpg', '/products/luxury-beaded-10.jpg', '/products/luxury-beaded-11.jpg', '/products/luxury-beaded-12.jpg', '/products/luxury-beaded-13.jpg'],
  category = 'Beaded Lace',
  material_type = 'beaded lace',
  featured = true
WHERE id = '3';

-- Product 4: Senator (was "Cord Lace Deluxe") - keep as cord lace since cord lace exists
UPDATE products SET 
  name = 'Cord Lace',
  slug = 'cord-lace',
  description = 'Beautiful cord lace fabric, perfect for traditional and ceremonial outfits. Elegant design and premium quality.',
  price = 6500,
  original_price = NULL,
  images = ARRAY['/products/cord-lace-1.jpg', '/products/cord-lace-2.jpg', '/products/cord-lace-3.jpg', '/products/cord-lace-4.jpg', '/products/cord-lace-5.jpg'],
  category = 'Cord Lace',
  material_type = 'cord lace',
  featured = true
WHERE id = '4';

-- Product 5: Jonkoso (was "Plain Chiffon - Wine")
UPDATE products SET 
  name = 'Jonkoso',
  slug = 'jonkoso',
  description = 'Classic senator material for men''s traditional wear. Durable, comfortable, and stylish.',
  price = 5000,
  original_price = NULL,
  images = ARRAY['/products/jonkoso-1.jpg', '/products/jonkoso-2.jpg', '/products/jonkoso-3.jpg', '/products/jonkoso-4.jpg', '/products/jonkoso-5.jpg', '/products/jonkoso-6.jpg', '/products/jonkoso-7.jpg', '/products/jonkoso-8.jpg', '/products/jonkoso-9.jpg', '/products/jonkoso-10.jpg', '/products/jonkoso-11.jpg'],
  category = 'Senator',
  material_type = 'senator material',
  featured = true
WHERE id = '5';

-- Product 6: Mikado (was "Patterned Silk - Ankara")
UPDATE products SET 
  name = 'Mikado',
  slug = 'mikado',
  description = 'Smooth mikado plain material. Versatile for both men''s and women''s fashion. Clean and elegant look.',
  price = 4000,
  original_price = NULL,
  images = ARRAY['/products/mikado-1.jpg', '/products/mikado-2.jpg', '/products/mikado-3.jpg', '/products/mikado-4.jpg', '/products/mikado-5.jpg', '/products/mikado-6.jpg'],
  category = 'Plain',
  material_type = 'plain',
  featured = true
WHERE id = '6';

-- Product 7: Senator and South Material (was "Beaded Lace - Emerald")
UPDATE products SET 
  name = 'Senator and South Material',
  slug = 'senator-south-material',
  description = 'Premium senator and southern-style fabric. Perfect for traditional and casual outfits.',
  price = 7000,
  original_price = NULL,
  images = ARRAY['/products/senator-1.jpg', '/products/senator-2.jpg', '/products/senator-3.jpg', '/products/senator-4.jpg'],
  category = 'Senator',
  material_type = 'senator material',
  featured = true
WHERE id = '7';

-- Product 8: Traditional Isiagu (was "Cord Lace - Royal Purple")
UPDATE products SET 
  name = 'Traditional Isiagu',
  slug = 'traditional-isiagu',
  description = 'Authentic isiagu traditional patterned fabric. A must-have for cultural events and ceremonies.',
  price = 15000,
  original_price = NULL,
  images = ARRAY['/products/isiagu-1.jpg', '/products/isiagu-2.jpg', '/products/isiagu-3.jpg', '/products/isiagu-4.jpg', '/products/isiagu-5.jpg', '/products/isiagu-6.jpg', '/products/isiagu-7.jpg', '/products/isiagu-8.jpg', '/products/isiagu-9.jpg', '/products/isiagu-10.jpg'],
  category = 'Patterned',
  material_type = 'patterned fabric',
  featured = true
WHERE id = '8';
