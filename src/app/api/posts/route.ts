import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

export const GET = async (request: Request) => {
  try {
    const POST_PER_PAGE: number = 4;
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const cat = searchParams.get("cat");
    console.log("Fetching posts for page:", page, "category:", cat);

    const query = {
      take: POST_PER_PAGE,
      skip: page ? (parseInt(page) - 1) * POST_PER_PAGE : 0,
      where: {
        ...(cat && { catSlug: cat }),
      },
      orderBy: {
        createdAt: "desc" as const,
      },
    };

    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);

    return new Response(JSON.stringify({ posts, count }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const {
      title,
      content,
      img,
      catSlug,
    }: { title: string; content: string; img: string; catSlug: string } =
      await request.json();
    const session = await auth();

    if (!session?.user?.email) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Generate unique slug
    const baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    // Check if slug already exists and make it unique
    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        desc: content,
        img,
        catSlug,
        userEmail: session.user.email,
      },
    });

    return new Response(JSON.stringify(post), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
