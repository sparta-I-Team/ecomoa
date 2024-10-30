import GoogleLoginButton from "./components/GoogleLoginButton";
import KaKaoLoginButton from "./components/KaKaoLoginButton";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <LoginForm />
      <KaKaoLoginButton />
      <GoogleLoginButton />
    </div>
  );
};

export default LoginPage;
