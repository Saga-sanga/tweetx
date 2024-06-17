import { CreatePostDialog } from "@/components/create-post-dialog";
import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import { follows, posts, users } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { union } from "drizzle-orm/sqlite-core";
import { getServerSession } from "next-auth";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { reportWebVitals } from "next/dist/build/templates/pages";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

type PostCardProps = {
  post: {
    id: number;
    content: string;
    createdAt: string;
    author_name: string | null;
  };
};

function PostCard({ post }: PostCardProps) {
  return (
    <div className="flex relative p-4 rounded-2xl overflow-clip shadow-[5px_15px_45px_-5px_rgba(0,0,0,0.1)]">
      <div className="bg-primary h-12 w-12 absolute rounded-full bottom-12 -right-6"></div>
      <div className="mx-3 shrink-0 rounded-full border border-gray-400 h-14 w-14"></div>
      <div className="flex space-y-3 py-4 pr-8 flex-col w-full">
        <div className="flex justify-between">
          <h2 className="pl-2 text-lg font-medium text-muted-foreground">
            {post.author_name}
          </h2>
          <span className="text-xs text-muted-foreground/60">
            {timeAgo.format(new Date(post.createdAt))}
          </span>
        </div>
        <p className="text-sm text-muted-foreground/60">{post.content}</p>
      </div>
    </div>
  );
}

export default async function Page() {
  const session = await getServerSession(authOptions);

  const query1 = db
    .select({
      id: posts.id,
      content: posts.content,
      createdAt: posts.createdAt,
      author_name: users.name,
    })
    .from(posts)
    .leftJoin(users, eq(posts.author, users.id))
    .where(eq(posts.author, session?.user.id!));

  const query2 = db
    .select({
      id: posts.id,
      content: posts.content,
      createdAt: posts.createdAt,
      author_name: users.name,
    })
    .from(posts)
    .leftJoin(users, eq(posts.author, users.id))
    .leftJoin(follows, eq(follows.followingId, users.id))
    .where(eq(follows.followerId, session?.user.id!));

  const res = await union(query1, query2).orderBy(desc(posts.createdAt));

  return (
    <main className="flex flex-col w-full max-w-xl mt-10 space-y-10">
      <CreatePostDialog />
      {res.length ? (
        res.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <div className="text-center py-28 space-y-8 text-muted-foreground">
          <h2 className="text-3xl font-semibold">No Posts to diplay</h2>
          <p>Create a new post or follow someone.</p>
        </div>
      )}
    </main>
  );
}
