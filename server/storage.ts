import { 
  attractions, Attraction, InsertAttraction,
  accommodations, Accommodation, InsertAccommodation,
  testimonials, Testimonial, InsertTestimonial,
  contactMessages, ContactMessage, InsertContactMessage,
  newsletterSubscribers, NewsletterSubscriber, InsertNewsletterSubscriber,
  users, User, InsertUser 
} from "@shared/schema";

// Extend the interface with all necessary CRUD operations
export interface IStorage {
  // Original User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Attractions
  getAllAttractions(): Promise<Attraction[]>;
  getAttractionById(id: number): Promise<Attraction | undefined>;
  getAttractionsByCategory(category: string): Promise<Attraction[]>;
  getFeaturedAttractions(): Promise<Attraction[]>;
  createAttraction(attraction: InsertAttraction): Promise<Attraction>;

  // Accommodations
  getAllAccommodations(): Promise<Accommodation[]>;
  getAccommodationById(id: number): Promise<Accommodation | undefined>;
  getAccommodationsByCategory(category: string): Promise<Accommodation[]>;
  createAccommodation(accommodation: InsertAccommodation): Promise<Accommodation>;

  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;

  // Newsletter Subscribers
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
}

export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private attractionsMap: Map<number, Attraction>;
  private accommodationsMap: Map<number, Accommodation>;
  private testimonialsMap: Map<number, Testimonial>;
  private contactMessagesMap: Map<number, ContactMessage>;
  private newsletterSubscribersMap: Map<number, NewsletterSubscriber>;
  
  private userIdCounter: number;
  private attractionIdCounter: number;
  private accommodationIdCounter: number;
  private testimonialIdCounter: number;
  private contactMessageIdCounter: number;
  private newsletterSubscriberIdCounter: number;

  constructor() {
    this.usersMap = new Map();
    this.attractionsMap = new Map();
    this.accommodationsMap = new Map();
    this.testimonialsMap = new Map();
    this.contactMessagesMap = new Map();
    this.newsletterSubscribersMap = new Map();
    
    this.userIdCounter = 1;
    this.attractionIdCounter = 1;
    this.accommodationIdCounter = 1;
    this.testimonialIdCounter = 1;
    this.contactMessageIdCounter = 1;
    this.newsletterSubscriberIdCounter = 1;

    this.seedData();
  }

  // Original User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.usersMap.set(id, user);
    return user;
  }

  // Attractions
  async getAllAttractions(): Promise<Attraction[]> {
    return Array.from(this.attractionsMap.values());
  }

  async getAttractionById(id: number): Promise<Attraction | undefined> {
    return this.attractionsMap.get(id);
  }

  async getAttractionsByCategory(category: string): Promise<Attraction[]> {
    return Array.from(this.attractionsMap.values()).filter(
      (attraction) => attraction.category.includes(category)
    );
  }

  async getFeaturedAttractions(): Promise<Attraction[]> {
    return Array.from(this.attractionsMap.values()).filter(
      (attraction) => attraction.isFeatured
    );
  }

  async createAttraction(insertAttraction: InsertAttraction): Promise<Attraction> {
    const id = this.attractionIdCounter++;
    const attraction: Attraction = { ...insertAttraction, id };
    this.attractionsMap.set(id, attraction);
    return attraction;
  }

  // Accommodations
  async getAllAccommodations(): Promise<Accommodation[]> {
    return Array.from(this.accommodationsMap.values());
  }

  async getAccommodationById(id: number): Promise<Accommodation | undefined> {
    return this.accommodationsMap.get(id);
  }

  async getAccommodationsByCategory(category: string): Promise<Accommodation[]> {
    return Array.from(this.accommodationsMap.values()).filter(
      (accommodation) => accommodation.category.includes(category)
    );
  }

  async createAccommodation(insertAccommodation: InsertAccommodation): Promise<Accommodation> {
    const id = this.accommodationIdCounter++;
    const accommodation: Accommodation = { ...insertAccommodation, id };
    this.accommodationsMap.set(id, accommodation);
    return accommodation;
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonialsMap.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialIdCounter++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonialsMap.set(id, testimonial);
    return testimonial;
  }

  // Contact Messages
  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageIdCounter++;
    const createdAt = new Date();
    const contactMessage: ContactMessage = { 
      ...insertContactMessage, 
      id, 
      createdAt 
    };
    this.contactMessagesMap.set(id, contactMessage);
    return contactMessage;
  }

  // Newsletter Subscribers
  async createNewsletterSubscriber(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    // Check if email already exists
    const existingSubscriber = Array.from(this.newsletterSubscribersMap.values()).find(
      (sub) => sub.email === insertSubscriber.email
    );
    
    if (existingSubscriber) {
      return existingSubscriber;
    }
    
    const id = this.newsletterSubscriberIdCounter++;
    const subscribedAt = new Date();
    const subscriber: NewsletterSubscriber = { 
      ...insertSubscriber, 
      id, 
      subscribedAt 
    };
    this.newsletterSubscribersMap.set(id, subscriber);
    return subscriber;
  }

  // Seed initial data
  private seedData() {
    // Seed Attractions
    const attractionsData: InsertAttraction[] = [
      {
        name: "Mysore Palace",
        description: "The magnificent Mysore Palace, officially known as Mysuru Palace, is one of India's most visited attractions. Marvel at the Indo-Saracenic architecture featuring domes, turrets, arches, and colonnades.",
        shortDescription: "Experience the grandeur of the royal city's iconic landmark",
        category: "palaces",
        timings: "10:00 AM - 5:30 PM",
        ticketPrice: "₹200 for adults",
        imageSrc: "https://dwq3yv87q1b43.cloudfront.net/public/blogs/fit-in/1200x675/Blog_20241130-237756404-1732944745.jpg",
        rating: "4.8/5",
        reviewCount: 2450,
        isFeatured: true,
        location: { lat: 12.3051, lng: 76.6551 }
      },
      {
        name: "Chamundi Hills",
        description: "Visit the 1,000+ steps to Sri Chamundeswari Temple situated atop Chamundi Hills. Along the way, see the massive Nandi (bull) statue carved from a single rock and enjoy panoramic views of Mysore city.",
        shortDescription: "Discover the spiritual heart of Mysore with panoramic city views",
        category: "religious-sites",
        timings: "7:30 AM - 9:00 PM",
        ticketPrice: "Free entry",
        imageSrc: "https://static.toiimg.com/thumb/msid-51680194,width=1200,height=900/51680194.jpg",
        rating: "4.5/5",
        reviewCount: 1820,
        isFeatured: true,
        location: { lat: 12.2724, lng: 76.6736 }
      },
      {
        name: "Brindavan Gardens",
        description: "Located at the base of KRS Dam, these terraced gardens feature botanical arrangements, lush lawns, and the famous musical fountain show in the evenings that attracts visitors from across India.",
        shortDescription: "Stroll through beautifully landscaped terraced gardens with musical fountains",
        category: "gardens",
        timings: "6:30 AM - 8:00 PM",
        ticketPrice: "₹30 for adults",
        imageSrc: "https://storage.googleapis.com/goa-app-12a91.appspot.com/2024-07-10T13%3A30%3A57.824Zl64220211005180331-%281%29-%281%29.webp?GoogleAccessId=firebase-adminsdk-zeqcj%40goa-app-12a91.iam.gserviceaccount.com&Expires=16447017600&Signature=DVHAE8rpmn7NpuDfRn1HvG4KJQBMdgYO8tRw30Jo0o81VISippWn%2FBoMyv%2Frfe2iC5gfG5TFIsSJOf4cZ7kdrZ5ma5Sy80UBy5ijaNxStcEPUQmBmfc1RLJ4pX0xFyTFTIn4XAoMPrOaQ95A%2FsAP2cBPBqVpsCmKPq0PRX2eD%2BZl3YF0RZOe25sCiYfnzcFlJKk%2FvaAz%2FOTCn8tswNDt7NgseFzPlenmICejyvKOH9N6wlVnyRai39sfvPqSW1hdab6qiA6quQ257r03YVInfaLGfp%2FJHWCGGmz7MIVLnyyf62BQvOvCf42BvGDezUs5B6g9Ai%2BnggbrlgyCgL%2BvJQ%3D%3D",
        rating: "4.0/5",
        reviewCount: 1560,
        isFeatured: true,
        location: { lat: 12.4214, lng: 76.5733 }
      },
      {
        name: "Jaganmohan Palace & Art Gallery",
        description: "Built in 1861, this palace now houses one of the largest collections of artifacts and paintings from the Mysore royal family, including works by Raja Ravi Varma and traditional Mysore paintings.",
        shortDescription: "Explore the royal art collection in this historic palace",
        category: "palaces museums",
        timings: "8:30 AM - 5:00 PM",
        ticketPrice: "₹75 for adults",
        imageSrc: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/81/97/e5/outside-view-of-the-palace.jpg?w=900&h=500&s=1",
        rating: "4.2/5",
        reviewCount: 950,
        isFeatured: false,
        location: { lat: 12.3047, lng: 76.6527 }
      },
      {
        name: "Sri Chamarajendra Zoological Gardens",
        description: "One of India's oldest and most popular zoos, established in 1892. Home to a wide range of species including white tigers, giraffes, gorillas, and rare animals housed in natural habitats.",
        shortDescription: "Visit one of India's oldest zoos with diverse wildlife",
        category: "wildlife",
        timings: "8:30 AM - 5:30 PM (Closed on Tuesdays)",
        ticketPrice: "₹80 for adults",
        imageSrc: "https://images.nativeplanet.com/img/2016/10/mysorezoo-17-1476708019.jpg",
        rating: "4.6/5",
        reviewCount: 2120,
        isFeatured: false,
        location: { lat: 12.3022, lng: 76.6637 }
      },
      {
        name: "St. Philomena's Cathedral",
        description: "Built in Neo-Gothic style, this impressive cathedral is one of the largest churches in India. Admire the beautiful stained glass windows and twin spires reminiscent of Cologne Cathedral.",
        shortDescription: "Marvel at the Neo-Gothic architecture of this grand cathedral",
        category: "religious-sites",
        timings: "7:00 AM - 6:00 PM",
        ticketPrice: "Free entry",
        imageSrc: "https://karnatakatourism.org/wp-content/uploads/2020/11/2-5.jpg",
        rating: "4.3/5",
        reviewCount: 1240,
        isFeatured: false,
        location: { lat: 12.3194, lng: 76.6504 }
      }
    ];

    attractionsData.forEach(attraction => {
      this.createAttraction(attraction);
    });

    // Seed Accommodations
    const accommodationsData: InsertAccommodation[] = [
      {
        name: "Lalitha Mahal Palace Hotel",
        description: "Stay in a converted palace built by the Maharaja of Mysore in 1921. Experience royal luxury with heritage architecture and panoramic views of the city.",
        category: "luxury heritage",
        pricePerNight: "₹12,000",
        imageSrc: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/26/1f/3e/lalitha-mahal-palace.jpg?w=700&h=-1&s=1",
        rating: "5.0/5",
        reviewCount: 320,
        amenities: ["Free Wifi", "Swimming Pool", "Spa", "Restaurant"]
      },
      {
        name: "Radisson Blu Plaza",
        description: "Modern luxury hotel with excellent amenities, located conveniently near major attractions. Features comfortable rooms and professional service.",
        category: "mid-range",
        pricePerNight: "₹5,500",
        imageSrc: "https://images.trvl-media.com/lodging/10000000/9400000/9398400/9398400/5b3c1039.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        rating: "4.3/5",
        reviewCount: 450,
        amenities: ["Free Wifi", "Swimming Pool", "Fitness Center", "Bar"]
      },
      {
        name: "Hotel Mayura",
        description: "Budget-friendly hotel with clean, comfortable rooms in the heart of Mysore city. Perfect for travelers looking for value accommodation with basic amenities.",
        category: "budget",
        pricePerNight: "₹2,200",
        imageSrc: "https://cdn.kstdc.co/uploads/2019/08/resize-16021417471236170917MayuraHoysala52.jpg",
        rating: "3.5/5",
        reviewCount: 280,
        amenities: ["Free Wifi", "Air Conditioning", "Restaurant"]
      }
    ];

    accommodationsData.forEach(accommodation => {
      this.createAccommodation(accommodation);
    });

    // Seed Testimonials
    const testimonialsData: InsertTestimonial[] = [
      {
        name: "Sarah Thompson",
        location: "London, UK",
        comment: "The illuminated Mysore Palace at night was breathtaking! We spent three days exploring the city and loved every moment. The local cuisine, especially the Mysore Pak sweet, was delicious. Highly recommend visiting during Dasara festival.",
        rating: "5.0/5",
        imageSrc: "https://randomuser.me/api/portraits/women/45.jpg"
      },
      {
        name: "Rajesh Patel",
        location: "Mumbai, India",
        comment: "My family and I thoroughly enjoyed our stay in Mysore. The Brindavan Gardens in the evening with the musical fountain show was magical. The city is clean, well-planned, and the locals are very friendly and helpful to tourists.",
        rating: "4.5/5",
        imageSrc: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        name: "Maria Rodriguez",
        location: "Barcelona, Spain",
        comment: "As a history enthusiast, Mysore was a dream destination. The architecture of the palace is simply stunning. Don't miss climbing Chamundi Hills for the panoramic view of the city. The silk sarees I purchased are treasured souvenirs.",
        rating: "4.0/5",
        imageSrc: "https://randomuser.me/api/portraits/women/68.jpg"
      }
    ];

    testimonialsData.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
}

export const storage = new MemStorage();
