const LevelSectionSkeleton = () => {
  return (
    <section className="flex flex-col gap-4 mt-[78px] mb-[65px] lg:mt-0 w-full lg:w-auto">
      <div className="flex flex-col w-full lg:w-[585px] h-[124px] lg:h-[319px] justify-end">
        <div className="relative flex h-[180px] lg:h-[228px] w-full border rounded-3xl bg-gray-200 animate-pulse" />
      </div>
      <div className="flex flex-col gap-3 w-full mx-auto lg:mx-0 lg:w-[585px]">
        <div className="flex flex-row gap-[8px] items-center">
          <div className="w-[110px] lg:w-[113px] h-[32px] rounded-2xl bg-gray-200 animate-pulse" />
          <div className="h-[14px] w-[150px] md:w-[200px] rounded bg-gray-200 animate-pulse" />
        </div>
        <div className="flex w-full lg:w-[585px] flex-row items-center gap-3">
          <div className="w-full lg:w-[476px] bg-gray-200 rounded-full">
            <div className="h-3 lg:h-4 w-1/2 bg-gray-300 rounded-full animate-pulse" />
          </div>
          <div className="w-[45px] lg:w-[60px] h-3 lg:h-[14px] rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default LevelSectionSkeleton;
