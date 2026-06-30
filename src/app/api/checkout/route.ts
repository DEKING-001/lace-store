import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    // Check stock for all items
    for (const item of body.items) {
      const { data: product, error: fetchError } = await supabase
        .from("products")
        .select("stock, name")
        .eq("id", item.product_id)
        .single();

      if (fetchError || !product) {
        return NextResponse.json(
          { error: `Product "${item.product_name}" not found` },
          { status: 400 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Only ${product.stock} "${product.name}" available in stock` },
          { status: 400 }
        );
      }
    }

    // Deduct stock for each item
    for (const item of body.items) {
      const { data: product } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.product_id)
        .single();

      if (product) {
        await supabase
          .from("products")
          .update({ stock: Math.max(0, product.stock - item.quantity) })
          .eq("id", item.product_id);
      }
    }

    const orderId = "ORD-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();

    const orderData = {
      id: orderId,
      customer_name: body.name,
      customer_email: body.email,
      customer_phone: body.phone,
      customer_address: body.address,
      customer_city: body.city,
      items: body.items,
      subtotal: body.total,
      shipping: body.shipping || 2000,
      total: body.total + (body.shipping || 2000),
      payment_method: body.paymentMethod,
      payment_status: body.paymentMethod === "card" ? "paid" : "pending",
      order_status: body.paymentMethod === "card" ? "confirmed" : "pending",
      notes: body.payment_ref ? `Payment ref: ${body.payment_ref}` : null,
    };

    const { data, error } = await supabase
      .from("orders")
      .insert([orderData])
      .select("id")
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, orderId: data.id });
  } catch (err) {
    console.error("Order failed:", err);
    return NextResponse.json(
      { error: "Failed to place order. Please try again." },
      { status: 500 }
    );
  }
}
