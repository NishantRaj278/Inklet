"use client";

import React, { useState, useEffect } from "react";
import Card from "./card";
import { useTheme } from "@/context/ThemeContext";

const getData = async (cat: string) => {
  const response = await fetch(`https://inklet-seven.vercel.app/api/blog?cat=${cat}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

function PostList({ cat }: { cat: string }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getData(cat);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [cat]);

  if (loading) {
    return (
      <div className="flex-5 flex flex-col items-start justify-start gap-8 p-8">
        {/* Loading Header */}
        <div
          className={`h-8 w-48 rounded-lg animate-pulse ${
            theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
          }`}
        ></div>

        {/* Loading Cards */}
        <div className="flex flex-col gap-8 w-full">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`animate-pulse rounded-2xl p-6 ${
                theme === "dark"
                  ? "bg-slate-800/30 border border-slate-700/30"
                  : "bg-white/40 border border-gray-200/30"
              } backdrop-blur-sm`}
            >
              <div className="flex gap-6">
                <div
                  className={`w-64 h-48 rounded-xl ${
                    theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                  }`}
                ></div>
                <div className="flex-1 space-y-4">
                  <div
                    className={`h-6 w-3/4 rounded ${
                      theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                    }`}
                  ></div>
                  <div
                    className={`h-4 w-full rounded ${
                      theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                    }`}
                  ></div>
                  <div
                    className={`h-4 w-5/6 rounded ${
                      theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                    }`}
                  ></div>
                  <div
                    className={`h-8 w-32 rounded-lg ${
                      theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-5 flex flex-col items-start justify-start gap-8 p-8">
      <div className="flex items-center gap-3">
        <h1
          className={`text-2xl lg:text-3xl font-bold ${
            theme === "dark"
              ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          }`}
        >
          Blogs
        </h1>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            theme === "dark"
              ? "bg-slate-700/50 text-gray-300"
              : "bg-gray-100/80 text-gray-600"
          }`}
        >
          {posts?.length || 0}
        </span>
      </div>

      {posts && posts.length > 0 ? (
        <div className="flex flex-col gap-8 w-full">
          {posts.map(
            (post: {
              id: string;
              title: string;
              content: string;
              img: string;
              createdAt: string;
              catSlug: string;
              desc: string;
              slug: string;
            }) => (
              <Card key={post.id} post={post} />
            )
          )}
        </div>
      ) : (
        <div
          className={`rounded-2xl p-12 text-center w-full ${
            theme === "dark"
              ? "bg-slate-800/20 backdrop-blur-sm border border-slate-700/20"
              : "bg-white/30 backdrop-blur-sm border border-gray-200/20"
          }`}
        >
          <div
            className={`inline-flex p-6 rounded-full mb-4 ${
              theme === "dark" ? "bg-slate-700/30" : "bg-gray-100/30"
            }`}
          >
            <svg
              className={`w-8 h-8 ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3
            className={`text-xl font-semibold mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            No posts found
          </h3>
          <p
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {cat
              ? `No posts available in the "${cat}" category yet.`
              : "No posts available yet."}
          </p>
        </div>
      )}
    </div>
  );
}

export default PostList;
