import { useState } from 'react';

const TrendingProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Brand Colors
  const brandColors = {
    primary: '#99CC33',  // Vibrant green
    secondary: '#009900', // Medium green
    dark: '#004400',      // Dark green
    accent: '#FF6B6B',    // Coral accent
    light: '#F9FFE3',     // Light cream
    textDark: '#1A3C34',  // Dark text
  };

  const trendingProducts = [
    {
      id: 1,
      name: "Gaiam Essentials Thick Yoga Mat - Non Slip Exercise & Fitness Mat for Men, Women with Easy-Carry Strap, 6mm, Purple",
      image: "https://m.media-amazon.com/images/I/81ZYZw-EXUL._AC_SX679_.jpg",
      price: "$29.99",
      originalPrice: "$49.99",
      discount: "40% OFF",
      affiliateLink: "https://amzn.to/wellness-mat",
      category: "Yoga & Fitness",
      rating: 4.7,
      reviews: 2348,
      benefits: ["Non-slip", "Eco-friendly", "6mm thickness"]
    },
    {
      id: 2,
      name: "Vitafusion Power C Gummy Vitamins, Immune Support Supplement with Vitamin C & Zinc, 500mg per Serving, 70 Count",
      image: "https://m.media-amazon.com/images/I/81vqW-Gr6KL._AC_SX679_.jpg",
      price: "$12.99",
      affiliateLink: "https://amzn.to/vitamin-c-gummies",
      category: "Supplements",
      rating: 4.6,
      reviews: 1892,
      benefits: ["Immune support", "Great taste", "No artificial flavors"]
    },
    {
      id: 3,
      name: "Theragun Mini 2nd Generation - Handheld Percussive Massage Therapy Device, Deep Muscle Treatment for Soreness & Stiffness, Quiet, Portable, Bluetooth Enabled",
      image: "https://m.media-amazon.com/images/I/61s6STmNvzL._AC_SX679_.jpg",
      price: "$199.99",
      originalPrice: "$249.99",
      discount: "20% OFF",
      affiliateLink: "https://amzn.to/theragun-mini",
      category: "Recovery",
      rating: 4.8,
      reviews: 3156,
      benefits: ["Portable", "Quiet", "5-year warranty"]
    },
    {
      id: 4,
      name: "HoMedics TotalClean Air Purifier with True HEPA Filter & UV-C Light, Compact Air Purifier for Home, Office, Bedroom",
      image: "https://m.media-amazon.com/images/I/71StAvsY0PL._AC_SX679_.jpg",
      price: "$89.99",
      affiliateLink: "https://amzn.to/air-purifier",
      category: "Home Wellness",
      rating: 4.4,
      reviews: 1873,
      benefits: ["True HEPA", "UV-C light", "Covers 167 sq ft"]
    },
    {
      id: 5,
      name: "Himalayan Glow Pink Salt Lamp - Handcrafted from Pure Himalayan Salt with Dimmer Switch & Extra Bulbs, 8-10 Inch",
      image: "https://m.media-amazon.com/images/I/71IYM6PBl2L._AC_SX679_.jpg",
      price: "$24.99",
      originalPrice: "$39.99",
      discount: "38% OFF",
      affiliateLink: "https://amzn.to/salt-lamp",
      category: "Home Decor",
      rating: 4.5,
      reviews: 4217,
      benefits: ["Natural air purifier", "Calming glow", "Handcrafted"]
    },
    {
      id: 6,
      name: "Fitbit Charge 6 Fitness Tracker with Google apps, Daily Readiness Score, Sleep tracking and 40+ Exercise modes",
      image: "https://m.media-amazon.com/images/I/71LXY2hN94L._AC_SX679_.jpg",
      price: "$129.95",
      affiliateLink: "https://amzn.to/fitbit-charge6",
      category: "Fitness Tech",
      rating: 4.3,
      reviews: 2894,
      benefits: ["7-day battery", "GPS built-in", "Stress management"]
    },
    {
      id: 7,
      name: "doTERRA Lavender Essential Oil - 15 mL, USDA Certified Pure Therapeutic Grade",
      image: "https://m.media-amazon.com/images/I/61U1+qyLZtL._AC_SX679_.jpg",
      price: "$26.33",
      affiliateLink: "https://amzn.to/lavender-oil",
      category: "Essential Oils",
      rating: 4.8,
      reviews: 15432,
      benefits: ["USDA Certified", "Therapeutic grade", "Multi-purpose"]
    },
    {
      id: 8,
      name: "Gravity Weighted Blanket - 15lbs, Queen Size 60x80 - Premium Glass Beads Filled Cooling Weighted Blanket for Adults",
      image: "https://m.media-amazon.com/images/I/81huycOEtqL._AC_SX679_.jpg",
      price: "$89.99",
      originalPrice: "$129.99",
      discount: "31% OFF",
      affiliateLink: "https://amzn.to/weighted-blanket",
      category: "Sleep",
      rating: 4.6,
      reviews: 8976,
      benefits: ["Deep sleep", "Anxiety relief", "Cooling fabric"]
    },
    {
      id: 9,
      name: "Hydro Flask Standard Mouth Water Bottle - Wide Mouth Flex Cap - Vacuum Insulated Stainless Steel",
      image: "https://m.media-amazon.com/images/I/71VupnUgiyL._AC_SX679_.jpg",
      price: "$34.95",
      affiliateLink: "https://amzn.to/hydro-flask",
      category: "Hydration",
      rating: 4.7,
      reviews: 15789,
      benefits: ["24-hour cold", "12-hour hot", "BPA-free"]
    },
    {
      id: 10,
      name: "Nature's Bounty Melatonin 5mg, Supports Sleep Quality, 240 Quick Release Softgels",
      image: "https://m.media-amazon.com/images/I/81xZK5d9DqL._AC_SX679_.jpg",
      price: "$14.99",
      originalPrice: "$19.99",
      discount: "25% OFF",
      affiliateLink: "https://amzn.to/melatonin",
      category: "Sleep Aids",
      rating: 4.5,
      reviews: 23415,
      benefits: ["Quick release", "Non-habit forming", "Drug-free sleep"]
    },
    {
      id: 11,
      name: "Sunny Health & Fitness Squat Assist Row-N-Ride™ Trainer for Glutes Workout",
      image: "https://m.media-amazon.com/images/I/718JENX2ktL._AC_SX679_.jpg",
      price: "$199.99",
      affiliateLink: "https://amzn.to/squat-trainer",
      category: "Fitness Equipment",
      rating: 4.4,
      reviews: 2341,
      benefits: ["Low impact", "Full body", "Compact design"]
    },
    {
      id: 12,
      name: "Pure Enrichment PureRelief Neck and Back Massager with Heat - Shiatsu Massage Pillow for Shoulders",
      image: "https://m.media-amazon.com/images/I/71EnPLmhKGL._AC_SX679_.jpg",
      price: "$59.99",
      originalPrice: "$79.99",
      discount: "25% OFF",
      affiliateLink: "https://amzn.to/neck-massager",
      category: "Massage",
      rating: 4.3,
      reviews: 16789,
      benefits: ["Shiatsu nodes", "Heat therapy", "Versatile use"]
    }
  ];

  return (
    <section 
      className="py-16"
      style={{ 
        background: `linear-gradient(135deg, ${brandColors.light} 0%, #FFFFFF 50%, ${brandColors.light} 100%)`
      }}
    >
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full" 
               style={{ backgroundColor: `${brandColors.primary}20` }}>
            <svg className="w-8 h-8" style={{ color: brandColors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h2 className="mb-4 text-4xl font-bold md:text-5xl font-[Fredoka]" style={{ color: brandColors.textDark }}>
            Trending <span style={{ color: brandColors.primary }}>Wellness</span> Products
          </h2>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: brandColors.textDark }}>
            Discover the most popular wellness products transforming health and lifestyle
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border-0 shadow-lg rounded-2xl hover:shadow-2xl group"
              style={{ borderColor: `${brandColors.primary}20` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image Container */}
              <div className="relative flex-grow-0 overflow-hidden">
                <a 
                  href={product.affiliateLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div 
                    className="h-48 bg-gradient-to-br" 
                    style={{ 
                      background: `linear-gradient(135deg, ${brandColors.primary}10 0%, ${brandColors.secondary}10 100%)` 
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-contain w-full h-full p-4 transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </a>
                
                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-3 right-3">
                    <span 
                      className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg"
                      style={{ backgroundColor: brandColors.accent }}
                    >
                      {product.discount}
                    </span>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span 
                    className="px-3 py-1 text-xs font-semibold text-white rounded-full shadow-md"
                    style={{ 
                      background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)` 
                    }}
                  >
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow p-5">
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? '' : 'text-gray-300'}`}
                        style={{ color: i < Math.floor(product.rating) ? '#FFD700' : '' }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium" style={{ color: brandColors.textDark }}>
                    {product.rating}
                  </span>
                  <span className="ml-1 text-sm text-gray-500">
                    ({product.reviews.toLocaleString()})
                  </span>
                </div>

                {/* Product Name */}
                <a 
                  href={product.affiliateLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-grow mb-4 group"
                >
                  <h3 
                    className="text-sm font-semibold leading-tight transition-colors duration-200 font-[Fredoka]"
                    style={{ color: brandColors.textDark }}
                  >
                    {product.name}
                  </h3>
                </a>

                {/* Price */}
                <div className="flex items-center mb-4 space-x-2">
                  <span 
                    className="text-xl font-bold"
                    style={{ color: brandColors.dark }}
                  >
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                      <span className="px-2 py-1 text-xs font-bold rounded" 
                            style={{ 
                              backgroundColor: `${brandColors.accent}20`, 
                              color: brandColors.accent 
                            }}>
                        Save ${(parseFloat(product.originalPrice.replace('$', '')) - parseFloat(product.price.replace('$', ''))).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>

                {/* Benefits */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {product.benefits?.slice(0, 3).map((benefit, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded"
                        style={{ 
                          backgroundColor: `${brandColors.primary}15`,
                          color: brandColors.dark
                        }}
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="mt-auto">
                  <div className="flex gap-2">
                    <a
                      href={product.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-3 text-sm font-bold text-center text-white transition-all duration-200 rounded-lg shadow-sm hover:shadow-md"
                      style={{ 
                        background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)` 
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Shop on Amazon
                      </div>
                    </a>
                    <button 
                      className="p-3 transition-colors duration-200 rounded-lg hover:shadow"
                      style={{ 
                        backgroundColor: `${brandColors.primary}15`,
                        color: brandColors.primary
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Additional CTA */}
                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 mt-2 text-xs font-semibold text-center transition-all duration-200 border rounded-lg hover:shadow-sm"
                    style={{ 
                      borderColor: brandColors.primary,
                      color: brandColors.primary
                    }}
                  >
                    View Details & Customer Reviews
                  </a>
                </div>
              </div>

              {/* Hover Overlay Effect */}
              {hoveredProduct === product.id && (
                <div 
                  className="absolute inset-0 transition-opacity duration-300 pointer-events-none opacity-10"
                  style={{ 
                    background: `radial-gradient(circle at center, ${brandColors.primary} 0%, transparent 70%)` 
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <a
            href="/all-wellness-products"
            className="inline-flex items-center gap-3 px-8 py-4 font-bold text-white transition-all duration-300 rounded-full shadow-lg hover:shadow-xl group"
            style={{ 
              background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)` 
            }}
          >
            <span>View All Wellness Products</span>
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <p className="mt-4 text-sm text-gray-600">
            Affiliate Disclosure: We earn from qualifying purchases. Prices may vary.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;