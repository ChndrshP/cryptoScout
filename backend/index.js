import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Alertrouter from "./routes/alertRouter.js";
import userRouter from "./routes/authRouter.js";
import {startPriceCheckInterval} from "./controllers/priceAlerts.js";


dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/alerts', Alertrouter);
app.use('/api/auth', userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

setInterval(startPriceCheckInterval, 100000);
