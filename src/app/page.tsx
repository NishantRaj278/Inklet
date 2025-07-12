import Cardlist from "@/components/cardlist";
import Categories from "@/components/categories";
import Featured from "@/components/featured";
import Menu from "@/components/menu";
import React from "react";

function HomePage() {
  return (
    <div>
      <Featured />
      <Categories />
      <div className="flex px-48">
        <Cardlist />
        <Menu />
      </div>
    </div>
  );
}

export default HomePage;
