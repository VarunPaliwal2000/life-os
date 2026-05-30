import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error(
    "MONGODB_URI is not defined. Please set it in your .env file.",
  );
}

/**
 * Connect to MongoDB using Mongoose.
 *
 * Mongoose is a library that makes it easier to work with MongoDB in Node.js.
 * It provides schema definitions and a consistent API for connecting to the database.
 */
export async function connectToDatabase() {
  const connectionString = mongoUri || "";

  if (!connectionString) {
    throw new Error(
      "MONGODB_URI is not defined. Please set it in your .env file.",
    );
  }

  try {
    await mongoose.connect(connectionString, {
      dbName: "life-os",
      autoIndex: true,
    });

    console.log("✅ MongoDB connected successfully.");
    console.log("MongoDB URI loaded from environment.");

    mongoose.connection.on("error", (error: unknown) => {
      console.error("MongoDB connection error:", error);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected.");
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    throw error;
  }
}
