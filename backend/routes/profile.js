import express from 'express';

import { isAuth } from '../middleware/isAuth.js';

const router = express.Router();

import { addProfile, getProfile } from '../controllers/profile.js';

router.put('/add-profile', isAuth, addProfile);
router.get('/get-profile', isAuth, getProfile);

export default router;
