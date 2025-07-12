"use client";

import Link from "next/link";
import React from "react";
import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import MobileMenu from "./mobilemenu";
import { useTheme } from "@/context/ThemeContext";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { status } = useSession();

  return (
    <div className="flex justify-around items-center p-4 fixed top-0 w-full z-10">
      <div className="flex gap-1">
        <IoLogoInstagram />
        <FaGithub />
        <FaLinkedin />
      </div>
      <div>
        <h1 className="font-extrabold text-2xl">inklet.</h1>
      </div>
      <div className="md:flex gap-4 font-medium hidden text-sm">
        <button className="flex items-center gap-1" onClick={toggleTheme}>
          {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
        </button>
        <Link href="/">Home</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/about">About</Link>
        {status === "authenticated" && <Link href="/write">Write</Link>}
        {status === "authenticated" ? (
          <button onClick={() => signOut()} className="cursor-pointer">
            Logout
          </button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
      <div className="md:hidden flex items-center">
        <MobileMenu />
      </div>
    </div>
  );
}

export default Navbar;
