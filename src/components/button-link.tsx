import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const ButtonLink = ({ href, children, className }: { href: string, children: React.ReactNode | string, className?: string }) => {
    if (typeof children === 'string') return (
        <Button variant="link" asChild className={cn("p-0", className)}>
            <Link href={href}>
                {children}
            </Link>
        </Button>
    );
    return (
        <Button variant="link" asChild className={cn("p-0", className)}>
            <Link href={href}>
                {children}
            </Link>
        </Button>
    );
};

export default ButtonLink;