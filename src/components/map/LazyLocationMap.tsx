import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LocationMap = React.lazy(() => 
  import('./LocationMap').then(module => ({ default: module.LocationMap }))
);

interface LazyLocationMapProps {
  address: string;
  lat: number;
  lng: number;
}

export const LazyLocationMap = ({ address, lat, lng }: LazyLocationMapProps) => {
  return (
    <Suspense fallback={<Skeleton className="h-[300px] w-full rounded-lg" />}>
      <LocationMap address={address} lat={lat} lng={lng} />
    </Suspense>
  );
};
