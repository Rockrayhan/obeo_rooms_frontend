import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { toast } from "sonner";
import { useDeleteEmployeeMutation, useGetAllEmployeesQuery } from "../../api/employeeApi";
import { DataTable } from "@/lib/DataTable";
import {  EmployeeColumns } from "../../Components/employee/EmployeeColumns";


const AllEmployee = () => {
  const { data, isLoading, isError } = useGetAllEmployeesQuery(undefined);
  const [deleteEmployee] = useDeleteEmployeeMutation();

  if (isLoading) return <p>Loading employees...</p>;
  if (isError) return <p>Failed to load employees.</p>;

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    try {
      await deleteEmployee(id).unwrap();
      toast.success("Employee deleted successfully");
    } catch (err) {
      console.error("Failed to delete employee:", err);
      toast.error("Failed to delete employee");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">All Employees</h1>

        <div className="flex gap-2">
        <Link to="/basic-information">
          <Button>Add Employee</Button>
        </Link>

        <Link to="/manage-employee">
          <Button>Manage Employee</Button>
        </Link>
        </div>

      </div>

      <div className="border rounded-lg shadow-sm bg-white p-4">
        <DataTable
          columns={EmployeeColumns(handleDelete)}
          data={data?.data || []}
        />
      </div>
    </div>
  );
};

export default AllEmployee;
