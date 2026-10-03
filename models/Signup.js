const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },

    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    attended: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

signupSchema.index(
  { event: 1, volunteer: 1 },
  { unique: true }
);

module.exports = mongoose.model("Signup", signupSchema);