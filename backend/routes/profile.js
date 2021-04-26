import express from 'express';

const router = express.Router();

import { addProfile } from '../controllers/profile.js';

router.post('/add-profile', addProfile);

export default router;
