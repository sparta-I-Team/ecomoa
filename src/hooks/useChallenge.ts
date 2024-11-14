import { challengesApi } from "@/api/challengeApi";
import { ChallengeData } from "@/types/challengesType";
import { userStore } from "@/zustand/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChallengeMutation = () => {
  const { user } = userStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: challengesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
      queryClient.invalidateQueries({ queryKey: ["userInfo", user.id] });
    }
  });
};

export const useChallengeUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: challengesApi.update,
    onSuccess: (_, challenge) => {
      queryClient.invalidateQueries({
        queryKey: ["challenge", challenge.challengeId]
      });
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
};

export const useGetChallenge = (challengeId: string) => {
  return useQuery<ChallengeData>({
    queryKey: ["challenge", challengeId],
    queryFn: async () => {
      const data = await challengesApi.readByChallengeId(challengeId);
      return data;
    },
    enabled: !!challengeId
  });
};

export const useDeleteChallenge = (challengeId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => challengesApi.delete(challengeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenge", challengeId] });
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
    }
  });
};
