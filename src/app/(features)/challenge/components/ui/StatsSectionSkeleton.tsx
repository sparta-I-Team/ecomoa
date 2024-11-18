const StatsSectionSkeleton = () => {
  return (
    <div className="w-full md:w-[524px] h-auto md:h-[175px]">
      <section className="w-full md:w-[466px] flex flex-col h-full justify-between">
        <article className="flex flex-col">
          <div className="mb-4 md:mb-[20px]">
            <div className="h-4 md:h-[16px] bg-gray-200 rounded w-[100px] md:w-[120px] animate-pulse" />
          </div>

          <div className="flex flex-col gap-2 md:gap-[10px]">
            <div className="h-8 md:h-[40px] bg-gray-200 rounded w-full md:w-[450px] animate-pulse" />
            <div className="h-8 md:h-[40px] bg-gray-200 rounded w-[90%] md:w-[380px] animate-pulse" />
          </div>
        </article>
      </section>
    </div>
  );
};

export default StatsSectionSkeleton;
