import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import alertsRoutes from "./routes/alerts.js";
import Alert from "./models/schema.js";
import { getCoinPrice } from "./controllers/priceController.js";
import { sendEmail } from "./utils/email.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use('/api/alerts', alertsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function checkPriceAlert() {
    try {
        const alerts = await Alert.find({ alertSent: false });

        alerts.forEach(async (alert) => {
            const coinData = await getCoinPrice(alert.coinId);

            if (coinData) {
                const currPrice = coinData.current_price;
                const targetPrice = alert.targetPrice;
                const halfwayPrice = (targetPrice + currPrice) / 2;

                if (!alert.thresholdHit && currPrice >= halfwayPrice) {
                    await sendEmail(
                        alert.email,
                        "Price Alert",
                        `Your coin ${coinData.name} has reached halfway to your target price of $${targetPrice}. Current Price: $${currPrice}.`
                    );
                    alert.thresholdHit = true;
                }

                if (currPrice >= targetPrice) {
                    await sendEmail(
                        alert.email,
                        "Price Alert",
                        `Your coin ${coinData.name} has reached the target price of $${targetPrice}. Current Price: $${currPrice}.`
                    );
                    alert.alertSent = true;
                }

                await alert.save();
            }
        });
    } catch (error) {
        console.error("Error checking price alerts:", error);
    }
}

setInterval(checkPriceAlert, 100000);
