"use client";
import { getUser } from "@/api/auth-actions";
import { updateNickname, checkNicknameAvailability } from "@/api/user-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

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
});

type NicknameInput = z.infer<typeof nicknameSchema>;

const NicknameSetPage = () => {
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
      const user = await getUser(); // 사용자 정보 가져오기
      if (!user) return;
      // 닉네임 중복 검사
      //   const available = await checkNicknameAvailability(data.nickname, user.id);
      //   if (!available) {
      //     await setError("nickname", { message: "이미 사용 중인 닉네임입니다." });
      //     return;
      //   }
      // 닉네임 업데이트
      return updateNickname({
        userId: user.id,
        newNickname: data.nickname
      });
    },
    onSuccess: async () => {
      const user = await getUser();
      if (!user) return;
      queryClient.invalidateQueries({
        queryKey: ["userInfo", user.id]
      });
      alert("닉네임이 성공적으로 설정되었습니다.");
      router.push("/");
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
    <div className="w-[800px] h-[800px] mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col justify-center items-center m-auto w-[800px] h-[600px]"
      >
        <Image
          src={"/images/default-profile.jpg"}
          width={225}
          height={240}
          alt="씨앗모아 이미지"
        />
        <p className="text-2xl">LV.1 씨앗모아</p>
        <p className="text-2xl">닉네임을 설정해주세요</p>
        <input
          type="text"
          className="w-[400px] h-16 rounded-md border border-[#9c9c9c] p-3"
          {...register("nickname")}
          placeholder="닉네임"
        />
        <p role="alert" className="text-sm text-red-600">
          {errors.nickname?.message}
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="w-[300px] h-20 p-[11px_14px] rounded-[85px] mt-[69px] text-[32px]"
        >
          {isPending ? "로딩 중..." : "생성하기"}
        </button>
      </form>
    </div>
  );
};

export default NicknameSetPage;
