// src/pages/ServersPage.tsx
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/Typography";
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

const ServersPage = () => {
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

  const distanceFilterValue = table.getColumn("distance")?.getFilterValue();
  const distanceFilterSecureValue = isArrayWithTwoNumbers(distanceFilterValue)
    ? distanceFilterValue
    : undefined;

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

  console.info("🚀 ~ distanceFilterSecureValue:", distanceFilterSecureValue);
  console.info("🚀 ~ distanceFilterValue:", distanceFilterValue);
  return (
    <div className="p-4 space-y-4 bg-background">
      <div className="flex justify-between items-center">
        <Heading.H1>Servers List</Heading.H1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Filter distance from..."
            value={distanceFilterSecureValue?.[0] ?? ""}
            type="number"
            onChange={(event) =>
              table
                .getColumn("distance")
                ?.setFilterValue([
                  event.target.valueAsNumber ?? 0,
                  distanceFilterSecureValue?.[1] ?? 0,
                ])
            }
            className="max-w-sm"
          />
          to
          <Input
            placeholder="Filter distance to..."
            value={distanceFilterSecureValue?.[1] ?? ""}
            type="number"
            onChange={(event) =>
              table
                .getColumn("distance")
                ?.setFilterValue([
                  distanceFilterSecureValue?.[0] ?? 0,
                  event.target.valueAsNumber ?? 0,
                ])
            }
            className="max-w-sm"
          />
        </div>
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <DataTable table={table} columns={columns} data={data} />
    </div>
  );
};

export default ServersPage;

const isArrayWithTwoNumbers = (value: unknown): value is [number, number] => {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    isNumber(value[0]) &&
    isNumber(value[1])
  );
};
const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};
