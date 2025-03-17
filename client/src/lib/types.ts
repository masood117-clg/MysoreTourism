// Type definitions for client-side use

export interface Attraction {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  timings: string;
  ticketPrice: string;
  imageSrc: string;
  rating: string;
  reviewCount: number;
  isFeatured: boolean;
  location: { lat: number; lng: number };
}

export interface Accommodation {
  id: number;
  name: string;
  description: string;
  category: string;
  pricePerNight: string;
  imageSrc: string;
  rating: string;
  reviewCount: number;
  amenities: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  comment: string;
  rating: string;
  imageSrc: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterSubscription {
  email: string;
}

export interface CarouselItem {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
}

export interface MapLocation {
  id: number;
  name: string;
  description: string;
  category: string;
  position: [number, number]; // [latitude, longitude]
  icon?: string;
}

export interface IntroFeature {
  icon: string;
  title: string;
  description: string;
}

export interface TransportOption {
  icon: string;
  title: string;
  items: {
    text: string;
    highlighted?: boolean;
  }[];
}

export interface GuidedTourFeature {
  text: string;
}
