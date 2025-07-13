import Image from "next/image";
import Link from "next/link";

function Card({
  post,
}: {
  post: {
    id: string;
    title: string;
    content: string;
    img: string;
    createdAt: string;
    catSlug: string;
    desc: string;
    slug: string;
  };
  key: string;
}) {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
      {post.img && (
        <div className="w-1/2 h-[300px] relative mb-4">
          <Image
            src={post.img}
            alt="Featured landscape photography"
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="w-full md:w-1/2 flex flex-col items-start justify-between gap-4 h-[300px] py-2">
        <h3>
          {post.createdAt.substring(0, 10)} - {post.catSlug}
        </h3>
        <h1>{post.title}</h1>
        <p>{post.desc.substring(0, 20)}...</p>
        <Link href={`/posts/${post.slug}`} className="border-b">
          Read More
        </Link>
      </div>
    </div>
  );
}

export default Card;
