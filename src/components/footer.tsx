"use client";

import Image from "next/image";
import React from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="relative mt-16">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-24 -left-24 w-48 h-48 rounded-full ${
            theme === "dark" ? "bg-blue-500/10" : "bg-blue-500/20"
          } blur-3xl`}
        ></div>
        <div
          className={`absolute -bottom-24 -right-24 w-64 h-64 rounded-full ${
            theme === "dark" ? "bg-purple-500/10" : "bg-purple-500/20"
          } blur-3xl`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full ${
            theme === "dark" ? "bg-pink-500/5" : "bg-pink-500/15"
          } blur-2xl`}
        ></div>
      </div>

      {/* Main Footer Content */}
      <div
        className={`relative z-10 backdrop-blur-sm ${
          theme === "dark"
            ? "bg-slate-800/30 border-t border-slate-700/30"
            : "bg-white/30 border-t border-gray-200/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            {/* Brand Section */}
            <div className="flex-1 max-w-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <Image
                    src="/inkletlogo.png"
                    alt="inklet logo"
                    width={50}
                    height={50}
                    className="rounded-full shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20"></div>
                </div>
                <h1
                  className={`text-3xl font-bold ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  }`}
                >
                  inklet.
                </h1>
              </div>

              <p
                className={`text-sm leading-relaxed mb-6 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Discover amazing stories, insights, and perspectives from our
                community of writers. Join us on a journey of knowledge and
                creativity.
              </p>

              {/* Social Media Icons */}
              <div className="flex gap-4">
                {[
                  {
                    Icon: IoLogoInstagram,
                    color: "text-pink-500 hover:text-pink-400",
                    label: "Instagram",
                    href: "https://www.instagram.com/nishantraj._/",
                  },
                  {
                    Icon: FaGithub,
                    color:
                      theme === "dark"
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-600 hover:text-gray-800",
                    label: "GitHub",
                    href: "https://github.com/NishantRaj278",
                  },
                  {
                    Icon: FaLinkedin,
                    color: "text-blue-500 hover:text-blue-400",
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/nishantraj1234/",
                  },
                ].map(({ Icon, color, label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className={`group p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${
                      theme === "dark"
                        ? "bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/30"
                        : "bg-white/50 hover:bg-white/80 border border-gray-200/30"
                    } backdrop-blur-sm`}
                    aria-label={label}
                  >
                    <Icon
                      className={`text-xl ${color} group-hover:scale-110 transition-all duration-300`}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {/* Navigation Links */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"
                  }`}
                >
                  Navigation
                </h3>
                <div className="space-y-3">
                  {["home", "write", "login"].map((link) => (
                    <Link
                      key={link}
                      href={link === "home" ? "/" : `/${link.toLowerCase()}`}
                      className={`block text-sm transition-all duration-300 hover:translate-x-2 ${
                        theme === "dark"
                          ? "text-gray-300 hover:text-blue-400"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Topic Tags */}
              <div>
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                  }`}
                >
                  Topics
                </h3>
                <div className="space-y-3">
                  {["Fashion", "Food", "Coding", "Travel"].map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${tag.toLowerCase()}`}
                      className={`block text-sm transition-all duration-300 hover:translate-x-2 ${
                        theme === "dark"
                          ? "text-gray-300 hover:text-purple-400"
                          : "text-gray-600 hover:text-purple-600"
                      }`}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div
            className={`mt-12 pt-8 border-t ${
              theme === "dark" ? "border-slate-700/30" : "border-gray-200/30"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                © 2025 inklet. All rights reserved.
              </p>
              <div className="flex gap-6">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (link) => (
                    <Link
                      key={link}
                      href="#"
                      className={`text-sm transition-colors duration-300 ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-gray-200"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {link}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
