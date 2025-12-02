// src/pages/SubCategory.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/apiTags";

const SubCategory = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const categoryFromState = location.state?.category;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(categoryFromState || null);
  const [subcategories, setSubcategories] = useState([]);

  // Fallback demo subcategories
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

  // Fetch category by slug if not provided via state
  useEffect(() => {
    const fetchCategoryBySlug = async () => {
      if (!categoryFromState) {
        try {
          const res = await axios.get(`${BASE_URL}/categories.php`, { params: { slug } });
          if (res.data) setCategory(res.data);
          else setError("Category not found");
        } catch (err) {
          console.error(err);
          setError("Failed to load category");
        }
      }
    };

    fetchCategoryBySlug();
  }, [slug]);

  // Fetch subcategories
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!category?.id) return;

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
        }
      } catch (err) {
        console.error(err);
        setSubcategories(fallbackSubcategories);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [category]);

  const getSlug = (subcategory) =>
    subcategory.slug || subcategory.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  /**
   * ============================
   *        LOADING UI
   * ============================
   */
  if (loading) {
    return (
      <main className="flex-grow">
        <div className="py-8 text-center text-white bg-[#004400]">
          <h1 className="text-3xl font-semibold">{category?.name || "Loading..."}</h1>
        </div>

        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-[#009900] rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading subcategories...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow">

      {/* Header */}
      <div className="py-4 text-white bg-[#004400] shadow-md">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between">

            {/* Back Button - left aligned */}
            <button
              onClick={() => navigate("/categories")}
              className="text-sm transition text-[#99CC33] hover:text-white"
            >
              &lt; Back
            </button>

            {/* Center Title */}
            <h1 className="text-xl font-bold text-center">{category?.name}</h1>

            {/* Invisible placeholder for balance */}
            <div className="opacity-0">&lt; Back</div>
          </div>
        </div>
      </div>

      {/* Error Box */}
      {error && (
        <div className="container px-4 mx-auto mt-4">
          <div className="p-4 text-[#004400] bg-[#99CC3322] border border-[#99CC33] rounded-lg">
            {error}
          </div>
        </div>
      )}

      {/* Subcategory List */}
      <section className="px-2 py-5">
        <div className="container mx-auto">

          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold text-[#004400]">
              Choose a {category?.name?.toLowerCase()} Subcategory
            </h2>
            <p className="mt-2 text-gray-600">
              {subcategories.length} subcategories available
            </p>
          </div>

          {/* GRID RESPONSIVE */}
          <div
            className="
              grid
              grid-cols-2             /* XS: 2 columns */
              sm:grid-cols-2          /* Small */
              md:grid-cols-3          /* Medium */
              lg:grid-cols-4          /* Large */
              gap-6
            "
          >
            {subcategories.map((subcategory, index) => {
              const subSlug = getSlug(subcategory);

              return (
                <Link
                  key={subcategory.id || index}
                  to={`/product/${subSlug}`}
                  state={{ subcategory, parentCategory: category }}
                  className="
                    group p-3 text-center bg-white border rounded-2xl 
                    shadow-sm border-[#00990022]
                    hover:border-[#009900]
                    hover:shadow-lg 
                    transition-all duration-300
                  "
                >
                  <h3 className="mb-2 text-lg font-semibold text-[#004400] group-hover:text-[#009900]">
                    {subcategory.name}
                  </h3>

                  {subcategory.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {subcategory.description}
                    </p>
                  )}

                  <div className="mt-4 text-[#009900] opacity-0 group-hover:opacity-100 transition">
                    View products →
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
