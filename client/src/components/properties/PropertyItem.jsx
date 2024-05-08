import React from "react";
import { Link } from "react-router-dom";
import { formatMoney } from "~/utils/helper";
import path from "~/utils/path,";

const PropertyItem = ({
  id,
  name,
  featuredImage,
  listingType,
  price,
  rPropertyType,
}) => {
  return (
    <div className="p-3 rounded-md even:bg-white odd:bg-gray-100 grid grid-cols-10 gap-3">
      <img
        src={featuredImage}
        alt=""
        className="col-span-2 w-full object-contain rounded-md"
      />
      <div className="flex flex-col col-span-8">
        <Link
          to={`/${path.PROPERTIES}/${id}`}
          className="font-semibold hover:underline text-main-600 leading-4 line-clamp-2 w-full "
          state={{ name }}
        >
          {name}
        </Link>
        <span className="text-orange-600 font-bold text-lg ">
          {"$" + formatMoney(price)}
        </span>
        <span className="flex gap-2 items-center text-xs">
          <span className="flex  items-center">
            {" "}
            ListingType: <span className="font-bold">{listingType}</span>
          </span>
          <span>
            {" "}
            PropertyType:{" "}
            <span className="font-bold">{rPropertyType.name}</span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default PropertyItem;
