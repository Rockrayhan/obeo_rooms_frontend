import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from "@/Redux/baseApi";
import { toast } from "sonner";

// ✅ Reuse schema
const formSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  nationality: z.string().min(1, "Nationality is required"),
  religion: z.string().min(1, "Religion is required"),
  bloodGroup: z.string().min(1, "Blood group is required"),
  nationalIdOrPassport: z.string().min(1, "NID / Passport is required"),
});

type FormValues = z.infer<typeof formSchema>;

const EditPersonalInfo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useGetEmployeeByIdQuery(id!);
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: data?.data ?? {},
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await updateEmployee({ id, data: { personalInfo: values } }).unwrap();
      toast("✅ Employee updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("❌ Update failed:", err);
      toast("❌ Failed to update employee");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 w-full h-full mx-auto">
        <h2 className="text-xl font-semibold">Edit Personal Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Father's Name */}
            <FormField
              control={form.control}
              name="fatherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father's Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter father's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mother's Name */}
            <FormField
              control={form.control}
              name="motherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mother's Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter mother's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Birth */}
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Marital Status */}
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nationality */}
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter nationality" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Religion */}
            <FormField
              control={form.control}
              name="religion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Religion *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter religion" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Blood Group */}
            <FormField
              control={form.control}
              name="bloodGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* National ID / Passport */}
            <FormField
              control={form.control}
              name="nationalIdOrPassport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National ID / Passport *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter NID or Passport No." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            Previous
          </Button>
          <Button type="submit" disabled={isUpdating} className="px-10 bg-green-600 text-white">
            {isUpdating ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditPersonalInfo;
