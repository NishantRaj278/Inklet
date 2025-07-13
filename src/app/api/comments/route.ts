import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";
const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");
  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: {
        user: true,
      },
    });
    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { postSlug, content } = await req.json();
    const session = await auth();

    if (!session?.user?.email) {
      return new Response("Unauthorized", { status: 401 });
    }

    await prisma.comment.create({
      data: {
        content,
        postSlug,
        userEmail: session.user.email,
      },
    });

    return new Response("Comment added successfully", {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
