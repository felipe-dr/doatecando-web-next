import dynamic from 'next/dynamic';
const LazyMap = dynamic(() => import('@/components/shared/map/map.component'), {
  ssr: false,
  loading: () => <p>Sincronizando mapa...</p>,
});

import { LatLngExpression } from 'leaflet';

import { usePostalCodeInformations } from '@/data/hooks';

import { PlacesModel } from '@/shared/models';

interface SchoolMapComponentProps {
  schoolPostalCode: string;
}

export function SchoolMapComponent({
  schoolPostalCode,
}: SchoolMapComponentProps): JSX.Element {
  const { postalCodeInformations, error } = usePostalCodeInformations({
    schoolPostalCode,
  });

  let center: LatLngExpression = [0, 0];
  let places: PlacesModel[] = [];

  if (postalCodeInformations) {
    const { location } = postalCodeInformations;
    const latitude = Number(location.coordinates.latitude);
    const longitude = Number(location.coordinates.longitude);

    center = [latitude, longitude];
    places.push({
      id: '1',
      name: postalCodeInformations.street,
      location: {
        latitude: latitude,
        longitude: longitude,
      },
    });

    console.log(center);
  }

  return (
    <>
      {error && <p>{error}</p>}
      <LazyMap center={center} places={places} />
    </>
  );
}
