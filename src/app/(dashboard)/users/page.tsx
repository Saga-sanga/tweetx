import { UserCard } from "@/components/user-card";

export default function Page() {
  return (
    <main className="mt-10 max-w-xl space-y-4 divide-y w-full">
      <UserCard following={true} />
      <UserCard following={true} />
      <UserCard following={false} />
      <UserCard following={false} />
      <UserCard following={false} />
    </main>
  );
}
