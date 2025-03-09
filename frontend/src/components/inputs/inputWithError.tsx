import { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputWithErrorProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  register?: UseFormRegister<any>;
}

const InputWithError = forwardRef<HTMLInputElement, InputWithErrorProps>(
  ({ register, icon, ...props }, ref) => {
    return (
      <div className="flex gap-x-5 mb-3">
        {icon}
        <input
          className="border w-full border-gray-300 p-2 rounded-md outline-none hover:border-gray-400"
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

InputWithError.displayName = "InputWithError";

export default InputWithError;
