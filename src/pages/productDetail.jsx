// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/apiTags';
import { ExternalLink, Share2, Heart, ChevronRight } from 'lucide-react';

const ProductDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Scroll to top whenever product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  // Fetch product by slug or related product ID
  const fetchProduct = async (params) => {
    try {
      const res = await axios.get(`${BASE_URL}/product-detail.php`, { params });
      if (res.data) setProduct(res.data);
    } catch (err) {
      console.error('Failed to fetch product:', err);
      setProduct(null);
    }
  };

  // Initial load: fetch by slug if no state
  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
    } else if (slug) {
      fetchProduct({ slug });
    }
  }, [slug, location.state]);

  // Fetch related products when current product changes
  useEffect(() => {
    if (!product?.subcategory_id1) return;

    const fetchRelated = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products.php`, {
          params: { subcategory_id1: product.subcategory_id1 },
        });
        if (res.data && Array.isArray(res.data)) {
          const related = res.data
            .filter(p => p.id !== product.id)
            .slice(0, 6);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Failed to fetch related products:', err);
      }
    };
    fetchRelated();
  }, [product]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Product Not Found</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container max-w-5xl px-4 py-8 mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-green-700"
        >
          ← Back
        </button>

        {/* Product Detail */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="overflow-hidden bg-white shadow-lg rounded-xl">
            <img
              src={product.image_url}
              alt={product.name}
              className="object-contain w-full h-96"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {product.price && parseFloat(product.price) > 0 && (
              <div className="text-2xl font-bold text-blue-600">${product.price}</div>
            )}

            {product.description && (
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>
            )}

            {product.asin && (
              <div className="p-2 text-sm text-gray-600 bg-gray-100 rounded">
                ASIN: {product.asin}
              </div>
            )}

            {product.tracking_link && (
              <a
                href={product.tracking_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <div className="flex items-center justify-center w-full px-6 py-4 space-x-3 font-bold text-black bg-yellow-400 rounded-xl hover:bg-yellow-500">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
                    alt="Amazon"
                    className="h-6"
                  />
                  <span>Check Price on Amazon</span>
                  <ExternalLink className="w-5 h-5" />
                </div>
              </a>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      text: `Check out this product: ${product.name}`,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied!');
                  }
                }}
                className="flex items-center justify-center flex-1 px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Share2 className="w-5 h-5 mr-2" /> Share
              </button>
              <button className="flex items-center justify-center flex-1 px-4 py-3 font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600">
                <Heart className="w-5 h-5 mr-2" /> Save
              </button>
            </div>
          </div>
        </div>

       {/* Related Products */}
{relatedProducts.length > 0 && (
  <div className="mt-12">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-2xl font-bold text-gray-900">Related Products</h3>
      {product.subcategory_id1 && (
        <Link
          to={`/subcategory/${product.subcategory_id1}`}
          state={{ subcategory: { id: product.subcategory_id1 } }}
          className="flex items-center font-medium text-blue-600 hover:text-blue-800"
        >
          View All
          <ChevronRight className="w-5 h-5 ml-1" />
        </Link>
      )}
    </div>

    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {relatedProducts.map(rp => (
        <div
          key={rp.id}
          className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-xl"
        >
          <img
            src={rp.image_url}
            alt={rp.name}
            className="object-contain w-full h-40 p-2"
          />
          <div className="p-2 space-y-2">
            <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">{rp.name}</h4>
            {rp.price && parseFloat(rp.price) > 0 && (
              <div className="font-bold text-blue-600">{rp.price}</div>
            )}
            <button
              className="w-full px-3 py-1 text-sm text-center text-white bg-green-600 rounded hover:bg-green-700"
              onClick={() => setProduct(rp)}
            >
              View Detail
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

      </main>
    </div>
  );
};

export default ProductDetail;
