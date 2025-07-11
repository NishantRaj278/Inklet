import Image from 'next/image'
import React from 'react'

import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Link from 'next/link';

function Footer() {
  return (
    <div className='p-32 w-full h-[300px] flex flex-col md:flex-row justify-around items-center'>
      <div className='h-full w-full md:w-1/2 gap-2 flex flex-col'>
        <div className='flex items-center gap-1'>
          <Image
            src='/inkletlogo.png'
            alt='inklet logo'
            width={40}
            height={40}
            className='rounded-full'
          />
          <h1 className='text-2xl font-semibold'>inklet.</h1>
        </div>
        <div className='flex flex-col gap-4'>  
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum repudiandae ullam expedita, ut ipsam excepturi perspiciatis, explicabo sed similique est inventore cumque temporibus officiis asperiores facilis eius modi quo in?</p>
          <div className='flex gap-1 text-xl'>
            <IoLogoInstagram />
            <FaGithub />
            <FaLinkedin />
          </div>
        </div>
      </div>
      <div className='h-full w-full md:w-1/2 flex justify-around'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-lg font-medium'>Links</h1>
          <Link href="/" className='text-sm'>Home</Link>
          <Link href="/contact" className='text-sm'>Contact</Link>
          <Link href="/about" className='text-sm'>About</Link>
          <Link href="/blog" className='text-sm'>Blog</Link>
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='text-lg font-medium'>Tags</h1>
          <Link href="/" className='text-sm'>Style</Link>
          <Link href="/contact" className='text-sm'>Fashion</Link>
          <Link href="/about" className='text-sm'>Coding</Link>
          <Link href="/blog" className='text-sm'>Travel</Link>
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='text-lg font-medium'>Socials</h1>
          <Link href="/" className='text-sm'>Instagram</Link>
          <Link href="/contact" className='text-sm'>Github</Link>
          <Link href="/about" className='text-sm'>LinkedIn</Link>
        </div>

      </div>
    </div>
  )
}

export default Footer