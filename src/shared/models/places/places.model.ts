export interface PlacesModel {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
