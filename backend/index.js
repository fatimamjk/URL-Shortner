import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import urlRoutes from "./routes/url.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected successfully"))
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1); // Exit the server if DB connection fails
  });

// Route to handle URL shortening
app.use("/api/url", urlRoutes);

// Redirection route
app.get("/:code", async (req, res) => {
  try {
    const { default: Url } = await import("./models/url.js");
    const { code } = req.params;

    if (!code || typeof code !== "string" || code.length < 4) {
      return res.status(400).json({ error: "Invalid URL code format" });
    }

    const urlDoc = await Url.findOne({ shortCode: code });

    if (!urlDoc) {
      return res.status(404).json({ error: "URL not found" });
    }

    urlDoc.accessCount++;
    await urlDoc.save();

    return res.redirect(urlDoc.url);
  } catch (err) {
    console.error("Error in redirection route:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
