import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../constants/apiTags";

const LatestBlogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const LOCAL_KEY = "latest_blogs_cache_Wellness";

  useEffect(() => {
    // 1️⃣ Load instantly from localStorage
    const cachedData = localStorage.getItem(LOCAL_KEY);
    if (cachedData) {
      setBlogPosts(JSON.parse(cachedData));
      setLoading(false);
    }

    // 2️⃣ Fetch latest blogs from API
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${BASE_URL}/blogs.php`);
        if (!res.ok) throw new Error("API response not OK");

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const latestBlogs = data.slice(0, 6);
          setBlogPosts(latestBlogs);
          localStorage.setItem(LOCAL_KEY, JSON.stringify(latestBlogs));
        }
      } catch (err) {
        console.warn("Network error → using cached data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return isNaN(d)
      ? ""
      : d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  };

// Remove HTML + return clean excerpt
const getExcerpt = (content, length = 120) => {
  if (!content) return "Read this latest post to know more...";

  // Create a temporary element to strip HTML
  const temp = document.createElement("div");
  temp.innerHTML = content;
  const text = temp.textContent || temp.innerText || "";

  return text.length > length ? text.slice(0, length) + "..." : text;
};

  return (
    <section className="py-16 bg-gradient-to-b from-white via-blue-50/40 to-white">
      <div className="container px-4 mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-emerald-950 md:text-5xl font-[Fredoka]">
            Latest{" "}
            <span className="text-transparent bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text">
              Blogs
            </span>
          </h2>
          <p className="mt-2 text-gray-600">Stay updated with our latest toy guides and insights</p>
        </div>

        {/* Loading — only if no cache */}
        {loading && blogPosts.length === 0 && (
          <p className="font-medium text-center text-gray-600 animate-pulse">Loading blogs...</p>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col transition-transform duration-300 transform bg-white border border-gray-100 shadow-md rounded-2xl hover:shadow-2xl hover:-translate-y-2 group"
            >
              {/* Image */}
              <Link to={`/blog/${post.slug}`} state={{ blog: post }} className="relative block overflow-hidden rounded-t-2xl">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <span className="absolute px-3 py-1 text-xs font-semibold text-white rounded-full top-3 left-3 bg-gradient-to-r from-emerald-600 to-green-400">
                  Blog
                </span>
              </Link>

              {/* Content */}
              <div className="flex flex-col flex-grow p-5">
                <Link to={`/blog/${post.slug}`} state={{ blog: post }}>
                  <h3 className="text-lg font-semibold text-gray-900 font-[Fredoka] line-clamp-2 hover:text-emerald-600 transition-colors duration-200">
                    {post.title}
                  </h3>
                </Link>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{getExcerpt(post.content)}</p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-500">{formatDate(post.created_at)}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    state={{ blog: post }}
                    className="px-4 py-1 text-xs font-semibold text-white transition-opacity duration-200 rounded-full shadow bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90"
                  >
                    Read More
                  </Link>
                </div>
              </div>

              {/* Gradient underline hover effect */}
              <div className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-500 rounded-full bg-gradient-to-r from-blue-600 via-green-400 to-green-500 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
