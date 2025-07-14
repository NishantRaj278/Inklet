import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const cat = searchParams.get("cat");
    const posts = await prisma.post.findMany({
      where: {
        ...(cat && { catSlug: cat }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
