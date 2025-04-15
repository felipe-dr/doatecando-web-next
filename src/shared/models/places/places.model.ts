export interface PlaceModel {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
