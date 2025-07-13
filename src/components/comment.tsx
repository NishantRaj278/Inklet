import Image from "next/image";
import React from "react";

function Comment({
  comment,
}: {
  key: string;
  comment: {
    content: string;
    user: { name: string; image: string };
    createdAt: string;
  };
}) {
  return (
    <div className="mt-8 flex flex-col gap-2">
      <div className="flex items-center gap-4">
        {comment?.user?.image && (
          <div className="w-10 h-10 relative">
            <Image
              src={comment.user.image}
              alt="Logo"
              fill
              className="object-cover rounded-full"
            />
          </div>
        )}
        <div>
          <h2>{comment?.user?.name}</h2>
          <h3 className="text-xs">25 April 2025</h3>
        </div>
      </div>
      <p>{comment?.content}</p>
    </div>
  );
}

export default Comment;
