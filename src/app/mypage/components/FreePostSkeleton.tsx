export const FreePostSkeleton = () => (
  <article
    className="pl-[28px] pt-[28px] w-full h-[205px] rounded-[12px] bg-[#FFF] border border-[#E8F3E8] flex flex-row p-4"
    style={{ boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.02)" }}
  >
    <div className="flex-1">
      <div className="h-7 bg-gray-200 rounded-md w-3/4 mb-4 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded-md w-full mb-2 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded-md w-2/3 mb-4 animate-pulse" />

      <div className="flex gap-4 mb-4 mt-5">
        <div className="h-4 bg-gray-200 rounded-md w-20 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded-md w-24 animate-pulse" />
      </div>

      <div className="flex gap-4 mt-[35px]">
        <div className="h-4 bg-gray-200 rounded-md w-16 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded-md w-16 animate-pulse" />
      </div>
    </div>
    <div className="flex-none w-[160px] h-[160px] ml-4">
      <div className="w-full h-full bg-gray-200 rounded-[12px] animate-pulse" />
    </div>
  </article>
);
