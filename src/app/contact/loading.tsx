import { Skeleton } from "@/components/skeletons";

export default function ContactLoading() {
  return (
    <div>
      <Skeleton className="h-[52vh] min-h-[320px] w-full" />
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:px-10">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48 rounded-md" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-40 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
