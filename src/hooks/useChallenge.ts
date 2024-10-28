import { challengesApi } from "@/api/challengeApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useChallengeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: challengesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
    }
  });
};
