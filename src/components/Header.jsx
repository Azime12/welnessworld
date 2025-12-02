import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes('/search')) {
      setSearchQuery('');
    }
  }, [location]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-gradient-to-r from-white via-[#99CC33] via-[#009900] to-[#004400] sticky top-0 z-50">
      <nav className="container flex items-center justify-between px-4 py-3 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/images/logo.png" alt="Toyvista Logo" className="w-auto h-20 p-2 rounded-full" />
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl mx-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Searhc  product for wellness worlds "
              className="w-full px-4 py-3 shadow rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              autoComplete="off"
            />
            <button
              type="submit"
              className="absolute p-2 text-gray-800 -translate-y-1/2 bg-yellow-400 rounded-lg top-1/2 right-3 hover:bg-yellow-500"
            >
              🔍
            </button>
          </form>
        </div>

        {/* Desktop Links */}
        <div className="items-center hidden space-x-6 lg:flex">
          <Link to="/why-toyvista" className="text-white hover:text-yellow-300">Why Wellness Word?</Link>
          <Link to="/blogs" className="text-white hover:text-yellow-300">Blogs</Link>
          <Link to="/disclaimer" className="text-white hover:text-yellow-300">Disclaimer</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 text-white">☰</button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="p-4 space-y-2 bg-white shadow-2xl lg:hidden rounded-xl">
          <Link to="/why-toyvista" className="block px-4 py-2" onClick={() => setIsMenuOpen(false)}>Why Toy Vista?</Link>
          <Link to="/blogs" className="block px-4 py-2" onClick={() => setIsMenuOpen(false)}>Blogs</Link>
          <Link to="/disclaimer" className="block px-4 py-2" onClick={() => setIsMenuOpen(false)}>Disclaimer</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
