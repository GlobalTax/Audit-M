interface LocationMapProps {
  address: string;
  lat: number;
  lng: number;
}

export const LocationMap = ({ address, lat, lng }: LocationMapProps) => {
  // Create bounding box for the embed (small area around the point)
  const delta = 0.005; // ~500m radius
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  
  // OpenStreetMap embed URL with marker
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  const fullMapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`;
  
  return (
    <div className="relative">
      <iframe
        title={`Map showing ${address}`}
        width="100%"
        height="300"
        frameBorder="0"
        scrolling="no"
        src={embedUrl}
        style={{ borderRadius: '8px' }}
        loading="lazy"
      />
      <div className="mt-2 text-center">
        <a 
          href={fullMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          View larger map
        </a>
      </div>
    </div>
  );
};
