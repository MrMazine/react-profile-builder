import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPortfolioConfigSchema } from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password || !user.isAdmin) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({ success: true, user: { id: user.id, username: user.username, isAdmin: user.isAdmin } });
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
      const validatedData = insertPortfolioConfigSchema.parse(req.body);
      const updatedConfig = await storage.updatePortfolioConfig(validatedData);
      res.json(updatedConfig);
    } catch (error) {
      res.status(400).json({ error: "Invalid configuration data" });
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
