import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    // 🔥 Replace image with image
    image: { type: String, required: true },

    location: { type: String, required: true },

    eventDate: { type: Date, required: true },
    registrationDeadline: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Event ||
  mongoose.model("Event", EventSchema);
