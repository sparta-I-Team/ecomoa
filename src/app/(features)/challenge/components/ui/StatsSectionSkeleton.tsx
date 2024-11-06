const StatsSectionSkeleton = () => {
  return (
    <div className="w-[524px] h-[175px]">
      <section className="w-[466px] flex flex-col h-full justify-between">
        <article className="flex flex-col">
          <div className="mb-[36px]">
            <div className="h-[16px] bg-gray-200 rounded w-[120px] animate-pulse" />
          </div>

          <div className="flex flex-col gap-[45px]">
            <div className="h-[35px] bg-gray-200 rounded w-[450px] animate-pulse" />
            <div className="h-[35px] bg-gray-200 rounded w-[380px] animate-pulse" />
          </div>
        </article>
        <div className="h-[16px] bg-gray-200 rounded w-[300px] animate-pulse mb-0" />
      </section>
    </div>
  );
};

export default StatsSectionSkeleton;
