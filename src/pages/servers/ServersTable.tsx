// src/pages/ServersPage.tsx
import { DataTable } from "@/components/data-table";
import ServerError from "@/components/ServerError";
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
import { columns } from "./columns";
import ServersTableFilters from "./ServersTableFilters";
import ServersTableSkeleton from "./ServersTableSkeleton";

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

  if (isLoading) return <ServersTableSkeleton />;

  if (error) {
    return (
      <ServerError
        message={isObjectWithMessage(error) ? error.message : undefined}
      />
    );
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
