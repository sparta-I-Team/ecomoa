import { getUserInfo } from "@/api/user-action";
import { userStore } from "@/zustand/userStore";
import { useQuery } from "@tanstack/react-query";

export const useUserInfo = () => {
  const { user } = userStore();
  
  return useQuery({
    queryKey: ["user", user.id],
    queryFn: () => getUserInfo(user.id),
    enabled: !!user.id,
    staleTime: 0
  });
};
