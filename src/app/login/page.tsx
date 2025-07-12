"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="px-48 w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="px-48 w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="text-lg text-green-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-48 w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-6 w-1/3 h-2/3 bg-gray-300 rounded-lg shadow-lg items-center justify-around">
        <button
          className="bg-red-500 px-4 py-4 text-white rounded cursor-pointer"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
        <button
          className="bg-black px-4 py-4 text-white rounded cursor-pointer"
          onClick={() => signIn("github")}
        >
          Sign in with Github
        </button>
        <button
          className="bg-blue-500 px-4 py-4 text-white rounded cursor-pointer"
          onClick={() => signIn("linkedin")}
        >
          Sign in with LinkedIn
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
