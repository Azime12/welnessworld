// src/pages/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/apiTags';
import { Search, Filter, Star, TrendingUp, Package, Sparkles, Loader, ChevronLeft } from 'lucide-react';

const ProductList = () => {
  const { slug } = useParams(); // subcategory slug from URL
  const location = useLocation();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subcategory, setSubcategory] = useState(location.state?.subcategory || null);
  const [parentCategory, setParentCategory] = useState(location.state?.parentCategory || null);
  const [totalPages, setTotalPages] = useState(1);
  
  const productsPerPage = 20;

  // Fetch subcategory and products
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // First, try to get subcategory by slug
        let subcategoryData = subcategory;
        
        if (!subcategoryData && slug) {
          const subRes = await axios.get(`${BASE_URL}/subcategories.php`, {
            params: { slug }
          });
          
          if (subRes.data && subRes.data.length > 0) {
            subcategoryData = subRes.data[0];
            setSubcategory(subcategoryData);
            
            // Fetch parent category if we have parent_category_id
            if (subcategoryData.parent_category_id) {
              try {
                const catRes = await axios.get(`${BASE_URL}/categories.php`, {
                  params: { id: subcategoryData.parent_category_id }
                });
                if (catRes.data) {
                  setParentCategory(catRes.data);
                }
              } catch (catErr) {
                console.error("Error fetching parent category:", catErr);
              }
            }
          }
        }

        // Now fetch products for this subcategory
        const prodRes = await axios.get(`${BASE_URL}/products.php`);
        
        if (prodRes.data && Array.isArray(prodRes.data)) {
          // Filter products by subcategory if we have one
          let filteredProducts = prodRes.data;
          
          if (subcategoryData && subcategoryData.id) {
            filteredProducts = prodRes.data.filter(product => 
              product.subcategory_id1 === subcategoryData.id.toString() ||
              product.subcategory_id === subcategoryData.id.toString()
            );
          }
          
          // Format products with defaults
          const formattedProducts = filteredProducts.map(product => ({
            id: product.id,
            name: product.name || '',
            description: product.description || '',
            price: product.price ? `$${parseFloat(product.price).toFixed(2)}` : '$0.00',
            originalPrice: product.original_price ? `$${parseFloat(product.original_price).toFixed(2)}` : null,
            rating: 4.0 + Math.random() * 1.0, // Generate random rating between 4.0-5.0
            reviewCount: Math.floor(Math.random() * 500) + 50,
            image: product.image_url || `https://via.placeholder.com/300x300/1e88e5/ffffff?text=${encodeURIComponent(product.name?.substring(0, 10) || 'Toy')}`,
            slug: product.slug || `product-${product.id}`,
            asin: product.asin || '',
            tracking_link: product.tracking_link || '',
            is_trending: product.is_trending || 0,
            created_at: product.created_at,
            features: [
              'Premium quality materials',
              'Safe for children',
              'Educational and fun',
              'Great value for money'
            ],
            specifications: [
              { label: 'Material', value: 'High-quality plastic' },
              { label: 'Age Range', value: '4+ years' },
              { label: 'Batteries', value: 'Not required' }
            ]
          }));
          
          setProducts(formattedProducts);
          
          // Calculate total pages
          const total = Math.ceil(formattedProducts.length / productsPerPage);
          setTotalPages(total > 0 ? total : 1);
        } else {
          throw new Error("No products found");
        }

      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        
        // Fallback to mock data from your API sample
        const apiProducts = [
          // Your API data here (first 20 products from your sample)
          {
            "id": "3926",
            "name": "LEGO Friends Friendship Tree House Hangout - Building Toy Playset for Kids, Girls and Boys, Ages 8+ - Pretend Play Gift Idea for Birthdays - with 4 Minidolls and 2 Animal Figures - 42652",
            "description": "",
            "price": "55.99",
            "tracking_link": "https://www.amazon.com/dp/B0DJ1B5GGG?tag=toyvista101-20",
            "asin": "B0DJ1B5GGG",
            "image_url": "https://m.media-amazon.com/images/I/51yY00zisBL._SL500_.jpg",
            "subcategory_id": null,
            "created_at": "2025-04-20 20:26:37",
            "subcategory_id1": "41",
            "subcategory_id2": null,
            "is_trending": "0",
            "slug": "lego-friends-friendship-tree-house-hangout-building-toy-playset-for-kids-girls-and-boys-ages-8-pretend-play-gift-idea-for-birthdays-with-4-minidolls-and-2-animal-figures-42652"
          },
          // Add more products from your API data...
        ];
        
        const formattedProducts = apiProducts.map(product => ({
          id: product.id,
          name: product.name || '',
          description: product.description || 'High-quality building toy for creative play',
          price: product.price ? `$${parseFloat(product.price).toFixed(2)}` : '$0.00',
          rating: 4.0 + Math.random() * 1.0,
          reviewCount: Math.floor(Math.random() * 500) + 50,
          image: product.image_url || `https://via.placeholder.com/300x300/1e88e5/ffffff?text=Toy`,
          slug: product.slug || `product-${product.id}`,
          asin: product.asin || '',
          tracking_link: product.tracking_link || '',
          is_trending: product.is_trending || 0,
          created_at: product.created_at,
          features: [
            'Premium quality materials',
            'Safe for children',
            'Educational and fun',
            'Great value for money'
          ],
          specifications: [
            { label: 'Material', value: 'High-quality plastic' },
            { label: 'Age Range', value: '4+ years' },
            { label: 'Batteries', value: 'Not required' }
          ]
        }));
        
        setProducts(formattedProducts);
        setTotalPages(3);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, location.state]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle sort
  const getSortedAndPaginatedProducts = () => {
    let sortedProducts = [...products];
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        sortedProducts.sort((a, b) => {
          const priceA = parseFloat(a.price.replace('$', '')) || 0;
          const priceB = parseFloat(b.price.replace('$', '')) || 0;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => {
          const priceA = parseFloat(a.price.replace('$', '')) || 0;
          const priceB = parseFloat(b.price.replace('$', '')) || 0;
          return priceB - priceA;
        });
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sortedProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      default:
        // Featured - sort by trending first
        sortedProducts.sort((a, b) => (b.is_trending || 0) - (a.is_trending || 0));
        break;
    }
    
    // Apply pagination
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    
    return sortedProducts.slice(startIndex, endIndex);
  };

  // Render star ratings
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container flex flex-col items-center justify-center min-h-screen px-4 mx-auto">
          <Loader className="w-12 h-12 mb-4 text-blue-600 animate-spin" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Header */}
      {/* <div className="py-1 text-gray-900 md:py-5">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="mb-4 md:mb-0">
              <nav className="flex mb-2 space-x-2 text-sm">
                <Link to="/" className="text-blue-600 hover:text-blue-800">
                  Home
                </Link>
                {parentCategory && (
                  <>
                    <span className="text-gray-400">/</span>
                    <Link 
                      to={`/category/${parentCategory.slug}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {parentCategory.name}
                    </Link>
                  </>
                )}
                {subcategory && (
                  <>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-700">{subcategory.name}</span>
                  </>
                )}
              </nav>
              <h1 className="text-2xl font-bold md:text-3xl">
                {subcategory?.name || 'All Products'}
              </h1>
              <p className="mt-2 text-gray-600">
                {products.length} products found
              </p>
            </div>
            
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      {/* Error Message */}
      {error && (
        <div className="container px-4 mx-auto mt-6">
          <div className="p-4 text-yellow-700 bg-yellow-100 border border-yellow-400 rounded-lg">
            <p className="font-medium">⚠️ {error}</p>
            <p className="mt-1 text-sm">Showing available products</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container px-4 py-8 mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search within this category..."
              className="w-full px-4 py-3 pl-12 pr-16 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
            <button
              type="submit"
              className="absolute px-4 py-2 text-sm font-medium text-white transform -translate-y-1/2 bg-blue-600 rounded-md right-2 top-1/2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search
            </button>
          </form>
        </div>

        {/* Filters and Sort Bar */}
        <div className="flex flex-col items-start justify-between p-4 mb-8 bg-white rounded-lg shadow-sm md:flex-row md:items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Filter className="w-5 h-5 mr-2 text-gray-600" />
            <h3 className="font-semibold text-gray-700">Filters & Sorting</h3>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
            
            <div className="items-center hidden space-x-2 text-sm text-gray-600 md:flex">
              <TrendingUp className="w-4 h-4" />
              <span>Trending Now</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {getSortedAndPaginatedProducts().map((product) => (
            <div 
              key={product.id}
              className="overflow-hidden transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-contain w-full h-full p-4 transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x300/1e88e5/ffffff?text=Toy";
                  }}
                />
                {product.is_trending ? (
                  <div className="absolute px-2 py-1 text-xs font-bold text-white bg-yellow-500 rounded top-2 right-2">
                    Trending
                  </div>
                ) : (
                  <div className="absolute px-2 py-1 text-xs font-bold text-white bg-green-500 rounded top-2 right-2">
                    New
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <Link 
                  to={`/product/${product.slug}`}
                  state={{ 
                    product,
                    subcategory,
                    parentCategory 
                  }}
                  className="block mb-2 group"
                >
                  <h3 className="text-sm font-semibold text-gray-800 transition-colors line-clamp-2 group-hover:text-blue-600">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                      {product.description || 'High-quality toy for creative play'}
                    </p>
                  )}
                </Link>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-blue-600">
                    {product.price}
                  </span>
                  {renderStars(product.rating)}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-500">
                    {product.reviewCount} reviews
                  </span>
                  {product.asin && (
                    <span className="text-xs text-gray-400">ASIN: {product.asin}</span>
                  )}
                </div>
                
                <Link 
                  to={`/product/${product.slug}/detail`}
                  state={{ 
                    product,
                    subcategory,
                    parentCategory 
                  }}
                  className="block w-full px-4 py-2 font-semibold text-center text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-12 space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-blue-600 transition-colors bg-white border border-blue-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 5 && (
              <>
                <span className="px-2 py-2">...</span>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-blue-600 transition-colors bg-white border border-blue-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50"
            >
              Next
            </button>
          </div>
        )}

      </main>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProductList;