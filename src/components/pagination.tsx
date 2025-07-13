"use client";

import { useRouter } from "next/navigation";

function Pagination({
  page,
  hasPrevious,
  hasNext,
}: {
  page: number;
  hasPrevious: boolean;
  hasNext: boolean;
}) {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center w-full mt-4">
      <button
        className="bg-red-600 text-white px-4 py-2 cursor-pointer disabled:bg-red-400 disabled:cursor-not-allowed"
        disabled={!hasPrevious}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Previous
      </button>
      <button
        className="bg-red-600 text-white px-4 py-2 cursor-pointer disabled:bg-red-400 disabled:cursor-not-allowed"
        disabled={!hasNext}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
