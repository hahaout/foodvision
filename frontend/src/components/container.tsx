import { cn } from "@/lib/utils";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function Container({ children, className }: ContainerProps) {
    return (
        <div
            className={cn(
                "container mx-auto flex h-full w-full flex-col items-start space-y-4 p-4 sm:p-6",
                className
            )}
        >
            {children}
        </div>
    );
}

