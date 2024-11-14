const MapLeftAreaSkeleton = () => {
  return (
    <div className="w-[386px] h-[822px] flex flex-col animate-pulse">
      <nav className="relative mb-[24px]">
        <div className="flex">
          {[1, 2, 3].map((tab) => (
            <button
              key={tab}
              className="flex-1 px-4 py-[14px] text-sm font-medium border-none"
            >
              <div className="h-4 bg-gray-200 rounded w-[70px] mx-auto" />
            </button>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200" />
      </nav>

      <div className="p-2 mb-4">
        <div className="relative">
          <div className="w-full h-[52px] bg-gray-200 rounded-[40px]" />
        </div>
      </div>

      <div className="flex h-[20px] flex-row gap-[24px] text-[14px] p-2 items-center mb-[4px]">
        <div className="h-4 bg-gray-200 rounded w-[38px]" />
        <div className="h-4 bg-gray-200 rounded w-[56px]" />
        <div className="h-4 bg-gray-200 rounded w-[42px]" />
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#D7E8D7] [&::-webkit-scrollbar-thumb]:bg-[#00691E] [&::-webkit-scrollbar-thumb]:rounded-full">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="p-4 h-[223px] border rounded-lg bg-white"
          >
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-[10px]" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLeftAreaSkeleton;