"use client";

import { signup } from "../../actions";

const SignupForm = () => {
  return (
    <form className="flex flex-col justify-center items-center">
      <input type="email" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <input type="text" name="nickname" placeholder="nickname" />
      <button type="submit" formAction={signup}>
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
