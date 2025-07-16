import express from 'express';
import { createShortUrl } from '../controllers/url.js';
import {getOldUrl} from '../controllers/url.js'

const router = express.Router();

router.post('/shorten', createShortUrl);
router.get('/shorten/:code', getOldUrl);


export default router;
