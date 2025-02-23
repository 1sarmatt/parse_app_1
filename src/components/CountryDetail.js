import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CountryDetail = () => {
    const { name } = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/name/${name}`)
            .then(response => {
                if (response.data.length > 0) {
                    setCountry(response.data[0]);
                } else {
                    setError('Country not found');
                }
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching country details: ' + error.message);
                setLoading(false);
            });
    }, [name]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!country) {
        return <div>No country data available.</div>;
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
