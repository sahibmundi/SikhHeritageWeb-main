import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);
  // Biography endpoints
  app.get("/api/biography/timeline", async (req, res) => {
    try {
      const timeline = await storage.getTimeline();
      res.json(timeline);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch timeline" });
    }
  });

  app.get("/api/biography/sections", async (req, res) => {
    try {
      const sections = await storage.getBiographySections();
      res.json(sections);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch biography sections" });
    }
  });

  // Baani Pages endpoints
  app.get("/api/baani/pages", async (req, res) => {
    try {
      const pages = await storage.getBaaniPages();
      res.json(pages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch baani pages" });
    }
  });

  app.get("/api/baani/pages/:id", async (req, res) => {
    try {
      const page = await storage.getBaaniPageById(req.params.id);
      if (!page) {
        res.status(404).json({ error: "Baani page not found" });
        return;
      }
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch baani page" });
    }
  });

  app.get("/api/baani/pages/number/:pageNumber", async (req, res) => {
    try {
      const pageNumber = parseInt(req.params.pageNumber);
      if (isNaN(pageNumber)) {
        res.status(400).json({ error: "Invalid page number" });
        return;
      }
      const page = await storage.getBaaniPageByNumber(pageNumber);
      if (!page) {
        res.status(404).json({ error: "Baani page not found" });
        return;
      }
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch baani page" });
    }
  });

  // Baani text endpoint
  app.get("/api/baani/text", async (req, res) => {
    try {
      const text = await storage.getBaaniText();
      res.json({ text });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch baani text" });
    }
  });

  // Baani shabads endpoint (new format with left-right layout)
  app.get("/api/baani/shabads", async (req, res) => {
    try {
      const shabads = await storage.getBaaniShabads();
      res.json(shabads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch baani shabads" });
    }
  });

  // Baani Raags endpoints (legacy)
  app.get("/api/baani/raags", async (req, res) => {
    try {
      const text = await storage.getBaaniText();
      res.json({ text });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch baani" });
    }
  });

  app.get("/api/baani/raags/:id", async (req, res) => {
    try {
      const raag = await storage.getBaaniRaagById(req.params.id);
      if (!raag) {
        res.status(404).json({ error: "Baani raag not found" });
        return;
      }
      res.json(raag);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch baani raag" });
    }
  });

  // Gurdwaras endpoints
  app.get("/api/gurdwaras", async (req, res) => {
    try {
      const gurdwaras = await storage.getGurdwaras();
      res.json(gurdwaras);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gurdwaras" });
    }
  });

  app.get("/api/gurdwaras/:id", async (req, res) => {
    try {
      const gurdwara = await storage.getGurdwaraById(req.params.id);
      if (!gurdwara) {
        res.status(404).json({ error: "Gurdwara not found" });
        return;
      }
      res.json(gurdwara);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gurdwara" });
    }
  });

  // Resources endpoints
  app.get("/api/resources", async (req, res) => {
    try {
      const { category } = req.query;
      if (category && typeof category === "string") {
        const resources = await storage.getResourcesByCategory(category);
        res.json(resources);
      } else {
        const resources = await storage.getResources();
        res.json(resources);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch resources" });
    }
  });


  // Audio endpoints
  app.get("/api/audio", async (req, res) => {
    try {
      const tracks = await storage.getAudioTracks();
      res.json(tracks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch audio tracks" });
    }
  });

  return httpServer;
}
