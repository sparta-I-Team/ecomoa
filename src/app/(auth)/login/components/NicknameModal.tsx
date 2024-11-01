"use client";
import { getUser } from "@/api/auth-actions";
import {
  checkNicknameAvailability,
  getUserInfo,
  updateNickname,
  UpdateNicknameParams
} from "@/api/user-action";
import { UserInfoNickname } from "@/types/userInfoType";
import { userStore } from "@/zustand/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Filter from "badwords-ko";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const filter = new Filter();

// interface NicknameModalProps {
//   onClose: () => void;
// }
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
        console.log(isProfane);
        return !isProfane;
      },
      {
        message: "닉네임에 금지된 단어가 포함되어 있습니다."
      }
    )
});

const NicknameModal = () => {
  const queryClient = useQueryClient();
  const [isSuccess, setIsSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const { user } = userStore();
  const router = useRouter();
  const [inputLength, setInputLength] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(nicknameSchema)
  });

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
    await nicknameSchema.parseAsync(data);
    await mutateAsync({ userId: user.id, newNickname: data.nickname });
    setIsSuccess(true);
  };

  const onClickChallenge: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    await UpdateNicknameParams(user.id);
    router.push("/challenge");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputLength(e.target.value.length);
  };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 mt-[89px]">
      {!isSuccess ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col justify-center items-center m-auto w-[800px] h-[600px] bg-white"
        >
          <div className="text-center h-[71px] mb-[78px] leading-[1.5] text-[32px] font-semibold">
            <p className="">만나서 반갑습니다.</p>
            <div className="flex flex-row text-center">
              <p className="text-[#5BCA11]">닉네임</p>
              <p>을 설정해주세요!</p>
            </div>
          </div>

          <input
            type="text"
            id="nickname"
            className="w-[400px] h-16 rounded-[12px] border border-[#9c9c9c] p-3 mb-[74px] placeholder:text-[16px] flex justify-between items-center"
            {...register("nickname")}
            onChange={handleInputChange}
            maxLength={20}
            placeholder="ex. 홍길동"
          />

          <span className="text-[#6E7481] absolute top-1/2 right-1/2 text-[16px]">
            {inputLength}/20
          </span>
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
      ) : (
        <form className=" flex flex-col justify-center items-center m-auto w-[800px] h-[600px] bg-white">
          <div className="w-[337px] h-[71px] mb-[59px]">
            {userInfo && <p>{userInfo}님의 모아가 생성되었습니다.</p>}
            <p>포인트를 모아 다음 레벨로 성장시켜주세요</p>
          </div>
          <p>데일리 챌린지를 하고 인증 글을 올리면 포인트를 Get</p>
          <Image src={"/seed.png"} width={150} height={150} alt="seed" />
          <div className="flex flex-col items-center justify-center">
            <p role="alert" className="fixed mt-5 text-sm text-red-600">
              {errors.nickname?.message}
            </p>
            <button
              onClick={onClickChallenge}
              className="w-[316px] h-[30px] rounded-[85px] text-[18px] bg-[#469B0D] text-[#FFF]"
            >
              데일리 챌린지 하러 가기
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NicknameModal;
