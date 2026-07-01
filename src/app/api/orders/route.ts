import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const SHIP_AFTER_HOURS = 2;
const DELIVER_AFTER_HOURS = 24;

async function autoProgressOrders() {
  if (!supabase) return;

  const now = new Date();

  // Auto-ship confirmed orders after SHIP_AFTER_HOURS
  const shipCutoff = new Date(now.getTime() - SHIP_AFTER_HOURS * 60 * 60 * 1000).toISOString();
  const { data: toShip } = await supabase
    .from("orders")
    .select("id")
    .eq("order_status", "confirmed")
    .eq("payment_status", "paid")
    .lte("created_at", shipCutoff);

  if (toShip && toShip.length > 0) {
    const ids = toShip.map((o) => o.id);
    await supabase
      .from("orders")
      .update({ order_status: "shipped" })
      .in("id", ids);
  }

  // Auto-deliver shipped orders after DELIVER_AFTER_HOURS
  const deliverCutoff = new Date(now.getTime() - DELIVER_AFTER_HOURS * 60 * 60 * 1000).toISOString();
  const { data: toDeliver } = await supabase
    .from("orders")
    .select("id")
    .eq("order_status", "shipped")
    .lte("created_at", deliverCutoff);

  if (toDeliver && toDeliver.length > 0) {
    const ids = toDeliver.map((o) => o.id);
    await supabase
      .from("orders")
      .update({ order_status: "delivered" })
      .in("id", ids);
  }
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (supabase) {
    try {
      // Run auto-progression in background (non-blocking)
      autoProgressOrders().catch(() => {});

      if (id) {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        return NextResponse.json({ order: data });
      }

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return NextResponse.json({ orders: data || [] });
    } catch {
      // Fall through
    }
  }

  if (id) {
    return NextResponse.json({ order: null });
  }
  return NextResponse.json({ orders: [] });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...updates } = body;

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ order: data });
    } catch {
      // Fall through
    }
  }

  return NextResponse.json(
    { error: "Database not configured" },
    { status: 500 }
  );
}
