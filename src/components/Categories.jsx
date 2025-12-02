import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../constants/apiTags';

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  
  // Fallback list
  const fallbackCategories = [
    { id: 1, name: "Educational Toys", slug: "educational-toys" },
    { id: 2, name: "Educational Tablets", slug: "educational-tablets" },
    { id: 3, name: "LEGO Toys", slug: "lego-toys" },
    { id: 4, name: "Coding Robots", slug: "coding-robots" },
    { id: 5, name: "Superhero Costumes", slug: "superhero-costumes" },
    { id: 6, name: "Hoverboards", slug: "hoverboards" },
    { id: 7, name: "Skateboards", slug: "skateboards" },
    { id: 8, name: "Electric Skateboards", slug: "electric-skateboards" },
    { id: 9, name: "Roller Skates", slug: "roller-skates" },
    { id: 10, name: "Skate Shoes", slug: "skate-shoes" },
    { id: 11, name: "Scooters", slug: "scooters" },
    { id: 12, name: "Electric Scooters", slug: "electric-scooters" },
    { id: 13, name: "Bicycles", slug: "bicycles" },
    { id: 14, name: "Remote Control Toys", slug: "remote-control-toys" },
    { id: 15, name: "Drones", slug: "drones" },
    { id: 16, name: "Drones with Camera", slug: "drones-with-camera" },
    { id: 17, name: "Gaming Laptops", slug: "gaming-laptops" },
    { id: 18, name: "Gaming Desktops", slug: "gaming-desktops" },
    { id: 19, name: "Gaming Consoles", slug: "gaming-consoles" },
    { id: 20, name: "Gaming Tablets", slug: "gaming-tablets" }
  ];

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${BASE_URL}/categories.php`, {
        params: { page: 1, limit: 60 }
      });

      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else if (response.data?.categories) {
        setCategories(response.data.categories);
      } else {
        setCategories(fallbackCategories);
        setError('API returned empty data. Using fallback.');
      }
    } catch (err) {
      console.error(err);
      setCategories(fallbackCategories);
      setError('Failed to load categories. Using fallback.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const generateSlug = (name) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const getSlug = (c) => c.slug || generateSlug(c.name);

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="py-4 text-center bg-gray-900">
          <h2 className="text-xl font-bold tracking-widest text-white md:text-2xl">
            Choose Toys from the <span className="text-cyan-400">Categories</span> below
          </h2>
        </div>

        <div className="container px-4 py-12 mx-auto">
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            <p className="text-gray-600">Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white via-blue-50/30 to-white">

      {/* Header */}
      <div className="py-4 text-center bg-[#004400]">
        <h2 className="text-xl font-bold tracking-widest text-white md:text-2xl">
          Choose Wellness Products from the  
 <span className="text-cyan-400">Categories</span> below
        </h2>
      </div>

      <div className="container px-4 py-8 mx-auto">

        {error && (
          <div className="p-4 mb-6 text-yellow-700 bg-yellow-100 border border-yellow-400 rounded-lg">
            {error}
          </div>
        )}

        {/* ⭐ Two categories per row on small screen */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

          {categories.map((category, idx) => {
            const slug = getSlug(category);
            const isPopular = idx < 8;

            return (
              <Link
                key={category.id || category.name}
                to={`/categories/${slug}`}
                state={{ category }}
                className={`group relative p-4 text-center bg-white border rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-300`}
              >

                {isPopular && (
                  <div className="absolute -top-2 -left-2">
                    <span className="px-2 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r from-[#99CC33] to-[#004400]">
                      Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-center h-full">
                  <span className="text-sm font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-700">
                    {category.name}
                  </span>
                </div>

                <div className="absolute transition-opacity duration-200 -translate-y-1/2 opacity-0 group-hover:opacity-100 right-3 top-1/2">
                  <span className="text-blue-500">&gt;</span>
                </div>

              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Categories;
