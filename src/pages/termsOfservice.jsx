// src/pages/TermsOfServiceSimple.jsx
import React from 'react';

const TermsOfServiceSimple = () => {
  return (
    <main className="flex-grow">
      <div className="max-w-4xl px-4 mx-auto my-10 sm:px-6 lg:px-8">
        <div className="p-6 bg-white shadow-lg rounded-xl md:p-8">
          <h1 className="mb-8 text-3xl font-bold text-center text-blue-600 md:text-4xl">
            Terms of Service
          </h1>
          
          <div className="space-y-8">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-blue-600">
                1. Acceptance of Terms
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                By accessing and using ToyVista.com, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations. If you do not agree with any part of these terms, 
                you must discontinue use of our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-blue-600">
                2. Affiliate Disclosure
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                ToyVista.com contains affiliate links, including those from Amazon and AliExpress. 
                We may earn a commission when you click these links and make a purchase. 
                These commissions help support the site and allow us to keep curating quality toy content.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-blue-600">
                3. Use of the Site
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                You agree to use ToyVista.com only for lawful purposes. You must not engage in any 
                activity that may harm the website or interfere with other users' access and experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-blue-600">
                4. Content Ownership
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                All content on this site, including product descriptions, images, graphics, and branding, 
                is either owned by or licensed to ToyVista.com. Unauthorized use or reproduction of our content is prohibited.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-blue-600">
                5. Limitation of Liability
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                ToyVista.com is provided on an "as is" basis. We make no warranties or guarantees 
                regarding the availability, accuracy, or reliability of any content. We are not 
                liable for any direct or indirect damages resulting from your use of the website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-blue-600">
                6. Third-Party Links
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Our website may contain links to third-party websites. We are not responsible for 
                the content, policies, or practices of any external sites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-blue-600">
                7. Modifications to Terms
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                We may revise these Terms of Service at any time without notice. By continuing 
                to use ToyVista.com, you agree to be bound by the current version of these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-blue-600">
                8. Contact
              </h2>
              <p className="text-lg leading-relaxed text-gray-700">
                If you have any questions or concerns about these Terms of Service, please contact us at{' '}
                <a 
                  href="mailto:support@toyvista.com" 
                  className="font-semibold text-red-500 hover:text-red-700"
                >
                  support@toyvista.com
                </a>.
              </p>
            </section>

            <div className="p-6 mt-12 bg-gray-100 rounded-lg">
              <p className="text-gray-700">
                <strong>Note:</strong> This document was last updated on {new Date().toLocaleDateString()}. 
                For questions about how we handle your personal information, please see our{' '}
                <a href="/privacy-policy" className="font-medium text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsOfServiceSimple;