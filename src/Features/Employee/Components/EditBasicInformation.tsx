import { useNavigate, useParams } from "react-router";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
} from "@/Redux/baseApi";

// ✅ Validation schema (reuse from BasicInformation)
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  maidenName: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(1, "Phone is required"),
  altPhone: z.string().optional(),
  county: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
});

export type BasicInfoValues = z.infer<typeof formSchema>;

const EditBasicInformation = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetEmployeeByIdQuery(id!);
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();

  const form = useForm<BasicInfoValues>({
    resolver: zodResolver(formSchema),
    values: data?.data ?? {}, // preload employee data
  });

  const onNext = async (values: BasicInfoValues) => {
    try {
      await updateEmployee({ id, data: { employee: values } }).unwrap();
      navigate(`/employee/${id}/edit-personal-information`);
    } catch (err) {
      console.error("❌ Update failed:", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onNext)}
        className="p-8 w-full h-full mx-auto"
      >
        <div className="border-2 border-gray-300 p-3 space-y-6">
          <h2 className="text-xl font-semibold">Edit Basic Information</h2>

     {/* name fiels */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Middle Name */}
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Michael" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Maiden Name */}
            <FormField
              control={form.control}
              name="maidenName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maiden Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* email & phone */}
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone *</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="123-456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Alternative Phone */}
            <FormField
              control={form.control}
              name="altPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alternative Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Optional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* location */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {/* County */}
            <FormField
              control={form.control}
              name="county"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>County</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select county" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Bangladesh">Bangladesh </SelectItem>
                      <SelectItem value="India">India </SelectItem>
                      <SelectItem value="Malyesia">Malyesia </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* State */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Dhaka" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Mirpur" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Zip Code */}
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="1207" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* login */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          <div className="flex justify-end">
            <Button type="submit" disabled={isUpdating} className="px-10">
              {isUpdating ? "Saving..." : "Next"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditBasicInformation;
