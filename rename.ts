import fs from 'fs';
import path from 'path';

function walk(dir: string, callback: (filePath: string) => void) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walk(filePath, callback);
    } else {
      callback(filePath);
    }
  }
}

walk('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
      .replace(/logo\.png/g, 'logo.svg')
      .replace(/orange-600/g, 'teal-600')
      .replace(/orange-100/g, 'teal-100')
      .replace(/orange-200/g, 'teal-200')
      .replace(/orange-50\/50/g, 'teal-50/50')
      .replace(/orange-500\/10/g, 'teal-500/10')
      .replace(/orange-500\/20/g, 'teal-500/20')
      .replace(/orange-400/g, 'teal-400');
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
