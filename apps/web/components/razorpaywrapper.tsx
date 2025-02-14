'use client';
import Script from 'next/script';
import React from 'react';



interface RazorpayWrapperProps {
    children: React.ReactNode;
}

export default function RazorpayWrapper() {
    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
            />
        </>
    );
}