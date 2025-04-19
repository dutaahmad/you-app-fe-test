import ButtonLink from "@/components/button-link";
import { Separator } from "@/components/ui/separator";

export default function Home() {
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
}
