import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zntotcpagkunvkwpubqu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpudG90Y3BhZ2t1bnZrd3B1YnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Mjc5MDUsImV4cCI6MjA2ODUwMzkwNX0.YaVxgYF91UyCkSc8nqsVSACP2Xs4r5--sE8EtLnzMCI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const translateText = async (text: any, targetLang: 'ca' | 'en'): Promise<any> => {
  const { data, error } = await supabase.functions.invoke('translate-content', {
    body: { text, targetLang, sourceLang: 'es' }
  });

  if (error) {
    console.error(`Error translating to ${targetLang}:`, error);
    throw error;
  }

  return data.translatedText;
};

const translateServices = async () => {
  console.log('\n🔄 Iniciando traducción de servicios...\n');

  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching services:', error);
    return;
  }

  let successCount = 0;
  let failCount = 0;

  for (const service of services || []) {
    try {
      console.log(`📝 Traduciendo servicio: ${service.name_es}`);

      // Traducir a Catalán
      const [nameCa, descCa, areaCa] = await Promise.all([
        translateText(service.name_es, 'ca'),
        translateText(service.description_es, 'ca'),
        translateText(service.area_es, 'ca'),
      ]);

      // Traducir a Inglés
      const [nameEn, descEn, areaEn] = await Promise.all([
        translateText(service.name_es, 'en'),
        translateText(service.description_es, 'en'),
        translateText(service.area_es, 'en'),
      ]);

      // Generar slugs
      const slugCa = generateSlug(nameCa);
      const slugEn = generateSlug(nameEn);

      // Actualizar servicio
      const { error: updateError } = await supabase
        .from('services')
        .update({
          name_ca: nameCa,
          name_en: nameEn,
          description_ca: descCa,
          description_en: descEn,
          area_ca: areaCa,
          area_en: areaEn,
          slug_ca: slugCa,
          slug_en: slugEn,
          updated_at: new Date().toISOString(),
        })
        .eq('id', service.id);

      if (updateError) throw updateError;

      console.log(`✅ Servicio traducido: ${service.name_es}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error traduciendo ${service.name_es}:`, error);
      failCount++;
    }

    // Delay para evitar rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(`\n✨ Servicios completados: ${successCount} exitosos, ${failCount} fallidos\n`);
};

const translatePageContent = async () => {
  console.log('\n🔄 Iniciando traducción de page_content...\n');

  const { data: contentES, error } = await supabase
    .from('page_content')
    .select('*')
    .eq('language', 'es')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching page content:', error);
    return;
  }

  let successCount = 0;
  let failCount = 0;

  for (const content of contentES || []) {
    try {
      console.log(`📄 Traduciendo: ${content.page_key} - ${content.section_key}`);

      // Verificar si ya existen versiones CA/EN
      const { data: existing } = await supabase
        .from('page_content')
        .select('language')
        .eq('page_key', content.page_key)
        .eq('section_key', content.section_key)
        .in('language', ['ca', 'en']);

      const existingLangs = existing?.map(e => e.language) || [];

      for (const targetLang of ['ca', 'en'] as const) {
        if (existingLangs.includes(targetLang)) {
          console.log(`  ⏭️  Ya existe versión en ${targetLang}, saltando...`);
          continue;
        }

        try {
          const translatedContent = await translateText(content.content, targetLang);

          const { error: insertError } = await supabase
            .from('page_content')
            .insert({
              page_key: content.page_key,
              section_key: content.section_key,
              content: translatedContent,
              is_active: content.is_active,
              display_order: content.display_order,
              language: targetLang,
            });

          if (insertError) throw insertError;

          console.log(`  ✅ Creada versión en ${targetLang}`);
        } catch (langError) {
          console.error(`  ❌ Error traduciendo a ${targetLang}:`, langError);
          failCount++;
        }

        // Delay para evitar rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      successCount++;
    } catch (error) {
      console.error(`❌ Error procesando ${content.page_key} - ${content.section_key}:`, error);
      failCount++;
    }
  }

  console.log(`\n✨ Page content completado: ${successCount} secciones procesadas, ${failCount} errores\n`);
};

const main = async () => {
  console.log('🚀 Iniciando traducción automática de todo el contenido...\n');
  console.log('⚠️  Este proceso puede tardar varios minutos debido a rate limits de la API\n');

  try {
    await translateServices();
    await translatePageContent();
    
    console.log('\n🎉 ¡Traducción completa finalizada!\n');
  } catch (error) {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  }
};

main();
