import Alert from "../models/alertSchema.js";
import { getCoinPrice } from "../controllers/priceController.js";
import { sendEmail } from "../utils/email.js";

export async function checkPriceAlert() {
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

export function startPriceCheckInterval(){
    setInterval(checkPriceAlert, 100000);
}