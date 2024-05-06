const asyncHandler = require("express-async-handler");
const db = require("../models/index");
const { throwErrorWithStatus } = require("../middlewares/errorHandler");

const getCurrent = asyncHandler(async (req, res) => {
  const { uid } = req.user;
  const response = await db.User.findByPk(uid, {
    nest: false,
    attributes: {
      exclude: ["password"],
    },
    include: [
      {
        model: db.User_Role,
        as: "userRoles",
        include: [
          {
            model: db.Role,
            attributes: ["roleCode"],
            as: "roleName",
            attributes: ["value"],
          },
        ],
      },
    ],
  });
  return res.json({
    success: Boolean(response),
    mes: response ? "Got" : "Cannot get user",
    currentUser: response,
  });
});

const getRoles = asyncHandler(async (req, res) => {
  const response = await db.Role.findAll({
    attributes: ["code", "value"],
  });
  return res.json({
    success: Boolean(response),
    mes: response ? "Got" : "Cannot get roles",
    roles: response,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, address, avatar, phone } = req.body;
  const updateData = new Object();
  const { uid } = req.user;

  if (phone) {
    const userRoles = await db.User_Role.findAll({
      where: { userId: uid },
      raw: true,
    });
    if (userRoles.length === 1 && userRoles[0].roleCode === "ROL7")
      updateData.phone = phone;
  }
  if (avatar && avatar.length > 0) updateData.avatar = avatar[0];
  if (name) updateData.name = name;
  if (address) updateData.address = address;
  if (email) updateData.email = email;

  const response = await db.User.update(updateData, { where: { id: uid } });
  return res.json({
    success: response[0] > 0,
    mes: response[0] > 0 ? "Updated" : "Cannot update profile",
  });
});

module.exports = {
  getCurrent,
  getRoles,
  updateProfile,
};
