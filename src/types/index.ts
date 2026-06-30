export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  material_type: MaterialType;
  colors: string[];
  images: string[];
  stock: number;
  featured: boolean;
  created_at: string;
}

export type MaterialType =
  | "lace"
  | "net"
  | "chiffon"
  | "silk"
  | "cotton"
  | "fabric"
  | "plain"
  | "beaded lace"
  | "cord lace"
  | "senator material"
  | "patterned fabric"
  | "other";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  items: OrderItem[];
  total: number;
  payment_method: "bank_transfer" | "card" | "pay_on_delivery";
  payment_status: "pending" | "paid" | "failed";
  order_status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  selected_color: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_percent: number;
  max_uses: number;
  used_count: number;
  expires_at: string;
  active: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  role: "admin";
}
