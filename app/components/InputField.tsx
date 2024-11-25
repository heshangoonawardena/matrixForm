import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  defaultValue?: string;
  register: any;
  name: string;
  placeholder?: string;
  error?: FieldError;
  hidden?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = "text",
  defaultValue,
  register,
  name,
  placeholder = "",
  error,
  hidden,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label hidden={hidden} className="text-sm text-slate-800" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        hidden={hidden}
        {...register(name)}
        defaultValue={defaultValue}
        className={`border-2 border-gray-400 rounded-md p-2 focus:outline-orange-500`}
        {...inputProps}
      />
      {error?.message && (
        <p className="text-red-500 text-xs md:text-sm">
          {error?.message.toString()}
        </p>
      )}
    </div>
  );
};

export default InputField;
