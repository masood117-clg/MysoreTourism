const CulturalSection = () => {
  const culturalActivities = [
    {
      icon: "fas fa-music",
      title: "Carnatic Music",
      description: "Mysore has a distinguished tradition of Carnatic music with the Mysore royal family being great patrons of this art form. The city continues to host renowned concerts and has produced many legendary musicians."
    },
    {
      icon: "fas fa-paint-brush",
      title: "Mysore Paintings",
      description: "Known for their rich colors, intricate details, and use of gold leaf, Mysore paintings depict Hindu gods, goddesses, and mythological scenes. These traditional works can be found in galleries and workshops around the city."
    },
    {
      icon: "fas fa-mask",
      title: "Yakshagana",
      description: "This traditional theater form combines dance, music, dialogue, costume, makeup, and stage techniques with a unique style and form. Performances often depict episodes from Hindu epics and can be seen at cultural centers."
    }
  ];
  
  return (
    <section id="cultural" className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-royal-purple mb-4">Cultural Heritage</h2>
          <div className="w-24 h-1 bg-royal-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Experience the rich cultural legacy of Mysore through its art forms, festivals, and traditions that have been preserved for generations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <img 
              src="https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-114110656/114110656.jpg" 
              alt="Dasara Festival Celebration" 
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-2xl font-playfair font-bold text-royal-purple mb-4">The Grand Mysore Dasara</h3>
            <p className="text-gray-700 mb-4">
              Mysore Dasara is the state festival of Karnataka celebrated for 10 days during Navratri. The highlight is the magnificent procession (Jumboo Savari) on Vijayadashami, featuring caparisoned elephants, music bands, dance groups, and the idol of Goddess Chamundeshwari placed in a golden howdah on the lead elephant.
            </p>
            <p className="text-gray-700 mb-6">
              During these ten days, the Mysore Palace is illuminated with thousands of lights and various cultural programs are held across the city, making it a spectacle that attracts visitors from around the world.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center bg-royal-cream px-4 py-2 rounded-full">
                <i className="fas fa-calendar-alt text-royal-gold mr-2"></i>
                <span>Usually in October</span>
              </div>
              <div className="flex items-center bg-royal-cream px-4 py-2 rounded-full">
                <i className="fas fa-ticket-alt text-royal-gold mr-2"></i>
                <span>Special viewing stands available</span>
              </div>
              <div className="flex items-center bg-royal-cream px-4 py-2 rounded-full">
                <i className="fas fa-camera text-royal-gold mr-2"></i>
                <span>Photography permitted</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {culturalActivities.map((activity, index) => (
            <div key={index} className="bg-royal-cream rounded-lg p-6">
              <div className="w-16 h-16 bg-royal-gold rounded-full flex items-center justify-center mb-4">
                <i className={`${activity.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-3">{activity.title}</h3>
              <p className="text-gray-600">{activity.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-royal-purple rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-playfair font-bold text-white mb-4">Mysore's Craft Heritage</h3>
              <p className="text-gray-200 mb-6">
                Explore the traditional crafts of Mysore region that have been perfected over centuries. From the luxurious Mysore Silk sarees to intricate wooden inlay work, rosewood carvings, and the famous Mysore sandal soap, each craft tells a story of artistic excellence.
              </p>
              <a href="#" className="inline-block px-6 py-2 bg-royal-gold hover:bg-yellow-600 text-white rounded-full font-medium transition-colors duration-300 self-start">
                Discover Local Crafts
              </a>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Mysore_Silk_Saree.jpg" alt="Mysore Silk" className="w-full h-full object-cover" />
              <img src="https://2.bp.blogspot.com/-q5w0kYUKNPc/UtHmV2ebscI/AAAAAAAAD9c/l15m51wMgBs/s1600/4.gif" alt="Wood Carving" className="w-full h-full object-cover" />
              <img src="https://bxmysuru.com/wp-content/uploads/2022/08/MysorePainting.jpg" alt="Mysore Painting" className="w-full h-full object-cover" />
              <img src="https://cdn.kstdc.co/uploads/2021/12/shutterstock_1166911006_LR.jpg" alt="Incense Making" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalSection;
