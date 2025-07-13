import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  const slug = params.slug;
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { user: true, comments: true },
    });
    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
