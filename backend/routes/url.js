import express from 'express';
import {
  createShortUrl,
  getAllUrls,
  deleteShortUrl,
  updateShortUrl,
  getUrlStats
} from '../controllers/url.js';

const router = express.Router();

router.post('/', createShortUrl);
router.get('/all', getAllUrls);
router.delete('/:code', deleteShortUrl);
router.put('/:code', updateShortUrl);
router.get('/:code/stats', getUrlStats);

export default router;
