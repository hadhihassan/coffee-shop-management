import { STATUS_CODES } from '../../constants/httpStatusCodes.js';
import Order from '../../models/order-model.js'
import Product from '../../models/product-model.js'
import User from '../../models/user-model.js'




export const getMyOrders = catchAsync(async (req, res) => {
    try {
        const { id } = req;
        if (!id) {
            return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Id note provided' });
        } else {
            const orders = await Order.find({ user: id }).populate("items")
            return res.status(STATUS_CODES.OK).json({ message: "Success", data: orders })
        }
    } catch (error) {
        console.error(error.message);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during registration' });
    }
})

export const getOrders = catchAsync(async (req, res) => {
    try {
        const orders = await Order.find().populate(["items", "user"])
        return res.status(STATUS.STATUS_CODES.OK).json({ message: "Success", data: orders })
    } catch (error) {
        console.error(error.message);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during registration' });
    }
})

export const createOrder = catchAsync(async (req, res) => {
    try {

    } catch (error) {
        console.error(error.message);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during registration' });
    }
})

export const updateOrdeStatus = catchAsync(async (req, res) => {
    try {

    } catch (error) {
        console.error(error.message);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during registration' });
    }
})

export const deleteOrde = catchAsync(async (req, res) => {
    try {

    } catch (error) {
        console.error(error.message);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during registration' });
    }
})
