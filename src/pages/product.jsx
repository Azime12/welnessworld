// src/pages/ProductList.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/apiTags";

export default function ProductList() {
  const { slug } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();

  const subcategory_id1 = location.state?.subcategory?.id;
  const subcategory_name = location.state?.subcategory?.name || slug;

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 12; // 12 items per page

  useEffect(() => {
    if (!subcategory_id1) return;

    async function fetchProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/products.php`, {
          params: { subcategory_id1 },
        });
        setProducts(res.data || []);
      } catch (error) {
        console.error("Error loading products", error);
      }
    }

    fetchProducts();
  }, [subcategory_id1]);

  const showPrice = (price) =>
    price &&
    price !== "0" &&
    price !== 0 &&
    price !== "" &&
    price !== null &&
    price !== undefined;

  // Pagination Logic
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goToDetail = (product) => {
    navigate(`/product/${product.slug}/detail`, { state: { product } });
  };

  return (
   <main className="pb-12 md:px-8">
  {/* Back Button */}
  <button
    onClick={() => navigate(-1)}
    className="flex items-center mt-2 mb-4 text-sm transition-colors text-emerald-700 hover:text-emerald-800"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-4 h-4 mr-1" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
        clipRule="evenodd" 
      />
    </svg>
    Back
  </button>

  {/* Center Title */}
  <h1 className="mb-8 text-2xl font-bold text-center text-gray-900 md:text-3xl">
    {subcategory_name}
  </h1>

  {/* Product Grid */}
  <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    {paginatedProducts.map((product) => (
      <div
        key={product.id}
        className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:shadow-xl hover:border-[#66CB67]/20 hover:scale-[1.02]"
      >
        {/* Product Image Container */}
        <div
          onClick={() => goToDetail(product)}
          className="relative overflow-hidden cursor-pointer bg-gray-50"
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="object-cover w-full h-48 transition-transform duration-500 hover:scale-110"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
            }}
          />
          {/* Image Overlay Gradient */}
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/5 to-transparent hover:opacity-100"></div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Product Name */}
          <h3 className="h-12 font-semibold text-gray-800 line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          {/* {showPrice(product.price) && (
            <div className="mt-2 text-lg font-bold text-[#007BFF]">
              {product.price}
            </div>
          )} */}

          {/* View Detail Button */}
          <button
            onClick={() => goToDetail(product)}
            className="w-full px-4 py-3 mt-4 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-emerald-700 to-emerald-500 hover:from-emerald-800 hover:to-emerald-500 hover:shadow-lg active:scale-95"
          >
            View Details
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Pagination */}
  {products.length > PAGE_SIZE && (
    <div className="flex flex-col items-center justify-center mt-10 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
        className={`flex items-center justify-center px-5 py-3 border rounded-xl transition-all duration-300 ${
          currentPage === 1
            ? "cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
            : "bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 hover:shadow-md"
        }`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-5 h-5 mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
            clipRule="evenodd" 
          />
        </svg>
        Previous
      </button>

      <div className="flex items-center space-x-2">
        <span className="px-4 py-2 font-medium text-gray-600">
          Page
        </span>
        <span className="px-4 py-2 font-bold text-white bg-emerald-400 rounded-lg min-w-[60px] text-center">
          {currentPage}
        </span>
        <span className="px-4 py-2 font-medium text-gray-600">
          of {totalPages}
        </span>
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
        className={`flex items-center justify-center px-5 py-3 border rounded-xl transition-all duration-300 ${
          currentPage === totalPages
            ? "cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
            : "bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 hover:shadow-md"
        }`}
      >
        Next
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-5 h-5 ml-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>
    </div>
  )}

  {/* Empty State */}
  {paginatedProducts.length === 0 &&  (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 mb-6 text-[#50A8FF]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-700">No Products Found</h3>
      <p className="text-gray-500 max-w-[400px]">
        No products are available in this category at the moment.
      </p>
    </div>
  )}
</main>
  );
}
