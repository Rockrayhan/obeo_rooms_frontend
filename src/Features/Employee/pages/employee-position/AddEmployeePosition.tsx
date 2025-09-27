import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import type { IEmployeePositionType } from "../../types/employeePositionType";
import { useCreatePositionMutation } from "../../api/employeePositionApi";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router";
import { toast } from "sonner";


// ✅ Zod Schema
const positionSchema = z.object({
  position: z.string().min(2, { message: "Position name is required" }),
  details: z.string().optional(),
});

const AddEmployeePosition = () => {
  const [createPosition] = useCreatePositionMutation();

  const form = useForm<IEmployeePositionType>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      position: "",
      details: "",
    },
  });


  const navigate = useNavigate();


  const onSubmit = async (values: IEmployeePositionType) => {
    try {
      await createPosition(values).unwrap();
      form.reset();
      navigate("/employee-position-all");
      toast.success("Employee position created successfully!");
    } catch (error) {
      console.error(error);
      toast.error(" ❌ Failed to create position:");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Add Employee Position</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Position */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Shift Manager" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Details */}
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Textarea placeholder="Manage Working Shifts" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type="submit" className="w-full">
            Add Position
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddEmployeePosition;
