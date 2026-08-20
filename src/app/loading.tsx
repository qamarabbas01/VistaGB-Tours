import { CardGridSkeleton } from "@/components/skeletons";

export default function HomeLoading() {
  return (
    <div>
      <div className="skeleton min-h-[70vh] w-full md:min-h-[92vh]" />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <CardGridSkeleton count={4} />
        </div>
      </section>
    </div>
  );
}
