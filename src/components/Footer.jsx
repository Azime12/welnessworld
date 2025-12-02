const Footer = () => {
  return (
    <footer className="text-white bg-gray-900">
      {/* Footer Top Section */}
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Logo Section with Animation */}
          <div className="logo-footer">
            <div className="footer-logos">
              <div className="wheel"></div>
            </div>
            <p className="mt-4 text-gray-400">Your one-stop shop for wellness!</p>
          </div>

         {/* Sister Companies */}
<div className="sister-companies">
  <h4 className="mb-4 text-lg font-semibold text-white">Sister Companies</h4>
  <div className="space-y-2">
    {[
      { name: 'Toy Vista', url: 'https://toyvista.com' },
      { name: 'iShoez', url: 'https://ishoez.com' },
      { name: 'DGPick', url: 'https://dgpick.com' },
      { name: 'Electronixa', url: 'https://electronixa.com' }
    ].map((company) => (
      <a
        key={company.name}
        href={company.url}
        className="block text-gray-400 transition-colors duration-200 hover:text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        {company.name}
      </a>
    ))}
  </div>
</div>


          {/* Useful Links */}
          <div className="useful-links">
            <h4 className="mb-4 text-lg font-semibold text-white">Useful Links</h4>
            <div className="space-y-2">
              {[
                { name: 'About Us', url: '/about' },
                { name: 'Privacy Policy', url: '/privacy-policy' },
                { name: 'Terms of Service', url: '/terms-of-service' },
                { name: 'FAQ', url: '/faq' },
                { name: 'Disclaimer', url: '/disclaimer' },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="block text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Us */}
          <div className="contact-us">
            <h4 className="mb-4 text-lg font-semibold text-white">Contact Us</h4>
            <p className="mb-4">
              <a 
                href="mailto:contact@toyvista.com" 
                className="text-gray-400 transition-colors duration-200 hover:text-white"
              >
                Email: contact@wellnesWorld.com
              </a>
            </p>

            {/* Social Icons */}
            <div className="flex mb-6 space-x-4">
              <a
                href="https://facebook.com/toyvistacom"
                className="text-gray-400 transition-colors duration-200 hover:text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a
                href="https://www.instagram.com/toyvistacom/"
                className="text-gray-400 transition-colors duration-200 hover:text-pink-500"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a
                href="https://www.pinterest.com/toyvistacom/"
                className="text-gray-400 transition-colors duration-200 hover:text-red-600"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
              >
                <i className="fab fa-pinterest fa-lg"></i>
              </a>
              <a
                href="https://www.tiktok.com/@toyvistacom"
                className="text-gray-400 transition-colors duration-200 hover:text-black"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <i className="fab fa-tiktok fa-lg"></i>
              </a>
            </div>

            {/* Download Buttons */}
            <div className="flex items-center gap-8 mt-8">
              <a href="#" className="flex-1">
                <img 
                  src="/images/ios.png" 
                  alt="Download on App Store" 
                  className="w-full max-w-[180px] h-auto"
                />
              </a>
              <a href="#" className="flex-1">
                <img 
                  src="/images/android.webp" 
                  alt="Get it on Google Play" 
                  className="w-full max-w-[120px] h-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container px-4 py-4 mx-auto">
          <p className="text-sm text-center text-gray-400">
            © 2025 ToyVista. All rights reserved | Developed by{' '}
            <a
              href="https://marketingethiopia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors duration-200 hover:text-blue-400"
            >
              MarketingEthiopia.com
            </a>
          </p>
        </div>
      </div>

      {/* Add CSS styles */}
      <style jsx global>{`
        .footer-logos {
          width: 20vw;
          height: 150px;
          position: relative;
          overflow: hidden;
        }

        .wheel {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: url('/images/logo.png') no-repeat center/contain;
          position: absolute;
          bottom: 10px;
          left: 0;
          animation: roll 4s linear infinite alternate;
        }

        @keyframes roll {
          0% {
            transform: translateX(0) rotate(0deg);
          }
          100% {
            transform: translateX(calc(18vw - 100px)) rotate(720deg);
          }
        }

        @media (max-width: 700px) {
          .footer-logos {
            width: 80vw;
            height: 150px;
          }
          @keyframes roll {
            0% {
              transform: translateX(0) rotate(0deg);
            }
            100% {
              transform: translateX(calc(80vw - 100px)) rotate(720deg);
            }
          }
        }
      `}</style>

      {/* Font Awesome CDN for icons */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        crossOrigin="anonymous"
      />
    </footer>
  );
};

export default Footer;