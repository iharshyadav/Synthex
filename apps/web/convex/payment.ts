import { v } from "convex/values";
import { mutation } from "./_generated/server";


export const updateUserPaymentDetails = mutation({
    args : {
        razorpay_order_id : v.string(), razorpay_payment_id : v.string() , userId : v.string()
    },
    handler : async (ctx , args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return false;
        console.log(args.userId)
        const updateProfile = await ctx.db.insert("payments",{
            userId : args.userId,
            orderId : args.razorpay_order_id,
            paymentId : args.razorpay_payment_id,
            status: "SUCCESS",
            createdAt : Date.now(),
            updatedAt : Date.now()
        })

        console.log(updateProfile)
    }
})

export const updateUserProStatus = mutation({
    args : {
      razorpay_payment_id : v.string() , userId : v.string()
    },
    handler: async (ctx,args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return false;
        console.log(args.userId)
        const user = await ctx.db
            .query("users")
            .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
            .first();

        if (!user) {
            throw new Error("User not found");
        }

        await ctx.db.patch(user._id, {
            isPro: true,
            proSince: Date.now(),
            paymentId: args.razorpay_payment_id
        });
    }
});
console.log(updateUserPaymentDetails,updateUserProStatus);