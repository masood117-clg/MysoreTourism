import { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Attraction } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Ticket, Calendar, ArrowLeft } from "lucide-react";

const AttractionDetail = () => {
  const [, params] = useRoute("/attractions/:id");
  const attractionId = params?.id ? parseInt(params.id) : null;

  const { data: attraction, isLoading, error } = useQuery<Attraction>({
    queryKey: [`/api/attractions/${attractionId}`],
    enabled: !!attractionId,
    refetchOnWindowFocus: false,
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-royal-gold mb-4"></div>
        <p className="text-royal-purple text-xl">Loading attraction details...</p>
      </div>
    );
  }

  if (error || !attraction) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-[60vh]">
        <h2 className="text-3xl font-playfair font-bold text-royal-purple mb-4">Attraction Not Found</h2>
        <p className="text-gray-600 mb-8">Sorry, we couldn't find the attraction you're looking for.</p>
        <Link href="/#attractions">
          <a className="inline-block px-6 py-3 bg-royal-gold hover:bg-yellow-600 text-white rounded-full font-medium transition-colors duration-300">
            <ArrowLeft className="inline-block mr-2 h-5 w-5" />
            Back to Attractions
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-royal-cream">
      {/* Hero image */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <img
          src={attraction.imageSrc}
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4 text-center px-4">{attraction.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-royal-gold mr-2">
              {renderStars(attraction.rating)}
            </div>
            <span className="text-white">{attraction.rating} ({attraction.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center text-sm bg-black bg-opacity-40 px-4 py-2 rounded-full">
            <MapPin className="h-4 w-4 mr-1 text-royal-gold" />
            <span>Mysore, Karnataka, India</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm">
            <Link href="/">
              <a className="text-gray-600 hover:text-royal-purple">Home</a>
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/#attractions">
              <a className="text-gray-600 hover:text-royal-purple">Attractions</a>
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-royal-purple">{attraction.name}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left content - main description */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-royal-purple mb-4">About {attraction.name}</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {attraction.description}
              </p>

              {/* Additional description - since the API doesn't provide this, adding some generic content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {attraction.name} is one of Mysore's most celebrated attractions, drawing visitors from across the globe.
                The architectural marvel showcases the rich cultural heritage and royal legacy of the erstwhile Mysore kingdom.
                Visitors can explore the intricate details of the structure, learn about its historical significance, and
                immerse themselves in the regal atmosphere that pervades the entire complex.
              </p>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-playfair font-semibold text-royal-purple mb-4">Highlights</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-royal-gold rounded-full p-1 mt-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-gray-700">
                      Experience the unique architectural style that blends several influences including Indo-Saracenic, Dravidian, and Gothic elements.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-royal-gold rounded-full p-1 mt-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-gray-700">
                      Capture stunning photographs and create memories that will last a lifetime.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-royal-gold rounded-full p-1 mt-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-gray-700">
                      Learn about the rich cultural heritage and historical significance of the site from knowledgeable guides.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-royal-purple mb-4">Photo Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <img src={attraction.imageSrc} alt={`${attraction.name} - View 1`} className="rounded-lg h-32 w-full object-cover" />
                <img src={attraction.imageSrc} alt={`${attraction.name} - View 2`} className="rounded-lg h-32 w-full object-cover" />
                <img src={attraction.imageSrc} alt={`${attraction.name} - View 3`} className="rounded-lg h-32 w-full object-cover" />
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" className="border-royal-purple text-royal-purple hover:bg-royal-purple hover:text-white">
                  View All Photos
                </Button>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-playfair font-bold text-royal-purple mb-4">Location</h2>
              <div className="h-[300px] bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <div id="map" className="w-full h-full" data-lat={attraction.location.lat} data-lng={attraction.location.lng}></div>
              </div>
              <div className="text-gray-700">
                <p className="mb-2">
                  <strong>Address:</strong> {attraction.name}, Mysore, Karnataka, India - 570001
                </p>
                <p>
                  <strong>How to reach:</strong> Located in central Mysore, easily accessible by local bus, auto-rickshaw, or taxi from any part of the city.
                </p>
              </div>
            </div>
          </div>

          {/* Right sidebar - information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-playfair font-bold text-royal-purple mb-4">Visitor Information</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-royal-gold mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-royal-purple">Opening Hours</h3>
                    <p className="text-gray-600">{attraction.timings}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Ticket className="h-5 w-5 text-royal-gold mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-royal-purple">Entry Fee</h3>
                    <p className="text-gray-600">{attraction.ticketPrice}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-royal-gold mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-royal-purple">Best Time to Visit</h3>
                    <p className="text-gray-600">October to March (Winter season)</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-royal-gold mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-royal-purple">Contact</h3>
                    <p className="text-gray-600">+91 821 2422096</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 my-6"></div>

              <div className="bg-royal-cream rounded-lg p-4 mb-6">
                <h3 className="font-medium text-royal-purple mb-2">Tips for Visitors</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-royal-gold mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Wear comfortable shoes as there's a lot of walking involved.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-royal-gold mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Photography is allowed, but flash photography may be restricted in certain areas.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-royal-gold mt-1 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Guided tours are available and recommended for a better understanding of the history.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col space-y-3">
                <Button className="w-full bg-royal-gold hover:bg-yellow-600 text-white">
                  Book Guided Tour
                </Button>
                <Button variant="outline" className="w-full border-royal-purple text-royal-purple hover:bg-royal-purple hover:text-white">
                  Add to Itinerary
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Back to attractions button */}
        <div className="text-center mt-8">
          <Link href="/#attractions">
            <a className="inline-block px-6 py-3 bg-royal-purple hover:bg-opacity-90 text-white rounded-full font-medium transition-colors duration-300">
              <ArrowLeft className="inline-block mr-2 h-5 w-5" />
              Back to Attractions
            </a>
          </Link>
        </div>
      </div>

      {/* Initialize map with location */}
      <script type="text/javascript" dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            // Check if Leaflet is loaded
            if (window.L) {
              const mapElement = document.getElementById('map');
              if (mapElement) {
                const lat = parseFloat(mapElement.getAttribute('data-lat') || '12.3051');
                const lng = parseFloat(mapElement.getAttribute('data-lng') || '76.6551');
                
                const map = L.map('map').setView([lat, lng], 15);
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                
                L.marker([lat, lng]).addTo(map)
                  .bindPopup('${attraction.name}')
                  .openPopup();
              }
            }
          });
        `
      }} />
    </div>
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

export default AttractionDetail;
