import jwt from "jsonwebtoken";
import Admin from '../models/admin-model.js'
import { STATUS_CODES } from '../constants/httpStatusCodes.js'
import User from "../models/user-model.js";
import mongoose from "mongoose";


const verifyToken = async (token, Model) => {
    if (!token) {
        throw { status: STATUS_CODES.UNAUTHORIZED, message: "Token not provided" };
    }
    
    const decodedToken = jwt.verify(token.slice(7), process.env.JWT_SECRET_KEY);
    if (!decodedToken) {
        throw { status: STATUS_CODES.UNAUTHORIZED, message: "Invalid token" };
    }

    const objectId = new mongoose.Types.ObjectId(decodedToken.id);
    const userData = await Model.findById(objectId);
    
    if (!userData) {
        throw { status: STATUS_CODES.UNAUTHORIZED, message: "Not authorized, invalid token" };
    }

    return objectId;
};
export const checkAdminToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        req._id = await verifyToken(token, Admin);
        next();
    } catch (error) {
        res.status(error.status || STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message || "Internal Server Error" });
    }
};

export const checkUserToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        req._id = await verifyToken(token, User);
        next();
    } catch (error) {
        console.log(error.message)
        res.status(error.status || STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message || "Internal Server Error" });
    }
};