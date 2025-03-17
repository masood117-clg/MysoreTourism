import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Accommodation } from "@/lib/types";

const AccommodationSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const { data: accommodations = [], isLoading } = useQuery<Accommodation[]>({
    queryKey: ['/api/accommodations'],
    refetchOnWindowFocus: false,
  });
  
  const categories = [
    { id: "all", label: "All" },
    { id: "luxury", label: "Luxury" },
    { id: "mid-range", label: "Mid-range" },
    { id: "budget", label: "Budget" },
    { id: "heritage", label: "Heritage" }
  ];
  
  const filteredAccommodations = activeCategory === "all"
    ? accommodations
    : accommodations.filter(accommodation => accommodation.category.includes(activeCategory));
  
  return (
    <section id="accommodation" className="py-12 md:py-16 bg-royal-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-royal-purple mb-4">Where to Stay</h2>
          <div className="w-24 h-1 bg-royal-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            From luxury heritage hotels to comfortable budget options, Mysore offers accommodations for all preferences and budgets.
          </p>
        </div>
        
        {/* Accommodation Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full ${
                activeCategory === category.id
                  ? "bg-royal-purple text-white"
                  : "border border-royal-purple text-royal-purple hover:bg-royal-purple hover:text-white"
              } transition-colors duration-300`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Accommodations List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-royal-gold mx-auto mb-4"></div>
            <p className="text-royal-purple">Loading accommodations...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAccommodations.map(accommodation => (
              <div 
                key={accommodation.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md card-hover transition-all duration-300"
                data-category={accommodation.category}
              >
                <div className="relative h-48">
                  <img 
                    src={accommodation.imageSrc} 
                    alt={accommodation.name} 
                    className="w-full h-full object-cover"
                  />
                  {accommodation.category.includes("heritage") && (
                    <div className="absolute top-4 right-4 bg-royal-gold text-white px-3 py-1 rounded-full text-sm">
                      <i className="fas fa-crown mr-1"></i> Heritage
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-playfair font-bold text-royal-purple">{accommodation.name}</h3>
                    <div className="text-royal-gold font-bold">{accommodation.pricePerNight}<span className="text-sm font-normal text-gray-600">/night</span></div>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="flex text-royal-gold">
                      {renderStars(accommodation.rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{accommodation.rating} ({accommodation.reviewCount} reviews)</span>
                  </div>
                  <p className="text-gray-600 mb-4">{accommodation.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {accommodation.amenities.map((amenity, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{amenity}</span>
                    ))}
                  </div>
                  <a href="#" className="inline-block px-4 py-2 bg-royal-purple text-white rounded-md hover:bg-opacity-90 transition-colors duration-300">View Details</a>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
          <a href="#" className="inline-block px-8 py-3 bg-royal-gold hover:bg-yellow-600 text-white rounded-full font-medium transition-colors duration-300">
            View All Accommodations <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

// Helper function to render stars based on rating
const renderStars = (ratingText: string) => {
  const ratingValue = parseFloat(ratingText.split('/')[0]);
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(ratingValue)) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    } else if (i === Math.ceil(ratingValue) && !Number.isInteger(ratingValue)) {
      stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
    } else {
      stars.push(<i key={i} className="far fa-star"></i>);
    }
  }
  
  return stars;
};

export default AccommodationSection;
