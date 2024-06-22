import jwt from "jsonwebtoken";
import Admin from '../models/admin-model.js'
const { JWT_SECRET_KEY } = process.env;
import { STATUS_CODES } from '../constants/httpStatusCodes.js'

export const checkToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Token not provided" });
        }

        const decodedToken = jwt.verify(token.slice(7), JWT_SECRET_KEY);
        if (!decodedToken) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Invalid token" });
        }

        const objectId = new mongoose.Types.ObjectId(decodedToken.id);
        const userData = await Admin.findById(objectId);
        
        if (!userData) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Not authorized, invalid token'" });
        }
        
        req._id = objectId
        next();
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
};