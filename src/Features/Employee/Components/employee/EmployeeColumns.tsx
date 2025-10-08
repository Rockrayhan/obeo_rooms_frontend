import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import type { IEmployee } from "../../types/employeeType";



export const EmployeeColumns = (
  handleDelete: (id: string) => void
): ColumnDef<IEmployee>[] => [
  {
    header: "SL",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "middleName",
    header: "Middle Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return new Date(value).toLocaleDateString();
    },
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
  },
  {
    accessorKey: "religion",
    header: "Religion",
  },
  {
    accessorKey: "bloodGroup",
    header: "Blood Group",
  },
  {
    accessorKey: "fatherName",
    header: "Father’s Name",
  },
  {
    accessorKey: "motherName",
    header: "Mother’s Name",
  },
  {
    accessorKey: "state",
    header: "State / Division",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "zipCode",
    header: "ZIP Code",
  },
  {
    accessorKey: "nationalIdOrPassport",
    header: "NID / Passport",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const emp = row.original;
      return (
        <div className="flex gap-2 justify-center">
          <Link to={`/employee/${emp._id}/edit-basic-information`}>
            <Button
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs"
            >
              Edit
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="sm"
            className="text-xs"
            onClick={() => handleDelete(emp._id)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
