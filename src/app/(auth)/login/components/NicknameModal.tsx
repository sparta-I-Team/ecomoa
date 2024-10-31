"use client";
import { getUser } from "@/api/auth-actions";
import {
  checkNicknameAvailability,
  setNicknameParams,
  updateNickname
} from "@/api/user-action";
import { userStore } from "@/zustand/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Filter from "badwords-ko";
import { useForm } from "react-hook-form";
import { z } from "zod";

const filter = new Filter();

interface NicknameModalProps {
  onClose: () => void; // 닫기 함수 prop
}
interface FormData {
  nickname: string;
}
const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: "닉네임은 최소 1자 이상이어야 합니다." })
    .max(20, { message: "닉네임은 20자 이하이어야 합니다." })
    .regex(/^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ@_-]*$/, {
      message: "모지, 특수문자(-,_제외)를 사용할 수 없습니다"
    })
    .refine(
      async (nickname: string) => {
        const user = await getUser();
        // const { user } = userStore();
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
      (nickname: string) => {
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

const NicknameModal = ({ onClose }: NicknameModalProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(nicknameSchema)
  });
  const { user } = userStore();

  // 닉네임 업데이트
  const { mutateAsync } = useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      console.log("성공");
      queryClient.invalidateQueries({
        queryKey: ["userInfo", user.id]
      });
    },
    onError: (error) => {
      console.error("닉네임 업데이트 오류", error);
    }
  });

  const onSubmit = async (data: FormData) => {
    await mutateAsync({ userId: user.id, newNickname: data.nickname });
    await setNicknameParams(user.id);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 mt-[89px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col justify-center items-center m-auto w-[800px] h-[600px] bg-white"
      >
        <div className="w-[337px] h-[71px] mb-[59px]">
          <p className="text-[26px] font-semibold">만나서 반갑습니다.</p>
          <p className="text-[26px] font-semibold">닉네임을 설정해주세요</p>
        </div>
        <input
          type="text"
          className="w-[400px] h-16 rounded-[12px] border border-[#9c9c9c] p-3 mb-[74px] placeholder:text-xl"
          {...register("nickname")}
          placeholder="ex. 홍길동"
        />
        <div className="flex flex-col items-center justify-center">
          <p role="alert" className="fixed mt-5 text-sm text-red-600">
            {errors.nickname?.message}
          </p>
          <button
            type="submit"
            // disabled={isPending}
            className="w-[300px] h-[68px] p-[11px_14px] rounded-[85px] mb-[76px] text-[32px] bg-[#469B0D] text-[#FFF] text-2xl font-semibold"
          >
            가입완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default NicknameModal;
