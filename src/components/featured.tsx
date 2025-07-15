"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface FeaturedItem {
  img?: string;
  title?: string;
  desc?: string;
  slug?: string;
}

const getData = async () => {
  const response = await fetch("https://inklet-seven.vercel.app/api/popular");
  if (!response.ok) {
    throw new Error("Failed to fetch featured content");
  }
  return response.json();
};

function Featured() {
  const [item, setItem] = useState<FeaturedItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setItem(data[0]);
      } catch (error) {
        console.error("Error fetching featured content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Debug log to check theme changes
  useEffect(() => {
    console.log("Theme changed to:", theme);
  }, [theme]);

  if (loading) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-0">
        <div className={`absolute inset-0 transition-colors duration-500 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
            : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        }`}></div>
        <div className="relative z-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      key={theme} // Force re-render when theme changes
      className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-8 ${
        theme === 'dark' ? 'dark' : ''
      }`}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}></div>
      
      {/* Floating Elements */}
      <div className={`absolute top-24 sm:top-28 left-4 sm:left-8 w-16 sm:w-24 h-16 sm:h-24 rounded-full blur-xl animate-pulse ${
        theme === 'dark' ? 'bg-blue-600/10' : 'bg-blue-400/15'
      }`}></div>
      <div className={`absolute bottom-16 right-4 sm:right-8 w-24 sm:w-32 h-24 sm:h-32 rounded-full blur-xl animate-pulse delay-1000 ${
        theme === 'dark' ? 'bg-purple-600/10' : 'bg-purple-400/15'
      }`}></div>
      <div className={`absolute top-1/3 left-1/6 sm:left-1/4 w-12 sm:w-16 h-12 sm:h-16 rounded-full blur-lg animate-bounce delay-500 ${
        theme === 'dark' ? 'bg-pink-600/10' : 'bg-pink-400/15'
      }`}></div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8 sm:py-12">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 lg:space-y-8">
          
          {/* Hero Text */}
          <div className="space-y-2 sm:space-y-3 lg:space-y-4 animate-fade-in mt-4 sm:mt-6 lg:mt-8">
            <div className="space-y-1">
              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r leading-tight ${
                theme === 'dark' 
                  ? 'from-white via-gray-200 to-white' 
                  : 'from-gray-800 via-gray-600 to-gray-800'
              } bg-clip-text text-transparent`}>
                Your Thoughts.
              </h1>
              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r leading-tight ${
                theme === 'dark' 
                  ? 'from-blue-400 via-purple-400 to-pink-400' 
                  : 'from-blue-600 via-purple-600 to-pink-600'
              } bg-clip-text text-transparent`}>
                Your Voice.
              </h1>
              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r leading-tight ${
                theme === 'dark' 
                  ? 'from-white via-gray-200 to-white' 
                  : 'from-gray-800 via-gray-600 to-gray-800'
              } bg-clip-text text-transparent`}>
                Your Blog.
              </h1>
            </div>
            <p className={`text-sm sm:text-base lg:text-lg xl:text-xl max-w-xl sm:max-w-2xl mx-auto font-medium px-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Share your stories with the world. Create, inspire, and connect through the power of words.
            </p>
          </div>

          {/* Featured Content Card */}
          {item && (
            <div className="w-full max-w-7xl mx-auto mt-6 sm:mt-8 lg:mt-10">
              <div className={`backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl overflow-hidden hover:scale-[1.01] transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-gray-800/90 border border-gray-700/30' 
                  : 'bg-white/90 border border-white/30'
              }`}>
                <div className="flex flex-col lg:flex-row">
                  
                  {/* Image Section */}
                  <div className="lg:w-1/2 relative">
                    <div className="aspect-[16/9] sm:aspect-[16/10] lg:aspect-auto lg:h-[450px] relative overflow-hidden">
                      {item.img && (
                        <Image
                          src={item.img}
                          alt={item.title || "Featured content"}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/5"></div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center space-y-4 sm:space-y-6">
                    <div className="space-y-3 sm:space-y-4 lg:space-y-5 text-left">
                      <span className="inline-block px-2 py-0.5 sm:px-2.5 sm:py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full">
                        Featured Story
                      </span>
                      
                      <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight ${
                        theme === 'dark' ? 'text-white' : 'text-gray-800'
                      }`}>
                        {item.title}
                      </h2>
                      
                      <p className={`text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 pt-2 sm:pt-3 lg:pt-4">
                      <Link
                        href={`/posts/${item.slug}`}
                        className="group relative inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-xs sm:text-sm w-full sm:w-auto"
                      >
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="relative z-10">Read Story</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                      
                      <Link
                        href="/write"
                        className={`inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 border font-medium rounded-md transition-all duration-300 text-xs sm:text-sm w-full sm:w-auto ${
                          theme === 'dark' 
                            ? 'border-gray-600 text-gray-300 hover:bg-gray-800' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Start Writing
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Featured;
