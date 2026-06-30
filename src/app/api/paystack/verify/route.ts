import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "No reference" }, { status: 400 });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { error: "Paystack not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    const data = await res.json();

    if (!data.status) {
      return NextResponse.json({ success: false, message: data.message });
    }

    return NextResponse.json({
      success: true,
      status: data.data.status,
      amount: data.data.amount / 100,
      reference: data.data.reference,
      metadata: data.data.metadata,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
