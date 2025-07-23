import express from 'express';
import {getAllProvider, getProviderById, createProvider, updateProvider, deleteProvider} from '../controllers/provider-controllers.js';
import { checkAuth, checkAdmin } from '../middlewares/checkAuth.js'; 

const router = express.Router();

router.get("/", checkAuth, checkAdmin, getAllProvider);

router.get("/:id", checkAuth, checkAdmin, getProviderById);

router.post("/", checkAuth, checkAdmin, createProvider);

router.patch("/:id", checkAuth, checkAdmin, updateProvider);

router.delete("/:id", checkAuth, checkAdmin, deleteProvider);

export default router;