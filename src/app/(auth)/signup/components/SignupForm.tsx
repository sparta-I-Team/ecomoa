"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signup } from "@/api/auth-actions";
import { SignupInput } from "@/types/authType";

// Zod 스키마 정의
const signupSchema = z.object({
  email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
  password: z
    .string()
    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
    .nonempty({ message: "비밀번호를 입력해주세요." })
});

const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit: SubmitHandler<SignupInput> = async (data: SignupInput) => {
    // console.log("제출된 데이터:", data);
    try {
      await signup(data);
      alert("회원가입이 완료되었습니다.");
      router.push("/login");
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  return (
    <form
      className="w-full flex flex-col justify-center items-center gap-1 p-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-4xl font-normal mb-[60px]">회원가입</h2>
      <input
        type="email"
        className="p-2 w-[584px] h-16 rounded-md borde border-[#5BCA11] placeholder:text-gray-600 placeholder:font-semibold"
        {...register("email")}
        placeholder="이메일"
      />
      <p role="alert" className="text-sm text-red-600">
        {errors.email?.message}
      </p>
      <input
        type="password"
        className="p-2 w-[584px] h-16 rounded-md borde border-[#5BCA11] placeholder:text-gray-600 placeholder:font-semibold"
        {...register("password")}
        placeholder="비밀번호"
      />
      <p role="alert" className="text-sm text-red-600">
        {errors.password?.message}
      </p>
      <button
        type="submit"
        className="w-[584px] mt-[45px] h-16 bg-[#469B0D] p-2 rounded-md text-[#FFF]"
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
