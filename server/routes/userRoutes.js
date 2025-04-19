import express from 'express';
import { registerUser, loginUser, updateUserCodingProfiles } from '../controllers/userControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.put('/profile', authMiddleware ,updateUserCodingProfiles);

export default router;