import type { TimelineEvent, BiographySection, BaaniPage, BaaniRaag, Gurdwara, Resource, AudioTrack } from "@shared/schema";
import type { BaaniShabad } from "./baani-data.js";

export interface IStorage {
  // Biography
  getTimeline(): Promise<TimelineEvent[]>;
  getBiographySections(): Promise<BiographySection[]>;
  
  // Baani Pages (legacy)
  getBaaniPages(): Promise<BaaniPage[]>;
  getBaaniPageById(id: string): Promise<BaaniPage | null>;
  getBaaniPageByNumber(pageNumber: number): Promise<BaaniPage | null>;
  
  // Baani Raags (new text-based)
  getBaaniRaags(): Promise<BaaniRaag[]>;
  getBaaniRaagById(id: string): Promise<BaaniRaag | null>;
  getBaaniText(): Promise<string>;
  getBaaniShabads(): Promise<BaaniShabad[]>;
  
  // Gurdwaras
  getGurdwaras(): Promise<Gurdwara[]>;
  getGurdwaraById(id: string): Promise<Gurdwara | null>;
  
  // Resources
  getResources(): Promise<Resource[]>;
  getResourcesByCategory(category: string): Promise<Resource[]>;
  
  // Audio
  getAudioTracks(): Promise<AudioTrack[]>;
}

// Load Gurdwara data from JSON file
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { baaniPages as baaniPagesList } from "./baani-pages-data.js";
import { baaniRaags as baaniRaagsList, getBaaniText as loadBaaniText, getBaaniShabads as loadBaaniShabads } from "./baani-data.js";
import { audioTracks as audioTracksList } from "./audio-data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadGurdwaraData(): Gurdwara[] {
  try {
    const dataPath = path.join(process.cwd(), "server", "gurdwara-data.json");
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const gurdwaras = JSON.parse(rawData) as Array<{
      id: string;
      name: string;
      content: string;
      pdfFileName: string | null;
      chronologicalOrder?: number;
      visitDate?: string;
    }>;

    // Manual PDF mapping based on file names in attached_assets
    // Mapping gurdwara IDs from JSON to available PDF files
    const pdfMap: Record<string, string[]> = {
      "gurdwara-tegh-bahadur-sahib-bahadurgarh": ["ਗੁਰਦੁਆਰਾ ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਪਾਤਸ਼ਾਹੀ ਨੌਵੀਂ ਬਹਾਦਰਗੜ੍ਹ _1763096532039.pdf", "ਕਿਲ੍ਹਾ, ਬਹਾਦਰਗੜ੍ਹ _1763096532051.pdf"],
      "gurdwara-damdama-sahib-talwandi-sabo": ["Gurdwara Sahib Tamsimbli_1763096532024.pdf"],
    };

    // Image mapping for gurdwaras
    const imageMap: Record<string, string> = {
      "gurdwara-guru-ke-mahil": "/attached_assets/stock_images/golden_temple_amrits_5a97710a.jpg",
      "gurdwara-sis-ganj-sahib-delhi": "/attached_assets/stock_images/historic_sikh_gurdwa_e4790ed3.jpg",
      "gurdwara-rakab-ganj-sahib": "/attached_assets/stock_images/historic_sikh_gurdwa_ed04d20f.jpg",
      "gurdwara-sis-ganj-sahib-anandpur": "/attached_assets/stock_images/golden_temple_amrits_b2dcace7.jpg",
      "gurdwara-anandpur-sahib": "/attached_assets/stock_images/historic_sikh_gurdwa_93551c79.jpg",
      "gurdwara-sahib-bakala": "/attached_assets/stock_images/historic_sikh_gurdwa_31e75390.jpg",
      "takht-sri-patna-sahib": "/attached_assets/stock_images/historic_sikh_gurdwa_18088cc8.jpg",
      "gurdwara-damdama-sahib-dhubri": "/attached_assets/stock_images/golden_temple_amrits_e2318cb3.jpg",
      "gurdwara-tegh-bahadur-sahib-kurukshetra": "/attached_assets/stock_images/golden_temple_amrits_5a97710a.jpg",
      "gurdwara-tegh-bahadur-sahib-bahadurgarh": "/attached_assets/stock_images/historic_sikh_gurdwa_e4790ed3.jpg",
      "gurdwara-damdama-sahib-talwandi-sabo": "/attached_assets/stock_images/historic_sikh_gurdwa_ed04d20f.jpg",
    };

    // Transform and enrich data
    return gurdwaras.map((g) => {
      // Extract brief history from content (first 150-200 characters)
      const contentLines = g.content.split("\n");
      const firstPara = contentLines[0] || g.content;
      const briefHistory = firstPara.substring(0, 200).trim() + (firstPara.length > 200 ? "..." : "");

      // Extract location from name (text in parentheses)
      const locationMatch = g.name.match(/\(([^)]+)\)/);
      const location = locationMatch ? locationMatch[1] : "";

      // Build PDF assets
      const pdfFiles = pdfMap[g.id] || [];
      const pdfAssets = pdfFiles.map((fileName) => ({
        label: "ਵਧੇਰੇ ਜਾਣਕਾਰੀ",
        fileName,
      }));
      
      return {
        id: g.id,
        name: g.name,
        imageUrl: imageMap[g.id] || "/attached_assets/stock_images/golden_temple_amrits_5a97710a.jpg",
        briefHistory,
        fullHistory: g.content,
        location: {
          address: location,
          mapEmbedUrl: undefined,
        },
        pdfAssets: pdfAssets.length > 0 ? pdfAssets : undefined,
        visitDate: g.visitDate,
        chronologicalOrder: g.chronologicalOrder || 999,
      };
    })
    .sort((a, b) => (a.chronologicalOrder || 999) - (b.chronologicalOrder || 999));
  } catch (error) {
    console.error("Error loading gurdwara data:", error);
    return [];
  }
}

export class MemStorage implements IStorage {
  private baaniPages: BaaniPage[] = baaniPagesList;
  private baaniRaags: BaaniRaag[] = baaniRaagsList;
  
  private timeline: TimelineEvent[] = [
    { year: "1621", label: "ਜਨਮ", sectionId: "janm" },
    { year: "1635", label: "ਕਰਤਾਰਪੁਰ ਦੀ ਲੜਾਈ", sectionId: "kartarpur" },
    { year: "1664", label: "ਗੁਰਤਾ ਗੱਦੀ", sectionId: "gurgaddi" },
    { year: "1665-1675", label: "ਉਦੇਸੀ ਯਾਤਰਾ", sectionId: "yatra" },
    { year: "1675", label: "ਸ਼ਹੀਦੀ", sectionId: "shahidi" }
  ];

  private biographySections: BiographySection[] = [
    {
      id: "janm",
      heading: "ਜਨਮ ਅਤੇ ਮੁੱਢਲਾ ਜੀਵਨ (1621)",
      content: `ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਦਾ ਜਨਮ 1 ਅਪ੍ਰੈਲ 1621 ਦਿਨ ਐਤਵਾਰ ਨੂੰ ਮਾਤਾ ਨਾਨਕੀ ਜੀ ਦੀ ਕੁੱਖੋਂ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਗੁਰਦੁਆਰਾ ਗੁਰੂ ਕੇ ਮਹਿਲ ਦੇ ਸਥਾਨ ਤੇ ਹੋਇਆ। ਆਪ ਜੀ ਛੇਵੇਂ ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦੇ ਪੰਜਵੇਂ ਅਤੇ ਸੱਭ ਤੋਂ ਛੋਟੇ ਪੁੱਤਰ ਸਨ। ਬਚਪਨ ਵਿੱਚ ਉਨ੍ਹਾਂ ਦਾ ਨਾਮ ਤਿਆਗ ਮੱਲ ਸੀ ਜੋ ਬਾਅਦ ਵਿੱਚ ਉਨ੍ਹਾਂ ਦੇ ਸਾਹਸ ਅਤੇ ਬਹਾਦਰੀ ਨੂੰ ਵੇਖਦਿਆਂ ਤੇਗ ਬਹਾਦਰ ਰੱਖਿਆ ਗਿਆ।

ਆਪ ਜੀ ਨੇ ਮੁੱਢਲੀ ਉਮਰ ਅੰਮ੍ਰਿਤਸਰ ਵਿਖੇ ਗੁਜ਼ਾਰੀ ਅਤੇ ਬਚਪਨ ਤੋਂ ਹੀ ਗੁਰਬਾਣੀ ਦੀ ਸਿੱਖਿਆ ਅਤੇ ਸ਼ਸਤਰ ਵਿਦਿਆ ਦੋਵੇਂ ਪ੍ਰਾਪਤ ਕੀਤੀ। ਗੁਰੂ ਜੀ ਦੇ ਭੈਣ ਭਰਾਵਾਂ ਵਿੱਚ ਬਾਬਾ ਗੁਰਦਿੱਤਾ ਜੀ, ਬਾਬਾ ਸੂਰਜ ਮੱਲ, ਬਾਬਾ ਅਟੱਲ ਰਾਏ ਅਤੇ ਬੀਬੀ ਵੀਰੋ ਸਨ।

ਆਪ ਦਾ ਵਿਆਹ ਪਿੰਡ ਲਖਨੌਰੀ ਦੇ ਲਾਲਾ ਲਾਲ ਚੰਦ ਦੀ ਸੁਪੁੱਤਰੀ ਮਾਤਾ ਗੁਜਰੀ ਜੀ ਨਾਲ 1634 ਵਿੱਚ ਹੋਇਆ। 22 ਦਸੰਬਰ 1666 ਨੂੰ ਪਟਨਾ ਸਾਹਿਬ ਵਿਖੇ ਉਨ੍ਹਾਂ ਦੇ ਸੁਪੁੱਤਰ ਗੋਬਿੰਦ ਰਾਏ ਦਾ ਜਨਮ ਹੋਇਆ ਜੋ ਬਾਅਦ ਵਿੱਚ ਦਸਵੇਂ ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ ਜੀ ਬਣੇ।`
    },
    {
      id: "kartarpur",
      heading: "ਜਵਾਨੀ ਅਤੇ ਸਾਹਸ (1635-1644)",
      content: `ਸਿੱਖ ਵਿਦਵਾਨਾਂ ਅਨੁਸਾਰ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਸਾਹਿਬ ਜੀ ਨਿਮਰਤਾ ਦੇ ਪੁੰਜ, ਮਨ ਨੀਵਾਂ ਅਤੇ ਮਤ ਉਚੀ ਦੇ ਧਾਰਨੀ ਸਨ। 1634 ਵਿੱਚ ਕਰਤਾਰਪੁਰ ਦੀ ਲੜਾਈ ਸਮੇਂ ਜਦੋਂ ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਤੇ ਮੁਗਲ ਫੌਜਾਂ ਵਿਚਕਾਰ ਯੁੱਧ ਹੋਇਆ, ਤਦ ਮਹਿਜ਼ 13-14 ਸਾਲ ਦੀ ਉਮਰ ਦੇ ਨੌਜਵਾਨ ਤਿਆਗ ਮੱਲ ਨੇ ਅਸਾਧਾਰਨ ਸਾਹਸ ਦਿਖਾਇਆ।

ਇਸ ਯੁੱਧ ਵਿੱਚ ਉਨ੍ਹਾਂ ਦੇ ਬਹਾਦਰੀ ਅਤੇ ਸ਼ਸਤਰ ਕੌਸ਼ਲ ਨੂੰ ਵੇਖਦਿਆਂ ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਨੇ ਉਨ੍ਹਾਂ ਦਾ ਨਾਮ "ਤੇਗ ਬਹਾਦਰ" (ਤਲਵਾਰ ਦਾ ਬਹਾਦਰ) ਰੱਖਿਆ। ਇਸ ਤੋਂ ਬਾਅਦ ਆਪ ਇਸੇ ਨਾਮ ਨਾਲ ਜਾਣੇ ਜਾਣ ਲੱਗੇ।

ਜੁੱਝਾਰੂ ਸੁਭਾਅ ਦੇ ਨਾਲ-ਨਾਲ ਗੁਰੂ ਜੀ ਬਚਪਨ ਤੋਂ ਹੀ ਅਡੋਲ ਚਿੱਤ, ਗੰਭੀਰ ਸੁਭਾਅ ਅਤੇ ਵੈਰਾਗੀ ਵਿਚਾਰਾਂ ਦੇ ਮਾਲਕ ਸਨ। ਗੁਰੂ ਜੀ ਘੰਟੇ ਬੰਦੇ ਸਮਾਧੀ ਵਿੱਚ ਲੀਨ ਹੋਏ ਰਹਿੰਦੇ ਸਨ ਅਤੇ ਆਪਣੇ ਪਿਤਾ ਜੀ ਦੇ ਸਨਮੁੱਖ ਵੈਰਾਗ ਭਾਵ ਦੇ ਸ਼ਬਦ ਉਚਾਰਦੇ ਸਨ।`
    },
    {
      id: "gurgaddi",
      heading: "ਗੁਰਗੱਦੀ ਉੱਪਰ ਬਿਰਾਜਮਾਨ ਹੋਣਾ (1664)",
      content: `16 ਮਾਰਚ 1644 ਨੂੰ ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਜੋਤੀ ਜੋਤ ਸਮਾ ਗਏ ਅਤੇ ਗੁਰੂ ਹਰ ਰਾਏ ਜੀ ਸੱਤਵੇਂ ਗੁਰੂ ਬਣੇ। ਬਾਅਦ ਵਿੱਚ ਗੁਰੂ ਹਰ ਰਾਏ ਜੀ ਦੇ ਪੁੱਤਰ ਗੁਰੂ ਹਰ ਕਿਰਸ਼ਨ ਜੀ ਅੱਠਵੇਂ ਗੁਰੂ ਬਣੇ। 1664 ਵਿੱਚ ਗੁਰੂ ਹਰ ਕਿਰਸ਼ਨ ਜੀ ਦੇ ਜੋਤੀ ਜੋਤ ਸਮਾਉਣ ਸਮੇਂ ਉਨ੍ਹਾਂ ਨੇ "ਬਾਬਾ ਬਕਾਲੇ" ਕਹਿ ਕੇ ਅਗਲੇ ਗੁਰੂ ਦਾ ਸੰਕੇਤ ਦਿੱਤਾ।

ਗੁਰੂ ਹਰਗੋਬਿੰਦ ਸਾਹਿਬ ਜੀ ਦੇ ਜੋਤੀ ਜੋਤ ਸਮਾਉਣ ਤੋਂ ਬਾਅਦ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਪਿੰਡ ਬਕਾਲਾ ਆ ਗਏ ਅਤੇ ਇਕਾਂਤ ਵਿੱਚ ਨਾਮ ਸਿਮਰਨ ਅਤੇ ਮਨਨ ਕਰਨ ਲੱਗ ਪਏ। ਉਸ ਸਮੇਂ ਬਕਾਲੇ ਵਿੱਚ 22 ਝੂਠੇ ਗੁਰੂ ਬੈਠੇ ਹੋਏ ਸਨ ਜੋ ਆਪਣੇ ਆਪ ਨੂੰ ਗੁਰੂ ਦੱਸ ਰਹੇ ਸਨ।

ਭਾਈ ਮੱਖਣ ਸ਼ਾਹ ਲੁਬਾਣਾ ਇੱਕ ਵਪਾਰੀ ਸਨ ਜਿਨ੍ਹਾਂ ਦਾ ਜਹਾਜ਼ ਸਮੁੰਦਰ ਦੀ ਤੂਫ਼ਾਨ ਵਿੱਚ ਫਸ ਗਿਆ ਸੀ। ਉਨ੍ਹਾਂ ਨੇ ਗੁਰੂ ਜੀ ਨੂੰ ਯਾਦ ਕੀਤਾ ਅਤੇ ਮੰਨਤ ਮੰਗੀ ਕਿ ਜੇਕਰ ਜਹਾਜ਼ ਬਚ ਗਿਆ ਤਾਂ ਉਹ 500 ਮੋਹਰਾਂ ਗੁਰੂ ਦੀ ਸੇਵਾ ਵਿੱਚ ਭੇਂਟ ਕਰਨਗੇ। ਗੁਰੂ ਦੀ ਕਿਰਪਾ ਨਾਲ ਜਹਾਜ਼ ਬਚ ਗਿਆ।

ਭਾਈ ਮੱਖਣ ਸ਼ਾਹ ਆਪਣੀ ਮੰਨਤ ਪੂਰੀ ਕਰਨ ਲਈ 500 ਮੋਹਰਾਂ ਲੈ ਕੇ ਬਕਾਲੇ ਪਹੁੰਚੇ। ਉਨ੍ਹਾਂ ਨੇ ਹਰੇਕ ਝੂਠੇ ਗੁਰੂ ਕੋਲ ਦੋ ਮੋਹਰਾਂ ਦੀ ਭੇਂਟ ਰੱਖੀ ਪਰ ਕਿਸੇ ਨੇ ਵੀ ਸਹੀ ਉੱਤਰ ਨਾ ਦਿੱਤਾ। ਅੰਤ ਵਿੱਚ ਉਹ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਕੋਲ ਪਹੁੰਚੇ ਅਤੇ ਦੋ ਮੋਹਰਾਂ ਭੇਂਟ ਕੀਤੀਆਂ। ਗੁਰੂ ਜੀ ਨੇ ਮੁਸਕਰਾ ਕੇ ਪੁੱਛਿਆ, "ਤੁਸੀਂ 500 ਮੋਹਰਾਂ ਦੀ ਮੰਨਤ ਮੰਗੀ ਸੀ, ਦੋ ਕਿਉਂ ਭੇਂਟ ਕਰ ਰਹੇ ਹੋ?" ਇਸ ਤਰ੍ਹਾਂ ਭਾਈ ਮੱਖਣ ਸ਼ਾਹ ਨੇ ਸੱਚੇ ਗੁਰੂ ਦੀ ਪਛਾਣ ਕੀਤੀ ਅਤੇ 11 ਅਗਸਤ 1664 ਨੂੰ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਨੌਵੇਂ ਗੁਰੂ ਵਜੋਂ ਬਿਰਾਜਮਾਨ ਹੋਏ।`
    },
    {
      id: "yatra",
      heading: "ਉਦੇਸੀ ਯਾਤਰਾ ਅਤੇ ਪ੍ਰਚਾਰ (1665-1675)",
      content: `ਗੁਰੂ ਗੱਦੀ ਉੱਤੇ ਬਿਰਾਜਮਾਨ ਹੋਣ ਤੋਂ ਬਾਅਦ ਗੁਰੂ ਜੀ ਬਕਾਲੇ ਤੋਂ ਕੀਰਤਪੁਰ ਸਾਹਿਬ ਪੁੱਜੇ। ਇੱਥੇ ਕਹਿਲੂਰ (ਬਿਲਾਸਪੁਰ) ਦੇ ਰਾਜੇ ਤੋਂ ਜ਼ਮੀਨ ਖਰੀਦ ਕੇ ਆਨੰਦਪੁਰ ਸਾਹਿਬ ਸ਼ਹਿਰ ਦੀ ਨੀਂਹ ਰੱਖੀ। ਇਹੀ ਸਥਾਨ ਬਾਅਦ ਵਿੱਚ ਖਾਲਸਾ ਪੰਥ ਦੀ ਸਾਜਨਾ ਦਾ ਕੇਂਦਰ ਬਣਿਆ।

1665 ਤੋਂ 1675 ਤੱਕ ਗੁਰੂ ਜੀ ਨੇ ਭਾਰਤ ਦੇ ਵੱਖ-ਵੱਖ ਹਿੱਸਿਆਂ ਵਿੱਚ ਵਿਆਪਕ ਯਾਤਰਾਵਾਂ ਕੀਤੀਆਂ। ਉਨ੍ਹਾਂ ਨੇ ਮਾਲਵਾ, ਪੰਜਾਬ, ਅਸਾਮ, ਬੰਗਾਲ, ਬਿਹਾਰ ਅਤੇ ਉੱਤਰ ਪ੍ਰਦੇਸ਼ ਦੇ ਕਈ ਸਥਾਨਾਂ ਦਾ ਦੌਰਾ ਕੀਤਾ। ਇਨ੍ਹਾਂ ਯਾਤਰਾਵਾਂ ਦਾ ਮੁੱਖ ਮਕਸਦ ਗੁਰਬਾਣੀ ਦਾ ਪ੍ਰਚਾਰ ਅਤੇ ਲੋਕਾਂ ਨੂੰ ਧਾਰਮਿਕ ਸਿੱਖਿਆ ਦੇਣਾ ਸੀ।

ਇਨ੍ਹਾਂ ਯਾਤਰਾਵਾਂ ਦੌਰਾਨ ਗੁਰੂ ਜੀ ਨੇ ਕਈ ਗੁਰਦੁਆਰੇ ਅਤੇ ਸਿੱਖ ਕੇਂਦਰ ਸਥਾਪਿਤ ਕੀਤੇ ਜਿਵੇਂ ਕਿ ਗੁਰਦੁਆਰਾ ਦਮਦਮਾ ਸਾਹਿਬ ਧੁਬਰੀ (ਅਸਾਮ), ਗੁਰਦੁਆਰਾ ਤੇਗ ਬਹਾਦਰ ਸਾਹਿਬ ਢਾਕਾ (ਬੰਗਲਾਦੇਸ਼), ਗੁਰਦੁਆਰਾ ਦਮਦਮਾ ਸਾਹਿਬ ਤਲਵੰਡੀ ਸਾਬੋ ਆਦਿ। ਇਹ ਸਥਾਨ ਅੱਜ ਤੱਕ ਗੁਰੂ ਜੀ ਦੀ ਪਵਿੱਤਰ ਯਾਦ ਸੰਭਾਲਦੇ ਹਨ।

ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਦੀ ਬਾਣੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਵਿੱਚ 15 ਰਾਗਾਂ ਵਿੱਚ ਦਰਜ ਹੈ: ਗਉੜੀ, ਆਸਾ, ਦੇਵਗੰਧਾਰੀ, ਬਿਹਾਗੜਾ, ਸੋਰਠਿ, ਧਨਾਸਰੀ, ਜੈਜਾਵੰਤੀ, ਟੋਡੀ, ਤਿਲੰਗ, ਬਿਲਾਵਲ, ਗੋਂਡ, ਰਾਮਕਲੀ, ਮਾਲੀ ਗਉੜਾ, ਮਾਰੂ, ਕੇਦਾਰਾ, ਬਸੰਤ, ਸਾਰੰਗ ਅਤੇ ਜੈਤਸਰੀ। ਕੁੱਲ 116 ਸ਼ਬਦ ਅਤੇ 15 ਰਾਗਾਂ ਵਿੱਚ ਗੁਰੂ ਜੀ ਦੀ ਬਾਣੀ ਸ਼ਾਮਿਲ ਹੈ।`
    },
    {
      id: "shahidi",
      heading: "ਕਸ਼ਮੀਰੀ ਪੰਡਿਤਾਂ ਦੀ ਫ਼ਰਿਆਦ ਅਤੇ ਸ਼ਹੀਦੀ (1675)",
      content: `17ਵੀਂ ਸਦੀ ਵਿੱਚ ਮੁਗਲ ਬਾਦਸ਼ਾਹ ਔਰੰਗਜ਼ੇਬ ਨੇ ਇਸਲਾਮ ਨੂੰ ਫੈਲਾਉਣ ਲਈ ਸਖ਼ਤ ਨੀਤੀਆਂ ਅਪਣਾਈਆਂ। ਕਸ਼ਮੀਰ ਦਾ ਸੂਬੇਦਾਰ ਸ਼ੇਰ ਅਫ਼ਗਾਨ ਖਾਨ ਜ਼ੋਰ ਜ਼ਬਰਦਸਤੀ ਹਿੰਦੂਆਂ ਨੂੰ ਮੁਸਲਮਾਨ ਬਣਾ ਰਿਹਾ ਸੀ। ਕਸ਼ਮੀਰੀ ਪੰਡਤ ਬਹੁਤ ਦੁਖੀ ਸਨ ਅਤੇ ਉਨ੍ਹਾਂ ਦੇ ਕੋਲ ਕੋਈ ਰਾਹ ਨਹੀਂ ਸੀ।

25 ਮਈ 1675 ਨੂੰ ਪੰਡਿਤ ਕਿਰਪਾ ਰਾਮ ਦੱਤ ਦੀ ਅਗਵਾਈ ਵਿੱਚ 16 ਕਸ਼ਮੀਰੀ ਬ੍ਰਾਹਮਣ ਆਨੰਦਪੁਰ ਸਾਹਿਬ ਪਹੁੰਚੇ ਅਤੇ ਗੁਰੂ ਜੀ ਅੱਗੇ ਆਪਣੀ ਬੇਬਸੀ ਦਾ ਰੋਣਾ ਰੋਇਆ। ਗੁਰੂ ਜੀ ਨੇ ਉਨ੍ਹਾਂ ਦੀ ਸਮੱਸਿਆ ਸੁਣੀ ਅਤੇ ਕਿਹਾ ਕਿ ਜੇਕਰ ਕੋਈ ਮਹਾਨ ਵਿਅਕਤੀ ਧਰਮ ਦੀ ਖ਼ਾਤਰ ਕੁਰਬਾਨੀ ਦੇਵੇ ਤਾਂ ਇਹ ਸਮੱਸਿਆ ਹੱਲ ਹੋ ਸਕਦੀ ਹੈ। ਉਸ ਸਮੇਂ ਛੋਟੇ ਸਾਹਿਬਜ਼ਾਦੇ ਗੋਬਿੰਦ ਰਾਏ ਨੇ ਕਿਹਾ, "ਆਪ ਜੀ ਤੋਂ ਵੱਡਾ ਮਹਾਨ ਵਿਅਕਤੀ ਕੌਣ ਹੋ ਸਕਦਾ ਹੈ?" ਗੁਰੂ ਜੀ ਨੇ ਔਰੰਗਜ਼ੇਬ ਦੇ ਸਾਮ੍ਹਣੇ ਜਾਣ ਦਾ ਫੈਸਲਾ ਲਿਆ।

ਜੁਲਾਈ 1675 ਵਿੱਚ ਗੁਰੂ ਜੀ ਆਪਣੇ ਤਿੰਨ ਸਾਥੀਆਂ - ਭਾਈ ਮਤੀ ਦਾਸ ਜੀ, ਭਾਈ ਸਤੀ ਦਾਸ ਜੀ ਅਤੇ ਭਾਈ ਦਿਆਲਾ ਜੀ ਨਾਲ ਆਨੰਦਪੁਰ ਸਾਹਿਬ ਤੋਂ ਰਵਾਨਾ ਹੋਏ। ਉਨ੍ਹਾਂ ਨੂੰ ਆਗਰੇ ਦੇ ਨੇੜੇ ਗ੍ਰਿਫਤਾਰ ਕਰ ਲਿਆ ਗਿਆ ਅਤੇ ਦਿੱਲੀ ਲਿਆਂਦਾ ਗਿਆ।

ਦਿੱਲੀ ਵਿੱਚ ਔਰੰਗਜ਼ੇਬ ਨੇ ਗੁਰੂ ਜੀ ਨੂੰ ਇਸਲਾਮ ਕਬੂਲ ਕਰਨ ਲਈ ਕਿਹਾ। ਗੁਰੂ ਜੀ ਨੇ ਸਾਫ਼ ਇਨਕਾਰ ਕਰ ਦਿੱਤਾ। ਇਸ ਤੋਂ ਬਾਅਦ ਉਨ੍ਹਾਂ ਦੇ ਤਿੰਨੇ ਸਾਥੀਆਂ ਨੂੰ ਘੋਰ ਤਸੀਹੇ ਦੇ ਕੇ ਸ਼ਹੀਦ ਕੀਤਾ ਗਿਆ:

- ਭਾਈ ਮਤੀ ਦਾਸ ਜੀ ਨੂੰ ਆਰੇ ਨਾਲ ਚੀਰ ਦਿੱਤਾ ਗਿਆ
- ਭਾਈ ਦਿਆਲਾ ਜੀ ਨੂੰ ਉਬਲਦੀ ਦੇਗ ਵਿੱਚ ਬਿਠਾ ਕੇ ਸ਼ਹੀਦ ਕੀਤਾ ਗਿਆ
- ਭਾਈ ਸਤੀ ਦਾਸ ਜੀ ਨੂੰ ਅੱਗ ਵਿੱਚ ਸਾੜ ਦਿੱਤਾ ਗਿਆ

ਇਹ ਸਭ ਕੁਝ ਗੁਰੂ ਜੀ ਦੀਆਂ ਅੱਖਾਂ ਸਾਮ੍ਹਣੇ ਕੀਤਾ ਗਿਆ ਤਾਂ ਜੋ ਉਹ ਡਰ ਜਾਣ। ਪਰ ਗੁਰੂ ਜੀ ਅਡੋਲ ਰਹੇ ਅਤੇ ਇਸਲਾਮ ਕਬੂਲ ਕਰਨ ਤੋਂ ਇਨਕਾਰ ਕਰਦੇ ਰਹੇ।

ਅੰਤ ਵਿੱਚ 24 ਨਵੰਬਰ 1675 (11 ਮੱਘਰ 1732 ਬਿਕਰਮੀ) ਨੂੰ ਚਾਂਦਨੀ ਚੌਕ, ਦਿੱਲੀ ਵਿੱਚ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਨੂੰ ਜਲਾਦ ਜਲਾਲੁਦੀਨ ਦੇ ਹੱਥੋਂ ਸ਼ਹੀਦ ਕਰ ਦਿੱਤਾ ਗਿਆ। ਭਾਈ ਜੈਤਾ ਜੀ ਨੇ ਗੁਰੂ ਜੀ ਦਾ ਸ਼ੀਸ਼ ਚੁੱਕ ਕੇ ਆਨੰਦਪੁਰ ਸਾਹਿਬ ਪਹੁੰਚਾਇਆ ਜਿੱਥੇ ਬਾਲ ਗੋਬਿੰਦ ਰਾਏ ਨੇ ਇਹ ਕਹਿੰਦੇ ਹੋਏ ਸਨਮਾਨਿਤ ਕੀਤਾ, "ਰੰਗਰੇਟੇ ਗੁਰੂ ਕੇ ਬੇਟੇ"। ਭਾਈ ਲਖੀ ਸ਼ਾਹ ਵਣਜਾਰੇ ਨੇ ਗੁਰੂ ਜੀ ਦਾ ਸਰੀਰ ਆਪਣੇ ਘਰ ਲੈ ਜਾ ਕੇ ਸਾੜ ਦਿੱਤਾ। ਇਸੇ ਥਾਂ ਤੇ ਅੱਜ ਗੁਰਦੁਆਰਾ ਰਕਾਬ ਗੰਜ ਸਾਹਿਬ ਹੈ ਅਤੇ ਜਿੱਥੇ ਸ਼ਹੀਦੀ ਹੋਈ ਉੱਥੇ ਗੁਰਦੁਆਰਾ ਸੀਸ ਗੰਜ ਸਾਹਿਬ ਹੈ।

ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਸਾਹਿਬ ਜੀ ਨੇ ਧਰਮ ਦੀ ਰੱਖਿਆ ਅਤੇ ਮਨੁੱਖੀ ਅਧਿਕਾਰਾਂ ਦੀ ਰੱਖਿਆ ਲਈ ਆਪਣਾ ਸੀਸ ਭੇਂਟ ਕੀਤਾ। ਉਨ੍ਹਾਂ ਨੂੰ "ਹਿੰਦ ਦੀ ਚਾਦਰ" ਕਿਹਾ ਜਾਂਦਾ ਹੈ ਕਿਉਂਕਿ ਉਨ੍ਹਾਂ ਨੇ ਪੂਰੀ ਮਾਨਵਤਾ ਦੀ ਇੱਜ਼ਤ ਅਤੇ ਧਰਮ ਦੀ ਆਜ਼ਾਦੀ ਦੀ ਰੱਖਿਆ ਕੀਤੀ।`
    }
  ];


  private gurdwaras: Gurdwara[] = loadGurdwaraData(); 

  private resources: Resource[] = [
    {
      id: "resource-biography",
      title: "ਸੰਪੂਰਨ ਜੀਵਨੀ",
      description: "ਸ੍ਰੀ ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਦੀ ਵਿਸਥਾਰ ਜੀਵਨੀ, ਜਨਮ ਤੋਂ ਸ਼ਹੀਦੀ ਤੱਕ",
      pdfUrl: "/resources/biography.pdf",
      category: "ਜੀਵਨੀ"
    },
    {
      id: "resource-timeline",
      title: "ਇਤਿਹਾਸਕ ਸਮਾਂਰੇਖਾ",
      description: "1621 ਤੋਂ 1675 ਤੱਕ ਦੀਆਂ ਮਹੱਤਵਪੂਰਨ ਘਟਨਾਵਾਂ ਅਤੇ ਤਰੀਖਾਂ",
      pdfUrl: "/resources/timeline.pdf",
      category: "ਜੀਵਨੀ"
    },
    {
      id: "resource-teachings",
      title: "ਸਿੱਖਿਆਵਾਂ ਅਤੇ ਸੰਦੇਸ਼",
      description: "ਗੁਰੂ ਜੀ ਦੀਆਂ ਸਿੱਖਿਆਵਾਂ ਅਤੇ ਜੀਵਨ ਦਰਸ਼ਨ",
      pdfUrl: "/resources/teachings.pdf",
      category: "ਸਿੱਖਿਆਵਾਂ"
    },
    {
      id: "resource-shabads",
      title: "ਬਾਣੀ ਅਰਥ",
      description: "ਗੁਰੂ ਤੇਗ ਬਹਾਦਰ ਜੀ ਦੀਆਂ ਬਾਣੀਆਂ ਦੇ ਅਰਥ ਅਤੇ ਟੀਕਾ",
      pdfUrl: "/resources/shabads.pdf",
      category: "ਬਾਣੀ"
    },
    {
      id: "resource-gurdwaras",
      title: "ਗੁਰਦੁਆਰਿਆਂ ਦਾ ਇਤਿਹਾਸ",
      description: "ਗੁਰੂ ਜੀ ਨਾਲ ਜੁੜੇ ਸਾਰੇ ਇਤਿਹਾਸਕ ਗੁਰਧਾਮਾਂ ਦੀ ਜਾਣਕਾਰੀ",
      pdfUrl: "/resources/gurdwaras.pdf",
      category: "ਗੁਰਦੁਆਰੇ ਸਾਹਿਬ"
    }
  ];

  async getTimeline(): Promise<TimelineEvent[]> {
    return this.timeline;
  }

  async getBiographySections(): Promise<BiographySection[]> {
    return this.biographySections;
  }

  async getBaaniPages(): Promise<BaaniPage[]> {
    return this.baaniPages;
  }

  async getBaaniPageById(id: string): Promise<BaaniPage | null> {
    return this.baaniPages.find(p => p.id === id) || null;
  }

  async getBaaniPageByNumber(pageNumber: number): Promise<BaaniPage | null> {
    return this.baaniPages.find(p => p.pageNumber === pageNumber) || null;
  }

  async getBaaniRaags(): Promise<BaaniRaag[]> {
    return this.baaniRaags;
  }

  async getBaaniRaagById(id: string): Promise<BaaniRaag | null> {
    return this.baaniRaags.find(r => r.id === id) || null;
  }

  async getBaaniText(): Promise<string> {
    return loadBaaniText();
  }

  async getBaaniShabads(): Promise<BaaniShabad[]> {
    return loadBaaniShabads();
  }

  async getGurdwaras(): Promise<Gurdwara[]> {
    return this.gurdwaras;
  }

  async getGurdwaraById(id: string): Promise<Gurdwara | null> {
    return this.gurdwaras.find(g => g.id === id) || null;
  }

  async getResources(): Promise<Resource[]> {
    return this.resources;
  }

  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return this.resources.filter(r => r.category === category);
  }

  async getAudioTracks(): Promise<AudioTrack[]> {
    return audioTracksList;
  }
}

export const storage = new MemStorage();
