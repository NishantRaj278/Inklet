"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

function Pagination({
  page,
  hasPrevious,
  hasNext,
}: {
  page: number;
  hasPrevious: boolean;
  hasNext: boolean;
}) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <div className="flex justify-between items-center w-full">
      {/* Previous Button */}
      <button
        className={`group relative overflow-hidden px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
          !hasPrevious
            ? theme === "dark"
              ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
              : "bg-gray-200/50 text-gray-400 cursor-not-allowed"
            : theme === "dark"
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-blue-500/25"
            : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-400 hover:to-purple-400 shadow-lg hover:shadow-blue-500/25"
        }`}
        disabled={!hasPrevious}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </span>
        {hasPrevious && (
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        )}
      </button>

      {/* Page Indicator */}
      <div
        className={`px-4 py-2 rounded-lg ${
          theme === "dark"
            ? "bg-slate-800/50 text-slate-300 border border-slate-700/30"
            : "bg-white/50 text-gray-600 border border-gray-200/30"
        } backdrop-blur-sm`}
      >
        <span className="font-medium">Page {page}</span>
      </div>

      {/* Next Button */}
      <button
        className={`group relative overflow-hidden px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
          !hasNext
            ? theme === "dark"
              ? "bg-slate-700/50 text-slate-500 cursor-not-allowed"
              : "bg-gray-200/50 text-gray-400 cursor-not-allowed"
            : theme === "dark"
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/25"
            : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400 shadow-lg hover:shadow-purple-500/25"
        }`}
        disabled={!hasNext}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        <span className="relative z-10 flex items-center gap-2">
          Next
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
        {hasNext && (
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        )}
      </button>
    </div>
  );
}

export default Pagination;
