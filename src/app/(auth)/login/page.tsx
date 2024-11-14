import Image from "next/image";
import GoogleLoginButton from "./components/GoogleLoginButton";
import KaKaoLoginButton from "./components/KaKaoLoginButton";
import NaverLoginButton from "./components/NaverLoginButton";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div
      className="min-h-screen bg-[#F2F9F2] px-4 bg-none sm:bg-[url('/images/background.png')] sm:bg-no-repeat sm:bg-cover sm:bg-center"
      style={{
        backgroundSize: "2421px 1255px",
        backgroundPosition: "-245px 90px"
      }}
    >
      <div className="mx-auto max-w-md flex flex-col items-center sm:pt-20 ">
        <Image
          src={"/images/logo.png"}
          width={180}
          height={30}
          alt="ecomoa 로고"
          className="mt-[140px] mb-[40px]"
        />

        <div className="space-y-1">
          <h1 className="font-wanted text-3xl font-semibold text-center leading-tight">
            에코모아에 가입하고
          </h1>
          <h1 className="font-wanted text-3xl font-semibold text-center leading-tight">
            탄소 절감 혜택을 누려보세요!
          </h1>
        </div>

        <div className="w-full mt-[130px] sm:mt-[88px] mb-[30px] flex items-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="leading-[24px] px-4 font-wanted text-base text-[#525660] font-extrabold">
            간편 가입 및 로그인
          </p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="flex flex-col justify-center items-center w-full gap-[12px] mb-[60px]">
          <NaverLoginButton />
          <KaKaoLoginButton />
          <GoogleLoginButton />
        </div>
        <div className="flex justify-between gap-[30px] text-[#525660] text-[16px] font-wanted leading-[24px] tracking-[-0.16px]">
          <Link href={"/login/email"}>이메일 로그인하기</Link>
          <p>|</p>
          <Link href={"/signup"}>이메일 회원가입하기</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
