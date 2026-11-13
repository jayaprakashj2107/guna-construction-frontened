import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://gunaconstruction.co.in';
const TODAY = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { path: '', changefreq: 'weekly', priority: '1.00' },
  { path: 'about', changefreq: 'monthly', priority: '0.85' },
  { path: 'services', changefreq: 'weekly', priority: '0.90' },
  { path: 'projects', changefreq: 'weekly', priority: '0.85' },
  { path: 'gallery', changefreq: 'weekly', priority: '0.80' },
  { path: 'videos', changefreq: 'monthly', priority: '0.70' },
  { path: 'reviews', changefreq: 'weekly', priority: '0.75' },
  { path: 'enquire', changefreq: 'monthly', priority: '0.90' },
  { path: 'blog', changefreq: 'weekly', priority: '0.80' },
  { path: 'contact', changefreq: 'monthly', priority: '0.85' }
];

const generateUrlTag = (urlPath, priority = '0.80', changefreq = 'monthly') => {
  const clean = urlPath ? `/${urlPath.replace(/^\//, '')}` : '';
  return `  <url>
    <loc>${BASE_URL}${clean}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

const extractSlugsFromFile = (filePath) => {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugs = [];
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    if (match[1] && !slugs.includes(match[1])) {
      slugs.push(match[1]);
    }
  }
  return slugs;
};

export const generateSitemap = () => {
  const urls = [];

  // 1. Static Core Pages
  staticRoutes.forEach(r => {
    urls.push(generateUrlTag(r.path, r.priority, r.changefreq));
  });

  // 2. Dynamic Services (Auto extracted from servicesData.js)
  const servicesFilePath = path.resolve(__dirname, '../src/data/servicesData.js');
  const serviceSlugs = extractSlugsFromFile(servicesFilePath);
  serviceSlugs.forEach(slug => {
    urls.push(generateUrlTag(`services/${slug}`, '0.80', 'monthly'));
  });

  // 3. Dynamic Projects (Auto extracted from mockData.js)
  const mockDataFilePath = path.resolve(__dirname, '../src/data/mockData.js');
  const mockSlugs = extractSlugsFromFile(mockDataFilePath);
  mockSlugs.forEach(slug => {
    if (slug.includes('building') || slug.includes('villa') || slug.includes('complex') || slug.includes('foundation')) {
      urls.push(generateUrlTag(`projects/${slug}`, '0.75', 'monthly'));
    } else {
      urls.push(generateUrlTag(`blog/${slug}`, '0.70', 'monthly'));
    }
  });

  // Project IDs fallback
  [1, 2, 3].forEach(id => {
    urls.push(generateUrlTag(`projects/${id}`, '0.75', 'monthly'));
  });

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemapXml.trim() + '\n', 'utf-8');
  console.log(`[SEO] sitemap.xml automatically generated with ${urls.length} URLs at ${outputPath}`);
};

generateSitemap();
