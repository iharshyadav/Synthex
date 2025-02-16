"use client";
import { useUser } from "@clerk/nextjs";
import { Button } from "@components/components/ui/button";
import { api } from "convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Zap } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  console.log(user && user?.id)
  const email = user?.emailAddresses[0]?.emailAddress || "";
  const updateUserPaymentDetails = useMutation(api.payment.updateUserPaymentDetails);
  const updateUserProStatus = useMutation(api.payment.updateUserProStatus);
  const handlePayment = async () => {
    setLoading(true);

    if (typeof window !== "undefined" && !(window as any).Razorpay) {
      console.error("Razorpay script not loaded");
      toast.error("Payment system not available. Try again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 999, plan: "Synthex Pro" }),
      });

      const order = await response.json();
      if (!order.id) {
        alert("Failed to create order");
        setLoading(false);
        return;
      }
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "Synthex Pro",
        description: `Subscription for Synthex Pro`,
        order_id: order.id,
        handler: async (response: any) => {
          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyResponse.json();
          console.log(verifyData, "harsh");
          if (verifyData.success) {
            await updateUserPaymentDetails({
              razorpay_order_id: verifyData.razorpay_order_id,
              razorpay_payment_id: verifyData.razorpay_payment_id,
              userId: user?.id ?? "",
            });
            await updateUserProStatus({
              razorpay_payment_id: verifyData.razorpay_payment_id,
              userId: user?.id ?? "",
            });
            toast.success("Payment successful!");
          } else {
            toast.error("Payment verification failed!");
          }
          setLoading(false);
        },
        prefill: { name: user?.fullName, email: email },
        theme: { color: "#528FF0" },
      };

      console.log(options);

      const razor = new (window as any).Razorpay(options);
      razor.open();
      setLoading(false);
    } catch (error) {
      console.error("Payment creation failed:", error);
      toast.error("Failed to create payment");
      setLoading(false);
      return;
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
        hover:from-blue-600 hover:to-blue-700 transition-all"
    >
      <Zap className="w-5 h-5" />
      {loading ? "Processing..." : `Upgrade to Pro`}
    </Button>
  );
}
