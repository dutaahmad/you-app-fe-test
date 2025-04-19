import ButtonLink from "@/components/button-link";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

const PageWithBackButton = ({
    backHref,
    children,
    className
}: {
    backHref: string;
    children?: React.ReactNode;
    className?: string;
}) => {
    return (
        <>
            <ButtonLink href={backHref} className="flex gap-1 pt-2 w-fit">
                <ChevronLeft className="size-6" />
                Back
            </ButtonLink>
            <section className={cn("flex flex-col gap-2 px-2 min-h-[95vh]", className)}>
                {children}
            </section>
        </>
    )
}

export default PageWithBackButton