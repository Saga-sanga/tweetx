import { NavBar } from "@/components/nav-bar";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <NavBar />
      {children}
    </div>
  );
}
