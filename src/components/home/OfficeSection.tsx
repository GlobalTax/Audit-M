import { Button } from "@/components/ui/button";
import { LocationMap } from "@/components/map/LocationMap";
import { MapPin, Train, Car, Clock } from "lucide-react";

const OFFICE_INFO = {
  address: "Carrer Ausias March número 36, 08010 Barcelona",
  lat: 41.3915,
  lng: 2.1797,
  features: [
    { icon: MapPin, text: "Ubicación céntrica en Eixample" },
    { icon: Train, text: "Metro L1, L2 - Arc de Triomf (5 min)" },
    { icon: Car, text: "Parking público cercano" },
    { icon: Clock, text: "Lun-Vie: 9:00 - 18:00" }
  ]
};

export const OfficeSection = () => {
  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Columna 1: Info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
                Nuestra Oficina
              </h3>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-4">
                Visítanos en Barcelona
              </h2>
              <p className="text-lg text-muted-foreground">
                {OFFICE_INFO.address}
              </p>
            </div>

            <ul className="space-y-3">
              {OFFICE_INFO.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <li key={index} className="flex items-center gap-3 text-foreground/80">
                    <Icon className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>{feature.text}</span>
                  </li>
                );
              })}
            </ul>

            <Button asChild size="lg" className="mt-6">
              <a 
                href="https://maps.app.goo.gl/XqKShv7m5kX8xw2r8" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Ver en Google Maps
              </a>
            </Button>
          </div>
          
          {/* Columna 2: Mapa */}
          <div className="rounded-xl overflow-hidden shadow-medium h-[400px]">
            <LocationMap 
              address={OFFICE_INFO.address}
              lat={OFFICE_INFO.lat}
              lng={OFFICE_INFO.lng}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
