import type { FormFieldProps } from "../types";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
}) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { required: true })}
      className="p-4 h-14 border-2 border-slate-800 hover:border-slate-700 focus:border-slate-300 bg-slate-900 w-full rounded transition-colors duration-150"
    />
    {error && <span className="mt-1 text-sm text-red-700">{error.message}</span>}
  </>
);

export default FormField;
