import ButtonLink from "@/components/button-link";
import LogoutButton from "@/components/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/server-actions/auth-actions";
import { getProfile } from "@/server-actions/profile-actions";

export default async function Home() {
  const session = await getSession();
  if (!session)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="font-extrabold text-4xl lg:text-5xl tracking-tight scroll-m-20">YouApp</h1>
        <div className="flex justify-center items-center gap-2 md:gap-4 mt-8 w-full h-6">
          <ButtonLink href="/login">Login</ButtonLink>
          <Separator orientation="vertical" />
          <ButtonLink href="/register">Register</ButtonLink>
        </div>
      </div>
    );

  const userProfile = await getProfile();

  return (
    <div className="flex flex-col justify-center items-center gap-8 h-screen">
      <Avatar className="size-20">
        <AvatarImage src={userProfile.data?.avatar} alt="@dutaahmad" />
        <AvatarFallback className="text-3xl">{session.user.username.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <h1 className="font-extrabold text-4xl lg:text-5xl tracking-tight scroll-m-20">YouApp</h1>
      <div className="flex flex-col justify-center items-center gap-2 md:gap-4 mt-8 w-full h-6">
        <LogoutButton />
        <ButtonLink href="/about">Your Profile</ButtonLink>
      </div>
    </div>
  );
}
