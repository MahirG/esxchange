import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-xl bg-[linear-gradient(110deg,rgba(255,255,255,.04),45%,rgba(255,255,255,.1),55%,rgba(255,255,255,.04))] bg-[length:200%_100%]",
        className,
      )}
      {...props}
    />
  );
}
