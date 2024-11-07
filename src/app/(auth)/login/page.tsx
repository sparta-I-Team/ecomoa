import Image from "next/image";
import GoogleLoginButton from "./components/GoogleLoginButton";
import KaKaoLoginButton from "./components/KaKaoLoginButton";
import NaverLoginButton from "./components/NaverLoginButton";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#EAFCDE] px-4">
      <div className="mx-auto max-w-md flex flex-col items-center pt-12 sm:pt-20">
        <Image
          src={"/images/logo.png"}
          width={180}
          height={30}
          alt="ecomoa 로고"
          className="mb-8"
        />

        <div className="space-y-1 mb-10">
          <h1 className="font-wanted text-3xl font-semibold text-center leading-tight">
            에코모아에 가입하고
          </h1>
          <h1 className="font-wanted text-3xl font-semibold text-center leading-tight">
            탄소 절감 혜택을 누려보세요!
          </h1>
        </div>

        <LoginForm />

        <div className="w-full mt-12 mb-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-4 font-wanted text-base text-[#6E7481] font-medium">
            간편 가입 및 로그인
          </p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="flex flex-col justify-center items-center w-full space-y-3 mb-12">
          <NaverLoginButton />
          <KaKaoLoginButton />
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
