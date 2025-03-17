import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-royal-purple text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/">
              <a className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-royal-purple text-xl">
                  <i className="fas fa-landmark"></i>
                </div>
                <div className="ml-3">
                  <h3 className="text-xl font-playfair font-bold">
                    <span className="text-royal-gold">Mysore</span> Tourism
                  </h3>
                </div>
              </a>
            </Link>
            <p className="text-gray-300 mb-4">
              Discover the royal heritage and cultural splendor of Mysore, the city of palaces and gardens.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-playfair font-bold mb-4 text-royal-gold">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#attractions" className="text-gray-300 hover:text-white transition-colors duration-300">Tourist Attractions</a></li>
              <li><a href="#accommodation" className="text-gray-300 hover:text-white transition-colors duration-300">Where to Stay</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Where to Eat</a></li>
              <li><a href="#cultural" className="text-gray-300 hover:text-white transition-colors duration-300">Cultural Experiences</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Shopping</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Events Calendar</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-playfair font-bold mb-4 text-royal-gold">Travel Info</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">How to Reach</a></li>
              <li><a href="#transport" className="text-gray-300 hover:text-white transition-colors duration-300">Local Transportation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Weather & Climate</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Best Time to Visit</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Travel Tips</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-playfair font-bold mb-4 text-royal-gold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-royal-gold"></i>
                <span>Department of Tourism<br/>Government of Karnataka<br/>Palace Road, Mysore 570001</span>
              </li>
              <li className="flex">
                <i className="fas fa-phone-alt mt-1 mr-3 text-royal-gold"></i>
                <span>+91 821 2422096</span>
              </li>
              <li className="flex">
                <i className="fas fa-envelope mt-1 mr-3 text-royal-gold"></i>
                <span>info@mysoretourism.gov.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Mysore Tourism. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
