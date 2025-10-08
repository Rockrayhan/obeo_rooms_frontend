import { useState, useEffect } from "react";
import {
  useGetAllEmployeesQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from "../../api/employeeApi";
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
import { toast } from "sonner";
import { useNavigate } from "react-router";

const ManageEmployee = () => {
  const { data, isLoading, isError } = useGetAllEmployeesQuery({});
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [employees, setEmployees] = useState<any[]>([]);

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

  if (isLoading) return <p>Loading employees...</p>;
  if (isError) return <p>Failed to load employees.</p>;

  const handleChange = (index: number, field: string, value: string) => {
    setEmployees((prev) =>
      prev.map((emp, i) => (i === index ? { ...emp, [field]: value } : emp))
    );
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
      console.error("Update failed:", err);
      toast.error("Failed to update employee data");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    try {
      await deleteEmployee(id).unwrap();
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      toast.success("Employee deleted successfully");
    } catch (err) {
      console.error("Failed to delete employee:", err);
      toast.error("Failed to delete employee");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Employees</h1>

      <form onSubmit={handleSaveAll}>
        <div className="overflow-x-auto w-full">
          <Table className="border rounded-lg shadow-sm bg-white w-full">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>SL</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Middle Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Nationality</TableHead>
                <TableHead>Religion</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead>Father's Name</TableHead>
                <TableHead>Mother's Name</TableHead>
                <TableHead>State / Division</TableHead>
                <TableHead>City</TableHead>
                <TableHead>ZIP Code</TableHead>
                <TableHead>NID / Passport</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="w-full">
              {employees.map((emp, index) => (
                <TableRow key={emp._id}>
                  <TableCell>{index + 1}</TableCell>
                  {[
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
                  ].map((field) => (
                    <TableCell key={field} className="">
                      <Input
                        value={emp[field] || ""}
                        onChange={(e) =>
                          handleChange(index, field, e.target.value)
                        }
                        className="w-fit"
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex gap-2">
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
              ))}
            </TableBody>
          </Table>
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
