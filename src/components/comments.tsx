"use client";

import useSWR from "swr";
import Comment from "./comment";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaComments, FaPaperPlane } from "react-icons/fa";

const fetcher = async (postSlug: string) => {
  const res = await fetch(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }
  return res.json();
};

function Comments({ postSlug }: { postSlug: string }) {
  const { data, mutate, isLoading } = useSWR(postSlug, fetcher);
  const { status } = useSession();
  const { theme } = useTheme();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await fetch("http://localhost:3000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postSlug, content }),
      });
      mutate(); // Re-fetch comments after posting
      setContent(""); // Clear the input field
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center gap-3">
        <div
          className={`p-3 rounded-xl ${
            theme === "dark"
              ? "bg-gradient-to-r from-blue-600 to-purple-600"
              : "bg-gradient-to-r from-blue-500 to-purple-500"
          } shadow-lg`}
        >
          <FaComments className="text-white text-xl" />
        </div>
        <div>
          <h1
            className={`text-2xl lg:text-3xl font-bold ${
              theme === "dark"
                ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            }`}
          >
            Discussion
          </h1>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Join the conversation • {data?.length || 0} comments
          </p>
        </div>
      </div>

      {/* Comment Form */}
      {status === "authenticated" ? (
        <div
          className={`rounded-2xl p-6 ${
            theme === "dark"
              ? "bg-slate-800/40 backdrop-blur-sm border border-slate-700/30"
              : "bg-white/60 backdrop-blur-sm border border-gray-200/30"
          } shadow-lg transition-all duration-300 hover:shadow-xl`}
        >
          <div className="space-y-4">
            <label
              className={`block text-sm font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Share your thoughts
            </label>
            <div className="relative">
              <textarea
                className={`w-full h-32 p-4 pr-16 rounded-xl resize-none transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                  theme === "dark"
                    ? "bg-slate-700/50 border border-slate-600/30 text-gray-200 placeholder-gray-400 focus:bg-slate-700/70 focus:border-blue-500/50 focus:ring-blue-500/20 focus:ring-offset-slate-800"
                    : "bg-gray-50/50 border border-gray-200/50 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-blue-500/50 focus:ring-blue-500/20 focus:ring-offset-white"
                } outline-none backdrop-blur-sm`}
                placeholder="What are your thoughts on this post? Share your insights..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isSubmitting}
              />
              <div
                className={`absolute bottom-4 right-4 text-xs ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {content.length}/500
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Be respectful and constructive in your comments
              </div>
              <button
                onClick={handleSubmit}
                disabled={!content.trim() || isSubmitting}
                className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Posting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                    Post Comment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`rounded-2xl p-8 text-center ${
            theme === "dark"
              ? "bg-slate-800/40 backdrop-blur-sm border border-slate-700/30"
              : "bg-white/60 backdrop-blur-sm border border-gray-200/30"
          } shadow-lg`}
        >
          <div
            className={`inline-flex p-4 rounded-full mb-4 ${
              theme === "dark" ? "bg-slate-700/50" : "bg-gray-100/50"
            }`}
          >
            <FaComments
              className={`text-2xl ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
          <h3
            className={`text-lg font-semibold mb-2 ${
              theme === "dark" ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Join the Discussion
          </h3>
          <p
            className={`${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Please log in to share your thoughts and engage with the community
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`animate-pulse rounded-2xl p-6 ${
                  theme === "dark"
                    ? "bg-slate-800/30 border border-slate-700/30"
                    : "bg-white/40 border border-gray-200/30"
                } backdrop-blur-sm`}
              >
                <div className="flex gap-4">
                  <div
                    className={`w-12 h-12 rounded-full ${
                      theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                    }`}
                  ></div>
                  <div className="flex-1 space-y-3">
                    <div
                      className={`h-4 w-32 rounded ${
                        theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                      }`}
                    ></div>
                    <div
                      className={`h-3 w-full rounded ${
                        theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                      }`}
                    ></div>
                    <div
                      className={`h-3 w-3/4 rounded ${
                        theme === "dark" ? "bg-slate-700/50" : "bg-gray-200/50"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : data && data.length > 0 ? (
          <div className="space-y-4">
            {data.map(
              (comment: {
                id: string;
                content: string;
                createdAt: string;
                user: { name: string; image: string };
              }) => (
                <Comment key={comment.id} comment={comment} />
              )
            )}
          </div>
        ) : (
          <div
            className={`rounded-2xl p-12 text-center ${
              theme === "dark"
                ? "bg-slate-800/20 backdrop-blur-sm border border-slate-700/20"
                : "bg-white/30 backdrop-blur-sm border border-gray-200/20"
            }`}
          >
            <div
              className={`inline-flex p-6 rounded-full mb-4 ${
                theme === "dark" ? "bg-slate-700/30" : "bg-gray-100/30"
              }`}
            >
              <FaComments
                className={`text-3xl ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
              />
            </div>
            <h3
              className={`text-xl font-semibold mb-2 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              No comments yet
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Be the first to share your thoughts on this post
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
