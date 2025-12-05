import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/apiTags";

// Custom hook to get query params
const useQuery = () => new URLSearchParams(useLocation().search);

// Highlight function
const highlightText = (text, keyword) => {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-yellow-200">{part}</span>
    ) : (
      part
    )
  );
};

const ProductSearchResults = () => {
  const query = useQuery();
  const keyword = query.get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!keyword.trim()) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      setProducts([]);

      try {
        const res = await fetch(
          `${BASE_URL}/search-products.php?q=${encodeURIComponent(keyword)}`
        );
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        } else {
          setError("No products found.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <section className="min-h-screen py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-5 mb-8 sm:flex-row">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            {/* Search Results for <span className="text-blue-600">"{keyword}"</span> */}
          </h2>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Clear Search
          </button>
        </div>

        {/* Messages */}
        {loading && <p className="text-center text-gray-600">Searching...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* PRODUCT GRID FIXED */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col overflow-hidden bg-white border border-gray-200 shadow rounded-xl hover:shadow-lg"
            >
              <a
                href={product.tracking_link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-50"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="object-contain w-full h-48 p-2"
                  loading="lazy"
                />
              </a>

              <div className="flex flex-col flex-grow p-4">
                <h3 className="mb-2 text-sm font-semibold text-gray-900 line-clamp-3">
                  {highlightText(product.name, keyword)}
                </h3>

                <p className="mb-2 text-gray-600 line-clamp-2">
                  {highlightText(
                    product.description || "No description available",
                    keyword
                  )}
                </p>

                {product.price && (
                  <span className="text-lg font-bold text-blue-600">
                    ${parseFloat(product.price).toFixed(2)}
                  </span>
                )}

                <a
                  href={product.tracking_link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 mt-auto text-center text-white rounded bg-emerald-600 hover:bg-emerald-700"
                >
                  Check Price
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductSearchResults;
