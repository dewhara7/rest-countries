import { createContext, useContext, useState, useEffect } from 'react';
import { getAllCountries, getCountryByName, getCountriesByRegion } from '../services/api';

const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        let data = [];

        if (searchQuery) {
          data = await getCountryByName(searchQuery);
        } else if (selectedRegion) {
          data = await getCountriesByRegion(selectedRegion);
        } else {
          data = await getAllCountries();
        }

        setCountries(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [searchQuery, selectedRegion]);

  const handleSearch = () => {
    setSearchQuery(searchInput.trim());
  };

  const value = {
    countries,
    loading,
    error,
    searchInput,
    setSearchInput,
    handleSearch,
    selectedRegion,
    setSelectedRegion,
  };

  return (
    <CountriesContext.Provider value={value}>
      {children}
    </CountriesContext.Provider>
  );
};

export const useCountries = () => {
  const context = useContext(CountriesContext);
  if (!context) {
    throw new Error('useCountries must be used within a CountriesProvider');
  }
  return context;
};
