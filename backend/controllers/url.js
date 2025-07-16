import Url from '../models/url.js';
import { nanoid } from 'nanoid';

// POST /shorten
export const createShortUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortCode = nanoid(6);
  const newUrl = new Url({ url, shortCode });
  await newUrl.save();
  res.status(201).json(newUrl);
};

// GET /shorten/:code
export const getOldUrl = async (req, res) => {
  const { code } = req.params;
  const urlDoc = await Url.findOne({ shortCode: code });
  if (!urlDoc) return res.status(404).json({ error: "Not found" });

  urlDoc.accessCount++;
  await urlDoc.save();
  res.status(200).json(urlDoc);
};


// PUT /shorten/:code
export const updateShortUrl = async (req, res) => {
  const { url } = req.body;
  const { code } = req.params;
  const urlDoc = await Url.findOne({ shortCode: code });
  if (!urlDoc) return res.status(404).json({ error: "Not found" });

  urlDoc.url = url;
  urlDoc.updatedAt = Date.now();
  await urlDoc.save();
  res.status(200).json(urlDoc);
};

