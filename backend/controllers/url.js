
import { nanoid } from 'nanoid';
import Url from '../models/url.js';

export const createShortUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });
  const shortCode = nanoid(6);
  const newUrl = new Url({ url, shortCode });
  await newUrl.save();
  res.status(201).json(newUrl);
};

export const getAllUrls = async (req, res) => {
  const urls = await Url.find();
  res.status(200).json(urls);
};

export const deleteShortUrl = async (req, res) => {
  const { code } = req.params;
  const result = await Url.deleteOne({ shortCode: code });
  if (!result.deletedCount) return res.status(404).json({ error: "Not found" });
  res.sendStatus(204);
};

export const updateShortUrl = async (req, res) => {
  const { url } = req.body;
  const { code } = req.params;
  const urlDoc = await Url.findOne({ shortCode: code });
  if (!urlDoc) return res.status(404).json({ error: "Not found" });
  urlDoc.url = url;
  urlDoc.updatedAt = new Date();
  await urlDoc.save();
  res.status(200).json(urlDoc);
};

export const getUrlStats = async (req, res) => {
  const { code } = req.params;
  const urlDoc = await Url.findOne({ shortCode: code });
  if (!urlDoc) return res.status(404).json({ error: "Not found" });
  res.status(200).json({ accessCount: urlDoc.accessCount });
};