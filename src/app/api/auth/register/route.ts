import { signupFormSchema } from "@/lib/validators";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = (await req.json()) as z.infer<
      typeof signupFormSchema
    >;
    const hashedPassword = await hash(password, 10);

    await db.insert(users).values({ name, email, password: hashedPassword });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}
