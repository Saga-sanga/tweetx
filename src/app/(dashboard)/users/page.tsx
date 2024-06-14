import { UserCard } from "@/components/user-card";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { asc, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      following:
        sql<number>`(SELECT COUNT(*) FROM follows WHERE follows.followerId = ${users.id})`,
      isFollowing:
        sql<number>`EXISTS (SELECT 1 FROM follows WHERE follows.followerId = ${session
          ?.user.id!} AND follows.followingId = ${users.id})`
        ,
    })
    .from(users)
    .orderBy(asc(users.name));

  return (
    <main className="mt-10 max-w-xl space-y-4 divide-y w-full">
      {result.length &&
        result.map((user) => (
          <UserCard
            key={user.id}
            currentUserId={session?.user.id!}
            userData={user}
          />
        ))}
    </main>
  );
}
