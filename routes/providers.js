import express from 'express';
import {getAllProvider, getProviderById, createProvider, updateProvider, deleteProvider} from '../controllers/provider-controllers.js';

const router = express.Router();

router.get("/", getAllProvider);

router.get("/:id", getProviderById);

router.post("/", createProvider);

router.patch("/:id", updateProvider);

router.delete("/:id", deleteProvider);

export default router;