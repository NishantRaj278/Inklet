"use client";

import Link from "next/link";
import { useState } from "react";
import { MdOutlineMenu, MdDarkMode, MdLightMode } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useTheme } from "@/context/ThemeContext";

function MobileMenu() {
  const [panel, setpanel] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div onClick={() => setpanel(true)}>
      <div>
        <MdOutlineMenu />
      </div>
      {panel && (
        <div
          className={`absolute top-0 right-0 w-full h-full flex flex-col items-center justify-center z-50 ${
            theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setpanel(false);
            }}
            className={`absolute top-4 right-4 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            <IoMdClose />
          </button>
          <div className="flex flex-col gap-4 font-medium">
            <button
              className="flex items-center gap-1 justify-center"
              onClick={toggleTheme}
            >
              {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
            <Link href="/">Home</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/about">About</Link>
            <Link href="/login">Login</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
