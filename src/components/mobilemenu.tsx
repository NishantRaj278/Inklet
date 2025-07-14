"use client";

import Link from "next/link";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useTheme } from "@/context/ThemeContext";
import { signOut, useSession } from "next-auth/react";
import { MdDarkMode, MdLightMode, MdOutlineMenu } from "react-icons/md";

function MobileMenu() {
  const [panel, setpanel] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { status } = useSession();

  return (
    <div>
      {/* Menu Button */}
      <button
        onClick={() => setpanel(true)}
        className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
          theme === "dark"
            ? "bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-gray-300"
            : "bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700"
        }`}
      >
        <MdOutlineMenu className="text-xl" />
      </button>

      {/* Mobile Menu Panel */}
      {panel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setpanel(false)}
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
              onClick={() => setpanel(false)}
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
                  setpanel(false);
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
                onClick={() => setpanel(false)}
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
                  onClick={() => setpanel(false)}
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
                    setpanel(false);
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
                  onClick={() => setpanel(false)}
                  className={`block w-full p-4 rounded-xl font-medium text-base text-center bg-gradient-to-r transition-all duration-300 hover:scale-105 hover:shadow-lg text-white ${
                    theme === "dark"
                      ? "from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      : "from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  }`}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
