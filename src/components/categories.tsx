import Link from "next/link";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
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

async function Categories() {
  const data = await getData();
  return (
    <div className="flex flex-col items-start justify-center gap-8 px-56 mb-20 mt-10">
      <h1 className="font-bold text-4xl">Popular Categories</h1>
      <div className="w-full flex flex-wrap items-center justify-between gap-4 px-16">
        {data.map((category: { id: string; title: string; slug: string }) => (
          <Link
            href={`/blog?cat=${category.slug}`}
            key={category.id}
            className="bg-gray-200 px-4 py-2 text-sm font-medium text-black"
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
