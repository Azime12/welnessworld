import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../constants/apiTags';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const LOCAL_KEY = "wellnessCategories";

  const saveToLocal = (data) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  };

  const loadLocal = () => {
    const saved = localStorage.getItem(LOCAL_KEY);
    return saved ? JSON.parse(saved) : null;
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories.php`, {
        params: { page: 1, limit: 60 },
      });

      let apiData = [];
      if (Array.isArray(response.data)) {
        apiData = response.data;
      } else if (response.data?.categories) {
        apiData = response.data.categories;
      }

      if (apiData && apiData.length > 0) {
        setCategories(apiData);
        saveToLocal(apiData); // update localStorage silently
        setError(null);
      } else {
        throw new Error("API returned empty data");
      }
    } catch (err) {
      console.warn("API failed, using localStorage if available", err);

      const local = loadLocal();
      if (local && local.length > 0) {
        setCategories(local);
        setError("Using saved data (API unreachable).");
      } else {
        setCategories([]); // show empty if nothing
        setError("Categories not available.");
      }
    }
  };

  useEffect(() => {
    // Load from localStorage immediately
    const local = loadLocal();
    if (local && local.length > 0) {
      setCategories(local);
    }

    // Fetch API silently
    fetchCategories();
  }, []);

  return (
    <section className="bg-gradient-to-b from-white via-blue-50/30 to-white">
      <div className="py-4 text-center bg-emerald-950">
        <h2 className="text-xl font-bold tracking-widest text-white md:text-2xl">
          Choose Wellness from the <span className="text-emerald-400">Categories</span> below
        </h2>
      </div>

      <div className="container px-4 py-8 mx-auto">
        {error && (
          <div className="p-4 mb-6 text-yellow-700 bg-yellow-100 border border-yellow-400 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((category, idx) => (
            <Link
              key={category.id || category.name}
              to={`/categories/${category.slug}`}
              state={{ category }}
              className="relative p-4 text-center transition-all duration-300 bg-white border rounded-lg shadow-sm group hover:shadow-lg hover:border-blue-300"
            >
              {idx < 8 && (
                <div className="absolute -top-2 -left-2">
                  <span className="px-2 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r from-emerald-600 to-green-500">
                    Popular
                  </span>
                </div>
              )}

              <div className="flex items-center justify-center h-full">
                <span className="text-sm font-semibold text-gray-900 group-hover:text-emerald-700">
                  {category.name}
                </span>
              </div>

              <div className="absolute -translate-y-1/2 opacity-0 group-hover:opacity-100 right-3 top-1/2">
                <span className="text-blue-500">&gt;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
