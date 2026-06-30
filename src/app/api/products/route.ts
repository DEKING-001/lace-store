import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const SAMPLE_PRODUCTS = [
  {
    id: "1",
    name: "Damask",
    description:
      "Premium damask fabric, perfect for traditional ceremonies, owambe, and special occasions. Rich texture and elegant finish.",
    price: 5000,
    material_type: "fabric",
    colors: ["#8B4513", "#DAA520", "#2F4F4F"],
    images: [
      "/products/damask-1.jpg",
      "/products/damask-2.jpg",
      "/products/damask-3.jpg",
      "/products/damask-4.jpg",
      "/products/damask-5.jpg",
      "/products/damask-6.jpg",
      "/products/damask-7.jpg",
      "/products/damask-8.jpg",
      "/products/damask-9.jpg",
    ],
    stock: 50,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Velvet Beaded Lace",
    description:
      "Luxurious velvet beaded lace with intricate beadwork. Ideal for wedding outfits and high-end fashion.",
    price: 12000,
    material_type: "beaded lace",
    colors: ["#4A0E1A", "#1a1a1a", "#6b1d2a"],
    images: [
      "/products/velvet-beaded-1.jpg",
      "/products/velvet-beaded-2.jpg",
      "/products/velvet-beaded-3.jpg",
      "/products/velvet-beaded-4.jpg",
      "/products/velvet-beaded-5.jpg",
      "/products/velvet-beaded-6.jpg",
      "/products/velvet-beaded-7.jpg",
      "/products/velvet-beaded-8.jpg",
      "/products/velvet-beaded-9.jpg",
      "/products/velvet-beaded-10.jpg",
      "/products/velvet-beaded-11.jpg",
      "/products/velvet-beaded-12.jpg",
      "/products/velvet-beaded-13.jpg",
    ],
    stock: 50,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Luxury Beaded Lace",
    description:
      "Top-tier luxury beaded lace for exclusive occasions. Exquisite craftsmanship and premium quality.",
    price: 20000,
    material_type: "beaded lace",
    colors: ["#b8860b", "#D4AF37", "#FFFFFF"],
    images: [
      "/products/luxury-beaded-1.jpg",
      "/products/luxury-beaded-2.jpg",
      "/products/luxury-beaded-3.jpg",
      "/products/luxury-beaded-4.jpg",
      "/products/luxury-beaded-5.jpg",
      "/products/luxury-beaded-6.jpg",
      "/products/luxury-beaded-7.jpg",
      "/products/luxury-beaded-8.jpg",
      "/products/luxury-beaded-9.jpg",
      "/products/luxury-beaded-10.jpg",
      "/products/luxury-beaded-11.jpg",
      "/products/luxury-beaded-12.jpg",
      "/products/luxury-beaded-13.jpg",
    ],
    stock: 50,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Jonkoso",
    description:
      "Classic senator material for men's traditional wear. Durable, comfortable, and stylish.",
    price: 5000,
    material_type: "senator material",
    colors: ["#1a1a1a", "#2F4F4F", "#4A0E1A"],
    images: [
      "/products/jonkoso-1.jpg",
      "/products/jonkoso-2.jpg",
      "/products/jonkoso-3.jpg",
      "/products/jonkoso-4.jpg",
      "/products/jonkoso-5.jpg",
      "/products/jonkoso-6.jpg",
      "/products/jonkoso-7.jpg",
      "/products/jonkoso-8.jpg",
      "/products/jonkoso-9.jpg",
      "/products/jonkoso-10.jpg",
      "/products/jonkoso-11.jpg",
    ],
    stock: 50,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Mikado",
    description:
      "Smooth mikado plain material. Versatile for both men's and women's fashion. Clean and elegant look.",
    price: 4000,
    material_type: "plain",
    colors: ["#FFFFFF", "#F5F0EB", "#D4AF37"],
    images: [
      "/products/mikado-1.jpg",
      "/products/mikado-2.jpg",
      "/products/mikado-3.jpg",
      "/products/mikado-4.jpg",
      "/products/mikado-5.jpg",
      "/products/mikado-6.jpg",
    ],
    stock: 50,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Senator and South Material",
    description:
      "Premium senator and southern-style fabric. Perfect for traditional and casual outfits.",
    price: 7000,
    material_type: "senator material",
    colors: ["#2F4F4F", "#8B4513", "#1a1a1a"],
    images: [
      "/products/senator-1.jpg",
      "/products/senator-2.jpg",
      "/products/senator-3.jpg",
      "/products/senator-4.jpg",
    ],
    stock: 50,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Traditional Isiagu",
    description:
      "Authentic isiagu traditional patterned fabric. A must-have for cultural events and ceremonies.",
    price: 15000,
    material_type: "patterned fabric",
    colors: ["#8B4513", "#DAA520", "#B8860B"],
    images: [
      "/products/isiagu-1.jpg",
      "/products/isiagu-2.jpg",
      "/products/isiagu-3.jpg",
      "/products/isiagu-4.jpg",
      "/products/isiagu-5.jpg",
      "/products/isiagu-6.jpg",
      "/products/isiagu-7.jpg",
      "/products/isiagu-8.jpg",
      "/products/isiagu-9.jpg",
      "/products/isiagu-10.jpg",
    ],
    stock: 50,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Cord Lace",
    description:
      "Beautiful cord lace fabric, perfect for traditional and ceremonial outfits. Elegant design and premium quality.",
    price: 6500,
    material_type: "cord lace",
    colors: ["#8B4513", "#DAA520", "#FFFFFF"],
    images: [
      "/products/cord-lace-1.jpg",
      "/products/cord-lace-2.jpg",
      "/products/cord-lace-3.jpg",
      "/products/cord-lace-4.jpg",
      "/products/cord-lace-5.jpg",
    ],
    stock: 50,
    featured: true,
    created_at: new Date().toISOString(),
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (supabase) {
    try {
      if (id) {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        return NextResponse.json({ product: data });
      }

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return NextResponse.json({ products: data || [] });
    } catch {
      // Fall through to sample data
    }
  }

  if (id) {
    const product = SAMPLE_PRODUCTS.find((p) => p.id === id);
    return NextResponse.json({ product: product || null });
  }

  return NextResponse.json({ products: SAMPLE_PRODUCTS });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert([body])
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ product: data });
    } catch {
      // Fall through
    }
  }

  return NextResponse.json(
    { error: "Database not configured" },
    { status: 500 }
  );
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...updates } = body;

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ product: data });
    } catch {
      // Fall through
    }
  }

  return NextResponse.json(
    { error: "Database not configured" },
    { status: 500 }
  );
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (supabase) {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      return NextResponse.json({ success: true });
    } catch {
      // Fall through
    }
  }

  return NextResponse.json(
    { error: "Database not configured" },
    { status: 500 }
  );
}
