"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

const getData = async () => {
  const response = await fetch("http://localhost:3000/api/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return response.json();
};

interface Category {
  id: string;
  title: string;
  slug: string;
}

function MenuCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col items-start gap-1">
      {/* Modern Header */}
      <div className="w-full mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          <h4 className="text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Discover by topic
          </h4>
        </div>
        <h1
          className={`text-2xl md:text-3xl font-bold ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          }`}
        >
          Categories
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
      </div>

      {/* Categories Container */}
      {loading ? (
        <div className="flex flex-wrap gap-3 w-full">
          {[80, 95, 70, 110, 85, 100].map((width, i) => (
            <div
              key={i}
              className={`animate-pulse rounded-lg h-8 ${
                theme === "dark" ? "bg-slate-700/30" : "bg-gray-100/50"
              }`}
              style={{ width: `${width}px` }}
            ></div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3 w-full">
          {data?.map((item: Category, index: number) => (
            <Link
              key={item.id}
              href={`/blog?cat=${item.slug}`}
              className={`group relative overflow-hidden px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                theme === "dark"
                  ? "bg-gradient-to-r from-slate-700 to-slate-600 text-slate-200 hover:from-purple-600 hover:to-pink-600 border border-slate-600/30"
                  : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-purple-500 hover:to-pink-500 hover:text-white border border-gray-300/30"
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
                animation: "fadeInScale 0.5s ease-out forwards",
              }}
            >
              <span className="relative z-10">{item.title}</span>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default MenuCategories;
