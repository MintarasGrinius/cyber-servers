import { useAuth } from "@/context/AuthContext";
import { Server } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const fetchServers = async (token: string | null) => {
  if (!token) {
    throw new Error("No token provided");
  }

  const response = await fetch("https://playground.tesonet.lt/v1/servers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch servers");
  }

  return response.json();
};

export const useServers = () => {
  const { token } = useAuth();

  const query = useQuery<Server[], Error>({
    queryKey: ["servers"],
    queryFn: () => fetchServers(token),
    enabled: !!token,
  });

  if (query.error) {
    // TODO: Sentry or any other error tracking service can be used here
    console.error("Error fetching servers:", query.error);
  }

  return { ...query, data: query.data ?? [] };
};
