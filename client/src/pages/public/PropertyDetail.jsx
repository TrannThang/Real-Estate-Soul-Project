import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetDetailProperty, apiGetProperties } from "~/apis/properties";
import { BoxInfo, BreadCrumb, Images, Map, RelatedPost } from "~/components";
import { SlLocationPin } from "react-icons/sl";
import DOMPurify from "dompurify";
import { formatMoney } from "~/utils/helper";
import moment from "moment";

const InfoCell = ({ title, value, unit = "" }) => {
  return (
    <tr>
      <td className="border font-semibold p-3 text-center">{title}</td>
      <td className="border p-3 text-center">{value}</td>
      <td className="border p-3 text-center">{unit}</td>
    </tr>
  );
};

const PropertyDetail = () => {
  const { id } = useParams();
  const [propertyDetail, setPropertyDetail] = useState();
  const [relatedProperties, setRelatedProperties] = useState({
    propertyType: null,
    listingTypes: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchDetailProperty = async () => {
      const response = await apiGetDetailProperty(id);
      if (response.success) {
        setPropertyDetail(response.data);
      }
    };

    fetchDetailProperty();
  }, [id]);
  useEffect(() => {
    const fetchRelatedPost = async () => {
      const [propertyType, listingTypes] = await Promise.all([
        apiGetProperties({
          propertyTypeId: propertyDetail.propertyTypeId,
          limit: 5,
          fields: "name,id,featuredImage,price,listingType,isAvailable",
        }),
        apiGetProperties({
          listingType: propertyDetail.listingType,
          limit: 5,
          fields: "name,id,featuredImage,price,listingType,isAvailable",
        }),
      ]);
      if (propertyType.success)
        setRelatedProperties((prev) => ({
          ...prev,
          propertyType: propertyType.properties,
        }));
      if (listingTypes.success)
        setRelatedProperties((prev) => ({
          ...prev,
          listingTypes: listingTypes.properties,
        }));
    };
    if (propertyDetail) {
      fetchRelatedPost();
    }
  }, [propertyDetail]);
  return (
    <div className="w-full pb-[500px]">
      <div className="relative w-full">
        <img src="/properties.png" alt="" className="w-full object-contain" />
        <div className="absolute flex flex-col inset-0 text-white  justify-center items-center">
          <h1 className="text-[48px] font-medium">Property Detail</h1>
          <div>
            <BreadCrumb />
          </div>
        </div>
      </div>
      {propertyDetail && (
        <div className="w-main  mx-auto my-8">
          {propertyDetail?.images && <Images images={propertyDetail.images} />}
          <div className="grid my-8 grid-cols-10 gap-4">
            <div className="col-span-7">
              <h1 className="font-bold text-2xl line-clamp-2">
                {propertyDetail?.name}
              </h1>
              <span className="flex items-center gap-3">
                <SlLocationPin size={18} color="#2C3A61" />
                <span>{propertyDetail.address}</span>
              </span>
              <div
                className="my-8"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(propertyDetail.description),
                }}
              ></div>
              <div>
                <h3 className="font-bold text-lg">Property's Information</h3>
                <table className="w-full my-4 table-fixed">
                  <thead>
                    <tr>
                      <th className="border p-3 text-center bg-main-300">
                        Characteristic
                      </th>
                      <th className="border p-3 text-center bg-main-300">
                        Values
                      </th>
                      <th className="border p-3 text-center bg-main-300">
                        Unit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <InfoCell
                      title="Price"
                      value={formatMoney(propertyDetail.price)}
                      unit="USD"
                    />
                    <InfoCell
                      title="Size"
                      value={formatMoney(propertyDetail.propertySize)}
                      unit={
                        <span>
                          m<sup>3</sup>
                        </span>
                      }
                    />
                    <InfoCell
                      title="Property Type"
                      value={propertyDetail.rPropertyType?.name}
                    />
                    <InfoCell
                      title="Built Year"
                      value={formatMoney(propertyDetail.yearBuilt)}
                    />
                    <InfoCell
                      title="Listing Type"
                      value={formatMoney(propertyDetail.listingType)}
                    />
                    <InfoCell
                      title="Bathroom Quantity"
                      value={formatMoney(propertyDetail.bathRoom)}
                      unit="room(s)"
                    />
                    <InfoCell
                      title="Bedroom Quantity"
                      value={formatMoney(propertyDetail.bedRoom)}
                      unit="room(s)"
                    />
                    <InfoCell
                      title="Is available"
                      value={formatMoney(
                        propertyDetail.isAvailable ? "Yes" : "No"
                      )}
                    />
                    <InfoCell
                      title="Posted At"
                      value={moment(propertyDetail.createdAt).format(
                        "DD/MM/YYYY"
                      )}
                    />
                  </tbody>
                </table>
              </div>
              <div className="w-full h-[300px] bg-gray-100 rounded-md ]">
                {/* <Map /> */}
              </div>
            </div>
            <div className="col-span-3 flex flex-col gap-6">
              <BoxInfo
                role="Agent"
                roleStyle="text-green-600"
                data={propertyDetail.rPostedBy}
              />
              <BoxInfo
                role="Owner"
                roleStyle="text-red-600"
                data={propertyDetail.rOwner}
              />
              <RelatedPost
                title="Related Properties"
                data={relatedProperties.propertyType?.rows}
              />
              <RelatedPost
                title={`Propertices for ${propertyDetail.listingType}`}
                data={relatedProperties.listingTypes?.rows}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
