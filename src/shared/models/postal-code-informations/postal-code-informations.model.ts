export interface PostalCodeInformationsModel {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  location: {
    coordinates: { longitude: string; latitude: string };
  };
}
