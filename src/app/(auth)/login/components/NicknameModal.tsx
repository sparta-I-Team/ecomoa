//   if (!isModalOpen) return null;
//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center z-50 p-4 mt-[89px]"
//       style={{
//         background:
//           "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), var(--naver-text, #FFF)"
//       }}
//     >
//       {!isSuccess && isModalOpen ? (
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
//         </form>
//       ) : (
//         <form className="w-[800px] h-[500px] rounded-[20px] flex flex-col justify-center items-center m-auto bg-white">
//           <div className="relative w-full">
//             <button
//               type="button"
//               onClick={onClickClose}
//               className="absolute border-none -top-10 right-10 text-lg"
//             >
//               X
//             </button>
//           </div>
//           <div className="text-center w-[540px] h-[71px] text-[28px] font-wanted font-[600] leading-[48px] tracking-tight mb-[24px]">
//             {userInfo && (
//               <p>
//                 <span className="text-[#5BCA11]">{userInfo}</span>
//                 님의 모아가 생성되었습니다.
//                 <br /> 포인트를 모아 다음 레벨로 성장시켜주세요!
//               </p>
//             )}
//           </div>
//           <p className=" text-[#6E7481] text-center font-wanted text-[14px] font-[600] leading-[21px] mt-[24px]">
//             데일리 챌린지를 하고 인증 글을 올리면 포인트를 Get
//           </p>
//           <Image src={"/seed.png"} width={150} height={150} alt="seed" />
//           <div className="flex flex-col items-center justify-center mt-[14.76px]">
//             <p role="alert" className="fixed mt-5 text-sm text-red-600">
//               {errors.nickname?.message}
//             </p>
//             <button
//               onClick={onClickChallenge}
//               className="w-[380px] h-[52px] p-[11px_32px] rounded-[85px] text-[18px] bg-[#91F051] border-none"
//             >
//               데일리 챌린지 하러 가기
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default NicknameModal;
