import dotenv from "dotenv";
dotenv.config();
import app from "./app.ts";
import { connectDb } from "./config/db.ts";
import { seedDatabase } from "./scripts/seed.ts";

let port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`server is running on port ${port}`);
  
  // Connect to DB and seed in the background
  try {
    await connectDb();
    // Verify connection status before seeding to prevent buffering timeout crashes
    const mongoose = (await import("mongoose")).default;
    if (mongoose.connection.readyState === 1) {
      await seedDatabase();
    } else {
      console.warn("MongoDB connection not established. Skipping database seeding.");
    }
  } catch (err) {
    console.error("Database connection or seeding failed on startup:", err);
  }
});
