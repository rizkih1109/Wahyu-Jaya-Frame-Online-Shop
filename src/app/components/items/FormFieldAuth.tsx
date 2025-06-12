type FormFieldProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export default function FormFieldAuth({
  label,
  name,
  type,
  value,
  autoComplete,
  onChange,
  required,
}: FormFieldProps) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="mb-2 text-sm block">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        autoComplete={autoComplete}
        required={required}
        onChange={onChange}
        className="px-2 py-1 mb-3 min-w-full rounded-md bg-inputBg"
      />
    </div>
  );
}
