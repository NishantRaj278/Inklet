"use client";

import { useState, useRef, useEffect } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { IoImagesOutline } from "react-icons/io5";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaHeading,
  FaRocket,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

// Custom Rich Text Editor Component
function RichTextEditor({
  value,
  onChange,
  theme,
}: {
  value: string;
  onChange: (value: string) => void;
  theme: string;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [wordCount, setWordCount] = useState(0);

  // Set initial content when value changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
      updateActiveFormats();

      // Calculate word count
      const textContent = editorRef.current.textContent || "";
      const words = textContent
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      setWordCount(words.length);
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
    handleInput();
    updateActiveFormats();
  };

  const handleSelectionChange = () => {
    updateActiveFormats();
  };

  const toolbarButtons = [
    {
      command: "bold",
      icon: <FaBold />,
      label: "Bold",
      isActive: activeFormats.has("bold"),
    },
    {
      command: "italic",
      icon: <FaItalic />,
      label: "Italic",
      isActive: activeFormats.has("italic"),
    },
    {
      command: "underline",
      icon: <FaUnderline />,
      label: "Underline",
      isActive: activeFormats.has("underline"),
    },
    {
      command: "formatBlock",
      value: "h1",
      icon: <FaHeading />,
      label: "H1",
      isActive: false,
    },
    {
      command: "formatBlock",
      value: "h2",
      icon: <FaHeading className="text-sm" />,
      label: "H2",
      isActive: false,
    },
    {
      command: "insertUnorderedList",
      icon: <FaListUl />,
      label: "List",
      isActive: false,
    },
  ];

  return (
    <div
      className={`rounded-2xl overflow-hidden ${
        theme === "dark"
          ? "bg-slate-800/30 backdrop-blur-sm border border-slate-700/30"
          : "bg-white/50 backdrop-blur-sm border border-gray-200/30"
      } shadow-lg`}
    >
      {/* Toolbar */}
      <div
        className={`flex items-center justify-between p-4 border-b ${
          theme === "dark" ? "border-slate-700/30" : "border-gray-200/30"
        }`}
      >
        <div className="flex items-center gap-2">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              onClick={() => formatText(button.command, button.value)}
              className={`group flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 hover:scale-105 ${
                button.isActive
                  ? theme === "dark"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-blue-500 text-white shadow-lg"
                  : theme === "dark"
                  ? "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 hover:text-white"
                  : "bg-gray-100/50 text-gray-600 hover:bg-gray-200/50 hover:text-gray-800"
              }`}
              title={button.label}
            >
              {button.icon}
            </button>
          ))}
        </div>

        <div
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {wordCount} words
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onMouseUp={handleSelectionChange}
        onKeyUp={handleSelectionChange}
        className={`min-h-[400px] p-6 outline-none prose max-w-none ${
          theme === "dark"
            ? "prose-invert text-gray-200 placeholder:text-gray-500"
            : "text-gray-800 placeholder:text-gray-400"
        } empty:before:content-['Start_crafting_your_amazing_story...'] empty:before:text-gray-400`}
        style={{ whiteSpace: "pre-wrap" }}
        suppressContentEditableWarning={true}
      />
    </div>
  );
}

function WritePage() {
  const [open, setOpen] = useState(false);
  const { status } = useSession();
  const { theme } = useTheme();
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
          desc: formData.content.substring(0, 150) + "...",
          catSlug: formData.category,
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

  const categories = [
    { value: "travel", label: "Travel", emoji: "✈️" },
    { value: "food", label: "Food", emoji: "🍜" },
    { value: "coding", label: "Coding", emoji: "💻" },
    { value: "culture", label: "Culture", emoji: "🎭" },
    { value: "style", label: "Style", emoji: "👔" },
    { value: "fashion", label: "Fashion", emoji: "👗" },
  ];

  if (status === "loading") {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950"
            : "bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50"
        }`}
      >
        <div
          className={`flex flex-col items-center gap-6 p-8 rounded-3xl ${
            theme === "dark"
              ? "bg-slate-800/30 backdrop-blur-sm border border-slate-700/30"
              : "bg-white/50 backdrop-blur-sm border border-gray-200/30"
          } shadow-2xl`}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p
            className={`text-lg font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Loading editor...
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950"
            : "bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50"
        }`}
      >
        <div
          className={`text-center p-8 rounded-3xl ${
            theme === "dark"
              ? "bg-slate-800/30 backdrop-blur-sm border border-slate-700/30"
              : "bg-white/50 backdrop-blur-sm border border-gray-200/30"
          } shadow-2xl`}
        >
          <p
            className={`text-lg font-medium ${
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pb-20 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950"
          : "bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50"
      }`}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-24 -left-24 w-96 h-96 rounded-full ${
            theme === "dark" ? "bg-blue-500/5" : "bg-blue-500/10"
          } blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full ${
            theme === "dark" ? "bg-purple-500/5" : "bg-purple-500/10"
          } blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute top-1/3 right-1/4 w-64 h-64 rounded-full ${
            theme === "dark" ? "bg-pink-500/3" : "bg-pink-500/8"
          } blur-3xl animate-pulse delay-700`}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 pt-20">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-4xl lg:text-5xl font-bold mb-4 ${
              theme === "dark"
                ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            }`}
          >
            Create New Post
          </h1>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Share your thoughts and stories with the world
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Title Input */}
          <div
            className={`rounded-2xl p-6 ${
              theme === "dark"
                ? "bg-slate-800/30 backdrop-blur-sm border border-slate-700/30"
                : "bg-white/50 backdrop-blur-sm border border-gray-200/30"
            } shadow-lg`}
          >
            <input
              type="text"
              placeholder="Enter your post title..."
              className={`w-full text-3xl lg:text-4xl font-bold outline-none bg-transparent placeholder:text-gray-400 ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Category & Media Controls */}
          <div
            className={`rounded-2xl p-6 ${
              theme === "dark"
                ? "bg-slate-800/30 backdrop-blur-sm border border-slate-700/30"
                : "bg-white/50 backdrop-blur-sm border border-gray-200/30"
            } shadow-lg`}
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Category Selector */}
              <div className="flex-1 w-full">
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Category
                </label>
                <select
                  className={`w-full p-3 rounded-xl outline-none transition-all duration-300 focus:ring-2 focus:ring-blue-500/50 ${
                    theme === "dark"
                      ? "bg-slate-700/50 border border-slate-600/30 text-gray-200 [&>option]:bg-slate-800 [&>option]:text-gray-200 [&>option]:p-2"
                      : "bg-gray-50/50 border border-gray-200/50 text-gray-800 [&>option]:bg-white [&>option]:text-gray-800 [&>option]:p-2"
                  }`}
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option
                    value=""
                    className={`${
                      theme === "dark"
                        ? "bg-slate-800 text-gray-400"
                        : "bg-white text-gray-500"
                    }`}
                  >
                    Select a category...
                  </option>
                  {categories.map((cat) => (
                    <option
                      key={cat.value}
                      value={cat.value}
                      className={`${
                        theme === "dark"
                          ? "bg-slate-800 text-gray-200 hover:bg-slate-700"
                          : "bg-white text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      {cat.emoji} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Media Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setOpen(!open)}
                  className={`group flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 hover:scale-105 ${
                    open
                      ? theme === "dark"
                        ? "bg-red-600 text-white shadow-lg"
                        : "bg-red-500 text-white shadow-lg"
                      : theme === "dark"
                      ? "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50"
                      : "bg-gray-100/50 text-gray-600 hover:bg-gray-200/50"
                  }`}
                  title={open ? "Close media options" : "Add media"}
                >
                  {!open ? (
                    <IoIosAddCircleOutline size={24} />
                  ) : (
                    <RxCrossCircled size={24} />
                  )}
                </button>

                {open && (
                  <div className="flex items-center gap-4 animate-fadeIn">
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
                      <div
                        className={`group flex items-center justify-center w-12 h-12 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                          uploading
                            ? "bg-blue-600 text-white animate-pulse"
                            : theme === "dark"
                            ? "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 hover:text-blue-400"
                            : "bg-gray-100/50 text-gray-600 hover:bg-gray-200/50 hover:text-blue-600"
                        }`}
                      >
                        <IoImagesOutline size={24} />
                      </div>
                    </label>

                    {uploading && (
                      <span
                        className={`text-sm animate-pulse ${
                          theme === "dark" ? "text-blue-400" : "text-blue-600"
                        }`}
                      >
                        Uploading...
                      </span>
                    )}

                    {error && (
                      <span className="text-sm text-red-500">
                        Upload failed
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Featured Image Preview */}
          {formData.img && (
            <div
              className={`rounded-2xl p-6 ${
                theme === "dark"
                  ? "bg-slate-800/30 backdrop-blur-sm border border-slate-700/30"
                  : "bg-white/50 backdrop-blur-sm border border-gray-200/30"
              } shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`text-lg font-semibold ${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Featured Image
                </h3>
                <button
                  onClick={() => setFormData({ ...formData, img: "" })}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    theme === "dark"
                      ? "text-red-400 hover:bg-red-500/10"
                      : "text-red-600 hover:bg-red-50"
                  }`}
                >
                  Remove
                </button>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <Image
                  src={formData.img}
                  alt="Featured image preview"
                  width={600}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          )}

          {/* Rich Text Editor */}
          <RichTextEditor
            value={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
            theme={theme}
          />

          {/* Publish Actions */}
          <div
            className={`rounded-2xl p-6 ${
              theme === "dark"
                ? "bg-slate-800/30 backdrop-blur-sm border border-slate-700/30"
                : "bg-white/50 backdrop-blur-sm border border-gray-200/30"
            } shadow-lg`}
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Post Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className={`${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Title:
                  </span>
                  <span
                    className={`font-medium ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {formData.title.length} chars
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Category:
                  </span>
                  <span
                    className={`font-medium ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {formData.category || "Not selected"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Image:
                  </span>
                  <span
                    className={`font-medium ${
                      formData.img
                        ? theme === "dark"
                          ? "text-green-400"
                          : "text-green-600"
                        : theme === "dark"
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    {formData.img ? "Added" : "None"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {/* Publish Button */}
                <button
                  onClick={handleSubmit}
                  disabled={
                    submitting ||
                    uploading ||
                    !formData.title ||
                    !formData.content
                  }
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-xl"
                      : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <FaRocket />
                      Publish Post
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WritePage;
