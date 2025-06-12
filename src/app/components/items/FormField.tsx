type Option = {
  label: string;
  value: string | number;
};

type FormFieldProps = {
  label: string;
  name: string;
  type: "input" | "select";
  value: string;
  placeholder?: string;
  options?: Option[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
};

export default function FormField({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
  options,
  required,
}: FormFieldProps) {
  return (
    <div className="flex flex-col p-4 gap-2">
      <div className="flex flex-row items-center">
        <label className="basis-1/5">{label}</label>
        {type === "input" ? (
          <input
            id={name}
            placeholder={placeholder}
            value={value}
            required={required}
            onChange={onChange}
            className="basis-4/5 px-4 py-2 border border-solid border-gray-200 rounded-md focus:bg-blue-50 transition"
          />
        ) : (
          <select
            id={name}
            value={value}
            required={required}
            onChange={onChange}
            className="basis-4/5 px-4 py-2 border border-solid border-gray-200 rounded-md focus:bg-blue-50 transition"
          >
            <option value=""> Pilih {label}</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
