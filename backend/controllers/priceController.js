import axios from "axios";

export async function getCoinPrice(coinId) {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=${coinId}`;

    try {
        const response = await axios.get(url);
        const coinData = response.data[0];

        return {
            id: coinData.id,
            symbol: coinData.symbol,
            name: coinData.name,
            current_price: coinData.current_price,
            image: coinData.image,  
        };
    } catch (error) {
        console.log('Error fetching coin data:', error);
    }
}