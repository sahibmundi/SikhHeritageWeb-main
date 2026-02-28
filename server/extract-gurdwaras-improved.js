import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractGurdwaras() {
  try {
    const docPath = path.join(__dirname, '..', 'attached_assets', 'Gurdwars (1)_1763546441262.docx');
    
    // Extract text from Word document with paragraph structure
    const result = await mammoth.extractRawText({ path: docPath });
    const fullText = result.value;
    
    console.log('Document loaded successfully');
    console.log('Total characters:', fullText.length);
    
    // Split into paragraphs
    const paragraphs = fullText.split('\n').map(p => p.trim()).filter(p => p.length > 0);
    
    console.log('Total paragraphs:', paragraphs.length);
    
    const gurdwaras = [];
    let currentGurdwara = null;
    let orderCounter = 1;
    
    for (let i = 0; i < paragraphs.length; i++) {
      const para = paragraphs[i];
      
      // Check if this is a Gurdwara heading
      // Gurdwara headings typically follow these patterns:
      // 1. ਗੁਰਦੁਆਰਾ [name] ([location])
      // 2. ਗੁਰਦੁਆਰਾ [name]: [description starts] OR
      // 3. ਗੁਰਦੁਆਰਾ [name] (location):
      
      if (isGurdwaraHeading(para)) {
        // Save previous Gurdwara if exists
        if (currentGurdwara && currentGurdwara.content.trim().length > 0) {
          gurdwaras.push({...currentGurdwara});
        }
        
        // Start new Gurdwara
        const name = extractGurdwaraName(para);
        const id = generatePunjabiId(name);
        
        currentGurdwara = {
          id: id,
          name: name,
          content: '',
          chronologicalOrder: orderCounter++
        };
        
        console.log(`Found: ${name}`);
      } else if (currentGurdwara) {
        // Add content to current Gurdwara
        if (currentGurdwara.content.length > 0) {
          currentGurdwara.content += '\n\n';
        }
        currentGurdwara.content += para;
      }
    }
    
    // Add last Gurdwara
    if (currentGurdwara && currentGurdwara.content.trim().length > 0) {
      gurdwaras.push(currentGurdwara);
    }
    
    console.log(`\nTotal Gurdwaras extracted: ${gurdwaras.length}`);
    
    // Save to JSON file
    const outputPath = '/tmp/new_gurdwaras_data.json';
    fs.writeFileSync(outputPath, JSON.stringify(gurdwaras, null, 2), 'utf-8');
    
    console.log(`Saved to: ${outputPath}`);
    
    // Print summary
    console.log('\n=== Summary ===');
    gurdwaras.forEach((g, idx) => {
      const contentPreview = g.content.substring(0, 80).replace(/\n/g, ' ') + '...';
      console.log(`${idx + 1}. ${g.name}`);
      console.log(`   ID: ${g.id}`);
      console.log(`   Order: ${g.chronologicalOrder}`);
      console.log(`   Content length: ${g.content.length} chars`);
      console.log(`   Preview: ${contentPreview}`);
      console.log('');
    });
    
    return gurdwaras;
    
  } catch (error) {
    console.error('Error extracting Gurdwaras:', error);
    throw error;
  }
}

function isGurdwaraHeading(text) {
  // A heading must:
  // 1. Start with ਗੁਰਦੁਆਰਾ (but not in the middle of a sentence)
  // 2. Be relatively short (typical headings are under 150 chars)
  // 3. Usually contain location in parentheses or end with a colon
  // 4. NOT be a long descriptive sentence
  
  if (!text.startsWith('ਗੁਰਦੁਆਰਾ')) {
    return false;
  }
  
  // Too long to be a heading
  if (text.length > 200) {
    return false;
  }
  
  // Contains typical heading markers
  const hasLocationMarker = text.includes('(') && text.includes(')');
  const endsWithColon = text.trim().endsWith(':') || text.trim().endsWith('।');
  
  // Reject if it's clearly a sentence (contains multiple clauses)
  const hasMultipleClauses = (text.match(/,/g) || []).length > 2;
  const looksLikeSentence = text.includes('ਸਾਹਿਬ ਦੀ') || text.includes('ਦੇ ਨਾਂ') || text.includes('ਹੈ।');
  
  if (hasMultipleClauses || (looksLikeSentence && !hasLocationMarker)) {
    return false;
  }
  
  return hasLocationMarker || endsWithColon;
}

function extractGurdwaraName(heading) {
  // Remove trailing colon or period if present
  let name = heading.trim().replace(/:$/,'').replace(/।$/, '').trim();
  
  // If it's just a location marker at the end, keep it clean
  return name;
}

function generatePunjabiId(name) {
  // Remove "ਗੁਰਦੁਆਰਾ" prefix
  let cleanName = name.replace(/^ਗੁਰਦੁਆਰਾ\s*/,'').trim();
  
  // Remove parentheses content for ID (locations)
  cleanName = cleanName.replace(/\([^)]*\)/g, '').trim();
  
  // Remove special punctuation
  cleanName = cleanName.replace(/[:।،؛]/g, '').trim();
  
  // Replace spaces with hyphens
  const id = cleanName.replace(/\s+/g, '-');
  
  return id || 'ਗੁਰਦੁਆਰਾ';
}

// Run the extraction
extractGurdwaras()
  .then(() => {
    console.log('\n✓ Extraction completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n✗ Extraction failed:', error);
    process.exit(1);
  });
