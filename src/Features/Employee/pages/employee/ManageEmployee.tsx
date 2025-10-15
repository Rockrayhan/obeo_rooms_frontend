"use client";

import { useState, useEffect, useMemo } from "react";
import {
  useGetAllEmployeesQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from "../../api/employeeApi";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { ColumnDef, SortingState } from "@tanstack/react-table";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";

const ManageEmployee = () => {
  const { data, isLoading, isError } = useGetAllEmployeesQuery({});
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [employees, setEmployees] = useState<any[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  // ✅ pagination + search
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data) {
      const safeData = data.data.map((emp: any) => ({
        ...emp,
        firstName: emp.firstName ?? "",
        middleName: emp.middleName ?? "",
        lastName: emp.lastName ?? "",
        email: emp.email ?? "",
        phone: emp.phone ?? "",
        gender: emp.gender ?? "",
        dateOfBirth: emp.dateOfBirth ?? "",
        nationality: emp.nationality ?? "",
        religion: emp.religion ?? "",
        bloodGroup: emp.bloodGroup ?? "",
        fatherName: emp.fatherName ?? "",
        motherName: emp.motherName ?? "",
        state: emp.state ?? "",
        city: emp.city ?? "",
        zipCode: emp.zipCode ?? "",
        nationalIdOrPassport: emp.nationalIdOrPassport ?? "",
      }));
      setEmployees(safeData);
    }
  }, [data]);

  const handleChange = (id: string, field: string, value: string) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp._id === id ? { ...emp, [field]: value } : emp))
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    try {
      await deleteEmployee(id).unwrap();
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      toast.success("Employee deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete employee");
    }
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      for (const emp of employees) {
        await updateEmployee({ id: emp._id, data: emp }).unwrap();
      }
      toast.success("All employee data updated successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update employee data");
    }
  };

  // ✅ Filtered + paginated data
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) =>
      Object.values(emp)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);

  const totalPages = Math.ceil(filteredEmployees.length / entriesPerPage);
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return filteredEmployees.slice(start, start + entriesPerPage);
  }, [filteredEmployees, currentPage, entriesPerPage]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "SL",
        cell: ({ row }) => row.index + 1 + (currentPage - 1) * entriesPerPage,
        enableSorting: false,
      },
      ...[
        "firstName",
        "middleName",
        "lastName",
        "email",
        "phone",
        "gender",
        "dateOfBirth",
        "nationality",
        "religion",
        "bloodGroup",
        "fatherName",
        "motherName",
        "state",
        "city",
        "zipCode",
        "nationalIdOrPassport",
      ].map((field) => ({
        accessorKey: field,
        header: ({ column }: any) => (
          <Button
            type="button"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-semibold"
          >
            {field
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }: any) => (
          <Input
            value={row.original[field] || ""}
            onChange={(e) =>
              handleChange(row.original._id, field, e.target.value)
            }
            className="w-40"
          />
        ),
      })),
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(row.original._id)}
          >
            Delete
          </Button>
        ),
      },
    ],
    [employees, currentPage, entriesPerPage]
  );

  const table = useReactTable({
    data: paginatedEmployees,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <p>Loading employees...</p>;
  if (isError) return <p>Failed to load employees.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Employees</h1>

      {/* pagination and search */}
      <div className="flex justify-between mb-8">
        <div className="flex items-center gap-2">
          Show{" "}
          <Input
            type="number"
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value) || 1);
              setCurrentPage(1);
            }}
            className="w-[80px]"
          />{" "}
          entries
        </div>

        <div className="flex items-center gap-2">
          <span>Search: </span>
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-[200px]"
          />
        </div>
      </div>

      <form onSubmit={handleSaveAll}>
        <div className="rounded-md border bg-white shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-gray-50">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="align-top whitespace-nowrap"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No employees found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* ✅ Pagination Controls */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <span>
            Showing {(currentPage - 1) * entriesPerPage + 1} to{" "}
            {Math.min(currentPage * entriesPerPage, filteredEmployees.length)} of{" "}
            {filteredEmployees.length} entries
          </span>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            Save All Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ManageEmployee;
