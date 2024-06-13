import { Button } from "@/components/ui/button";

function UserCard({ following = true }: { following: boolean }) {
  return (
    <article className="flex justify-between py-8 px-10 items-end">
      <div className="flex items-end space-x-6">
        <div className="shrink-0 rounded-full border border-gray-400 h-14 w-14"></div>
        <div className="flex flex-col pb-0.5">
          <h2 className="text-lg font-medium text-muted-foreground">
            Arjun Reddy
          </h2>
          <p className="text-xs text-muted-foreground/60">Following: 200</p>
        </div>
      </div>
      {following ? (
        <Button size="lg" className="font-medium text-md px-8 mb-0.5">
          Follow
        </Button>
      ) : (
        <span className="font-medium px-5 text-muted-foreground text-md mb-0.5">Following</span>
      )}
    </article>
  );
}

export default function Page() {
  return (
    <main className="mt-10 max-w-xl space-y-4 divide-y w-full">
      <UserCard following={true}/>
      <UserCard following={true}/>
      <UserCard following={false}/>
      <UserCard following={false}/>
      <UserCard following={false}/>
    </main>
  );
}
