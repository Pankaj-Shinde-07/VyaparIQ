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

walk('src/modules/medical', (filepath) => {
  if (!filepath.endsWith('.ts') && !filepath.endsWith('.tsx')) return;
  const content = fs.readFileSync(filepath, 'utf8');
  const newContent = content
    .replace(/\.\.\/\.\.\/\.\.\/\.\.\/shared\//g, '../../../shared/')
    .replace(/\.\.\/\.\.\/\.\.\/\.\.\/database\//g, '../../../database/')
    .replace(/\.\.\/\.\.\/\.\.\/core\//g, '../../../core/'); // wait, from invoices to users is `../../../core/users`

  if (content !== newContent) {
    fs.writeFileSync(filepath, newContent);
    console.log(`Fixed paths in ${filepath}`);
  }
});
