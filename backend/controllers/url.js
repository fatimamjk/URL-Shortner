import Url from '../models/url.js';
import { nanoid } from 'nanoid';

export const createShortUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortCode = nanoid(6);
  const newUrl = new Url({ url, shortCode });
  await newUrl.save();
  res.status(201).json(newUrl);
};
