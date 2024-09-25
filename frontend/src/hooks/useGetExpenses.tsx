import { api } from "@/lib/api";
import { useQuery, type QueryKey } from "@tanstack/react-query";

const queryKey: QueryKey = ["get-expenses"];

export const useGetExpenses = () => {
  return useQuery({
    queryKey,
    queryFn: () => {
      return api.expenses.$get().then((res) => {
        if (!res.ok) {
          throw new Error("Server Error");
        }
        return res.json();
      });
    },
  });
};
