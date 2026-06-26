"use client";

import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-white/10 overflow-hidden">
      {/* Premium subtle glow effect in the background */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-indigo-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 relative z-10">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white tracking-tight">LegalEase</h2>
          <p className="text-sm leading-relaxed text-slate-400">
            Professional legal support, simplified. Trusted by thousands for secure, reliable, and instant legal connections.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Platform</h3>
          <ul className="space-y-4 text-sm">
            {["About Us", "Legal Services", "Contact", "Privacy Policy"].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase().replace(" ", "-")}`} className="hover:text-blue-400 transition-colors duration-300">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter - High Contrast Card */}
        <div className="lg:col-span-2 bg-slate-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Join our Newsletter</h3>
          <p className="text-sm text-slate-400 mb-6">Receive expert legal tips and updates.</p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="name@email.com"
              className="bg-transparent"
              classNames={{
                input: "bg-slate-950/50",
                inputWrapper: "bg-slate-950/50 border border-white/10 hover:border-blue-500/50"
              }}
            />
            <Button color="primary" className="bg-blue-600 font-semibold shadow-lg shadow-blue-900/20">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} LegalEase Inc. All rights reserved.
        </p>
        
        <div className="flex gap-6">
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
            <a 
              key={idx} 
              href="#" 
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-blue-600 transition-all duration-300 hover:scale-110"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}