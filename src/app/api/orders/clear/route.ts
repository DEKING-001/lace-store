import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function DELETE() {
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  try {
    const { error } = await supabase
      .from("orders")
      .delete()
      .neq("id", "__never_match__");

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to clear orders:", err);
    return NextResponse.json({ error: "Failed to clear orders" }, { status: 500 });
  }
}
