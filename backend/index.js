import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import alertsRoutes from "./routes/alerts.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB")
    .catch((error) => console.log("Mongo connection error:", error)));

app.use('/api/alerts', alertsRoutes);

const PORT = process.env.PORT || 5000;
app.listern(PORT, () => {
    console.log("Server is running on port ${PORT}");
});