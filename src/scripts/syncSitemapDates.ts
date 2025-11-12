import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtener directorio actual en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// URLs de páginas legales a actualizar
const LEGAL_URLS = [
  '/privacidad',
  '/aviso-legal', 
  '/cookies',
  '/condiciones-contratacion'
];

const extractLegalVersionDate = (): string => {
  const seoUtilsPath = join(__dirname, '../lib/seoUtils.ts');
  const content = readFileSync(seoUtilsPath, 'utf-8');
  
  // Buscar la fecha ISO en el archivo
  const match = content.match(/lastUpdateISO:\s*["'](\d{4}-\d{2}-\d{2})["']/);
  
  if (!match) {
    throw new Error('No se encontró lastUpdateISO en seoUtils.ts');
  }
  
  return match[1];
};

const syncSitemapDates = () => {
  console.log('🔄 Iniciando sincronización de fechas en sitemap.xml...\n');
  
  try {
    // 1. Obtener fecha actualizada de seoUtils.ts
    const newDate = extractLegalVersionDate();
    console.log(`📅 Fecha de actualización: ${newDate}`);
    
    // 2. Leer sitemap.xml
    const sitemapPath = join(__dirname, '../../public/sitemap.xml');
    let sitemapContent = readFileSync(sitemapPath, 'utf-8');
    console.log(`📄 Leyendo: ${sitemapPath}`);
    
    // 3. Actualizar fechas de páginas legales
    let updatedCount = 0;
    
    LEGAL_URLS.forEach(url => {
      const regex = new RegExp(
        `(<loc>https://nrro\\.es${url}</loc>\\s*<lastmod>)(\\d{4}-\\d{2}-\\d{2})(</lastmod>)`,
        'g'
      );
      
      sitemapContent = sitemapContent.replace(regex, (match, p1, oldDate, p3) => {
        if (oldDate !== newDate) {
          console.log(`  ✓ ${url}: ${oldDate} → ${newDate}`);
          updatedCount++;
          return `${p1}${newDate}${p3}`;
        } else {
          console.log(`  ○ ${url}: ya estaba actualizado (${oldDate})`);
          return match;
        }
      });
    });
    
    // 4. Guardar archivo actualizado
    if (updatedCount > 0) {
      writeFileSync(sitemapPath, sitemapContent, 'utf-8');
      console.log(`\n✅ Sitemap actualizado correctamente (${updatedCount} cambios)`);
    } else {
      console.log('\n✨ Todas las fechas ya estaban sincronizadas');
    }
    
  } catch (error) {
    console.error('\n❌ Error al sincronizar sitemap:', error);
    process.exit(1);
  }
};

// Ejecutar script
syncSitemapDates();
