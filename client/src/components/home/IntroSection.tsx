import { IntroFeature } from "@/lib/types";

const IntroSection = () => {
  const features: IntroFeature[] = [
    {
      icon: "fas fa-landmark",
      title: "Rich History",
      description: "Explore the legacy of the Wadiyar dynasty and the architectural marvels they created."
    },
    {
      icon: "fas fa-palette",
      title: "Vibrant Culture",
      description: "Immerse yourself in the city's art, music, dance, and traditional craftsmanship."
    },
    {
      icon: "fas fa-leaf",
      title: "Natural Beauty",
      description: "Discover lush gardens, serene lakes, and the majestic Western Ghats surrounding the city."
    }
  ];
  
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-royal-purple mb-4">Welcome to the Royal City of Mysore</h2>
          <div className="w-24 h-1 bg-royal-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 mb-8">
            Experience the rich cultural heritage, magnificent palaces, and breathtaking landscapes of Mysore, 
            a city steeped in royal history and tradition. From the iconic Mysore Palace to the serene Karanji Lake, 
            discover the perfect blend of historical grandeur and natural beauty.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg bg-royal-cream">
                <div className="w-16 h-16 bg-royal-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${feature.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
