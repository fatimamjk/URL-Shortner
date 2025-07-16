import express from 'express';
import { createShortUrl } from '../controllers/url.js';

const router = express.Router();

router.post('/shorten', createShortUrl);

export default router;
