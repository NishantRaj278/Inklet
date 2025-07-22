"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdDarkMode, MdLightMode, MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useTheme } from "@/context/ThemeContext";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className={`flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900/95 border-gray-700/30"
          : "bg-white/95 border-gray-200/30"
      }`}
    >
      {/* Social Icons */}
      <div className="flex gap-1 sm:gap-1">
        <div
          className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
            theme === "dark" ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"
          }`}
        >
          <Link href="https://www.instagram.com/nishantraj._/" target="_blank">
            <IoLogoInstagram
              className={`text-lg sm:text-xl cursor-pointer transition-colors ${
                theme === "dark"
                  ? "text-gray-300 hover:text-pink-400"
                  : "text-gray-600 hover:text-pink-600"
              }`}
            />
          </Link>
        </div>
        <div
          className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
            theme === "dark" ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"
          }`}
        >
          <Link href="https://github.com/NishantRaj278" target="_blank">
            <FaGithub
              className={`text-lg sm:text-xl cursor-pointer transition-colors ${
                theme === "dark"
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            />
          </Link>
        </div>
        <div
          className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
            theme === "dark" ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"
          }`}
        >
          <Link
            href="https://www.linkedin.com/in/nishantraj1234/"
            target="_blank"
          >
            <FaLinkedin
              className={`text-lg sm:text-xl cursor-pointer transition-colors ${
                theme === "dark"
                  ? "text-gray-300 hover:text-blue-400"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            />
          </Link>
        </div>
      </div>

      {/* Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link
          href="/"
          className={`font-extrabold text-xl sm:text-2xl lg:text-3xl bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 hover:scale-105 ${
            theme === "dark"
              ? "from-white via-blue-200 to-purple-300"
              : "from-gray-800 via-blue-600 to-purple-600"
          }`}
        >
          inklet.
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-2 lg:gap-3">
        {/* Theme Toggle */}
        <button
          className={`flex items-center justify-center p-2.5 lg:p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
            theme === "dark"
              ? "bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-yellow-400"
              : "bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700"
          }`}
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <MdDarkMode className="text-lg lg:text-xl" />
          ) : (
            <MdLightMode className="text-lg lg:text-xl" />
          )}
        </button>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 lg:gap-2">
          <Link
            href="/"
            className={`px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg font-medium text-sm lg:text-base transition-all duration-300 hover:scale-105 ${
              theme === "dark"
                ? "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                : "text-gray-700 hover:bg-gray-100/50 hover:text-gray-900"
            }`}
          >
            Home
          </Link>

          {status === "authenticated" && (
            <Link
              href="/write"
              className={`px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg font-medium text-sm lg:text-base transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-gray-300 hover:bg-gray-800/50 hover:text-blue-400"
                  : "text-gray-700 hover:bg-gray-100/50 hover:text-blue-600"
              }`}
            >
              Write
            </Link>
          )}

          {status === "authenticated" ? (
            <button
              onClick={() => signOut()}
              className={`px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg font-medium text-sm lg:text-base transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "text-gray-300 hover:bg-red-900/30 hover:text-red-400"
                  : "text-gray-700 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className={`px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg font-medium text-sm lg:text-base bg-gradient-to-r transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                theme === "dark"
                  ? "from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  : "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 shadow-lg ${
            theme === "dark"
              ? "bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-gray-300 border border-gray-600"
              : "bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 border border-gray-200"
          }`}
        >
          <MdOutlineMenu className="text-xl" />
        </button>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            {/* Menu Content */}
            <div
              className={`relative w-[90%] max-w-md rounded-2xl shadow-2xl transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
                  : "bg-gradient-to-br from-white via-gray-50 to-white"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <IoMdClose className="text-xl" />
              </button>

              {/* Menu Items */}
              <div className="p-8 pt-12 space-y-4">
                {/* Theme Toggle */}
                <button
                  onClick={() => {
                    toggleTheme();
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-center gap-3 p-4 rounded-xl font-medium text-base transition-all duration-300 hover:scale-105 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-yellow-400"
                      : "bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700"
                  }`}
                >
                  {theme === "light" ? (
                    <MdDarkMode className="text-xl" />
                  ) : (
                    <MdLightMode className="text-xl" />
                  )}
                  {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>

                {/* Navigation Links */}
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block w-full p-4 rounded-xl font-medium text-base text-center transition-all duration-300 hover:scale-105 ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                      : "text-gray-700 hover:bg-gray-100/50 hover:text-gray-900"
                  }`}
                >
                  Home
                </Link>

                {status === "authenticated" && (
                  <Link
                    href="/write"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block w-full p-4 rounded-xl font-medium text-base text-center transition-all duration-300 hover:scale-105 ${
                      theme === "dark"
                        ? "text-gray-300 hover:bg-gray-800/50 hover:text-blue-400"
                        : "text-gray-700 hover:bg-gray-100/50 hover:text-blue-600"
                    }`}
                  >
                    Write
                  </Link>
                )}

                {status === "authenticated" ? (
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full p-4 rounded-xl font-medium text-base transition-all duration-300 hover:scale-105 ${
                      theme === "dark"
                        ? "text-gray-300 hover:bg-red-900/30 hover:text-red-400"
                        : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                    }`}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block w-full p-4 rounded-xl font-medium text-base text-center bg-gradient-to-r transition-all duration-300 hover:scale-105 hover:shadow-lg text-white ${
                      theme === "dark"
                        ? "from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    }`}
                  >
                    Login
                  </Link>
                )}

                {/* Social Icons in Mobile Menu */}
                <div className="flex justify-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div
                    className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 ${
                      theme === "dark"
                        ? "hover:bg-gray-800/50"
                        : "hover:bg-gray-100/50"
                    }`}
                  >
                    <IoLogoInstagram
                      className={`text-xl cursor-pointer transition-colors ${
                        theme === "dark"
                          ? "text-gray-300 hover:text-pink-400"
                          : "text-gray-600 hover:text-pink-600"
                      }`}
                    />
                  </div>
                  <div
                    className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 ${
                      theme === "dark"
                        ? "hover:bg-gray-800/50"
                        : "hover:bg-gray-100/50"
                    }`}
                  >
                    <FaGithub
                      className={`text-xl cursor-pointer transition-colors ${
                        theme === "dark"
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    />
                  </div>
                  <div
                    className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 ${
                      theme === "dark"
                        ? "hover:bg-gray-800/50"
                        : "hover:bg-gray-100/50"
                    }`}
                  >
                    <FaLinkedin
                      className={`text-xl cursor-pointer transition-colors ${
                        theme === "dark"
                          ? "text-gray-300 hover:text-blue-400"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
