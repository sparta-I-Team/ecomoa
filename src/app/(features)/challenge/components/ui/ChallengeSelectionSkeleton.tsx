const ChallengeSelectionSkeleton = () => {
  return (
    <div className="mt-[36px] mx-auto animate-pulse">
      <div className="h-4 md:h-[16px] bg-gray-200 rounded w-36 md:w-48" />
      <div className="flex flex-col md:grid md:grid-cols-6 gap-3 pt-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex flex-row md:flex-col w-full md:w-[190px] h-[70px] md:h-[232px] justify-between md:justify-around items-center p-4 border rounded-3xl bg-white"
          >
            <div className="w-[30px] md:w-[36px] h-[30px] md:h-[36px] bg-gray-200 rounded-full" />
            <div className="flex flex-col text-left md:text-center gap-[5px] w-full px-4">
              <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4 md:mx-auto" />
              <div className="h-3 md:h-4 bg-gray-200 rounded w-2/3 md:mx-auto" />
            </div>
            <div className="w-[40px] md:w-[54px] h-[30px] md:h-[32px] bg-gray-200 rounded-3xl" />
          </div>
        ))}
      </div>
      <div className="mt-6 md:mt-10 h-12 md:h-[60px] bg-gray-200 rounded-full w-full" />
    </div>
  );
};

export default ChallengeSelectionSkeleton;
