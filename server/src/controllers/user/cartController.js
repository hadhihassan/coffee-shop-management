import Cart from "../../models/cart-model";
import Product from "../../models/product-model.js";
import catchAsync from '../../utils/catchAsync.js'
import { STATUS_CODES } from '../../constants/httpStatusCodes.js'


export const addProductToCart = catchAsync(async (req, res) => {
    try {
        const { productId } = req.body;
        const { _id } = req;

        let userCart = await Cart.findOne({ user: _id });
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Product not found' });
        }

        if (!userCart) {
            userCart = new Cart({
                user: _id,
                products: [{ product: productId, quantity: 1, total: product.price }],
                totalCartAmount: product.price
            });
        } else {
            const productIndex = userCart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex >= 0) {
                userCart.products[productIndex].quantity += 1;
                userCart.products[productIndex].total += product.price;
            } else {
                userCart.products.push({ product: productId, quantity: 1, total: product.price });
            }
            userCart.totalCartAmount += product.price;
        }

        await userCart.save();
        res.status(STATUS_CODES.OK).json({
            message: 'Product added to cart successfully',
            cart: userCart
        });
    } catch (error) {
        console.error(error.message);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while adding product to cart' });
    }
})


export const deleteProductFromCart = catchAsync(async (req, res) => {
    try {
        const { productId } = req.body;
        const { _id } = req;
        let userCart = await Cart.findOne({ user: _id });
        const product = await Product.findById(productId);

        const productIndex = userCart.cart.findIndex((item) => item.product.toString() === productId);
        if (productIndex === -1) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Product not found in cart' });
        }
        const productTotal = userCart.products[productIndex].total;
        userCart.products.splice(productIndex, 1);
        userCart.totalCartAmount -= productTotal;
        await userCart.save();
        res.status(STATUS_CODES.OK).json({
            message: 'Product removed from cart successfully',
            cart: userCart
        });
    } catch (error) {
        console.error(error.message);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while adding product to cart' });
    }
})

export const reduceCartProductQuantity = catchAsync(async (req, res) => {
    try {
        const { productId } = req.body;
        const { _id } = req;

        let userCart = await Cart.findOne({ user: _id });
        const product = await Product.findById(productId);

        const productIndex = userCart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex >= 0) {
            if (userCart.products[productIndex].quantity === 1) {
                userCart.products.splice(productIndex, 1);
            } else {
                userCart.products[productIndex].quantity -= 1;
                userCart.products[productIndex].total -= product.price;
            }
            userCart.totalCartAmount -= product.price;
        }

        await userCart.save();
        res.status(STATUS_CODES.OK).json({
            message: 'Product added to cart successfully',
            cart: userCart
        });
    } catch (error) {
        console.error(error.message);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while adding product to cart' });
    }
})