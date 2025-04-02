import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Attraction } from "@/lib/types";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client

// const apiKey = process.env.REACT_APP_APIKey
const supabase = createClient(
  'https://efwpupiqcfiacharxpae.supabase.co', // Replace with your Supabase project URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmd3B1cGlxY2ZpYWNoYXJ4cGFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NzE2NTgsImV4cCI6MjA1OTE0NzY1OH0.cVtyA_cMDtP4MIykC5RVZnCYLMTVD4ICUA3XzNit938' // Replace with your Anon Public Key
);

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // const { data: attractions = [] } = useQuery<Attraction[]>({
  //   queryKey: ['/api/attractions/featured'],
  //   refetchOnWindowFocus: false,
  // });

  const { data: attractions = [] } = useQuery({
    queryKey: ['attractions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('attractions')
        .select('*')
        .eq('is_featured', true);

      if (error) throw new Error(error.message);
      return data;
    },
    refetchOnWindowFocus: false,
  });


  const heroImages = attractions.map(attraction => ({
    id: attraction.id,
    title: attraction.name,
    description: attraction.shortDescription,
    imageSrc: attraction.image_src
  }));
  console.log(heroImages[0]);
  // Auto advance slides
  useEffect(() => {
    if (heroImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  if (heroImages.length === 0) {
    return (
      <section id="home" className="relative h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-royal-gold mx-auto mb-4"></div>
          <p className="text-royal-purple">Loading attractions...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative h-screen">
      <div className="carousel relative w-full h-full overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={image.id}
            className={`carousel-item absolute w-full h-full transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="relative w-full h-full">
              <img
                src={image.imageSrc}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="hero-gradient absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-4">{image.title}</h2>
                <p className="text-xl md:text-2xl max-w-3xl">{image.description}</p>
                <a
                  href="#attractions"
                  className="mt-8 px-8 py-3 bg-royal-gold hover:bg-yellow-600 text-white rounded-full font-medium transition-colors duration-300"
                >
                  Explore Attractions
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full bg-white ${index === currentSlide ? "opacity-100" : "opacity-50"
              } focus:outline-none`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full focus:outline-none"
        onClick={goToPrevSlide}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full focus:outline-none"
        onClick={goToNextSlide}
      >
        <i className="fas fa-chevron-right"></i>
      </button>
    </section>
  );
};

export default HeroSection;
