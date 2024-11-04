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

interface NicknameModalProps {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}
const NicknameModal = ({ isModalOpen, setModalOpen }: NicknameModalProps) => {
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

  // 모달 닫기
  const onClickClose = () => {
    setModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4 mt-[89px]"
      style={{
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), var(--naver-text, #FFF)"
      }}
    >
      {!isSuccess ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[800px] h-[500px] rounded-[20px] flex flex-col justify-center items-center m-auto bg-white"
        >
          <div className="relative w-full">
            <button
              onClick={onClickClose}
              className="absolute border-none -top-10 right-10 text-lg"
            >
              X
            </button>
          </div>
          <div className="text-center h-[71px] mb-[78px] leading-[1.5] text-[32px] font-semibold">
            <p className="">만나서 반갑습니다.</p>
            <div className="flex flex-row text-center">
              <p className="text-[#5BCA11]">닉네임</p>
              <p>을 설정해주세요!</p>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              id="nickname"
              className=" w-[360px] h-[56px] p-[0px_20px] rounded-[12px] border border-[#9c9c9c] mb-[74px] placeholder:text-[16px] flex justify-between items-center"
              {...register("nickname")}
              onChange={handleInputChange}
              maxLength={20}
              placeholder="ex. 홍길동"
            />
            <span className="text-[#6E7481] absolute top-5 right-3 text-[16px]">
              {inputLength}/20
            </span>
            <p
              role="alert"
              className={`absolute top-14 left-1 text-sm ${
                errors.nickname ? "text-red-600" : "text-[#6E7481]"
              }`}
            >
              {errors.nickname
                ? errors.nickname.message
                : "모지, 특수문자(-,_제외)를 사용할 수 없습니다."}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              type="submit"
              // disabled={isPending}
              className="w-[380px] h-[52px] p-[11px_32px] rounded-[85px] text-[18px] bg-[#91F051] border-none"
            >
              가입완료
            </button>
          </div>
        </form>
      ) : (
        <form className="w-[800px] h-[500px] rounded-[20px] flex flex-col justify-center items-center m-auto bg-white">
          <div className="relative w-full">
            <button
              onClick={onClickClose}
              className="absolute border-none -top-10 right-10 text-lg"
            >
              X
            </button>
          </div>
          <div className="text-center w-[540px] h-[71px] text-[28px] font-wanted font-[600] leading-[48px] tracking-tight mb-[24px]">
            {userInfo && (
              <p>
                <span className="text-[#5BCA11]">{userInfo}</span>
                님의 모아가 생성되었습니다.
                <br /> 포인트를 모아 다음 레벨로 성장시켜주세요!
              </p>
            )}
          </div>
          <p className=" text-[#6E7481] text-center font-wanted text-[14px] font-[600] leading-[21px] mt-[24px]">
            데일리 챌린지를 하고 인증 글을 올리면 포인트를 Get
          </p>
          <Image src={"/seed.png"} width={150} height={150} alt="seed" />
          <div className="flex flex-col items-center justify-center mt-[14.76px]">
            <p role="alert" className="fixed mt-5 text-sm text-red-600">
              {errors.nickname?.message}
            </p>
            <button
              onClick={onClickChallenge}
              className="w-[380px] h-[52px] p-[11px_32px] rounded-[85px] text-[18px] bg-[#91F051] border-none"
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
