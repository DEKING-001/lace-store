import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (supabase) {
    try {
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
