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

const AllEmployeePosition = () => {
  const { data, isLoading, isError } = useGetAllPositionsQuery({});
  const [deletePosition] = useDeletePositionMutation();

  if (isLoading) return <p>Loading positions...</p>;
  if (isError) return <p>Failed to load positions.</p>;

  return (
    <div className="p-5">
      <div>
        <h1 className="text-xl font-bold mb-6">All Employee Positions</h1>

        <Link to="/employee-position-add">
        <Button> Add Employee Position </Button>
        </Link>
      </div>

      <Table>
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
                  onClick={() => deletePosition(pos._id)}
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
