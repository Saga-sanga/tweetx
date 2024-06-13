import { ProfileNav } from "@/components/profile-nav";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mt-10 space-y-16 max-w-xl w-full">
      <div className="flex justify-between items-end">
        <div className="shrink-0 mb-6 rounded-full border border-gray-400 h-28 w-28"></div>
        <div className="space-y-8 mr-6">
          <h1 className="text-3xl font-medium text-muted-foreground">
            Arjun Reddy
          </h1>
          <div className="text-muted-foreground/60 space-x-6">
            <span>Posts: 511</span>
            <span>Followers: 511</span>
            <span>Following: 511</span>
          </div>
        </div>
      </div>
      <ProfileNav/>
      {children}
    </main>
  );
}
