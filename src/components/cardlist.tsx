import React from "react";
import Card from "./card";
import Pagination from "./pagination";

const getData = async (page: number, cat: string) => {
  const response = await fetch(
    `http://localhost:3000/api/posts?page=${page}?cat=${cat}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

async function Cardlist({ page, cat }: { page: number; cat?: string }) {
  const { posts, count } = await getData(page, cat || "");
  const POST_PER_PAGE = 4;
  const hasPrevious = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;
  return (
    <div className="flex-5 flex flex-col items-start justify-start gap-8">
      <h1 className="text-3xl font-semibold">Recent Posts</h1>
      <div className="flex flex-col gap-8 w-full">
        {posts?.map(
          (post: {
            id: string;
            title: string;
            content: string;
            img: string;
            createdAt: string;
            catSlug: string;
            desc: string;
            slug: string;
          }) => (
            <Card key={post.id} post={post} />
          )
        )}
      </div>
      <Pagination page={page} hasNext={hasNext} hasPrevious={hasPrevious} />
    </div>
  );
}

export default Cardlist;
