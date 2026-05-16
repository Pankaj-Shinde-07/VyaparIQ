import fs from 'fs';
import path from 'path';

function walk(dir: string, callback: (filepath: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) walk(dirPath, callback);
    else callback(dirPath);
  });
}

walk('src/core', (filepath) => {
  if (!filepath.endsWith('.ts') && !filepath.endsWith('.tsx')) return;
  const content = fs.readFileSync(filepath, 'utf8');
  let newContent = content
    .replace(/\.\.\/\.\.\/\.\.\/database/g, '../../database')
    .replace(/\.\.\/\.\.\/\.\.\/shared\//g, '../../shared/')
    .replace(/\.\.\/\.\.\/shared\//g, '../../shared/');

  // For users, auth, businesses -> ../users works if it's from businesses
  
  if (content !== newContent) {
    fs.writeFileSync(filepath, newContent);
    console.log(`Fixed paths in ${filepath}`);
  }
});
