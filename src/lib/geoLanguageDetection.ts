/**
 * Detección automática de idioma basada en geolocalización por IP
 * Usa ip-api.com (gratuita, sin API key necesaria)
 */

const CATALAN_REGIONS = ['Catalonia', 'Cataluña', 'Catalunya'];

interface GeoResponse {
  status: string;
  countryCode: string;
  regionName: string;
}

/**
 * Detecta el idioma preferido basado en la ubicación del usuario
 * - Si está en Cataluña → devuelve 'ca'
 * - Si está en España (resto) → devuelve 'es'
 * - Si está fuera de España o falla → devuelve 'es'
 */
export async function detectLanguageByLocation(): Promise<'es' | 'ca'> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 segundos timeout

  try {
    const response = await fetch(
      'http://ip-api.com/json/?fields=status,countryCode,regionName',
      { signal: controller.signal }
    );
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.warn('Geolocation API returned non-OK status');
      return 'es';
    }

    const data: GeoResponse = await response.json();
    
    if (data.status === 'success' && data.countryCode === 'ES') {
      // Verificar si está en Cataluña
      if (CATALAN_REGIONS.includes(data.regionName)) {
        console.log('Geolocation: Usuario en Cataluña, idioma → CA');
        return 'ca';
      }
      console.log(`Geolocation: Usuario en ${data.regionName}, idioma → ES`);
    }
    
    return 'es';
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn('Geolocation detection timed out, defaulting to ES');
    } else {
      console.warn('Geolocation detection failed:', error);
    }
    
    return 'es';
  }
}
