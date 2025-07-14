"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaGoogle, FaSignInAlt, FaSpinner } from "react-icons/fa";
import Image from "next/image";

function LoginPage() {
  const { status } = useSession();
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950' 
          : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50'
      }`}>
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full ${
            theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-500/20'
          } blur-3xl animate-pulse`}></div>
          <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full ${
            theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-500/20'
          } blur-3xl animate-pulse`}></div>
        </div>
        
        <div className={`relative z-10 flex flex-col items-center gap-6 p-8 rounded-3xl ${
          theme === 'dark' 
            ? 'bg-slate-800/30 backdrop-blur-sm border border-slate-700/30' 
            : 'bg-white/50 backdrop-blur-sm border border-gray-200/30'
        } shadow-2xl`}>
          <div className={`relative p-4 rounded-2xl ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500'
          } shadow-lg`}>
            <FaSpinner className="text-white text-2xl animate-spin" />
          </div>
          <div className="text-center">
            <h2 className={`text-xl font-semibold mb-2 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Loading...
            </h2>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Please wait while we set things up
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950' 
          : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50'
      }`}>
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full ${
            theme === 'dark' ? 'bg-green-500/10' : 'bg-green-500/20'
          } blur-3xl animate-pulse`}></div>
          <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full ${
            theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-500/20'
          } blur-3xl animate-pulse`}></div>
        </div>
        
        <div className={`relative z-10 flex flex-col items-center gap-6 p-8 rounded-3xl ${
          theme === 'dark' 
            ? 'bg-slate-800/30 backdrop-blur-sm border border-slate-700/30' 
            : 'bg-white/50 backdrop-blur-sm border border-gray-200/30'
        } shadow-2xl`}>
          <div className={`relative p-4 rounded-2xl ${
            'bg-gradient-to-r from-green-600 to-emerald-600'
          } shadow-lg animate-pulse`}>
            <FaSpinner className="text-white text-2xl animate-spin" />
          </div>
          <div className="text-center">
            <h2 className={`text-xl font-semibold mb-2 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Redirecting...
            </h2>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Taking you to your dashboard
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50'
    }`}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full ${
          theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-500/20'
        } blur-3xl animate-pulse`}></div>
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full ${
          theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-500/20'
        } blur-3xl animate-pulse`}></div>
        <div className={`absolute top-1/3 left-1/4 w-64 h-64 rounded-full ${
          theme === 'dark' ? 'bg-pink-500/5' : 'bg-pink-500/15'
        } blur-3xl animate-pulse delay-700`}></div>
        <div className={`absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full ${
          theme === 'dark' ? 'bg-cyan-500/5' : 'bg-cyan-500/15'
        } blur-3xl animate-pulse delay-1000`}></div>
      </div>

      {/* Main Login Card */}
      <div className={`relative z-10 w-full max-w-md mx-6 ${
        theme === 'dark' 
          ? 'bg-slate-800/30 backdrop-blur-sm border border-slate-700/30' 
          : 'bg-white/50 backdrop-blur-sm border border-gray-200/30'
      } rounded-3xl shadow-2xl overflow-hidden`}>
        
        {/* Header Section */}
        <div className="p-8 pb-6 text-center">
          {/* Logo/Brand */}
          <div className={`inline-flex p-4 rounded-2xl mb-6 ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500'
          } shadow-lg transform hover:scale-105 transition-transform duration-300`}>
            <Image
              src="/inkletlogo.png"
              alt="inklet logo"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          
          <h1 className={`text-3xl font-bold mb-3 ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
          }`}>
            Welcome to inklet.
          </h1>
          
          <p className={`text-sm leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Sign in to your account to start sharing your stories and connect with our amazing community
          </p>
        </div>

        {/* Login Form */}
        <div className="p-8 pt-4">
          <div className="space-y-6">
            {/* Google Sign In Button */}
            <button
              onClick={() => signIn("google")}
              className={`group w-full flex items-center justify-center gap-4 px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg'
              }`}
            >
              <FaGoogle className="text-xl group-hover:rotate-12 transition-transform duration-300" />
              <span>Continue with Google</span>
              <FaSignInAlt className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Divider */}
            <div className="relative">
              <div className={`absolute inset-0 flex items-center ${
                theme === 'dark' ? 'text-slate-600' : 'text-gray-300'
              }`}>
                <div className="w-full border-t border-current opacity-30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-3 ${
                  theme === 'dark' 
                    ? 'bg-slate-800/30 text-gray-400' 
                    : 'bg-white/50 text-gray-500'
                } backdrop-blur-sm rounded-full`}>
                  Quick & Secure
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🚀', title: 'Fast Login', desc: 'One-click access' },
                { icon: '🔒', title: 'Secure', desc: 'Google protected' },
                { icon: '✨', title: 'No Passwords', desc: 'Hassle-free' },
                { icon: '🌟', title: 'Premium', desc: 'Full features' }
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                    theme === 'dark' 
                      ? 'bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30' 
                      : 'bg-gray-100/50 hover:bg-gray-100/80 border border-gray-200/30'
                  } backdrop-blur-sm`}
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h3 className={`text-sm font-semibold mb-1 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-6 pt-0 text-center border-t ${
          theme === 'dark' ? 'border-slate-700/30' : 'border-gray-200/30'
        }`}>
          <p className={`text-xs ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            By signing in, you agree to our{' '}
            <span className={`${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            } hover:underline cursor-pointer`}>
              Terms of Service
            </span>{' '}
            and{' '}
            <span className={`${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            } hover:underline cursor-pointer`}>
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
