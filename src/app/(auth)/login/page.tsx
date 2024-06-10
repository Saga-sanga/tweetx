import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Link
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "w-1/2 rounded-xl"
        )}
        href="/signup"
      >
        Create Account
      </Link>
      <div className="mt-20 space-y-14">
        <h1 className="font-semibold text-4xl text-foreground/60">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
