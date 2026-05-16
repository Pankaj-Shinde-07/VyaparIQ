import { execSync } from 'child_process';

const originalUrl = process.env.DATABASE_URL || '';
// Encode the password part. The format is postgresql://user:password@host:port/db
// Regex to extract everything.
let fixedUrl = originalUrl;
if (originalUrl.includes('Lovesolution#4321')) {
  fixedUrl = originalUrl.replace('Lovesolution#4321', 'Lovesolution%234321');
}

console.log('Running prisma db push...');
try {
  execSync('npx prisma db push --accept-data-loss', { 
    env: { ...process.env, DATABASE_URL: fixedUrl },
    stdio: 'inherit'
  });
} catch (e) {
  console.error("Prisma push failed", e.message);
}

console.log('Running prisma seed...');
try {
  execSync('npx tsx prisma/seed.ts', { 
    env: { ...process.env, DATABASE_URL: fixedUrl },
    stdio: 'inherit'
  });
} catch (e) {
  console.error("Prisma seed failed", e.message);
}
