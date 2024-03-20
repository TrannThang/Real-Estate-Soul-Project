const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");
const { Op, Sequelize } = require("sequelize");
const redis = require("../config/redis.config");

const createNewPropertyTypes = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const response = await db.PropertyType.findOrCreate({
    where: { name },
    defaults: req.body,
  });
  return res.json({
    success: response[1],
    mes: response[1] ? "Created" : "Name property duplicated",
    propertyType: response[0],
  });
});

const getPropertyTypes = asyncHandler(async (req, res) => {
  const { limit, page, fields, name, sort, ...query } = req.query;
  const options = {};
  if (fields) {
    const attributes = fields.split(",");
    const isExcluded = attributes.some((el) => el.startsWith("-"));
    if (isExcluded)
      options.attributes = {
        exclude: attributes.map((el) => el.replace("-", "")),
      };
    else options.attributes = attributes;
  }
  //Filter by query
  if (name)
    query.name = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("name")),
      "LIKE",
      `%${name.toLocaleLowerCase()}%`
    );
  //sorting
  if (sort) {
    const order = sort
      .split(",")
      .map((el) =>
        el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
      );

    options.order = order;
  }

  if (!limit) {
    const alreadyGetAll = await redis.get("get-property-type");
    if (alreadyGetAll)
      return res.json({
        success: true,
        mes: "Got",
        propertyTypes: JSON.parse(alreadyGetAll),
      });
    const response = await db.PropertyType.findAll({
      where: query,
      ...options,
    });
    redis.set("get-property-type", JSON.stringify(response));

    return res.json({
      success: response.length > 0,
      mes: response.length > 0 ? "Got" : "Cannot get propertyTypes",
      propertyTypes: response,
    });
  }
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const offset = (prevPage - 1) * limit;
  if (offset) options.offset = offset;
  options.limit = +limit;
  const response = await db.PropertyType.findAndCountAll({
    where: query,
    ...options,
  });
  return res.json({
    success: response.length > 0,
    mes: response.length > 0 ? "Got" : "Cannot get propertyTypes",
    propertyTypes: response,
  });
});

const updatePropertyTypes = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0)
    return throwErrorWithStatus(403, "Missing input", res, next);
  const response = await db.PropertyType.update(req.body, {
    where: { id },
  });
  return res.json({
    success: response[0] > 0,
    mes: response[0] ? "Updated" : "No data is update",
  });
});
const removePropertyTypes = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await db.PropertyType.destroy({
    where: { id },
  });
  return res.json({
    success: response > 0,
    mes: response > 0 ? "Deleted" : "No data is delete",
  });
});

module.exports = {
  createNewPropertyTypes,
  getPropertyTypes,
  updatePropertyTypes,
  removePropertyTypes,
};
