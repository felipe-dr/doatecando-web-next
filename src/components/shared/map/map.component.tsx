'use client';

import 'leaflet/dist/leaflet.css';

import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';

import 'leaflet-defaulticon-compatibility';

import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { PlaceModel } from '@/shared/models';

interface MapComponentProps {
  center: LatLngExpression;
  zoom?: number;
  place: PlaceModel;
}

export default function MapComponent({
  center,
  zoom = 11,
  place,
}: MapComponentProps): JSX.Element {
  const { latitude, longitude } = place.location;

  return (
    <MapContainer
      style={{ height: '25rem', width: '100%' }}
      preferCanvas={true}
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        key={place.id}
        title={place.name}
        position={[latitude, longitude]}
      >
        <Popup>{place.name}</Popup>
      </Marker>
    </MapContainer>
  );
}
