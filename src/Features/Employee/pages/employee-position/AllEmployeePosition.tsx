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
  const { data, isLoading, isError } = useGetAllPositionsQuery({});
  const [deletePosition] = useDeletePositionMutation();

  if (isLoading) return <p>Loading positions...</p>;
  if (isError) return <p>Failed to load positions.</p>;

  const handleDelete = async (id: string) => {
    if (!confirm(`Are you sure you want to delete the item ?`)) return;

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
      <div className="flex flex-col gap-3 mb-2">
        <h1 className="text-xl font-bold">All Employee Positions</h1>

        <Link to="/employee-position-add">
          <Button> Add Employee Position </Button>
        </Link>
      </div>

      <Table className="border rounded-lg shadow-sm">
        <TableCaption>A list of all employee positions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Position</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="text-right w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((pos: any) => (
            <TableRow key={pos._id}>
              <TableCell className="font-medium">{pos.position}</TableCell>
              <TableCell>{pos.details}</TableCell>
              <TableCell className="text-right flex justify-center gap-2 ">
                <Link to={`/employee-position/${pos._id}`}>
                  <Button
                    variant="link"
                    className="bg-yellow-500 text-xs text-black hover:bg-yellow-600"
                  >
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(pos._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllEmployeePosition;
