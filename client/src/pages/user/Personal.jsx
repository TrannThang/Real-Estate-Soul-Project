import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiUpdateProfile } from "~/apis/user";
import { Button, InputFile, InputForm } from "~/components";
import { useUserStore } from "~/store/useUserStore";

const Personal = () => {
  const { current, getCurrent } = useUserStore();
  const [isChangeAvatar, setIsChangeAvatar] = useState(false);
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    watch,
  } = useForm();
  const avatar = watch("avatar");
  useEffect(() => {
    if (current) {
      reset({
        name: current.name,
        address: current.address || undefined,
        email: current.email || undefined,
        phone: current.phone,
        avatar: current.avatar,
      });
    }
  }, [current]);
  const getImages = (images) => {
    if (images && images.length > 0) {
      clearErrors("images");
    }
    setValue(
      "avatar",
      images?.map((el) => el.path)
    );
  };
  const onSubmit = async (data) => {
    const { avatar, ...payload } = data;
    if (Array.isArray(avatar)) payload.avatar = avatar;
    const response = await apiUpdateProfile(payload);
    if (response.success) {
      toast.success(response.mes);
      getCurrent();
      setIsChangeAvatar(false);
    } else toast.error(response.mes);
  };
  return (
    <div className="h-full">
      <div className="h-14 flex justify-between items-center border-b px-6">
        <h1 className="text-3xl font-bold text-main-700">
          Personal Information
        </h1>
      </div>
      <form className="max-w-[600px] space-y-4 mx-auto my-6">
        <InputForm
          id="name"
          register={register}
          validate={{ required: "This field cannot empty" }}
          errors={errors}
          label="Fullname"
          required
          placeholder="Required fullname"
        />
        <InputForm
          id="phone"
          register={register}
          validate={{ required: "This field cannot empty" }}
          errors={errors}
          label="Phone"
          required
          placeholder="Required phone"
          readOnly={
            !(
              current?.userRoles?.length === 1 &&
              current?.userRoles[0]?.roleCode === "ROL7"
            )
          }
        />
        <InputForm
          id="email"
          register={register}
          validate={{ required: "This field cannot empty" }}
          errors={errors}
          label="Email Address"
          required
          placeholder="Required email"
        />
        <InputForm
          id="address"
          register={register}
          validate={{ required: "This field cannot empty" }}
          errors={errors}
          label="Address"
          required
          placeholder="Required address"
        />
        <div className="flex flex-col gap-3">
          <span className="font-medium text-main-700">
            Avatar{" "}
            <span
              className="text-xs cursor-pointer hover:underline text-orange-600"
              onClick={() => setIsChangeAvatar((prev) => !prev)}
            >
              {isChangeAvatar ? "Unchange ⛔" : "Change ✏️"}
            </span>
          </span>

          {isChangeAvatar ? (
            <InputFile
              id="avatar"
              register={register}
              errors={errors}
              getImages={getImages}
            />
          ) : (
            <img
              src={avatar || "/user2.svg"}
              alt=""
              className="w-28 h-28 object-cover rounded-full"
            />
          )}
        </div>
        <Button className="mx-auto my-8" handleOnClick={handleSubmit(onSubmit)}>
          Update
        </Button>
      </form>
    </div>
  );
};

export default Personal;
