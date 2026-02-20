import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },

    role: { type: String, required: true },
    year: { type: String, required: true },

    status: {
      type: String,
      enum: ["current", "ex"],
      default: "current",
    },

    priority: {
      type: Number,
      default: 0,
    },

    isMentor: {
      type: Boolean,
      default: false,
    },

    bio: { type: String },

    socials: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      whatsapp: { type: String, default: "" },
      x: { type: String, default: "" },
      website: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Member ||
  mongoose.model("Member", MemberSchema);
