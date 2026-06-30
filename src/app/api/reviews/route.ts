import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("product_id");

  if (!productId) {
    return NextResponse.json({ reviews: [] });
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return NextResponse.json({ reviews: data || [] });
    } catch {
      // Fall through
    }
  }

  return NextResponse.json({ reviews: [] });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.product_id || !body.customer_name || !body.rating) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const review = {
    id: "REV-" + Date.now().toString(36).toUpperCase(),
    product_id: body.product_id,
    customer_name: body.customer_name,
    rating: body.rating,
    comment: body.comment || "",
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .insert([review])
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ review: data });
    } catch (err) {
      console.error("Review insert failed:", err);
    }
  }

  return NextResponse.json({ review });
}
