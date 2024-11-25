import { FieldError } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type RadioFieldProps = {
  label: string;
  register: any;
  name: string;
  options: Option[];
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const RadioField = ({
  label,
  register,
  name,
  options,
  error,
  inputProps,
}: RadioFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm text-slate-800">{label}</label>

      <div>
        {options.map((option) => (
          <div
            key={option.label}
            className="flex items-center ps-4 border-none rounded mt-2"
          >
            <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
              <li className="w-full shadow-sm border-gray-300 rounded-lg">
                <div className="flex items-center ps-3">
                  <input
                    id={option.label}
                    type="radio"
                    value={option.value}
                    {...register(name)}
                    name={name}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600"
                    {...inputProps}
                  />
                  <label
                    htmlFor={option.label}
                    className={`w-full py-3 ms-2 text-sm font-medium`}
                  >
                    {option.label}
                  </label>
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>

      {error?.message && (
        <p className="text-red-500 text-xs md:text-sm">
          {error?.message.toString()}
        </p>
      )}
    </div>
  );
};

export default RadioField;
