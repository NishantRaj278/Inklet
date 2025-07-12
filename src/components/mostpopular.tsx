import React from "react";
import MostPopularItems from "./mostpopularitems";

function MostPopular() {
  return (
    <div className="w-full flex flex-col items-start gap-1">
      <h4 className="text-sm text-gray-500">Whats hot</h4>
      <h1 className="text-3xl font-semibold">Most Popular</h1>

      <div className="flex flex-col gap-4 w-full mt-8">
        <MostPopularItems />
        <MostPopularItems />
        <MostPopularItems />
        <MostPopularItems />
        <MostPopularItems />
      </div>
    </div>
  );
}

export default MostPopular;
