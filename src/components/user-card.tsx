"use client";
import { Button } from "@/components/ui/button";
import { followUser } from "@/server/actions";
import { useMutation } from "@tanstack/react-query";

type UserCardProps = {
  currentUserId: number;
  userData: {
    id: number;
    name: string;
    following: number;
    isFollowing: number;
  };
};

export function UserCard({ userData, currentUserId }: UserCardProps) {
  const isSameUser = Number(currentUserId) === userData.id;
  const { mutate: server_followUser } = useMutation({ mutationFn: followUser });
  return (
    <article className="flex justify-between py-8 px-10 items-end">
      <div className="flex items-end space-x-6">
        <div className="shrink-0 rounded-full border border-gray-400 h-14 w-14"></div>
        <div className="flex flex-col pb-0.5">
          <h2 className="text-lg font-medium text-muted-foreground">
            {userData.name}
          </h2>
          <p className="text-xs text-muted-foreground/60">
            Following: {userData.following}
          </p>
        </div>
      </div>
      {!userData.isFollowing ? (
        <Button
          onClick={() => server_followUser(userData.id)}
          size="lg"
          className="font-medium text-md px-8 mb-0.5"
          disabled={isSameUser}
        >
          Follow
        </Button>
      ) : (
        <span className="font-medium px-5 text-muted-foreground text-md mb-0.5">
          Following
        </span>
      )}
    </article>
  );
}
