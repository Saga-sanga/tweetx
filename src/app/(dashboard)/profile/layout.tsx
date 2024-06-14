import { ProfileNav } from "@/components/profile-nav";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import { follows, posts, users } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/sqlite-core";
import { getServerSession } from "next-auth";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const [result] = await db
    .select({
      id: users.id,
      name: users.name,
      posts: sql<number>`COUNT(posts.id)`.as("posts"),
      followers:
        sql<number>`(SELECT COUNT(*) FROM follows WHERE follows.followingId = ${users.id})`.as(
          "following"
        ),
      following:
        sql<number>`(SELECT COUNT(*) FROM follows WHERE follows.followerId = ${users.id})`.as(
          "following"
        ),
    })
    .from(users)
    .leftJoin(posts, eq(posts.author, users.id))
    .groupBy(users.id)
    .where(eq(users.id, session?.user.id!));

  console.log({ result });

  return (
    <main className="mt-10 space-y-10 max-w-xl w-full">
      <div className="space-y-16">
        <div className="flex justify-between items-end">
          <div className="shrink-0 mb-6 rounded-full border border-gray-400 h-28 w-28"></div>
          <div className="space-y-8 mr-6">
            <h1 className="text-3xl font-medium text-muted-foreground">
              {result.name}
            </h1>
            <div className="text-muted-foreground/60 space-x-6">
              <span>Posts: {result.posts}</span>
              <span>Followers: {result.followers}</span>
              <span>Following: {result.following}</span>
            </div>
          </div>
        </div>
        <ProfileNav />
      </div>
      {children}
    </main>
  );
}
