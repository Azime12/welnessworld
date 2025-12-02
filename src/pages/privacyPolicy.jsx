import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X } from 'lucide-react';

const PrivacyPolicy = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBoxRef = useRef(null);

  // Mock autocomplete function - replace with your actual API call
  const fetchSuggestions = async (query) => {
    if (query.length > 2) {
      // Simulate API call - replace with your actual autocomplete.php endpoint
      const mockSuggestions = [
        'Privacy Policy',
        'Terms of Service',
        'Disclaimer',
        'Data Protection',
        'Cookie Policy'
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
      // Redirect to search page with query
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

  // Privacy policy sections data
  const privacySections = [
    {
      id: 1,
      title: "Introduction",
      content: "At ToyVista.com, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you visit and interact with our website."
    },
    {
      id: 2,
      title: "Information We Collect",
      content: "We do not collect any personal information unless you voluntarily provide it through contact forms or email communication. However, we may collect non-personal data such as browser type, operating system, and pages visited for analytical purposes."
    },
    {
      id: 3,
      title: "Use of Affiliate Links",
      content: "ToyVista.com contains affiliate links from platforms like Amazon and AliExpress. When you click on these links and make a purchase, we may earn a small commission at no extra cost to you. These platforms may use cookies to track referrals."
    },
    {
      id: 4,
      title: "Cookies",
      content: "Our website may use cookies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand site usage and improve performance."
    },
    {
      id: 5,
      title: "Third-Party Services",
      content: "We may use third-party analytics tools such as Google Analytics to collect and analyze website usage data. These services may use cookies or other tracking technologies as per their own privacy policies."
    },
    {
      id: 6,
      title: "Data Security",
      content: "We take appropriate security measures to protect your data. However, no method of transmission over the Internet or method of electronic storage is 100% secure."
    },
    {
      id: 7,
      title: "Children's Privacy",
      content: "ToyVista.com is not intended for children under the age of 13. We do not knowingly collect any personal data from children."
    },
    {
      id: 8,
      title: "Changes to This Policy",
      content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date."
    },
    {
      id: 9,
      title: "Contact Us",
      content: "If you have any questions or concerns regarding this Privacy Policy, please feel free to contact us at: contact@toyvista.com."
    }
  ];

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
            <h1 className="mb-4 text-4xl font-bold text-blue-600 md:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last Updated: January 2025
            </p>
            <div className="w-32 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
          </div>

          {/* Privacy Policy Content */}
          <div className="mb-12 overflow-hidden bg-white shadow-lg rounded-2xl">
            {/* Policy Summary */}
            <div className="p-8 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">Our Commitment to Your Privacy</h2>
              <p className="text-gray-700">
                At ToyVista, we are committed to protecting your personal information and being transparent 
                about how we collect, use, and safeguard your data.
              </p>
            </div>

            {/* Privacy Sections */}
            <div className="p-8">
              {privacySections.map((section, index) => (
                <div 
                  key={section.id}
                  className={`privacy-section mb-10 ${index !== privacySections.length - 1 ? 'pb-10 border-b border-gray-100' : ''}`}
                >
                  <div className="flex items-start mb-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 bg-blue-100 rounded-full">
                      <span className="font-bold text-blue-600">{section.id}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-700 pl-14">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information Card */}
          <div className="grid gap-8 mb-12 md:grid-cols-2">
            <div className="p-6 bg-white shadow-lg rounded-xl">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Your Rights</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Right to access your personal data</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Right to request data deletion</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Right to opt-out of data collection</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Right to file a complaint</span>
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-white shadow-lg rounded-xl">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="/terms-of-service.php" 
                    className="flex items-center text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                  >
                    <span className="mr-2">📄</span>
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a 
                    href="/disclaimer.php" 
                    className="flex items-center text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                  >
                    <span className="mr-2">⚠️</span>
                    Disclaimer
                  </a>
                </li>
                <li>
                  <a 
                    href="/faq.php" 
                    className="flex items-center text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                  >
                    <span className="mr-2">❓</span>
                    Frequently Asked Questions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Card */}
          <div className="p-8 mb-12 text-center text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
            <h3 className="mb-4 text-2xl font-bold">Have Questions About Our Privacy Policy?</h3>
            <p className="mb-6 text-blue-100">
              We're here to help clarify any concerns you may have about your data privacy.
            </p>
            <a 
              href="mailto:contact@toyvista.com"
              className="inline-flex items-center px-6 py-3 font-semibold text-blue-600 transition-colors duration-300 bg-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <span className="mr-2">✉️</span>
              Contact Us at contact@toyvista.com
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
                <a href="/privacy-policy.php" className="block font-bold transition-colors hover:text-cyan-300">Privacy Policy</a>
                <a href="/terms-of-service.php" className="block transition-colors hover:text-cyan-300">Terms of Service</a>
                <a href="/faq.php" className="block transition-colors hover:text-cyan-300">FAQ</a>
                <a href="/disclaimer.php" className="block transition-colors hover:text-cyan-300">Disclaimer</a>
              </div>
            </div>

            {/* Contact Us */}
            <div className="contact-us md:col-span-2">
              <h4 className="mb-4 text-lg font-semibold text-cyan-300">Contact Us</h4>
              <p className="mb-6">
                <a 
                  href="mailto:contact@toyvista.com" 
                  className="text-lg transition-colors hover:text-cyan-300"
                >
                  📧 Email: contact@toyvista.com
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

export default PrivacyPolicy;