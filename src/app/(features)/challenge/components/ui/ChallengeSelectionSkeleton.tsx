const ChallengeSelectionSkeleton = () => {
    return (
      <div className="mt-[36px] mx-auto animate-pulse">
        <div className="h-[16px] bg-gray-200 rounded w-48" />
        <div className="grid grid-cols-6 gap-4 pt-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col w-[190px] h-[232px] justify-around items-center py-4 border rounded-3xl bg-white"
            >
              <div className="w-[36px] h-[36px] bg-gray-200 rounded-full" />
              <div className="flex flex-col text-center gap-[5px] w-full px-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
              </div>
              <div className="w-[54px] h-[32px] bg-gray-200 rounded-3xl" />
            </div>
          ))}
        </div>
        <div className="mt-10 h-[60px] bg-gray-200 rounded-full w-full" />
      </div>
    );
  };
  
  export default ChallengeSelectionSkeleton;