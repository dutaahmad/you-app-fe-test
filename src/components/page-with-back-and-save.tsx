import ButtonLink from "@/components/button-link";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";

const PageWithBackAndSaveButton = ({
    backHref,
    onSave,
    children,
    className
}: {
    backHref: string;
    onSave: () => void;
    children?: React.ReactNode;
    className?: string;
}) => {
    return (
        <>
        <div className="flex justify-between items-center pt-2 w-full">
            <ButtonLink href={backHref} className="flex gap-0.5 w-fit text-white">
                <ChevronLeft className="size-6" />
                <p>Back</p>
            </ButtonLink>
            <Button variant={"link"} className="flex gap-0.5 w-fit text-base" onClick={onSave}>
                Save
            </Button>
        </div>
            <section className={cn("flex flex-col gap-2 px-2 min-h-[95vh]", className)}>
                {children}
            </section>
        </>
    );
};

export default PageWithBackAndSaveButton;