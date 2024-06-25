import express from 'express';
import dotenv from 'dotenv'
import corsConfig from './src/config/cors.js';
import connectDb from './src/config/db.js';
import adminRoutes from './src/routes/adminRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
const port = 3000;
const app = express();
connectDb();
app.use('/images', express.static(path.join(__dirname, './images')));
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user/", userRoutes)
app.use("/api/admin/", adminRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});