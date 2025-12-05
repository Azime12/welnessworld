

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Search } from 'lucide-react';
import { BASE_URL } from '../constants/apiTags';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  // Clear search when route changes
  useEffect(() => {
    if (!location.pathname.includes('/search')) {
      setSearchQuery('');
      setSuggestions([]);
    }
  }, [location]);

  // Fetch suggestions as user types
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoadingSuggestions(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/search-products.php?q=${encodeURIComponent(searchQuery.trim())}&limit=5`
        );
        if (res.data?.products) {
          setSuggestions(res.data.products);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300); // debounce 300ms
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
      setSuggestions([]);
    }
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (name) => {
    setSearchQuery(name);
    navigate(`/search?q=${encodeURIComponent(name)}`);
    setSuggestions([]);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-white via-[#79ff50] via-[#028614] to-[#045505] sticky top-0 z-50">
      <nav className="container flex items-center justify-between px-4 py-2 mx-auto">
        {/* Logo */}
        <div className='p-2 ml-10'>
          <Link to="/" className="flex items-center">
          <img src="/images/logo.png" alt="Toyvista Logo" className="w-auto h-20 rounded-full" />
        </Link>
        </div>

        {/* Desktop Search */}
        <div className="relative flex-1 hidden max-w-xl mx-4 lg:block">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              ref={searchRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for toys, games, and more..."
              className="w-full px-4 py-3 shadow rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              autoComplete="off"
            />
            <button
              type="submit"
              className="absolute p-2 text-gray-100 -translate-y-1/2 rounded-lg bg-emerald-500 top-1/2 right-3 hover:bg-emerald-600"
            >
              <Search className='text-white'/>
            </button>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 z-50 mt-1 overflow-y-auto bg-white border rounded-lg shadow max-h-60">
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleSelectSuggestion(item.name)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>

        {/* Desktop Links */}
        <div className="items-center hidden mr-20 space-x-5 lg:flex">
          <Link to="/why-toyvista" className="text-white hover:text-yellow-300">Why Toy Vista?</Link>
          <Link to="/blogs" className="text-white hover:text-yellow-300">Blogs</Link>
          <Link to="/disclaimer" className="text-white hover:text-yellow-300">Disclaimer</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 text-2xl text-white">
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="p-4 space-y-4 bg-white shadow-2xl lg:hidden rounded-xl">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-3 border shadow rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="absolute p-2 text-gray-100 -translate-y-1/2 rounded-lg bg-emerald-500 top-1/2 right-3 hover:bg-emerald-600"
            >
              <Search className='text-white'/>
            </button>
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 z-50 mt-1 overflow-y-auto bg-white border rounded-lg shadow max-h-60">
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleSelectSuggestion(item.name)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </form>

          {/* Mobile Links */}
          <Link to="/why-toyvista" className="block px-4 py-2" onClick={() => setIsMenuOpen(false)}>Why Toy Vista?</Link>
          <Link to="/blogs" className="block px-4 py-2" onClick={() => setIsMenuOpen(false)}>Blogs</Link>
          <Link to="/disclaimer" className="block px-4 py-2" onClick={() => setIsMenuOpen(false)}>Disclaimer</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
