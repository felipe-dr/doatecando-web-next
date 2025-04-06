import { DonorModel } from '../donor/donor.model';
import { SchoolModel } from '../school/school.model';

export enum DonatedServicesType {
  SUPORTSERVICES = 'SUPORTSERVICES',
  RECYCLESERVICES = 'RECYCLESERVICES',
}

export interface DonatedItemModel {
  id: number;
  item: string;
  name: string;
  donorId: number;
  schoolId: number;
  donor: DonorModel;
  school: SchoolModel;
}
