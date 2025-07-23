import express from 'express';
import {getAllProduct, getProductById, createProduct, updateProduct, deleteProduct} from '../controllers/product-controllers.js';
import { checkAuth, checkAdmin } from '../middlewares/checkAuth.js'; 

const router = express.Router();

router.get("/", getAllProduct);

router.get("/:id", getProductById);

router.post("/", checkAuth, checkAdmin, createProduct);

router.patch("/:id", checkAuth, checkAdmin, updateProduct);

router.delete("/:id", checkAuth, checkAdmin, deleteProduct);

export default router;