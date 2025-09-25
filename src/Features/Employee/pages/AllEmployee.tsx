import { Button } from "@/components/ui/button";
import { useGetAllEmployeesQuery, useDeleteEmployeeMutation } from "@/Redux/baseApi";
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
      toast("Employee deleted successfully");
    } catch (err) {
      console.error("Failed to delete employee:", err);
      toast("Failed to delete employee");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Employees</h1>

      <div className="mb-4">
        <Link to="/basic-information" className="px-10">
          <Button>Add Employee</Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">First Name</th>
              <th className="px-4 py-2 border">Last Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((emp: any) => (
              <tr key={emp._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{emp.firstName}</td>
                <td className="px-4 py-2 border">{emp.lastName}</td>
                <td className="px-4 py-2 border">{emp.email}</td>
                <td className="px-4 py-2 border">{emp.phone}</td>
                <td className="px-4 py-2 border flex gap-3 justify-center ">
                  <Link to={`/employee/${emp._id}/edit-basic-information`}>
                    <Button
                      variant="link"
                      className="bg-yellow-500 text-xs text-black hover:bg-yellow-600"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    className="text-xs"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployee;
