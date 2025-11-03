import { Meta } from "@/components/seo/Meta";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";

const Cookies = () => {
  const { t, language, getLocalizedPath } = useLanguage();
  
  return (
    <>
      <Meta
        title={t('cookies.meta.title')}
        description={t('cookies.meta.description')}
        keywords={t('cookies.meta.keywords')}
        canonicalUrl={window.location.origin + getLocalizedPath('cookies')}
      />

      {/* Hero Section */}
      <section className="bg-background py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-normal text-foreground mb-6">
              {t('cookies.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('cookies.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              
              {/* Last Updated */}
              <div className="text-sm text-muted-foreground">
                <p>{t('cookies.lastUpdated')}</p>
              </div>
              
              {/* Disclaimer for CA/EN */}
              {language !== 'es' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                  <p className="text-sm text-yellow-800">
                    {t('cookies.disclaimer')}
                  </p>
                </div>
              )}

              {/* ¿Qué son las cookies? */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  {t('cookies.sections.whatAreCookies')}
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo al visitarlos. Permiten recordar información sobre tu visita, lo que puede mejorar tu experiencia en el sitio.
                  </p>
                  <p>
                    Las cookies pueden ser de diferentes tipos:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Cookies de sesión:</strong> se eliminan al cerrar el navegador.
                    </li>
                    <li>
                      <strong className="text-foreground">Cookies persistentes:</strong> permanecen en tu dispositivo durante un tiempo determinado.
                    </li>
                    <li>
                      <strong className="text-foreground">Cookies propias:</strong> son gestionadas por el sitio web que visitas.
                    </li>
                    <li>
                      <strong className="text-foreground">Cookies de terceros:</strong> son gestionadas por un tercero, como un proveedor de servicios.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Cookies que utilizamos */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  {t('cookies.sections.typesOfCookies')}
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    En este sitio web utilizamos los siguientes tipos de cookies:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Cookies técnicas:</strong> Son esenciales para el funcionamiento del sitio web y te permiten navegar por él y utilizar sus funciones.
                    </li>
                    <li>
                      <strong className="text-foreground">Cookies de análisis:</strong> Nos permiten analizar cómo utilizas el sitio web para poder mejorarlo.
                    </li>
                    <li>
                      <strong className="text-foreground">Cookies de preferencias:</strong> Permiten recordar tus preferencias (por ejemplo, el idioma) para ofrecerte una experiencia más personalizada.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Finalidad */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  {t('cookies.sections.finalityOfCookies')}
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Las cookies que utilizamos tienen las siguientes finalidades:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground">Técnicas:</strong> garantizar el correcto funcionamiento del sitio web.
                    </li>
                    <li>
                      <strong className="text-foreground">Análisis:</strong> analizar cómo utilizas el sitio web para poder mejorarlo.
                    </li>
                    <li>
                      <strong className="text-foreground">Preferencias:</strong> recordar tus preferencias (por ejemplo, el idioma) para ofrecerte una experiencia más personalizada.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Base legal */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  {t('cookies.sections.legalBasis')}
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    La base legal para el uso de cookies técnicas es nuestro interés legítimo en garantizar el correcto funcionamiento del sitio web.
                  </p>
                  <p>
                    La base legal para el uso de cookies de análisis y preferencias es tu consentimiento, que puedes retirar en cualquier momento.
                  </p>
                </div>
              </div>

              {/* Gestión */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  {t('cookies.sections.manageCookies')}
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Puedes gestionar las cookies a través de la configuración de tu navegador. Puedes permitir, bloquear o eliminar las cookies instaladas en tu dispositivo.
                  </p>
                  <p>
                    Para más información sobre cómo gestionar las cookies, consulta la documentación de tu navegador:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        Google Chrome
                      </a>
                    </li>
                    <li>
                      <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        Mozilla Firefox
                      </a>
                    </li>
                    <li>
                      <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        Microsoft Edge
                      </a>
                    </li>
                    <li>
                      <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        Apple Safari
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Cookies de terceros */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  {t('cookies.sections.thirdPartyCookies')}
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Este sitio web puede utilizar cookies de terceros para mejorar la experiencia del usuario y ofrecer contenido personalizado.
                  </p>
                  <p>
                    Estas cookies son gestionadas por terceros y están sujetas a sus propias políticas de privacidad.
                  </p>
                  <p>
                    Puedes consultar las políticas de privacidad de los terceros que utilizamos en este sitio web en sus respectivos sitios web.
                  </p>
                </div>
              </div>

              {/* Actualizaciones */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  {t('cookies.sections.updates')}
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Es posible que actualicemos esta Política de Cookies de vez en cuando. Te recomendamos que la revises periódicamente para estar al tanto de los cambios.
                  </p>
                  <p>
                    La fecha de la última actualización se indica al principio de esta página.
                  </p>
                </div>
              </div>

              {/* Más información */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  {t('cookies.sections.moreInfo')}
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Si tienes alguna pregunta sobre esta Política de Cookies, puedes ponerte en contacto con nosotros a través de los medios indicados a continuación.
                  </p>
                </div>
              </div>

              {/* Contacto */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-normal text-foreground">
                  {t('cookies.sections.contact')}
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Puedes ponerte en contacto con nosotros a través de los siguientes medios:
                  </p>
                  <ul className="list-none space-y-2">
                    <li>
                      <strong className="text-foreground">Email:</strong>{" "}
                      <a href="mailto:info@nrro.es" className="text-accent hover:underline">
                        info@nrro.es
                      </a>
                    </li>
                    <li>
                      <strong className="text-foreground">Teléfono:</strong> 934593600
                    </li>
                    <li>
                      <strong className="text-foreground">Dirección:</strong> Carrer Ausias March número 36, 08010 Barcelona
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cookies;
