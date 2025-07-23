import express from 'express';
import {getAllUsers, getUsersById, createUsers, updateUsers, deleteUsers} from '../controllers/user-controllers.js';

import { checkAuth, checkAdmin } from '../middlewares/checkAuth.js';

const router = express.Router();

router.get("/", checkAuth, checkAdmin, getAllUsers);

router.get("/:id", checkAuth, checkAdmin, getUsersById);

router.post("/", checkAuth, checkAdmin, createUsers);

router.patch("/:id", checkAuth, checkAdmin, updateUsers);

router.delete("/:id", checkAuth, checkAdmin, deleteUsers);

export default router;