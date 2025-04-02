import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@/lib/types";
import { supabase } from "@/supabase";

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
  //   queryKey: ['/api/testimonials'],
  //   refetchOnWindowFocus: false,
  // });
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*"); // Fetch all attractions

      if (error) throw new Error(error.message);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    if (!carouselRef.current) return;

    const scrollToSlide = (index: number) => {
      const element = carouselRef.current;
      if (!element) return;

      const slideWidth = element.querySelector('.carousel-item')?.clientWidth || 0;
      element.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    };

    scrollToSlide(currentSlide);
  }, [currentSlide]);

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-royal-gold mx-auto"></div>
          <p className="mt-4 text-royal-purple">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-royal-purple mb-4">Visitor Experiences</h2>
          <div className="w-24 h-1 bg-royal-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Read what travelers have to say about their visits to the royal city of Mysore.
          </p>
        </div>

        <div className="relative">
          <div
            ref={carouselRef}
            className="carousel flex overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="carousel-item flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="bg-royal-cream rounded-lg p-6 h-full">
                  <div className="flex text-royal-gold mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-700 italic mb-6">
                    "{testimonial.comment}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.imageSrc}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-medium text-royal-purple">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute left-0 right-0 bottom-0 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full bg-royal-gold ${index === currentSlide ? "opacity-100" : "opacity-50"
                  } focus:outline-none`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
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

export default TestimonialSection;
