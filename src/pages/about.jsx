
// FeatureCard Component for reusability
const FeatureCard = ({ icon, title, description, bgColor, textColor }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 mt-1">
      <div className={`flex items-center justify-center w-8 h-8 ${bgColor} rounded-full`}>
        <span className={textColor}>{icon}</span>
      </div>
    </div>
    <div className="ml-4">
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const AboutWellnessWorld = () => {
  const featuresLeft = [
    {
      icon: '🌿',
      title: 'Curated Wellness Products',
      description: 'Hand-picked Amazon products to support your health and lifestyle goals.',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      icon: '🔄',
      title: 'Daily Updates',
      description: 'Fresh wellness products added regularly to keep you up-to-date.',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
  ];

  const featuresRight = [
    {
      icon: '💡',
      title: 'Trusted Recommendations',
      description: 'We highlight only high-quality products that we can confidently recommend.',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      icon: '🤝',
      title: 'Affiliate Transparency',
      description: 'Clear affiliate relationships with Amazon, no hidden fees for users.',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-5xl px-4 py-12 mx-auto">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            About <span className="text-green-600">WellnessWorld</span>
          </h1>
          <div className="w-24 h-2 mx-auto mb-8 bg-gradient-to-r from-green-500 to-teal-500"></div>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Your trusted Amazon affiliate marketplace for wellness and lifestyle products
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8 prose prose-lg text-gray-700 max-w-none">
          <p>
            Welcome to <strong>WellnessWorld</strong> — a curated affiliate marketplace focused on wellness and lifestyle products available on Amazon. 
            Our goal is to help you discover high-quality, trusted products that support your health, wellness, and everyday lifestyle.
          </p>

          <div className="p-6 my-8 border-l-4 border-green-500 bg-green-50">
            <h3 className="mb-3 text-xl font-semibold text-gray-800">🎯 Our Vision</h3>
            <p>Empowering people to live healthier, happier, and more balanced lives through the right products.</p>
          </div>

          <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">What We Offer</h2>
          <p>
            Our platform features a carefully curated selection of Amazon wellness products — from nutritional supplements and fitness gear to personal care items and home wellness tools. 
            Whether you are looking to improve your daily routine, boost your energy, or create a calming home environment, WellnessWorld makes it easy to find the right product.
          </p>

          <div className="grid gap-8 my-12 md:grid-cols-2">
            <div className="space-y-4">
              {featuresLeft.map((feature, idx) => (
                <FeatureCard key={idx} {...feature} />
              ))}
            </div>
            <div className="space-y-4">
              {featuresRight.map((feature, idx) => (
                <FeatureCard key={idx} {...feature} />
              ))}
            </div>
          </div>

          <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">How We Operate</h2>
          <p>
            WellnessWorld operates as an Amazon affiliate platform. Each product link directs you to Amazon, and we may earn a small commission if you make a purchase — at no extra cost to you. This allows us to maintain and grow the platform while keeping it free for users.
          </p>
          <p>
            We continuously update our selection to bring you the latest, highest-quality wellness products. Our team carefully researches products, reviews user feedback, and ensures every item meets our standards.
          </p>

          <div className="p-8 my-12 text-center bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl">
            <p className="text-2xl italic font-light text-gray-700">
              "WellnessWorld — Discover products that elevate your life, every click brings you closer to better wellness."
            </p>
          </div>

          <p>
            Thank you for exploring WellnessWorld. We are dedicated to helping you discover wellness products that make a real difference in your daily life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutWellnessWorld;
