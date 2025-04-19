import ButtonLink from "@/components/button-link";
import { cn } from "@/lib/utils";
import { ChevronLeft, PencilLine } from "lucide-react";

const AboutPage = () => {
    return (
        <section className="flex flex-col gap-4 w-full">
            <div className="flex w-full">
                <div className="w-full">
                    <ButtonLink href={'/'} className="flex gap-0.5 pt-2 w-fit text-white">
                        <ChevronLeft className="size-6" />
                        <p>Back</p>
                    </ButtonLink>
                </div>
                <h1 className="pt-2 w-full text-white text-center">
                    @johndoe123
                </h1>
                <span className="w-full" />
            </div>
            <div className={cn("flex flex-col gap-2 px-2 min-h-[94vh]")}>
                <div className="flex items-end bg-gray-200/10 p-2 rounded-xl w-full min-h-[12rem]">
                    <p className="bottom-0">@johndoe123</p>
                </div>
                {/* About div section (empty state) */}
                <div className="flex flex-col justify-between bg-[#0E191F] mt-4 px-4 py-2 rounded-xl w-full min-h-[8rem]">
                    <div className="flex justify-between items-center text-white">
                        <p className="font-semibold">About</p>
                        <PencilLine className="size-4 hover:cursor-pointer" />
                    </div>
                    <p className="pb-4 text-white/50">Add in your personal information to help others know you better</p>
                </div>
                {/* Interests div section (empty state) */}
                <div className="flex flex-col justify-between bg-[#0E191F] mt-2 px-4 py-2 rounded-xl w-full min-h-[8rem]">
                    <div className="flex justify-between items-center text-white">
                        <p className="font-semibold">Interest</p>
                        <PencilLine className="size-4 hover:cursor-pointer" />
                    </div>
                    <p className="pb-4 text-white/50">Add in your interest to find a better match</p>
                </div>
            </div>
        </section>
    );
};

export default AboutPage;