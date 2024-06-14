import { ProfilePostCard } from "@/components/profile-post-card";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import { posts, users } from "@/server/db/schema";
import { eq, desc } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userPosts = await db
    .select({
      id: posts.id,
      content: posts.content,
      createdAt: posts.createdAt,
      author: {
        name: users.name,
      },
    })
    .from(posts)
    .leftJoin(users, eq(posts.author, session?.user.id!))
    .orderBy(desc(posts.createdAt));

  return (
    <section className="space-y-6">
      {userPosts.length ? (
        userPosts.map((post) => <ProfilePostCard key={post.id} post={post} />)
      ) : (
        <div className="text-center pt-20 text-2xl text-medium text-muted-foreground/60">
          No posts to display
        </div>
      )}
    </section>
  );
}
