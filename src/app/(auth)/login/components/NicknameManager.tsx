// "use client";

// import { useEffect, useState } from "react";
// import NicknameModal from "./NicknameModal";
// import { useUserInfo } from "@/hooks/useUserInfo";
// import { userStore } from "@/zustand/userStore";
// import { useModalStore } from "@/zustand/modalStore";

// const NicknameManager = () => {
//   const { openModal, closeModal } = useModalStore();
//   // const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     if (user && userInfo?.params?.firstTag === false) {
//       openModal(
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="w-[800px] h-[500px] rounded-[20px] flex flex-col justify-center items-center m-auto bg-white"
//         >
//           <div className="relative w-full">
//             <button
//               type="button"
//               onClick={onClickClose}
//               className="absolute border-none -top-10 right-10 text-lg"
//             >
//               X
//             </button>
//           </div> 
//           <div className="text-center h-[71px] mb-[78px] leading-[1.5] text-[32px] font-semibold">
//             <p className="">만나서 반갑습니다.</p>
//             <div className="flex flex-row text-center">
//               <p className="text-[#5BCA11]">닉네임</p>
//               <p>을 설정해주세요!</p>
//             </div>
//           </div>
//           <div className="relative">
//             <input
//               type="text"
//               id="nickname"
//               className=" w-[400px] h-[56px] p-[0px_20px] rounded-[12px] border border-[#9c9c9c] mb-[74px] placeholder:text-[16px] flex justify-between items-center"
//               {...register("nickname")}
//               maxLength={20}
//               placeholder="ex. 홍길동"
//               onChange={handleChange}
//             />
//             {/* 글자 수 표시 */}
//             <span className="text-[#6E7481] absolute top-5 right-3 text-[16px]">
//               {inputLength}/20
//             </span>
//             <p
//               role="alert"
//               className={`absolute top-14 left-1 text-sm ${
//                 errors.nickname ? "text-red-600" : "text-[#6E7481]"
//               }`}
//             >
//               {errors.nickname
//                 ? errors.nickname.message
//                 : "모지, 특수문자(-,_제외)를 사용할 수 없습니다."}
//             </p>
//           </div>
//           <div className="flex flex-col items-center justify-center">
//             <button
//               type="submit"
//               className="w-[380px] h-[52px] p-[11px_32px] rounded-[85px] text-[18px] bg-[#91F051] border-none"
//             >
//               가입완료
//             </button>
//           </div>
//         </form>,
//         "",
//         0
//       );
//     }
//   }, [userInfo, user]);

//   // if (isLoading) {
//   //   return <div>Loading...</div>;
//   // }

//   return (
//     <div>
//       {/* {isModalOpen && (
//         <NicknameModal
//           isModalOpen={isModalOpen}
//           setIsModalOpen={setIsModalOpen}
//         />
//       )} */}
//     </div>
//   );
// };

// export default NicknameManager;
