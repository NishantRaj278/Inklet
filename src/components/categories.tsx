"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import {
  FaCode,
  FaDesktop,
  FaMobile,
  FaPaintBrush,
  FaRocket,
  FaBrain,
  FaCamera,
  FaMusic,
  FaGamepad,
  FaBook,
  FaHeartbeat,
  FaPlane,
  FaUtensils,
  FaCar,
  FaGraduationCap,
  FaBriefcase,
  FaTags,
  FaStar,
} from "react-icons/fa";

interface Category {
  id: string;
  title: string;
  slug: string;
}

// Function to get appropriate icon based on category title or slug
const getCategoryIcon = (title: string, slug: string, index: number) => {
  const titleLower = title.toLowerCase();
  const slugLower = slug.toLowerCase();

  // Map category keywords to icons
  if (
    titleLower.includes("tech") ||
    titleLower.includes("code") ||
    slugLower.includes("tech") ||
    slugLower.includes("programming")
  ) {
    return <FaCode />;
  } else if (
    titleLower.includes("design") ||
    titleLower.includes("art") ||
    slugLower.includes("design")
  ) {
    return <FaPaintBrush />;
  } else if (
    titleLower.includes("mobile") ||
    titleLower.includes("app") ||
    slugLower.includes("mobile")
  ) {
    return <FaMobile />;
  } else if (
    titleLower.includes("web") ||
    titleLower.includes("website") ||
    slugLower.includes("web")
  ) {
    return <FaDesktop />;
  } else if (
    titleLower.includes("startup") ||
    titleLower.includes("business") ||
    slugLower.includes("startup")
  ) {
    return <FaRocket />;
  } else if (
    titleLower.includes("ai") ||
    titleLower.includes("intelligence") ||
    slugLower.includes("ai")
  ) {
    return <FaBrain />;
  } else if (
    titleLower.includes("photo") ||
    titleLower.includes("camera") ||
    slugLower.includes("photo")
  ) {
    return <FaCamera />;
  } else if (
    titleLower.includes("music") ||
    titleLower.includes("audio") ||
    slugLower.includes("music")
  ) {
    return <FaMusic />;
  } else if (
    titleLower.includes("game") ||
    titleLower.includes("gaming") ||
    slugLower.includes("game")
  ) {
    return <FaGamepad />;
  } else if (
    titleLower.includes("book") ||
    titleLower.includes("read") ||
    slugLower.includes("book")
  ) {
    return <FaBook />;
  } else if (
    titleLower.includes("health") ||
    titleLower.includes("fitness") ||
    slugLower.includes("health")
  ) {
    return <FaHeartbeat />;
  } else if (
    titleLower.includes("travel") ||
    titleLower.includes("trip") ||
    slugLower.includes("travel")
  ) {
    return <FaPlane />;
  } else if (
    titleLower.includes("food") ||
    titleLower.includes("cook") ||
    slugLower.includes("food")
  ) {
    return <FaUtensils />;
  } else if (
    titleLower.includes("car") ||
    titleLower.includes("auto") ||
    slugLower.includes("auto")
  ) {
    return <FaCar />;
  } else if (
    titleLower.includes("education") ||
    titleLower.includes("learn") ||
    slugLower.includes("education")
  ) {
    return <FaGraduationCap />;
  } else if (
    titleLower.includes("business") ||
    titleLower.includes("work") ||
    slugLower.includes("business")
  ) {
    return <FaBriefcase />;
  } else {
    // Default icons cycle through for unmatched categories
    const defaultIcons = [
      FaTags,
      FaStar,
      FaBook,
      FaRocket,
      FaPaintBrush,
      FaDesktop,
    ];
    const IconComponent = defaultIcons[index % defaultIcons.length];
    return <IconComponent />;
  }
};

const getData = async () => {
  const res = await fetch("https://inklet-seven.vercel.app/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

function Categories() {
  const { theme } = useTheme();
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getData();
        setData(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div
      className={`relative py-16 sm:py-20 lg:py-24 transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900/50 to-transparent"
          : "bg-gradient-to-b from-gray-50/50 to-transparent"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col items-center text-center gap-8 lg:gap-12">
          {/* Section Header */}
          <div className="space-y-4">
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                theme === "dark"
                  ? "from-white via-blue-200 to-purple-300"
                  : "from-gray-800 via-blue-600 to-purple-600"
              }`}
            >
              Popular Categories
            </h1>
            <p
              className={`text-base sm:text-lg max-w-2xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Explore diverse topics and discover content that interests you
            </p>
          </div>

          {/* Categories Grid */}
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
              {data.map((category: Category, index: number) => (
                <Link
                  href={`/blog?cat=${category.slug}`}
                  key={category.id}
                  className={`group relative overflow-hidden rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm border min-w-0 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/30 hover:border-gray-600/50"
                      : "bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/30 hover:border-gray-300/50"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl"></div>

                  {/* Category Icon */}
                  <div
                    className={`relative z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                        : "bg-gradient-to-br from-blue-400 to-purple-400 text-white"
                    }`}
                  >
                    {getCategoryIcon(category.title, category.slug, index)}
                  </div>

                  {/* Category Title */}
                  <span
                    className={`relative z-10 text-xs sm:text-sm font-semibold transition-colors duration-300 truncate ${
                      theme === "dark"
                        ? "text-gray-100 group-hover:text-white"
                        : "text-gray-800 group-hover:text-gray-900"
                    }`}
                  >
                    {category.title}
                  </span>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-300"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
