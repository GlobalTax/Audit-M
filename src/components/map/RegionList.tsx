import { CoverageCity, networkInfo } from '@/data/globalCoverageData';
import { MapPin, Star } from 'lucide-react';

interface RegionListProps {
  title: string;
  cities: CoverageCity[];
  onCityClick?: (city: CoverageCity) => void;
  activeCity?: string | null;
}

export function RegionList({ title, cities, onCityClick, activeCity }: RegionListProps) {
  return (
    <div className="space-y-3">
      <h4 className="font-mono font-light text-xs tracking-wide uppercase text-foreground/70">
        {title}
      </h4>
      <ul className="space-y-1.5">
        {cities.map((city) => (
          <li key={`${city.name}-${city.countryCode}`}>
            <button
              onClick={() => onCityClick?.(city)}
              className={`
                w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm
                transition-all duration-200 group
                ${activeCity === city.name 
                  ? 'bg-primary/10 text-primary' 
                  : 'hover:bg-muted text-foreground/80 hover:text-foreground'
                }
              `}
            >
              {city.isHQ ? (
                <Star className="h-3.5 w-3.5 text-accent fill-accent flex-shrink-0" />
              ) : (
                <MapPin className="h-3.5 w-3.5 text-foreground/40 group-hover:text-accent flex-shrink-0" />
              )}
              <span className="flex-1">
                {city.name}
                {city.isHQ && <span className="ml-1.5 text-xs text-accent font-medium">HQ</span>}
              </span>
              <span 
                className="text-xs text-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity"
                title={networkInfo[city.network].name}
              >
                {city.network.toUpperCase()}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
