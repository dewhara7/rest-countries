import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCountryByCode } from '../services/api';

const CountryDetail = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);
        const data = await getCountryByCode(code);
        setCountry(data[0]);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-8">
      <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-4 rounded-lg max-w-md mx-auto">
        {error}
      </div>
    </div>
  );
  
  if (!country) return (
    <div className="text-center py-8">
      <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-100 p-4 rounded-lg max-w-md mx-auto">
        Country not found
      </div>
    </div>
  );

  const {
    name,
    population,
    region,
    subregion,
    capital,
    flags,
    languages,
    currencies,
    borders
  } = country;

  return (
    <div className="w-full px-4 py-8">
      <Link
        to="/"
        className="button inline-flex items-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-12"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="card">
          <img
            src={flags.png}
            alt={`${name.common} flag`}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="text-gray-900 dark:text-white">
          <h1 className="text-3xl font-bold mb-6">{name.common}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Native Name:</span>{' '}
                {Object.values(name.nativeName)[0]?.common || name.common}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{' '}
                {population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span> {subregion}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{' '}
                {capital?.[0] || 'N/A'}
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Top Level Domain:</span>{' '}
                {country.tld?.join(', ')}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{' '}
                {Object.values(currencies)
                  .map((currency) => currency.name)
                  .join(', ')}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{' '}
                {Object.values(languages).join(', ')}
              </p>
            </div>
          </div>
          {borders && borders.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Border Countries:</h2>
              <div className="flex flex-wrap gap-2">
                {borders.map((border) => (
                  <Link
                    key={border}
                    to={`/country/${border}`}
                    className="button bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    {border}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail; 