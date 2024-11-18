"use client";
import { useState } from "react";
import { getUserInfo } from "@/api/user-action";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { LevelInfo } from "@/types/challengesType";

interface ProfileImgUploadProps {
  userId: string;
  userAvatar?: string; // userAvatar를 선택적 prop으로 정의
  levelInfo: LevelInfo;
}

const ProfileImgUpload = ({
  userId,
  levelInfo: pointInfo
}: ProfileImgUploadProps) => {
  const { register, setValue } = useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { refetch } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserInfo(userId)
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue("profileImage", file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        console.log("읽어온 이미지 데이터:", result); // 디버깅용 로그
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    refetch();
    setSelectedFile(null); // 선택된 파일 초기화
    setValue("profileImage", undefined); // form 상태에서 파일 초기화
  };

  return (
    <form className="flex flex-col items-center">
      {/* 일단 주석처리 했음 밑에 라벨 지우고 주석 풀면 이전처럼 정상적으로 사용 가능 
      * 그리고 이미지 className도 주석 풀고 바꿔줘야함
       <label htmlFor="profileImage"> */}
      <div>
        <Image
          src={pointInfo?.profile}
          alt="레벨 이미지"
          width={114}
          height={84}
          className="w-[114px] h-[84px] rounded-[12px] md:mr-[16px]"
        />
      </div>
      <input
        type="file"
        id="profileImage"
        className="hidden"
        accept="image/*"
        {...register("profileImage")}
        onChange={handleImageChange}
      />
      {/* 파일이 선택된 경우에만 변경 저장 버튼 표시 */}
      {selectedFile && (
        <div>
          <button type="submit">저장</button>
          <button type="button" onClick={handleCancel}>
            취소
          </button>
        </div>
      )}
    </form>
  );
};

export default ProfileImgUpload;
