import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { apiGetProperties } from "~/apis/properties";
import { BreadCrumb, Button, InputSelect, PropertyCard } from "~/components";
import { Pagination } from "~/components/pagination";

const Properties = () => {
  const [properties, setProperties] = useState();
  const [mode, setMode] = useState("ALL");
  const [searchParams] = useSearchParams();

  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  // const sort = watch("sort");
  useEffect(() => {
    const fetchProperties = async (params) => {
      const response = await apiGetProperties({
        limit: 9,
        ...params,
      });
      if (response.success) setProperties(response.properties);
      else toast.error(response.mes);
    };
    const params = Object.fromEntries([...searchParams]);
    fetchProperties(params);
  }, [searchParams]);

  return (
    <div className="w-full">
      <div className="relative w-full">
        <img src="/properties.png" alt="" className="w-full object-contain" />
        <div className="absolute flex flex-col inset-0 text-white  justify-center items-center">
          <h1 className="text-[48px] font-medium">Propertice</h1>
          <div>
            <BreadCrumb />
          </div>
        </div>
      </div>
      <div className="w-main mx-auto my-20">
        <div className="my-4 flex justify-between text-sm items-center">
          <InputSelect
            register={register}
            placeholder="Select"
            id="sort"
            errors={errors}
            options={[
              { label: "Lastest", value: "-createdAt" },
              { label: "Oldest", value: "createdAt" },
              { label: "A - Z", value: "name" },
              { label: "Z - A", value: "-name" },
            ]}
            containerClassname="flex-row items-center gap-2"
            label="Sort: "
            inputClassname="w-fit rounded-md"
          />

          <div className="flex items-center gap-4">
            <Button
              handleOnClick={() => setMode("ALL")}
              className={twMerge(
                clsx(
                  "whitespace-nowrap bg-transparent border-none text-gray-900 font-medium ",
                  mode === "ALL" && "font-bold"
                )
              )}
            >
              All Properties
            </Button>
            <Button
              handleOnClick={() => setMode("RENT")}
              className={twMerge(
                clsx(
                  "whitespace-nowrap bg-transparent border-none text-gray-900 font-medium ",
                  mode === "RENT" && "font-bold"
                )
              )}
            >
              For Rent
            </Button>
            <Button
              handleOnClick={() => setMode("SALE")}
              className={twMerge(
                clsx(
                  "whitespace-nowrap bg-transparent border-none text-gray-900 font-medium ",
                  mode === "SALE" && "font-bold"
                )
              )}
            >
              For Sales
            </Button>
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-4">
          {properties?.rows?.map((el) => (
            <PropertyCard key={el.id} properties={el} />
          ))}
        </div>
        <div className="flex items-center justify-center my-4">
          <Pagination
            total={properties?.count}
            limit={properties?.limit}
            page={properties?.page}
          />
        </div>
      </div>
    </div>
  );
};

export default Properties;
