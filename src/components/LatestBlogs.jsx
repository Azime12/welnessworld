import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants/apiTags";

const LatestBlogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`${BASE_URL}/blogs.php`);
        if (response.data && Array.isArray(response.data)) {
          setBlogPosts(response.data.slice(0, 6)); // latest 6 blogs
        } else {
          setError("No blogs found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return isNaN(d) ? "" : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getExcerpt = (content, length = 120) => {
    if (!content) return "Read this latest post to know more...";
    return content.length > length ? content.slice(0, length) + "..." : content;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-[#004400]">
            Latest <span className="text-[#009900]">Blog Posts</span>
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-1 bg-[#004400] rounded-full"></div>
            <div className="w-4 h-1 mx-2 bg-[#009900] rounded-full"></div>
            <div className="w-2 h-1 bg-[#99CC33] rounded-full"></div>
          </div>
        </div>

        {loading && <p className="text-center text-gray-600">Loading blogs...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="relative overflow-hidden transition-all duration-300 transform bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-2xl hover:-translate-y-2 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-medium text-white bg-[#009900] rounded-full">
                    Blog
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-3 text-lg font-bold text-[#004400] transition-colors duration-200 line-clamp-2 group-hover:text-[#009900]">
                  {post.title}
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-3">
                  {getExcerpt(post.content)}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">{formatDate(post.created_at)}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    state={{ blog: post }}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#009900] transition-colors duration-200 hover:text-[#99CC33] group/readmore"
                  >
                    Read More
                    <svg className="w-4 h-4 transition-transform duration-200 transform group-hover/readmore:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-500 bg-gradient-to-r from-[#004400] via-[#009900] to-[#99CC33] group-hover:w-full"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
