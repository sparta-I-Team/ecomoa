const StatsSectionSkeleton = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <article className="space-y-4">
        <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
        <div className="space-y-2">
          <div className="h-10 bg-gray-200 rounded w-64 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-56 animate-pulse" />
        </div>
        <div className="h-5 bg-gray-200 rounded w-48 animate-pulse" />
      </article>
    </section>
  );
};

export default StatsSectionSkeleton;
