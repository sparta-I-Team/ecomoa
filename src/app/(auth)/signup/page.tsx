import React from "react";
import SignupForm from "./components/SignupForm";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <SignupForm />
      <Link href={"/login"}>로그인으로 이동</Link>
    </div>
  );
};

export default SignupPage;
