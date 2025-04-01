// src/pages/ServersPage.tsx
import { Input } from "@/components/ui/input";
import { Server } from "@/lib/types";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";

const ServersTableFilters = ({
  onSortingChange,
  sorting,
  onColumnFiltersChange,
  columnFilters,
  data,
}: {
  onSortingChange: OnChangeFn<SortingState>;
  sorting: SortingState;
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState> | undefined;
  columnFilters: ColumnFiltersState | undefined;
  data: Server[];
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange,
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

  return (
    <div className="flex md:flex-nowrap flex-wrap items-center gap-4">
      <div className="flex-1 flex items-center gap-2 min-w-[300px]">
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
      <div className="flex-1 min-w-[300px] relative">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ServersTableFilters;

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
