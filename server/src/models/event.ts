import mongoose, { Document, Model } from "mongoose";
import {
  EVENT_AREAS,
  EVENT_TYPE_VALUES,
  EventArea,
  EventType,
} from "../config/eventConfig";

// This interface represents a single Event document in MongoDB.
// A stable `eventType` is used for business logic, while `title` is shown in the UI.
export interface EventDocument extends Document {
  eventType: EventType;
  title: string;
  area: EventArea;
  completedAt: Date;
}

const eventSchema = new mongoose.Schema<EventDocument>(
  {
    eventType: {
      type: String,
      required: true,
      enum: EVENT_TYPE_VALUES,
    },
    title: { type: String, required: true },
    area: {
      type: String,
      required: true,
      enum: EVENT_AREAS,
    },
    completedAt: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export const Event: Model<EventDocument> = mongoose.model<EventDocument>(
  "Event",
  eventSchema,
);
