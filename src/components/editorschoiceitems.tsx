import Image from "next/image";
import React from "react";

function EditorsChoiceItems() {
  return (
    <div className="flex w-full gap-4">
      <div className="w-13 h-13 relative">
        <Image
          src="/nwordlogo (1).png"
          alt="profilepic"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex-5">
        <button className="bg-green-400 text-[10px] text-black rounded-full px-1">
          Travel
        </button>
        <p className="text-sm -tracking-tighter">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit, quia.
        </p>
        <h4 className="text-[10px]">Nish - 01.01.2025</h4>
      </div>
    </div>
  );
}

export default EditorsChoiceItems;
