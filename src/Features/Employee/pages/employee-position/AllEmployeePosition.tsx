import {
  useDeletePositionMutation,
  useGetAllPositionsQuery,
} from "../../api/employeePositionApi";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router"; 
import { toast } from "sonner";

const AllEmployeePosition = () => {
  const { data , isLoading, isError } = useGetAllPositionsQuery({});
  const [deletePosition] = useDeletePositionMutation();

  if (isLoading) return <p>Loading positions...</p>;
  if (isError) return <p>Failed to load positions.</p>;

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete this item?`)) return;

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
            <Button>
              Add Employee Position
            </Button>
          </Link>

          <Link to="/manage-employee-position">
            <Button>
              Manage Employee Position
            </Button>
          </Link>
        </div>
      </div>

      <Table className="border rounded-lg shadow-sm">
        <TableCaption>A list of all employee positions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>SL</TableHead>
            <TableHead className="w-[200px]">Position</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.data?.length > 0 ? (
            data?.data.map((pos: any, index: number) => (
              <TableRow key={pos._id}>
                {/* ✅ Serial number */}
                <TableCell>{index + 1}</TableCell>

                <TableCell className="font-medium">{pos.position}</TableCell>
                <TableCell>{pos.details}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-4">
                No positions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllEmployeePosition;
