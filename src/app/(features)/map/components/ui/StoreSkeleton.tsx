const StoreSkeleton = () => {
  return (
    <div className="animate-pulse h-full flex flex-col">
      <div className="p-2 mb-4">
        <div className="h-10 bg-gray-200 rounded-lg w-full" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="p-4 h-[100px] border rounded-lg ">
            <div className="h-5 bg-gray-200 rounded w-2/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreSkeleton;
