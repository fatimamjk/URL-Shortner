import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import urlRoutes from './routes/url.js';

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection failed:", err));

app.use('/api/url', urlRoutes);

// Redirection endpoint
app.get('/:code', async (req, res) => {
  const { default: Url } = await import('./models/url.js');
  const { code } = req.params;
  const urlDoc = await Url.findOne({ shortCode: code });
  if (!urlDoc) return res.status(404).send("URL not found");
  urlDoc.accessCount++;
  await urlDoc.save();
  res.redirect(urlDoc.url);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));