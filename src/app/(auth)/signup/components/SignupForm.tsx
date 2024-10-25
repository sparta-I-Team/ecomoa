"use client";
import { signup } from "../../actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

// Zod 스키마 정의
const signupSchema = z.object({
  email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
  password: z
    .string()
    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
    .nonempty({ message: "비밀번호를 입력해주세요." }),
  nickname: z
    .string()
    .min(2, { message: "닉네임은 최소 2자 이상이어야 합니다." })
    .max(20, { message: "닉네임은 20자 이하이어야 합니다." }) // 닉네임 길이 제한
    .regex(/^[a-zA-Z0-9가-힣@_-]*$/, {
      message:
        "닉네임은 알파벳, 숫자, 한글, @, 밑줄 및 하이픈만 포함해야 합니다."
    }) // 특정 문자만 허용
});

export interface SignupInput {
  email: string;
  password: string;
  nickname: string;
}

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
    console.log("제출된 데이터:", data); // 데이터 로그
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
      <input type="text" {...register("nickname")} placeholder="nickname" />
      <p role="alert" className="text-red-600">
        {errors.nickname?.message}
      </p>
      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignupForm;
