export enum BadgesType {
  FIRST_DONATION = '🥇 Primeira doação',
  TECH_SAVIOR = '🔥 Salvador da tecnologia',
  ECO_HERO = '🌍 Herói ecológico',
  EDUCATION_ALLY = '🎓 Aliado da educação',
}

export interface DonorModel {
  id: number;
  email: string;
  site: string;
  name: string;
  document: string;
  mobile: string;
  badges: [string];
}
