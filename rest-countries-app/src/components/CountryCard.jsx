import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  const {
    name,
    population,
    region,
    capital,
    flags,
    cca3
  } = country;

  return (
    <Link to={`/country/${cca3}`} className="block h-full">
      <div className="card h-full">
        <div className="relative pb-[60%]">
          <img
            src={flags.png}
            alt={`${name.common} flag`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{name.common}</h2>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>
              <span className="font-semibold">Population:</span>{' '}
              {population.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Region:</span> {region}
            </p>
            <p>
              <span className="font-semibold">Capital:</span>{' '}
              {capital?.[0] || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
