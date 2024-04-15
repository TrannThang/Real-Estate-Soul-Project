import { useForm } from "react-hook-form";
import { Button, InputForm, InputSelect } from "..";
import SearchItem from "./SearchItem";
import SelectLib from "../inputs/SelectLib";
import { usePropertiesStore } from "~/store/useProperties";
import { AiOutlineDown } from "react-icons/ai";
import { useState } from "react";
import withRouter from "~/hocs/withRouter";
import path from "~/utils/path,";
import { createSearchParams } from "react-router-dom";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useAppStore } from "~/store/useAppStore";

const Search = ({ navigate, direction = "horizontal" }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();
  const { setModal } = useAppStore();
  const { propertyTypes } = usePropertiesStore();
  const [isShowPopupPrice, setIsShowPopupPrice] = useState(false);
  const handleSearchParams = (data) => {
    const { start, end, address, propertyType } = data;
    const params = new Object();
    if (address) params.address = data.address;
    if (propertyType) params.propertyTypeId = data.propertyType.id;
    if (start && !end) params.price = ["gte", +start];
    if (end && !start) params.price = ["lte", +end];
    if (start && end) params.price = [+start, +end];
    if (direction === "vertical") setModal(false, null);
    navigate({
      pathname: `/${path.PROPERTIES}`,
      search: createSearchParams(params).toString(),
    });
  };
  return (
    <form
      className={twMerge(
        clsx(
          "bg-white py-4 grid grid-cols-4 px- rounded-md shadow-lg  mx-auto h-[8em] mt-[-4em] relative z-20"
        ),
        direction === "vertical"
          ? "flex flex-col gap-4 h-fit w-[500px] px-8"
          : "",
        direction === "horizontal" ? "grid grid-cols-4 h-[8em] w-[1096px]" : ""
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <SearchItem
        className={
          direction === "vertical"
            ? "items-start justify-start border-none"
            : ""
        }
        title="Locations"
      >
        <InputForm
          id="address"
          register={register}
          errors={errors}
          placeholder="Type your required locations"
          containerClassname={direction === "vertical" ? "w-full" : "w-[14em]"}
          inputClassname="rounded-md border border-gray-200"
        />
      </SearchItem>
      <SearchItem
        className={
          direction === "vertical"
            ? "items-start justify-start border-none"
            : ""
        }
        title="Property Type"
      >
        <SelectLib
          id="propertyType"
          register={register}
          errors={errors}
          containerClassname={direction === "vertical" ? "w-full" : "w-[14em]"}
          inputClassname="rounded-md border border-gray-200"
          placeholder="Select property type"
          options={propertyTypes?.map((el) => ({ ...el, label: el.name }))}
          onChange={(val) => setValue("propertyType", val)}
        />
      </SearchItem>
      <SearchItem
        className={
          direction === "vertical"
            ? "items-start justify-start border-none"
            : ""
        }
        title="Rent range"
      >
        {isShowPopupPrice && (
          <div className="absolute border top-full  right-0 left-0 flex flex-col gap-6  bg-white drop-shadow p-4 rounded-md   ">
            <div className="flex flex-col gap-2">
              <span className="font-bold"> Type your price</span>
              <div className="grid grid-cols-2 gap-3">
                <InputForm id="start" register={register} errors={errors} />
                <InputForm id="end" register={register} errors={errors} />
              </div>
            </div>
          </div>
        )}
        <Button
          handleOnClick={() => setIsShowPopupPrice((prev) => !prev)}
          className={twMerge(
            clsx(
              "bg-white text-black border border-gray-300 w-full ",
              direction === "vertical" ? "max-w-full hidden" : "max-w-[14em]"
            )
          )}
        >
          <span>Select range price</span>
          <AiOutlineDown />
        </Button>
        {direction === "vertical" && (
          <div className="grid grid-cols-2 w-full gap-3">
            <InputForm
              inputClassname="border-gray-300 rounded-md"
              id="start"
              register={register}
              errors={errors}
              placeholder="Type price start"
            />
            <InputForm
              placeholder="Type price end"
              inputClassname="border-gray-300 rounded-md"
              id="end"
              register={register}
              errors={errors}
            />
          </div>
        )}
      </SearchItem>

      <div className="flex items-center justify-center">
        <Button
          handleOnClick={handleSubmit(handleSearchParams)}
          className="px-8"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default withRouter(Search);
