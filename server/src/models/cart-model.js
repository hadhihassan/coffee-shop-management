
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
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
        total: {
            type: Number,
            default: 0
        }
    }],
    totalCartAmount: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;






