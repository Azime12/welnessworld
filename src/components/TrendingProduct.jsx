import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/apiTags";

const TrendingProducts = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Trending Products
  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        // const res = await fetch("http://localhost/toyvista/api/trending-products.php");
        const res = await fetch(`${BASE_URL}/trending-products.php`);

        const data = await res.json();
        setTrendingProducts(data);
      } catch (error) {
        console.error("Error fetching trending products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <section className="py-12 bg-gradient-to-b from-white via-blue-50/40 to-white">
      <div className="container px-3 mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl font-[Fredoka]">
            Trending{" "}
            <span className="text-transparent bg-gradient-to-r from-[#99CC33] to-[#004400] bg-clip-text">
              Products
            </span>
          </h2>
        </div>

        {/* Loading */}
        {loading && (
          <p className="font-medium text-center text-gray-600">Loading...</p>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md rounded-xl hover:shadow-xl group"
            >
              {/* Product Image */}
              <a
                href={product.tracking_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-br from-blue-50 to-green-50"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="object-contain w-full h-40 transition-transform duration-300 sm:h-48 group-hover:scale-105"
                  loading="lazy"
                />
              </a>

              {/* Product Info */}
              <div className="flex flex-col flex-grow p-4">
                {/* Product Name */}
                <a
                  href={product.tracking_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="text-sm font-semibold text-gray-900 font-[Fredoka] leading-tight line-clamp-3 hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </a>

                {/* Price */}
                {product.price && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      {/* <span className="text-xl font-bold text-[#004400]">
                        ${parseFloat(product.price).toFixed(2)}
                      </span> */}

                      {/* {parseFloat(product.price) <= 30 && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                          Great Deal
                        </span>
                      )} */}
                    </div>
                  </div>
                )}

                {/* View Details Button */}
                <a
                  href={product.tracking_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 mt-3 text-xs font-semibold text-center transition border border-blue-200 rounded-lg text-[#5e8a06]  hover:bg-blue-50"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
