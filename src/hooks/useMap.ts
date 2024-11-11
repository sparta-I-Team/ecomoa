import { getStoreList } from "@/api/mapApi";
import { useQuery } from "@tanstack/react-query";

export const useStoreList = () => {
  return useQuery({
    queryKey: ["ecoStores"],
    queryFn: getStoreList,
    staleTime: 5 * 60 * 1000,
    retry: 3
  });
};
