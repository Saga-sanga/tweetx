import { UserCard } from "@/components/user-card";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import { follows, users } from "@/server/db/schema";
import { asc, eq, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      following: sql<number>`(SELECT COUNT(*) FROM follows WHERE follows.followerId = ${users.id})`,
      isFollowing: sql<number>`EXISTS (SELECT 1 FROM follows WHERE follows.followerId = ${session
        ?.user.id!} AND follows.followingId = ${users.id})`,
    })
    .from(follows)
    .leftJoin(users, eq(follows.followerId, users.id))
    .where(eq(follows.followingId, session?.user.id!))
    .orderBy(asc(users.name));

  return (
    <section className="space-y-2">
      {result.length ? (
        result.map((user) => (
          <UserCard
            key={user.id}
            currentUserId={session?.user.id!}
            userData={{
              id: user.id ?? 0,
              name: user.name ?? "",
              following: user.following,
              isFollowing: user.isFollowing,
            }}
          />
        ))
      ) : (
        <div className="text-center py-28 space-y-8 text-muted-foreground">
          <h2 className="text-3xl font-semibold">No Users to diplay</h2>
          <p>No one seems to be following you.</p>
        </div>
      )}
    </section>
  );
}
