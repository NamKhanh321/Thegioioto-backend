import express from 'express';
import {getAllStorage, getStorageById, createStorage, updateStorage, deleteStorage} from '../controllers/storage-controllers.js';
import { checkAuth, checkAdmin } from '../middlewares/checkAuth.js'; 

const router = express.Router();

router.get("/", checkAuth, checkAdmin, getAllStorage);

router.get("/:id", checkAuth, checkAdmin, getStorageById);

router.post("/", checkAuth, checkAdmin, createStorage);

router.patch("/:id", checkAuth, checkAdmin, updateStorage);

router.delete("/:id", checkAuth, checkAdmin, deleteStorage);

export default router;