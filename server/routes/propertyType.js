const router = require("express").Router();
const Joi = require("joi");
const ctrls = require("../controllers/propertyTypes");
const validateDto = require("../middlewares/validation");
const { stringReq, string } = require("../middlewares/joiSchema");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const rateLimiter = require("../middlewares/rateLimiter");

router.use(rateLimiter);

router.post(
  "/",
  verifyToken,
  // isAdmin,
  validateDto(
    Joi.object({ name: stringReq, description: stringReq, image: stringReq })
  ),
  ctrls.createNewPropertyTypes
);

router.get("/", ctrls.getPropertyTypes);
router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  validateDto(Joi.object({ name: string, description: string, image: string })),
  ctrls.updatePropertyTypes
);
router.delete("/:id", verifyToken, isAdmin, ctrls.removePropertyTypes);

module.exports = router;
