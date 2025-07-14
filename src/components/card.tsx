"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

function Card({
  post,
}: {
  post: {
    id: string;
    title: string;
    content: string;
    img: string;
    createdAt: string;
    catSlug: string;
    desc: string;
    slug: string;
  };
  key: string;
}) {
  const { theme } = useTheme();
  
  return (
    <div className={`group w-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
      theme === 'dark' 
        ? 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 hover:border-slate-600/50' 
        : 'bg-white/70 backdrop-blur-sm border border-gray-200/30 hover:border-gray-300/50'
    } transform hover:-translate-y-2`}>
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        {post.img && (
          <div className="w-full md:w-1/2 h-[280px] relative overflow-hidden">
            <Image
              src={post.img}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Image Overlay */}
            <div className={`absolute inset-0 ${
              theme === 'dark' 
                ? 'bg-gradient-to-t from-slate-900/60 via-transparent to-transparent' 
                : 'bg-gradient-to-t from-black/20 via-transparent to-transparent'
            } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                theme === 'dark'
                  ? 'bg-blue-600/80 text-blue-100'
                  : 'bg-blue-500/80 text-white'
              }`}>
                {post.catSlug}
              </span>
            </div>
          </div>
        )}
        
        {/* Content Section */}
        <div className={`w-full md:w-1/2 p-6 flex flex-col justify-between ${
          !post.img ? 'md:w-full' : ''
        }`}>
          {/* Date */}
          <div className="mb-4">
            <time className={`text-sm font-medium ${
              theme === 'dark' 
                ? 'text-blue-400' 
                : 'text-blue-600'
            }`}>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          {/* Title */}
          <h2 className={`text-xl md:text-2xl font-bold mb-4 line-clamp-2 group-hover:${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          } transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {post.title}
          </h2>

          {/* Description */}
          <p className={`text-sm md:text-base mb-6 line-clamp-3 leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {post.desc || 'No description available'}
          </p>

          {/* Read More Button */}
          <div className="flex items-center justify-between">
            <Link 
              href={`/posts/${post.slug}`} 
              className={`group/link inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white'
              } shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              <span>Read More</span>
              <svg 
                className="w-4 h-4 transition-transform group-hover/link:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className={`h-1 w-0 group-hover:w-full transition-all duration-500 ${
        theme === 'dark' 
          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
          : 'bg-gradient-to-r from-blue-400 to-purple-400'
      }`}></div>
    </div>
  );
}

export default Card;
