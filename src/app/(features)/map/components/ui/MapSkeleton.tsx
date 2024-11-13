const MapSkeleton = () => {
  return (
    <div className="w-2/3 h-[822px] ml-[30px] rounded-[16px] bg-gray-100 animate-pulse flex items-center justify-center">
      <div className="text-gray-400 flex flex-col items-center">
        <svg
          className="w-16 h-16 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        <span>지도를 불러오는 중...</span>
      </div>
    </div>
  );
};

export default MapSkeleton;
