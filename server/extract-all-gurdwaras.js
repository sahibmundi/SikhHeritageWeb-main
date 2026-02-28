import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractGurdwaras() {
  try {
    const docPath = path.join(__dirname, '..', 'attached_assets', 'Gurdwars (1)_1763546441262.docx');
    
    // Extract text from Word document
    const result = await mammoth.extractRawText({ path: docPath });
    const fullText = result.value;
    
    console.log('Document loaded successfully');
    console.log('Total characters:', fullText.length);
    
    // Split text into sections based on Gurdwara headings
    // Pattern: ਗੁਰਦੁਆਰਾ followed by the name and location in parentheses
    const gurdwaraPattern = /ਗੁਰਦੁਆਰਾ\s+[^:：\n]+(?:\([^)]+\))?[:：]/g;
    
    const matches = [];
    let match;
    while ((match = gurdwaraPattern.exec(fullText)) !== null) {
      matches.push({
        name: match[0].replace(/[:：]/g, '').trim(),
        index: match.index
      });
    }
    
    console.log(`Found ${matches.length} Gurdwara entries`);
    
    // Extract content for each Gurdwara
    const gurdwaras = [];
    
    for (let i = 0; i < matches.length; i++) {
      const currentMatch = matches[i];
      const nextMatch = matches[i + 1];
      
      const startIndex = currentMatch.index;
      const endIndex = nextMatch ? nextMatch.index : fullText.length;
      
      // Get the full content for this Gurdwara
      let content = fullText.substring(startIndex, endIndex).trim();
      
      // Remove the title from content (it's already in name)
      const firstLineEnd = content.indexOf('\n');
      if (firstLineEnd > 0) {
        content = content.substring(firstLineEnd + 1).trim();
      }
      
      // Clean up the content
      content = content.replace(/\n{3,}/g, '\n\n').trim();
      
      // Generate a unique ID in Punjabi based on the name
      const id = generatePunjabiId(currentMatch.name, i);
      
      gurdwaras.push({
        id: id,
        name: currentMatch.name,
        content: content,
        chronologicalOrder: i + 1
      });
      
      console.log(`${i + 1}. ${currentMatch.name}`);
    }
    
    // Save to JSON file
    const outputPath = '/tmp/new_gurdwaras_data.json';
    fs.writeFileSync(outputPath, JSON.stringify(gurdwaras, null, 2), 'utf-8');
    
    console.log(`\nSuccessfully extracted ${gurdwaras.length} Gurdwaras`);
    console.log(`Saved to: ${outputPath}`);
    
    // Print summary
    console.log('\n=== Summary ===');
    gurdwaras.forEach((g, idx) => {
      console.log(`${idx + 1}. ${g.name} (Order: ${g.chronologicalOrder}, ID: ${g.id})`);
    });
    
    return gurdwaras;
    
  } catch (error) {
    console.error('Error extracting Gurdwaras:', error);
    throw error;
  }
}

function generatePunjabiId(name, index) {
  // Extract key parts from the name to create a meaningful ID
  // Remove "ਗੁਰਦੁਆਰਾ" prefix and clean up
  let cleanName = name.replace(/ਗੁਰਦੁਆਰਾ\s*/g, '').trim();
  
  // Remove parentheses and their contents for ID
  cleanName = cleanName.replace(/\([^)]*\)/g, '').trim();
  
  // Replace spaces with hyphens and convert to lowercase-style ID
  const id = cleanName
    .replace(/\s+/g, '-')
    .replace(/[،؛]/g, '')
    .toLowerCase();
  
  return id || `ਗੁਰਦੁਆਰਾ-${index + 1}`;
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
