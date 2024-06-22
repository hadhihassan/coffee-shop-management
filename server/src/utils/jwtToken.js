import jwt from 'jsonwebtoken';
import { accessTokenExp, refreshTokenExp } from '../constants/constants.js';


export const generateAccessToken = (id) => {
    const KEY = process.env.JWT_SECRET_KEY;
    if (!KEY) {
        throw new Error("JWT Key is not defined")
    }
    const exp = Math.floor(Date.now() / 1000) + accessTokenExp;
    
    return jwt.sign({ id, exp, iat: Date.now() / 1000 }, KEY)
}

export const generateRefreshToken = (id) => {
    const KEY = process.env.JWT_SECRET_KEY;
    if (!KEY) {
        throw new Error("JWT Key is not defined")
    }
    const exp = Math.floor(Data.now() / 1000) + refreshTokenExp;
    return jwt.sign({ id, exp, iat: Date.now() / 1000 }, KEY)
} 