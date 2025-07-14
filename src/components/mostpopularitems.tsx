"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

function MostPopularItems({
  item,
}: {
  item: {
    id: string;
    title: string;
    createdAt: string;
    slug: string;
    catSlug: string;
    user: { name: string };
  };
}) {
  const { theme } = useTheme();
  
  return (
    <div className={`group p-4 rounded-xl transition-all duration-300 hover:shadow-lg ${
      theme === 'dark' 
        ? 'bg-slate-700/20 hover:bg-slate-700/40 border border-slate-600/20 hover:border-slate-600/40' 
        : 'bg-gray-50/50 hover:bg-gray-100/50 border border-gray-200/30 hover:border-gray-300/50'
    } transform hover:-translate-y-1`}>
      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-emerald-100 group-hover:from-emerald-500 group-hover:to-teal-500'
            : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white group-hover:from-emerald-400 group-hover:to-teal-400'
        } shadow-sm`}>
          {item.catSlug}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent"></div>
      </div>

      {/* Title */}
      <Link 
        href={`/posts/${item.slug}`} 
        className={`block text-sm font-medium leading-relaxed mb-3 transition-colors duration-300 ${
          theme === 'dark' 
            ? 'text-gray-200 hover:text-emerald-400 group-hover:text-emerald-300' 
            : 'text-gray-800 hover:text-emerald-600 group-hover:text-emerald-700'
        }`}
      >
        {item.title.length > 60 ? item.title.slice(0, 60) + "..." : item.title}
      </Link>

      {/* Author and Date */}
      <div className={`flex items-center gap-2 text-xs ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <div className="flex items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full ${
            theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
          }`}></div>
          <span className="font-medium">{item.user.name}</span>
        </div>
        <span>•</span>
        <time>{new Date(item.createdAt).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })}</time>
      </div>
    </div>
  );
}

export default MostPopularItems;
