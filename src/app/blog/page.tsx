import Cardlist from "@/components/cardlist";
import Menu from "@/components/menu";

function BlogPage() {
  return (
    <div className="w-full mt-20 flex flex-col items-center gap-16 px-48">
      <h1 className="bg-orange-400 w-full py-2 text-center font-bold">
        Style Blog
      </h1>
      <div className="flex">
        <Cardlist />
        <Menu />
      </div>
    </div>
  );
}

export default BlogPage;
