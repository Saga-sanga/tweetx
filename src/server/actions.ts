"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "./auth";
import { db } from "./db";
import { posts } from "./db/schema";

export async function createPost(post: string) {
  const session = await getServerSession(authOptions);
  try {
    await db.insert(posts).values({ author: session?.user.id!, content: post });
    revalidatePath("/");
    return { message: "Post created successfully" };
  } catch (e) {
    console.log(e);
    return { message: "Could not create post" };
  }
}
