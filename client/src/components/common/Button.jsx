import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { ImSpinner7 } from "react-icons/im";

const Button = ({
  children,
  className,
  handleOnClick,
  type = "button",
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={handleOnClick}
      className={twMerge(
        clsx(
          "py-3 px-4 text-white bg-main-700 rounded-md justify-center flex items-center gap-3",
          className,
          disabled && "opacity-50"
        )
      )}
      disabled={disabled}
    >
      {disabled && (
        <span className="animate-spin">
          <ImSpinner7 />
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
