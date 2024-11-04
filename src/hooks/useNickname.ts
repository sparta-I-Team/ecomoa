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
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
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
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const [isSuccess, setIsSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState("");
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
    onSuccess: async (data) => {
      // setIsSuccess(false);
      if (data) {
        setUserInfo(data.user_nickname);
      }
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
      // 닉네임 업데이트 성공 후 userInfo를 즉시 갱신
      await queryClient.invalidateQueries({
        queryKey: ["userInfo", user.id]
      });
      setIsSuccess(true);
      closeModal();
    } catch (error) {
      console.error("닉네임 업데이트 오류:", error);
    }
  };

  const onClickChallenge: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    closeModal();
    // setIsSuccess(false);
    router.push("/challenge");
  };

  // 모달 닫기
  const onClickClose = () => {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue("nickname", value); // 입력 값을 setValue로 업데이트
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
    onClickChallenge,
    info: userInfo
  };
};
