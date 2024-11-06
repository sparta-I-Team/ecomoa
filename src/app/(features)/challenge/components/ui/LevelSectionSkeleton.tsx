const LevelSectionSkeleton = () => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col w-[585px] h-[319px] justify-end">
        <div className="relative flex h-[228px] w-full border rounded-3xl bg-gray-200 animate-pulse" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-[8px] items-center">
          <div className="w-[113px] h-[32px] rounded-2xl bg-gray-200 animate-pulse" />
          <div className="h-[14px] w-[200px] rounded bg-gray-200 animate-pulse" />
        </div>
        <div className="flex w-[585px] flex-row items-center gap-3">
          <div className="w-[476px] bg-gray-200 rounded-full">
            <div className="h-4 w-1/2 bg-gray-300 rounded-full animate-pulse" />
          </div>
          <div className="w-[60px] h-[14px] rounded bg-gray-200 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default LevelSectionSkeleton;
