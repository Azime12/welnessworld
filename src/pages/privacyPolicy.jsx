import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X } from 'lucide-react';

const PrivacyPolicy = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBoxRef = useRef(null);

  // Mock autocomplete function
  const fetchSuggestions = async (query) => {
    if (query.length > 2) {
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search.php?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    window.location.href = `/search.php?q=${encodeURIComponent(suggestion)}`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.length > 2) fetchSuggestions(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const privacySections = [
    {
      id: 1,
      title: "Introduction",
      content: "At WellnessWorld.com, your privacy is our priority. This Privacy Policy explains how we collect, use, and protect your information on our Amazon wellness affiliate platform."
    },
    {
      id: 2,
      title: "Information We Collect",
      content: "We do not collect personal information unless you voluntarily provide it. Non-personal data, such as browser type, pages visited, or device information, may be collected for analytical purposes."
    },
    {
      id: 3,
      title: "Use of Affiliate Links",
      content: "WellnessWorld.com contains Amazon affiliate links. Clicking on these links may earn us a small commission at no extra cost to you. Amazon may track referrals via cookies."
    },
    {
      id: 4,
      title: "Cookies",
      content: "Our site may use cookies to enhance user experience, track engagement, and improve functionality."
    },
    {
      id: 5,
      title: "Third-Party Services",
      content: "We may use tools like Google Analytics to understand website usage. These services have their own privacy policies and may use cookies."
    },
    {
      id: 6,
      title: "Data Security",
      content: "We implement security measures to protect your information, but no system is 100% secure."
    },
    {
      id: 7,
      title: "Children's Privacy",
      content: "WellnessWorld.com is not intended for children under 13. We do not knowingly collect personal information from children."
    },
    {
      id: 8,
      title: "Changes to This Policy",
      content: "Privacy policies may be updated periodically. Updates will be posted on this page with the latest effective date."
    },
    {
      id: 9,
      title: "Contact Us",
      content: "For any questions regarding this Privacy Policy, contact us at: contact@wellnessworld.com."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Main */}
      <main className="flex-grow">
        <div className="container max-w-4xl px-4 py-8 mx-auto md:py-12">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-green-600 md:text-5xl">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Last Updated: December 2025</p>
            <div className="w-32 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-green-400 to-teal-400"></div>
          </div>

          <div className="mb-12 overflow-hidden bg-white shadow-lg rounded-2xl">
            <div className="p-8 border-b bg-gradient-to-r from-green-50 to-teal-50">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">Our Commitment to Your Privacy</h2>
              <p className="text-gray-700">
                At WellnessWorld, we are committed to protecting your personal information and being transparent about its use.
              </p>
            </div>

            <div className="p-8">
              {privacySections.map((section, idx) => (
                <div key={section.id} className={`mb-10 ${idx !== privacySections.length - 1 ? 'pb-10 border-b border-gray-100' : ''}`}>
                  <div className="flex items-start mb-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 mr-4 bg-green-100 rounded-full">
                      <span className="font-bold text-green-700">{section.id}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 md:text-2xl">{section.title}</h2>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-700 pl-14">{section.content}</p>
                </div>
              ))}
            </div>
          </div>

        
        </div>
      </main>

     
    </div>
  );
};

export default PrivacyPolicy;
