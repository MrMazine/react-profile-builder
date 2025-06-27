import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./fileStorage";
import { z } from "zod";

const portfolioConfigSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  about: z.string().min(1, "About is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  location: z.string().optional(),
  profileImage: z.string().optional(),
  theme: z.enum(["purple", "blue", "green", "red", "yellow"]),
  skills: z.object({
    primary: z.string(),
    secondary: z.string(),
    tertiary: z.string(),
    framework: z.string(),
    other: z.string(),
    database: z.string()
  }).optional(),
  stats: z.object({
    projects: z.string(),
    satisfaction: z.string(),
    experience: z.string()
  }).optional(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string(),
    icon: z.string()
  })).optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Portfolio configuration routes
  app.get("/api/config", async (req, res) => {
    try {
      const config = await storage.getPortfolioConfig();
      res.json(config || {});
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch configuration" });
    }
  });

  app.put("/api/config", async (req, res) => {
    try {
      const validatedData = portfolioConfigSchema.parse(req.body);
      const updatedConfig = await storage.updatePortfolioConfig(validatedData);
      res.json(updatedConfig);
    } catch (error) {
      res.status(400).json({ error: "Invalid configuration data" });
    }
  });

  // Image upload route
  app.post("/api/upload-image", async (req, res) => {
    try {
      const { imageData, filename } = req.body;
      
      if (!imageData || !filename) {
        return res.status(400).json({ error: "Image data and filename required" });
      }

      const imagePath = await storage.saveUploadedImage(imageData, filename);
      res.json({ url: imagePath });
    } catch (error) {
      res.status(400).json({ error: "Failed to upload image" });
    }
  });

  // Projects routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // Services routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
