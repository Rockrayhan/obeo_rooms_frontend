import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAllEmployeesQuery,
  useDeleteEmployeeMutation,
} from "@/Redux/baseApi";
import { Link } from "react-router";
import { toast } from "sonner";

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
    <div className="space-y-6">
      <div className="flex flex-col gap-3 mb-2">
        <h1 className="text-2xl font-bold">All Employees</h1>
        <Link to="/basic-information">
          <Button>Add Employee</Button>
        </Link>
      </div>

      <div className="border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.length ? (
              data.data.map((emp: any) => (
                <TableRow key={emp._id}>
                  <TableCell>{emp.firstName}</TableCell>
                  <TableCell>{emp.lastName}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.phone}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-2 justify-center">
                      <Link to={`/employee/${emp._id}/edit-basic-information`}>
                        <Button className="bg-yellow-500">Edit</Button>
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
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-gray-500"
                >
                  No employees found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllEmployee;
