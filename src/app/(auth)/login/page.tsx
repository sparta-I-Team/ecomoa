import GoogleLoginButton from "./components/GoogleLoginButton";
import KaKaoLoginButton from "./components/KaKaoLoginButton";
import LoginForm from "./components/LoginForm";
import NaverLoginButton from "./components/NaverLoginButton";

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <LoginForm />
      <KaKaoLoginButton />
      <GoogleLoginButton />
      <NaverLoginButton />
    </div>
  );
};

export default LoginPage;
