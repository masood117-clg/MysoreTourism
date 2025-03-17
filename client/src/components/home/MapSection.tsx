import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Attraction } from "@/lib/types";
import { MapLocation } from "@/lib/types";

// Leaflet types and components
declare global {
  interface Window {
    L: any;
  }
}

const MapSection = () => {
  const mapRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedFilters, setSelectedFilters] = useState({
    attractions: true,
    hotels: true,
    restaurants: true,
    transport: true
  });
  
  const { data: attractions = [] } = useQuery<Attraction[]>({
    queryKey: ['/api/attractions'],
    refetchOnWindowFocus: false,
  });
  
  // Convert attractions to map locations
  const attractionLocations: MapLocation[] = attractions.map(attraction => ({
    id: attraction.id,
    name: attraction.name,
    description: attraction.shortDescription,
    category: 'attractions',
    position: [attraction.location.lat, attraction.location.lng]
  }));
  
  // Popular places for the sidebar
  const popularPlaces = attractions.slice(0, 3);
  
  // Initialize the map when component mounts
  useEffect(() => {
    const loadLeaflet = async () => {
      if (!mapRef.current || mapInitialized) return;
      
      // Dynamically load Leaflet scripts
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.async = true;
      
      script.onload = () => {
        if (mapRef.current && window.L) {
          const map = window.L.map(mapRef.current).setView([12.3051, 76.6551], 13);
          
          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
          
          setMapInstance(map);
          setMapInitialized(true);
        }
      };
      
      document.head.appendChild(script);
    };
    
    loadLeaflet();
    
    return () => {
      // Clean up map when component unmounts
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [mapRef.current]);
  
  // Add markers when map is initialized and attractions are loaded
  useEffect(() => {
    if (!mapInitialized || !mapInstance || !attractions.length) return;
    
    // Clear existing markers
    markers.forEach(marker => marker.remove());
    
    // Add new markers
    const newMarkers = attractionLocations.map(location => {
      const marker = window.L.marker(location.position)
        .addTo(mapInstance)
        .bindPopup(`
          <div>
            <h4 class="font-bold">${location.name}</h4>
            <p>${location.description}</p>
          </div>
        `);
        
      // Only show attraction markers if attractions filter is selected
      if (!selectedFilters.attractions && location.category === 'attractions') {
        mapInstance.removeLayer(marker);
      }
      
      return marker;
    });
    
    setMarkers(newMarkers);
  }, [mapInitialized, attractions, selectedFilters.attractions]);
  
  // Toggle map filters
  const toggleFilter = (filter: keyof typeof selectedFilters) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };
  
  // Handle clicking on a popular place
  const handlePopularPlaceClick = (attraction: Attraction) => {
    if (!mapInstance) return;
    
    mapInstance.setView([attraction.location.lat, attraction.location.lng], 15);
    
    const marker = markers.find(marker => 
      marker._latlng.lat === attraction.location.lat && 
      marker._latlng.lng === attraction.location.lng
    );
    
    if (marker) {
      marker.openPopup();
    }
  };
  
  return (
    <section id="map" className="py-12 md:py-16 bg-royal-cream relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-royal-purple mb-4">Interactive Map</h2>
          <div className="w-24 h-1 bg-royal-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Plan your visit with our interactive map showing major attractions, accommodations, and transport hubs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md h-96 md:h-[500px] relative">
              {/* Interactive Map */}
              <div ref={mapRef} className="w-full h-full z-10"></div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-playfair font-bold text-royal-purple mb-4">Popular Destinations</h3>
            
            <div className="space-y-4 mb-6">
              {popularPlaces.map(place => (
                <div 
                  key={place.id} 
                  className="flex items-start p-3 hover:bg-royal-cream rounded-lg transition-colors duration-300 cursor-pointer"
                  onClick={() => handlePopularPlaceClick(place)}
                >
                  <img 
                    src={place.imageSrc} 
                    alt={place.name} 
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="ml-3">
                    <h4 className="font-medium text-royal-purple">{place.name}</h4>
                    <p className="text-sm text-gray-600">{place.category}</p>
                    <div className="flex items-center mt-1 text-sm">
                      <i className="fas fa-walking text-royal-gold mr-1"></i>
                      <span className="text-gray-500">
                        {place.id === 1 ? "Central location" : 
                         place.id === 2 ? "13 km from city center" : 
                         "2 km from Palace"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <h3 className="text-xl font-playfair font-bold text-royal-purple mb-3">Filter Map</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="attractions" 
                  className="mr-2"
                  checked={selectedFilters.attractions}
                  onChange={() => toggleFilter('attractions')}
                />
                <label htmlFor="attractions" className="text-gray-700">Attractions</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="hotels" 
                  className="mr-2"
                  checked={selectedFilters.hotels}
                  onChange={() => toggleFilter('hotels')}
                />
                <label htmlFor="hotels" className="text-gray-700">Hotels</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="restaurants" 
                  className="mr-2"
                  checked={selectedFilters.restaurants}
                  onChange={() => toggleFilter('restaurants')}
                />
                <label htmlFor="restaurants" className="text-gray-700">Restaurants</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="transport" 
                  className="mr-2"
                  checked={selectedFilters.transport}
                  onChange={() => toggleFilter('transport')}
                />
                <label htmlFor="transport" className="text-gray-700">Transport Hubs</label>
              </div>
            </div>
            
            <a href="#" className="block w-full py-3 bg-royal-purple text-white rounded-md hover:bg-opacity-90 transition-colors duration-300 text-center">
              Download Offline Map
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
