import { LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';
const LazyMap = dynamic(() => import('@/components/shared/map/map.component'), {
  ssr: false,
});

interface SchoolMapReferences {
  id: number;
  location: { latitude: number; longitude: number };
  name: string;
}

interface SchoolMapComponentProps {
  postalCodeInformations: SchoolMapReferences;
}

export function SchoolMapComponent({
  postalCodeInformations,
}: SchoolMapComponentProps): JSX.Element {
  const { latitude, longitude } = postalCodeInformations.location;
  const center: LatLngExpression = [latitude, longitude];
  const place = {
    id: postalCodeInformations.id,
    name: postalCodeInformations.name,
    location: { latitude, longitude },
  };

  return (
    <>
      <div className="h-[25rem]">
        <LazyMap center={center} place={place} />
      </div>
    </>
  );
}
