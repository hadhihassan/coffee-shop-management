import User from '../../models/user-model.js';
import Cart from '../../models/cart-model.js';
import { STATUS_CODES } from '../../constants/httpStatusCodes.js'
import { hashPassword, comparePassword } from '../../utils/bcryptUtil.js'
import { generateAccessToken } from '../../utils/jwtToken.js'
import catchAsync from '../../utils/catchAsync.js'
import Product from '../../models/product-model.js';
import mongoose from 'mongoose';


export const registerUser = catchAsync(async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!email) {
            throw new Error('Email is required');
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(STATUS_CODES.FORBIDDEN).json({ message: "Email already exist", })
        }

        const securePassword = await hashPassword(password);

        const newUser = new User({
            userName,
            email,
            password: securePassword,
            isVerified: true
        })
        await newUser.save();

        return res.status(STATUS_CODES.OK).json({ message: "Success" })

    } catch (error) {
        console.error(error.message);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during registration' });
    }
})

export const userLogin = catchAsync(async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email })
        if (userExist !== null) {
            if (userExist.isBlocked) {
                return res.status(STATUS_CODES.FORBIDDEN).json({
                    message: "You are blocked by admin",
                    data: null,
                    accessToken: "",
                    refreshToken: ""
                })
            } else {
                const mathPassword = await comparePassword(password, userExist.password);
                if (mathPassword) {
                    const accessToken = await generateAccessToken(userExist._id)

                    return res.status(STATUS_CODES.OK).json({ message: "Success", data: userExist, access: accessToken })
                } else {
                    return res.status(STATUS_CODES.UNAUTHORIZED).json({
                        message: "Incorrect Password",
                        data: null,
                        accessToken: "",
                        refreshToken: ""
                    })
                }
            }
        } else {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({
                message: "Invalid password or email",
                data: null,
                accessToken: "",
                refreshToken: ""
            })
        }
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during login' });
    }
})


export const getProducts = catchAsync(async (req, res) => {
    const userId = req._id
    try {
        const products = await Product.find({ isDelete: false }).sort({ stock: -1 });
        const pipeline = [
            { $match: { user: userId } },
            {
                $project: {
                    _id: 0,
                    productIds: '$cart.product'
                }
            }
        ];
        const cartProductId = await Cart.aggregate(pipeline)
        console.log(cartProductId)
        res.status(STATUS_CODES.OK).json({
            message: "Success",
            data: products,
            cartProducts: cartProductId[0].productIds
        })
    } catch (err) {
        console.log(err)
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while fetching products' });
    }
})