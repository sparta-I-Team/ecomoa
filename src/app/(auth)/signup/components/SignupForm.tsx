"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signup } from "@/api/auth-actions";
import { SignupInput } from "@/types/authType";
import Link from "next/link";
import { checkEmailAbility } from "@/api/user-action";
import { useState } from "react";

// Zod 스키마 정의
const signupSchema = z
  .object({
    email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
    password: z
      .string()
      .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
      .regex(/[A-Za-z]/, { message: "영문자를 최소 1자 이상 포함해야 합니다." })
      .nonempty({ message: "비밀번호를 입력해주세요." }),
    passwordConfirm: z
      .string()
      .nonempty({ message: "비밀번호를 입력해주세요." })
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"]
  });

const SignupForm = () => {
  const router = useRouter();
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    true
  );
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema)
  });

  const handleEmailBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const email = event.target.value;
    if (email) {
      const available = await checkEmailAbility(email);
      setIsEmailAvailable(available);
      console.log("사용 가능한 이메일", isEmailAvailable);
      if (!isEmailAvailable) {
        setError("email", {
          type: "manual",
          message: "이미 사용 중인 이메일입니다."
        });
      }
    }
  };

  const onSubmit: SubmitHandler<SignupInput> = async (data: SignupInput) => {
    if (!isEmailAvailable) {
      setError("email", {
        type: "manual",
        message: "이미 사용 중인 이메일입니다."
      });
      return;
    }

    try {
      await signup(data);
      alert("회원가입이 완료되었습니다.");
      router.push("/login");
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  return (
    <div className="font-wanted min-h-screen bg-[#EAFCDE] px-4">
      <form
        className="w-full flex flex-col justify-center items-center gap-1 p-3 my-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-4xl font-normal mb-[60px]">회원가입</h2>
        <input
          type="email"
          className="p-2 w-[584px] h-16 rounded-md borde border-[#5BCA11] placeholder:text-gray-600 placeholder:font-semibold outline-none"
          {...register("email")}
          placeholder="이메일"
          onBlur={handleEmailBlur} // 이메일 중복 검사
        />
        <p role="alert" className="text-sm text-red-600">
          {errors.email?.message}
        </p>
        <input
          type="password"
          className="p-2 w-[584px] h-16 rounded-md borde border-[#5BCA11] placeholder:text-gray-600 placeholder:font-semibold outline-none"
          {...register("password")}
          placeholder="비밀번호"
        />
        <p role="alert" className="text-sm text-red-600">
          {errors.password?.message}
        </p>
        <input
          type="password"
          className="p-2 w-[584px] h-16 rounded-md borde border-[#5BCA11] placeholder:text-gray-600 placeholder:font-semibold outline-none"
          {...register("passwordConfirm")}
          placeholder="비밀번호 확인"
        />
        <p role="alert" className="text-sm text-red-600">
          {errors.passwordConfirm?.message}
        </p>
        <button
          type="submit"
          className="w-[584px] mt-[45px] h-16 bg-[#469B0D] p-2 rounded-md text-[#FFF]"
        >
          회원가입
        </button>
      </form>
      <div className="w-full flex items-center mt-2">
        <div className="flex-1 h-px bg-gray-300"></div>
        <p className="px-4 font-wanted text-base text-[#6E7481] font-medium">
          <Link href={"/login"}>로그인으로 이동</Link>
        </p>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
    </div>
  );
};

export default SignupForm;
