import { TransportOption, GuidedTourFeature } from "@/lib/types";

const TransportSection = () => {
  const transportOptions: TransportOption[] = [
    {
      icon: "fas fa-plane",
      title: "Reaching Mysore",
      items: [
        { text: "By Air: The nearest airport is Mysore Airport (12 km) with limited domestic flights. Bangalore International Airport (170 km) is the major gateway." },
        { text: "By Train: Well-connected railway station with trains from Bangalore, Chennai, and other major cities." },
        { text: "By Road: Excellent bus services and highways connect Mysore to Bangalore (140 km) and other nearby cities." }
      ]
    },
    {
      icon: "fas fa-bus",
      title: "Public Transport",
      items: [
        { text: "City Buses: KSRTC operates city buses covering most tourist spots. Purchase a day pass for unlimited travel." },
        { text: "Tourist Buses: Special hop-on-hop-off services available during peak tourist seasons." },
        { text: "Tonga Rides: Traditional horse-drawn carriages around palace area, offering a unique heritage experience." }
      ]
    },
    {
      icon: "fas fa-taxi",
      title: "Private Transport",
      items: [
        { text: "Taxis: Available through apps like Ola and Uber, as well as prepaid taxi services at stations." },
        { text: "Auto Rickshaws: Convenient for short distances, negotiate fare or insist on meter." },
        { text: "Rental Options: Bicycles, scooters, and cars available for rent with proper identification." }
      ]
    }
  ];
  
  const guidedTourFeatures: GuidedTourFeature[] = [
    { text: "Full-day city tours covering all major attractions" },
    { text: "Special heritage walks around the palace and old city" },
    { text: "Culinary tours exploring Mysore's unique cuisine" },
    { text: "Day trips to nearby attractions like Srirangapatna and Somnathpur" }
  ];
  
  return (
    <section id="transport" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-royal-purple mb-4">Getting Around</h2>
          <div className="w-24 h-1 bg-royal-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Navigate Mysore with ease using various transportation options available in and around the city.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {transportOptions.map((option, index) => (
            <div key={index} className="bg-royal-cream rounded-lg p-6">
              <div className="w-16 h-16 bg-royal-gold rounded-full flex items-center justify-center mb-4">
                <i className={`${option.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-3">{option.title}</h3>
              <ul className="space-y-3 text-gray-700">
                {option.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <i className="fas fa-check-circle text-royal-green mt-1 mr-2"></i>
                    <div>
                      {item.text.split(':').length > 1 ? (
                        <>
                          <span className="font-medium">{item.text.split(':')[0]}:</span>
                          {item.text.split(':').slice(1).join(':')}
                        </>
                      ) : (
                        item.text
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-royal-purple rounded-lg overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-playfair font-bold text-white mb-4">Guided Tours</h3>
              <p className="text-gray-200 mb-6">
                For the best experience, consider booking a guided tour with knowledgeable local guides who can share insights about Mysore's royal history, architecture, and cultural significance.
              </p>
              <div className="space-y-3 text-gray-200 mb-6">
                {guidedTourFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <i className="fas fa-star text-royal-gold mt-1 mr-2"></i>
                    <div>{feature.text}</div>
                  </div>
                ))}
              </div>
              <a href="#" className="inline-block px-6 py-2 bg-royal-gold hover:bg-yellow-600 text-white rounded-full font-medium transition-colors duration-300 self-start">
                Book a Tour Guide
              </a>
            </div>
            <div 
              className="bg-cover bg-center h-full min-h-[300px]" 
              style={{backgroundImage: "url('https://media.tacdn.com/media/attractions-splice-spp-674x446/07/ad/f4/8c.jpg')"}}
            >
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransportSection;
