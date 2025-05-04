import React, { useEffect, useState } from 'react';
import { getAllCountries } from '../services/api';

const Home = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCountries();
        console.log(data); // Debugging: Check the API response
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: 'white' }} className="min-h-screen text-black">
      {/* Hero Section */}
      <header className="text-center py-10">
        <h1 className="text-4xl font-extrabold mb-4">Explore the World</h1>
        <p className="text-lg">Discover countries and learn more about them!</p>
      </header>
      

      {/* Country Cards Section */}
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Countries</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countries.map((country) => (
            <div
              key={country.alpha3Code || country.name?.common || country.name}
              className="bg-white text-black rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-300"
            >
              <img
                src={country.flags?.png || 'https://via.placeholder.com/150'}
                alt={`${country.name?.common || 'Country'} flag`}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{country.name?.common || country.name}</h3>
                <p className="text-sm">
                  <strong>Region:</strong> {country.region || 'Unknown'}
                </p>
                <p className="text-sm">
                  <strong>Population:</strong> {country.population?.toLocaleString() || 'N/A'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
