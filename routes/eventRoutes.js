const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const coordinatorOnly = require("../middleware/roleMiddleware");

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

router.get("/", getEvents);

router.get("/:id", getEventById);

router.post(
  "/",
  protect,
  coordinatorOnly,
  createEvent
);

router.put(
  "/:id",
  protect,
  coordinatorOnly,
  updateEvent
);

router.delete(
  "/:id",
  protect,
  coordinatorOnly,
  deleteEvent
);

module.exports = router;