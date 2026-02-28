import mammoth from "mammoth";
import { writeFileSync } from "fs";
import { join } from "path";

interface BaaniShabad {
  id: string;
  raagName: string;
  gurbani: string;
  vyakhya: string;
}

const targetFiles = [
  "MARU-RAAG_1765729138871.docx",
  "SARANG-RAAG_1765729138872.docx",
  "ਦੇਵਗੰਧਾਰੀ_ਮਹਲਾ_੯_1765729138872.docx",
  "ਰਾਗੁ_ਆਸਾ_ਮਹਲਾ_੯_1765729138873.docx",
  "ਤਿਲੰਗ_ਮਹਲਾ_੯_1765729138873.docx",
  "ਟੋਡੀ_1765729138874.docx",
  "ੴ_ਸਤਿਗੁਰ_ਪ੍ਰਸਾਦਿ_॥_gaudi_raag_1765729138874.docx",
  "RAMKALI_1765729138875.docx",
  "ਧਨਾਸਰੀ_ਮਹਲਾ_੯_1765729138875.docx",
  "BIHAGRA-RAAG_1765729138875.docx",
  "BILAWAL-RAAG_1765729138876.docx",
  "JAIJAWANTI-RAAG_1765729138876.docx"
];

const raagNameMap: Record<string, string> = {
  "MARU-RAAG": "ਰਾਗ ਮਾਰੂ",
  "SARANG-RAAG": "ਰਾਗ ਸਾਰੰਗ",
  "ਦੇਵਗੰਧਾਰੀ_ਮਹਲਾ_੯": "ਰਾਗ ਦੇਵਗੰਧਾਰੀ",
  "ਰਾਗੁ_ਆਸਾ_ਮਹਲਾ_੯": "ਰਾਗ ਆਸਾ",
  "ਤਿਲੰਗ_ਮਹਲਾ_੯": "ਰਾਗ ਤਿਲੰਗ",
  "ਟੋਡੀ": "ਰਾਗ ਟੋਡੀ",
  "ੴ_ਸਤਿਗੁਰ_ਪ੍ਰਸਾਦਿ_॥_gaudi_raag": "ਰਾਗ ਗਉੜੀ",
  "RAMKALI": "ਰਾਗ ਰਾਮਕਲੀ",
  "ਧਨਾਸਰੀ_ਮਹਲਾ_੯": "ਰਾਗ ਧਨਾਸਰੀ",
  "BIHAGRA-RAAG": "ਰਾਗ ਬਿਹਾਗੜਾ",
  "BILAWAL-RAAG": "ਰਾਗ ਬਿਲਾਵਲ",
  "JAIJAWANTI-RAAG": "ਰਾਗ ਜੈਜਾਵੰਤੀ"
};

function extractRaagName(filename: string): string {
  const baseName = filename.replace(/_\d+\.docx$/, "");
  return raagNameMap[baseName] || baseName;
}

function separateGurbaniAndVyakhya(text: string): { gurbani: string; vyakhya: string } {
  const lines = text.split("\n");
  const gurbaniLines: string[] = [];
  const vyakhyaLines: string[] = [];
  let inVyakhya = false;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    
    if (!inVyakhya) {
      if (
        trimmedLine.includes("ਵਾਹਿਗੁਰੂ ਕੇਵਲ") ||
        trimmedLine.includes("ਸੱਚੇ ਗੁਰਾਂ") ||
        trimmedLine.includes("ਪਾਤਸ਼ਾਹੀ") ||
        trimmedLine.includes("ਪਾਤਿਸ਼ਾਹੀ") ||
        trimmedLine.includes("ਨੌਵੀਂ") ||
        (trimmedLine.includes("ਠਹਿਰਾਉ") && !trimmedLine.includes("॥")) ||
        trimmedLine.match(/^ਹੇ\s/) ||
        trimmedLine.match(/^ਜੋ\s+ਕੋਈ/) ||
        trimmedLine.match(/^ਗੁਰੂ\s+ਜੀ/) ||
        trimmedLine.match(/ਸਦੀਵ\s+ਹੀ/) ||
        trimmedLine.match(/ਜਿਸ\s+ਦਾ/) ||
        trimmedLine.match(/ਬੰਦੇ\s+ਨੂੰ/) ||
        trimmedLine.match(/ਮੈਂ\s+/) ||
        trimmedLine.match(/ਤੂੰ\s+/) ||
        trimmedLine.match(/ਉਹ\s+/) ||
        trimmedLine.includes("ਦੁਆਰਾ") ||
        trimmedLine.includes("ਮਾਨਿੰਦ") ||
        trimmedLine.includes("ਕਰਦਾ ਹੈ") ||
        trimmedLine.includes("ਹੁੰਦਾ ਹੈ") ||
        trimmedLine.includes("ਜਾਂਦਾ ਹੈ") ||
        trimmedLine.includes("ਫੁਰਮਾਉਂਦੇ") ||
        trimmedLine.includes("ਆਖਦੇ ਹਨ") ||
        /\d+$/.test(trimmedLine)
      ) {
        inVyakhya = true;
        vyakhyaLines.push(trimmedLine);
      } else {
        gurbaniLines.push(trimmedLine);
      }
    } else {
      if (
        trimmedLine.startsWith("ੴ") ||
        (trimmedLine.includes("ਮਹਲਾ ੯") && trimmedLine.includes("॥")) ||
        (trimmedLine.startsWith("ਰਾਗ") && trimmedLine.includes("ਮਹਲਾ"))
      ) {
        inVyakhya = false;
        gurbaniLines.push(trimmedLine);
      } else {
        vyakhyaLines.push(trimmedLine);
      }
    }
  }
  
  return {
    gurbani: gurbaniLines.join("\n"),
    vyakhya: vyakhyaLines.join("\n")
  };
}

async function parseDocxFile(filePath: string): Promise<string> {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
}

async function main() {
  const assetsDir = "./attached_assets";
  const allShabads: BaaniShabad[] = [];
  let idCounter = 1;

  for (const filename of targetFiles) {
    const filePath = join(assetsDir, filename);
    console.log(`Processing: ${filename}`);
    
    try {
      const text = await parseDocxFile(filePath);
      const raagName = extractRaagName(filename);
      const { gurbani, vyakhya } = separateGurbaniAndVyakhya(text);
      
      allShabads.push({
        id: `shabad-${idCounter++}`,
        raagName,
        gurbani: gurbani.trim(),
        vyakhya: vyakhya.trim()
      });
      
      console.log(`  Gurbani: ${gurbani.length} chars, Vyakhya: ${vyakhya.length} chars`);
    } catch (error) {
      console.error(`  Error processing ${filename}:`, error);
    }
  }

  const outputPath = "./server/data/baani-shabads.json";
  writeFileSync(outputPath, JSON.stringify(allShabads, null, 2), "utf-8");
  console.log(`\nSaved ${allShabads.length} shabads to ${outputPath}`);
}

main().catch(console.error);
