import express from 'express';
import { userLogin, registerUser } from '../controllers/user/userController.js';
const userRoutes = express.Router();

userRoutes.post('/login/', userLogin);
userRoutes.post('/register/', registerUser);

export default userRoutes;