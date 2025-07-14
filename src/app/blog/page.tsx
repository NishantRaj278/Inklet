"use client";

import Menu from "@/components/menu";
import PostList from "@/components/postlist";
import { useTheme } from "@/context/ThemeContext";
import { FaLayerGroup, FaFilter } from "react-icons/fa";
import { use } from "react";

function BlogPage({ searchParams }: { searchParams: Promise<{ cat: string }> }) {
  const { theme } = useTheme();
  const { cat } = use(searchParams);
  
  return (
    <div className="min-h-screen pb-20">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full ${
          theme === 'dark' ? 'bg-blue-500/5' : 'bg-blue-500/10'
        } blur-3xl`}></div>
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full ${
          theme === 'dark' ? 'bg-purple-500/5' : 'bg-purple-500/10'
        } blur-3xl`}></div>
        <div className={`absolute top-1/3 right-1/4 w-64 h-64 rounded-full ${
          theme === 'dark' ? 'bg-pink-500/3' : 'bg-pink-500/8'
        } blur-3xl`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-20">
        {/* Hero Section */}
        <div className={`rounded-3xl overflow-hidden mb-8 ${
          theme === 'dark' 
            ? 'bg-slate-800/30 backdrop-blur-sm border border-slate-700/30' 
            : 'bg-white/50 backdrop-blur-sm border border-gray-200/30'
        } shadow-2xl`}>
          <div className="p-6 lg:p-10 text-center">
            {/* Category Icon */}
            <div className={`inline-flex p-3 rounded-xl mb-4 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500'
            } shadow-lg`}>
              {cat ? (
                <FaFilter className="text-white text-xl" />
              ) : (
                <FaLayerGroup className="text-white text-xl" />
              )}
            </div>

            {/* Title */}
            <h1 className={`text-3xl lg:text-4xl font-bold mb-4 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              {cat ? `${cat.charAt(0).toUpperCase() + cat.slice(1)} Blog` : 'All Posts'}
            </h1>

            {/* Subtitle */}
            <p className={`text-base lg:text-lg max-w-xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {cat 
                ? `Discover amazing stories and insights about ${cat.toLowerCase()}`
                : 'Explore our collection of stories, insights, and perspectives from our community'
              }
            </p>

            {/* Category Badge */}
            {cat && (
              <div className="mt-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  theme === 'dark'
                    ? 'bg-slate-700/50 text-blue-300 border border-slate-600/30'
                    : 'bg-gray-100/80 text-blue-600 border border-gray-200/50'
                } backdrop-blur-sm`}>
                  {cat}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Posts Section */}
          <div className="lg:col-span-8">
            <div className={`rounded-2xl ${
              theme === 'dark' 
                ? 'bg-slate-800/20 backdrop-blur-sm border border-slate-700/20' 
                : 'bg-white/30 backdrop-blur-sm border border-gray-200/20'
            } shadow-lg overflow-hidden`}>
              <PostList cat={cat} />
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

export default BlogPage;
