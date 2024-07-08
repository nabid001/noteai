"use client";

import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="flex w-full items-center justify-between border-b p-3 px-5 shadow-sm">
      <Link href="/" className="text-xl font-medium text-black/90 ">
        NoteAi
      </Link>

      <div className="flex items-center space-x-5">
        <Link
          href="/all-notes"
          className={`text-[16px] ${pathname === "/all-notes" && "font-bold"}`}
        >
          Note
        </Link>
        <UserButton />
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
