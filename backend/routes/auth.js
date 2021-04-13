import express from 'express';

const router = express.Router();

import {
	register,
	signin,
	me,
	fetchRefreshToken,
} from '../controllers/auth.js';

import { isAuth } from '../middleware/isAuth.js';

router.post('/register', register);
router.post('/signin', signin);
router.post('/me', isAuth, me);
router.post('/refresh_token', isAuth, fetchRefreshToken);

export default router;
