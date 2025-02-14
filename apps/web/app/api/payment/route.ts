import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";



const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    // console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,process.env.RAZORPAY_KEY_SECRET)
    const { userId } = await auth();
    const { email , amount, plan } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
      notes: {
        userId: userId,
        email:email,
        plan,
      },
    };

    try {
      const order = await razorpay.orders.create(options);
      console.log("Order created:", order);
      return NextResponse.json(order);
    } catch (razorpayError) {
      console.error("Razorpay Order Creation Error:", razorpayError);
      return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
    }
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
