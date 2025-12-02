import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../constants/apiTags';

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Brand Colors
  const brandColors = {
    primary: '#99CC33',
    secondary: '#009900',
    dark: '#004400',
    accent: '#FF6B6B',
    light: '#F9FFE3',
    textDark: '#1A3C34',
    textLight: '#FFFFFF'
  };

  // Fallback wellness categories in case API fails
  const fallbackCategories = [
    { id: 1, name: "Yoga & Meditation", slug: "yoga-meditation", icon: "🧘‍♀️" },
    { id: 2, name: "Supplements", slug: "supplements", icon: "💊" },
    { id: 3, name: "Fitness Equipment", slug: "fitness-equipment", icon: "🏋️‍♂️" },
    { id: 4, name: "Essential Oils", slug: "essential-oils", icon: "🌿" },
    { id: 5, name: "Sleep & Relaxation", slug: "sleep-relaxation", icon: "😴" },
    { id: 6, name: "Mental Wellness", slug: "mental-wellness", icon: "🧠" },
    { id: 7, name: "Home Wellness", slug: "home-wellness", icon: "🏠" },
    { id: 8, name: "Personal Care", slug: "personal-care", icon: "✨" },
    { id: 9, name: "Weight Management", slug: "weight-management", icon: "⚖️" },
    { id: 10, name: "Digestive Health", slug: "digestive-health", icon: "🩺" },
    { id: 11, name: "Bone & Joint", slug: "bone-joint", icon: "🦴" },
    { id: 12, name: "Heart Health", slug: "heart-health", icon: "❤️" },
    { id: 13, name: "Immunity Boosters", slug: "immunity-boosters", icon: "🛡️" },
    { id: 14, name: "Energy & Vitality", slug: "energy-vitality", icon: "⚡" },
    { id: 15, name: "Stress Relief", slug: "stress-relief", icon: "🌊" },
    { id: 16, name: "Beauty Supplements", slug: "beauty-supplements", icon: "💄" },
    { id: 17, name: "Prenatal Wellness", slug: "prenatal-wellness", icon: "🤰" },
    { id: 18, name: "Senior Wellness", slug: "senior-wellness", icon: "👵" },
    { id: 19, name: "Sports Nutrition", slug: "sports-nutrition", icon: "🏃‍♂️" },
    { id: 20, name: "Holistic Healing", slug: "holistic-healing", icon: "🌈" }
  ];

  // Available items per page options
  const itemsPerPageOptions = [8, 12, 16, 20, 24];

  // Fetch categories from API with pagination
  const fetchCategories = async (page = currentPage, limit = itemsPerPage) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching wellness categories: Page ${page}, Limit ${limit}`);
      const response = await axios.get(`${BASE_URL}/categories.php`, {
        params: { 
          page: page,
          limit: limit
        }
      });
      
      console.log('API Response:', response.data);
      
      // Handle different response formats
      if (response.data && Array.isArray(response.data)) {
        setCategories(response.data);
        setTotalPages(Math.max(1, Math.ceil((response.data.length * 2) / limit)));
        setTotalItems(response.data.length);
      } else if (response.data && response.data.categories) {
        setCategories(response.data.categories || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalItems(response.data.totalItems || response.data.categories?.length || 0);
      } else {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        setCategories(fallbackCategories.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(fallbackCategories.length / limit));
        setTotalItems(fallbackCategories.length);
        setError('API returned empty data. Using wellness categories.');
      }
      
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories from API. Using wellness categories.');
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setCategories(fallbackCategories.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(fallbackCategories.length / itemsPerPage));
      setTotalItems(fallbackCategories.length);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchCategories(page, itemsPerPage);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setItemsPerPage(newLimit);
    setCurrentPage(1);
    fetchCategories(1, newLimit);
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  useEffect(() => {
    fetchCategories(currentPage, itemsPerPage);
  }, []);

  // Generate slug if not provided
  const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // Get slug from category
  const getSlug = (category) => {
    return category.slug || generateSlug(category.name);
  };

  // Get icon for category
  const getIcon = (category) => {
    return category.icon || fallbackCategories.find(fc => fc.name === category.name)?.icon || '🌱';
  };

  if (loading) {
    return (
      <section style={{ background: `linear-gradient(135deg, ${brandColors.light} 0%, #FFFFFF 100%)` }}>
        <div 
          className="py-8 text-center" 
          style={{ 
            background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`,
            color: brandColors.textLight
          }}
        >
          <h2 className="text-2xl font-bold tracking-wide md:text-3xl font-[Fredoka]">
            Wellness Categories
          </h2>
          <p className="mt-2 text-sm opacity-90">
            Explore our holistic health categories
          </p>
        </div>

        <div className="container px-4 py-16 mx-auto">
          <div className="flex flex-col items-center justify-center">
            <div 
              className="w-16 h-16 mb-6 border-4 rounded-full border-t-transparent animate-spin"
              style={{ borderColor: brandColors.primary }}
            ></div>
            <p className="text-lg font-medium" style={{ color: brandColors.textDark }}>
              Loading wellness categories...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: `linear-gradient(135deg, ${brandColors.light} 0%, #FFFFFF 50%, ${brandColors.light} 100%)` }}>
      {/* Section Header */}
      <div 
        className="py-8 text-center" 
        style={{ 
          background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`,
          color: brandColors.textLight
        }}
      >
        <div className="container mx-auto">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl font-[Fredoka]">
            Wellness <span style={{ color: '#FFD700' }}>Categories</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg opacity-95">
            Browse through our carefully curated wellness categories
          </p>
        </div>
      </div>

      <div className="container px-4 py-12 mx-auto">
        {/* Error message if API failed */}
        {error && (
          <div 
            className="p-4 mb-8 rounded-lg"
            style={{ 
              backgroundColor: `${brandColors.accent}15`,
              borderLeft: `4px solid ${brandColors.accent}`,
              color: brandColors.dark
            }}
          >
            <p className="flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </p>
          </div>
        )}

        {/* Pagination Controls - Top */}
        <div className="flex flex-col items-center justify-between mb-8 space-y-4 md:flex-row md:space-y-0">
          <div className="text-sm" style={{ color: brandColors.textDark }}>
            Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-semibold">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{' '}
            <span className="font-semibold">{totalItems}</span> categories
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm" style={{ color: brandColors.textDark }}>Per page:</span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: brandColors.primary,
                  color: brandColors.textDark
                }}
              >
                {itemsPerPageOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((category, index) => {
            const slug = getSlug(category);
            const icon = getIcon(category);
            const isFeatured = index < 10;
            
            return (
              <Link
                key={category.id || category.name}
                to={`/wellness-categories/${slug}`}
                state={{ category }}
                className="relative flex flex-col items-center justify-center p-6 transition-all duration-300 bg-white shadow-lg group rounded-xl hover:shadow-2xl hover:scale-105"
                style={{ 
                  border: `2px solid ${isFeatured ? brandColors.primary : `${brandColors.primary}30`}`,
                  backgroundColor: isFeatured ? `${brandColors.primary}10` : 'white'
                }}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="absolute transform -translate-x-1/2 -top-3 left-1/2">
                    <span 
                      className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg"
                      style={{ 
                        background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)` 
                      }}
                    >
                      Featured
                    </span>
                  </div>
                )}
                
                {/* Category Icon */}
                {/* <div 
                  className="flex items-center justify-center w-16 h-16 mb-4 text-3xl transition-transform duration-300 rounded-full group-hover:scale-110"
                  style={{ 
                    backgroundColor: `${brandColors.primary}15`,
                    color: brandColors.primary
                  }}
                >
                  {icon}
                </div> */}
                
                {/* Category Name */}
                <h3 
                  className="mb-2 text-lg font-bold text-center font-[Fredoka]"
                  style={{ color: brandColors.textDark }}
                >
                  {category.name}
                </h3>
                
                {/* Explore Button */}
                <div 
                  className="px-4 py-2 mt-2 text-sm font-semibold transition-all duration-200 rounded-lg group-hover:shadow-md"
                  style={{ 
                    backgroundColor: `${brandColors.primary}15`,
                    color: brandColors.primary
                  }}
                >
                  Explore →
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pagination Controls - Bottom */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center justify-between mt-12 space-y-4 md:flex-row md:space-y-0">
            <div className="text-sm" style={{ color: brandColors.textDark }}>
              Page <span className="font-semibold">{currentPage}</span> of{' '}
              <span className="font-semibold">{totalPages}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center w-10 h-10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
                style={{ 
                  backgroundColor: currentPage === 1 ? '#f3f4f6' : brandColors.light,
                  color: brandColors.textDark,
                  border: `1px solid ${brandColors.primary}30`
                }}
              >
                &lt;
              </button>
              
              {/* Page Numbers */}
              {generatePageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && handlePageChange(page)}
                  disabled={page === '...'}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
                    currentPage === page
                      ? 'font-semibold shadow-md'
                      : page === '...'
                      ? 'cursor-default'
                      : 'hover:shadow-sm'
                  }`}
                  style={{ 
                    backgroundColor: currentPage === page 
                      ? brandColors.primary 
                      : 'white',
                    color: currentPage === page 
                      ? brandColors.textLight 
                      : brandColors.textDark,
                    border: currentPage === page 
                      ? 'none' 
                      : `1px solid ${brandColors.primary}30`
                  }}
                >
                  {page}
                </button>
              ))}
              
              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center w-10 h-10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"
                style={{ 
                  backgroundColor: currentPage === totalPages ? '#f3f4f6' : brandColors.light,
                  color: brandColors.textDark,
                  border: `1px solid ${brandColors.primary}30`
                }}
              >
                &gt;
              </button>
            </div>
          </div>
        )}

        {/* Wellness Journey Info
        <div className="p-6 mt-8 text-center rounded-xl" style={{ backgroundColor: `${brandColors.primary}10` }}>
          <h4 className="mb-3 text-lg font-bold" style={{ color: brandColors.dark }}>
            🌿 Your Wellness Journey Starts Here
          </h4>
          <p className="max-w-2xl mx-auto text-sm" style={{ color: brandColors.textDark }}>
            Each category represents a step in your holistic health journey. From mental wellness to physical fitness, 
            we provide natural, effective solutions for every aspect of your wellbeing.
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default Categories;