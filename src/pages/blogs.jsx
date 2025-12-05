import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, BookOpen, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { BASE_URL } from '../constants/apiTags';

const CACHE_KEY = 'toybista1_blogs';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const blogsPerPage = 9;

  // Fetch blogs from API
  const fetchBlogs = async (query = '') => {
    try {
      const { data } = await axios.get(`${BASE_URL}/blog-search.php`, {
        params: { q: query }
      });

      console.log(" data is here",data)
      if (Array.isArray(data)) {
        const formatted = data.map(blog => ({
          ...blog,
          date: blog.created_at
            ? new Date(blog.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })
            : 'Recent',
          readTime:
            Math.max(
              1,
              Math.ceil(
                (blog.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0) / 200
              )
            ) + ' min read'
        }));

        setBlogs(formatted);

        if (!query) localStorage.setItem(CACHE_KEY, JSON.stringify(formatted));
      }
    } catch (err) {
      console.log('API failed, loading cached blogs...');
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) setBlogs(JSON.parse(cached));
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) setBlogs(JSON.parse(cached));

    fetchBlogs();
  }, []);

  const handleSearch = e => {
    const q = e.target.value;
    setSearchQuery(q);
    setCurrentPage(1);
    fetchBlogs(q);
  };

  const sortedBlogs = blogs.sort((a, b) =>
    sortBy === 'newest'
      ? new Date(b.created_at) - new Date(a.created_at)
      : new Date(a.created_at) - new Date(b.created_at)
  );

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
 console.log("current blogs ",currentBlogs);
  const totalPages = Math.ceil(sortedBlogs.length / blogsPerPage);

  // Generate pagination numbers with ellipsis
  const getPaginationNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = window.innerWidth < 768 ? 3 : 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftBound = Math.max(2, currentPage - 1);
      const rightBound = Math.min(totalPages - 1, currentPage + 1);

      pageNumbers.push(1);

      if (leftBound > 2) {
        pageNumbers.push('...');
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pageNumbers.push(i);
      }

      if (rightBound < totalPages - 1) {
        pageNumbers.push('...');
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  console.log("current blogs",currentBlogs);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header with Title */}
      <div className="text-emerald-600 ">
        <div className="container px-4 py-3 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
           Blogs & Articles
          </h1>
        
        </div>
      </div>

      {/* Search + Sort */}
      <div className="container px-4 pt-8 mx-auto mb-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search articles, topics, or keywords..."
              className="w-full pl-12 pr-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#50A8FF]/50 focus:border-[#50A8FF] transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm font-medium text-gray-600 md:block">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#50A8FF]/50 focus:border-[#50A8FF] transition-all"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
 
       
      </div>

      {/* Blog Grid */}
      <div className="container px-4 pb-16 mx-auto">
        {currentBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {currentBlogs.map(blog => (
                <article
                  key={blog.id}
                  className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-2xl hover:scale-[1.02]"
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={blog.image_url}
                      alt={blog.title.replace(/<[^>]*>/g, '')}
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-emerald-600 to-green-500">
                        Article
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {blog.date}
                      </span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span>{blog.readTime}</span>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-gray-900 line-clamp-2">
                      <Link
                        to={`/blog/${blog.slug}`}
                        state={{ blog }}
                        dangerouslySetInnerHTML={{ __html: blog.title }}
                        className="hover:text-[#007BFF] transition-colors"
                      />
                    </h3>

                    <div
                      className="mb-4 text-gray-600 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: blog.snippet || '' }}
                    />

                    <Link
                      to={`/blog/${blog.slug}`}
                      state={{ blog }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-emerald-600 to-[#2bcf2e] hover:shadow-lg hover:gap-3"
                    >
                      Read More
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Advanced Pagination */}
            {totalPages > 1 && (
    <div className="mt-12">
  {/* Main pagination container - ALWAYS ONE ROW */}
  <div className="flex items-center justify-between gap-2 p-3 bg-white border border-gray-200 shadow-sm rounded-xl sm:p-4 sm:gap-3 md:rounded-2xl">
    
    {/* Previous Button - Compact on XS */}
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(p => p - 1)}
      className={`flex items-center justify-center p-2 rounded-lg transition-all duration-300 sm:p-2.5 sm:px-4 ${
        currentPage === 1
          ? 'cursor-not-allowed bg-gray-100 text-gray-400 opacity-60'
          : 'bg-white text-[#007BFF] border border-[#007BFF]/30 hover:bg-gradient-to-r hover:from-[#007BFF] hover:to-[#50A8FF] hover:text-white hover:shadow-md active:scale-95'
      }`}
      aria-label="Previous page"
    >
      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="hidden ml-1 text-sm sm:ml-2 sm:inline">Previous</span>
    </button>

    {/* Page Numbers - Compressed for XS */}
    <div className="flex items-center justify-center flex-1 min-w-0">
      <div className="flex items-center gap-1 sm:gap-2">
        {getPaginationNumbers().map((num, idx) => (
          num === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-1 text-xs text-gray-400 sm:text-sm sm:px-2">
              ...
            </span>
          ) : (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`flex items-center justify-center w-7 h-7 text-xs font-medium transition-all duration-200 rounded-lg sm:w-9 sm:h-9 sm:text-sm ${
                currentPage === num
                  ? 'bg-gradient-to-r from-[#66CB67] to-[#50A8FF] text-white shadow-md scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-[#007BFF] active:scale-95'
              }`}
              aria-label={`Page ${num}`}
              aria-current={currentPage === num ? 'page' : undefined}
            >
              {num}
            </button>
          )
        ))}
      </div>
    </div>

    {/* Next Button - Compact on XS */}
    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(p => p + 1)}
      className={`flex items-center justify-center p-2 rounded-lg transition-all duration-300 sm:p-2.5 sm:px-4 ${
        currentPage === totalPages
          ? 'cursor-not-allowed bg-gray-100 text-gray-400 opacity-60'
          : 'bg-white text-[#007BFF] border border-[#007BFF]/30 hover:bg-gradient-to-r hover:from-[#007BFF] hover:to-[#50A8FF] hover:text-white hover:shadow-md active:scale-95'
      }`}
      aria-label="Next page"
    >
      <span className="hidden mr-1 text-sm sm:mr-2 sm:inline">Next</span>
      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>

    {/* Compact Page Jump - Only on MD+ */}
    <div className="items-center hidden gap-2 md:flex">
      <span className="text-xs text-gray-600 whitespace-nowrap sm:text-sm">Page:</span>
      <div className="relative">
        <input
          type="number"
          min="1"
          max={totalPages}
          className="w-16 px-2 py-1.5 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#50A8FF]/30 focus:border-[#50A8FF] sm:w-20 sm:text-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const page = Math.max(1, Math.min(totalPages, parseInt(e.target.value) || 1));
              setCurrentPage(page);
              e.target.value = '';
            }
          }}
          placeholder="#"
          aria-label="Go to page number"
        />
      </div>
    </div>
  </div>

 


</div>
            )}
          </>
        ) : (
          <div className="py-20 text-center">
            <div className="max-w-md mx-auto">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#50A8FF] to-[#66CB67] rounded-full opacity-20 animate-pulse"></div>
                <BookOpen className="relative w-20 h-20 mx-auto text-gray-400" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-800">
                No Articles Found
              </h3>
              <p className="mb-8 text-gray-600">
                {searchQuery 
                  ? `No articles found for "${searchQuery}"`
                  : 'No articles available at the moment.'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    fetchBlogs('');
                    setCurrentPage(1);
                  }}
                  className="px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-[#007BFF] to-[#66CB67] hover:shadow-lg hover:scale-105"
                >
                  View All Articles
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;