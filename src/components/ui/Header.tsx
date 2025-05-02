// src/components/Header.tsx

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
      <Link href="/">
        <h1 className="text-xl font-bold text-gray-900 cursor-pointer hover:text-indigo-600 transition">
          FlavorPulse
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </Button>
        </Link>
      </div>
    </header>
  );
}
