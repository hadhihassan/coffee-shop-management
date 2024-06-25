import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            default: 0
        }
    }],
    totalCartAmount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["Processing", "Canceled", "Failed", "Completed"],
        default: "Processing",
    },
    isDelete :  {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;   
