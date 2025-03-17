import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Attraction } from "@/lib/types";

const AttractionSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const { data: attractions = [], isLoading } = useQuery<Attraction[]>({
    queryKey: ['/api/attractions'],
    refetchOnWindowFocus: false,
  });
  
  const categories = [
    { id: "all", label: "All" },
    { id: "palaces", label: "Palaces" },
    { id: "gardens", label: "Gardens" },
    { id: "museums", label: "Museums" },
    { id: "religious-sites", label: "Religious Sites" },
    { id: "wildlife", label: "Wildlife" }
  ];
  
  const filteredAttractions = activeCategory === "all" 
    ? attractions 
    : attractions.filter(attraction => attraction.category.includes(activeCategory));
  
  return (
    <section id="attractions" className="py-12 md:py-16 bg-royal-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-royal-purple mb-4">Must Visit Attractions</h2>
          <div className="w-24 h-1 bg-royal-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Discover Mysore's iconic landmarks, from majestic palaces to tranquil gardens and cultural treasures.
          </p>
        </div>
        
        {/* Categories Filter */}
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
        
        {/* Attractions Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-royal-gold mx-auto mb-4"></div>
            <p className="text-royal-purple">Loading attractions...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAttractions.map(attraction => (
              <div 
                key={attraction.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md card-hover transition-all duration-300"
                data-category={attraction.category}
              >
                <div className="relative h-64">
                  <img 
                    src={attraction.imageSrc}
                    alt={attraction.name} 
                    className="w-full h-full object-cover"
                  />
                  {attraction.isFeatured && (
                    <div className="absolute top-4 right-4 bg-royal-gold text-white px-3 py-1 rounded-full text-sm">
                      <i className="fas fa-crown mr-1"></i> Most Popular
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-royal-purple mb-2">{attraction.name}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex text-royal-gold">
                      {renderStars(attraction.rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{attraction.rating} ({attraction.reviewCount} reviews)</span>
                  </div>
                  <p className="text-gray-600 mb-4">{attraction.description}</p>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <div className="flex items-center mr-4">
                      <i className="far fa-clock mr-1"></i>
                      <span>{attraction.timings}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-ticket-alt mr-1"></i>
                      <span>{attraction.ticketPrice}</span>
                    </div>
                  </div>
                  <Link href={`/attractions/${attraction.id}`}>
                    <a className="inline-block px-4 py-2 bg-royal-purple text-white rounded-md hover:bg-opacity-90 transition-colors duration-300">
                      View Details
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
          <Link href="/attractions">
            <a className="inline-block px-8 py-3 bg-royal-gold hover:bg-yellow-600 text-white rounded-full font-medium transition-colors duration-300">
              View All Attractions <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </Link>
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

export default AttractionSection;
