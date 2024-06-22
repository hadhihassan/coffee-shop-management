import express from 'express';
import { userLogin, registerUser, getProducts } from '../controllers/user/userController.js';
import { checkUserToken } from '../middleware/authChecker.js';
const userRoutes = express.Router();

userRoutes.post('/login/',  userLogin);
userRoutes.post('/register/',  registerUser);
userRoutes.get('/products/', checkUserToken, getProducts);

export default userRoutes;