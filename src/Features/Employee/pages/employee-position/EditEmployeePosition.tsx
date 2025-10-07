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
import { Textarea } from "@/components/ui/textarea";

import type { IEmployeePositionType } from "../../types/employeePositionType";


import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { useEffect } from "react";
import { useGetPositionByIdQuery, useUpdatePositionMutation } from "../../api/employeePositionApi";

// ✅ Zod Schema (reuse from Add)
const positionSchema = z.object({
  position: z.string().min(2, { message: "Position name is required" }),
  details: z.string().optional(),
});

const EditEmployeePosition = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch position by ID
  const { data, isLoading } = useGetPositionByIdQuery(id!);
  const [updatePosition] = useUpdatePositionMutation();

  const form = useForm<IEmployeePositionType>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      position: "",
      details: "",
    },
  });

  // When data is fetched, set form values
  useEffect(() => {
    if (data?.data) {
      form.reset({
        position: data.data.position,
        details: data.data.details || "",
      });
    }
  }, [data, form]);

  const onSubmit = async (values: IEmployeePositionType) => {
    try {
      const res =  await updatePosition({ id, ...values }).unwrap();
      console.log(res);
      toast.success("Employee position updated successfully!");
      navigate("/employee-position-all");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to update position");
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Edit Employee Position</h2>
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
            Update Position
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditEmployeePosition;
