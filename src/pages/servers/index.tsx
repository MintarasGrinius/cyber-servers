// src/pages/ServersPage.tsx
import { Heading } from "@/components/ui/Typography";
import ServersTable from "./ServersTable";

const ServersPage = () => {
  return (
    <div className="p-4 space-y-4 bg-background min-h-screen relative flex flex-col">
      <div className="flex justify-between items-center">
        <Heading.H1>Servers List</Heading.H1>
      </div>

      <ServersTable />
    </div>
  );
};

export default ServersPage;
