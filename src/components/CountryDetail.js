import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CountryDetail = () => {
    const { name } = useParams();
    const [country, setCountry] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}`)
            .then(response => setCountry(response.data[0]))
            .catch(error => setError(error));
    }, [name]);

    if (error) {
        return <div>Error fetching country details: {error.message}</div>;
    }

    if (!country) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h1>{country.name.common}</h1>
            <p><strong>Capital:</strong> {country.capital}</p>
            <img src={country.flags.png} alt={`${country.name.common} flag`} style={{ width: '150px' }} />
        </div>
    );
};

export default CountryDetail;
