"use client";

import React from "react";
import MostPopular from "./mostpopular";
import MenuCategories from "./menucategories";
import { useTheme } from "@/context/ThemeContext";

function Menu() {
  const { theme } = useTheme();

  return (
    <div className="lg:flex-2 px-4 flex flex-col items-start gap-8">
      {/* Modern Container with Glass-morphism */}
      <div
        className={`w-full rounded-2xl p-6 ${
          theme === "dark"
            ? "bg-slate-800/30 backdrop-blur-sm border border-slate-700/30"
            : "bg-white/50 backdrop-blur-sm border border-gray-200/30"
        } shadow-lg relative overflow-hidden`}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div
            className={`absolute -top-4 -right-4 w-20 h-20 rounded-full ${
              theme === "dark" ? "bg-blue-400" : "bg-blue-500"
            }`}
          ></div>
          <div
            className={`absolute -bottom-4 -left-4 w-16 h-16 rounded-full ${
              theme === "dark" ? "bg-purple-400" : "bg-purple-500"
            }`}
          ></div>
        </div>

        <div className="relative z-10">
          <MostPopular />
        </div>
      </div>

      {/* Second Modern Container */}
      <div
        className={`w-full rounded-2xl p-6 ${
          theme === "dark"
            ? "bg-slate-800/30 backdrop-blur-sm border border-slate-700/30"
            : "bg-white/50 backdrop-blur-sm border border-gray-200/30"
        } shadow-lg relative overflow-hidden`}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div
            className={`absolute -top-4 -left-4 w-20 h-20 rounded-full ${
              theme === "dark" ? "bg-green-400" : "bg-green-500"
            }`}
          ></div>
          <div
            className={`absolute -bottom-4 -right-4 w-16 h-16 rounded-full ${
              theme === "dark" ? "bg-pink-400" : "bg-pink-500"
            }`}
          ></div>
        </div>

        <div className="relative z-10">
          <MenuCategories />
        </div>
      </div>
    </div>
  );
}

export default Menu;
