import express from 'express';
import {loginUser, registerUser, getUserInfo, logoutUser} from '../controllers/auth-controllers.js';
import {checkAuth} from '../middlewares/checkAuth.js';

const router = express.Router();

router.post('/login',loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.get('/me',checkAuth, getUserInfo);

export default router;