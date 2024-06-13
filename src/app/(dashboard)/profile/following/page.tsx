import { UserCard } from "@/components/user-card";

export default function page() {
  return (
    <section className="space-y-2">
      <UserCard following={true} />
      <UserCard following={true} />
      <UserCard following={true} />
      <UserCard following={true} />
      <UserCard following={true} />
    </section>
  );
}
