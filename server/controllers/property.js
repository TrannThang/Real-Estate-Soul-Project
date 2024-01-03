const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");

const createNewProperty = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const response = await db.User.create;
  return res.json({
    success: Boolean(response),
    mes: response ? "Got" : "Cannot get user",
    currentUser: response,
  });
});

module.exports = {
  getCurrent,
};
