import "dotenv/config";
import app from "./app";
import { connectToDatabase } from "./db";

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error(
      "Server startup aborted due to database connection failure.",
      error,
    );
    process.exit(1);
  });
