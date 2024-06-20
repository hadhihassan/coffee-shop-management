import express from 'express';
import corsConfig from './config/cors.js';
import connectDb from './config/db.js';

const port = 3000;

const app = express();
connectDb();

app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
