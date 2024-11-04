import { getUser } from "@/api/auth-actions";
import {
  checkNicknameAvailability,
  getUserInfo,
  updateNickname
} from "@/api/user-action";
import { UserInfoNickname } from "@/types/userInfoType";
import { useModalStore } from "@/zustand/modalStore";
import { userStore } from "@/zustand/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Filter from "badwords-ko";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const filter = new Filter();

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
      }
    )
    .refine(
      (nickname: string) => {
        // 욕설이 없으면 true 반환
        const isProfane = filter.isProfane(nickname);
        return !isProfane;
      },
      {
        message: "닉네임에 금지된 단어가 포함되어 있습니다."
      }
    )
});

export const useNickname = () => {
  const { openModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = userStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(nicknameSchema)
  });
  const nicknameValue = watch("nickname") || ""; // 현재 닉네임 값
  const inputLength = nicknameValue?.length || 0;

  // 닉네임 업데이트
  const { mutateAsync } = useMutation<
    UserInfoNickname | null,
    Error,
    { userId: string; newNickname: string }
  >({
    mutationFn: updateNickname,
    onSuccess: async () => {
      await getUserInfo(user.id);

      queryClient.invalidateQueries({
        queryKey: ["userInfo", user.id]
      });
    },
    onError: (error) => {
      console.error("닉네임 업데이트 오류", error);
    }
  });
  const onSubmit = async (data: FormData) => {
    try {
      await mutateAsync({ userId: user.id, newNickname: data.nickname });
      setIsSuccess(true);
      closeModal();

      // 성공 모달은 여기서 열기
      openModal(
        <div className="w-[800px] h-[500px] rounded-[20px] flex flex-col justify-center items-center m-auto bg-white">
          <div className="text-center w-[540px] h-[71px] text-[28px] font-wanted font-[600] leading-[48px] tracking-tight mb-[24px]">
            <p>
              <span className="text-[#5BCA11]">{data.nickname}</span> 님의
              모아가 생성되었습니다.
              <br />
              포인트를 모아 다음 레벨로 성장시켜주세요!
            </p>
          </div>
          <p className="text-[#6E7481] text-center font-wanted text-[14px] font-[600] leading-[21px] mt-[24px]">
            데일리 챌린지를 하고 인증 글을 올리면 포인트를 Get
          </p>
          <Image src={"/seed.png"} width={150} height={150} alt="seed" />
          <button
            onClick={onClickChallenge}
            className="w-[380px] h-[52px] p-[11px_32px] rounded-[85px] text-[18px] bg-[#91F051] border-none mt-4"
          >
            데일리 챌린지 하러 가기
          </button>
        </div>,
        "",
        0
      );
    } catch (error) {
      console.error("닉네임 설정 오류:", error);
    }
  };
  const onClickChallenge = () => {
    closeModal();
    router.push("/challenge");
  };

  const onClickClose = () => {
    closeModal();
    router.push("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue("nickname", value);
  };

  return {
    onSubmit,
    onClickClose,
    handleChange,
    register,
    inputLength,
    errors,
    handleSubmit,
    isSuccess,
    onClickChallenge
  };
};
