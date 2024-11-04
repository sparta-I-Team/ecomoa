import { challengesApi } from "@/api/challengeApi";
import { ChallengeData } from "@/types/challengesType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChallengeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: challengesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
    }
  });
};

export const useChallengeList = () => {
  return useQuery({
    queryKey: ["challenges"],
    queryFn: () => challengesApi.read()
  });
};

export const useUserChallengeList = (userId: string) => {
  return useQuery<ChallengeData[]>({
    queryKey: ["challenges", userId],
    queryFn: () => challengesApi.readByUserId(userId),
    enabled: !!userId
  });

  // 오늘의 챌린지 가져오기
};
