import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, ChevronDown, ChevronUp, Mail, HelpCircle, ShoppingBag, User, RefreshCw } from 'lucide-react';

const FAQPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const searchBoxRef = useRef(null);

  // FAQ data
  const faqData = [
    {
      id: 1,
      question: "What is ToyVista and how does it work?",
      answer: "ToyVista is an affiliate-powered toy discovery platform. We connect you with trending and quality toys from major marketplaces like Amazon and AliExpress. When you click and buy through our links, we may earn a commission—at no extra cost to you.",
      icon: "🎯"
    },
    {
      id: 2,
      question: "Do I need to register or create an account?",
      answer: "No, you don't need an account. ToyVista is a free-to-browse platform designed to simplify toy discovery and buying through affiliate links.",
      icon: "👤"
    },
    {
      id: 3,
      question: "Are the toys sold by ToyVista?",
      answer: "No, ToyVista does not sell products directly. All toys are sold through third-party merchants like Amazon and AliExpress. We just help you find them!",
      icon: "🏪"
    },
    {
      id: 4,
      question: "How often are products updated?",
      answer: "We add and update products frequently, sometimes daily. Our goal is to always feature fresh, trending, and relevant toy selections.",
      icon: "🔄"
    },
    {
      id: 5,
      question: "Who can I contact for support?",
      answer: "You can reach us at contact@toyvista.com. While we don't handle orders or returns, we're happy to help answer questions about our platform.",
      icon: "📧"
    },
    {
      id: 6,
      question: "Is ToyVista free to use?",
      answer: "Yes, ToyVista is completely free for users. We earn through affiliate commissions when you make purchases through our links, but there's no cost to browse or use our platform.",
      icon: "💲"
    },
    {
      id: 7,
      question: "Can I trust the product reviews and ratings?",
      answer: "We display actual product reviews and ratings from the source platforms (Amazon, AliExpress, etc.). We don't modify or create our own reviews to ensure transparency.",
      icon: "⭐"
    },
    {
      id: 8,
      question: "Do you ship products internationally?",
      answer: "Shipping depends on the individual seller's policy on platforms like Amazon and AliExpress. We recommend checking shipping details on the product page before purchasing.",
      icon: "🌍"
    },
    {
      id: 9,
      question: "How do I return a product?",
      answer: "Since we're an affiliate platform, returns and exchanges are handled directly by the seller. Please refer to the seller's return policy on the platform where you made the purchase.",
      icon: "🔄"
    },
    {
      id: 10,
      question: "What types of toys do you feature?",
      answer: "We feature a wide range of toys including educational toys, STEM kits, action figures, dolls, puzzles, outdoor toys, and more. We focus on quality, safety, and play value.",
      icon: "🎮"
    }
  ];

  // Mock autocomplete function
  const fetchSuggestions = async (query) => {
    if (query.length > 2) {
      const mockSuggestions = [
        'FAQ',
        'How to use ToyVista',
        'Account registration',
        'Product updates',
        'Contact support'
      ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
      
      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search.php?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    window.location.href = `/search.php?q=${encodeURIComponent(suggestion)}`;
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions when search query changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.length > 2) {
        fetchSuggestions(searchQuery);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Toggle FAQ item
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="container px-4 py-4 mx-auto">
          <div className="flex flex-col justify-between md:flex-row md:items-center">
            {/* Logo and Search Container */}
            <div className="flex items-center justify-between w-full mb-4 md:w-auto md:mb-0">
              {/* Logo */}
              <div className="w-48 logo">
                <a href="/" className="block">
                  <img 
                    src="/images/logo.webp" 
                    alt="Toyvista Logo" 
                    className="w-full h-auto"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/200x60/1e88e5/ffffff?text=ToyVista";
                    }}
                  />
                </a>
              </div>

              {/* Mobile Menu Toggle */}
              <div 
                className="cursor-pointer menu-toggle md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X size={24} className="text-gray-700" />
                ) : (
                  <Menu size={24} className="text-gray-700" />
                )}
              </div>
            </div>

            {/* Search Box */}
            <div className="relative w-full mb-4 search-box md:w-auto md:flex-1 md:max-w-xl md:mx-8 md:mb-0" ref={searchBoxRef}>
              <form 
                id="searchForm" 
                method="get" 
                action="search.php" 
                onSubmit={handleSearchSubmit}
                className="relative"
              >
                <input
                  type="text"
                  name="q"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for toys..."
                  required
                  autoComplete="off"
                  className="w-full px-4 py-3 pl-10 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2">
                  <Search size={18} />
                </div>
                <button
                  type="button"
                  className="absolute text-gray-500 transform -translate-y-1/2 search-button right-3 top-1/2 hover:text-blue-600"
                  onClick={handleSearchSubmit}
                >
                  <Search size={20} />
                </button>
              </form>

              {/* Suggestions Box */}
              {showSuggestions && suggestions.length > 0 && (
                <div 
                  id="suggestions" 
                  className="absolute left-0 right-0 z-50 mt-1 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg suggestions-box top-full max-h-60"
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 text-gray-700 transition-colors border-b cursor-pointer suggestion-item hover:bg-blue-50 last:border-b-0 hover:text-blue-600"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Menu */}
            <ul 
              className={`nav-menu ${isMenuOpen ? 'active' : ''} 
                flex flex-col md:flex-row
                items-start md:items-center
                space-y-3 md:space-y-0 md:space-x-8
                bg-white md:bg-transparent
                p-4 md:p-0
                rounded-lg md:rounded-none
                shadow-lg md:shadow-none
                transition-all duration-300 ease-in-out
                ${isMenuOpen ? 'block' : 'hidden md:flex'}`}
              id="nav-menu"
            >
              <li>
                <a 
                  href="/why-toyvista.php" 
                  className="block py-2 font-medium text-gray-700 transition-colors hover:text-blue-600 md:py-0"
                >
                  Why Toy Vista?
                </a>
              </li>
              <li>
                <a 
                  href="/blogs" 
                  className="block py-2 font-medium text-gray-700 transition-colors hover:text-blue-600 md:py-0"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a 
                  href="/disclaimer.php" 
                  className="block py-2 font-medium text-gray-700 transition-colors hover:text-blue-600 md:py-0"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container max-w-4xl px-4 py-8 mx-auto md:py-12">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 rounded-full">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-blue-600 md:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Find answers to common questions about ToyVista
            </p>
            <div className="w-32 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
          </div>

          {/* Search FAQs */}
          <div className="p-6 mb-8 bg-white shadow-lg rounded-xl">
            <div className="flex items-center mb-4">
              <Search className="w-5 h-5 mr-2 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-800">Search FAQs</h3>
            </div>
            <input
              type="text"
              placeholder="Type your question here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                const value = e.target.value.toLowerCase();
                // You could implement search filtering here
              }}
            />
          </div>

          {/* FAQ Categories */}
          <div className="grid grid-cols-2 gap-4 mb-10 md:grid-cols-4">
            <div className="p-4 text-center rounded-lg bg-blue-50">
              <div className="mb-2 text-2xl">🎯</div>
              <span className="text-sm font-medium text-gray-700">How It Works</span>
            </div>
            <div className="p-4 text-center rounded-lg bg-green-50">
              <div className="mb-2 text-2xl">🛒</div>
              <span className="text-sm font-medium text-gray-700">Shopping</span>
            </div>
            <div className="p-4 text-center rounded-lg bg-purple-50">
              <div className="mb-2 text-2xl">🔄</div>
              <span className="text-sm font-medium text-gray-700">Updates</span>
            </div>
            <div className="p-4 text-center rounded-lg bg-orange-50">
              <div className="mb-2 text-2xl">📧</div>
              <span className="text-sm font-medium text-gray-700">Support</span>
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={faq.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                  openFaqIndex === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <button
                  className="flex items-center justify-between w-full px-6 py-5 text-left transition-colors faq-question hover:bg-gray-50"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex items-center">
                    <span className="mr-4 text-2xl">{faq.icon}</span>
                    <span className="text-lg font-semibold text-gray-800">
                      {faq.question}
                    </span>
                  </div>
                  <span className="flex-shrink-0 ml-4 text-gray-500">
                    {openFaqIndex === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </span>
                </button>
                
                <div 
                  className={`faq-answer overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pt-2 pb-5 border-t border-gray-100">
                    <p className="pl-10 leading-relaxed text-gray-700">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="p-8 mt-16 text-center text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-white/20">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="mb-4 text-2xl font-bold">Still Have Questions?</h3>
            <p className="max-w-xl mx-auto mb-6 text-blue-100">
              Can't find the answer you're looking for? Our team is here to help!
            </p>
            <a 
              href="mailto:contact@toyvista.com"
              className="inline-flex items-center px-6 py-3 font-semibold text-blue-600 transition-colors duration-300 bg-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Us at contact@toyvista.com
            </a>
          </div>

          {/* Related Links */}
          <div className="grid gap-6 mt-12 md:grid-cols-3">
            <a 
              href="/privacy-policy.php"
              className="p-6 transition-shadow duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl group"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 mr-4 transition-colors bg-blue-100 rounded-lg group-hover:bg-blue-200">
                  <span className="text-blue-600">🔒</span>
                </div>
                <h4 className="font-semibold text-gray-800">Privacy Policy</h4>
              </div>
              <p className="text-sm text-gray-600">
                Learn how we protect your personal information and data.
              </p>
            </a>
            
            <a 
              href="/terms-of-service.php"
              className="p-6 transition-shadow duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl group"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 mr-4 transition-colors bg-green-100 rounded-lg group-hover:bg-green-200">
                  <span className="text-green-600">📝</span>
                </div>
                <h4 className="font-semibold text-gray-800">Terms of Service</h4>
              </div>
              <p className="text-sm text-gray-600">
                Read our terms and conditions for using ToyVista.
              </p>
            </a>
            
            <a 
              href="/disclaimer.php"
              className="p-6 transition-shadow duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl group"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 mr-4 transition-colors bg-orange-100 rounded-lg group-hover:bg-orange-200">
                  <span className="text-orange-600">⚠️</span>
                </div>
                <h4 className="font-semibold text-gray-800">Disclaimer</h4>
              </div>
              <p className="text-sm text-gray-600">
                Important legal information about our affiliate partnerships.
              </p>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-white bg-gray-900">
        <div className="container px-4 py-8 mx-auto">
          {/* Animated Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full h-40 overflow-hidden footer-logos md:w-1/3">
              <div 
                className="absolute left-0 w-32 h-32 bg-center bg-cover rounded-full wheel bottom-4"
                style={{
                  backgroundImage: "url('/images/logo.jpeg')",
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  animation: 'roll 4s linear infinite alternate'
                }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-8 footer-top md:grid-cols-4">
            {/* Sister Companies */}
            <div className="sister-companies">
              <h4 className="mb-4 text-lg font-semibold text-cyan-300">Sister Companies</h4>
              <div className="space-y-2">
                <a 
                  href="https://welnessworld.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-cyan-300"
                >
                  Welness World
                </a>
                <a 
                  href="https://techheavenstores.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-cyan-300"
                >
                  Tech Heaven Stores
                </a>
                <a 
                  href="https://shoespire.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-cyan-300"
                >
                  Shoespire
                </a>
              </div>
            </div>

            {/* Useful Links */}
            <div className="useful-links">
              <h4 className="mb-4 text-lg font-semibold text-cyan-300">Useful Links</h4>
              <div className="space-y-2">
                <a href="/about.php" className="block transition-colors hover:text-cyan-300">About Us</a>
                <a href="/privacy-policy.php" className="block transition-colors hover:text-cyan-300">Privacy Policy</a>
                <a href="/terms-of-service.php" className="block transition-colors hover:text-cyan-300">Terms of Service</a>
                <a href="/faq.php" className="block font-bold transition-colors hover:text-cyan-300">FAQ</a>
                <a href="/disclaimer.php" className="block transition-colors hover:text-cyan-300">Disclaimer</a>
              </div>
            </div>

            {/* Contact Us */}
            <div className="contact-us md:col-span-2">
              <h4 className="mb-4 text-lg font-semibold text-cyan-300">Contact Us</h4>
              <p className="mb-6">
                <a 
                  href="mailto:contact@toyvista.com" 
                  className="flex items-center text-lg transition-colors hover:text-cyan-300"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email: contact@toyvista.com
                </a>
              </p>
              
              {/* Social Links */}
              <div className="flex mb-6 space-x-4 socials">
                <a 
                  href="https://facebook.com/toyvistacom" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 transition-colors bg-gray-800 rounded-full hover:bg-blue-600"
                  aria-label="Facebook"
                >
                  <span className="font-semibold">f</span>
                </a>
                <a 
                  href="https://www.instagram.com/toyvistacom/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 transition-colors bg-gray-800 rounded-full hover:bg-pink-600"
                  aria-label="Instagram"
                >
                  <span className="font-semibold">IG</span>
                </a>
                <a 
                  href="https://www.pinterest.com/toyvistacom/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 transition-colors bg-gray-800 rounded-full hover:bg-red-600"
                  aria-label="Pinterest"
                >
                  <span className="font-semibold">P</span>
                </a>
                <a 
                  href="https://www.tiktok.com/@toyvistacom" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 transition-colors bg-gray-800 rounded-full hover:bg-black"
                  aria-label="TikTok"
                >
                  <span className="font-semibold">T</span>
                </a>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col items-center space-y-4 download-btns sm:flex-row sm:space-y-0 sm:space-x-6">
                <a href="#" className="block">
                  <img 
                    src="/images/ios.png" 
                    alt="iOS App" 
                    className="w-auto h-12"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/120x40/000000/ffffff?text=iOS+App";
                    }}
                  />
                </a>
                <a href="#" className="block">
                  <img 
                    src="/images/android.webp" 
                    alt="Android App" 
                    className="w-auto h-12"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/120x40/3DDC84/ffffff?text=Android+App";
                    }}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-6 text-center border-t border-gray-700 footer-bottom">
            <p className="text-sm text-gray-400">
              © 2025 ToyVista. All rights reserved | Developed by{' '}
              <a 
                href="https://marketingethiopia.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white transition-colors hover:text-cyan-300"
              >
                MarketingEthiopia.com
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes roll {
          0% {
            transform: translateX(0) rotate(0deg);
          }
          100% {
            transform: translateX(calc(100% - 8rem)) rotate(720deg);
          }
        }

        @media (max-width: 768px) {
          @keyframes roll {
            0% {
              transform: translateX(0) rotate(0deg);
            }
            100% {
              transform: translateX(calc(100vw - 10rem)) rotate(720deg);
            }
          }
          
          .footer-logos {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQPage;