"use client";
import { getUserInfo, updateNickname } from "@/api/user-action";
import { FormData, ProfileProps, UserInfo } from "@/types/userInfoType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { checkNicknameAvailability } from "@/api/user-action"; // 서버 액션 가져오기

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
      setValue("nickname", userInfo.user_nickname); // 초기값 설정
      setNicknameAvailable(true); // 초기 상태
      setNicknameError(""); // 초기 상태
    }
  }, [userInfo, setValue]);

  const onSubmit = async (data: FormData) => {
    const result = nicknameSchema.safeParse(data.nickname);
    if (result.success && nicknameAvailable) {
      mutate({ userId: user.id, newNickname: data.nickname });
    }
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
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
    const available = await checkNicknameAvailability(nickname);
    if (!available) return;
    setNicknameAvailable(available); // 중복 검사 결과를 상태에 저장
    if (!available) {
      setNicknameError("이미 사용 중인 닉네임입니다."); // 중복 닉네임 에러 메시지
    } else {
      setNicknameError("");
    }
  };

  if (!userInfo) return null;

  return (
    <div className="flex flex-col items-center bg-slate-400">
      <div className="flex flex-row items-center gap-1">
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex">
            <div className="flex flex-col items-center">
              <input
                {...register("nickname", {
                  required: "닉네임을 입력하세요."
                })}
                placeholder="닉네임을 입력하세요"
                onBlur={handleBlur} // 닉네임 입력 후 중복 체크
              />
              {/* 에러 메시지 출력 */}
              {nicknameError && (
                <p className="text-red-600 mt-1 whitespace-nowrap">
                  {nicknameError}
                </p>
              )}

              <div className="flex gap-2">
                <button type="submit">저장</button>
                <button type="button" onClick={() => setIsEditing(false)}>
                  취소
                </button>
              </div>
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
            <button onClick={() => setIsEditing(true)}>수정</button>
          </>
        )}
      </div>
      <p>{userInfo?.user_email}</p>
    </div>
  );
};

export default UserInfoCard;
