import express from 'express';
import {getAllProduct, getProductById, createProduct, updateProduct, deleteProduct} from '../controllers/product-controllers.js';

const router = express.Router();

router.get("/", getAllProduct);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;