import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Original users table (kept for reference)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Tourist attractions
export const attractions = pgTable("attractions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  category: text("category").notNull(), // e.g., 'palaces', 'gardens', 'museums', 'religious-sites', 'wildlife'
  timings: text("timings").notNull(),
  ticketPrice: text("ticket_price").notNull(),
  imageSrc: text("image_src").notNull(),
  rating: text("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  isFeatured: boolean("is_featured").default(false),
  location: jsonb("location").notNull(), // { lat: number, lng: number }
});

// Accommodations
export const accommodations = pgTable("accommodations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // e.g., 'luxury', 'mid-range', 'budget', 'heritage'
  pricePerNight: text("price_per_night").notNull(),
  imageSrc: text("image_src").notNull(),
  rating: text("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  amenities: text("amenities").array().notNull(), // e.g., ['WiFi', 'Pool', 'Spa']
});

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(), // e.g., 'London, UK'
  comment: text("comment").notNull(),
  rating: text("rating").notNull(),
  imageSrc: text("image_src").notNull(),
});

// Contact messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Newsletter subscribers
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
});

// Schema validation for inserts
export const insertAttractionSchema = createInsertSchema(attractions).omit({ id: true });
export const insertAccommodationSchema = createInsertSchema(accommodations).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });
export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({ id: true, subscribedAt: true });
export const insertUserSchema = createInsertSchema(users).omit({ id: true });

// Type definitions
export type InsertAttraction = z.infer<typeof insertAttractionSchema>;
export type InsertAccommodation = z.infer<typeof insertAccommodationSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Attraction = typeof attractions.$inferSelect;
export type Accommodation = typeof accommodations.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type User = typeof users.$inferSelect;
