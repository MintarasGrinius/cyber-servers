import { useAuth } from "@/context/AuthContext";
import { fetchWithAuth } from "@/lib/fetchWrapper";
import { Server } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useServers = () => {
  const { token } = useAuth();

  const query = useQuery<Server[], Error>({
    queryKey: ["servers"],
    queryFn: async () =>
      await fetchWithAuth("https://playground.tesonet.lt/v1/servers"),
    enabled: !!token,
    retry: false,
  });

  if (query.error) {
    // TODO: Sentry or any other error tracking service can be used here
    console.error("Error fetching servers:", query.error);
  }

  return { ...query, data: query.data ?? [] };
};
