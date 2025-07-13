import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();

    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
