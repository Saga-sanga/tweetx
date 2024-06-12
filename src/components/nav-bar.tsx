"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

function NavLink({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      className={cn(
        "font-medium text-lg text-muted-foreground/30",
        pathname === path && "text-primary"
      )}
      href={path}
    >
      {children}
    </Link>
  );
}

export function NavBar() {
  return (
    <div className="shadow-md w-full">
      <nav className="py-5 container flex justify-between items-center">
        <p className="text-primary font-medium text-3xl">TweetX</p>
        <div className="space-x-10">
          <NavLink path="/">Feed</NavLink>
          <NavLink path="/users">Users</NavLink>
          <NavLink path="/profile">Profile</NavLink>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      </nav>
    </div>
  );
}
