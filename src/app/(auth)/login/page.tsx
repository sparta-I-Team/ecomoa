import Image from "next/image";
import GoogleLoginButton from "./components/GoogleLoginButton";
import KaKaoLoginButton from "./components/KaKaoLoginButton";
import NaverLoginButton from "./components/NaverLoginButton";
// import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="mx-auto h-screen bg-[#EAFCDE]">
      {/* <LoginForm /> */}
      <div className="flex flex-col items-center">
        <Image
          src={"/images/logo.png"}
          width={180}
          height={30}
          alt="ecomoa 로고"
          className="mt-[232px]"
        />
        <div className="mt-[32px]">
          <h1 className="font-wanted text-[32px] font-[600] leading-[48px] text-center">
            에코모아에 가입하고
          </h1>
        </div>
        <div>
          <h1 className="font-wanted text-[32px] font-[600] leading-[48px] text-center">
            탄소 절감 혜택을 누려보세요!
          </h1>
        </div>
        {/* 라인 어떻게 넣지??.. */}
        <p className="mt-[95px] font-wanted text-[#6E7481] text-[16px] font-[500] leading-[24px]">
          간편 가입 및 로그인
        </p>
        {/* <LoginForm /> */}
        <div className="flex flex-col gap-3 mt-[45px]">
          <NaverLoginButton />
          <KaKaoLoginButton />
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
