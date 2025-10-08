"use client";

import type { ColumnDef } from "@tanstack/react-table";

export type EmployeePosition = {
  _id: string;
  position: string;
  details: string;
};

export const columns: ColumnDef<EmployeePosition>[] = [
  {
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "details",
    header: "Details",
  },
];
