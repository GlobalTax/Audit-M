-- Actualizar metodología del servicio Empresa Familiar
UPDATE services
SET 
  metodologia = '{
    "overline": "CÓMO TRABAJAMOS",
    "titulos": ["Soluciones a medida", "Excelencia en los negocios"],
    "contacto": {
      "telefono": "+34 620 27 35 52",
      "email": "s.navarro@nrro.com"
    },
    "introduccion": "En navarro ofrecemos un servicio integral para la Empresa Familiar que engloba todas las cuestiones jurídicas y tributarias que inciden tanto en el negocio como en la familia empresaria. Trabajamos con una visión global y una mirada local, adaptada a la realidad de cada compañía.",
    "pilares": [
      {
        "numero": 1,
        "titulo": "Conocimiento profundo del negocio y sensibilidad familiar",
        "puntos": [
          "Analizamos la estructura societaria, los intereses familiares y los objetivos empresariales para asegurar la continuidad generacional.",
          "Anticipamos riesgos y detectamos oportunidades, ofreciendo planes de acción claros y realistas."
        ]
      },
      {
        "numero": 2,
        "titulo": "Equipo multidisciplinar y trabajo colaborativo",
        "puntos": [
          "Contamos con especialistas en Mercantil y M&A, Fiscal, Laboral, Propiedad Intelectual e Industrial, y Resolución de Conflictos, entre otras áreas.",
          "Integramos visiones complementarias para proporcionar soluciones 360°, evitando duplicidades de tiempo y costes."
        ]
      },
      {
        "numero": 3,
        "titulo": "Cercanía, excelencia e innovación",
        "puntos": [
          "Nuestra presencia en Barcelona y Madrid nos permite un trato directo y ágil, con visitas in situ siempre que sea necesario.",
          "Fomentamos la mejora continua, incorporando tecnología que simplifica la gestión documental y optimiza la comunicación con nuestros clientes."
        ]
      }
    ]
  }'::jsonb,
  updated_at = NOW()
WHERE slug = 'empresa-familiar';