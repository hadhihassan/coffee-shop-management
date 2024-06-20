import mongoose from "mongoose"
const connectDb = async () => {
    try {
        const uri = "mongodb://127.0.0.1:27017/ManagmentSystem"
        await mongoose.connect(uri);
        console.log('DATABASE CONNECTED');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

export default connectDb;