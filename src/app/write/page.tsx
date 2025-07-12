"use client";

import { useState, useRef } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { IoImagesOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Custom Rich Text Editor Component
function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      updateActiveFormats();
    }
  };

  const updateActiveFormats = () => {
    const formats = new Set<string>();

    if (document.queryCommandState("bold")) formats.add("bold");
    if (document.queryCommandState("italic")) formats.add("italic");
    if (document.queryCommandState("underline")) formats.add("underline");

    setActiveFormats(formats);
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput(); // Update state after formatting
    updateActiveFormats();
  };

  const handleSelectionChange = () => {
    updateActiveFormats();
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      {/* Toolbar */}
      <div className="flex gap-2 mb-4 pb-2 border-b border-gray-200">
        <button
          type="button"
          onClick={() => formatText("bold")}
          className={`px-3 py-1 text-sm font-bold border rounded hover:bg-gray-100 ${
            activeFormats.has("bold") ? "bg-blue-200 border-blue-400" : ""
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => formatText("italic")}
          className={`px-3 py-1 text-sm italic border rounded hover:bg-gray-100 ${
            activeFormats.has("italic") ? "bg-blue-200 border-blue-400" : ""
          }`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => formatText("underline")}
          className={`px-3 py-1 text-sm underline border rounded hover:bg-gray-100 ${
            activeFormats.has("underline") ? "bg-blue-200 border-blue-400" : ""
          }`}
        >
          U
        </button>
        <button
          type="button"
          onClick={() => formatText("formatBlock", "h1")}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => formatText("formatBlock", "h2")}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => formatText("insertUnorderedList")}
          className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
        >
          • List
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onMouseUp={handleSelectionChange}
        onKeyUp={handleSelectionChange}
        className="min-h-[300px] p-4 outline-none prose max-w-none empty:before:content-['Start_writing_your_blog_post...'] empty:before:text-gray-400"
        style={{ whiteSpace: "pre-wrap" }}
        suppressContentEditableWarning={true}
      />
    </div>
  );
}

function WritePage() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const { status } = useSession();
  const router = useRouter();

  if (status !== "authenticated") {
    router.push("/login");
  }
  if (status === "loading") {
    return (
      <div className="px-48 w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-20 px-48 w-full h-screen flex flex-col gap-4">
      <input
        type="text"
        placeholder="Title"
        className="text-5xl w-full outline-none"
      />
      <div className="flex gap-4">
        <button onClick={() => setOpen(!open)}>
          {!open ? (
            <IoIosAddCircleOutline size={30} className="text-gray-500" />
          ) : (
            <RxCrossCircled size={30} className="text-gray-500" />
          )}
        </button>
        {open && (
          <div className="flex gap-4">
            <IoImagesOutline size={30} className="text-gray-500" />
            <IoVideocamOutline size={30} className="text-gray-500" />
          </div>
        )}
      </div>
      <RichTextEditor value={content} onChange={setContent} />
      <button className="mt-5 bg-green-600 w-40 py-2 text-black rounded-md font-bold">
        Publish
      </button>
    </div>
  );
}

export default WritePage;
