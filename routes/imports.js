import express from 'express';
import {getAllImport, getImportById, createImport, updateImport, deleteImport} from '../controllers/import-controllers.js';
import { checkAuth, checkAdmin } from '../middlewares/checkAuth.js'; 

const router = express.Router();

router.get("/", checkAuth, checkAdmin, getAllImport);

router.get("/:id", checkAuth, checkAdmin, getImportById);

router.post("/", checkAuth, checkAdmin, createImport);

router.patch("/:id", checkAuth, checkAdmin, updateImport);

router.delete("/:id", checkAuth, checkAdmin, deleteImport);

export default router;