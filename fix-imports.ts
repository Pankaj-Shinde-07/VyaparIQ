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

const replacements = [
  // routes/index.ts fixes
  { file: 'src/routes/index.ts', from: '../modules/auth', to: '../core/auth' },
  { file: 'src/routes/index.ts', from: '../modules/users', to: '../core/users' },
  { file: 'src/routes/index.ts', from: '../modules/businesses', to: '../core/businesses' },
  { file: 'src/routes/index.ts', from: '../modules/products', to: '../modules/medical/products' },
  { file: 'src/routes/index.ts', from: '../modules/customers', to: '../modules/medical/customers' },
  { file: 'src/routes/index.ts', from: '../modules/invoices', to: '../modules/medical/invoices' },

  // src/core files
  { match: /src\/core\/.*\.ts/, from: '../../database/client', to: '../../../database/client' },
  { match: /src\/core\/.*\.ts/, from: '../../utils/AppError', to: '../../shared/utils/AppError' },
  { match: /src\/core\/.*\.ts/, from: '../../utils/jwt', to: '../../shared/utils/jwt' },
  { match: /src\/core\/.*\.ts/, from: '../../utils/catchAsync', to: '../../shared/utils/catchAsync' },
  { match: /src\/core\/.*\.ts/, from: '../../middlewares', to: '../../shared/middlewares' },
  { match: /src\/core\/businesses\/.*\.ts/, from: '../users', to: '../users' },
  
  // src/modules/medical
  { match: /src\/modules\/medical\/.*\.ts/, from: '../../database/client', to: '../../../../database/client' },
  { match: /src\/modules\/medical\/.*\.ts/, from: '../../utils/', to: '../../../../shared/utils/' },
  { match: /src\/modules\/medical\/.*\.ts/, from: '../../middlewares/', to: '../../../../shared/middlewares/' },
  { match: /src\/modules\/medical\/.*\.ts/, from: '../users/', to: '../../../core/users/' },

  // shared/utils
  { match: /src\/shared\/utils\/.*\.ts/, from: '../config', to: '../../config' },

  // shared/middlewares
  { match: /src\/shared\/middlewares\/.*\.ts/, from: '../utils/', to: '../utils/' },
];

walk('src', (filepath) => {
  if (!filepath.endsWith('.ts') && !filepath.endsWith('.tsx')) return;
  const content = fs.readFileSync(filepath, 'utf8');
  let newContent = content;

  for (const { file, match, from, to } of replacements) {
    if (file && !filepath.endsWith(file)) continue;
    if (match && !filepath.match(match)) continue;
    newContent = newContent.replace(new RegExp(from, 'g'), to);
  }

  if (content !== newContent) {
    fs.writeFileSync(filepath, newContent);
    console.log(`Updated imports in ${filepath}`);
  }
});
