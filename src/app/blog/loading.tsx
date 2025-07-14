"use client";

import { useTheme } from "@/context/ThemeContext";

function BlogLoading() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950"
          : "bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50"
      }`}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-24 -left-24 w-96 h-96 rounded-full ${
            theme === "dark" ? "bg-blue-500/5" : "bg-blue-500/10"
          } blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full ${
            theme === "dark" ? "bg-purple-500/5" : "bg-purple-500/10"
          } blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute top-1/3 right-1/4 w-64 h-64 rounded-full ${
            theme === "dark" ? "bg-pink-500/3" : "bg-pink-500/8"
          } blur-3xl animate-pulse delay-700`}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-20">
        {/* Hero Section Skeleton */}
        <div
          className={`rounded-3xl p-8 lg:p-12 mb-12 ${
            theme === "dark"
              ? "bg-slate-800/30 backdrop-blur-sm border border-slate-700/30"
              : "bg-white/50 backdrop-blur-sm border border-gray-200/30"
          } shadow-2xl`}
        >
          <div className="text-center">
            {/* Loading spinner */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-500/20 rounded-full"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>

            {/* Title skeleton */}
            <div
              className={`h-12 w-96 mx-auto rounded-2xl mb-4 animate-pulse ${
                theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
              }`}
            ></div>

            {/* Subtitle skeleton */}
            <div
              className={`h-6 w-64 mx-auto rounded-xl animate-pulse ${
                theme === "dark" ? "bg-slate-700/30" : "bg-gray-200/30"
              }`}
            ></div>
          </div>
        </div>

        {/* Categories skeleton */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className={`h-12 w-24 rounded-full animate-pulse ${
                theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            ></div>
          ))}
        </div>

        {/* Posts grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 ${
                theme === "dark"
                  ? "bg-slate-800/30 backdrop-blur-sm border border-slate-700/30"
                  : "bg-white/50 backdrop-blur-sm border border-gray-200/30"
              } shadow-lg`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image skeleton */}
              <div
                className={`w-full h-48 rounded-xl mb-4 animate-pulse ${
                  theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                }`}
              ></div>

              {/* Category badge skeleton */}
              <div
                className={`h-6 w-20 rounded-full mb-3 animate-pulse ${
                  theme === "dark" ? "bg-slate-700/30" : "bg-gray-200/30"
                }`}
              ></div>

              {/* Title skeleton */}
              <div
                className={`h-6 w-full rounded-lg mb-2 animate-pulse ${
                  theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                }`}
              ></div>
              <div
                className={`h-6 w-3/4 rounded-lg mb-3 animate-pulse ${
                  theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                }`}
              ></div>

              {/* Description skeleton */}
              <div
                className={`h-4 w-full rounded mb-2 animate-pulse ${
                  theme === "dark" ? "bg-slate-700/30" : "bg-gray-200/30"
                }`}
              ></div>
              <div
                className={`h-4 w-5/6 rounded mb-2 animate-pulse ${
                  theme === "dark" ? "bg-slate-700/30" : "bg-gray-200/30"
                }`}
              ></div>
              <div
                className={`h-4 w-2/3 rounded mb-4 animate-pulse ${
                  theme === "dark" ? "bg-slate-700/30" : "bg-gray-200/30"
                }`}
              ></div>

              {/* Author and date skeleton */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full animate-pulse ${
                    theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                  }`}
                ></div>
                <div className="flex-1">
                  <div
                    className={`h-4 w-20 rounded mb-1 animate-pulse ${
                      theme === "dark" ? "bg-slate-700/30" : "bg-gray-200/30"
                    }`}
                  ></div>
                  <div
                    className={`h-3 w-16 rounded animate-pulse ${
                      theme === "dark" ? "bg-slate-700/30" : "bg-gray-200/30"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading text */}
        <div className="text-center mt-12">
          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl ${
              theme === "dark"
                ? "bg-slate-800/50 backdrop-blur-sm border border-slate-700/30"
                : "bg-white/70 backdrop-blur-sm border border-gray-200/30"
            } shadow-lg`}
          >
            <div className="flex gap-1">
              <div
                className={`w-2 h-2 rounded-full animate-bounce ${
                  theme === "dark" ? "bg-blue-400" : "bg-blue-500"
                }`}
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className={`w-2 h-2 rounded-full animate-bounce ${
                  theme === "dark" ? "bg-blue-400" : "bg-blue-500"
                }`}
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className={`w-2 h-2 rounded-full animate-bounce ${
                  theme === "dark" ? "bg-blue-400" : "bg-blue-500"
                }`}
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
            <span
              className={`text-lg font-medium ${
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Loading amazing content...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogLoading;
