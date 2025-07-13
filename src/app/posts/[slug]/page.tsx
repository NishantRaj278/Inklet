import Comments from "@/components/comments";
import Menu from "@/components/menu";
import Image from "next/image";

const getData = async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

async function SinglePostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const post = await getData(slug);
  return (
    <div className="px-48 w-full mt-20">
      <div className="flex items-center justify-between gap-8">
        <div className="w-1/2 h-[350px] flex flex-col items-start justify-between">
          <h1 className="text-5xl font-bold">{post?.title}</h1>
          <div className="flex items-center gap-4">
            {post?.user?.image && (
              <div className="w-12 h-12 relative">
                <Image
                  src={post.user.image}
                  alt="Logo"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            )}
            <div>
              <h2>{post?.user?.name}</h2>
              <h3 className="text-xs">25 April 2025</h3>
            </div>
          </div>
        </div>
        {post?.img && (
          <div className="w-1/2 h-[350px] relative">
            <Image
              src={post.img}
              alt="Featured landscape photography"
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        )}
      </div>
      <div className="flex mt-10">
        <div className="flex-5 flex flex-col gap-4">
          <div
            dangerouslySetInnerHTML={{ __html: post?.desc || "" }}
            className="text-lg"
          />
          <Comments postSlug={slug} />
        </div>
        <Menu />
      </div>
    </div>
  );
}

export default SinglePostPage;
