import React from 'react';

const AboutUsSimple = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-4xl px-4 py-12 mx-auto">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            About <span className="text-blue-600">ToyVista</span>
          </h1>
          <div className="w-24 h-2 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Connecting joy with discovery through the world's best toys
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div className="prose prose-lg max-w-none">
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              Welcome to <strong>ToyVista</strong> — your premier online destination for the most exciting, 
              educational, and trending toys on the market. We're not just another toy store; we're an 
              affiliate-powered platform with a singular mission: to help you discover high-quality 
              toys from trusted global sources, all conveniently located in one place.
            </p>

            <div className="p-6 my-8 border-l-4 border-blue-500 bg-blue-50">
              <h3 className="mb-3 text-xl font-semibold text-gray-800">🎯 Our Vision</h3>
              <p className="text-gray-700">
                To create a world where finding the perfect toy is as joyful as playing with it
              </p>
            </div>

            <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">What We Offer</h2>
            
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              Our carefully curated collection spans everything from <span className="font-semibold text-blue-600">
              robotic kits</span> and <span className="font-semibold text-blue-600">STEM-based learning tools</span> 
              to <span className="font-semibold text-blue-600">classic fun and imaginative playsets</span>. 
              Whether you're a parent seeking educational toys, a gift-giver looking for that perfect present, 
              or a toy enthusiast exploring new releases, ToyVista is designed to make your search effortless, 
              informative, and enjoyable.
            </p>

            <div className="grid gap-8 my-12 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                      <span className="text-green-600">✓</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">Quality Assurance</h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Every toy is vetted for quality and safety standards
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                      <span className="text-blue-600">🔄</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">Daily Updates</h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Fresh products added regularly to keep up with trends
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full">
                      <span className="text-purple-600">💡</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">Educational Focus</h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Emphasis on toys that inspire learning and creativity
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full">
                      <span className="text-orange-600">🤝</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">Transparent Partnership</h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Clear affiliate relationships with trusted partners
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">How We Operate</h2>
            
            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              ToyVista operates as an affiliate platform. Each product you discover here includes an 
              affiliate link, meaning when you click through and make a purchase, we may earn a small 
              commission at absolutely no extra cost to you. This transparent model is how we maintain 
              and grow our platform, ensuring we can continue bringing you the best toy discoveries.
            </p>

            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              Our dedicated team works tirelessly to ensure ToyVista remains fast, user-friendly, and 
              consistently stocked with exciting new products. We constantly monitor toy trends, track 
              new releases, and identify the best affiliate opportunities so you can focus on what matters 
              most – finding the perfect toy.
            </p>

            <div className="p-8 my-12 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
              <p className="text-2xl italic font-light text-gray-700">
                "ToyVista — Where every click opens a world of wonder, and every discovery brings a smile."
              </p>
            </div>

            <p className="mb-6 text-lg leading-relaxed text-gray-700">
              Thank you for choosing to explore the world of toys with ToyVista. We're genuinely excited 
              to be part of your journey in discovering joy, fostering imagination, and creating 
              unforgettable moments through play.
            </p>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default AboutUsSimple;