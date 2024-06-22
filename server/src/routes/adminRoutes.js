import express from 'express';
import { createNewProduct, deleteProduct, editProduct, getProducts } from '../controllers/admin/productController.js';
import { upload } from '../config/multer.js'
import { loginAdmin } from '../controllers/admin/adminController.js';
import { checkAdminToken } from '../middleware/authChecker.js';
const adminRoutes = express.Router();

adminRoutes.post('/login', loginAdmin);


adminRoutes.get('/product/get-products/', checkAdminToken, getProducts);
adminRoutes.post('/product/create/', upload.single("image"), checkAdminToken, createNewProduct);
adminRoutes.put('/product/edit/', checkAdminToken, editProduct);
adminRoutes.delete('/product/delete/', checkAdminToken, deleteProduct);


export default adminRoutes;