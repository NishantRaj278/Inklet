"use client";

import { useTheme } from "@/context/ThemeContext";

function AppLoading() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50'
    }`}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full ${
          theme === 'dark' ? 'bg-blue-500/5' : 'bg-blue-500/10'
        } blur-3xl animate-pulse`}></div>
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full ${
          theme === 'dark' ? 'bg-purple-500/5' : 'bg-purple-500/10'
        } blur-3xl animate-pulse`}></div>
        <div className={`absolute top-1/3 right-1/4 w-64 h-64 rounded-full ${
          theme === 'dark' ? 'bg-pink-500/3' : 'bg-pink-500/8'
        } blur-3xl animate-pulse delay-700`}></div>
        <div className={`absolute top-1/4 left-1/3 w-32 h-32 rounded-full ${
          theme === 'dark' ? 'bg-cyan-500/3' : 'bg-cyan-500/8'
        } blur-2xl animate-pulse delay-1000`}></div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        <div className={`rounded-3xl p-12 lg:p-16 ${
          theme === 'dark' 
            ? 'bg-slate-800/30 backdrop-blur-sm border border-slate-700/30' 
            : 'bg-white/50 backdrop-blur-sm border border-gray-200/30'
        } shadow-2xl max-w-md mx-auto`}>
          
          {/* Logo Section */}
          <div className="mb-8">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className={`absolute inset-0 rounded-2xl ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600' 
                  : 'bg-gradient-to-br from-blue-500 to-purple-500'
              } animate-pulse`}></div>
              <div className="absolute inset-2 bg-white rounded-xl flex items-center justify-center">
                <div className={`w-12 h-12 rounded-lg ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600' 
                    : 'bg-gradient-to-br from-blue-500 to-purple-500'
                } flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl">I</span>
                </div>
              </div>
            </div>
            
            {/* App Name */}
            <h1 className={`text-3xl lg:text-4xl font-bold mb-2 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              Inklet
            </h1>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Share your stories with the world
            </p>
          </div>

          {/* Loading Animation */}
          <div className="mb-8">
            <div className="relative">
              {/* Outer ring */}
              <div className="w-20 h-20 mx-auto border-4 border-gray-200/30 rounded-full"></div>
              
              {/* Animated ring */}
              <div className={`absolute inset-0 w-20 h-20 mx-auto border-4 border-transparent rounded-full ${
                theme === 'dark' 
                  ? 'border-t-blue-400 border-r-purple-400' 
                  : 'border-t-blue-500 border-r-purple-500'
              } animate-spin`}></div>
              
              {/* Inner dot */}
              <div className={`absolute inset-0 flex items-center justify-center`}>
                <div className={`w-3 h-3 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500'
                } animate-pulse`}></div>
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-4">
            <div className={`text-lg font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Getting ready...
            </div>
            
            {/* Animated dots */}
            <div className="flex justify-center gap-2">
              <div className={`w-2 h-2 rounded-full animate-bounce ${
                theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
              }`} style={{ animationDelay: '0ms' }}></div>
              <div className={`w-2 h-2 rounded-full animate-bounce ${
                theme === 'dark' ? 'bg-purple-400' : 'bg-purple-500'
              }`} style={{ animationDelay: '150ms' }}></div>
              <div className={`w-2 h-2 rounded-full animate-bounce ${
                theme === 'dark' ? 'bg-pink-400' : 'bg-pink-500'
              }`} style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>

          {/* Loading Steps */}
          <div className="mt-8 space-y-2">
            <div className={`text-xs ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span>Initializing app...</span>
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  theme === 'dark' ? 'bg-green-400' : 'bg-green-500'
                }`}></div>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span>Loading components...</span>
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  theme === 'dark' ? 'bg-yellow-400' : 'bg-yellow-500'
                }`} style={{ animationDelay: '200ms' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Setting up themes...</span>
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
                }`} style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-8 text-xs ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
        }`}>
          Powered by Next.js & Tailwind CSS
        </div>
      </div>
    </div>
  );
}

export default AppLoading;
