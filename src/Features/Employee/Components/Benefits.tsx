import type { EmployeeFormData } from "../pages/AddEmployee";

interface Props {
  formData: EmployeeFormData;
  handleChange: (
    section: keyof EmployeeFormData,
    field: string,
    value: any
  ) => void;
}

const Benefits = ({ formData, handleChange }: Props) => {
  return (
    <div>
      <h2 className="font-semibold mb-2">Benefits</h2>
      <label className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={formData.benefits.health}
          onChange={(e) =>
            handleChange("benefits", "health", e.target.checked)
          }
        />
        Health Insurance
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.benefits.transport}
          onChange={(e) =>
            handleChange("benefits", "transport", e.target.checked)
          }
        />
        Transport Allowance
      </label>
    </div>
  );
};

export default Benefits;
