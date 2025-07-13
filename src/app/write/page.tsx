"use client";

import { useState, useRef, useEffect } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { IoImagesOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useImageUpload } from "@/hooks/useImageUpload";
import Image from "next/image";

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

  // Set initial content when value changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

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
  const { status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    img: "",
    category: "",
  });
  const { uploadImage, uploading, error } = useImageUpload();
  const [submitting, setSubmitting] = useState(false);

  // Handle authentication redirect
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleImageUpload = async (selectedFile: File) => {
    try {
      const imageUrl = await uploadImage(selectedFile);
      setFormData({ ...formData, img: imageUrl });
    } catch (err) {
      console.error("Failed to upload image:", err);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      alert("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          img: formData.img,
          desc: formData.content.substring(0, 150) + "...", // Generate description from content
          catSlug: formData.category, // You can add category selection later
        }),
      });

      if (response.ok) {
        const post = await response.json();
        router.push(`/posts/${post.slug}`);
      } else {
        throw new Error("Failed to create post");
      }
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

  if (status === "unauthenticated") {
    return (
      <div className="px-48 w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg text-gray-600">Redirecting to login...</p>
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
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <select
        className="w-full p-2 rounded-md bg-gray-200 text-black"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        <option value="">Select Category</option>
        <option value="travel">Travel</option>
        <option value="food">Food</option>
        <option value="coding">Coding</option>
        <option value="culture">Culture</option>
        <option value="style">Style</option>
        <option value="fashion">Fashion</option>
      </select>
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
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                if (e.target.files && e.target.files[0]) {
                  const selectedFile = e.target.files[0];
                  await handleImageUpload(selectedFile);
                }
              }}
              className="hidden"
              id="fileInput"
            />
            <label htmlFor="fileInput">
              <IoImagesOutline
                size={30}
                className={`cursor-pointer ${
                  uploading ? "text-blue-500" : "text-gray-500"
                }`}
              />
            </label>
            {uploading && (
              <span className="text-sm text-blue-500">Uploading...</span>
            )}
            {error && (
              <span className="text-sm text-red-500">Upload failed</span>
            )}
          </div>
        )}
      </div>

      {formData.img && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Featured Image:</p>
          <Image
            src={formData.img}
            alt="Preview"
            width={300}
            height={200}
            className="h-auto rounded-md border object-cover"
          />
        </div>
      )}

      <RichTextEditor
        value={formData.content}
        onChange={(content) => setFormData({ ...formData, content })}
      />
      <button
        onClick={handleSubmit}
        disabled={submitting || uploading}
        className="mt-5 bg-green-600 w-40 py-2 text-black rounded-md font-bold disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
      >
        {submitting ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
}

export default WritePage;
