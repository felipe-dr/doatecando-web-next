import { DonorModel } from '../donor/donor.model';
import { SchoolModel } from '../school/school.model';

export enum DonatedResourcesEnum {
  CONECTORS = 'Conectores',
  SACANNER = 'Digitalizador',
  CABINET = 'Gabinete',
  PRINTER = 'Impressora',
  MOBILES = 'Mobiles',
  MONITOR = 'Monitor',
  MOUSE = 'Mouse',
  NOTEBOOKS = 'Notebooks',
  RECYCLESERVICES = 'Reciclagem',
  SUPORTSERVICES = 'Suporte',
  TABLETS = 'Tablets',
  KEYBOARD = 'Teclado',
}

export enum DonatedEquipmentConditionsEnum {
  NEW = 'Novo',
  GOOD = 'Bom',
  FAIR = 'Razoável',
  POOR = 'Ruim',
  BROKEN = 'Quebrado',
  NO_APPLY = 'Não se aplica',
}

export interface DonatedItemModel {
  id: number;
  item: DonatedResourcesEnum;
  name: string;
  condition: DonatedEquipmentConditionsEnum;
  donorId: number;
  schoolId: number;
  donor: DonorModel;
  school: SchoolModel;
}
