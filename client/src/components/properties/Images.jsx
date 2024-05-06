import React, { memo, useState } from "react";
import { Button, ImageDetail } from "..";
import { CiBoxList } from "react-icons/ci";
import { useAppStore } from "~/store/useAppStore";

const Images = ({ images = [] }) => {
  const { setModal } = useAppStore();
  const handleNavigateToDetailImage = (index) => {
    setModal(true, <ImageDetail images={images} forceIndex={index} />);
  };
  return (
    <div className="w-full relative grid grid-cols-4 grid-rows-2 gap-2">
      <img
        src={images[0]}
        alt="picture-1"
        onClick={() => handleNavigateToDetailImage(0)}
        className="w-full h-full col-span-2 row-span-2 rounded-l-md object-cover"
      />
      <img
        src={images[1]}
        alt="picture-1"
        onClick={() => handleNavigateToDetailImage(1)}
        className="w-full h-full col-span-1 row-span-1  object-cover"
      />
      <img
        src={images[2]}
        alt="picture-1"
        onClick={() => handleNavigateToDetailImage(2)}
        className="w-full h-full col-span-1 row-span-1 rounded-tr-md object-cover"
      />
      <img
        src={images[3]}
        alt="picture-1"
        onClick={() => handleNavigateToDetailImage(3)}
        className="w-full h-full col-span-1 row-span-1  object-cover"
      />
      <img
        onClick={() => handleNavigateToDetailImage(4)}
        src={images[4]}
        alt="picture-1"
        className="w-full h-full col-span-1 row-span-1 rounded-br-md object-cover"
      />
      <div className="absolute bottom-4 right-4">
        <Button
          handleOnClick={() => setModal(true, <ImageDetail images={images} />)}
          className="bg-white border border-main-600 text-main-600 font-bold"
        >
          <CiBoxList size={20} color="blue" />
          <span>Hiển thị tất cả ảnh </span>
        </Button>
      </div>
    </div>
  );
};

export default memo(Images);
