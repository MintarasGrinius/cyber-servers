// src/pages/ServersPage.tsx
import { isObjectWithMessage } from "@/lib/utils";
import { useServers } from "@/services/servers/fetchServers";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "../../components/data-table";
import { columns } from "./columns";
import ServersTableFilters from "./ServersTableFilters";

const ServersTable = () => {
  const { data, error, isLoading } = useServers();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

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
    <>
      <ServersTableFilters
        onSortingChange={setSorting}
        sorting={sorting}
        onColumnFiltersChange={setColumnFilters}
        columnFilters={columnFilters}
        data={data}
      />
      <DataTable table={table} columns={columns} data={data} />
    </>
  );
};

export default ServersTable;
