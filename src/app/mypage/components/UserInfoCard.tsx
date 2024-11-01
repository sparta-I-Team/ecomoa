"use client";
import { getUserInfo, updateNickname } from "@/api/user-action";
import { FormData, ProfileProps, UserInfo } from "@/types/userInfoType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { checkNicknameAvailability } from "@/api/user-action"; // 서버 액션 가져오기
import ProfileImgUpload from "./ProfileImgUpload";
import { useChallengeDashboard } from "@/hooks/useChallengeDashboard";
import LevelGauge from "./LevelGauge";
import { getUser } from "@/api/auth-actions";
import Filter from "badwords-ko";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateLevelInfo } from "@/utlis/challenge/levelCalculator";

const filter = new Filter();

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

// const defaultLevelInfo: LevelInfo = {
//   level: 0, // 기본 레벨
//   name: "N/A", // 기본 이름
//   currentPoints: 0, // 기본 현재 포인트
//   maxPoints: 0, // 기본 최대 포인트
//   pointsToNextLevel: 1000, // 다음 레벨까지 필요한 포인트
//   image: "" // 기본 이미지 URL
// };

const UserInfoCard = ({ user }: ProfileProps) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [initialNickname, setInitialNickname] = useState("");
  const [nicknameAvailable, setNicknameAvailable] = useState(true);
  const [nicknameError, setNicknameError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(nicknameSchema)
  });

  const { data: userInfo } = useQuery<UserInfo>({
    queryKey: ["userInfo", user.id],
    queryFn: () => getUserInfo(user.id),
    enabled: !!user.id // user.id가 있을 때만 쿼리 실행
  });

  // 닉네임 업데이트
  const { mutate } = useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      console.log("성공");
      queryClient.invalidateQueries({
        queryKey: ["userInfo", user.id]
      });
      setIsEditing(false);
    },
    onError: (error) => {
      console.error("닉네임 업데이트 오류", error);
    }
  });

  useEffect(() => {
    if (userInfo) {
      setInitialNickname(userInfo.user_nickname); // 초기값 설정
      setValue("nickname", userInfo.user_nickname); // 입력 필드 초기값 설정
    }
  }, [userInfo, setValue]);

  const onSubmit = async (data: FormData) => {
    console.log("서브밋", data.nickname);
    // const result = nicknameSchema.safeParse(data.nickname);
    mutate({ userId: user.id, newNickname: data.nickname });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setValue("nickname", initialNickname); // 입력 필드 초기값 설정
  };

  const handleCancel = () => {
    setIsEditing(false);
    setValue("nickname", initialNickname); // 취소 시 원래 닉네임으로 되돌리기
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    setValue("nickname", nickname); // 입력된 닉네임을 상태에 반영
    const result = nicknameSchema.safeParse(nickname);

    // 닉네임 유효성 검사
    if (!result.success) {
      setNicknameError(result.error.errors[0].message); // 금지된 단어 에러 메시지
      setNicknameAvailable(false);
      return;
    } else {
      setNicknameError(""); // 유효성 통과
      setNicknameAvailable(true);
    }
  };
  const pointInfo = calculateLevelInfo(userInfo?.user_point ?? 0); // 널 병합 연산자

  return (
    <section className="w-[585px] h-[220px] flex flex-col items-center bg-[#edeef0]">
      <div className="flex flex-row items-center gap-2 w-full p-5 justify-start">
        <ProfileImgUpload userId={user.id} userAvatar={userInfo?.user_avatar} />
        <div className="flex flex-row items-center gap-1">
          {isEditing ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex items-center"
            >
              <div className="flex flex-col items-center justify-start">
                <div className="flex justify-start gap-1">
                  <input
                    {...register("nickname", {})}
                    placeholder="닉네임을 입력하세요"
                    defaultValue={initialNickname}
                    onChange={handleChange}
                  />
                  <button type="submit">저장</button>
                  <button type="button" onClick={handleCancel}>
                    취소
                  </button>
                </div>
                {errors.nickname && (
                  <span role="alert" className="text-red-600">
                    {errors.nickname.message}
                  </span>
                )}
              </div>
            </form>
          ) : (
            <>
              <span className="font-black text-lg">
                {userInfo?.user_nickname}
              </span>
              <span className="font-black text-lg">님</span>
              <button className="mr-auto" onClick={handleEditClick}>
                수정
              </button>
            </>
          )}
        </div>
      </div>
      <LevelGauge pointInfo={pointInfo} />
    </section>
  );
};
export default UserInfoCard;
