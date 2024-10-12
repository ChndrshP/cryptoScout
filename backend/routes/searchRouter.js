import express from "express";
import axios from "axios";

const searchRouter = express.Router();

searchRouter.get('/search', async (req, res) => {
    const { query } = req.query;  // Assuming search term is passed as a query parameter

    if (!query) {
        return res.status(400).json({ message: "Search query is required" });
    }

    try {
        // First call to get the coin ids matching the query
        const apiUrl = `https://api.coingecko.com/api/v3/search?query=${query}`;
        const response = await axios.get(apiUrl);

        // Extract coin IDs from the search response
        const coinIds = response.data.coins.map(coin => coin.id);

        // Second call to get the current price for each coin using its id
        if (coinIds.length > 0) {
            const priceUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}`;
            const priceResponse = await axios.get(priceUrl);

            // Map the coin details, including price
            const coins = priceResponse.data.map(coin => ({
                id: coin.id,
                name: coin.name,
                symbol: coin.symbol,
                image: coin.image,
                curr_price: coin.current_price,
                high_24h: coin.high_24h,
                low_24h: coin.low_24h,
            }));

            res.status(200).json(coins);
        } else {
            res.status(404).json({ message: "No coins found for the search query" });
        }
    } catch (error) {
        console.error("Error fetching search results:", error);
        res.status(500).json({
            message: "Error fetching search results"
        });
    }
});

export default searchRouter;