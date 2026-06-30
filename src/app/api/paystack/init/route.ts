import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, amount, metadata } = await request.json();

  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { error: "Paystack not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100,
        callback_url: `${request.nextUrl.origin}/callback`,
        metadata,
      }),
    });

    const data = await res.json();

    if (!data.status) {
      return NextResponse.json({ error: data.message }, { status: 400 });
    }

    return NextResponse.json({
      access_code: data.data.access_code,
      reference: data.data.reference,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
