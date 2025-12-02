const LatestBlogs = () => {
  // Brand Colors
  const brandColors = {
    primary: '#99CC33',  // Vibrant green
    secondary: '#009900', // Medium green
    dark: '#004400',      // Dark green
    accent: '#FF6B6B',    // Coral accent
    light: '#F9FFE3',     // Light cream
    textDark: '#1A3C34',  // Dark text
    textLight: '#FFFFFF'  // White text
  };

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Yoga Poses for Stress Relief and Mental Clarity",
      slug: "essential-yoga-poses-stress-relief-mental-clarity",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop",
      excerpt: "Discover the top 10 yoga poses that can transform your mental health. Learn how proper breathing techniques combined with these poses can reduce stress, improve focus, and bring mental clarity to your daily life...",
      readTime: "7 min read",
      date: "Mar 15, 2025",
      category: "Mental Wellness",
      author: "Dr. Sarah Johnson",
      tags: ["Yoga", "Stress Relief", "Meditation"]
    },
    {
      id: 2,
      title: "The Ultimate Guide to Natural Supplements for Immune Support",
      slug: "natural-supplements-immune-support-guide",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w-800&auto=format&fit=crop",
      excerpt: "Boost your immune system naturally with these evidence-based supplements. From Vitamin C and Zinc to Elderberry and Echinacea, learn which supplements actually work and how to incorporate them into your wellness routine...",
      readTime: "10 min read",
      date: "Mar 12, 2025",
      category: "Supplements",
      author: "Nutritionist Mark Chen",
      tags: ["Immunity", "Natural Remedies", "Vitamins"]
    },
    {
      id: 3,
      title: "Creating Your Home Wellness Sanctuary: A Step-by-Step Guide",
      slug: "home-wellness-sanctuary-guide",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop",
      excerpt: "Transform your living space into a healing sanctuary. Learn about essential oils, natural lighting, air purification, and decluttering techniques that promote relaxation and wellbeing in your home environment...",
      readTime: "8 min read",
      date: "Mar 10, 2025",
      category: "Home Wellness",
      author: "Interior Wellness Expert",
      tags: ["Home Decor", "Aromatherapy", "Mindful Living"]
    },
    {
      id: 4,
      title: "Sleep Better Naturally: Top 5 Science-Backed Strategies",
      slug: "sleep-better-naturally-science-backed-strategies",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop",
      excerpt: "Struggling with sleep? Discover five natural, research-backed methods to improve your sleep quality. From circadian rhythm alignment to bedtime routines and sleep-enhancing foods, get your restful night back...",
      readTime: "6 min read",
      date: "Mar 8, 2025",
      category: "Sleep & Relaxation",
      author: "Sleep Specialist Dr. Emily Wong",
      tags: ["Sleep Hygiene", "Natural Remedies", "Wellness"]
    },
    {
      id: 5,
      title: "The Power of Adaptogens: Nature's Stress Solution",
      slug: "adaptogens-nature-stress-solution",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
      excerpt: "Explore the world of adaptogenic herbs and how they can help your body cope with stress. From Ashwagandha to Rhodiola, learn about these powerful plants and how to incorporate them safely into your wellness routine...",
      readTime: "9 min read",
      date: "Mar 5, 2025",
      category: "Natural Remedies",
      author: "Herbalist Maria Rodriguez",
      tags: ["Adaptogens", "Herbal Medicine", "Stress Management"]
    },
    {
      id: 6,
      title: "Mindful Eating: Transform Your Relationship with Food",
      slug: "mindful-eating-transform-relationship-food",
      image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&auto=format&fit=crop",
      excerpt: "Discover how mindful eating can revolutionize your health and relationship with food. Learn practical techniques to eat more consciously, enjoy your meals fully, and improve digestion naturally...",
      readTime: "5 min read",
      date: "Mar 3, 2025",
      category: "Nutrition",
      author: "Mindfulness Coach Lisa Patel",
      tags: ["Mindful Eating", "Nutrition", "Wellness"]
    }
  ];

  return (
    <section className="py-16" style={{ backgroundColor: brandColors.light }}>
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div 
            className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full"
            style={{ backgroundColor: `${brandColors.primary}20` }}
          >
            <svg 
              className="w-10 h-10" 
              style={{ color: brandColors.primary }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h2 
            className="mb-4 text-4xl font-bold md:text-5xl font-[Fredoka]"
            style={{ color: brandColors.textDark }}
          >
            Wellness <span style={{ color: brandColors.primary }}>Insights</span> & Blog
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div 
              className="w-16 h-1 rounded-full"
              style={{ backgroundColor: brandColors.primary }}
            ></div>
            <div 
              className="w-6 h-1 mx-3 rounded-full"
              style={{ backgroundColor: brandColors.secondary }}
            ></div>
            <div 
              className="w-3 h-1 rounded-full"
              style={{ backgroundColor: brandColors.accent }}
            ></div>
          </div>
          <p 
            className="max-w-2xl mx-auto text-lg"
            style={{ color: brandColors.textDark }}
          >
            Discover expert articles, research-backed wellness tips, and holistic health guidance 
            to support your journey towards better living and wellbeing.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="overflow-hidden transition-all duration-300 transform bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2 group"
              style={{ border: `1px solid ${brandColors.primary}30` }}
            >
              {/* Blog Image */}
              <div className="relative overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div 
                    className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ 
                      background: `linear-gradient(to bottom, transparent 0%, ${brandColors.primary}30 100%)` 
                    }}
                  ></div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span 
                    className="px-3 py-1 text-xs font-semibold text-white rounded-full shadow-md"
                    style={{ 
                      background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)` 
                    }}
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center justify-between mb-3 text-sm">
                  <div className="flex items-center gap-4 mb-2">
                    <span 
                      className="flex items-center gap-1 font-medium"
                      style={{ color: brandColors.dark }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readTime}
                    </span>
                    <span 
                      className="flex items-center gap-1 font-medium"
                      style={{ color: brandColors.dark }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {post.date}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 
                  className="mb-3 text-lg font-bold transition-colors duration-200 line-clamp-2 font-[Fredoka] group-hover:text-lg"
                  style={{ color: brandColors.textDark }}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p 
                  className="mb-4 text-sm leading-relaxed line-clamp-3"
                  style={{ color: brandColors.textDark }}
                >
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs font-medium rounded"
                      style={{ 
                        backgroundColor: `${brandColors.primary}15`,
                        color: brandColors.dark
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author & Read More */}
                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: `${brandColors.primary}30` }}>
                  {/* <div className="flex items-center gap-3">
                    <div 
                      className="flex items-center justify-center w-10 h-10 rounded-full"
                      style={{ backgroundColor: `${brandColors.primary}15` }}
                    >
                      <svg 
                        className="w-5 h-5" 
                        style={{ color: brandColors.primary }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: brandColors.textDark }}>
                        {post.author}
                      </p>
                      <p className="text-xs" style={{ color: brandColors.dark }}>
                        {post.category} Expert
                      </p>
                    </div>
                  </div> */}
                  
                  <a
                    href={`/wellness-blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group/readmore hover:gap-3"
                    style={{ color: brandColors.primary }}
                  >
                    Read Article
                    <svg 
                      className="w-4 h-4 transition-transform duration-200 transform group-hover/readmore:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div 
                className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-500 group-hover:w-full"
                style={{ 
                  background: `linear-gradient(to right, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)` 
                }}
              ></div>
            </article>
          ))}
        </div>

      

       
      </div>
    </section>
  );
};

export default LatestBlogs;