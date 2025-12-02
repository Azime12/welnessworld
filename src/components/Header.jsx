import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Brand Colors
  const brandColors = {
    primary: '#99CC33',  // Vibrant green
    secondary: '#009900', // Medium green
    dark: '#004400',      // Dark green
    accent: '#FF6B6B',    // Coral accent for CTAs
    light: '#F9FFE3',     // Light cream background
    textDark: '#1A3C34',  // Dark text
    textLight: '#FFFFFF'  // White text
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {
      fetchWellnessSuggestions(query);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Wellness-specific suggestions
  const fetchWellnessSuggestions = async (query) => {
    try {
      // Wellness-specific mock suggestions
      const wellnessSuggestions = [
        'Yoga Mats',
        'Essential Oils',
        'Meditation Cushions',
        'Weighted Blankets',
        'Fitness Trackers',
        'Massage Guns',
        'Air Purifiers',
        'Herbal Supplements',
        'Organic Skincare',
        'Water Bottles',
        'Sleep Aids',
        'Resistance Bands',
        'Aromatherapy Diffusers',
        'Posture Correctors',
        'Blue Light Glasses'
      ].filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
      );
      
      setSuggestions(wellnessSuggestions.slice(0, 8));
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    window.location.href = `/search?q=${encodeURIComponent(suggestion)}`;
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header 
      className="relative z-50 shadow-lg"
      style={{
        background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 50%, ${brandColors.dark} 100%)`
      }}
    >
      {/* Top Bar
      <div className="hidden bg-white lg:block bg-opacity-10">
        <div className="container px-4 py-2 mx-auto">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-white">
                🚚 Free Shipping on Orders Over $50
              </span>
              <span className="px-2 py-1 text-xs font-bold text-white bg-white rounded-full bg-opacity-20">
                NEW
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/customer-service" className="text-white hover:text-gray-200">
                Customer Service
              </a>
              <a href="/track-order" className="text-white hover:text-gray-200">
                Track Order
              </a>
              <div className="flex items-center space-x-2">
                <span className="text-white">🇺🇸</span>
                <span className="text-white">USD</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Navigation */}
      <nav className="container px-4 py-3 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center group">
                <img 
                  src="/images/logo (1).webp" 
                  alt="WellnessWorld Logo" 
                  className="w-20 h-20 p-2 rounded-full"
                  onError={(e) => {
                    e.target.src = '/images/logo-fallback.png';
                  }}
                />
              <div className="ml-3">
                <h1 className="text-2xl font-bold text-white font-display">
                  WellnessWorld
                </h1>
                <p className="text-xs text-white opacity-90">
                  Your Path to Better Living
                </p>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-2xl mx-4 lg:mx-8" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search wellness products: yoga, supplements, fitness..."
                  className="w-full px-6 py-3 text-gray-800 placeholder-gray-600 transition-all duration-300 bg-white border-0 shadow-lg outline-none rounded-2xl focus:ring-4 focus:ring-white focus:ring-opacity-30"
                  required
                  autoComplete="off"
                />
                <button
                  type="submit"
                  style={{ backgroundColor: brandColors.dark }}
                  className="absolute p-3 text-white transition-all duration-300 transform -translate-y-1/2 rounded-xl right-3 top-1/2 hover:shadow-lg hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 z-50 mt-2 overflow-y-auto bg-white border border-gray-200 shadow-2xl top-full rounded-2xl max-h-64">
                <div className="p-3 bg-gray-50">
                  <h4 className="font-semibold text-gray-700">Popular Wellness Products</h4>
                </div>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 transition-all duration-200 border-b border-gray-100 cursor-pointer hover:bg-gray-50 last:border-b-0 group"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center">
                      <div 
                        className="p-2 mr-3 transition-colors rounded-lg group-hover:scale-110"
                        style={{ backgroundColor: `${brandColors.primary}20` }}
                      >
                        <svg className="w-4 h-4" style={{ color: brandColors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-700 transition-colors group-hover:text-gray-900">
                        {suggestion}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links & CTA */}
          <div className="items-center hidden space-x-6 lg:flex">
            <Link
              to="/why-wellnessworld"
              className="px-4 py-2 font-semibold text-white transition-all duration-200 rounded-lg hover:text-gray-100 hover:bg-white hover:bg-opacity-10"
            >
              Why WellnessWorld
            </Link>

            <Link
              to="/categories"
              className="px-4 py-2 font-semibold text-white transition-all duration-200 rounded-lg hover:text-gray-100 hover:bg-white hover:bg-opacity-10"
            >
              Categories
            </Link>

            <Link
              to="/wellness-blog"
              className="px-4 py-2 font-semibold text-white transition-all duration-200 rounded-lg hover:text-gray-100 hover:bg-white hover:bg-opacity-10"
            >
              Wellness Blog
            </Link>

            <div className="w-px h-6 bg-white bg-opacity-30"></div>

            {/* <div className="relative group">
              <Link
                to="/account"
                className="flex items-center p-2 text-white transition-colors duration-200 rounded-lg hover:bg-white hover:bg-opacity-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              <div className="absolute right-0 hidden w-48 pt-2 group-hover:block">
                <div className="py-2 bg-white rounded-lg shadow-xl">
                  <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Sign In
                  </Link>
                  <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Create Account
                  </Link>
                </div>
              </div>
            </div> */}

            {/* <Link
              to="/cart"
              className="relative flex items-center p-2 text-white transition-colors duration-200 rounded-lg hover:bg-white hover:bg-opacity-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1">
                3
              </span>
            </Link> */}

            {/* <Link
              to="/shop-now"
              className="px-6 py-3 font-bold text-white transition-all duration-300 transform shadow-lg rounded-xl hover:shadow-xl hover:scale-105"
              style={{ 
                background: `linear-gradient(135deg, ${brandColors.accent} 0%, #FF8E8E 100%)`,
                boxShadow: `0 4px 15px ${brandColors.accent}40`
              }}
            >
              Shop Wellness
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-white transition-colors duration-200 bg-white shadow-md rounded-xl bg-opacity-10 hover:bg-opacity-20"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col justify-center w-6 h-6 space-y-1.5">
                <span 
                  className={`block h-0.5 w-6 bg-current transform transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} 
                />
                <span 
                  className={`block h-0.5 w-6 bg-current transition duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} 
                />
                <span 
                  className={`block h-0.5 w-6 bg-current transform transition duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} 
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-6 space-y-3 bg-white shadow-2xl rounded-2xl">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search wellness products..."
                  className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="absolute p-2 text-white transform -translate-y-1/2 rounded-lg right-2 top-1/2" style={{ backgroundColor: brandColors.primary }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <Link
              to="/why-wellnessworld"
              className="block px-4 py-3 font-semibold text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Why WellnessWorld
            </Link>

            <Link
              to="/categories"
              className="block px-4 py-3 font-semibold text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>

            <Link
              to="/wellness-blog"
              className="block px-4 py-3 font-semibold text-gray-700 transition-colors duration-200 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Wellness Blog
            </Link>

            

            
          </div>
        </div>
      </nav>

     
    </header>
  );
};

export default Header;