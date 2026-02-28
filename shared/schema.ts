import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Timeline Event Type
export interface TimelineEvent {
  year: string;
  label: string;
  sectionId: string;
}

// Biography Section Type
export interface BiographySection {
  id: string;
  heading: string;
  content: string;
}

// Baani Shabad (Hymn) Type
export interface BaaniShabad {
  id: string;
  text: string;
  order: number;
}

// Baani Raag Type
export interface BaaniRaag {
  id: string;
  name: string;
  title: string;
  order: number;
  shabads: BaaniShabad[];
}

// Legacy Baani Page Type (kept for compatibility)
export interface BaaniPage {
  id: string;
  pageNumber: number;
  imageUrl: string;
  title: string;
}

// PDF Asset Type
export interface PdfAsset {
  label: string;
  fileName: string;
}

// Gurdwara Type
export interface Gurdwara {
  id: string;
  name: string;
  imageUrl?: string;
  briefHistory: string;
  fullHistory: string;
  location: {
    address: string;
    mapEmbedUrl?: string;
  };
  pdfAssets?: PdfAsset[];
  visitDate?: string;
  chronologicalOrder?: number;
}

// Resource Type
export interface Resource {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  category: string;
}

// Audio Track Type (kept for future use, but removed raagId/shabadId)
export interface AudioTrack {
  id: string;
  title: string;
  performer: string;
  duration: string;
  audioUrl: string;
  description: string;
}
