import { useState } from "react";
import { Link } from "wouter";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };
  
  return (
    <header className="sticky top-0 z-[100] bg-white shadow-md">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-royal-purple flex items-center justify-center text-white text-xl">
                <i className="fas fa-landmark"></i>
              </div>
              <div className="ml-3">
                <h1 className="text-xl md:text-2xl font-playfair font-bold text-royal-purple">
                  <span className="text-royal-gold">Mysore</span> Tourism
                </h1>
                <p className="text-xs text-gray-500">The Royal Heritage City</p>
              </div>
            </a>
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-royal-purple" 
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="nav-link-hover py-2 text-royal-purple hover:text-royal-gold transition-colors duration-300">Home</a>
            <a href="#attractions" className="nav-link-hover py-2 text-royal-purple hover:text-royal-gold transition-colors duration-300">Attractions</a>
            <a href="#accommodation" className="nav-link-hover py-2 text-royal-purple hover:text-royal-gold transition-colors duration-300">Accommodation</a>
            <a href="#cultural" className="nav-link-hover py-2 text-royal-purple hover:text-royal-gold transition-colors duration-300">Cultural Heritage</a>
            <a href="#transport" className="nav-link-hover py-2 text-royal-purple hover:text-royal-gold transition-colors duration-300">Transport</a>
            <a href="#map" className="nav-link-hover py-2 text-royal-purple hover:text-royal-gold transition-colors duration-300">Map</a>
            <a href="#contact" className="nav-link-hover py-2 text-royal-purple hover:text-royal-gold transition-colors duration-300">Contact</a>
          </nav>
          
          {/* Search Icon */}
          <div className="hidden md:block">
            <button 
              className="bg-royal-gold hover:bg-yellow-600 text-white px-3 py-1.5 text-sm rounded-full flex items-center transition-colors duration-300"
              onClick={toggleSearch}
            >
              <i className="fas fa-search mr-1.5"></i>
              <span>Search</span>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <nav className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden w-full mt-4 pb-2`}>
          <div className="flex flex-col space-y-3">
            <a href="#home" className="py-2 text-royal-purple hover:text-royal-gold transition-colors duration-300">Home</a>
            <a href="#attractions" className="py-2 text-royal-purple hover:text-royal-gold transition-colors duration-300">Attractions</a>
            <a href="#accommodation" className="py-2 text-royal-purple hover:text-royal-gold transition-colors duration-300">Accommodation</a>
            <a href="#cultural" className="py-2 text-royal-purple hover:text-royal-gold transition-colors duration-300">Cultural Heritage</a>
            <a href="#transport" className="py-2 text-royal-purple hover:text-royal-gold transition-colors duration-300">Transport</a>
            <a href="#map" className="py-2 text-royal-purple hover:text-royal-gold transition-colors duration-300">Map</a>
            <a href="#contact" className="py-2 text-royal-purple hover:text-royal-gold transition-colors duration-300">Contact</a>
            <div className="pt-2">
              <button 
                className="bg-royal-gold hover:bg-yellow-600 text-white px-3 py-1.5 text-sm rounded-full flex items-center transition-colors duration-300 w-full justify-center"
                onClick={toggleSearch}
              >
                <i className="fas fa-search mr-1.5"></i>
                <span>Search</span>
              </button>
            </div>
          </div>
        </nav>
        
        {/* Search Panel */}
        <div className={`${searchOpen ? "block" : "hidden"} mt-4 pb-4`}>
          <form className="flex">
            <input 
              type="text" 
              placeholder="Search attractions, hotels, activities..." 
              className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-royal-gold"
            />
            <button 
              type="submit" 
              className="bg-royal-gold hover:bg-yellow-600 text-white px-6 py-2 rounded-r-md transition-colors duration-300"
            >
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
