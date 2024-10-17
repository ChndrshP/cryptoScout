import React, {useState} from 'react';
import '../styles/HomePage.css';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
    const[searchReasults, setSearchResults] = useState([]);

    const handleSearch = (results) => {
        setSearchResults(results);
    }
    
    return (
        <div className="home-page">
            <p><strong>Track</strong> your favorite cryptocurrencies and set up custom price <strong>alerts</strong>.</p>
            <SearchBar onSearch={handleSearch} />
        </div>
    );
};

export default HomePage;
