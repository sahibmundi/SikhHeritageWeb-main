import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function extractAllGurdwaras() {
  try {
    const docPath = path.join(__dirname, '..', 'attached_assets', 'Gurdwars (1)_1763546441262.docx');
    
    // Extract raw text
    const result = await mammoth.extractRawText({ path: docPath });
    const fullText = result.value;
    
    console.log('Document loaded successfully');
    console.log('Total characters:', fullText.length);
    
    // Save the raw text for manual analysis
    fs.writeFileSync('/tmp/document_raw_text.txt', fullText, 'utf-8');
    console.log('Raw text saved to /tmp/document_raw_text.txt for analysis');
    
    // Find all lines that start with ਗੁਰਦੁਆਰਾ
    const lines = fullText.split('\n');
    const gurdwaraLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('ਗੁਰਦੁਆਰਾ') && line.length > 10 && line.length < 300) {
        gurdwaraLines.push({
          index: i,
          text: line,
          nextLines: lines.slice(i + 1, Math.min(i + 51, lines.length))
        });
      }
    }
    
    console.log(`\nFound ${gurdwaraLines.length} potential Gurdwara headings`);
    
    // Analyze to find actual Gurdwara entries
    const gurdwaras = [];
    let orderCounter = 1;
    
    for (let i = 0; i < gurdwaraLines.length; i++) {
      const current = gurdwaraLines[i];
      const next = gurdwaraLines[i + 1];
      
      let name = current.text.trim();
      
      // Remove trailing colon or period
      name = name.replace(/:$/, '').replace(/।$/, '').trim();
      
      // Extract content between this Gurdwara and the next one
      const startIndex = current.index + 1;
      const endIndex = next ? next.index : lines.length;
      
      let content = lines.slice(startIndex, endIndex)
        .map(l => l.trim())
        .filter(l => l.length > 0)
        .join('\n\n');
      
      // Skip if this looks like it's not a proper Gurdwara entry
      // (e.g., just mentioned in passing within another entry's description)
      const hasLocation = name.includes('(') && name.includes(')');
      const endsWithColon = current.text.trim().endsWith(':');
      
      // Filter out entries that are clearly not Gurdwara headings
      if (name.length > 200) {
        console.log(`Skipping (too long): ${name.substring(0, 80)}...`);
        continue;
      }
      
      // Skip sentences that just mention a Gurdwara but aren't headings
      if (!hasLocation && !endsWithColon && current.text.includes('ਦੇ')) {
        console.log(`Skipping (looks like sentence): ${name.substring(0, 80)}...`);
        continue;
      }
      
      const id = generatePunjabiId(name);
      
      gurdwaras.push({
        id: id,
        name: name,
        content: content,
        chronologicalOrder: orderCounter++
      });
      
      console.log(`${orderCounter - 1}. ${name} (${content.length} chars)`);
    }
    
    console.log(`\nTotal Gurdwaras extracted: ${gurdwaras.length}`);
    
    // Save to JSON
    const outputPath = '/tmp/new_gurdwaras_data.json';
    fs.writeFileSync(outputPath, JSON.stringify(gurdwaras, null, 2), 'utf-8');
    
    console.log(`\nSaved to: ${outputPath}`);
    
    // Print summary with content preview
    console.log('\n=== SUMMARY ===');
    gurdwaras.forEach((g, idx) => {
      console.log(`\n${idx + 1}. ${g.name}`);
      console.log(`   ID: ${g.id}`);
      console.log(`   Order: ${g.chronologicalOrder}`);
      console.log(`   Content: ${g.content.length} chars`);
      if (g.content.length > 0) {
        const preview = g.content.substring(0, 150).replace(/\n/g, ' ');
        console.log(`   Preview: ${preview}...`);
      }
    });
    
    return gurdwaras;
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

function generatePunjabiId(name) {
  let cleanName = name.replace(/^ਗੁਰਦੁਆਰਾ\s*/,'').trim();
  cleanName = cleanName.replace(/\([^)]*\)/g, '').trim();
  cleanName = cleanName.replace(/[:।،؛]/g, '').trim();
  const id = cleanName.replace(/\s+/g, '-');
  return id || 'ਗੁਰਦੁਆਰਾ';
}

// Run extraction
extractAllGurdwaras()
  .then(() => {
    console.log('\n✓ Extraction completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n✗ Extraction failed:', error);
    process.exit(1);
  });
