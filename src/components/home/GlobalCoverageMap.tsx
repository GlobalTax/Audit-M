import { useState, memo, useCallback } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, Sphere, Graticule } from 'react-simple-maps';
import { motion } from 'framer-motion';
import { ArrowRight, Globe2, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RegionList } from '@/components/map/RegionList';
import { coverageCities, coveredCountries, regions, networkInfo, CoverageCity } from '@/data/globalCoverageData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Region view presets
const regionViews: Record<string, { center: [number, number]; zoom: number }> = {
  global: { center: [10, 20], zoom: 1 },
  europe: { center: [15, 50], zoom: 3.5 },
  americas: { center: [-80, 20], zoom: 1.8 },
  asia_pacific: { center: [110, 20], zoom: 1.8 },
};

// Memoized Geography component for performance
const MemoGeography = memo(({ geo, isHighlighted }: { geo: any; isHighlighted: boolean }) => (
  <Geography
    geography={geo}
    fill={isHighlighted ? '#22C55E' : '#E5E7EB'}
    stroke="#FFFFFF"
    strokeWidth={0.5}
    style={{
      default: { outline: 'none' },
      hover: { outline: 'none', fill: isHighlighted ? '#16A34A' : '#D1D5DB' },
      pressed: { outline: 'none' },
    }}
  />
));

MemoGeography.displayName = 'MemoGeography';

// City Marker component
function CityMarker({ city, isActive, onClick }: { city: CoverageCity; isActive: boolean; onClick: () => void }) {
  const size = city.isHQ ? 12 : 6;
  
  return (
    <Marker coordinates={[city.lng, city.lat]}>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <g onClick={onClick} style={{ cursor: 'pointer' }}>
              {city.isHQ && (
                <circle
                  r={20}
                  fill="#F59E0B"
                  opacity={0.2}
                  className="animate-ping"
                  style={{ transformOrigin: 'center', animationDuration: '2s' }}
                />
              )}
              <circle
                r={size}
                fill="#F59E0B"
                stroke="#FFFFFF"
                strokeWidth={city.isHQ ? 3 : 2}
                className={`transition-all duration-200 ${isActive ? 'scale-150' : ''}`}
                style={{ 
                  transformOrigin: 'center',
                  filter: isActive ? 'drop-shadow(0 0 6px #F59E0B)' : undefined
                }}
              />
            </g>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-card border-border shadow-lg">
            <div className="text-sm">
              <p className="font-medium text-foreground">{city.name}, {city.country}</p>
              <p className="text-xs text-muted-foreground">
                {city.isHQ ? 'NRRO Headquarters' : networkInfo[city.network].name}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Marker>
  );
}

export function GlobalCoverageMap() {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<string>('europe');
  const [center, setCenter] = useState<[number, number]>(regionViews.europe.center);
  const [zoom, setZoom] = useState(regionViews.europe.zoom);

  const handleCityClick = useCallback((city: CoverageCity) => {
    setActiveCity(city.name);
    setCenter([city.lng, city.lat]);
    setZoom(4);
  }, []);

  const handleRegionChange = useCallback((region: string) => {
    setActiveRegion(region);
    setActiveCity(null);
    setCenter(regionViews[region].center);
    setZoom(regionViews[region].zoom);
  }, []);

  const handleReset = useCallback(() => {
    setActiveCity(null);
    setActiveRegion('europe');
    setCenter(regionViews.europe.center);
    setZoom(regionViews.europe.zoom);
  }, []);

  const regionTabs = [
    { id: 'global', label: 'Global' },
    { id: 'europe', label: 'Europe' },
    { id: 'americas', label: 'Americas' },
    { id: 'asia_pacific', label: 'Asia-Pacific' },
  ];

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4 flex items-center justify-center gap-2">
            <Globe2 className="h-4 w-4" />
            Global Network Coverage
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-foreground mb-4">
            50+ Jurisdictions Through Partner Networks
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Barcelona headquarters with worldwide reach via Integra International, XLNC, and SBC Global Alliance.
          </p>
        </motion.div>

        {/* Region Tabs */}
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex bg-card border border-border rounded-xl p-1.5 gap-1">
            {regionTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleRegionChange(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeRegion === tab.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Map + List Grid */}
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Map Container */}
          <motion.div 
            className="lg:col-span-3 bg-slate-100 rounded-2xl border border-border overflow-hidden shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative aspect-[16/9] md:aspect-[21/10]">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 150,
                  center: [0, 20],
                }}
                style={{ width: '100%', height: '100%' }}
              >
                <Sphere stroke="#CBD5E1" strokeWidth={0.5} fill="#F8FAFC" id="sphere" />
                <Graticule stroke="#E2E8F0" strokeWidth={0.3} />
                <ZoomableGroup
                  center={center}
                  zoom={zoom}
                  onMoveEnd={({ coordinates, zoom: newZoom }) => {
                    setCenter(coordinates);
                    setZoom(newZoom);
                  }}
                  minZoom={1}
                  maxZoom={10}
                  translateExtent={[[-Infinity, -200], [Infinity, 600]]}
                >
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const isHighlighted = coveredCountries.includes(geo.id);
                        return (
                          <MemoGeography 
                            key={geo.rsmKey} 
                            geo={geo} 
                            isHighlighted={isHighlighted} 
                          />
                        );
                      })
                    }
                  </Geographies>
                  
                  {/* City Markers */}
                  {coverageCities.map((city) => (
                    <CityMarker
                      key={`${city.name}-${city.countryCode}`}
                      city={city}
                      isActive={activeCity === city.name}
                      onClick={() => handleCityClick(city)}
                    />
                  ))}
                </ZoomableGroup>
              </ComposableMap>

              {/* Reset button */}
              <button
                onClick={handleReset}
                className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/90 backdrop-blur-sm border border-border rounded-lg hover:bg-white transition-colors shadow-sm"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3 px-3 py-2 bg-white/90 backdrop-blur-sm border border-border rounded-lg text-xs shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#22C55E' }}></span>
                  <span className="text-foreground/70">Coverage</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#F59E0B' }}></span>
                  <span className="text-foreground/70">Office</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full ring-2" style={{ backgroundColor: '#F59E0B', boxShadow: '0 0 0 2px rgba(245, 158, 11, 0.3)' }}></span>
                  <span className="text-foreground/70">HQ</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Region List */}
          <motion.div 
            className="bg-card rounded-2xl border border-border p-5 overflow-y-auto max-h-[500px] lg:max-h-none"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-6">
              {regions.map((region) => (
                <RegionList
                  key={region.id}
                  title={region.name}
                  cities={region.cities}
                  onCityClick={handleCityClick}
                  activeCity={activeCity}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Network Stats */}
        <motion.div 
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-center p-4 bg-card rounded-xl border border-border">
            <p className="text-2xl md:text-3xl font-bold text-foreground">{coverageCities.length}+</p>
            <p className="text-sm text-foreground/60">Partner Offices</p>
          </div>
          <div className="text-center p-4 bg-card rounded-xl border border-border">
            <p className="text-2xl md:text-3xl font-bold text-foreground">{coveredCountries.length}+</p>
            <p className="text-sm text-foreground/60">Jurisdictions</p>
          </div>
          <div className="text-center p-4 bg-card rounded-xl border border-border">
            <p className="text-2xl md:text-3xl font-bold text-foreground">3</p>
            <p className="text-sm text-foreground/60">Global Networks</p>
          </div>
          <div className="text-center p-4 bg-card rounded-xl border border-border">
            <p className="text-2xl md:text-3xl font-bold text-foreground">5</p>
            <p className="text-sm text-foreground/60">Continents</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button asChild size="lg">
            <Link to="/contact">
              Discuss Your International Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-3 text-sm text-foreground/50">
            We coordinate with local partners for seamless multi-jurisdictional service.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default GlobalCoverageMap;
