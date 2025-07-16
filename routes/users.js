import express from 'express';
import {getAllUsers, getUsersById, createUsers, updateUsers, deleteUsers} from '../controllers/user-controllers.js';

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUsersById);

router.post("/", createUsers);

router.patch("/", updateUsers);

router.delete("/:id", deleteUsers);

export default router;