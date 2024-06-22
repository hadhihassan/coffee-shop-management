import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 1
    },
    availability: {
        type: ["InStock", "OutOfStock"],
        default: "InStock"
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    image : {
        type :String,
        required : true
    }
}, {
    timestamps: true
});


const Product = mongoose.model('Product', productSchema);

export default Product;
