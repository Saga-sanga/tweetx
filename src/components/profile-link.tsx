"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ProfileLink({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <div>
      <hr
        className={cn(
          isActive ? "bg-muted-foreground " : "bg-transparent",
          "rounded-full h-[3px] border-none"
        )}
      />
      <Link
        className={cn(
          isActive && "text-muted-foreground",
          "flex items-center px-5 py-4"
        )}
        href={path}
      >
        {children}
      </Link>
    </div>
  );
}
