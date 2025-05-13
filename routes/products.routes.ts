import express from 'express';

import {createProduct, deleteProduct, getProducts, updateProduct} from '../controllers/products.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
const router = express.Router();
// @ts-ignore
router.get('/', authenticateToken, getProducts);
// @ts-ignore
router.patch('/:code', authenticateToken, updateProduct);
// @ts-ignore
router.post('/', authenticateToken, createProduct)
// @ts-ignore
router.delete('/:code', authenticateToken, deleteProduct)


export default router;
