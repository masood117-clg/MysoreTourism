import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertNewsletterSubscriberSchema 
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Endpoints
  const apiRouter = express.Router();
  
  // Attractions endpoints
  apiRouter.get("/attractions", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      let attractions;
      
      if (category && category !== "all") {
        attractions = await storage.getAttractionsByCategory(category);
      } else {
        attractions = await storage.getAllAttractions();
      }
      
      return res.json(attractions);
    } catch (error) {
      console.error("Error fetching attractions:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.get("/attractions/featured", async (req, res) => {
    try {
      const featuredAttractions = await storage.getFeaturedAttractions();
      return res.json(featuredAttractions);
    } catch (error) {
      console.error("Error fetching featured attractions:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.get("/attractions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const attraction = await storage.getAttractionById(id);
      if (!attraction) {
        return res.status(404).json({ message: "Attraction not found" });
      }
      
      return res.json(attraction);
    } catch (error) {
      console.error("Error fetching attraction:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Accommodations endpoints
  apiRouter.get("/accommodations", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      let accommodations;
      
      if (category && category !== "all") {
        accommodations = await storage.getAccommodationsByCategory(category);
      } else {
        accommodations = await storage.getAllAccommodations();
      }
      
      return res.json(accommodations);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  apiRouter.get("/accommodations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const accommodation = await storage.getAccommodationById(id);
      if (!accommodation) {
        return res.status(404).json({ message: "Accommodation not found" });
      }
      
      return res.json(accommodation);
    } catch (error) {
      console.error("Error fetching accommodation:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Testimonials endpoint
  apiRouter.get("/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      return res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Contact form submission
  apiRouter.post("/contact", async (req, res) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      const savedMessage = await storage.createContactMessage(contactData);
      return res.status(201).json({ 
        message: "Contact message sent successfully", 
        id: savedMessage.id 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error saving contact message:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Newsletter subscription
  apiRouter.post("/newsletter", async (req, res) => {
    try {
      const subscriberData = insertNewsletterSubscriberSchema.parse(req.body);
      await storage.createNewsletterSubscriber(subscriberData);
      return res.status(201).json({ message: "Subscribed to newsletter successfully" });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Error saving newsletter subscription:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Mount all API routes under /api prefix
  app.use("/api", apiRouter);
  
  const httpServer = createServer(app);
  return httpServer;
}

import express from "express";
