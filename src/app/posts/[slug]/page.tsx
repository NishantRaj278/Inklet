"use client";

import Comments from "@/components/comments";
import Menu from "@/components/menu";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect, use } from "react";

interface Post {
  id: string;
  title: string;
  desc: string;
  img?: string;
  catSlug?: string;
  createdAt: string;
  user: {
    name: string;
    image?: string;
  };
}

const getData = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

function SinglePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await getData(slug);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20">
          {/* Loading Skeleton */}
          <div className="animate-pulse">
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6">
                <div
                  className={`h-12 rounded-lg ${
                    theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                  }`}
                ></div>
                <div
                  className={`h-6 rounded w-3/4 ${
                    theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                  }`}
                ></div>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                    }`}
                  ></div>
                  <div className="space-y-2">
                    <div
                      className={`h-4 w-24 rounded ${
                        theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                      }`}
                    ></div>
                    <div
                      className={`h-3 w-20 rounded ${
                        theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
              <div
                className={`h-80 rounded-2xl ${
                  theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-24 -left-24 w-96 h-96 rounded-full ${
            theme === "dark" ? "bg-blue-500/5" : "bg-blue-500/10"
          } blur-3xl`}
        ></div>
        <div
          className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full ${
            theme === "dark" ? "bg-purple-500/5" : "bg-purple-500/10"
          } blur-3xl`}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-20">
        {/* Hero Section */}
        <div
          className={`rounded-3xl overflow-hidden mb-12 ${
            theme === "dark"
              ? "bg-slate-800/30 backdrop-blur-sm border border-slate-700/30"
              : "bg-white/50 backdrop-blur-sm border border-gray-200/30"
          } shadow-2xl`}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Category Badge */}
              {post?.catSlug && (
                <div className="mb-6">
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-blue-100"
                        : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    } shadow-lg`}
                  >
                    {post.catSlug}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1
                className={`text-3xl lg:text-5xl font-bold mb-8 leading-tight ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                }`}
              >
                {post?.title}
              </h1>

              {/* Author Info */}
              <div
                className={`flex items-center gap-4 p-4 rounded-xl ${
                  theme === "dark"
                    ? "bg-slate-700/30 border border-slate-600/30"
                    : "bg-gray-100/50 border border-gray-200/30"
                } backdrop-blur-sm`}
              >
                {post?.user?.image && (
                  <div className="relative">
                    <div className="w-14 h-14 relative">
                      <Image
                        src={post.user.image}
                        alt={post.user.name || "Author"}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20"></div>
                  </div>
                )}
                <div>
                  <h2
                    className={`font-semibold ${
                      theme === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {post?.user?.name}
                  </h2>
                  <h3
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {post?.createdAt
                      ? new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Published recently"}
                  </h3>
                </div>
              </div>
            </div>

            {/* Image Section */}
            {post?.img && (
              <div className="relative h-64 lg:h-full min-h-[400px] overflow-hidden">
                <Image
                  src={post.img}
                  alt={post.title || "Featured image"}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div
                  className={`absolute inset-0 ${
                    theme === "dark"
                      ? "bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"
                      : "bg-gradient-to-t from-black/20 via-transparent to-transparent"
                  }`}
                ></div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-8">
            <div
              className={`rounded-2xl p-8 lg:p-12 ${
                theme === "dark"
                  ? "bg-slate-800/30 backdrop-blur-sm border border-slate-700/30"
                  : "bg-white/50 backdrop-blur-sm border border-gray-200/30"
              } shadow-lg mb-8`}
            >
              <div
                dangerouslySetInnerHTML={{ __html: post?.desc || "" }}
                className={`prose prose-lg max-w-none ${
                  theme === "dark"
                    ? "prose-invert prose-headings:text-gray-200 prose-p:text-gray-300 prose-strong:text-gray-200 prose-a:text-blue-400 hover:prose-a:text-blue-300"
                    : "prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-700"
                } prose-headings:font-bold prose-p:leading-relaxed prose-a:transition-colors`}
              />
            </div>

            {/* Comments Section */}
            <div
              className={`rounded-2xl p-8 ${
                theme === "dark"
                  ? "bg-slate-800/30 backdrop-blur-sm border border-slate-700/30"
                  : "bg-white/50 backdrop-blur-sm border border-gray-200/30"
              } shadow-lg`}
            >
              <Comments postSlug={slug} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <Menu />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePostPage;
