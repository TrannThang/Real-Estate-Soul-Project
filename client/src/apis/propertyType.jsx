import axios from "~/axios";

export const apiCreateNewPropertyType = (data) =>
  axios({
    url: "/property-type/",
    method: "post",
    data,
  });

export const apiGetPropertyTypes = (params) =>
  axios({
    url: "/property-type/",
    method: "get",
    params,
  });
