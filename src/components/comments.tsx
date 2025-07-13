"use client";

import useSWR from "swr";
import Comment from "./comment";
import { useSession } from "next-auth/react";
import { useState } from "react";

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
  const [content, setContent] = useState("");
  const handleSubmit = async () => {
    await fetch("http://localhost:3000/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postSlug, content }),
    });
    mutate(); // Re-fetch comments after posting
    setContent(""); // Clear the input field
  };

  return (
    <div className="mt-10 flex flex-col gap-4">
      <h1 className="text-3xl font-semibold text-gray-500">Comments</h1>

      {status === "authenticated" ? (
        <div className="flex gap-4">
          <textarea
            className="w-full h-16 p-4 rounded-md outline-none bg-gray-300 text-black"
            placeholder="Write your comment here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            onClick={handleSubmit}
            className="bg-green-800 px-4 font-bold rounded-md h-10 mr-10 text-white cursor-pointer"
          >
            Comment
          </button>
        </div>
      ) : (
        <h1>Login to write something</h1>
      )}

      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <div>
          <p className="text-gray-500">Comments: {data?.length || 0}</p>
          {data?.map(
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
      )}
    </div>
  );
}

export default Comments;
