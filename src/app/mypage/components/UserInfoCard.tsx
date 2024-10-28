"use client";
import { getUserInfo, updateNickname } from "@/api/user-action";
import { FormData, ProfileProps, UserInfo } from "@/types/userInfoType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { checkNicknameAvailability } from "@/api/user-action"; // 서버 액션 가져오기
import ProfileImgUpload from "./ProfileImgUpload";

const forbiddenWords = ["욕설1", "욕설2", "욕설3"];

const nicknameSchema = z
  .string()
  .min(1, "닉네임은 1글자 이상이어야 합니다.")
  .refine(
    (nickname) => !forbiddenWords.some((word) => nickname.includes(word)),
    {
      message: "닉네임에 금지된 단어가 포함되어 있습니다."
    }
  );

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
  } = useForm<FormData>();

  const { data: userInfo } = useQuery<UserInfo>({
    queryKey: ["userInfo", user.id],
    queryFn: () => getUserInfo(user.id),
    enabled: !!user.id // user.id가 있을 때만 쿼리 실행
  });

  // 닉네임 업데이트
  const { mutate } = useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userInfo", user.id]
      });
      setIsEditing(false);
    }
  });

  useEffect(() => {
    if (userInfo) {
      setInitialNickname(userInfo.user_nickname); // 초기값 설정
      setValue("nickname", userInfo.user_nickname); // 입력 필드 초기값 설정
    }
  }, [userInfo, setValue]);

  const onSubmit = async (data: FormData) => {
    const result = nicknameSchema.safeParse(data.nickname);
    if (result.success && nicknameAvailable) {
      mutate({ userId: user.id, newNickname: data.nickname });
    } else {
      // 에러 처리
      setNicknameError("유효하지 않은 닉네임입니다."); // 닉네임이 유효하지 않을 때
    }
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

    // 중복 검사
    const available =
      (await checkNicknameAvailability(nickname, user.id)) || false; // null일 경우 false로 설정
    setNicknameAvailable(available); // 중복 검사 결과를 상태에 저장

    if (!available) {
      setNicknameError("이미 사용 중인 닉네임입니다."); // 중복 닉네임 에러 메시지
    } else {
      setNicknameError(""); // 사용 가능한 닉네임일 경우 에러 메시지 초기화
    }
  };

  // if (!userInfo) return null;

  return (
    <div className="flex flex-col items-center bg-[#edeef0] w-full">
      <div className="flex flex-row items-center gap-2 w-full p-5 justify-start">
        <ProfileImgUpload userId={user.id} userAvatar={userInfo?.user_avatar} />
        <div className="flex flex-row items-center gap-1">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="flex">
              <div className="flex flex-col items-center">
                <div className="flex flex-row gap-1">
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
                {/* 에러 메시지 출력 */}
                {nicknameError && (
                  <p className="text-sm text-red-600 mt-1 whitespace-nowrap">
                    {nicknameError}
                  </p>
                )}
              </div>
              {errors.nickname && (
                <p role="alert" className="text-red-600">
                  {errors.nickname.message}
                </p>
              )}
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
    </div>
  );
};
export default UserInfoCard;
