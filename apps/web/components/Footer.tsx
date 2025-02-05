import { Blocks, Twitter, Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <footer className="relative border-t border-gray-800/50 mt-auto bg-black">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
      
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-800 rounded-2xl p-10 mb-16">
          {/* Background decoration */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-blue-500/10 blur-3xl rounded-full" />
            <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-purple-500/10 blur-3xl rounded-full" />
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Stay in the loop
              </h2>
              <p className="text-gray-400 text-lg">
          Join our newsletter for exclusive updates, early access to new features, and development tips.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative group">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-black/30 border border-gray-700 rounded-xl px-5 py-3 text-white 
               placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 
               focus:border-blue-500/50 transition-all duration-200"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 
                  group-hover:opacity-100 transition-opacity -z-10 blur-sm" />
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 
                   text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 
                   hover:shadow-lg hover:shadow-blue-500/25">
          Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-gray-100">
              <Blocks className="size-8" />
              <span className="text-2xl font-bold">Synthex</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Built for developers, by developers. Creating tools that empower the next generation of innovation. 
              We're on a mission to make development faster, easier, and more accessible.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
                <Mail size={16} />
                contact@synthex.com
              </Link>
              <Link href="/location" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
                <MapPin size={16} />
                San Francisco, CA
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-gray-100 font-semibold">Products</h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Documentation", "API", "Integration", "Status"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="group flex items-center text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                    <ArrowUpRight className="ml-1 size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-gray-100 font-semibold">Resources</h3>
            <ul className="space-y-3">
              {["Blog", "Support", "Community", "Partners", "Changelog", "Resources"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="group flex items-center text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                    <ArrowUpRight className="ml-1 size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-gray-100 font-semibold">Company</h3>
            <ul className="space-y-3">
              {["About", "Careers", "Press", "Legal", "Privacy", "Terms"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="group flex items-center text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                    <ArrowUpRight className="ml-1 size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Synthex. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                <Twitter size={20} />
              </Link>
              <Link href="https://github.com" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                <Github size={20} />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;