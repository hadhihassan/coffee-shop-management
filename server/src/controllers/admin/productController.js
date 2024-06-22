import { STATUS_CODES } from '../../constants/httpStatusCodes.js'
import catchAsync from '../../utils/catchAsync.js'
import Product from '../../models/product-model.js';


export const createNewProduct = catchAsync(async (req, res) => {
    try {
        const { name, description, price, category, availability, image, stock } = req.body;
        const productExist = await Product.findOne({ productName: name });
        if (productExist) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Product already exisit." })
        }
        const newProduct = new Product({
            productName: name,
            description,
            price,
            category,
            availability,
            image : req.file?.filename,
            stock
        })
        await newProduct.save();
        return res.status(STATUS_CODES.OK).json({ message: "Success" })
    } catch (error) {
        console.error(error.message);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during registration' });
    }
});

export const getProducts = catchAsync(async (req, res) => {
    try {
        const products = await Product.find({ isDelete: false })
        if (products.length) {
            return res.status(STATUS_CODES.OK).json({ message: "Success", data: products })
        } else {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Products is note Add yet", data: null })
        }
    } catch (error) {
        console.error(error.message);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during registration' });
    }
})

export const editProduct = catchAsync(async (req, res) => {
    try {
        const { id, data } = req.body;
        if (id) {
            const updatedProduct = await Product.findByIdAndUpdate(id, { data });
            if (updatedProduct !== null) {
                return res.status(STATUS_CODES.OK).json({ message: "Success" })
            } else {
                return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Product is't exist" })
            }
        } else {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Id is required" })
        }
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during registration' });
    }
})

export const deleteProduct = catchAsync(async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            const deleteProduct = await Product.findByIdAndUpdate(id, { isDelete: true });
            if (deleteProduct !== null) {
                return res.status(STATUS_CODES.OK).json({ message: "Success" })
            } else {
                return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Product is't exist" })
            }
        } else {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Id is required" })
        }
    } catch (error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred during registration' });
    }
})