// src/pages/SubCategory.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/apiTags';

const SubCategory = () => {
  const { slug } = useParams(); // category slug from URL
  const location = useLocation();
  const navigate = useNavigate();

  // Try to get category data from location.state first
  const categoryFromState = location.state?.category;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(categoryFromState || null);
  const [subcategories, setSubcategories] = useState([]);

  // Fallback subcategories in case API fails
  const fallbackSubcategories = [
    { id: 1, name: "Robotic Kits", slug: "robotic-kits" },
    { id: 2, name: "Coding & Programming Toys", slug: "coding-programming-toys" },
    { id: 3, name: "Microscopes and Lab Sets", slug: "microscopes-and-lab-sets" },
    { id: 4, name: "Engineering & Building Kits", slug: "engineering-building-kits" },
    { id: 5, name: "Math Learning Kits", slug: "math-learning-kits" },
    { id: 6, name: "Alphabet Learning Toys", slug: "alphabet-learning-toys" },
    { id: 7, name: "Spelling & Word Games", slug: "spelling-word-games" },
    { id: 8, name: "Bilingual Learning Toys", slug: "bilingual-learning-toys" },
    { id: 9, name: "Storytelling & Reading Aids", slug: "storytelling-reading-aids" },
    { id: 10, name: "Puzzle & Brain Teasers", slug: "puzzle-brain-teasers" },
  ];

  // Fetch category by slug if not passed in location.state
  useEffect(() => {
    const fetchCategoryBySlug = async () => {
      if (!categoryFromState) {
        try {
          const res = await axios.get(`${BASE_URL}/categories.php`, {
            params: { slug },
          });
          if (res.data) {
            setCategory(res.data);
          } else {
            setError("Category not found");
          }
        } catch (err) {
          console.error("Error fetching category:", err);
          setError("Failed to load category");
        }
      }
    };

    fetchCategoryBySlug();
  }, [slug]);

  // Fetch subcategories when category is ready
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!category?.id) return; // wait for category

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`${BASE_URL}/subcategories.php`, {
          params: { category_id: category.id },
        });

        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setSubcategories(res.data);
        } else {
          setSubcategories(fallbackSubcategories);
          setError("No subcategories found. Showing fallback data.");
        }
      } catch (err) {
        console.error("Error fetching subcategories:", err);
        setSubcategories(fallbackSubcategories);
        setError("Failed to load subcategories. Showing fallback data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [category]);

  // Utility to generate slug if missing
  const getSlug = (subcategory) =>
    subcategory.slug || subcategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  if (loading) {
    return (
      <main className="flex-grow">
        <div className="py-8 text-center text-gray-100 bg-gradient-to-r from-blue-600 to-cyan-600">
          <div className="container px-4 mx-auto">
            <h1 className="text-3xl font-bold tracking-wide">
              {category?.name || 'Loading...'}
            </h1>
          </div>
        </div>

        <div className="container flex flex-col items-center justify-center px-4 py-12 mx-auto">
          <div className="w-12 h-12 mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600">Loading subcategories...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow">
      {/* Header */}
<div className="py-2 text-gray-100 bg-gray-800">
  <div className="container px-4 mx-auto">
    
    {/* Left aligned back button */}
    <div className="text-left">
      <Link 
        to="/categories" 
        className="inline-flex items-center text-sm text-gray-300 hover:text-white"
      >
        <span className="mr-2">&lt;</span>
        Back to Categories
      </Link>
    </div>

    {/* Centered Title */}
    <h1 className="mb-2 text-2xl font-bold tracking-wide text-center">
      {category?.name}
    </h1>

  </div>
</div>


      {/* Error */}
      {error && (
        <div className="container px-4 mx-auto mt-6">
          <div className="p-4 text-yellow-700 bg-yellow-100 border border-yellow-400 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {/* Subcategory Grid */}
      <section className="px-4 py-12">
        <div className="container mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Choose a {category?.name?.toLowerCase()} subcategory
            </h2>
            <p className="mt-2 text-gray-600">{subcategories.length} subcategories available</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {subcategories.map((subcategory, index) => {
              const subSlug = getSlug(subcategory);
              const isPopular = index < 4;

              return (
                <Link
                  key={subcategory.id || subcategory.name}
                  to={`/product/${subSlug}`}
                  state={{ subcategory, parentCategory: category }}
                  className={`group relative p-6 text-center transition-all duration-300 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-300 hover:bg-blue-50 ${isPopular ? 'border-blue-100 bg-blue-50/50' : ''}`}
                >
                  {isPopular && (
                    <div className="absolute -top-2 -left-2">
                      <span className="px-2 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r from-blue-600 to-cyan-500">Popular</span>
                    </div>
                  )}
                  <div className="flex items-center justify-center h-full">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-700">
                        {subcategory.name}
                      </h3>
                      {subcategory.description && <p className="mt-2 text-sm text-gray-600 line-clamp-2">{subcategory.description}</p>}
                      <div className="mt-4 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                        <span className="inline-flex items-center font-medium text-blue-600">
                          View Products <span className="ml-2 text-blue-500">&gt;</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SubCategory;
