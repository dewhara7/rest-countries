import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CountriesProvider } from './context/CountriesContext';
import SearchBar from './components/SearchBar';
import RegionFilter from './components/RegionFilter';
import CountryCard from './components/CountryCard';
import CountryDetail from './components/CountryDetail';
import HeroSection from './components/HeroSection';
import { useCountries } from './context/CountriesContext';

const Home = () => {
  const { countries, loading, error } = useCountries();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowContent(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div>
      <HeroSection />
      
      <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full px-4 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <RegionFilter />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {countries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <CountriesProvider>
        <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <header className="fixed w-full bg-white/80 dark:bg-gray-800/80 shadow-md transition-colors duration-200 backdrop-blur-sm z-50">
            <div className="w-full px-4 py-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Where in the world?</h1>
            </div>
          </header>
          <main className="w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/country/:code" element={<CountryDetail />} />
            </Routes>
          </main>
        </div>
      </CountriesProvider>
    </Router>
  );
}

export default App;
