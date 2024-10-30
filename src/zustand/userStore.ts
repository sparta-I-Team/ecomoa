import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  accessToken: string;
  isAuthenticated: boolean;
}

interface UserState {
  user: User;
  loginUser: (data: {
    email: string;
    accessToken: string;
    id: string;
    isAuthenticated: boolean;
  }) => void;
  logoutUser: () => void;
}

export const userStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        id: "",
        email: "",
        accessToken: "",
        isAuthenticated: false
      },
      loginUser: (data: {
        id: string;
        email: string;
        accessToken: string;
        isAuthenticated: boolean;
      }) =>
        set(() => ({
          user: {
            id: data.id,
            email: data.email,
            accessToken: data.accessToken,
            isAuthenticated: true
          }
        })),
      logoutUser: () =>
        set(() => ({
          user: {
            id: "",
            email: "",
            accessToken: "",
            isAuthenticated: false
          }
        }))
    }),
    {
      name: "userInfo" // localStorage 키 이름
    }
  )
);
