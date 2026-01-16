export interface CoverageCity {
  name: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  region: 'americas' | 'europe' | 'asia_pacific' | 'middle_east';
  network: 'integra' | 'xlnc' | 'sbc' | 'nrro';
  isHQ?: boolean;
}

export interface CoverageRegion {
  id: string;
  name: string;
  cities: CoverageCity[];
}

// ISO 3166-1 numeric codes for covered countries (used by world-atlas TopoJSON)
export const coveredCountries: string[] = [
  // HQ
  '724', // Spain
  
  // Europe
  '826', // United Kingdom
  '250', // France
  '276', // Germany
  '380', // Italy
  '528', // Netherlands
  '056', // Belgium
  '756', // Switzerland
  '040', // Austria
  '616', // Poland
  '203', // Czech Republic
  '620', // Portugal
  '372', // Ireland
  '208', // Denmark
  '752', // Sweden
  '578', // Norway
  '246', // Finland
  '300', // Greece
  '348', // Hungary
  '642', // Romania
  '442', // Luxembourg
  
  // Americas
  '840', // United States
  '124', // Canada
  '484', // Mexico
  '076', // Brazil
  '032', // Argentina
  '152', // Chile
  '170', // Colombia
  '604', // Peru
  
  // Asia-Pacific
  '702', // Singapore
  '344', // Hong Kong
  '036', // Australia
  '554', // New Zealand
  '392', // Japan
  '410', // South Korea
  '356', // India
  '156', // China
  '458', // Malaysia
  '764', // Thailand
  
  // Middle East & Africa
  '784', // UAE
  '682', // Saudi Arabia
  '710', // South Africa
  '376', // Israel
];

export const coverageCities: CoverageCity[] = [
  // NRRO Offices (Spain)
  { name: 'Barcelona', country: 'Spain', countryCode: 'ES', lat: 41.3851, lng: 2.1734, region: 'europe', network: 'nrro', isHQ: true },
  { name: 'Madrid', country: 'Spain', countryCode: 'ES', lat: 40.4168, lng: -3.7038, region: 'europe', network: 'nrro' },
  { name: 'Pamplona', country: 'Spain', countryCode: 'ES', lat: 42.8125, lng: -1.6458, region: 'europe', network: 'nrro' },
  
  // Europe
  { name: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, region: 'europe', network: 'integra' },
  { name: 'Paris', country: 'France', countryCode: 'FR', lat: 48.8566, lng: 2.3522, region: 'europe', network: 'xlnc' },
  { name: 'Frankfurt', country: 'Germany', countryCode: 'DE', lat: 50.1109, lng: 8.6821, region: 'europe', network: 'integra' },
  { name: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', lat: 52.3676, lng: 4.9041, region: 'europe', network: 'xlnc' },
  { name: 'Zurich', country: 'Switzerland', countryCode: 'CH', lat: 47.3769, lng: 8.5417, region: 'europe', network: 'integra' },
  { name: 'Milan', country: 'Italy', countryCode: 'IT', lat: 45.4642, lng: 9.1900, region: 'europe', network: 'sbc' },
  { name: 'Brussels', country: 'Belgium', countryCode: 'BE', lat: 50.8503, lng: 4.3517, region: 'europe', network: 'xlnc' },
  { name: 'Vienna', country: 'Austria', countryCode: 'AT', lat: 48.2082, lng: 16.3738, region: 'europe', network: 'integra' },
  { name: 'Dublin', country: 'Ireland', countryCode: 'IE', lat: 53.3498, lng: -6.2603, region: 'europe', network: 'sbc' },
  { name: 'Lisbon', country: 'Portugal', countryCode: 'PT', lat: 38.7223, lng: -9.1393, region: 'europe', network: 'xlnc' },
  { name: 'Warsaw', country: 'Poland', countryCode: 'PL', lat: 52.2297, lng: 21.0122, region: 'europe', network: 'integra' },
  
  // Americas
  { name: 'New York', country: 'United States', countryCode: 'US', lat: 40.7128, lng: -74.0060, region: 'americas', network: 'integra' },
  { name: 'Miami', country: 'United States', countryCode: 'US', lat: 25.7617, lng: -80.1918, region: 'americas', network: 'xlnc' },
  { name: 'Toronto', country: 'Canada', countryCode: 'CA', lat: 43.6532, lng: -79.3832, region: 'americas', network: 'integra' },
  { name: 'Mexico City', country: 'Mexico', countryCode: 'MX', lat: 19.4326, lng: -99.1332, region: 'americas', network: 'sbc' },
  { name: 'São Paulo', country: 'Brazil', countryCode: 'BR', lat: -23.5505, lng: -46.6333, region: 'americas', network: 'xlnc' },
  { name: 'Buenos Aires', country: 'Argentina', countryCode: 'AR', lat: -34.6037, lng: -58.3816, region: 'americas', network: 'integra' },
  { name: 'Santiago', country: 'Chile', countryCode: 'CL', lat: -33.4489, lng: -70.6693, region: 'americas', network: 'sbc' },
  { name: 'Bogotá', country: 'Colombia', countryCode: 'CO', lat: 4.7110, lng: -74.0721, region: 'americas', network: 'xlnc' },
  
  // Asia-Pacific
  { name: 'Singapore', country: 'Singapore', countryCode: 'SG', lat: 1.3521, lng: 103.8198, region: 'asia_pacific', network: 'sbc' },
  { name: 'Hong Kong', country: 'Hong Kong', countryCode: 'HK', lat: 22.3193, lng: 114.1694, region: 'asia_pacific', network: 'integra' },
  { name: 'Sydney', country: 'Australia', countryCode: 'AU', lat: -33.8688, lng: 151.2093, region: 'asia_pacific', network: 'xlnc' },
  { name: 'Tokyo', country: 'Japan', countryCode: 'JP', lat: 35.6762, lng: 139.6503, region: 'asia_pacific', network: 'integra' },
  { name: 'Shanghai', country: 'China', countryCode: 'CN', lat: 31.2304, lng: 121.4737, region: 'asia_pacific', network: 'sbc' },
  { name: 'Mumbai', country: 'India', countryCode: 'IN', lat: 19.0760, lng: 72.8777, region: 'asia_pacific', network: 'xlnc' },
  { name: 'Seoul', country: 'South Korea', countryCode: 'KR', lat: 37.5665, lng: 126.9780, region: 'asia_pacific', network: 'integra' },
  
  // Middle East
  { name: 'Dubai', country: 'UAE', countryCode: 'AE', lat: 25.2048, lng: 55.2708, region: 'middle_east', network: 'sbc' },
  { name: 'Tel Aviv', country: 'Israel', countryCode: 'IL', lat: 32.0853, lng: 34.7818, region: 'middle_east', network: 'integra' },
];

export const regions: CoverageRegion[] = [
  {
    id: 'europe',
    name: 'Europe',
    cities: coverageCities.filter(c => c.region === 'europe'),
  },
  {
    id: 'americas',
    name: 'Americas',
    cities: coverageCities.filter(c => c.region === 'americas'),
  },
  {
    id: 'asia_pacific',
    name: 'Asia-Pacific',
    cities: coverageCities.filter(c => c.region === 'asia_pacific'),
  },
  {
    id: 'middle_east',
    name: 'Middle East',
    cities: coverageCities.filter(c => c.region === 'middle_east'),
  },
];

export const networkInfo = {
  integra: { name: 'Integra International', color: '#0C1E21' },
  xlnc: { name: 'XLNC', color: '#1a365d' },
  sbc: { name: 'SBC Global Alliance', color: '#2d3748' },
  nrro: { name: 'NRRO HQ', color: '#C9A962' },
};
