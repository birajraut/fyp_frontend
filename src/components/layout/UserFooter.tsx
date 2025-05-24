import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & About */}
          <div>
            <h2 className="text-2xl font-bold mb-4">SnackRush</h2>
            <p className="text-gray-400">
              We make you ordering Expericence better.
            </p>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
            <div className="space-y-2">
              <p className="text-gray-400">Everyday</p>
              <p className="text-gray-400">10.00 Am - 10.00 Pm</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-red-500 mr-3" />
                <span className="text-gray-400">Naxal Bhagwati, Kathmandu</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-red-500 mr-3" />
                <span className="text-gray-400">+977-9860384625</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-red-500 mr-3" />
                <span className="text-gray-400">info@snackrush.com</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://www.twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} All Rights Reserved By SnackRush
          </p>
          <p className="text-gray-400 mt-2">
            © Distributed By SnackRush
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
  
