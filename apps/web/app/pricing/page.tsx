import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { ENTERPRISE_FEATURES, FEATURES } from "./_constants";
import { Star } from "lucide-react";
import FeatureCategory from "./_components/FeatureCategory";
import FeatureItem from "./_components/FeatureItem";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import UpgradeButton from "./_components/UpgradeButton";
import LoginButton from "@components/LoginButton";
import NavigationHeader from "@components/NavigationHeader";
import ProPlanView from "./_components/ProPlanView";

async function PricingPage() {
  const user = await currentUser();
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  if (convexUser?.isPro) return <ProPlanView />;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#12121a] selection:bg-blue-500/20 selection:text-blue-200">
        <NavigationHeader />

        <main className="relative pt-20 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16 md:mb-24 lg:mb-32 relative">
                    {/* Gradient orbs for visual interest */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[140px]" />
                    <div className="absolute top-1/2 right-1/4 w-[200px] h-[200px] bg-purple-500/20 rounded-full blur-[120px]" />
                    
                    <div className="relative space-y-6">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
                                Elevate Your
                            </span>
                            <br />
                            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
                                Development Experience
                            </span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                            Join the next generation of developers with our professional suite of tools
                        </p>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24">
                    {ENTERPRISE_FEATURES.map((feature) => (
                        <div
                            key={feature.label}
                            className="group relative overflow-hidden bg-gradient-to-b from-[#1a1a2e]/80 to-[#12121a]/80 rounded-2xl p-6 md:p-8
                            hover:transform hover:scale-[1.02] transition-all duration-300 ease-out border border-gray-800/30 hover:border-blue-500/30
                            backdrop-blur-sm"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                                    flex items-center justify-center mb-5 ring-1 ring-gray-800/60 group-hover:ring-blue-500/40 transition-all duration-300"
                                >
                                    <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                                </div>
                                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">{feature.label}</h3>
                                <p className="text-sm md:text-base text-gray-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pricing Card */}
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-10" />
                    <div className="relative bg-[#12121a]/90 backdrop-blur-xl rounded-2xl border border-gray-800/50 overflow-hidden">
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

                        <div className="relative p-6 md:p-12">
                            <div className="text-center space-y-6 mb-12">
                                <div className="inline-flex p-3 md:p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-gray-800/60">
                                    <Star className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white">Lifetime Pro Access</h2>
                                <div className="flex items-baseline justify-center gap-2">
                                    <span className="text-2xl md:text-3xl text-gray-400">₹</span>
                                    <span className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                                        999
                                    </span>
                                    <span className="text-xl md:text-2xl text-gray-400">one-time</span>
                                </div>
                                <p className="text-lg md:text-xl text-gray-300">Unlock the full potential of CodeCraft</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8 mb-12">
                                <FeatureCategory label="Development">
                                    {FEATURES.development.map((feature, idx) => (
                                        <FeatureItem key={idx}>{feature}</FeatureItem>
                                    ))}
                                </FeatureCategory>

                                <FeatureCategory label="Collaboration">
                                    {FEATURES.collaboration.map((feature, idx) => (
                                        <FeatureItem key={idx}>{feature}</FeatureItem>
                                    ))}
                                </FeatureCategory>

                                <FeatureCategory label="Deployment">
                                    {FEATURES.deployment.map((feature, idx) => (
                                        <FeatureItem key={idx}>{feature}</FeatureItem>
                                    ))}
                                </FeatureCategory>
                            </div>

                            <div className="flex justify-center">
                                <SignedIn>
                                    <UpgradeButton />
                                </SignedIn>
                                <SignedOut>
                                    <LoginButton />
                                </SignedOut>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
      );
}
export default PricingPage;
