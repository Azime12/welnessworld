// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/apiTags';
import { ExternalLink, Star, Truck, Shield, ChevronRight, Package, Sparkles, Heart, Share2, Check, AlertCircle, ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);

      try {
        // First, check if product data was passed in location.state
        const productFromState = location.state?.product;
        
        if (productFromState) {
          // If product data was passed from ProductList, use it
          setProduct(productFromState);
          
          // Fetch related products based on subcategory
          if (location.state?.subcategory?.id) {
            const prodRes = await axios.get(`${BASE_URL}/products.php`);
            if (prodRes.data && Array.isArray(prodRes.data)) {
              const sameCategoryProducts = prodRes.data
                .filter(p => 
                  p.id !== productFromState.id && 
                  (p.subcategory_id1 === location.state.subcategory.id.toString() ||
                   p.subcategory_id === location.state.subcategory.id.toString())
                )
                .slice(0, 5)
                .map(p => ({
                  id: p.id,
                  slug: p.slug || `product-${p.id}`,
                  name: p.name || '',
                  price: p.price ? `$${parseFloat(p.price).toFixed(2)}` : '$0.00',
                  image: p.image_url || `https://via.placeholder.com/300x300/1e88e5/ffffff?text=Toy`,
                  rating: 4.0 + Math.random() * 1.0
                }));
              
              setRelatedProducts(sameCategoryProducts);
            }
          }
        } else {
          // Fetch product by slug from API
          const prodRes = await axios.get(`${BASE_URL}/products.php`);
          
          if (prodRes.data && Array.isArray(prodRes.data)) {
            // Find product by slug
            const foundProduct = prodRes.data.find(p => 
              p.slug === slug || p.id.toString() === slug
            );
            
            if (foundProduct) {
              const formattedProduct = {
                id: foundProduct.id,
                name: foundProduct.name || '',
                description: foundProduct.description || 'High-quality building toy for creative play. Perfect for kids and collectors alike.',
                price: foundProduct.price ? `$${parseFloat(foundProduct.price).toFixed(2)}` : '$0.00',
                rating: 4.0 + Math.random() * 1.0,
                reviewCount: Math.floor(Math.random() * 500) + 50,
                features: [
                  'Premium quality materials',
                  'Safe for children of all ages',
                  'Interactive and educational',
                  'Easy to assemble',
                  'Great value for money'
                ],
                specifications: [
                  { label: 'Material', value: 'High-quality plastic' },
                  { label: 'Dimensions', value: 'Varies by set' },
                  { label: 'Age Range', value: '4+ years' },
                  { label: 'Pieces', value: 'Varies by set' },
                  { label: 'Theme', value: 'Friends Collection' },
                  { label: 'Manufacturer', value: 'LEGO' }
                ],
                images: [
                  foundProduct.image_url || "https://via.placeholder.com/500x500/1e88e5/ffffff?text=Toy",
                  "https://via.placeholder.com/500x500/4CAF50/ffffff?text=Side+View",
                  "https://via.placeholder.com/500x500/FF9800/ffffff?text=In+Action",
                  "https://via.placeholder.com/500x500/E91E63/ffffff?text=Packaging"
                ],
                slug: foundProduct.slug || `product-${foundProduct.id}`,
                asin: foundProduct.asin || '',
                tracking_link: foundProduct.tracking_link || `https://www.amazon.com/dp/${foundProduct.asin}?tag=toyvista101-20`,
                created_at: foundProduct.created_at,
                is_trending: foundProduct.is_trending || 0
              };
              
              setProduct(formattedProduct);
              
              // Fetch related products
              const related = prodRes.data
                .filter(p => 
                  p.id !== foundProduct.id && 
                  (p.subcategory_id1 === foundProduct.subcategory_id1 ||
                   p.subcategory_id === foundProduct.subcategory_id)
                )
                .slice(0, 5)
                .map(p => ({
                  id: p.id,
                  slug: p.slug || `product-${p.id}`,
                  name: p.name || '',
                  price: p.price ? `$${parseFloat(p.price).toFixed(2)}` : '$0.00',
                  image: p.image_url || `https://via.placeholder.com/300x300/1e88e5/ffffff?text=Toy`,
                  rating: 4.0 + Math.random() * 1.0
                }));
              
              setRelatedProducts(related);
            } else {
              throw new Error("Product not found");
            }
          }
        }

      } catch (error) {
        console.error("Error loading product:", error);
        
        // Fallback to mock data from API sample
        const mockProduct = {
          id: "3926",
          name: "LEGO Friends Friendship Tree House Hangout - Building Toy Playset for Kids, Girls and Boys, Ages 8+ - Pretend Play Gift Idea for Birthdays - with 4 Minidolls and 2 Animal Figures - 42652",
          description: "High-quality LEGO Friends building set with tree house hangout. Perfect for creative play and birthday gifts.",
          price: "$55.99",
          rating: 4.5,
          reviewCount: 234,
          features: [
            'Includes 4 minidolls and 2 animal figures',
            'Tree house with multiple levels',
            'Pretend play accessories',
            'High-quality LEGO pieces',
            'Educational and fun'
          ],
          specifications: [
            { label: 'Material', value: 'Plastic' },
            { label: 'Dimensions', value: '15 x 10 x 8 inches' },
            { label: 'Age Range', value: '8+ years' },
            { label: 'Pieces', value: '426 pieces' },
            { label: 'Theme', value: 'LEGO Friends' },
            { label: 'Manufacturer', value: 'LEGO' }
          ],
          images: [
            "https://m.media-amazon.com/images/I/51yY00zisBL._SL500_.jpg",
            "https://via.placeholder.com/500x500/4CAF50/ffffff?text=Side+View",
            "https://via.placeholder.com/500x500/FF9800/ffffff?text=Playing",
            "https://via.placeholder.com/500x500/E91E63/ffffff?text=Accessories"
          ],
          slug: slug,
          asin: "B0DJ1B5GGG",
          tracking_link: "https://www.amazon.com/dp/B0DJ1B5GGG?tag=toyvista101-20",
          created_at: "2025-04-20 20:26:37",
          is_trending: 0
        };
        
        setProduct(mockProduct);
        
        // Mock related products
        const mockRelated = [
          {
            id: "3927",
            slug: "lego-friends-paisley-s-room-building-toy-pretend-play-set-for-kids-girls-and-boys-ages-6-with-2-minidolls-pet-bunny-figure-and-plushie-style-piece-gift-idea-for-birthdays-42647",
            name: "LEGO Friends Paisley's Room Building Toy",
            price: "$16.99",
            image: "https://m.media-amazon.com/images/I/51MyuvYJ1TL._SL500_.jpg",
            rating: 4.7
          },
          {
            id: "3928",
            slug: "lego-friends-guinea-pig-playground-building-toy-pretend-play-set-for-kids-girls-and-boys-ages-5-with-2-minidolls-and-2-animal-toys-gift-idea-for-birthdays-42640",
            name: "LEGO Friends Guinea Pig Playground",
            price: "$9.97",
            image: "https://m.media-amazon.com/images/I/5133qimRfcL._SL500_.jpg",
            rating: 4.3
          },
          {
            id: "3929",
            slug: "lego-friends-botanical-garden-building-toy-set-a-creative-project-for-ages-12-build-and-display-a-detailed-greenhouse-scene-a-gift-for-kids-and-teens-who-love-flowers-and-plants-41757",
            name: "LEGO Friends Botanical Garden",
            price: "$79.99",
            image: "https://m.media-amazon.com/images/I/51MC6B-3vCL._SL500_.jpg",
            rating: 4.8
          },
          {
            id: "3930",
            slug: "lego-friends-friendship-camper-van-adventure-toy-building-set-pretend-play-set-for-kids-girls-and-boys-ages-7-gift-idea-for-birthday-with-3-minidolls-and-ferret-figure-42663",
            name: "LEGO Friends Friendship Camper Van",
            price: "$50.99",
            image: "https://m.media-amazon.com/images/I/51LH8BdhBCL._SL500_.jpg",
            rating: 4.6
          }
        ];
        
        setRelatedProducts(mockRelated);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug, location.state]);

  // Handle quantity changes
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Handle share product
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out this amazing product: ${product?.name}`,
        url: window.location.href,
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Render star ratings
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-2 font-medium text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <AlertCircle className="w-16 h-16 mb-4 text-red-500" />
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Product Not Found</h1>
        <p className="mb-6 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Go Back
          </button>
          <Link
            to="/"
            className="px-6 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
            <span className="text-gray-400">|</span>
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800"
            >
              Home
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            {location.state?.parentCategory && (
              <>
                <Link
                  to={`/category/${location.state.parentCategory.slug}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {location.state.parentCategory.name}
                </Link>
                <ChevronRight size={14} className="text-gray-400" />
              </>
            )}
            {location.state?.subcategory && (
              <>
                <Link
                  to={`/subcategory/${location.state.subcategory.slug}`}
                  className="text-blue-600 hover:text-blue-800"
                  state={{ 
                    subcategory: location.state.subcategory,
                    parentCategory: location.state.parentCategory 
                  }}
                >
                  {location.state.subcategory.name}
                </Link>
                <ChevronRight size={14} className="text-gray-400" />
              </>
            )}
            <span className="max-w-xs font-medium text-gray-700 truncate">{product.name.substring(0, 50)}...</span>
          </div>
        </div>
      </div> */}

      {/* Main Product Section */}
      <main className="container px-4 py-8 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="overflow-hidden bg-white shadow-lg rounded-xl">
                <img
                  src={product.images?.[selectedImage] || product.image}
                  alt={product.name}
                  className="object-contain w-full h-96"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/500x500/1e88e5/ffffff?text=Toy+Image";
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-3">
                {(product.images || [product.image]).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`overflow-hidden border-2 rounded-lg transition-all duration-200 ${
                      selectedImage === index
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${index + 1}`}
                      className="object-cover w-full h-20"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/500x500/1e88e5/ffffff?text=Toy";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title and Rating */}
              <div>
                <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
                  {product.name}
                </h1>
                <div className="flex items-center mb-4 space-x-4">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-600">
                      {product.reviewCount?.toLocaleString() || '0'} reviews
                    </span>
                  </div>
                  {product.is_trending && (
                    <span className="px-2 py-1 text-xs font-bold text-white bg-yellow-500 rounded">
                      Trending
                    </span>
                  )}
                  {product.asin && (
                    <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                      ASIN: {product.asin}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-blue-600">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Product Description
                </h3>
                <p className="text-gray-700">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="flex-shrink-0 w-5 h-5 mt-0.5 mr-3 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center p-3 space-x-3 bg-white rounded-lg shadow-sm">
                  <Truck className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                    <p className="text-xs text-gray-500">On orders over $25</p>
                  </div>
                </div>
                <div className="flex items-center p-3 space-x-3 bg-white rounded-lg shadow-sm">
                  <Shield className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                    <p className="text-xs text-gray-500">100% Protected</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {/* Amazon Button */}
                <a
                  href={product.tracking_link || `https://www.amazon.com/dp/${product.asin}?tag=toyvista101-20`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <div className="flex items-center justify-center w-full px-6 py-4 space-x-3 font-bold text-black transition-all duration-300 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
                      alt="Amazon"
                      className="h-6"
                    />
                    <span>Check Price on Amazon</span>
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <p className="mt-2 text-xs text-center text-gray-500">
                    *We earn from qualifying purchases
                  </p>
                </a>

                {/* Additional Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center flex-1 px-4 py-3 font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </button>
                  <button className="flex items-center justify-center flex-1 px-4 py-3 font-medium text-white transition-colors bg-pink-500 rounded-lg hover:bg-pink-600">
                    <Heart className="w-5 h-5 mr-2" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-12">
            <div className="p-6 bg-white shadow-sm rounded-xl">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                Specifications
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {(product.specifications || []).map((spec, index) => (
                  <div key={index} className="flex justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-600">{spec.label}</span>
                    <span className="text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Related Products
                </h3>
                {location.state?.subcategory && (
                  <Link
                    to={`/subcategory/${location.state.subcategory.slug}`}
                    state={{ 
                      subcategory: location.state.subcategory,
                      parentCategory: location.state.parentCategory 
                    }}
                    className="flex items-center font-medium text-blue-600 hover:text-blue-800"
                  >
                    View All
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {relatedProducts.map((related) => (
                  <Link
                    key={related.id}
                    to={`/product/${related.slug}`}
                    className="group"
                  >
                    <div className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-xl">
                      <div className="relative h-48 bg-gray-50">
                        <img
                          src={related.image}
                          alt={related.name}
                          className="object-contain w-full h-full p-4 transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/300x300/1e88e5/ffffff?text=Toy";
                          }}
                        />
                        {related.rating >= 4.5 && (
                          <div className="absolute px-2 py-1 text-xs font-bold text-white bg-yellow-500 rounded top-2 right-2">
                            Top Rated
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="mb-2 text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600">
                          {related.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-blue-600">{related.price}</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 text-sm text-gray-600">{related.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

       
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;