"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "./auth";

export async function createPost(post: string) {
  const session = await getServerSession(authOptions);
  console.log({ session, post });
  revalidatePath("/");
  return { message: "Post created successfully" };
}
