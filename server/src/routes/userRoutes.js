import express from 'express';
import { userLogin, registerUser, getProducts } from '../controllers/user/userController.js';
import { addProductToCart, deleteProductFromCart, reduceCartProductQuantity, getCartProduct } from '../controllers/user/cartController.js';
import { createOrder, getMyOrder } from '../controllers/user/orderController.js'
import { checkUserToken } from '../middleware/authChecker.js';
const userRoutes = express.Router();

userRoutes.post('/login/', userLogin);
userRoutes.post('/register/', registerUser);

userRoutes.get('/products/', checkUserToken, getProducts);

userRoutes.get('/cart/', checkUserToken, getCartProduct);
userRoutes.post('/products/add-to-cart/', checkUserToken, addProductToCart);
userRoutes.post('/products/minus-to-cart/', checkUserToken, reduceCartProductQuantity);
userRoutes.delete('/products/delete-item/', checkUserToken, deleteProductFromCart);

userRoutes.post('/order/create/', checkUserToken, createOrder);
userRoutes.get('/order/', checkUserToken, getMyOrder);

export default userRoutes;