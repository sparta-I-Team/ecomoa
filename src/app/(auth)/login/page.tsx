import Link from "next/link";
import KaKaoLoginButton from "./components/KaKaoLoginButton";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <LoginForm />
      <KaKaoLoginButton />
      <Link href={"/signup"}>회원가입으로 이동</Link>
    </div>
  );
};

export default LoginPage;
