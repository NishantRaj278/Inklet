import Cardlist from "@/components/cardlist";
import Categories from "@/components/categories";
import Featured from "@/components/featured";
import Menu from "@/components/menu";
import React from "react";

async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page)
    : 1;
  return (
    <div>
      <Featured />
      <Categories />
      <div className="flex px-48">
        <Cardlist page={page} />
        <Menu />
      </div>
    </div>
  );
}

export default HomePage;
