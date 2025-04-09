'use client';

import 'leaflet/dist/leaflet.css';

import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';

import 'leaflet-defaulticon-compatibility';

import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { PlacesModel } from '@/shared/models';

interface MapComponentProps {
  center: LatLngExpression;
  zoom?: number;
  places: PlacesModel[];
}

export default function MapComponent({
  center,
  zoom = 11,
  places,
}: MapComponentProps): JSX.Element {
  console.log('center', center);
  console.log('places', places);
  return (
    <MapContainer
      style={{ height: '400px', width: '100%' }}
      preferCanvas={true}
      center={center}
      zoom={zoom}
      minZoom={3}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place) => {
        const { latitude, longitude } = place.location;

        return (
          <Marker
            key={place.id}
            title={place.name}
            position={[latitude, longitude]}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
