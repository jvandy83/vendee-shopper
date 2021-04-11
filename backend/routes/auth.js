import express from 'express';

const router = express.Router();

import { register, signin, me } from '../controllers/auth.js';

router.post('/register', register);
router.post('/signin', signin);
router.get('/me/:id', me);

export default router;
