import React from "react";

function MenuCategories() {
  return (
    <div className="w-full flex flex-col items-start gap-1">
      <h4 className="text-sm text-gray-500">Discover by topic</h4>
      <h1 className="text-3xl font-semibold">Categories</h1>

      <div className="flex flex-wrap gap-4 w-full mt-8">
        <button className="px-4 py-2 bg-gray-300 text-black text-xs">
          Style
        </button>
        <button className="px-4 py-2 bg-gray-300 text-black text-xs">
          Fashion
        </button>
        <button className="px-4 py-2 bg-gray-300 text-black text-xs">
          Food
        </button>
        <button className="px-4 py-2 bg-gray-300 text-black text-xs">
          Travel
        </button>
        <button className="px-4 py-2 bg-gray-300 text-black text-xs">
          Culture
        </button>
        <button className="px-4 py-2 bg-gray-300 text-black text-xs">
          Coding
        </button>
      </div>
    </div>
  );
}

export default MenuCategories;
