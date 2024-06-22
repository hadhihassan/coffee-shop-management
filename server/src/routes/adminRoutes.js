import express from 'express';
import { createNewProduct, deleteProduct, editProduct, getProducts } from '../controllers/admin/productController.js';
import { upload } from '../config/multer.js'
import { loginAdmin } from '../controllers/admin/adminController.js';
import { checkToken } from '../middleware/authChecker.js';
const adminRoutes = express.Router();

adminRoutes.post('/login', loginAdmin);


adminRoutes.get('/product/get-products/', getProducts);
adminRoutes.post('/product/create/', upload.single("image"), createNewProduct);
adminRoutes.put('/product/edit/', checkToken, editProduct);
adminRoutes.delete('/product/delete/', checkToken, deleteProduct);


export default adminRoutes;