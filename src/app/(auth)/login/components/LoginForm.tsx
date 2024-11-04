"use client";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/api/auth-actions";
import { LoginInput } from "@/types/authType";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/api/user-action";
import { userStore } from "@/zustand/userStore";
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

const LoginForm = () => {
  const { loginUser } = userStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<LoginInput> = async (data: LoginInput) => {
    try {
      const response = await login(data);
      const userInfo = await getUserInfo(response.session?.user.id as string);

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

  return (
    <form
      className="w-full flex flex-col justify-center items-center gap-1 p-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-4xl font-normal mb-[60px]">로그인</h2>
      <div className="space-y-3">
        <input
          type="email"
          className="p-2 w-[584px] h-16 rounded-md borde border-[#5BCA11] placeholder:text-gray-600 placeholder:font-semibold"
          {...register("email")}
          placeholder="아이디"
        />
        <p role="alert" className="text-sm text-red-600">
          {errors.email?.message}
        </p>
        <input
          type="password"
          className="p-2 w-[584px] h-16 rounded-md border border-[#5BCA11] placeholder:text-gray-600 placeholder:font-semibold"
          {...register("password")}
          placeholder="비밀번호"
        />
        <p role="alert" className="text-sm text-red-600">
          {errors.password?.message}
        </p>
      </div>

      <button
        type="submit"
        className="w-[584px] mt-[45px] h-16 bg-[#469B0D] p-2 rounded-md text-[#FFF]"
      >
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
