import { IdCardIcon, PersonIcon } from "@radix-ui/react-icons";
import { ProfileLink } from "./profile-link";

export function ProfileNav() {
  return (
    <section className="relative">
      <hr className="absolute w-full z-10 top-[1px]"/>
      <div className="flex relative z-20 items-center justify-center space-x-8 text-muted-foreground/60">
        <ProfileLink path="/profile">
          <IdCardIcon className="h-6 w-6 mr-2" /> Posts
        </ProfileLink>
        <ProfileLink path="/profile/followers">
          <PersonIcon className="h-5 w-5 mr-2" /> Followers
        </ProfileLink>
        <ProfileLink path="/profile/following">
          <PersonIcon className="h-5 w-5 mr-2" /> Following
        </ProfileLink>
      </div>
    </section>
  );
}
