"use client";

import { useTheme } from "@/context/ThemeContext";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50'
    }`}>
      {children}
    </div>
  );
}
