export interface PlaceModel {
  id: number;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
