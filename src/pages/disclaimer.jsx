// src/pages/DisclaimerWellness.jsx
import React from 'react';

const DisclaimerWellness = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="container flex-grow max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="p-6 bg-white shadow-lg rounded-2xl md:p-8 lg:p-10">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Disclaimer
            </h1>
            <div className="w-20 h-1 mx-auto mb-4 bg-green-500"></div>
            <p className="text-gray-600">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>
          
          {/* Content */}
          <div className="space-y-8">
            <section className="pl-4 border-l-4 border-green-100">
              <p className="text-lg leading-relaxed text-gray-700">
                WellnessWorld participates in various affiliate programs, including health, wellness, and wealth products. 
                We may earn commissions when you make a purchase through our links at no extra cost to you.
              </p>
            </section>
            
            <section>
              <h2 className="pb-2 mb-4 text-2xl font-bold text-gray-900 border-b border-gray-200">
                Product Information &amp; Availability
              </h2>
              <p className="text-gray-700">
                We strive for accuracy in product details, but prices and availability are subject to change. 
                Please verify information on the retailer's website before purchasing.
              </p>
            </section>
            
            <section>
              <h2 className="pb-2 mb-4 text-2xl font-bold text-gray-900 border-b border-gray-200">
                Third-Party Links
              </h2>
              <p className="text-gray-700">
                Our site may contain links to third-party retailers or services. We do not control these websites and are not responsible for their content, policies, or transactions.
              </p>
            </section>
            
            <section>
              <h2 className="pb-2 mb-4 text-2xl font-bold text-gray-900 border-b border-gray-200">
                Liability Disclaimer
              </h2>
              <p className="text-gray-700">
                WellnessWorld does not manufacture or sell products directly. Any disputes, defects, or delivery issues should be addressed with the respective retailer or manufacturer.
              </p>
            </section>
            
            <section>
              <h2 className="pb-2 mb-4 text-2xl font-bold text-gray-900 border-b border-gray-200">
                Age &amp; Safety Recommendations
              </h2>
              <p className="text-gray-700">
                Please review the manufacturer's guidelines for products. WellnessWorld is not responsible for injuries or safety concerns related to product use.
              </p>
            </section>
            
            <section>
              <h2 className="pb-2 mb-4 text-2xl font-bold text-gray-900 border-b border-gray-200">
                Changes to This Disclaimer
              </h2>
              <p className="text-gray-700">
                We may update this disclaimer without notice. Please check this page periodically for changes.
              </p>
            </section>
            
            <section className="p-6 bg-green-50 rounded-xl">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Contact Us
              </h2>
              <p className="mb-2 text-gray-700">If you have questions, contact us at:</p>
              <p className="mb-2 text-gray-700">
                <strong>Email:</strong>{' '}
                <a 
                  href="mailto:support@wellnessworld.com" 
                  className="text-green-500 transition-colors duration-200 hover:text-green-600"
                >
                  support@wellnessworld.com
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Website:</strong>{' '}
                <a 
                  href="https://wellnessworld.com" 
                  className="text-green-500 transition-colors duration-200 hover:text-green-600"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  wellnessworld.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DisclaimerWellness;
