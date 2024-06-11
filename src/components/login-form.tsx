"use client";

import { loginFormSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Icons } from "./icons";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);
    // console.log({ values });
    try {
      const res = await signIn("credentials", { ...values, redirect: false });

      if (res?.ok) {
        router.push("/");
      }

      if (!res?.ok) {
        toast.error("Error Logging in. Please try again!");
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast("Error Logging in. Please try again!");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full pb-8 flex flex-col"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <Input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  {...field}
                />
              </FormControl>
              <Button
                className="absolute top-1 right-1 bg-muted/80"
                type="button"
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeClosedIcon className="h-5 w-5" />
                ) : (
                  <EyeOpenIcon className="h-5 w-5" />
                )}
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <Link href="#" className="text-sm text-foreground/60 font-medium">
            Forgot Password ?
          </Link>
          <Button size="lg" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="h-4 w-4 mr-2 animate-spin" />
            )}{" "}
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
