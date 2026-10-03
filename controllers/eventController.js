const Event = require("../models/Event");

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      startTime,
      endTime
    } = req.body;

    if (
      !title ||
      !description ||
      !location ||
      !startTime ||
      !endTime
    ) {
      return res.status(400).json({
        message: "All event fields are required"
      });
    }

    if (new Date(startTime) >= new Date(endTime)) {
      return res.status(400).json({
        message: "End time must be after start time"
      });
    }

    const event = await Event.create({
      title,
      description,
      location,
      startTime,
      endTime,
      coordinator: req.user.id
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("coordinator", "name email")
      .sort({ startTime: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("coordinator", "name email");

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    if (event.coordinator.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only modify your own events"
      });
    }

    const {
      title,
      description,
      location,
      startTime,
      endTime
    } = req.body;

    const newStart = startTime || event.startTime;
    const newEnd = endTime || event.endTime;

    if (new Date(newStart) >= new Date(newEnd)) {
      return res.status(400).json({
        message: "End time must be after start time"
      });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.location = location || event.location;
    event.startTime = newStart;
    event.endTime = newEnd;

    await event.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    if (event.coordinator.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only delete your own events"
      });
    }

    await event.deleteOne();

    res.json({
      message: "Event deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
};