import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/apiTags";

const TrendingProducts = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const LOCAL_KEY = "trending_products_cache_Wellness";

    // 1️⃣ Load from LocalStorage instantly (no delay)
    const cachedData = localStorage.getItem(LOCAL_KEY);
    if (cachedData) {
      setTrendingProducts(JSON.parse(cachedData));
      setLoading(false); // don't show loading when cached data exists
    }

    // 2️⃣ Now fetch new data from API (network)
    const fetchTrendingProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/trending-products.php`);
        if (!res.ok) throw new Error("Bad response");

        const data = await res.json();

        // Only update state & cache if API gives valid data
        if (Array.isArray(data) && data.length > 0) {
          setTrendingProducts(data);

          // Save to LocalStorage
          localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
        }
      } catch (error) {
        console.warn("Network error → using local cache:", error);
        // DO NOTHING (cache already loaded)
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
            <span className="text-transparent bg-gradient-to-r from-green-900 to-emerald-400 bg-clip-text">
              Products
            </span>
          </h2>
        </div>

        {/* Loading — only show if no cache */}
        {loading && trendingProducts.length === 0 && (
          <p className="font-medium text-center text-gray-600">Loading...</p>
        )}

        {/* Products */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-md rounded-xl hover:shadow-xl group"
            >
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

              <div className="flex flex-col flex-grow p-4">
                <a
                  href={product.tracking_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="text-sm font-semibold text-gray-900 font-[Fredoka] leading-tight line-clamp-3 hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </a>

                {/* {product.price && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-emerald-700">
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )} */}

                <a
                  href={product.tracking_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 mt-3 text-xs font-semibold text-center text-gray-100 transition border border-blue-200 rounded-lg bg-emerald-500 hover:bg-emerald-600"
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
