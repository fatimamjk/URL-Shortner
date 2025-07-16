import express, { Router } from 'express';
import { createShortUrl } from '../controllers/url.js';
import { getUrlStats } from '../controllers/url.js';
import {getOldUrl} from '../controllers/url.js'
import { updateShortUrl } from '../controllers/url.js';
import { deleteShortUrl } from '../controllers/url.js';

const router = express.Router();

router.post('/shorten', createShortUrl);
router.get('/shorten/:code/stats', getUrlStats);
router.get('/shorten/:code', getOldUrl);
router.put('/shorten/:code', updateShortUrl);
router.delete('/shorten/:code', deleteShortUrl);




export default router;
