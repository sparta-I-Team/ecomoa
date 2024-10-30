const LevelSectionSkeleton = () => {
  return (
    <section>
      <div className="w-[300px] h-[300px] bg-gray-200 animate-pulse rounded-lg" />
      <div className="space-y-2 mt-2">
        <div className="flex flex-col">
          <div className="h-7 bg-gray-200 rounded w-36 animate-pulse" />
          <div className="h-5 bg-gray-200 rounded w-48 mt-1 animate-pulse" />
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-gray-300 rounded-full h-4 w-1/2 animate-pulse" />
        </div>
        <div className="flex justify-end">
          <div className="h-5 bg-gray-200 rounded w-16 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default LevelSectionSkeleton;
