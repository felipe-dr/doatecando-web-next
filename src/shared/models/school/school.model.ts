export enum UrgencyEnum {
  ONE = 'Baixa',
  TWO = 'Moderada',
  THREE = 'Alta',
  FOUR = 'Muito alta',
  FIVE = 'Crítico',
}

export interface SchoolModel {
  id: number;
  name: string;
  street: string;
  number: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  neighbourhood: string;
  unprivilegedArea: boolean;
  urgency: UrgencyEnum;
  quantityOfStudents: number;
  availability: string;
  phone: string;
  email: string;
  password: string;
}
