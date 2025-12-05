import React, { useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  User, 
  Tag, 
  Facebook, 
  Twitter, 
  Linkedin,
  MessageSquare,
  Eye,
  ChevronRight,
  Home,
  Layers
} from 'lucide-react';
import { BASE_URL } from '../constants/apiTags';
import { useRef } from 'react';

const BlogDetail = () => {
  const location = useLocation();
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
const topRef = useRef(null);

  // Format a blog with date and readTime
  const formatBlog = (b) => {
    if (!b) return null;
    
    const cleanContent = b.content ? b.content.replace(/<[^>]*>/g, '') : '';
    const estimatedReadTime = Math.max(1, Math.ceil(cleanContent.split(/\s+/).length / 200));
    
    return {
      ...b,
      cleanContent: cleanContent,
      date: b.created_at
        ? new Date(b.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : 'Recent',
      formattedDate: b.created_at
        ? new Date(b.created_at).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : 'Recent',
      readTime: `${estimatedReadTime} min read`,
      category: extractFirstTag(b.content) || 'General',
      tags: extractTags(b.content),
      wordCount: cleanContent.split(/\s+/).length,
    };
  };

  const extractFirstTag = (content) => {
    const match = content?.match(/<(\w+)[^>]*>/);
    return match ? match[1].charAt(0).toUpperCase() + match[1].slice(1) : 'General';
  };

  const extractTags = (content) => {
    const tags = [];
    const tagRegex = /<(\w+)[^>]*>/g;
    let match;
    while ((match = tagRegex.exec(content || '')) !== null && tags.length < 5) {
      const tagName = match[1].charAt(0).toUpperCase() + match[1].slice(1);
      if (!tags.includes(tagName) && tagName.length < 15) {
        tags.push(tagName);
      }
    }
    return tags.length > 0 ? tags : ['General', 'Blog', 'Article'];
  };





  useEffect(() => {
  const fetchBlog = async () => {
    setLoading(true);
    try {
      const blogFromState = location.state?.blog;
      let fetchedBlog = null;

      if (blogFromState) {
        fetchedBlog = blogFromState;
      } else {
        const response = await axios.get(`${BASE_URL}/blogs.php`);
        if (response.data && Array.isArray(response.data)) {
          fetchedBlog = response.data.find(b => b.slug === slug) || null;
        }
      }

      if (fetchedBlog) {
        setBlog(formatBlog(fetchedBlog));
      } else {
        setBlog(null);
      }

      // 🔹 Scroll to top after blog is set
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching blog:', error);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  fetchBlog();
}, [location.state, slug]);


  // Fetch recent blogs
  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/blogs.php`);
        if (res.data && Array.isArray(res.data)) {
          const sorted = res.data
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 6)
            .map(formatBlog);
          setRecentBlogs(sorted.filter(b => b && b.id !== blog?.id));
          
          // Set related blogs (excluding current and recent)
          if (blog) {
            const related = res.data
              .filter(b => b.id !== blog.id && b.id !== sorted[0]?.id)
              .slice(0, 3)
              .map(formatBlog);
            setRelatedBlogs(related);
          }
        }
      } catch (err) {
        console.error('Error fetching recent blogs:', err);
      }
    };
    
    if (!loading) {
      fetchRecentBlogs();
    }
  }, [blog, loading]);

  const shareBlog = (platform) => {
    const url = window.location.href;
    const title = blog?.title || '';
    const text = blog?.cleanContent?.substring(0, 100) || '';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const generateTagsFromTitle = (title) => {
  if (!title) return [];

  // Split title into words
  const words = title
    .toLowerCase()
    .match(/\b\w+\b/g) || [];

  // Filter out very short/common words
  const commonWords = ['the', 'and', 'for', 'with', 'from', 'this', 'that', 'your', 'has', 'have', 'are', 'but', 'not', 'you', 'all', 'can', 'use', 'will', 'a', 'an', 'of', 'in', 'on', 'to', 'at', 'by', 'is'];
  const filtered = words.filter(w => w.length > 3 && !commonWords.includes(w));

  // Remove duplicates
  const uniqueWords = [...new Set(filtered)];

  // Limit number of tags to 10
  return uniqueWords.slice(0, 10).map(w => w.charAt(0).toUpperCase() + w.slice(1));
};

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 rounded-full border-emerald-200 border-t-emerald-600 animate-spin"></div>
          <div className="absolute inset-0 border-4 rounded-full border-emerald-100 animate-ping"></div>
        </div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-gray-50 to-red-50">
        <div className="p-6 mb-6 bg-white shadow-lg rounded-2xl">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-100 to-red-200">
            <Bookmark className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Article Not Found</h1>
          <p className="max-w-md mb-8 text-gray-600">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/blogs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition-all duration-300 bg-emerald-600 rounded-xl hover:bg-emerald-700"
            >
              <ArrowLeft className="w-5 h-5" /> Browse All Articles
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-gray-700 transition-all duration-300 bg-gray-100 rounded-xl hover:bg-gray-200"
            >
              <Home className="w-5 h-5" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
<div ref={topRef} className="min-h-screen bg-gradient-to-b from-gray-50 to-emerald-50">
      {/* Navigation Breadcrumbs */}
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-lg">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="transition-colors hover:text-emerald-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blogs" className="transition-colors hover:text-emerald-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-gray-900 truncate">{blog.title}</span>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl px-4 py-8 mx-auto md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Back Button */}
            <div className="mb-8">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 group"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                Back to All Articles
              </Link>
            </div>

            <div className="mb-8">
              
              <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white shadow-lg rounded-2xl">
            
              </div>
            </div>

            {/* Featured Image */}
            {blog.image_url && (
              <div className="relative mb-8 overflow-hidden shadow-2xl rounded-2xl group">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="object-cover w-full h-[400px] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute z-20 bottom-6 left-6">
                  <div className="flex items-center gap-2 text-white/90">
                    <Eye className="w-5 h-5" />
                    <span className="text-sm font-medium">Featured Image</span>
                  </div>
                </div>
              </div>
            )}

          <article className="p-8 mb-8 bg-white shadow-lg rounded-2xl">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{
                  __html:
                    blog.content

                      /** 🔥 FIX 1: `<img alt="Something" />` with no src */
                      .replace(/<img([^>]+)alt="([^"]+)"([^>]*)\/?>/g, (match, before, alt, after) => {
                        return `
                          <img 
                            src="https://st2.depositphotos.com/4431055/11473/i/450/depositphotos_114730670-stock-illustration-toys-collection-isolated.jpg"
                            alt="${alt}"
                            class="rounded-xl shadow-lg my-4"
                          />
                        `;
                      })

                      /** 🔥 FIX 2: src="" empty images */
                      .replace(/<img([^>]+)src=""([^>]*)>/g, (match, b, a) => {
                        return `
                          <img 
                            ${b} 
                            src="https://st2.depositphotos.com/4431055/11473/i/450/depositphotos_114730670-stock-illustration-toys-collection-isolated.jpg"
                            ${a}
                          />
                        `;
                      })
                }}
              />

{generateTagsFromTitle(blog.title).length > 0 && (
  <div className="pt-8 mt-8 border-t border-gray-200">
    <h3 className="mb-4 font-semibold text-gray-900">Article Tags</h3>
    <div className="flex flex-wrap gap-2">
      {generateTagsFromTitle(blog.title).map((tag, i) => (
        <span 
          key={i} 
          className="px-4 py-2 text-sm font-medium border rounded-full bg-emerald-50 text-emerald-700 border-emerald-100"
        >
          #{tag}
        </span>
      ))}
    </div>
  </div>
)}

              {/* Tags
              {blog.tags?.length > 0 && (
                <div className="pt-8 mt-8 border-t border-gray-200">
                  <h3 className="mb-4 font-semibold text-gray-900">Article Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, i) => (
                      <span key={i} className="px-4 py-2 text-sm font-medium border rounded-full bg-emerald-50 text-emerald-700 border-emerald-100">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )} */}
            </article>

            {/* Share Section */}
            <div className="p-6 mb-8 border border-gray-200 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Share this article</h3>
                  <p className="text-gray-600">Help others discover this content</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => shareBlog('facebook')}
                    className="p-3 text-blue-600 transition-colors bg-blue-100 rounded-xl hover:bg-blue-200"
                    title="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => shareBlog('twitter')}
                    className="p-3 transition-colors bg-sky-100 text-sky-600 rounded-xl hover:bg-sky-200"
                    title="Share on Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => shareBlog('linkedin')}
                    className="p-3 text-blue-700 transition-colors bg-blue-200 rounded-xl hover:bg-blue-300"
                    title="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-3 text-gray-700 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200"
                    title="Copy link"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button
                    className="p-3 transition-colors bg-emerald-100 text-emerald-600 rounded-xl hover:bg-emerald-200"
                    title="Save for later"
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {relatedBlogs.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Related Articles</h2>
                  <Link 
                    to="/blogs" 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {relatedBlogs.map((relatedBlog) => (
                    <Link
                      key={relatedBlog.id}
                      to={`/blog/${relatedBlog.slug}`}
                      state={{ blog: relatedBlog }}
                      className="block overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-1 group"
                    >
                      <div className="relative h-40 overflow-hidden rounded-t-2xl">
                        <img
                          src={relatedBlog.image_url}
                          alt={relatedBlog.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <div className="p-5">
                        <h3 className="mb-2 font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-700">
                          {relatedBlog.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {relatedBlog.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {relatedBlog.readTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
           

            {/* Recent Articles */}
            <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-emerald-100">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Recent Articles</h3>
              </div>
              <div className="space-y-4">
                {recentBlogs.slice(0, 5).map((recentBlog) => (
                  <Link
                    key={recentBlog.id}
                    to={`/blog/${recentBlog.slug}`}
                    state={{ blog: recentBlog }}
                    className="flex items-start gap-3 p-3 transition-colors rounded-xl hover:bg-gray-50 group"
                  >
                    <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg">
                      <img
                        src={recentBlog.image_url}
                        alt={recentBlog.title}
                        className="object-cover w-full h-full transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 line-clamp-2 group-hover:text-emerald-700">
                        {recentBlog.title}
                      </h4>
                      
                    </div>
                  </Link>
                ))}
              </div>
            </div>
       
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;