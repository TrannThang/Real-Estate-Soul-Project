const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");

const getCurrent = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const response = await db.User.findByPk(uid, {
    attributes: {
      exclude: ["password"],
    },
  });
  return res.json({
    success: Boolean(response),
    mes: response ? "Got" : "Cannot get user",
    currentUser: response,
  });
});

module.exports = {
  getCurrent,
};
