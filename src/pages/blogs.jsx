// src/pages/AllBlogs.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Clock, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { BASE_URL } from '../constants/apiTags';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  const categories = [
    'all',
    'toys',
    'educational',
    'gaming',
    'stem',
    'costumes',
    'reviews',
    'parenting'
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/blogs.php`);
        
        if (response.data && Array.isArray(response.data)) {
          const formattedBlogs = response.data.map(blog => ({
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.content ? 
              (blog.content.length > 120 ? blog.content.substring(0, 120) + '...' : blog.content) 
              : 'Read this interesting blog post...',
            image: blog.image_url || 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=500&auto=format&fit=crop',
            date: blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }) : 'Recent',
            readTime: calculateReadTime(blog.content || ''),
            category: 'Blog' // You can add category field to your database
          }));
          
          setBlogs(formattedBlogs);
        } else {
          // Fallback to sample blogs
          setBlogs(getSampleBlogs());
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setBlogs(getSampleBlogs());
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  };

  const getSampleBlogs = () => {
    const sampleBlogs = [];
    for (let i = 1; i <= 12; i++) {
      sampleBlogs.push({
        id: i,
        title: `Blog Post Title ${i}: Amazing Toy Review`,
        slug: `blog-post-${i}`,
        excerpt: 'This is a sample blog post about amazing toys and their benefits for children...',
        image: `https://images.unsplash.com/photo-154${i + 5235617}-9465d2a55698?w=500&auto=format&fit=crop`,
        date: 'Oct 15, 2025',
        readTime: '5 min',
        category: i % 2 === 0 ? 'Toys' : 'Educational'
      });
    }
    return sampleBlogs;
  };

  // Filter blogs based on search and category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           blog.category?.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container px-4 py-16 mx-auto">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Our Blog</h1>
            <p className="text-gray-600">Loading articles...</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg"></div>
                <div className="mt-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                  <div className="w-4/6 h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mt-10 ">
        <div className="container px-4 mx-auto text-center">
          <h3 className="mb-4 text-xl font-bold text-gray-900 md:text-5xl">
            Our lattest Blog posts
          </h3>
       
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container px-4 py-8 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-6 mb-8 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pl-10 pr-4 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Categories Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>


          {/* Blog Grid */}
          {currentBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {currentBlogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="overflow-hidden transition-all duration-300 transform bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-2xl hover:-translate-y-1"
                  >
                    {/* Blog Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="p-6">
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {blog.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {blog.readTime} read
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-xl font-bold text-gray-900 line-clamp-2 hover:text-blue-600">
                        <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="mb-4 text-gray-600 line-clamp-3">
                        {blog.excerpt}
                      </p>

                      {/* Read More */}
                      <Link
                        to={`/blog/${blog.slug}`}
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

          {/* Blog Stats */}
          <div className="mb-8 text-center">
            <p className="text-gray-600">
              Showing {currentBlogs.length} of {filteredBlogs.length} blog posts
            </p>
          </div>
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-16 text-center">
              <div className="max-w-md mx-auto">
                <div className="mb-4 text-6xl">📝</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">No blog posts found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-6 py-2 mt-4 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

  
    </div>
  );
};

export default AllBlogs;