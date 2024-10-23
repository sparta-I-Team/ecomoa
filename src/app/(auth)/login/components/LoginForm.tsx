"use client";

const LoginForm = () => {
  return (
    <form className="flex flex-col justify-center items-center">
      <input type="email" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;
