"use client";

import { z } from "zod";
import { login } from "../../actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod 스키마 정의
const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "유효한 이메일을 입력해주세요." })
    .nonempty({ message: "이메일을 입력해주세요." }),
  password: z
    .string()
    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
    .nonempty({ message: "비밀번호를 입력해주세요." })
});

export interface LoginInput {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data: LoginInput) => {
    console.log("제출된 데이터:", data);
    try {
      await login(data);
    } catch (error) {
      const err = error as Error;
      if (err.message.includes("Invalid login credentials")) {
        alert("계정이 존재하지 않거나 잘못된 비밀번호입니다.");
      } else {
        alert(err.message || "로그인 중 오류가 발생했습니다.");
      }
    }
  };
  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="email" {...register("email")} placeholder="email" />
      <p role="alert" className="text-red-600">
        {errors.email?.message}
      </p>
      <input type="password" {...register("password")} placeholder="password" />
      <p role="alert" className="text-red-600">
        {errors.password?.message}
      </p>
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;
