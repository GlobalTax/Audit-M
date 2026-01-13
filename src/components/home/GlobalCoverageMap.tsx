import { useState, memo, useCallback } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { motion } from 'framer-motion';
import { ArrowRight, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RegionList } from '@/components/map/RegionList';
import { coverageCities, coveredCountries, regions, networkInfo, CoverageCity } from '@/data/globalCoverageData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Memoized Geography component for performance
const MemoGeography = memo(({ geo, isHighlighted }: { geo: any; isHighlighted: boolean }) => (
  <Geography
    geography={geo}
    fill={isHighlighted ? 'hsl(var(--primary))' : 'hsl(var(--muted))'}
    stroke="hsl(var(--background))"
    strokeWidth={0.5}
    style={{
      default: { outline: 'none' },
      hover: { outline: 'none', fill: isHighlighted ? 'hsl(var(--primary) / 0.8)' : 'hsl(var(--muted-foreground) / 0.3)' },
      pressed: { outline: 'none' },
    }}
  />
));

MemoGeography.displayName = 'MemoGeography';

// City Marker component
function CityMarker({ city, isActive, onClick }: { city: CoverageCity; isActive: boolean; onClick: () => void }) {
  const size = city.isHQ ? 10 : 5;
  
  return (
    <Marker coordinates={[city.lng, city.lat]}>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <g onClick={onClick} style={{ cursor: 'pointer' }}>
              {city.isHQ && (
                <circle
                  r={16}
                  fill="hsl(var(--accent) / 0.2)"
                  className="animate-ping"
                  style={{ transformOrigin: 'center', animationDuration: '2s' }}
                />
              )}
              <circle
                r={size}
                fill={city.isHQ ? 'hsl(var(--accent))' : 'hsl(var(--accent))'}
                stroke="hsl(var(--background))"
                strokeWidth={city.isHQ ? 3 : 2}
                className={`transition-all duration-200 ${isActive ? 'scale-150' : 'hover:scale-125'}`}
                style={{ transformOrigin: 'center' }}
              />
            </g>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-card border-border">
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
  const [center, setCenter] = useState<[number, number]>([10, 30]);
  const [zoom, setZoom] = useState(1);

  const handleCityClick = useCallback((city: CoverageCity) => {
    setActiveCity(city.name);
    setCenter([city.lng, city.lat]);
    setZoom(3);
  }, []);

  const handleReset = useCallback(() => {
    setActiveCity(null);
    setCenter([10, 30]);
    setZoom(1);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
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

        {/* Map + List Grid */}
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Map Container */}
          <motion.div 
            className="lg:col-span-3 bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative aspect-[16/9] lg:aspect-[21/9]">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 130,
                }}
                style={{ width: '100%', height: '100%' }}
              >
                <ZoomableGroup
                  center={center}
                  zoom={zoom}
                  onMoveEnd={({ coordinates, zoom }) => {
                    setCenter(coordinates);
                    setZoom(zoom);
                  }}
                  minZoom={1}
                  maxZoom={8}
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
              {zoom > 1 && (
                <button
                  onClick={handleReset}
                  className="absolute top-4 right-4 px-3 py-1.5 text-xs font-medium bg-background/90 backdrop-blur-sm border border-border rounded-lg hover:bg-background transition-colors"
                >
                  Reset View
                </button>
              )}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex items-center gap-4 px-3 py-2 bg-background/90 backdrop-blur-sm border border-border rounded-lg text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="text-foreground/70">Coverage</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-accent"></span>
                  <span className="text-foreground/70">Partner Office</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-accent ring-2 ring-accent/30"></span>
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
