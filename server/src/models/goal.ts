import mongoose, { Document, Model } from "mongoose";

// This interface defines what a Goal document looks like in TypeScript.
// It is a plain object with three string fields: title, area, and status.
export interface GoalDocument extends Document {
  title: string;
  area: string;
  status: string;
}

// The schema tells Mongoose what the data structure should be for a Goal.
// Each field is defined with a type and whether it is required.
const goalSchema = new mongoose.Schema<GoalDocument>(
  {
    title: { type: String, required: true },
    area: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    // We keep this simple for learning, so we do not add extra schema options.
  },
);

// The model is the compiled version of the schema.
// It allows us to create, read, update, and delete Goal documents.
export const Goal: Model<GoalDocument> = mongoose.model<GoalDocument>(
  "Goal",
  goalSchema,
);
