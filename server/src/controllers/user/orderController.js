import mongoose from 'mongoose';
import Cart from "../../models/cart-model";
import Order from "../../models/order-model.js";
import catchAsync from '../../utils/catchAsync.js'
import Product from 'path/to/product-model';
import { STATUS_CODES } from '../../constants/httpStatusCodes.js'

export const createOrder = catchAsync(async (req, res) => {
    try {
        const { _id } = req;
        const userCart = await Cart.findOne({ user: _id }).populate('cart.product');


        let insufficientStockProducts = [];
        for (const cartItem of userCart.cart) {
            const product = cartItem.product;
            if (product.stock < cartItem.quantity) {
                insufficientStockProducts.push(product.productName);
            }
        }

        if (insufficientStockProducts.length > 0) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message: 'Some products do not have sufficient stock.',
                products: insufficientStockProducts
            });
        }
        if (userCart) {
            const order = new Order({
                user: _id,
                cart: userCart.cart,
                totalCartAmount: userCart.totalCartAmount,
            })
            await order.save();
            
            for (const cartItem of userCart.cart) {
                const product = cartItem.product;
                product.stock -= cartItem.quantity;
                await product.save();
            }
            await Cart.updateOne({ user: _id }, { $set: { cart: [], totalCartAmount: 0 } });
            res.status(STATUS_CODES.OK).json({
                message: 'Order created successfully.',
                order
            });

        } else {
            res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'Add product in your cart.' });
        }

    } catch (error) {
        console.error(error.message);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while create order' });
    }
})

export const deleteOrder = catchAsync(async (req, res) => {
    try {
        const { _id } = req;
        const userOrer = await Order.findOne({ user: _id });
        if (userOrer) {
            userOrer.isDelete = true
            await userOrer.save()
        } else {
            res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Order note found.' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while create order' });
    }
})