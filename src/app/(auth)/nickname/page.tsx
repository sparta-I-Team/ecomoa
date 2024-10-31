"use client";
import { getUser } from "@/api/auth-actions";
import { updateNickname, checkNicknameAvailability } from "@/api/user-action";
import { userStore } from "@/zustand/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Filter from "badwords-ko";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import NicknameModal from "../login/components/NicknameModal";
import { useState } from "react";

const filter = new Filter();
// Zod 스키마
const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(2, { message: "닉네임은 최소 2자 이상이어야 합니다." })
    .max(20, { message: "닉네임은 20자 이하이어야 합니다." })
    .regex(/^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ@_-]*$/, {
      message:
        "닉네임은 알파벳, 숫자, 한글, @, 밑줄 및 하이픈만 포함해야 합니다."
    })
    .refine(
      async (nickname) => {
        const user = await getUser();
        if (!user) return false;
        const available = await checkNicknameAvailability(nickname, user.id);
        return available;
      },
      {
        message: "이미 사용 중인 닉네임입니다."
        // path: ["nickname"]
      }
    )
    .refine(
      (nickname) => {
        // 욕설이 없으면 true 반환
        const isProfane = filter.isProfane(nickname);
        console.log(isProfane);
        return !isProfane;
      },
      {
        message: "닉네임에 금지된 단어가 포함되어 있습니다."
      }
    )
});

type NicknameInput = z.infer<typeof nicknameSchema>;

const NicknameSetPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); // 모달 상태 추가
  const { user } = userStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<NicknameInput>({
    resolver: zodResolver(nicknameSchema)
  });

  // useMutation을 최상위에서 호출
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: NicknameInput) => {
      if (!user) return;
      return updateNickname({
        userId: user.id,
        newNickname: data.nickname
      });
    },
    onSuccess: async () => {
      if (!user) return;
      queryClient.invalidateQueries({
        queryKey: ["userInfo", user.id]
      });
      alert("닉네임이 성공적으로 설정되었습니다.");
      router.push("/nickname/complete");
    },
    onError: (error) => {
      setError("nickname", { message: error.message });
      console.error("닉네임 설정 오류:", error);
    }
  });

  const onSubmit: SubmitHandler<NicknameInput> = (data) => {
    mutate(data);
  };

  return (
    <div>
      {isModalOpen && <NicknameModal onClose={() => setIsModalOpen(false)} />}
    </div>
    // <div className="w-full min-h-screen bg-[#cccccc] flex justify-center items-center">
    //   <div className="w-[800px] h-[500px] bg-[#FFFFFF] rounded-[20px] mx-auto ">
    //     <form
    //       onSubmit={handleSubmit(onSubmit)}
    //       className=" flex flex-col justify-center items-center m-auto w-[800px] h-[600px]"
    //     >
    //       <div className="w-[337px] h-[71px] mb-[59px]">
    //         <p className="text-[26px] font-semibold">
    //           회원가입이 완료되었습니다.
    //         </p>
    //         <p className="text-[26px] font-semibold">닉네임을 설정해주세요</p>
    //       </div>
    //       <input
    //         type="text"
    //         className="w-[400px] h-16 rounded-[12px] border border-[#9c9c9c] p-3 mb-[74px] placeholder:text-xl"
    //         {...register("nickname")}
    //         placeholder="ex. 홍길동"
    //       />
    //       <div className="flex flex-col items-center justify-center">
    //         <p role="alert" className="fixed mt-5 text-sm text-red-600">
    //           {errors.nickname?.message}
    //         </p>
    //         <button
    //           type="submit"
    //           disabled={isPending}
    //           className="w-[300px] h-[68px] p-[11px_14px] rounded-[85px] mb-[76px] text-[32px] bg-[#469B0D] text-[#FFF] text-2xl font-semibold"
    //         >
    //           생성하기
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
};

export default NicknameSetPage;
