-- Add colors column and fix material_type values
ALTER TABLE products ADD COLUMN IF NOT EXISTS colors TEXT[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 50;

-- Update material_type to match frontend expectations
UPDATE products SET material_type = 'beaded lace' WHERE material_type = 'beaded_lace';
UPDATE products SET material_type = 'cord lace' WHERE material_type = 'cord_lace';
UPDATE products SET material_type = 'senator material' WHERE material_type = 'senator';
UPDATE products SET material_type = 'patterned fabric' WHERE material_type = 'patterned';

-- Add sample colors
UPDATE products SET colors = ARRAY['#8B4513', '#DAA520', '#2F4F4F'] WHERE id = '1';
UPDATE products SET colors = ARRAY['#FFFFFF', '#F5F0EB', '#D4AF37'] WHERE id = '2';
UPDATE products SET colors = ARRAY['#1a1a1a', '#2F4F4F', '#4A0E1A'] WHERE id = '3';
UPDATE products SET colors = ARRAY['#8B4513', '#DAA520', '#FFFFFF'] WHERE id = '4';
UPDATE products SET colors = ARRAY['#FFFFFF', '#F5F0EB', '#D4AF37'] WHERE id = '5';
UPDATE products SET colors = ARRAY['#2F4F4F', '#8B4513', '#1a1a1a'] WHERE id = '6';
UPDATE products SET colors = ARRAY['#b8860b', '#D4AF37', '#FFFFFF'] WHERE id = '7';
UPDATE products SET colors = ARRAY['#8B4513', '#DAA520', '#FFFFFF'] WHERE id = '8';
