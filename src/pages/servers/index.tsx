// src/pages/ServersPage.tsx
import { Button } from "@/components/ui/button";
import { useServers } from "@/services/servers/fetchServers";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const ServersPage = () => {
  const { logout } = useAuth();
  const [sortBy, setSortBy] = useState<"name" | "distance">("name");
  const { data, error, isLoading } = useServers();

  const handleSort = (criterion: "name" | "distance") => {
    setSortBy(criterion);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const sortedServers = [...(data || [])].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return a.distance - b.distance;
    }
  });

  return (
    <div className="p-4">
      <Button
        onClick={logout}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </Button>
      <h1 className="text-xl font-bold mb-4">Servers List</h1>
      <div className="mb-4 flex space-x-4">
        <Button
          onClick={() => handleSort("name")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sort by Name
        </Button>
        <Button
          onClick={() => handleSort("distance")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sort by Distance
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border border-gray-200">ID</th>
              <th className="px-4 py-2 border border-gray-200">Name</th>
              <th className="px-4 py-2 border border-gray-200">Distance</th>
            </tr>
          </thead>
          <tbody>
            {sortedServers.map((server) => (
              <tr key={server.id}>
                <td className="px-4 py-2 border border-gray-200">
                  {server.id}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {server.name}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {server.distance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServersPage;
