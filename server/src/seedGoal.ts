import "dotenv/config";
import { connectToDatabase } from "./db";
import { Goal } from "./models/goal";

// This function connects to MongoDB and then creates one Goal document.
async function createGoalDocument() {
  // Connect to the MongoDB database using the existing helper.
  await connectToDatabase();

  // Create one new Goal instance in memory.
  const goal = new Goal({
    title: "Senior Frontend Developer",
    area: "Career",
    status: "In Progress",
  });

  // Save the Goal document to MongoDB.
  const savedGoal = await goal.save();

  console.log("✅ Goal document saved to MongoDB:", savedGoal);
  console.log(
    "🔍 In Atlas, look for the 'goals' collection under the life-os database.",
  );

  // Exit the script after the document is saved.
  process.exit(0);
}

createGoalDocument().catch((error) => {
  console.error("❌ Failed to create Goal document:", error);
  process.exit(1);
});
