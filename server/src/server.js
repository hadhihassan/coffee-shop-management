import express from 'express';
import dotenv from 'dotenv'
import corsConfig from './config/cors.js';
import connectDb from './config/db.js';
import adminRoutes from '../src/routes/adminRoutes.js'
import userRoutes from '../src/routes/userRoutes.js'
dotenv.config()

const port = 3000;

const app = express();
connectDb();
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user/", userRoutes)
app.use("/api/admin/", adminRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});