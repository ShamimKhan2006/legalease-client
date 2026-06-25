"use client";

import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";

// Gravity UI Icons


export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold mb-3">LegalEase</h2>
          <p className="text-gray-400">
            Connect with trusted lawyers anytime, anywhere. Fast, secure, and reliable legal support platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Newsletter Signup
          </h3>

          <p className="text-gray-400 mb-3">
            Get updates about new lawyers & legal tips.
          </p>

          <div className="flex gap-2">
            <Input
              placeholder="Enter your email"
              className="bg-white rounded-lg"
            />
            <Button color="primary">
              Subscribe
            </Button>
          </div>

          {/* Social Icons (Gravity UI) */}
          <div className="flex gap-4 mt-5 text-white/70">
            <a href="#" className="hover:text-blue-500">
              <FaFacebookF width={20} height={20} />
            </a>
            <a href="#" className="hover:text-sky-400">
              <CiTwitter  width={20} height={20} />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram width={20} height={20} />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaLinkedinIn width={20} height={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} LegalEase. All rights reserved.
      </div>
    </footer>
  );
}