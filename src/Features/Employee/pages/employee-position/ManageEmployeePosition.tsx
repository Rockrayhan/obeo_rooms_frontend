import { useState, useEffect } from "react";
import {
  useGetAllPositionsQuery,
  useUpdatePositionMutation,
} from "../../api/employeePositionApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const ManageEmployeePosition = () => {
  const { data, isLoading, isError } = useGetAllPositionsQuery({});
  const [updatePosition] = useUpdatePositionMutation();
  const [positions, setPositions] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data) {
      // ensure every field is a string (for editable inputs)
      const safeData = data.data.map((item: any) => ({
        ...item,
        position: item.position ?? "",
        details: item.details ?? "",
      }));
      setPositions(safeData);
    }
  }, [data]);

  if (isLoading) return <p>Loading positions...</p>;
  if (isError) return <p>Failed to load positions.</p>;

  const handleChange = (index: number, field: string, value: string) => {
    setPositions((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      for (const pos of positions) {
        await updatePosition({ id: pos._id, body: pos }).unwrap();
      }
      toast.success("All employee positions updated successfully");
      navigate("/employee-position-all");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update positions");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 text-center">
        Manage Employee Positions
      </h1>

      <form onSubmit={handleSaveAll}>
        <Table className="border rounded-lg shadow-sm bg-white">
          <TableCaption>Editable list of all employee positions.</TableCaption>

          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[80px]">SL</TableHead>
              <TableHead className="w-[250px]">Position</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {positions.map((pos, index) => (
              <TableRow key={pos._id}>
                <TableCell>{index + 1}</TableCell>

                <TableCell>
                  <Input
                    value={pos.position || ""}
                    onChange={(e) =>
                      handleChange(index, "position", e.target.value)
                    }
                    className="w-full"
                  />
                </TableCell>

                <TableCell>
                  <Textarea
                    value={pos.details || ""}
                    onChange={(e) =>
                      handleChange(index, "details", e.target.value)
                    }
                    className="w-full min-h-[60px]"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            Save All Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ManageEmployeePosition;
