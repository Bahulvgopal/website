import mongoose, { Schema, models, model } from "mongoose";

/* ===========================
   Team Member Schema
=========================== */
const TeamMemberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

/* ===========================
   Registration Schema
=========================== */
const RegistrationSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    // ===========================
    // Event Type
    // ===========================

    isTeam: {
      type: Boolean,
      default: false,
    },

    teamName: {
      type: String,
      default: "",
    },

    // ===========================
    // Team Leader / Solo Participant
    // (Existing fields retained)
    // ===========================

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    // ===========================
    // Additional Team Members
    // Leader is stored above.
    // This array stores Member 2 onwards.
    // ===========================

    members: {
      type: [TeamMemberSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Registration =
  models.Registration || model("Registration", RegistrationSchema);

export default Registration;