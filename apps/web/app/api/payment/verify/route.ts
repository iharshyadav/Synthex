import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { mutation, query } from "../../../../convex/_generated/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {

    const {userId} = await auth();
    if(!userId) return NextResponse.json({ success: false, message: "Please Login...!" })
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment data" }, { status: 400 });
    }

    console.log("first")
    // Generate expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");
    
    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
    console.log("first1")
    const updateUserPaymentDetails = mutation({
        handler : async (ctx) => {
            const normalizedUserId = ctx.db.normalizeId("users", userId);
            if (!normalizedUserId) {
                throw new Error("Invalid user ID");
            }
            const updateProfile = await ctx.db.insert("payments",{
                userId : normalizedUserId,
                orderId : razorpay_order_id,
                paymentId : razorpay_payment_id,
                status: "SUCCESS",
                createdAt : Date.now(),
                updatedAt : Date.now()
            })
        }
    })

    const updateUserProStatus = mutation({
        handler: async (ctx) => {
            const user = await ctx.db
                .query("users")
                .withIndex("by_user_id", (q) => q.eq("userId", userId))
                .first();

            if (!user) {
                throw new Error("User not found");
            }

            await ctx.db.patch(user._id, {
                isPro: true,
                proSince: Date.now(),
                paymentId: razorpay_payment_id
            });
        }
    });
    console.log(updateUserPaymentDetails,updateUserProStatus);
    // await updateUserProStatus({}, {});

    // await db.payment.create({
    //   data: {
    //     orderId: razorpay_order_id,
    //     paymentId: razorpay_payment_id,
    //     userId: "user_id_here",
    //     status: "SUCCESS",
    //   },
    // });

    return NextResponse.json({ success: true, message: "Payment Verified" });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
