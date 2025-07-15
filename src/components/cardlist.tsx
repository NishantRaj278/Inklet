"use client";

import React, { useState, useEffect } from "react";
import Card from "./card";
import Pagination from "./pagination";
import { useTheme } from "@/context/ThemeContext";

const getData = async (page: number) => {
  const response = await fetch(`https://inklet-seven.vercel.app/api/posts?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

interface Post {
  id: string;
  title: string;
  content: string;
  img: string;
  createdAt: string;
  catSlug: string;
  desc: string;
  slug: string;
}

function Cardlist({ page }: { page: number }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getData(page);
        setPosts(data.posts);
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const POST_PER_PAGE = 4;
  const hasPrevious = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;
  return (
    <div className="lg:flex-5 flex flex-col items-start justify-start gap-8">
      {/* Modern Header Section */}
      <div className="w-full">
        <div
          className={`relative overflow-hidden rounded-2xl p-8 ${
            theme === "dark"
              ? "bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/30"
              : "bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm border border-blue-200/30"
          }`}
        >
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className={`absolute top-0 right-0 w-32 h-32 rounded-full ${
                theme === "dark" ? "bg-blue-400" : "bg-blue-500"
              } transform translate-x-16 -translate-y-16`}
            ></div>
            <div
              className={`absolute bottom-0 left-0 w-24 h-24 rounded-full ${
                theme === "dark" ? "bg-purple-400" : "bg-purple-500"
              } transform -translate-x-12 translate-y-12`}
            ></div>
          </div>

          <div className="relative z-10">
            <h1
              className={`text-4xl font-bold mb-2 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              }`}
            >
              Recent Posts
            </h1>
            <div
              className={`w-20 h-1 rounded-full ${
                theme === "dark"
                  ? "bg-gradient-to-r from-blue-400 to-purple-400"
                  : "bg-gradient-to-r from-blue-500 to-purple-500"
              }`}
            ></div>
            <p
              className={`mt-3 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Discover the latest stories and insights
            </p>
          </div>
        </div>
      </div>

      {/* Posts Container */}
      <div
        className={`w-full rounded-2xl p-6 ${
          theme === "dark"
            ? "bg-slate-800/30 backdrop-blur-sm border border-slate-700/30"
            : "bg-white/50 backdrop-blur-sm border border-gray-200/30"
        } shadow-lg`}
      >
        {loading ? (
          <div className="flex flex-col gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`animate-pulse p-6 rounded-xl ${
                  theme === "dark" ? "bg-slate-700/50" : "bg-gray-100/50"
                }`}
              >
                <div
                  className={`h-4 rounded w-3/4 mb-3 ${
                    theme === "dark" ? "bg-slate-600" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`h-3 rounded w-1/2 ${
                    theme === "dark" ? "bg-slate-600" : "bg-gray-200"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-full">
            {posts?.map((post: Post, index: number) => (
              <div
                key={post.id}
                className="transform transition-all duration-300 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "slideUp 0.6s ease-out forwards",
                }}
              >
                <Card key={post.id} post={post} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination Container */}
      <div
        className={`w-full rounded-xl p-4 ${
          theme === "dark"
            ? "bg-slate-800/20 backdrop-blur-sm border border-slate-700/20"
            : "bg-gray-50/50 backdrop-blur-sm border border-gray-200/20"
        }`}
      >
        <Pagination page={page} hasNext={hasNext} hasPrevious={hasPrevious} />
      </div>

      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

export default Cardlist;
