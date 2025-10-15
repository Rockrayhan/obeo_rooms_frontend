import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { useNavigate } from "react-router";
import { savePersonalInfo } from "../../featuresSlices/employeeSlice";
// import { useCreateEmployeeMutation } from "@/Redux/baseApi";

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

import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import { toast } from "sonner";
import { useCreateEmployeeMutation } from "../../api/employeeApi";

// ✅ Zod validation schema
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

const PersonalInfo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // get prev page and this page data
  const personalInfo = useAppSelector((state) => state.employee.personalInfo);
  const basicInfo = useAppSelector((state) => state.employee.basicInfo);

  // post data
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fatherName: personalInfo?.fatherName || "",
      motherName: personalInfo?.motherName || "",
      dateOfBirth: personalInfo?.dateOfBirth || "",
      gender: personalInfo?.gender || "",
      maritalStatus: personalInfo?.maritalStatus || "",
      nationality: personalInfo?.nationality || "",
      religion: personalInfo?.religion || "",
      bloodGroup: personalInfo?.bloodGroup || "",
      nationalIdOrPassport: personalInfo?.nationalIdOrPassport || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    // Save personal info to Redux
    dispatch(savePersonalInfo(data));

    // ✅ Check if basicInfo exists and has required fields
    if (
      !basicInfo ||
      !basicInfo.firstName ||
      !basicInfo.email ||
      !basicInfo.phone
    ) {
      console.error("❌ Basic info is missing required fields:", basicInfo);
      toast.success("Please complete the basic information first!");
      navigate("/");
      return;
    }

    // ✅ Combine both parts with proper structure
    const employeePayload = {
      employee: basicInfo,
      personalInfo: data,
    };

    try {
      console.log("📤 Sending payload to backend:", employeePayload);
      const result = await createEmployee(employeePayload).unwrap();

      console.log("✅ Employee created successfully:", result);
      toast.success("Employee created successfully!");
      navigate("/");
    } catch (err: any) {
      console.error("❌ Failed to save employee:", err);

      // show error
      if (err.data?.error?.name === "ValidationError") {
        toast(
          "Validation error: Please check all required fields are filled correctly."
        );
      } else {
        toast("Something went wrong while saving employee");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" p-8 w-full h-full mx-auto"
      >
        <h2 className="text-xl font-semibold">Personal Information</h2>

        {/* Debug info */}
        {(!basicInfo || !basicInfo.firstName) && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            ⚠️ Warning: Basic information appears to be missing. Please go back
            and complete it first.
          </div>
        )}

        <div className="border-2 border-gray-300 p-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Father's Name */}
            <FormField
              control={form.control}
              name="fatherName"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
                    <FormLabel>Father's Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter father's name" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mother's Name */}
            <FormField
              control={form.control}
              name="motherName"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
                    <FormLabel>Mother's Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter mother's name" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Birth */}
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
                    <FormLabel>Date of Birth *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal ${
                              !field.value && "text-muted-foreground"
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          onSelect={(date) =>
                            field.onChange(
                              date ? date.toISOString().split("T")[0] : ""
                            )
                          }
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                          fromYear={1950}
                          toYear={new Date().getFullYear()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
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
                <FormItem className="form-item">
                  <div>
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
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Marital Status */}
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
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
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nationality */}
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
                    <FormLabel>Nationality *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter nationality" {...field} />
                    </FormControl>
                  </div>
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
                <FormItem className="form-item">
                  <div>
                    <FormLabel>Religion *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter religion" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Blood Group */}
            <FormField
              control={form.control}
              name="bloodGroup"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
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
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* National ID / Passport */}
            <FormField
              control={form.control}
              name="nationalIdOrPassport"
              render={({ field }) => (
                <FormItem className="form-item">
                  <div>
                    <FormLabel>National ID / Passport *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter NID or Passport No."
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 gap-6">
          {/* prev button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
          >
            Previous
          </button>

          {/* submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default PersonalInfo;
