import axios from "axios";
import { response } from "express";

async function getCoinPrice(coinId){
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=${coinId}`;

    try{
        const response = await axios.get(url);
        return response.data[0];
    }catch(error){
        console.log('Error fetching coin data:', error);
    }
}

export default getCoinPrice;