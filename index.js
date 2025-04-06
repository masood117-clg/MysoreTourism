// server/index.ts
import express3 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  usersMap;
  attractionsMap;
  accommodationsMap;
  testimonialsMap;
  contactMessagesMap;
  newsletterSubscribersMap;
  userIdCounter;
  attractionIdCounter;
  accommodationIdCounter;
  testimonialIdCounter;
  contactMessageIdCounter;
  newsletterSubscriberIdCounter;
  constructor() {
    this.usersMap = /* @__PURE__ */ new Map();
    this.attractionsMap = /* @__PURE__ */ new Map();
    this.accommodationsMap = /* @__PURE__ */ new Map();
    this.testimonialsMap = /* @__PURE__ */ new Map();
    this.contactMessagesMap = /* @__PURE__ */ new Map();
    this.newsletterSubscribersMap = /* @__PURE__ */ new Map();
    this.userIdCounter = 1;
    this.attractionIdCounter = 1;
    this.accommodationIdCounter = 1;
    this.testimonialIdCounter = 1;
    this.contactMessageIdCounter = 1;
    this.newsletterSubscriberIdCounter = 1;
    this.seedData();
  }
  // Original User methods
  async getUser(id) {
    return this.usersMap.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.usersMap.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.userIdCounter++;
    const user = { ...insertUser, id };
    this.usersMap.set(id, user);
    return user;
  }
  // Attractions
  async getAllAttractions() {
    return Array.from(this.attractionsMap.values());
  }
  async getAttractionById(id) {
    return this.attractionsMap.get(id);
  }
  async getAttractionsByCategory(category) {
    return Array.from(this.attractionsMap.values()).filter(
      (attraction) => attraction.category.includes(category)
    );
  }
  async getFeaturedAttractions() {
    return Array.from(this.attractionsMap.values()).filter(
      (attraction) => attraction.isFeatured
    );
  }
  async createAttraction(insertAttraction) {
    const id = this.attractionIdCounter++;
    const attraction = { ...insertAttraction, id };
    this.attractionsMap.set(id, attraction);
    return attraction;
  }
  // Accommodations
  async getAllAccommodations() {
    return Array.from(this.accommodationsMap.values());
  }
  async getAccommodationById(id) {
    return this.accommodationsMap.get(id);
  }
  async getAccommodationsByCategory(category) {
    return Array.from(this.accommodationsMap.values()).filter(
      (accommodation) => accommodation.category.includes(category)
    );
  }
  async createAccommodation(insertAccommodation) {
    const id = this.accommodationIdCounter++;
    const accommodation = { ...insertAccommodation, id };
    this.accommodationsMap.set(id, accommodation);
    return accommodation;
  }
  // Testimonials
  async getAllTestimonials() {
    return Array.from(this.testimonialsMap.values());
  }
  async createTestimonial(insertTestimonial) {
    const id = this.testimonialIdCounter++;
    const testimonial = { ...insertTestimonial, id };
    this.testimonialsMap.set(id, testimonial);
    return testimonial;
  }
  // Contact Messages
  async createContactMessage(insertContactMessage) {
    const id = this.contactMessageIdCounter++;
    const createdAt = /* @__PURE__ */ new Date();
    const contactMessage = {
      ...insertContactMessage,
      id,
      createdAt
    };
    this.contactMessagesMap.set(id, contactMessage);
    return contactMessage;
  }
  // Newsletter Subscribers
  async createNewsletterSubscriber(insertSubscriber) {
    const existingSubscriber = Array.from(this.newsletterSubscribersMap.values()).find(
      (sub) => sub.email === insertSubscriber.email
    );
    if (existingSubscriber) {
      return existingSubscriber;
    }
    const id = this.newsletterSubscriberIdCounter++;
    const subscribedAt = /* @__PURE__ */ new Date();
    const subscriber = {
      ...insertSubscriber,
      id,
      subscribedAt
    };
    this.newsletterSubscribersMap.set(id, subscriber);
    return subscriber;
  }
  // Seed initial data
  seedData() {
    const attractionsData = [
      {
        name: "Mysore Palace",
        description: "The magnificent Mysore Palace, officially known as Mysuru Palace, is one of India's most visited attractions. Marvel at the Indo-Saracenic architecture featuring domes, turrets, arches, and colonnades.",
        shortDescription: "Experience the grandeur of the royal city's iconic landmark",
        category: "palaces",
        timings: "10:00 AM - 5:30 PM",
        ticketPrice: "\u20B9200 for adults",
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
        ticketPrice: "\u20B930 for adults",
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
        ticketPrice: "\u20B975 for adults",
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
        ticketPrice: "\u20B980 for adults",
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
    attractionsData.forEach((attraction) => {
      this.createAttraction(attraction);
    });
    const accommodationsData = [
      {
        name: "Lalitha Mahal Palace Hotel",
        description: "Stay in a converted palace built by the Maharaja of Mysore in 1921. Experience royal luxury with heritage architecture and panoramic views of the city.",
        category: "luxury heritage",
        pricePerNight: "\u20B912,000",
        imageSrc: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/26/1f/3e/lalitha-mahal-palace.jpg?w=700&h=-1&s=1",
        rating: "5.0/5",
        reviewCount: 320,
        amenities: ["Free Wifi", "Swimming Pool", "Spa", "Restaurant"]
      },
      {
        name: "Radisson Blu Plaza",
        description: "Modern luxury hotel with excellent amenities, located conveniently near major attractions. Features comfortable rooms and professional service.",
        category: "mid-range",
        pricePerNight: "\u20B95,500",
        imageSrc: "https://images.trvl-media.com/lodging/10000000/9400000/9398400/9398400/5b3c1039.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium",
        rating: "4.3/5",
        reviewCount: 450,
        amenities: ["Free Wifi", "Swimming Pool", "Fitness Center", "Bar"]
      },
      {
        name: "Hotel Mayura",
        description: "Budget-friendly hotel with clean, comfortable rooms in the heart of Mysore city. Perfect for travelers looking for value accommodation with basic amenities.",
        category: "budget",
        pricePerNight: "\u20B92,200",
        imageSrc: "https://cdn.kstdc.co/uploads/2019/08/resize-16021417471236170917MayuraHoysala52.jpg",
        rating: "3.5/5",
        reviewCount: 280,
        amenities: ["Free Wifi", "Air Conditioning", "Restaurant"]
      }
    ];
    accommodationsData.forEach((accommodation) => {
      this.createAccommodation(accommodation);
    });
    const testimonialsData = [
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
    testimonialsData.forEach((testimonial) => {
      this.createTestimonial(testimonial);
    });
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var attractions = pgTable("attractions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  category: text("category").notNull(),
  // e.g., 'palaces', 'gardens', 'museums', 'religious-sites', 'wildlife'
  timings: text("timings").notNull(),
  ticketPrice: text("ticket_price").notNull(),
  imageSrc: text("image_src").notNull(),
  rating: text("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  isFeatured: boolean("is_featured").default(false),
  location: jsonb("location").notNull()
  // { lat: number, lng: number }
});
var accommodations = pgTable("accommodations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  // e.g., 'luxury', 'mid-range', 'budget', 'heritage'
  pricePerNight: text("price_per_night").notNull(),
  imageSrc: text("image_src").notNull(),
  rating: text("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  amenities: text("amenities").array().notNull()
  // e.g., ['WiFi', 'Pool', 'Spa']
});
var testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  // e.g., 'London, UK'
  comment: text("comment").notNull(),
  rating: text("rating").notNull(),
  imageSrc: text("image_src").notNull()
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow()
});
var insertAttractionSchema = createInsertSchema(attractions).omit({ id: true });
var insertAccommodationSchema = createInsertSchema(accommodations).omit({ id: true });
var insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });
var insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({ id: true, subscribedAt: true });
var insertUserSchema = createInsertSchema(users).omit({ id: true });

// server/routes.ts
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import express from "express";
async function registerRoutes(app2) {
  const apiRouter = express.Router();
  apiRouter.get("/attractions", async (req, res) => {
    try {
      const category = req.query.category;
      let attractions2;
      if (category && category !== "all") {
        attractions2 = await storage.getAttractionsByCategory(category);
      } else {
        attractions2 = await storage.getAllAttractions();
      }
      return res.json(attractions2);
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
  apiRouter.get("/accommodations", async (req, res) => {
    try {
      const category = req.query.category;
      let accommodations2;
      if (category && category !== "all") {
        accommodations2 = await storage.getAccommodationsByCategory(category);
      } else {
        accommodations2 = await storage.getAllAccommodations();
      }
      return res.json(accommodations2);
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
  apiRouter.get("/testimonials", async (req, res) => {
    try {
      const testimonials2 = await storage.getAllTestimonials();
      return res.json(testimonials2);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
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
  app2.use("/api", apiRouter);
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  base: "/MysoreTourism/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express3();
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 3e3;
  server.listen({
    port
    // host: "127.0.0.1",
    // reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
