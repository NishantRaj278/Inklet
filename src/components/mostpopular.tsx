"use client";

import React, { useState, useEffect } from "react";
import MostPopularItems from "./mostpopularitems";
import { useTheme } from "@/context/ThemeContext";

const getData = async () => {
  const response = await fetch("http://localhost:3000/api/popular");
  if (!response.ok) {
    throw new Error("Failed to fetch popular posts");
  }
  return response.json();
};

interface PopularPost {
  id: string;
  slug: string;
  title: string;
  createdAt: string;
  catSlug: string;
  user: {
    name: string;
  };
}

function MostPopular() {
  const [data, setData] = useState<PopularPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error("Error fetching popular posts:", error);
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
          <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse"></div>
          <h4 className="text-sm font-medium bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            What&apos;s Hot
          </h4>
        </div>
        <h1
          className={`text-2xl md:text-3xl font-bold ${
            theme === "dark"
              ? "bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
          }`}
        >
          Most Popular
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mt-2"></div>
      </div>

      {/* Posts Container */}
      {loading ? (
        <div className="flex flex-col gap-4 w-full">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`animate-pulse p-4 rounded-xl ${
                theme === "dark" ? "bg-slate-700/30" : "bg-gray-100/50"
              }`}
            >
              <div
                className={`h-3 rounded w-3/4 mb-2 ${
                  theme === "dark" ? "bg-slate-600" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`h-2 rounded w-1/2 ${
                  theme === "dark" ? "bg-slate-600" : "bg-gray-200"
                }`}
              ></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full">
          {data?.map(
            (
              item: {
                id: string;
                slug: string;
                title: string;
                createdAt: string;
                catSlug: string;
                user: {
                  name: string;
                };
              },
              index: number
            ) => (
              <div
                key={item.id}
                className="transform transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <MostPopularItems item={item} />
              </div>
            )
          )}
        </div>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default MostPopular;
