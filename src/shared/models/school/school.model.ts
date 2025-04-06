enum UrgencyEnum {
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
}

export interface SchoolModel {
  id: string;
  name: string;
  street: string;
  number: string;
  postalCode: string;
  neighbourhood: string;
  unprivilegedArea: boolean;
  urgency: UrgencyEnum;
  quantityOfStudents: number;
  availability: Date;
  phone: string;
  email: string;
  password: string;
}
