import mongoose from "mongoose";

const startupIdeaSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    department: String,
    year: String,
    ideaTitle: String,
    ideaDescription: String,
  },
  { timestamps: true }
);

export default mongoose.models.StartupIdea ||
  mongoose.model("StartupIdea", startupIdeaSchema);
