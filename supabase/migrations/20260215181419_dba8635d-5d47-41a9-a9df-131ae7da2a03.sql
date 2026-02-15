
-- Seed M AUDIT project board and 30 tasks
DO $$
DECLARE
  v_board_id uuid := gen_random_uuid();
BEGIN
  -- Insert the project board
  INSERT INTO public.project_boards (id, name, description, deadline, status, created_by)
  VALUES (v_board_id, 'M AUDIT - Estrategia Marketing Digital', 'SEO, Google Ads, Contenidos, LinkedIn, SEO Local', '2026-08-31', 'active', 'system');

  -- FASE 1: Fundamentos (Meses 1-2)
  INSERT INTO public.project_tasks (board_id, title, status, priority, sort_order) VALUES
    (v_board_id, 'Diagnosticar y arreglar accesibilidad web (SSR/indexacion)', 'en_progreso', 'urgente', 1),
    (v_board_id, 'Implementar server-side rendering o pre-rendering', 'pendiente', 'alta', 2),
    (v_board_id, 'Instalar certificado SSL y configurar HTTPS', 'pendiente', 'alta', 3),
    (v_board_id, 'Configurar Google Analytics 4 y tracking de conversiones', 'pendiente', 'alta', 4),
    (v_board_id, 'Enviar XML sitemap a Google Search Console', 'pendiente', 'alta', 5),
    (v_board_id, 'Implementar schema markup (LocalBusiness, FAQ, Breadcrumb)', 'pendiente', 'media', 6),
    (v_board_id, 'Construir las 12 paginas esenciales de servicio', 'pendiente', 'urgente', 7),
    (v_board_id, 'Crear y optimizar Google Business Profile', 'pendiente', 'alta', 8),
    (v_board_id, 'Registrarse en directorios clave (ROAC, ICJCE, Col-legi)', 'pendiente', 'media', 9),
    (v_board_id, 'Crear pagina de empresa en LinkedIn', 'pendiente', 'alta', 10),
    (v_board_id, 'Lanzar Campana 1 Google Ads - Busqueda Principal (1.600eur/mes)', 'pendiente', 'urgente', 11),
    (v_board_id, 'Configurar lista de keywords negativas en Google Ads', 'pendiente', 'alta', 12);

  -- FASE 2: Lanzamiento de contenidos (Meses 3-4)
  INSERT INTO public.project_tasks (board_id, title, status, priority, sort_order) VALUES
    (v_board_id, 'Crear landing page Auditoria Fondos Europeos / PRTR (blue-ocean)', 'pendiente', 'urgente', 13),
    (v_board_id, 'Crear pagina de precios transparente "Cuanto cuesta una auditoria"', 'pendiente', 'alta', 14),
    (v_board_id, 'Publicar guia umbrales auditoria obligatoria 2026 + checklist interactiva', 'pendiente', 'alta', 15),
    (v_board_id, 'Crear landing Auditoria de Subvenciones Barcelona', 'pendiente', 'alta', 16),
    (v_board_id, 'Publicar primeros 6-8 posts de blog (keywords Tier 1)', 'pendiente', 'alta', 17),
    (v_board_id, 'Lanzar primer lead magnet: "Tu empresa esta obligada a auditarse en 2026?"', 'pendiente', 'media', 18),
    (v_board_id, 'Lanzar newsletter por email', 'pendiente', 'media', 19),
    (v_board_id, 'Anadir campana de remarketing Google Ads (400eur/mes)', 'pendiente', 'media', 20),
    (v_board_id, 'Iniciar publicaciones personales de socios en LinkedIn (2-3/semana)', 'pendiente', 'alta', 21),
    (v_board_id, 'Crear share kits semanales para employee advocacy', 'pendiente', 'media', 22);

  -- FASE 3: Optimizacion y escalado (Meses 5-6)
  INSERT INTO public.project_tasks (board_id, title, status, priority, sort_order) VALUES
    (v_board_id, 'Transicionar Google Ads a pujas automatizadas (CPA objetivo 50-70eur)', 'pendiente', 'alta', 23),
    (v_board_id, 'Escalar produccion blog a 4 posts/mes', 'pendiente', 'media', 24),
    (v_board_id, 'Lanzar contenido co-branded con Capittal Transacciones (due diligence)', 'pendiente', 'alta', 25),
    (v_board_id, 'Primer webinar co-branded con Capittal', 'pendiente', 'media', 26),
    (v_board_id, 'Construir backlinks: directorios profesionales y guest posts', 'pendiente', 'media', 27),
    (v_board_id, 'Solicitar resenas a clientes satisfechos en Google', 'pendiente', 'media', 28),
    (v_board_id, 'Crear landing Due Diligence Financiera (diferenciador Capittal)', 'pendiente', 'alta', 29),
    (v_board_id, 'Revision trimestral: metricas SEO, leads, CPA, ROI', 'pendiente', 'alta', 30);
END $$;
