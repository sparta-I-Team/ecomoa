import Image from "next/image";
import GoogleLoginButton from "./components/GoogleLoginButton";
import KaKaoLoginButton from "./components/KaKaoLoginButton";
import NaverLoginButton from "./components/NaverLoginButton";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#EAFCDE]">
      {/* <LoginForm /> */}
      <div className="flex flex-col items-center gap-3">
        <Image
          src={"/logo.png"}
          width={180}
          height={30}
          alt="ecomoa"
          className="mb-[40.25px]"
        />
        <h1 className="text-center text-[32px] mb-[88px]">
          에코모아에 가입하고
          <br />
          탄소 절감 혜택을 누려보세요!
        </h1>
        <p className="mb-[41px]">간편 가입 및 로그인</p>
        <LoginForm />
        <NaverLoginButton />
        <KaKaoLoginButton />
        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
