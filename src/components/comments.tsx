import Comment from "./comment";

function Comments() {
  return (
    <div className="mt-10 flex flex-col gap-4">
      <h1 className="text-3xl font-semibold text-gray-500">Comments</h1>
      <div className="flex gap-4">
        <textarea
          className="w-full h-16 p-4 rounded-md outline-none bg-gray-300 text-black"
          placeholder="Write your comment here..."
        ></textarea>
        <button className="bg-green-800 px-4 font-bold rounded-md h-10 mr-10 text-white">
          Comment
        </button>
      </div>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
}

export default Comments;
