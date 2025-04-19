import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {/* <h1 className="font-extrabold text-4xl lg:text-5xl tracking-tight scroll-m-20">YouApp</h1> */}
      <Loader2 className="size-16 animate-spin" />
    </div>
  );
}
