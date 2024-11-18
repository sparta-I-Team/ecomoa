// export const AnabadaPostSkeleton = () => (
//   <div className="md:w-[282px] h-[380px] rounded-[12px] bg-white border border-[#E8F3E8] overflow-hidden animate-pulse">
//     <div className="w-full h-[200px] bg-gray-200" />
//     <div className="p-4">
//       <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2" />
//       <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-4" />
//       <div className="h-4 bg-gray-200 rounded-md w-full mb-2" />
//       <div className="h-4 bg-gray-200 rounded-md w-2/3" />
//     </div>
//   </div>
// );

export const AnabadaPostSkeleton = () => (
  <div className="md:w-[282px] w-[160px] h-[380px] rounded-[12px] bg-white border border-[#E8F3E8] overflow-hidden animate-pulse">
    <div className="w-full h-[200px] bg-gray-200" />
    <div className="p-4">
      <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-4" />
      <div className="h-4 bg-gray-200 rounded-md w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded-md w-2/3" />
    </div>
    {/* 이미지 부분 추가 (반응형) */}
    <div className="flex flex-col md:flex-row w-[160px] h-[160px] ml-4 flex-wrap gap-1 rounded-[12px]">
      <div className="w-[150px] h-[150px] bg-gray-300 rounded-[12px] md:hidden mt-[12px] -ml-[50px]" />
      <div className="w-[150px] h-[150px] bg-gray-300 rounded-[12px] hidden md:block" />
    </div>
  </div>
);
