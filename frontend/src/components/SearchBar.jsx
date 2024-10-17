import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        try {
            // Fetch coins based on search query
            const response = await axios.get(`http://localhost:5000/api/search`, {
                params: { query },
            });
            const coins = response.data;

            // Extract coin IDs to fetch their prices
            const coinIds = coins.map((coin) => coin.id).join(',');

            // Fetch current prices for the coins
            const priceResponse = await axios.get(
                `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`
            );

            // Merge the search result data with the price data
            const coinsWithPrices = coins.map((coin) => ({
                ...coin,
                price: `$${priceResponse.data[coin.id]?.usd || 'N/A'}`,
                indicator: priceResponse.data[coin.id]?.usd_24h_change > 0 ? 'up' : 'down',
            }));

            setResults(coinsWithPrices);
            onSearch(coinsWithPrices);
            setError('');
        } catch (err) {
            setError('Failed to fetch search results');
        }
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a cryptocurrency..."
                />
                <Button type="submit" variant="primary">Search</Button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {results.length > 0 && (
                <div className="search-results">
                    {results.map((coin) => (
                        <div key={coin.id} className="search-result-item">
                            <img src={coin.image} alt={coin.name} />
                            <div>
                                <h4>{coin.name} ({coin.symbol.toUpperCase()})</h4>
                                <p>Price: {coin.price}</p>
                                <p>Status: {coin.indicator === 'up' ? '🔼' : '🔽'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
