import { useCountries } from '../context/CountriesContext';

const HeroSection = () => {
  const { setSearchTerm } = useCountries();

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div 
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/images/hero-bg.jpg")',
  }}
></div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-5xl md:text-7xl text-white font-bold mb-8 text-center">
          Discover the Wonders of<br />the World
        </h1>
        
        {/* Search Bar */}
        <div className="w-full max-w-2xl relative">
          <input
            type="text"
            placeholder="Search destinations, countries..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-full text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-8 py-2 rounded-full hover:bg-blue-600 transition-colors duration-200"
          >
            Search
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="mb-2">Scroll to explore countries</p>
        <svg 
          className="w-6 h-6 mx-auto animate-bounce" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection; 