// src/pages/BlogDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Mail, BookOpen } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../constants/apiTags';

const BlogDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        
        // First, check if blog data was passed via state
        const blogFromState = location.state?.blog;
        
        if (blogFromState) {
          // Use data from state if available
          setBlog(blogFromState);
        } else {
          // Fetch blog by slug from API
          const response = await axios.get(`${BASE_URL}/blogs.php`);
          
          if (response.data && Array.isArray(response.data)) {
            const foundBlog = response.data.find(b => b.slug === slug);
            
            if (foundBlog) {
              setBlog({
                ...foundBlog,
                date: foundBlog.created_at ? new Date(foundBlog.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'Recent',
                readTime: calculateReadTime(foundBlog.content || ''),
                category: 'Blog'
              });
            } else {
              // Fallback to sample blog
              setBlog(getSampleBlog());
            }
          } else {
            // Fallback to sample blog
            setBlog(getSampleBlog());
          }
        }

        // Fetch related blogs
        const relatedResponse = await axios.get(`${BASE_URL}/blogs.php`);
        if (relatedResponse.data && Array.isArray(relatedResponse.data)) {
          const related = relatedResponse.data
            .filter(b => b.slug !== slug)
            .slice(0, 3)
            .map(b => ({
              id: b.id,
              title: b.title,
              slug: b.slug,
              excerpt: b.content ? 
                (b.content.length > 100 ? b.content.substring(0, 100) + '...' : b.content) 
                : 'Read more...',
              image: b.image_url || 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=500&auto=format&fit=crop',
              date: b.created_at ? new Date(b.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }) : 'Recent'
            }));
          setRelatedBlogs(related);
        } else {
          setRelatedBlogs(getSampleRelatedBlogs());
        }

      } catch (err) {
        console.error('Error fetching blog:', err);
        setBlog(getSampleBlog());
        setRelatedBlogs(getSampleRelatedBlogs());
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug, location.state]);

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const getSampleBlog = () => ({
    id: 1,
    title: "Girls Demon Hunter Pop Singer Costume Set – Rumi, Mira & Zoey Cosplay for Halloween & Dance",
    slug: "girls-demon-hunter-pop-singer-costume-set-rumi-mira-zoey-cosplay",
    content: `<h1>Girls Demon Hunter Pop Singer Costume Set – Rumi, Mira & Zoey Cosplay for Halloween & Dance</h1>
<p><strong>Slug:</strong> girls-demon-hunter-pop-singer-costume-set-rumi-mira-zoey-cosplay</p>

<p>Unleash your inner K-pop idol this Halloween with the <strong>Girls Demon Hunter Pop Singer Costume Set</strong>, inspired by the fierce trio from Netflix's animated hit <em>KPop Demon Hunters</em>. Whether you're channeling Rumi's fiery spirit, Mira's edgy style, or Zoey's cool confidence, this costume set brings the magic of HUNTR/X to life.</p>

<h2>Costume Options</h2>
<ul>
  <li><strong>Rumi:</strong> A 3-piece ensemble featuring a cropped jacket, vest, and shorts, capturing Rumi's bold and rebellious look.</li>
  <li><strong>Mira:</strong> A 2-piece outfit with a graphic tee and culottes, reflecting Mira's chic and confident style.</li>
  <li><strong>Zoey:</strong> A 2-piece set including a sleeveless top and pants, embodying Zoey's laid-back yet powerful presence.</li>
</ul>

<h2>Why Choose This Costume?</h2>
<p>This costume set stands out for its:</p>
<ul>
  <li><strong>Authentic Design:</strong> Carefully crafted to replicate the original characters, ensuring a realistic role-playing experience.</li>
  <li><strong>Versatility:</strong> Perfect for Halloween parties, cosplay events, dance performances, and themed gatherings.</li>
  <li><strong>Quality Materials:</strong> Made with comfortable fabrics suitable for extended wear during events and performances.</li>
</ul>

<h2>Tips for Styling</h2>
<ul>
  <li><strong>Accessorize:</strong> Enhance your look with themed accessories like wigs, gloves, or boots to match your chosen character.</li>
  <li><strong>Pair with Makeup:</strong> Use makeup to accentuate the character's features, such as bold eyeliner for Rumi or subtle shimmer for Zoey.</li>
  <li><strong>Practice Your Moves:</strong> Watch clips from <em>KPop Demon Hunters</em> to mimic the characters' signature dance moves and poses.</li>
</ul>

<p>Embrace your favorite HUNTR/X member and make this Halloween unforgettable with the <strong>Girls Demon Hunter Pop Singer Costume Set</strong>. Step into the world of K-pop and demon hunting with style and confidence.</p>`,
    image: "https://images-na.ssl-images-amazon.com/images/I/71xhWiOz0YL._AC_UL900_SR900,600_.jpg",
    date: "October 13, 2025",
    readTime: "7 min read",
    category: "Costumes",
    author: "ToyVista Team"
  });

  const getSampleRelatedBlogs = () => [
    {
      id: 2,
      title: "Best Halloween Costumes for Kids 2025",
      slug: "best-halloween-costumes-for-kids-2025",
      excerpt: "Discover the most popular and creative Halloween costumes for children this year.",
      image: "https://images.unsplash.com/photo-1534188753412-9f0337d5dcce?w=500&auto=format&fit=crop",
      date: "Oct 10, 2025"
    },
    {
      id: 3,
      title: "K-Pop Inspired Fashion for Teens",
      slug: "kpop-inspired-fashion-for-teens",
      excerpt: "Explore the latest K-pop fashion trends that your teens will love.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop",
      date: "Oct 5, 2025"
    },
    {
      id: 4,
      title: "DIY Costume Ideas on a Budget",
      slug: "diy-costume-ideas-on-a-budget",
      excerpt: "Create amazing costumes without breaking the bank with these creative ideas.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format&fit=crop",
      date: "Sep 28, 2025"
    }
  ];

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title || 'Check out this blog post';
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this blog post: ${url}`)}`;
        break;
      default:
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    }
    setShareMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container flex flex-col items-center justify-center min-h-screen px-4 mx-auto">
          <div className="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container px-4 py-16 mx-auto text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Blog Post Not Found</h1>
          <p className="mb-8 text-gray-600">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blogs"
            className="inline-flex items-center px-6 py-3 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blog Header */}
      <div className="relative ">
        <div className="absolute inset-0 "></div>
        <div className="container relative px-2 py-5 mx-auto md:py-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blogs"
              className="inline-flex items-center mb-6 text-gray-900 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Link>
            
            {/* <div className="mb-4">
              <span className="px-3 py-1 text-sm font-medium text-gray-900 rounded-full ">
                {blog.category}
              </span>
            </div> */}
            
            <h1 className="mb-6 text-xl font-bold text-gray-900 md:text-2xl lg:text-2xl">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{blog.readTime}</span>
              </div>
              {/* {blog.author && (
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>By {blog.author}</span>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container px-4 py-8 mx-auto md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Blog Content */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              <div className="mb-8 overflow-hidden shadow-xl rounded-2xl">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="object-cover w-full h-auto max-h-96"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1200&auto=format&fit=crop';
                  }}
                />
              </div>

              {/* Blog Content */}
              <article className="p-6 bg-white shadow-lg rounded-2xl">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </article>

              {/* Share Section */}
              <div className="p-6 mt-8 bg-white shadow-lg rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Share this post</h3>
                    <p className="text-gray-600">Help others discover this content</p>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShareMenuOpen(!shareMenuOpen)}
                      className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                    
                    {shareMenuOpen && (
                      <div className="absolute right-0 z-10 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg top-full">
                        <button
                          onClick={() => handleShare('copy')}
                          className="flex items-center w-full gap-3 px-4 py-3 text-left hover:bg-gray-50"
                        >
                          <span className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                            🔗
                          </span>
                          <span>Copy Link</span>
                        </button>
                        <button
                          onClick={() => handleShare('facebook')}
                          className="flex items-center w-full gap-3 px-4 py-3 text-left hover:bg-gray-50"
                        >
                          <Facebook className="w-5 h-5 text-blue-600" />
                          <span>Share on Facebook</span>
                        </button>
                        <button
                          onClick={() => handleShare('twitter')}
                          className="flex items-center w-full gap-3 px-4 py-3 text-left hover:bg-gray-50"
                        >
                          <Twitter className="w-5 h-5 text-blue-400" />
                          <span>Share on Twitter</span>
                        </button>
                        <button
                          onClick={() => handleShare('email')}
                          className="flex items-center w-full gap-3 px-4 py-3 text-left hover:bg-gray-50"
                        >
                          <Mail className="w-5 h-5 text-gray-600" />
                          <span>Share via Email</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Author Info */}
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">ToyVista Blog</h4>
                    <p className="text-sm text-gray-600">Your trusted source for toy reviews and guides</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  We're passionate about helping you find the best toys and products for your family.
                </p>
              </div>

              {/* Related Blogs */}
              {relatedBlogs.length > 0 && (
                <div className="p-6 bg-white shadow-lg rounded-2xl">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedBlogs.map((related) => (
                      <Link
                        key={related.id}
                        to={`/blog/${related.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0">
                            <img
                              src={related.image}
                              alt={related.title}
                              className="object-cover w-16 h-16 rounded-lg"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                              {related.title}
                            </h4>
                            <p className="text-xs text-gray-500">{related.date}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="p-6 bg-white shadow-lg rounded-2xl">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {['Toys', 'Educational', 'Gaming', 'STEM', 'Costumes', 'Reviews'].map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Newsletter */}
      {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container px-4 py-12 mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">Subscribe to Our Newsletter</h3>
            <p className="mb-6 text-gray-600">
              Get the latest toy reviews, parenting tips, and exclusive deals delivered to your inbox.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <style jsx>{`
        .prose h1 {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #1f2937;
        }
        .prose h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #374151;
        }
        .prose h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #4b5563;
        }
        .prose p {
          margin-bottom: 1rem;
          line-height: 1.7;
          color: #4b5563;
        }
        .prose ul {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
          list-style-type: disc;
        }
        .prose li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
        }
        .prose strong {
          font-weight: bold;
          color: #1f2937;
        }
        .prose em {
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default BlogDetail;