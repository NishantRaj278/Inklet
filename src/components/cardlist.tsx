import React from "react";
import Card from "./card";
import Pagination from "./pagination";

function Cardlist() {
  return (
    <div className="flex-5 flex flex-col items-start justify-start gap-8">
      <h1 className="text-3xl font-semibold">Recent Posts</h1>
      <div className="flex flex-col gap-8 w-full">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Pagination />
    </div>
  );
}

export default Cardlist;
