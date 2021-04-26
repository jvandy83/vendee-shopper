import express from 'express';

const router = express.Router();

import {
	register,
	login,
	me,
	fetchRefreshToken,
	revokeRefreshToken,
	logout,
} from '../controllers/auth.js';

import { isAuth } from '../middleware/isAuth.js';

router.post('/register', register);
router.post('/login', login);
router.post('/me', isAuth, me);
router.post('/refresh-token', fetchRefreshToken);
router.post('/logout', logout);
router.post('/revoke-refresh-token', revokeRefreshToken);

export default router;
