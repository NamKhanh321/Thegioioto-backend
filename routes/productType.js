import express from 'express';
import {getAllProductType, getProductTypeById, createProductType, updateProductType, deleteProductType} from '../controllers/productType-controllers.js';
import { checkAuth, checkAdmin } from '../middlewares/checkAuth.js';

const router = express.Router();

router.get("/", checkAuth, checkAdmin, getAllProductType);

router.get("/:id", checkAuth, checkAdmin, getProductTypeById);

router.post("/", checkAuth, checkAdmin, createProductType);

router.patch("/:id", checkAuth, checkAdmin, updateProductType);

router.delete("/:id", checkAuth, checkAdmin, deleteProductType);

export default router;