import { LocationMap } from './LocationMap';

interface LazyLocationMapProps {
  address: string;
  lat: number;
  lng: number;
}

export const LazyLocationMap = ({ address, lat, lng }: LazyLocationMapProps) => {
  return <LocationMap address={address} lat={lat} lng={lng} />;
};
