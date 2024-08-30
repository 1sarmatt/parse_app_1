import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CountryList = () => {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => setCountries(response.data))
            .catch(error => setError(error));
    }, []);

    if (error) {
        return <div>Error fetching countries: {error.message}</div>;
    }

    return (
        <div className="container mt-4">
            <h1>Country List</h1>
            <ul className="list-group">
                {countries.map(country => (
                    <li key={country.cca3} className="list-group-item">
                        <Link to={`/country/${country.name.common}`}>
                            {country.name.common}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountryList;
