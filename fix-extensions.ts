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

walk('src', (filepath) => {
  if (!filepath.endsWith('.ts') && !filepath.endsWith('.tsx')) return;
  const content = fs.readFileSync(filepath, 'utf8');
  
  // replace `import ... from "...";` or `export ... from "...";` 
  let newContent = content.replace(/(import|export)\s+(.*?)\s+from\s+['"](\..*?)['"]/g, (match, p1, p2, p3) => {
    if (p3.endsWith('.js') || p3.endsWith('.css') || p3.endsWith('.tsx') || p3.endsWith('.ts')) {
      return match;
    }
    let resolvedPath = path.resolve(path.dirname(filepath), p3);
    if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
       return `${p1} ${p2} from "${p3}/index.js"`;
    }
    return `${p1} ${p2} from "${p3}.js"`;
  });
  
  // also handle dynamic imports and side-effect imports `import "..."`
  newContent = newContent.replace(/import\s+['"](\..*?)['"]/g, (match, p1) => {
    if (p1.endsWith('.js') || p1.endsWith('.css') || p1.endsWith('.tsx') || p1.endsWith('.ts')) {
      return match;
    }
    let resolvedPath = path.resolve(path.dirname(filepath), p1);
    if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()) {
       return `import "${p1}/index.js"`;
    }
    return `import "${p1}.js"`;
  });

  if (content !== newContent) {
    fs.writeFileSync(filepath, newContent);
    console.log(`Updated extensions in ${filepath}`);
  }
});
