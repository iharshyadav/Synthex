import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "../components/providers/convexProviders";
import Footer from "@components/Footer";
import { Toaster } from "react-hot-toast";
import LoaderWrapper from "@components/wrapper/loaderWrapper";
import Chatbot from "@components/chatbot/chatbot";
import Script from "next/script";
import RazorpayWrapper from "@components/razorpaywrapper";
import { TanstackClientProvider } from "@components/wrapper/tanstackWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Synthex",
  description: "Synthex - AI-powered platform for seamless content creation and collaboration. Access smart tools, interactive assistance, and professional resources all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col`}
        >
          <LoaderWrapper>
            <div className="contents" style={{ visibility: "visible" }}>
              <ConvexClientProvider>
                <RazorpayWrapper />
                <TanstackClientProvider>{children}</TanstackClientProvider>
                <div className="fixed bottom-4 right-4 z-50">
                  <Chatbot />
                </div>
              </ConvexClientProvider>
              <Footer />
              <Toaster />
            </div>
          </LoaderWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
