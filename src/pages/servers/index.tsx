// src/pages/ServersPage.tsx
import { Heading } from "@/components/ui/Typography";
import { isObjectWithMessage } from "@/lib/utils";
import { useServers } from "@/services/servers/fetchServers";
import { DataTable } from "../../components/data-table";
import { columns } from "./columns";

const ServersPage = () => {
  const { data, error, isLoading } = useServers();

  // TODO: Add skeleton
  if (isLoading) return <div>Loading...</div>;

  // TODO: Add error handling
  if (error) {
    if (isObjectWithMessage(error)) {
      return <div>Error: {error.message}</div>;
    } else {
      return <div>Error fetching servers</div>;
    }
  }

  return (
    <div className="p-4 space-y-4 bg-background">
      <div className="flex justify-between items-center">
        <Heading.H1>Servers List</Heading.H1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ServersPage;
