"use client";

import Image from "next/image";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaClock } from "react-icons/fa";

function Comment({
  comment,
}: {
  key: string;
  comment: {
    content: string;
    user: { name: string; image: string };
    createdAt: string;
  };
}) {
  const { theme } = useTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    // Check if it's the same day
    const isToday = date.toDateString() === now.toDateString();
    if (isToday) return "Today";

    // Check if it was yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
    if (isYesterday) return "Yesterday";

    // Calculate days difference for other cases
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`group rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${
        theme === "dark"
          ? "bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:bg-slate-800/50"
          : "bg-white/50 backdrop-blur-sm border border-gray-200/30 hover:bg-white/70"
      }`}
    >
      {/* Comment Header */}
      <div className="flex items-start gap-4 mb-4">
        {comment?.user?.image && (
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 relative">
              <Image
                src={comment.user.image}
                alt={comment.user.name || "User"}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20"></div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3
              className={`font-semibold truncate ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {comment?.user?.name}
            </h3>
            <div
              className={`flex items-center gap-1 text-xs ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <FaClock className="text-xs" />
              <span>{formatDate(comment?.createdAt)}</span>
            </div>
          </div>

          {/* Comment Content */}
          <div
            className={`text-sm leading-relaxed ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <p>{comment?.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
