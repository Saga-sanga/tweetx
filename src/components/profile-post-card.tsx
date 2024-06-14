import { SelectPost } from "@/server/db/schema";

type PostCardProps = {
  post: {
    id: number;
    content: string;
    createdAt: string;
    author: {
      name: string;
    } | null;
  };
};

export function ProfilePostCard({ post }: PostCardProps) {
  return (
    <div className="flex relative p-4 overflow-clip">
      <div className="bg-primary h-12 w-12 absolute rounded-full bottom-12 -right-6"></div>
      <div className="mx-3 shrink-0 rounded-full border border-gray-400 h-14 w-14"></div>
      <div className="flex space-y-3 py-4 pr-8 flex-col w-full">
        <div className="flex justify-between">
          <h2 className="pl-2 text-lg font-medium text-muted-foreground">
            {post.author?.name}
          </h2>
          <span className="text-xs text-muted-foreground/60">10 mins ago</span>
        </div>
        <p className="text-sm text-muted-foreground/60">{post.content}</p>
      </div>
    </div>
  );
}
