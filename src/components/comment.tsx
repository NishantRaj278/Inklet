import Image from "next/image";
import React from "react";

function Comment() {
  return (
    <div className="mt-8 flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 relative">
          <Image
            src="/nwordlogo (1).png"
            alt="Logo"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <div>
          <h2>Nish</h2>
          <h3 className="text-xs">25 April 2025</h3>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, velit.
      </p>
    </div>
  );
}

export default Comment;
