import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }],
    status: {
        type: String,
        enum: ["Processing", "Canceled", "Failed", "Completed"],
        default: "Processing",
        required: true
    },
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;   
