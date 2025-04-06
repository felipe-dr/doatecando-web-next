export interface DonorModel {
  id: number;
  email: string;
  name: string;
  document: string;
  mobile: string;
  badges: [string];
}
