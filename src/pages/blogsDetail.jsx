import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

const BlogDetail = () => {
  const location = useLocation();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const blogFromState = location.state?.blog;
    if (blogFromState) {
      setBlog(formatBlog(blogFromState));
    } else {
      setBlog(null); // no data, show not found
    }
  }, [location.state]);

  const formatBlog = (b) => ({
    ...b,
    date: b.created_at
      ? new Date(b.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Recent',
    readTime: calculateReadTime(b.content || ''),
  });

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return `${Math.ceil(words / wordsPerMinute)} min read`;
  };

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50">
        <h1 className="mb-4 text-3xl font-bold text-[#004400]">Blog Post Not Found</h1>
        <p className="mb-8 text-gray-600">The blog post you're looking for doesn't exist.</p>
        <Link
          to="/blogs"
          className="inline-flex items-center px-6 py-3 font-medium text-white bg-[#009900] rounded-lg hover:bg-[#99CC33]"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl px-4 py-8 mx-auto">
        <Link to="/blogs" className="inline-flex items-center mb-6 text-[#004400] hover:text-[#009900]">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs
        </Link>

        <h1 className="mb-4 text-2xl font-bold text-[#004400]">{blog.title}</h1>

        <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" /> {blog.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" /> {blog.readTime}
          </div>
        </div>

        <div className="mb-6 overflow-hidden shadow-lg rounded-2xl">
          <img src={blog.image_url} alt={blog.title} className="object-cover w-full max-h-96" />
        </div>

        <article className="p-6 mb-8 bg-white shadow-lg rounded-2xl">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
