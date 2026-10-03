const Signup = require("../models/Signup");
const Event = require("../models/Event");

const signupForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const volunteerId = req.user.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    if (new Date(event.startTime) <= new Date()) {
      return res.status(400).json({
        message: "Cannot sign up for an event that has already started"
      });
    }

    const existingSignup = await Signup.findOne({
      event: eventId,
      volunteer: volunteerId
    });

    if (existingSignup) {
      return res.status(400).json({
        message: "You are already signed up for this event"
      });
    }

    const currentSignups = await Signup.find({
      volunteer: volunteerId
    }).populate("event");

    for (const signup of currentSignups) {
      const existingEvent = signup.event;

      if (!existingEvent) {
        continue;
      }

      const overlaps =
        new Date(existingEvent.startTime) < new Date(event.endTime) &&
        new Date(existingEvent.endTime) > new Date(event.startTime);

      if (overlaps) {
        return res.status(409).json({
          message: "You already have a signup that overlaps with this event",
          conflictingEvent: {
            id: existingEvent._id,
            title: existingEvent.title,
            startTime: existingEvent.startTime,
            endTime: existingEvent.endTime
          }
        });
      }
    }

    const signup = await Signup.create({
      event: eventId,
      volunteer: volunteerId
    });

    const populatedSignup = await Signup.findById(signup._id)
      .populate("event")
      .populate("volunteer", "name email");

    res.status(201).json({
      message: "Successfully signed up for event",
      signup: populatedSignup
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const markAttendance = async (req, res) => {
  try {
    const signup = await Signup.findById(req.params.id)
      .populate("event");

    if (!signup) {
      return res.status(404).json({
        message: "Signup not found"
      });
    }

    if (
      signup.event.coordinator.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message: "You can only manage attendance for your own events"
      });
    }

    signup.attended = req.body.attended;

    await signup.save();

    res.json({
      message: "Attendance updated",
      signup
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getMySignups = async (req, res) => {
  try {
    const signups = await Signup.find({
      volunteer: req.user.id
    })
      .populate("event")
      .populate("volunteer", "name email")
      .sort({ createdAt: -1 });

    res.json(signups);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  signupForEvent,
  markAttendance,
  getMySignups
};