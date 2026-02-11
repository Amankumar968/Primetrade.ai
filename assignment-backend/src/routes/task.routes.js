const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getStats,
} = require("../controllers/task.controller");
const { protect } = require("../middleware/auth.middleware");

const taskValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Invalid status"),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),
];

router.use(protect);

router.get("/stats", getStats);
router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", taskValidation, createTask);
router.put("/:id", taskValidation, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
