import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#080b14] p-6">
      <section className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-glass lg:grid-cols-2">
        <div className="hidden min-h-[720px] space-y-7 border-r border-white/10 p-12 lg:block">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="mt-28 h-16 w-4/5" />
          <Skeleton className="h-6 w-3/5" />
          <Skeleton className="mt-16 h-72 w-full rounded-3xl" />
        </div>
        <div className="space-y-5 p-8 sm:p-12 lg:p-16">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-12 w-72" />
          <Skeleton className="h-5 w-80 max-w-full" />
          <Skeleton className="mt-10 h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </section>
    </main>
  );
}
