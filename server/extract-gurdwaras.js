import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the markdown file
const mdContent = fs.readFileSync(path.join(__dirname, '../attached_assets/gurdwaras_content.md'), 'utf-8');

// Function to create a slug from Punjabi text
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\u0A00-\u0A7F\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Parse the content
const lines = mdContent.split('\n');
const gurdwaras = [];
let currentName = '';
let currentContent = [];
let isInGurdwaraSection = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Check if this is a Gurudwara title line
  if (line.startsWith('ਗੁਰਦੁਆਰਾ') && line.includes(':')) {
    // Save previous gurudwara if exists
    if (currentName && currentContent.length > 0) {
      const content = currentContent.join('\n').trim();
      if (content.length > 50) {  // Only save if has substantial content
        gurdwaras.push({
          id: createSlug(currentName),
          name: currentName.replace(/:/g, '').trim(),
          content: content
        });
      }
    }
    
    // Start new gurudwara
    const parts = line.split(':');
    currentName = parts[0].trim();
    currentContent = parts.length > 1 ? [parts.slice(1).join(':').trim()] : [];
    isInGurdwaraSection = true;
  } else if (isInGurdwaraSection && line.length > 0 && !line.startsWith('#')) {
    // Add content to current gurudwara
    if (line.trim().length > 0) {
      currentContent.push(line);
    }
  }
}

// Save last gurudwara
if (currentName && currentContent.length > 0) {
  const content = currentContent.join('\n').trim();
  if (content.length > 50) {
    gurdwaras.push({
      id: createSlug(currentName),
      name: currentName.replace(/:/g, '').trim(),
      content: content
    });
  }
}

// Write to JSON file
fs.writeFileSync(
  path.join(__dirname, 'gurdwara-data.json'),
  JSON.stringify(gurdwaras, null, 2),
  'utf-8'
);

console.log(`Extracted ${gurdwaras.length} Gurudwaras`);
console.log('First few:');
gurdwaras.slice(0, 5).forEach(g => console.log(`- ${g.name}`));
