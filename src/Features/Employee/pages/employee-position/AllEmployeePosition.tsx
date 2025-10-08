import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useDeletePositionMutation,
  useGetAllPositionsQuery,
} from "../../api/employeePositionApi";
import { columns, type EmployeePosition } from "../../Components/employeePosition/EmployeePositionColumns";
import { DataTable } from "@/lib/DataTable";


const AllEmployeePosition = () => {
  const { data, isLoading, isError } = useGetAllPositionsQuery({});
  const [deletePosition] = useDeletePositionMutation();

  if (isLoading) return <p>Loading positions...</p>;
  if (isError) return <p>Failed to load positions.</p>;

  const positions: EmployeePosition[] = data?.data || [];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deletePosition(id).unwrap();
      toast.success("Employee position deleted successfully");
    } catch (err) {
      console.error("Failed to delete position:", err);
      toast.error("Failed to delete position");
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">All Employee Positions</h1>

        <div className="flex gap-3">
          <Link to="/employee-position-add">
            <Button>Add Employee Position</Button>
          </Link>

          <Link to="/manage-employee-position">
            <Button>Manage Employee Position</Button>
          </Link>
        </div>
      </div>

      <DataTable columns={columns} data={positions} />
    </div>
  );
};

export default AllEmployeePosition;
