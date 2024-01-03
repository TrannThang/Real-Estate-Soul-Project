import clsx from "clsx";
import { useEffect, useState } from "react";
import { Button, InputForm, InputRadio } from "..";
import { useForm } from "react-hook-form";
import { apiRegister, apiSignIn } from "~/apis/auth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import withRouter from "~/hocs/withRouter";
import { useAppStore } from "~/store/useAppStore";
import { useUserStore } from "~/store/useUserStore";

const Login = ({ navigate }) => {
  const [variant, setVariant] = useState("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const { setModal } = useAppStore();
  const { token, setToken } = useUserStore();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  useEffect(() => {
    reset();
  }, [variant]);

  const onSubmit = async (data) => {
    if (variant === "REGISTER") {
      setIsLoading(true);
      const response = await apiRegister(data);
      setIsLoading(false);

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Congratulation",
          text: response.mes,
          showConfirmButton: true,
          confirmButtonText: "Go Sign In",
        }).then(({ isConfirmed }) => {
          if (isConfirmed) setVariant("LOGIN");
        });
      } else toast.error(response.mes);
    }
    if (variant === "LOGIN") {
      const { name, role, ...payload } = data;
      const response = await apiSignIn(payload);
      if (response.success) {
        toast.success(response.mes);
        setToken(response.accessToken);
        setModal(false, null);
      } else toast.error(response.mes);
    }
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white text-base rounded-md px-6 py-8 w-[500px] items-center flex flex-col gap-6"
    >
      <h1 className="text-3xl font-Agbalumo font-semibold tracking-tight">
        Welcome to Soul Rest
      </h1>
      <div className="flex border-b w-full justify-start  gap-6">
        <span
          onClick={() => setVariant("LOGIN")}
          className={clsx(
            variant === "LOGIN" && "border-b-4  border-main-700",
            "cursor-pointer"
          )}
        >
          Login
        </span>
        <span
          onClick={() => setVariant("REGISTER")}
          className={clsx(
            variant === "REGISTER" && "border-b-4  border-main-700",
            "cursor-pointer"
          )}
        >
          New account
        </span>
      </div>
      <form className="flex w-full px-4 flex-col gap-4 ">
        <InputForm
          label="Phone Number"
          inputClassname="rounded-md"
          register={register}
          id="phone"
          placeholder="Type your phone number"
          validate={{
            required: "This field cannot empty.",
            pattern: {
              value: /(|0[3|5|7|8|9])+([0-9]{8})\b/,
              message: "Phone number invalid",
            },
          }}
          errors={errors}
        />
        <InputForm
          label="Password"
          inputClassname="rounded-md"
          register={register}
          id="password"
          placeholder="Type your password"
          validate={{ required: "This field cannot empty." }}
          type="password"
          errors={errors}
        />
        {variant === "REGISTER" && (
          <InputForm
            label="Your fullname"
            inputClassname="rounded-md"
            register={register}
            id="name"
            placeholder="Type your name"
            validate={{ required: "This field cannot empty." }}
            errors={errors}
          />
        )}
        {variant === "REGISTER" && (
          <InputRadio
            label="Type account"
            register={register}
            id="role"
            validate={{ required: "This field cannot empty." }}
            errors={errors}
            options={[
              { label: "User", value: "USER" },
              { label: "Agent", value: "AGENT" },
            ]}
          />
        )}

        <Button handleOnClick={handleSubmit(onSubmit)} className="py-2 my-6">
          {variant === "LOGIN" ? "Sign In" : "Register"}
        </Button>
        <span className="cursor-pointer text-main-500 hover:underline w-full text-center">
          Forgot your password
        </span>
      </form>
    </div>
  );
};

export default withRouter(Login);
