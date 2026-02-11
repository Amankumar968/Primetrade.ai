const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { getProfile, updateProfile } = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");

const updateValidation = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("phone").optional().trim(),
  body("bio")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Bio cannot exceed 500 characters"),
];

router.use(protect);

router.get("/profile", getProfile);
router.put("/profile", updateValidation, updateProfile);

module.exports = router;
