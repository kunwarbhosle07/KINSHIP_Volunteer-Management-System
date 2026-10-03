const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const coordinatorOnly = require("../middleware/roleMiddleware");

const {
  signupForEvent,
  markAttendance,
  getMySignups
} = require("../controllers/signupController");

router.post(
  "/events/:id/signup",
  protect,
  signupForEvent
);

router.get(
  "/my",
  protect,
  getMySignups
);

router.patch(
  "/:id/attended",
  protect,
  coordinatorOnly,
  markAttendance
);

module.exports = router;