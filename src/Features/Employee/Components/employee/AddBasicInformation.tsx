import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveBasicInfo } from "../../featuresSlices/employeeSlice";
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
import { store } from "@/Redux/store";
import { Button } from "@/components/ui/button";

// ✅ Validation schema
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

const BasicInformation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const employeeData = useAppSelector((state) => state.employee.basicInfo);

  const form = useForm<BasicInfoValues>({
    resolver: zodResolver(formSchema),
    defaultValues: employeeData || {
      firstName: "",
      middleName: "",
      lastName: "",
      maidenName: "",
      email: "",
      phone: "",
      altPhone: "",
      county: "",
      state: "",
      city: "",
      zipCode: "",
      username: "",
      password: "",
    },
  });

  const onNext = (data: BasicInfoValues) => {
    console.log("💾 Saving basic info to Redux:", data);
    dispatch(saveBasicInfo(data));

    // Verify the data was saved
    const currentState = store.getState(); // You might need to import store
    console.log("🔍 Redux state after save:", currentState.employee);

    navigate("/personal-information");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onNext)}
        className="p-8 w-full h-full mx-auto"
      >
        <div className="border-2 border-gray-300 p-3 space-y-5">
          {/* <h2 className="text-xl font-semibold"> Basic Information </h2> */}

          {/* name fiels */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Middle Name */}
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Michael" {...field} />
                  </FormControl>
                  </div>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  </div>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />

            {/* Maiden Name */}
            <FormField
              control={form.control}
              name="maidenName"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
                  <FormLabel>Maiden Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional" {...field} />
                  </FormControl>
                  </div>
                  <FormMessage className="form-message" />
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
                <FormItem className="form-item">
                  <div>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                      />
                  </FormControl>
                      </div>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
                  <FormLabel>Phone *</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="123-456-7890" {...field} />
                  </FormControl>
                  </div>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />

            {/* Alternative Phone */}
            <FormField
              control={form.control}
              name="altPhone"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
                  <FormLabel>Alternative Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Optional" {...field} />
                  </FormControl>
                  </div>
                  <FormMessage className="form-message" />
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
                <FormItem className="form-item">
                  <div>
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
                    </div>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />

            {/* State */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="Dhaka" {...field} />
                  </FormControl>
                  </div>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Mirpur" {...field} />
                  </FormControl>
                  </div>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />

            {/* Zip Code */}
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="1207" {...field} />
                  </FormControl>
                  </div>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />
          </div>

          <h6 className="font-semibold text-2xl">Log In</h6>

          {/* login */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  </div>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  </div>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="default" className="px-10">
              Next
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default BasicInformation;
