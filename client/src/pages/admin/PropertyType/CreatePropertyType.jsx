import { Button, InputFile, InputForm, TextArea, Title } from "~/components";
import { GoPlusCircle } from "react-icons/go";
import { useForm } from "react-hook-form";
import { apiCreateNewPropertyType } from "~/apis/propertyType";
import { toast } from "react-toastify";

const CreatePropertyType = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm();
  const handleCreateNewPropertyType = async (data) => {
    if (!data.images || data.images.length === 0) {
      setError("images", {
        message: "This field cannot empty",
        type: "required",
      });
    } else {
      const { images, ...payload } = data;
      const response = await apiCreateNewPropertyType({
        ...payload,
        image: images[0],
      });
      if (response.success) {
        toast.success(response.mes);
        reset();
        getImages([]);
      } else toast.error(response.mes);
    }
  };
  const getImages = (images) => {
    if (images && images.length > 0) {
      clearErrors("images");
    }
    setValue(
      "images",
      images?.map((el) => el.path)
    );
  };
  return (
    <div className="">
      <Title title="Create New Property Type">
        <Button
          className="font-semibold"
          handleOnClick={handleSubmit(handleCreateNewPropertyType)}
        >
          Create
        </Button>
      </Title>
      <form className="p-4 flex flex-col">
        <InputForm
          id="name"
          register={register}
          errors={errors}
          validate={{ required: "This field cannot empty" }}
          label="Property Type Name"
        />
        <TextArea
          id="description"
          register={register}
          errors={errors}
          validate={{ required: "This field cannot empty" }}
          label="Description"
        />
        <InputFile
          id="images"
          register={register}
          errors={errors}
          validate={{ required: "This field cannot empty" }}
          label="Image"
          // multiple={true}
          getImages={getImages}
        />
      </form>
    </div>
  );
};

export default CreatePropertyType;
