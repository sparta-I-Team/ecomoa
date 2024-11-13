"use client";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/api/auth-actions";
import { LoginInput } from "@/types/authType";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/api/user-action";
import { userStore } from "@/zustand/userStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
// Zod 스키마 정의
const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "유효한 이메일을 입력해주세요." })
    .nonempty({ message: "이메일을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .max(20, { message: "비밀번호는 최대 20자 이하여야 합니다." })
    .nonempty({ message: "비밀번호를 입력해주세요." })
});

const LoginForm = () => {
  const { loginUser } = userStore();
  const [saveEmail, setSaveEmail] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  useEffect(() => {
    // localStorage에 저장된 이메일 불러오기
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setSaveEmail(true); // 체크박스 상태 설정
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<LoginInput> = async (data: LoginInput) => {
    try {
      const response = await login(data);
      const userInfo = await getUserInfo(response.session?.user.id as string);

      // 아이디 저장 로컬스토리지 업데이트
      if (saveEmail) {
        localStorage.setItem("savedEmail", data.email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      // zustand 스토어에 로그인 유저 정보 저장
      loginUser({
        email: response.session?.user.email as string,
        accessToken: response.session?.access_token as string,
        id: response.session?.user.id as string,
        isAuthenticated: true
      });

      if (!userInfo?.user_nickname) {
        // 여기로 로그인 경로 재설정
        router.push("/login/callback/email");
      } else {
        router.push("/");
      }
    } catch (error) {
      const err = error as Error;
      if (err.message.includes("Invalid login credentials")) {
        alert("계정이 존재하지 않거나 잘못된 비밀번호입니다.");
      } else {
        alert(err.message || "로그인 중 오류가 발생했습니다.");
      }
    }
  };

  const handleCheckboxChange = () => {
    setSaveEmail(!saveEmail);
  };

  return (
    <form
      className="font-wanted flex flex-col justify-center items-center gap-1 p-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-3">
        <div className="flex flex-col items-start gap-1">
          <input
            type="email"
            className="pl-[16px] py-[20.5px] w-[400px] h-[52px] rounded-[12px] border border-[#D7E8D7] placeholder:text-[#A1A7B4] placeholder:font-semibold outline-none"
            {...register("email")}
            placeholder="아이디"
          />
          <div className="font-wanted flex items-center justify-center leading-[21px] font-[500]">
            {errors.email?.message && (
              <p
                role="alert"
                className="text-sm text-[#FF361B] mb-[10px] flex justify-center items-center font-[500] leading-[21px] tracking-[-0.14px]"
              >
                <CircleAlert
                  className="text-[#FF361B] mr-1 w-5 h-5"
                  stroke="#FFF"
                  fill="#FF361B"
                />
                {errors.email?.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start gap-1">
          <input
            type="password"
            className="pl-[16px] py-[20.5px] w-[400px] h-[52px] rounded-[12px] border border-[#D7E8D7] placeholder:text-[#A1A7B4] placeholder:font-semibold outline-none"
            {...register("password")}
            placeholder="비밀번호"
          />
          <div className="font-wanted flex items-center justify-center leading-[21px] font-[500]">
            {errors.password?.message && (
              <p
                role="alert"
                className="text-sm text-[#FF361B] mb-[10px] flex justify-center items-center font-[500] leading-[21px] tracking-[-0.14px]"
              >
                <CircleAlert
                  className="text-[#FF361B] mr-1 w-5 h-5"
                  stroke="#FFF"
                  fill="#FF361B"
                />
                {errors.password?.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 아이디 저장 체크박스 */}
      <div className="w-full mt-[12px]">
        <label className="flex gap-[4px] items-start justify-start checked:bg-[#0D9C36] checked:border-transparent focus:outline-none cursor-pointer">
          <input
            type="checkbox"
            className="rounded-full text-[14px]"
            checked={saveEmail}
            onChange={handleCheckboxChange}
          />
          아이디 저장
        </label>
      </div>

      <button
        type="submit"
        className="w-[400px] h-[52px] mt-[45px] bg-[#0D9C36] border-none p-2 text-[18px] font-[600] text-[#FFF] rounded-[40px] leading-[27px] tracking-[-0.18px]"
      >
        로그인 하기
      </button>
    </form>
  );
};

export default LoginForm;
