import Cardlist from "@/components/cardlist";
import Menu from "@/components/menu";

function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; cat: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const cat = searchParams.cat;
  return (
    <div className="w-full mt-20 flex flex-col items-center gap-16 px-48">
      <h1 className="bg-orange-400 w-full py-2 text-center font-bold capitalize ">
        {cat} Blog
      </h1>
      <div className="flex">
        <Cardlist page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
}

export default BlogPage;
